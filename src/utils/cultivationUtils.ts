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

export const LEGACY_MUTAGEN_IDS: Record<string, string> = {
  poison_adept_enhanced_mutagen: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_dexterity: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_constitution: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_intelligence: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_wisdom: 'alchemy_adept_mutagen_formula',
  poison_adept_enhanced_mutagen_charisma: 'alchemy_adept_mutagen_formula'
};

/** V1 abilities that V2 keeps under a new ID, usually because they moved to another path. */
export const RENAMED_V1_IDS: Record<string, string> = {
  acid_3rd_level_hunger_of_hadar: 'void_3rd_hunger_of_hadar',
  acid_4th_level_vitriolic_sphere: 'v2_alchemy_vitriolic_sphere',
  acid_8th_level_antimagic_field: 'void_8th_antimagic_field',
  acid_9th_level_storm_of_vengeance: 'tempest_9th_storm_of_vengeance',
  wind_cantrip_gust: 'tempest_cantrip_gust',
  wind_cantrip_thunderclap: 'tempest_cantrip_thunderclap',
  wind_1st_level_fog_cloud: 'tempest_1st_fog_cloud',
  wind_1st_level_thunderwave: 'tempest_1st_thunderwave',
  wind_2nd_level_shatter: 'v2_metal_shatter',
  wind_2nd_level_silence: 'void_2nd_silence',
  wind_5th_level_cloudkill: 'pestilence_5th_cloudkill',
  wind_5th_level_cone_of_cold: 'tempest_5th_cone_of_cold',
  wind_5th_level_control_winds: 'tempest_5th_control_winds',
  wind_7th_level_etherealness: 'void_7th_etherealness',
  wind_7th_level_whirlwind: 'tempest_7th_whirlwind',
  wind_8th_level_control_weather: 'tempest_8th_control_weather',
  wind_9th_level_storm_of_vengeance: 'tempest_9th_storm_of_vengeance',
  earth_5th_level_destructive_wave: 'tempest_5th_destructive_wave',
  earth_7th_level_reverse_gravity: 'wind_7th_level_reverse_gravity',
  earth_9th_level_meteor_swarm: 'fire_9th_level_meteor_swarm',
  lightning_cantrip_lightning_lure: 'v2_lightning_lightning_lure',
  lightning_cantrip_shocking_grasp: 'tempest_cantrip_shocking_grasp',
  lightning_1st_level_witch_bolt: 'v2_lightning_witch_bolt',
  lightning_3rd_level_call_lightning: 'tempest_3rd_call_lightning',
  lightning_3rd_level_lightning_bolt: 'tempest_3rd_lightning_bolt',
  lightning_4th_level_storm_sphere: 'tempest_4th_storm_sphere',
  lightning_6th_level_chain_lightning: 'v2_lightning_chain_lightning',
  lightning_8th_level_control_weather: 'tempest_8th_control_weather',
  lightning_9th_level_storm_of_vengeance: 'tempest_9th_storm_of_vengeance',
  metal_9th_level_foresight: 'moon_9th_foresight',
  poison_adept_moonlit_verdant_beam: 'water_adept_moonlit_verdant_beam',
  poison_cantrip_poison_spray: 'pestilence_cantrip_poison_spray',
  poison_cantrip_infestation: 'pestilence_cantrip_infestation',
  poison_1st_level_ray_of_sickness: 'pestilence_1st_ray_of_sickness',
  poison_1st_level_purify_food_and_drink: 'pestilence_1st_purify_food_and_drink',
  poison_2nd_level_protection_from_poison: 'pestilence_2nd_protection_from_poison',
  poison_3rd_level_bestow_curse: 'torment_3rd_bestow_curse',
  poison_5th_level_cloudkill: 'pestilence_5th_cloudkill',
  poison_5th_level_contagion: 'pestilence_5th_contagion',
  poison_6th_level_circle_of_death: 'ruin_6th_circle_of_death',
  water_1st_level_detect_poison_and_disease: 'pestilence_1st_detect_poison_and_disease',
  water_1st_level_fog_cloud: 'tempest_1st_fog_cloud',
  water_2nd_level_protection_from_poison: 'pestilence_2nd_protection_from_poison',
  water_3rd_level_sleet_storm: 'tempest_3rd_sleet_storm',
  water_3rd_level_tidal_wave: 'tempest_3rd_tidal_wave',
  water_4th_level_ice_storm: 'v2_tempest_ice_storm',
  water_4th_level_vitriolic_sphere: 'v2_alchemy_vitriolic_sphere',
  water_5th_level_maelstrom: 'tempest_5th_maelstrom',
  water_8th_level_tsunami: 'tempest_8th_tsunami',
  water_5th_level_alustriels_mooncloak: 'moon_5th_alustriels_mooncloak',
  wood_1st_level_purify_food_and_drink: 'pestilence_1st_purify_food_and_drink',
  wood_2nd_level_pass_without_trace: 'void_2nd_pass_without_trace',
  wood_2nd_level_lesser_restoration: 'providence_2nd_lesser_restoration',
  wood_5th_level_contagion: 'pestilence_5th_contagion',
  wood_5th_level_insect_plague: 'pestilence_5th_insect_plague',
  wood_9th_level_shapechange: 'v2_moon_shapechange',
  wood_9th_level_true_polymorph: 'pestilence_9th_true_polymorph',
  acid_2nd_level_melfs_acid_arrow: 'v2_alchemy_acid_arrow',
  // Spells V1 listed under two essences; V2 keeps one of the IDs.
  wind_8th_level_incendiary_cloud: 'fire_8th_level_incendiary_cloud',
  water_2nd_level_misty_step: 'wind_2nd_level_misty_step',
  poison_7th_level_prismatic_spray: 'acid_7th_level_prismatic_spray',
  poison_9th_level_prismatic_wall: 'acid_9th_level_prismatic_wall',
  wood_3rd_level_leomunds_tiny_hut_repeat: 'wood_3rd_level_leomunds_tiny_hut',
  wood_2nd_level_animal_friendship_repeat: 'wood_1st_level_animal_friendship',
  // V1 listed a "Tree" spell that does not exist; its level and link point to Transport via Plants.
  wood_6th_level_tree: 'wood_6th_level_transport_via_plants'
};

/** The V2 ID a saved V1 ability ID now goes by. */
export const toV2Id = (id: string) => RENAMED_V1_IDS[id] || id;

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
    // The V2 catalog carries the mutagen variants again, so only fold IDs it no longer has.
    const legacyMutagen = !availableIds.has(oldId) && !!LEGACY_MUTAGEN_IDS[oldId];
    const mappedId = legacyMutagen ? LEGACY_MUTAGEN_IDS[oldId] : oldId;
    if (legacyMutagen) mergedMutagenCount++;
    if (!availableIds.has(mappedId)) {
      retiredCount++;
      continue;
    }
    if (selectedSet.has(mappedId)) {
      if (legacyMutagen) mergedMutagenCount++;
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

/**
 * Talents that changed tier after builds were saved with them. A build holding one
 * is re-checked on load: whatever the new tiers leave locked, or the higher costs
 * leave unaffordable, is dropped.
 */
export const RETIERED_TALENT_IDS = [
  'water_master_moonfall_condemnation',
  'wind_master_essence_lunar_wind_spiral',
  'water_master_lunar_tide'
];

/**
 * Abilities that moved path after builds were saved with them. They keep their
 * IDs, but a talent now needs its new path's lower tiers, and a spell no longer
 * opens tiers in its old path, so a build is re-checked the same way as for
 * retiered talents.
 */
export const MOVED_TALENT_IDS = [
  'wind_3rd_level_haste',
  'lightning_7th_level_teleport',
  'water_9th_level_time_stop',
  'v2_lunar_paradox',
  'v2_pestilence_time_ravage',
  'wood_master_heart_exchange'
];

export function settleRetieredTalents(
  character: CultivationCharacter,
  cultivationData: {
    abilities: Record<CultivationPathId, Ability[]>;
    cantrips: Record<CultivationPathId, Ability[]>;
    spells: Record<CultivationPathId, Ability[]>;
  },
  paths: CultivationPath[]
): CultivationCharacter {
  const held = [...RETIERED_TALENT_IDS, ...MOVED_TALENT_IDS].filter(id => character.selectedAbilities.includes(id));
  if (!held.length) return character;

  const pathAbilities = (pathId: CultivationPathId) =>
    getCultivationPathAbilities(pathId, cultivationData.abilities, cultivationData.cantrips, cultivationData.spells);
  // Every path is re-checked: a moved spell can also leave its old path without the tier it opened.
  const affected = paths;
  const all = paths.flatMap(path => pathAbilities(path.id));
  let selected = [...character.selectedAbilities];

  // Losing one ability can close the next tier up, so repeat until nothing else locks.
  const dropLocked = () => {
    for (let changed = true; changed;) {
      changed = false;
      for (const path of affected) {
        const abilities = pathAbilities(path.id);
        const locked = abilities.filter(a =>
          selected.includes(a.id) && shouldUnallocateAbility(a, selected, abilities, character.level));
        if (!locked.length) continue;
        selected = selected.filter(id => !locked.some(a => a.id === id));
        changed = true;
      }
    }
  };
  dropLocked();
  // The dearer tiers can push a build past its budget; give back the retiered talents first.
  for (const id of RETIERED_TALENT_IDS) {
    if (calculateTotalPointsSpent(selected, all) <= calculateEssencePoints(character.level)) break;
    if (!selected.includes(id)) continue;
    selected = selected.filter(s => s !== id);
    dropLocked();
  }

  const removed = character.selectedAbilities.filter(id => !selected.includes(id));
  if (!removed.length) return character;

  const activeEssenceByPath = { ...character.activeEssenceByPath };
  for (const path of affected) {
    const available = pathAbilities(path.id)
      .filter(a => selected.includes(a.id) && (a.isActive || a.isSpell))
      .reduce((total, a) => total + getTierCost(a.tier), 0);
    activeEssenceByPath[path.id] = Math.min(activeEssenceByPath[path.id] || 0, available);
  }
  const names = removed.map(id => all.find(a => a.id === id)?.name ?? id).join(', ');
  return {
    ...character,
    selectedAbilities: selected,
    activeEssenceByPath,
    migrationNotice: `Some abilities changed tier or moved to another path, so ${removed.length} selection(s) that no longer fit this build were removed: ${names}. Their Essence is free to spend again.`
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
    const matchingAbility = allV2Abilities[toV2Id(id)];
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
