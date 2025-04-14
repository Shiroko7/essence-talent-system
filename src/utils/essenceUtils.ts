import { 
  Ability, 
  Character, 
  EssencePathId, 
  TierId, 
  SpellLevel,
  calculateEssencePoints,
  getTierCost
} from '../types/essence';

// Updated to include cantrips and spells in tier unlocking
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
  
  // For higher tiers, check character level first
  const tierLevelRequirements = [1, 5, 9, 13, 17];
  if (characterLevel < tierLevelRequirements[tierIndex]) {
    return false;
  }
  
  // Then check if we have any ability from the previous tier
  const prevTier = ['initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster'][tierIndex - 1] as TierId;
  
  // Find all abilities from the previous tier (including cantrips and spells)
  const prevTierAbilities = pathAbilities.filter(ability => {
    // For spells and cantrips, map them to the appropriate tier
    if (ability.isCantrip || ability.isSpell) {
      const spellTier = ability.tier as SpellLevel;
      if (prevTier === 'initiate' && (spellTier === 'cantrip' || spellTier === '1st' || spellTier === '2nd')) {
        return true;
      }
      if (prevTier === 'adept' && spellTier === '3rd' || spellTier === '4th') {
        return true;
      }
      if (prevTier === 'master' && spellTier === '5th' || spellTier === '6th') {
        return true;
      }
      if (prevTier === 'grandmaster' && spellTier === '7th' || spellTier === '8th') {
        return true;
      }
      return false;
    }
    
    // For regular abilities
    return ability.tier === prevTier;
  });
  
  // Check if the player has selected any of these abilities
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
    selectedAbilities.includes(ability.id)
  );
}


// Calculate spent and available essence for a specific path
export function calculatePathEssenceStatus(
  pathId: EssencePathId,
  character: Character,
  allAbilities: Record<EssencePathId, Ability[]>,
  cantrips: Record<EssencePathId, Ability[]>,
  spells: Record<EssencePathId, Ability[]>,
  totalAvailablePoints: number
): { spent: number; available: number; max: number; passiveReduction: number; } {
  const { selectedAbilities, activeEssenceByPath } = character;
  
  // Get all abilities for this path
  const pathAbilities = getPathAbilities(pathId, allAbilities, cantrips, spells);
  
  // Calculate passive reduction specifically for this path
  const passiveReduction = selectedAbilities.reduce((total, abilityId) => {
    const ability = pathAbilities.find(a => a.id === abilityId);
    
    if (!ability) return total;
    
    // Only passive abilities and cantrips reduce maximum essence
    if (ability.isPassive || ability.isCantrip) {
      return total + getTierCost(ability.tier);
    }
    return total;
  }, 0);
  
  // Calculate the essence currently spent on this path
  const spent = activeEssenceByPath[pathId] || 0;
  
  // Calculate the total amount that could potentially be spent on this path
  // (i.e., the sum of costs for all active abilities and spells)
  const activePathAbilities = pathAbilities.filter(ability => 
    selectedAbilities.includes(ability.id) && (ability.isActive || ability.isSpell)
  );
  
  const potentialActiveTotal = activePathAbilities.reduce((total, ability) => 
    total + getTierCost(ability.tier), 0
  );
  
  // Calculate available essence points
  const available =  potentialActiveTotal - spent;
  
  return {
    spent,
    available,
    max: potentialActiveTotal, // This is the maximum that can be spent on actives
    passiveReduction // This is the amount reduced by passives and cantrips
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
