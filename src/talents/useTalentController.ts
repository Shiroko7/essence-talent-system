import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Ability, EssencePathId } from '../types/essence';
import useEssenceAllocation from '../hooks/useEssenceAllocation';
import { useCultivationAllocation } from '../hooks/useCultivationAllocation';
import { importEssenceData } from '../utils/essenceData';
import { importCultivationData } from '../utils/cultivationData';
import { calculatePathEssenceStatus, reconcileCultivationCharacter, settleRetieredTalents } from '../utils/cultivationUtils';
import { CultivationCharacter } from '../types/cultivation';
import { MigrationSource, planV1Migration, readMigrationSource, readV1Save, writeMigrationSource } from './migration';
import {
  AbilityStatus,
  EssencePool,
  PoolStatus,
  SystemVersion,
  TalentController,
  TalentSystem,
  TIER_IDS,
  costOf,
  isTierOpen,
  tierInfo,
  tierOf
} from './model';
import { buildV1System, buildV2System } from './systems';
import type { CharacterBuild } from './characters/characterTypes';
import {
  generateBuildId,
  getActiveCharacterId,
  loadCharacterRoster,
  saveCharacterRoster,
  setActiveCharacterId,
  syncLegacyStorage
} from './characters/characterStorage';

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
  /** Functional update; needed where pools span several paths. */
  updateCharacter?: (update: (prev: C) => C) => void;
}

/** A path's own share of essence: what it holds now, its capacity, and what passives hold. */
const pathEssence = (pathId: string, character: CharacterLike, system: TalentSystem) => {
  const status = calculatePathEssenceStatus(pathId, character as CultivationCharacter, system.abilitiesByPath, {}, {});
  return { current: Math.min(status.spent, status.available), max: status.available, reserved: status.passiveReduction };
};

/**
 * Move essence into or out of a pool that spans several paths. Essence is still
 * stored per path, so a shared pool is the sum of its paths: spending drains the
 * preferred path first and then the others, regaining fills paths in order.
 * Older saves need no conversion; their per-path amounts simply add up.
 */
const shiftPoolEssence = (
  character: CharacterLike,
  pool: EssencePool,
  delta: number,
  system: TalentSystem,
  preferPathId?: string
): Record<string, number> => {
  const next = { ...character.activeEssenceByPath };
  const order = preferPathId
    ? [...pool.paths.filter(p => p.id === preferPathId), ...pool.paths.filter(p => p.id !== preferPathId)]
    : pool.paths;
  let left = Math.abs(delta);
  for (const path of order) {
    if (left <= 0) break;
    const { current, max } = pathEssence(path.id, character, system);
    const moved = Math.min(left, delta < 0 ? current : max - current);
    if (moved <= 0) continue;
    next[path.id] = current + (delta < 0 ? -moved : moved);
    left -= moved;
  }
  return next;
};

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

  const [roster, setRoster] = useState<CharacterBuild[]>(() => loadCharacterRoster(system.version));
  const [activeCharacterId, setActiveCharacterIdState] = useState<string>(() => getActiveCharacterId(system.version, roster));

  const selectCharacterRef = useRef<(id: string) => void>(() => {});

  // Sync with window events if another component triggers a roster update
  useEffect(() => {
    const handleRosterUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ version: SystemVersion }>;
      if (customEvent.detail?.version === system.version) {
        setRoster(loadCharacterRoster(system.version));
      }
    };
    const handleActiveChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ version: SystemVersion; id: string }>;
      if (customEvent.detail?.version === system.version && customEvent.detail?.id !== activeCharacterId) {
        selectCharacterRef.current(customEvent.detail.id);
      }
    };
    window.addEventListener('talent-roster-updated', handleRosterUpdate);
    window.addEventListener('talent-active-character-changed', handleActiveChange);
    return () => {
      window.removeEventListener('talent-roster-updated', handleRosterUpdate);
      window.removeEventListener('talent-active-character-changed', handleActiveChange);
    };
  }, [system.version, activeCharacterId]);

  // Keep the active build in roster synchronized with character state in real-time
  useEffect(() => {
    setRoster(prev => {
      const targetIndex = prev.findIndex(c => c.id === activeCharacterId);
      if (targetIndex === -1) return prev;
      const current = prev[targetIndex];
      const sameAbilities =
        current.selectedAbilities.length === character.selectedAbilities.length &&
        current.selectedAbilities.every((id, idx) => id === character.selectedAbilities[idx]);
      const sameEssence = JSON.stringify(current.activeEssenceByPath) === JSON.stringify(character.activeEssenceByPath);
      if (current.level === character.level && sameAbilities && sameEssence) {
        return prev;
      }

      const updated = [...prev];
      updated[targetIndex] = {
        ...current,
        level: character.level,
        selectedAbilities: character.selectedAbilities,
        activeEssenceByPath: character.activeEssenceByPath,
        updatedAt: Date.now()
      };
      saveCharacterRoster(system.version, updated);
      syncLegacyStorage(system.version, updated[targetIndex]);
      return updated;
    });
  }, [character.level, character.selectedAbilities, character.activeEssenceByPath, activeCharacterId, system.version]);

  const activeCharacter = useMemo(
    () => roster.find(c => c.id === activeCharacterId) || roster[0],
    [roster, activeCharacterId]
  );

  const selectCharacter = useCallback((id: string) => {
    if (id === activeCharacterId) return;
    const target = roster.find(c => c.id === id);
    if (!target) return;

    const updatedRoster = roster.map(c =>
      c.id === activeCharacterId
        ? {
            ...c,
            level: character.level,
            selectedAbilities: character.selectedAbilities,
            activeEssenceByPath: character.activeEssenceByPath,
            updatedAt: Date.now()
          }
        : c
    );

    saveCharacterRoster(system.version, updatedRoster);
    setActiveCharacterId(system.version, id);
    setRoster(updatedRoster);
    setActiveCharacterIdState(id);

    allocation.setCharacterState({
      level: target.level,
      selectedAbilities: [...target.selectedAbilities],
      activeEssenceByPath: { ...target.activeEssenceByPath },
      ...(system.version === 'v2' ? { version: 'v2' } : {})
    } as unknown as C);

    syncLegacyStorage(system.version, target);
    setNotice(`Switched to "${target.name}".`);
  }, [activeCharacterId, allocation, character, roster, system.version]);

  selectCharacterRef.current = selectCharacter;

  const createCharacter = useCallback((name?: string, initialLevel = 11) => {
    const buildName = name?.trim() || `Character ${roster.length + 1}`;
    const newBuild: CharacterBuild = {
      id: generateBuildId(),
      name: buildName,
      version: system.version,
      level: initialLevel,
      selectedAbilities: [],
      activeEssenceByPath: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedRoster = [
      ...roster.map(c =>
        c.id === activeCharacterId
          ? {
              ...c,
              level: character.level,
              selectedAbilities: character.selectedAbilities,
              activeEssenceByPath: character.activeEssenceByPath,
              updatedAt: Date.now()
            }
          : c
      ),
      newBuild
    ];

    saveCharacterRoster(system.version, updatedRoster);
    setActiveCharacterId(system.version, newBuild.id);
    setRoster(updatedRoster);
    setActiveCharacterIdState(newBuild.id);

    allocation.setCharacterState({
      level: newBuild.level,
      selectedAbilities: [],
      activeEssenceByPath: {},
      ...(system.version === 'v2' ? { version: 'v2' } : {})
    } as unknown as C);

    syncLegacyStorage(system.version, newBuild);
    setNotice(`Created "${buildName}".`);
  }, [activeCharacterId, allocation, character, roster, system.version]);

  const duplicateCharacter = useCallback((sourceId?: string, customName?: string) => {
    const idToClone = sourceId || activeCharacterId;
    const source = roster.find(c => c.id === idToClone);
    if (!source) return;

    const sourceLevel = idToClone === activeCharacterId ? character.level : source.level;
    const sourceAbilities = idToClone === activeCharacterId ? character.selectedAbilities : source.selectedAbilities;
    const sourceEssence = idToClone === activeCharacterId ? character.activeEssenceByPath : source.activeEssenceByPath;

    const cloneName = customName?.trim() || `${source.name} (Copy)`;
    const clonedBuild: CharacterBuild = {
      id: generateBuildId(),
      name: cloneName,
      version: system.version,
      level: sourceLevel,
      selectedAbilities: [...sourceAbilities],
      activeEssenceByPath: { ...sourceEssence },
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedRoster = [
      ...roster.map(c =>
        c.id === activeCharacterId
          ? {
              ...c,
              level: character.level,
              selectedAbilities: character.selectedAbilities,
              activeEssenceByPath: character.activeEssenceByPath,
              updatedAt: Date.now()
            }
          : c
      ),
      clonedBuild
    ];

    saveCharacterRoster(system.version, updatedRoster);
    setActiveCharacterId(system.version, clonedBuild.id);
    setRoster(updatedRoster);
    setActiveCharacterIdState(clonedBuild.id);

    allocation.setCharacterState({
      level: clonedBuild.level,
      selectedAbilities: [...clonedBuild.selectedAbilities],
      activeEssenceByPath: { ...clonedBuild.activeEssenceByPath },
      ...(system.version === 'v2' ? { version: 'v2' } : {})
    } as unknown as C);

    syncLegacyStorage(system.version, clonedBuild);
    setNotice(`Duplicated build as "${cloneName}".`);
  }, [activeCharacterId, allocation, character, roster, system.version]);

  const renameCharacter = useCallback((id: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;

    const updatedRoster = roster.map(c =>
      c.id === id ? { ...c, name: trimmed, updatedAt: Date.now() } : c
    );
    saveCharacterRoster(system.version, updatedRoster);
    setRoster(updatedRoster);
    setNotice(`Renamed build to "${trimmed}".`);
  }, [roster, system.version]);

  const deleteCharacter = useCallback((id: string) => {
    if (roster.length <= 1) {
      setNotice('Cannot delete the only build in the roster.');
      return;
    }

    const target = roster.find(c => c.id === id);
    const updatedRoster = roster.filter(c => c.id !== id);

    if (id === activeCharacterId) {
      const nextActive = updatedRoster[0];
      saveCharacterRoster(system.version, updatedRoster);
      setActiveCharacterId(system.version, nextActive.id);
      setRoster(updatedRoster);
      setActiveCharacterIdState(nextActive.id);

      allocation.setCharacterState({
        level: nextActive.level,
        selectedAbilities: [...nextActive.selectedAbilities],
        activeEssenceByPath: { ...nextActive.activeEssenceByPath },
        ...(system.version === 'v2' ? { version: 'v2' } : {})
      } as unknown as C);

      syncLegacyStorage(system.version, nextActive);
      setNotice(`Deleted "${target?.name ?? 'build'}" and switched to "${nextActive.name}".`);
    } else {
      saveCharacterRoster(system.version, updatedRoster);
      setRoster(updatedRoster);
      setNotice(`Deleted "${target?.name ?? 'build'}".`);
    }
  }, [activeCharacterId, allocation, roster, system.version]);

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

  const allPools = useMemo((): EssencePool[] => system.sharedPools
    ? system.groups.map(g => ({ id: g.id, label: g.label, accent: g.accent, paths: system.paths.filter(p => p.groupId === g.id) }))
    : system.paths.map(p => ({ id: p.id, label: p.name, accent: p.accent, paths: [p] })),
  [system]);
  const poolById = useMemo(() => new Map(allPools.map(p => [p.id, p])), [allPools]);
  const poolByPath = useMemo(() => new Map(allPools.flatMap(pool => pool.paths.map(p => [p.id, pool] as const))), [allPools]);
  const poolOf = (pathId: string) => poolByPath.get(pathId)!;

  const learnedPaths = system.paths.filter(path =>
    (system.abilitiesByPath[path.id] || []).some(a => selectedSet.has(a.id))
  );
  const learnedSet = new Set(learnedPaths.map(p => p.id));

  const pool = (poolId: string): PoolStatus => {
    const sources = (poolById.get(poolId)?.paths ?? [])
      .filter(path => learnedSet.has(path.id))
      .map(path => ({ path, ...pathEssence(path.id, character, system) }));
    return {
      current: sources.reduce((n, s) => n + s.current, 0),
      max: sources.reduce((n, s) => n + s.max, 0),
      reserved: sources.reduce((n, s) => n + s.reserved, 0),
      sources: sources.map(({ path, max, reserved }) => ({ path, max, reserved }))
    };
  };

  const adjustPool = (poolId: string, delta: number, preferPathId?: string) => {
    const target = poolById.get(poolId);
    if (!target || delta === 0) return;
    if (!allocation.updateCharacter || target.paths.length === 1) {
      allocation.updateActiveEssence((preferPathId ?? target.paths[0].id) as never, delta);
      return;
    }
    allocation.updateCharacter(prev => ({ ...prev, activeEssenceByPath: shiftPoolEssence(prev, target, delta, system, preferPathId) }));
  };

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
    pools: allPools.filter(p => p.paths.some(path => learnedSet.has(path.id))),
    poolOf,
    pool,
    adjustPool: (poolId, delta) => adjustPool(poolId, delta),
    spend: (ability, pathId) => {
      const cost = costOf(ability);
      const target = poolOf(pathId);
      if (pool(target.id).current < cost) {
        setNotice(`Not enough ${target.label} ${system.resourceName.toLowerCase()} left to use ${ability.name}.`);
        return;
      }
      adjustPool(target.id, -cost, pathId);
    },
    fullRest: () => setPools(pathId => pathEssence(pathId, character, system).max),
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
    learnedPaths,
    characters: roster,
    activeCharacterId,
    activeCharacter,
    selectCharacter,
    createCharacter,
    duplicateCharacter,
    renameCharacter,
    deleteCharacter
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

const V1_IMPORT_NOTICE = 'Your V1 character was carried over to V2. The migration guide explains where each ability went.';

export function useV2Controller(): TalentController {
  const [system] = useState(buildV2System);
  const [data] = useState(() => importCultivationData('v2'));

  /** Plan a V1 character into V2 and remember it as the source of the migration guide. */
  const importV1 = (saved: Pick<MigrationSource, 'level' | 'selectedAbilities'>, origin: MigrationSource['origin']): CultivationCharacter => {
    writeMigrationSource({ ...saved, origin, importedAt: new Date().toISOString() });
    const plan = planV1Migration(saved, system);
    return { level: plan.level, selectedAbilities: plan.selectedAbilities, activeEssenceByPath: plan.activeEssenceByPath, version: 'v2' };
  };

  const allocation = useCultivationAllocation({
    initialLevel: 11,
    paths: data.paths,
    catalogVersion: 'v2',
    allAbilities: data.abilities,
    cantrips: data.cantrips,
    spells: data.spells,
    // A V1 character is carried over once per browser, replacing any earlier V2 build.
    pendingImport: () => {
      const saved = readV1Save();
      if (!saved || readMigrationSource()) return null;
      return { ...importV1(saved, 'browser'), migrationNotice: V1_IMPORT_NOTICE };
    }
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

  const ctl = useControllerFromAllocation(
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
        const settled = settleRetieredTalents({ level, selectedAbilities, activeEssenceByPath, version: 'v2' }, data, data.paths);
        setCharacterState({ ...settled, migrationNotice: undefined });
        return settled.migrationNotice ? `Loaded V2 configuration. ${settled.migrationNotice}` : 'Loaded V2 configuration.';
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
      setCharacterState(importV1({ level, selectedAbilities }, 'file'));
      return V1_IMPORT_NOTICE;
    },
    migrationNotice
  );

  return {
    ...ctl,
    importFromV1: () => {
      const saved = readV1Save();
      if (saved) setCharacterState(importV1(saved, 'browser'));
    }
  };
}
