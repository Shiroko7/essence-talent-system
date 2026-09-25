import { useCallback, useEffect, useMemo, useState } from 'react';
import { Ability, EssencePathId } from '../types/essence';
import useEssenceAllocation from '../hooks/useEssenceAllocation';
import { useCultivationAllocation } from '../hooks/useCultivationAllocation';
import { importEssenceData } from '../utils/essenceData';
import { importCultivationData } from '../utils/cultivationData';
import { calculatePathEssenceStatus, migrateV1CharacterToCultivation, reconcileCultivationCharacter } from '../utils/cultivationUtils';
import {
  AbilityStatus,
  PoolStatus,
  TalentController,
  TalentSystem,
  TIER_IDS,
  costOf,
  isTierOpen,
  tierInfo,
  tierOf
} from './model';
import { buildV1System, buildV2System } from './systems';

interface CharacterLike {
  level: number;
  selectedAbilities: string[];
  activeEssenceByPath: Record<string, number>;
}

interface AllocationLike<C extends CharacterLike> {
  character: C;
  totalEssencePoints: number;
  totalPointsSpent: number;
  toggleAbility: (ability: Ability, pathId: never) => void;
  updateCharacterLevel: (level: number) => void;
  resetCharacter: () => void;
  undoReset: () => void;
  canUndo: boolean;
  updateActiveEssence: (pathId: never, amount: number) => void;
  setCharacterState: (state: C) => void;
}

const downloadJson = (data: unknown, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const readJson = (file: File) => new Promise<Record<string, unknown>>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      resolve(JSON.parse(e.target?.result as string));
    } catch (error) {
      reject(error);
    }
  };
  reader.onerror = reject;
  reader.readAsText(file);
});

/** Adapts either allocation hook into the shared controller every layout consumes. */
function useControllerFromAllocation<C extends CharacterLike>(
  system: TalentSystem,
  allocation: AllocationLike<C>,
  save: (character: C) => void,
  load: (json: Record<string, unknown>) => string,
  externalNotice: string | null
): TalentController {
  const { character, totalEssencePoints, totalPointsSpent } = allocation;
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (externalNotice) setNotice(externalNotice);
  }, [externalNotice]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 6000);
    return () => clearTimeout(timer);
  }, [notice]);

  const selectedSet = useMemo(() => new Set(character.selectedAbilities), [character.selectedAbilities]);

  const pathIndex = useMemo(() => {
    const index = new Map<string, string>();
    for (const [pathId, abilities] of Object.entries(system.abilitiesByPath)) {
      abilities.forEach(a => index.set(a.id, pathId));
    }
    return index;
  }, [system]);

  const pathById = useMemo(() => new Map(system.paths.map(p => [p.id, p])), [system]);
  const pointsLeft = totalEssencePoints - totalPointsSpent;

  const tierUnlocked = useCallback((tierId: typeof TIER_IDS[number], pathId: string) =>
    isTierOpen(tierId, character.selectedAbilities, system.abilitiesByPath[pathId] || [], character.level),
  [character.selectedAbilities, character.level, system]);

  const statusOf = (ability: Ability, pathId: string): AbilityStatus => {
    if (selectedSet.has(ability.id)) return 'learned';
    if (!tierUnlocked(tierOf(ability), pathId)) return 'locked';
    if (costOf(ability) > pointsLeft) return 'unaffordable';
    return 'available';
  };

  const lockReason = (ability: Ability, pathId: string) => {
    const tierId = tierOf(ability);
    if (tierUnlocked(tierId, pathId)) return null;
    const tier = tierInfo(tierId);
    if (character.level < tier.levelRequirement) return `Opens at level ${tier.levelRequirement}`;
    const previous = tierInfo(TIER_IDS[TIER_IDS.indexOf(tierId) - 1]);
    return `Learn a ${previous.name} talent in ${pathById.get(pathId)?.name ?? 'this path'} first`;
  };

  const toggle = (ability: Ability, pathId: string) => {
    const status = statusOf(ability, pathId);
    if (status === 'locked') {
      setNotice(lockReason(ability, pathId));
      return;
    }
    if (status === 'unaffordable') {
      setNotice(`Not enough essence points for ${ability.name} (costs ${costOf(ability)}, ${pointsLeft} left).`);
      return;
    }
    allocation.toggleAbility(ability, pathId as never);
  };

  const pool = (pathId: string): PoolStatus => {
    const status = calculatePathEssenceStatus(pathId, character, system.abilitiesByPath, {}, {});
    return { current: Math.min(status.spent, status.available), max: status.available, reserved: status.passiveReduction };
  };

  const learnedPaths = system.paths.filter(path =>
    (system.abilitiesByPath[path.id] || []).some(a => selectedSet.has(a.id))
  );

  const setPools = (value: (pathId: string) => number) => {
    const next = { ...character.activeEssenceByPath };
    learnedPaths.forEach(path => { next[path.id] = value(path.id); });
    allocation.setCharacterState({ ...character, activeEssenceByPath: next });
  };

  return {
    system,
    level: character.level,
    setLevel: allocation.updateCharacterLevel,
    selectedIds: character.selectedAbilities,
    isLearned: id => selectedSet.has(id),
    pointsTotal: totalEssencePoints,
    pointsSpent: totalPointsSpent,
    pointsLeft,
    toggle,
    statusOf,
    lockReason,
    tierUnlocked,
    pool,
    adjustPool: (pathId, delta) => allocation.updateActiveEssence(pathId as never, delta),
    spend: (ability, pathId) => {
      const cost = costOf(ability);
      if (pool(pathId).current < cost) {
        setNotice(`Not enough ${system.resourceName.toLowerCase()} left in ${pathById.get(pathId)?.name} to use ${ability.name}.`);
        return;
      }
      allocation.updateActiveEssence(pathId as never, -cost);
    },
    fullRest: () => setPools(pathId => pool(pathId).max),
    emptyPools: () => setPools(() => 0),
    reset: allocation.resetCharacter,
    undo: allocation.undoReset,
    canUndo: allocation.canUndo,
    save: () => save(character),
    load: file => {
      readJson(file)
        .then(json => setNotice(load(json)))
        .catch(error => {
          console.error('Error loading configuration:', error);
          setNotice(error instanceof Error && error.message ? error.message : 'That file is not a valid configuration.');
        });
    },
    notice,
    dismissNotice: () => setNotice(null),
    pathOf: id => pathById.get(pathIndex.get(id) ?? ''),
    learnedPaths
  };
}

export function useV1Controller(): TalentController {
  const [system] = useState(buildV1System);
  const [data] = useState(importEssenceData);
  const allocation = useEssenceAllocation({ initialLevel: 11, allAbilities: data.abilities, cantrips: data.cantrips, spells: data.spells });

  return useControllerFromAllocation(
    system,
    allocation,
    character => downloadJson({
      characterLevel: character.level,
      selectedAbilities: character.selectedAbilities,
      activeEssenceByPath: character.activeEssenceByPath,
      version: '1.0'
    }, `essence-config-${new Date().toISOString().slice(0, 10)}.json`),
    json => {
      if (!json.characterLevel || !Array.isArray(json.selectedAbilities)) {
        throw new Error('Invalid configuration file format.');
      }
      allocation.setCharacterState({
        level: json.characterLevel as number,
        selectedAbilities: json.selectedAbilities as string[],
        activeEssenceByPath: (json.activeEssenceByPath || {}) as Record<EssencePathId, number>
      });
      return 'Loaded V1 configuration.';
    },
    null
  );
}

export function useV2Controller(): TalentController {
  const [system] = useState(buildV2System);
  const [data] = useState(() => importCultivationData('v2'));
  const allocation = useCultivationAllocation({
    initialLevel: 11,
    paths: data.paths,
    catalogVersion: 'v2',
    allAbilities: data.abilities,
    cantrips: data.cantrips,
    spells: data.spells
  });
  const [migrationNotice, setMigrationNotice] = useState<string | null>(null);
  const { character, setCharacterState } = allocation;

  useEffect(() => {
    if (!character.migrationNotice) return;
    setMigrationNotice(character.migrationNotice);
    const updated = { ...character };
    delete updated.migrationNotice;
    setCharacterState(updated);
  }, [character, setCharacterState]);

  return useControllerFromAllocation(
    system,
    allocation,
    current => downloadJson({
      characterLevel: current.level,
      selectedAbilities: current.selectedAbilities,
      activeEssenceByPath: current.activeEssenceByPath,
      version: '2.4',
      catalogVersion: 'v2'
    }, `cultivation-config-v2-${new Date().toISOString().slice(0, 10)}.json`),
    json => {
      const level = (json.characterLevel || json.level) as number;
      if (!level) throw new Error('Invalid configuration file format.');
      const selectedAbilities = Array.isArray(json.selectedAbilities) ? json.selectedAbilities as string[] : [];
      const activeEssenceByPath = (json.activeEssenceByPath || {}) as Record<string, number>;

      if (json.catalogVersion === 'v2' && json.version === '2.4') {
        setCharacterState({ level, selectedAbilities, activeEssenceByPath, version: 'v2' });
        return 'Loaded V2 configuration.';
      }
      if (['2.3', '2.2', '2.1', '2.0'].includes(json.version as string)) {
        const migrated = reconcileCultivationCharacter(
          { level, selectedAbilities, activeEssenceByPath, version: json.version as string },
          data, data.paths, 'v2'
        );
        setCharacterState({ ...migrated, migrationNotice: undefined });
        return migrated.migrationNotice || 'Updated the saved configuration to the current V2 catalog.';
      }
      if (json.catalogVersion && json.catalogVersion !== 'v2') {
        throw new Error(`This save belongs to ${String(json.catalogVersion).toUpperCase()}.`);
      }
      setCharacterState(migrateV1CharacterToCultivation(json, data, data.paths, 'v2'));
      return 'Migrated a V1 character into V2. Abilities without a V2 counterpart were dropped.';
    },
    migrationNotice
  );
}
