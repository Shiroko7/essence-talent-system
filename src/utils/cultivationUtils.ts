import {
  Ability,
  TierId,
  SpellLevel,
  calculateEssencePoints,
  getTierCost
} from '../types/essence';
import {
  CultivationCharacter,
  CultivationPathId,
  CultivationPath,
  CultivationVersion
} from '../types/cultivation';

// Check if a tier is unlocked for a cultivation path
export function isTierUnlocked(
  tier: TierId | SpellLevel,
  selectedAbilities: string[],
  pathAbilities: Ability[],
  characterLevel: number
): boolean {
  // Cantrips and 1st-2nd level spells are initiate equivalent
  if (tier === 'cantrip' || tier === '1st' || tier === '2nd') {
    return true;
  }

  // Spell-level character level gates
  if (tier === '3rd' || tier === '4th') {
    return characterLevel >= 5;
  }
  if (tier === '5th' || tier === '6th') {
    return characterLevel >= 9;
  }
  if (tier === '7th' || tier === '8th') {
    return characterLevel >= 13;
  }
  if (tier === '9th') {
    return characterLevel >= 17;
  }

  // Tier-based custom abilities
  const tierIndex = ['initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster'].indexOf(tier as TierId);
  if (tierIndex === 0) return true;

  const tierLevelRequirements = [1, 5, 9, 13, 17];
  if (characterLevel < tierLevelRequirements[tierIndex]) {
    return false;
  }

  const prevTier = ['initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster'][tierIndex - 1] as TierId;

  const prevTierAbilities = pathAbilities.filter(ability => {
    if (ability.isCantrip || ability.isSpell) {
      const spellTier = ability.tier as SpellLevel;
      if (prevTier === 'initiate' && (spellTier === 'cantrip' || spellTier === '1st' || spellTier === '2nd')) return true;
      if (prevTier === 'adept' && (spellTier === '3rd' || spellTier === '4th')) return true;
      if (prevTier === 'master' && (spellTier === '5th' || spellTier === '6th')) return true;
      if (prevTier === 'grandmaster' && (spellTier === '7th' || spellTier === '8th')) return true;
      if (prevTier === 'greatgrandmaster' && spellTier === '9th') return true;
      return false;
    }
    return ability.tier === prevTier;
  });

  return prevTierAbilities.some(ability => selectedAbilities.includes(ability.id));
}

// Calculate total essence points spent
export function calculateTotalPointsSpent(selectedAbilities: string[], allAbilities: Ability[]): number {
  return selectedAbilities.reduce((total, abilityId) => {
    const ability = allAbilities.find(a => a.id === abilityId);
    if (!ability) return total;
    return total + getTierCost(ability.tier);
  }, 0);
}

// Calculate maximum available essence points (reduced by passives and cantrips)
export function calculateEffectiveMaxPoints(
  level: number,
  selectedAbilities: string[],
  allAbilities: Ability[]
): number {
  const totalEssencePoints = calculateEssencePoints(level);

  const passiveReduction = selectedAbilities.reduce((total, abilityId) => {
    const ability = allAbilities.find(a => a.id === abilityId);
    if (!ability) return total;
    if (ability.isPassive || ability.isCantrip) {
      return total + getTierCost(ability.tier);
    }
    return total;
  }, 0);

  return totalEssencePoints - passiveReduction;
}

// Get all abilities for a specific cultivation path
export function getCultivationPathAbilities(
  pathId: CultivationPathId,
  allAbilities: Record<CultivationPathId, Ability[]>,
  cantrips: Record<CultivationPathId, Ability[]>,
  spells: Record<CultivationPathId, Ability[]>
): Ability[] {
  return [
    ...(allAbilities[pathId] || []),
    ...(cantrips[pathId] || []),
    ...(spells[pathId] || [])
  ];
}

// Check if a path has any selected abilities
export function pathHasActiveAbilities(
  pathId: CultivationPathId,
  selectedAbilities: string[],
  allAbilities: Record<CultivationPathId, Ability[]>,
  cantrips: Record<CultivationPathId, Ability[]>,
  spells: Record<CultivationPathId, Ability[]>
): boolean {
  const pathAbilities = getCultivationPathAbilities(pathId, allAbilities, cantrips, spells);
  return pathAbilities.some(ability => selectedAbilities.includes(ability.id));
}

// Calculate spent, available, max, and passive reduction for a path
export function calculatePathEssenceStatus(
  pathId: CultivationPathId,
  character: CultivationCharacter,
  allAbilities: Record<CultivationPathId, Ability[]>,
  cantrips: Record<CultivationPathId, Ability[]>,
  spells: Record<CultivationPathId, Ability[]>,
): { spent: number; available: number; max: number; passiveReduction: number } {
  const { selectedAbilities, activeEssenceByPath } = character;
  const pathAbilities = getCultivationPathAbilities(pathId, allAbilities, cantrips, spells);

  const passiveReduction = selectedAbilities.reduce((total, abilityId) => {
    const ability = pathAbilities.find(a => a.id === abilityId);
    if (!ability) return total;
    if (ability.isPassive || ability.isCantrip) {
      return total + getTierCost(ability.tier);
    }
    return total;
  }, 0);

  const spent = activeEssenceByPath[pathId] || 0;

  const activePathAbilities = pathAbilities.filter(ability =>
    selectedAbilities.includes(ability.id) && (ability.isActive || ability.isSpell)
  );

  const available = activePathAbilities.reduce((total, ability) =>
    total + getTierCost(ability.tier), 0
  );

  const max = available + passiveReduction;

  return {
    spent,
    available,
    max,
    passiveReduction
  };
}

// Filter abilities by type
export function getFilteredAbilities(
  abilities: Ability[],
  filterType: string
): Ability[] {
  if (filterType === 'all') return abilities;
  if (filterType === 'active') return abilities.filter(a => a.isActive);
  if (filterType === 'passive') return abilities.filter(a => a.isPassive);
  if (filterType === 'cantrip') return abilities.filter(a => a.isCantrip);
  if (filterType === 'spell') return abilities.filter(a => a.isSpell);
  return abilities;
}

// Check if an ability should be unallocated when prerequisites are not met
export function shouldUnallocateAbility(
  ability: Ability,
  selectedAbilities: string[],
  pathAbilities: Ability[],
  characterLevel: number
): boolean {
  return !isTierUnlocked(ability.tier, selectedAbilities, pathAbilities, characterLevel);
}

export interface V1CharacterConfig {
  characterLevel?: number;
  level?: number;
  selectedAbilities?: string[];
  activeEssenceByPath?: Record<string, number>;
  version?: string;
}

const LEGACY_MUTAGEN_IDS: Record<string, string> = {
  poison_adept_enhanced_mutagen: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_dexterity: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_constitution: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_intelligence: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_wisdom: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_charisma: 'alchemy_adept_mutagen_formula'
};

export function reconcileCultivationCharacter(
  saved: CultivationCharacter,
  cultivationData: {
    abilities: Record<CultivationPathId, Ability[]>;
    cantrips: Record<CultivationPathId, Ability[]>;
    spells: Record<CultivationPathId, Ability[]>;
  },
  paths: CultivationPath[],
  catalogVersion: CultivationVersion
): CultivationCharacter {
  const availableIds = new Set<string>();
  for (const path of paths) {
    getCultivationPathAbilities(path.id, cultivationData.abilities, cultivationData.cantrips, cultivationData.spells)
      .forEach(ability => availableIds.add(ability.id));
  }

  const selectedAbilities: string[] = [];
  const selectedSet = new Set<string>();
  let retiredCount = 0;
  let mergedMutagenCount = 0;
  for (const oldId of saved.selectedAbilities || []) {
    const mappedId = LEGACY_MUTAGEN_IDS[oldId] || oldId;
    if (LEGACY_MUTAGEN_IDS[oldId]) mergedMutagenCount++;
    if (!availableIds.has(mappedId)) {
      retiredCount++;
      continue;
    }
    if (selectedSet.has(mappedId)) {
      if (LEGACY_MUTAGEN_IDS[oldId]) mergedMutagenCount++;
      continue;
    }
    selectedSet.add(mappedId);
    selectedAbilities.push(mappedId);
  }

  const activeEssenceByPath = paths.reduce((acc, path) => ({
    ...acc,
    [path.id]: 0
  }), {} as Record<CultivationPathId, number>);
  const notices = [`Cultivation ${catalogVersion.toUpperCase()} uses a new path catalog. Active Essence trackers were reset; review the selected abilities and current path allocations.`];
  if (mergedMutagenCount) notices.push(`${mergedMutagenCount} old mutagen selection(s) were consolidated.`);
  if (retiredCount) notices.push(`${retiredCount} retired selection(s) were removed.`);

  return {
    level: saved.level,
    selectedAbilities,
    activeEssenceByPath,
    version: catalogVersion,
    migrationNotice: notices.join(' ')
  };
}

// Migrate v1 saved character data to v2 cultivation character
export function migrateV1CharacterToCultivation(
  v1Config: V1CharacterConfig,
  cultivationData: {
    abilities: Record<CultivationPathId, Ability[]>;
    cantrips: Record<CultivationPathId, Ability[]>;
    spells: Record<CultivationPathId, Ability[]>;
  },
  paths: CultivationPath[],
  catalogVersion: CultivationVersion
): CultivationCharacter {
  const level = v1Config.characterLevel || v1Config.level || 1;
  const rawSelected: string[] = Array.isArray(v1Config.selectedAbilities) ? v1Config.selectedAbilities : [];

  // Flatten all v2 cultivation abilities
  const allV2Abilities: Record<string, { pathId: CultivationPathId; abilityId: string }> = {};
  for (const path of paths) {
    const list = getCultivationPathAbilities(path.id, cultivationData.abilities, cultivationData.cantrips, cultivationData.spells);
    for (const a of list) {
      allV2Abilities[a.id] = { pathId: path.id, abilityId: a.id };
    }
  }

  // Filter selected abilities to those present in v2
  const selectedAbilities: string[] = [];
  const activeEssenceByPath = paths.reduce((acc, p) => ({
    ...acc,
    [p.id]: 0
  }), {} as Record<CultivationPathId, number>);

  for (const id of rawSelected) {
    const matchingAbility = allV2Abilities[LEGACY_MUTAGEN_IDS[id] || id];
    if (matchingAbility) {
      selectedAbilities.push(matchingAbility.abilityId);
      const pathId = matchingAbility.pathId;
      // Find ability to check if active/spell
      const pathList = getCultivationPathAbilities(pathId, cultivationData.abilities, cultivationData.cantrips, cultivationData.spells);
      const found = pathList.find(a => a.id === matchingAbility.abilityId);
      if (found && (found.isActive || found.isSpell)) {
        activeEssenceByPath[pathId] = (activeEssenceByPath[pathId] || 0) + getTierCost(found.tier);
      }
    }
  }

  return {
    level,
    selectedAbilities,
    activeEssenceByPath,
    version: catalogVersion
  };
}
