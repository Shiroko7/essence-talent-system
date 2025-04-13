import { 
  Ability, 
  Character, 
  EssencePathId, 
  TierId, 
  SpellLevel,
  calculateEssencePoints,
  getTierCost
} from '../types/essence';

// Check if a tier is unlocked
export function isTierUnlocked(
  tier: TierId | SpellLevel,
  selectedAbilities: string[],
  pathAbilities: Ability[],
  characterLevel: number
): boolean {
  // Cantrips and 1st level spells are always available
  if (tier === 'cantrip' || tier === '1st') {
    return true;
  }

  // For spells 2nd level and above, check for tier requirements
  if (tier === '2nd') {
    return characterLevel >= 5;
  }
  if (tier === '3rd') {
    return characterLevel >= 9;
  }
  if (tier === '4th') {
    return characterLevel >= 13;
  }

  // For tier-based abilities
  const tierIndex = ['initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster'].indexOf(tier as TierId);
  
  // Initiate is always unlocked
  if (tierIndex === 0) return true;
  
  // For higher tiers, check if we have any ability from the previous tier
  const prevTier = ['initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster'][tierIndex - 1] as TierId;
  
  return pathAbilities
    .some(ability => {
      const tierMatch = ability.tier === prevTier;
      const isSelected = selectedAbilities.includes(ability.id);
      return tierMatch && isSelected;
    });
}

// Calculate total essence points spent
export function calculateTotalPointsSpent(selectedAbilities: string[], allAbilities: Ability[]): number {
  return selectedAbilities.reduce((total, abilityId) => {
    const ability = allAbilities.find(a => a.id === abilityId);
    if (!ability) return total;
    
    // Only active abilities and spells cost essence to use
    if (ability.isActive || ability.isSpell) {
      return total + getTierCost(ability.tier);
    }
    return total;
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
    
    // Passive abilities and cantrips reduce maximum essence
    if (ability.isPassive || ability.isCantrip) {
      return total + getTierCost(ability.tier);
    }
    return total;
  }, 0);
  
  return totalEssencePoints - passiveReduction;
}

// Get abilities for a specific path
export function getPathAbilities(
  pathId: EssencePathId,
  allAbilities: Record<EssencePathId, Ability[]>,
  cantrips: Record<EssencePathId, Ability[]>,
  spells: Record<EssencePathId, Ability[]>
): Ability[] {
  // Combine regular abilities, cantrips, and spells for this path
  return [
    ...(allAbilities[pathId] || []),
    ...(cantrips[pathId] || []),
    ...(spells[pathId] || [])
  ];
}

// Check if a path has any active abilities or spells
export function pathHasActiveAbilities(
  pathId: EssencePathId,
  selectedAbilities: string[],
  allAbilities: Record<EssencePathId, Ability[]>,
  cantrips: Record<EssencePathId, Ability[]>,
  spells: Record<EssencePathId, Ability[]>
): boolean {
  const pathAbilities = getPathAbilities(pathId, allAbilities, cantrips, spells);
  
  return pathAbilities.some(ability => 
    selectedAbilities.includes(ability.id) && (ability.isActive || ability.isSpell)
  );
}

// Calculate spent and available essence for a specific path
export function calculatePathEssenceStatus(
  pathId: EssencePathId,
  character: Character,
  allAbilities: Record<EssencePathId, Ability[]>,
  cantrips: Record<EssencePathId, Ability[]>,
  spells: Record<EssencePathId, Ability[]>
): { spent: number; available: number; max: number; } {
  const { level, selectedAbilities, activeEssenceByPath } = character;
  const effectiveMax = calculateEffectiveMaxPoints(level, selectedAbilities, 
    Object.values(allAbilities).flat().concat(
      Object.values(cantrips).flat(),
      Object.values(spells).flat()
    )
  );
  
  // Calculate the essence currently spent on this path (from the simulation)
  const spent = activeEssenceByPath[pathId] || 0;
  
  // Calculate the total amount that could potentially be spent on this path
  const pathAbilities = getPathAbilities(pathId, allAbilities, cantrips, spells)
    .filter(ability => selectedAbilities.includes(ability.id) && (ability.isActive || ability.isSpell));
  
  const potentialTotal = pathAbilities.reduce((total, ability) => 
    total + getTierCost(ability.tier), 0);
  
  // The available essence is the minimum of the effective max and the potential total,
  // minus what's already been spent
  const available = Math.min(effectiveMax, potentialTotal) - spent;
  
  return {
    spent,
    available,
    max: Math.min(effectiveMax, potentialTotal)
  };
}

// Function to get filtered abilities based on selected filter
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

// Check if an ability should be auto-unallocated (when prerequisites are not met)
export function shouldUnallocateAbility(
  ability: Ability,
  selectedAbilities: string[],
  pathAbilities: Ability[],
  characterLevel: number
): boolean {
  // If the ability's tier is not unlocked, it should be unallocated
  return !isTierUnlocked(ability.tier, selectedAbilities, pathAbilities, characterLevel);
}
