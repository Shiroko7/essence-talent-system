import { useState, useEffect } from 'react';
import { 
  Character, 
  Ability, 
  EssencePathId,
  calculateEssencePoints,
  ESSENCE_PATHS
} from '../types/essence';
import { 
  calculateTotalPointsSpent, 
  calculateEffectiveMaxPoints,
  getPathAbilities,
  shouldUnallocateAbility
} from '../utils/essenceUtils';

interface EssenceAllocationProps {
  initialLevel?: number;
  initialSelectedAbilities?: string[];
  allAbilities: Record<EssencePathId, Ability[]>;
  cantrips: Record<EssencePathId, Ability[]>;
  spells: Record<EssencePathId, Ability[]>;
}

const useEssenceAllocation = ({
  initialLevel = 1,
  initialSelectedAbilities = [],
  allAbilities,
  cantrips,
  spells
}: EssenceAllocationProps) => {
  const [character, setCharacter] = useState<Character>({
    level: initialLevel,
    selectedAbilities: initialSelectedAbilities,
    activeEssenceByPath: ESSENCE_PATHS.reduce((acc, path) => ({
      ...acc,
      [path.id]: 0
    }), {} as Record<EssencePathId, number>)
  });

  // Derived states
  const allAbilitiesList = Object.values(allAbilities).flat().concat(
    Object.values(cantrips).flat(),
    Object.values(spells).flat()
  );
  
  const totalEssencePoints = calculateEssencePoints(character.level);
  const totalPointsSpent = calculateTotalPointsSpent(character.selectedAbilities, allAbilitiesList);
  const effectiveMaxPoints = calculateEffectiveMaxPoints(character.level, character.selectedAbilities, allAbilitiesList);
  const availablePoints = effectiveMaxPoints - totalPointsSpent;

  // Function to toggle ability selection
  const toggleAbility = (ability: Ability, pathId: EssencePathId) => {
    const isSelected = character.selectedAbilities.includes(ability.id);
    const pathAbilities = getPathAbilities(pathId, allAbilities, cantrips, spells);
    
    // If already selected, remove it
    if (isSelected) {
      // Create a copy of selectedAbilities without this ability
      const newSelectedAbilities = character.selectedAbilities.filter(id => id !== ability.id);
      
      // Check if removing this ability would require unallocating higher tier abilities
      const abilitiesToUnallocate = pathAbilities
        .filter(a => 
          character.selectedAbilities.includes(a.id) && 
          shouldUnallocateAbility(a, newSelectedAbilities, pathAbilities, character.level)
        )
        .map(a => a.id);
      
      // Combine the ability being removed with any that must be unallocated
      const allToRemove = [ability.id, ...abilitiesToUnallocate];
      
      // Update character state
      setCharacter(prev => ({
        ...prev,
        selectedAbilities: prev.selectedAbilities.filter(id => !allToRemove.includes(id)),
        // Reset active essence for this path if there are no active abilities left
        activeEssenceByPath: {
          ...prev.activeEssenceByPath,
          [pathId]: 0
        }
      }));
      
      return;
    }
    
    // For selection logic, we need to check tier requirements and essence availability
    // For passive and cantrip abilities
    if (ability.isPassive || ability.isCantrip) {
      // Check if we have enough total essence points (not currently spent)
      const potentialMaxReduction = calculateEffectiveMaxPoints(
        character.level, 
        [...character.selectedAbilities, ability.id], 
        allAbilitiesList
      );
      
      // If adding this passive/cantrip would reduce max essence below what's already spent, block it
      if (potentialMaxReduction < totalPointsSpent) {
        alert("Adding this passive/cantrip would reduce your maximum essence below what you've already spent!");
        return;
      }
    } 
    // For active abilities and spells
    else if (ability.isActive || ability.isSpell) {
      // Check available points
      const cost = ability.isSpell ? 
        (ability.tier === '1st' ? 1 : ability.tier === '2nd' ? 2 : ability.tier === '3rd' ? 3 : 4) :
        (ability.tier === 'initiate' ? 1 : ability.tier === 'adept' ? 2 : ability.tier === 'master' ? 3 : 
         ability.tier === 'grandmaster' ? 4 : 5);
      
      if (cost > availablePoints) {
        alert("Not enough essence points available!");
        return;
      }
    }
    
    // Add the ability
    setCharacter(prev => ({
      ...prev,
      selectedAbilities: [...prev.selectedAbilities, ability.id]
    }));
  };

  // Function to update character level
  const updateCharacterLevel = (newLevel: number) => {
    setCharacter(prev => ({
      ...prev,
      level: newLevel
    }));
  };

  // Function to reset character
  const resetCharacter = () => {
    setCharacter({
      level: initialLevel,
      selectedAbilities: [],
      activeEssenceByPath: ESSENCE_PATHS.reduce((acc, path) => ({
        ...acc,
        [path.id]: 0
      }), {} as Record<EssencePathId, number>)
    });
  };

  // Function to update active essence spent per path
  const updateActiveEssence = (pathId: EssencePathId, amount: number) => {
    setCharacter(prev => {
      // Calculate the new amount, ensuring it's within bounds
      const currentSpent = prev.activeEssenceByPath[pathId] || 0;
      const newAmount = Math.max(0, currentSpent + amount);
      
      // Calculate the maximum that can be spent on this path
      const pathAbilities = getPathAbilities(pathId, allAbilities, cantrips, spells)
        .filter(ability => 
          prev.selectedAbilities.includes(ability.id) && 
          (ability.isActive || ability.isSpell)
        );
        
      const maxForPath = pathAbilities.reduce((total, ability) => {
        const cost = ability.isSpell ? 
          (ability.tier === '1st' ? 1 : ability.tier === '2nd' ? 2 : ability.tier === '3rd' ? 3 : 4) :
          (ability.tier === 'initiate' ? 1 : ability.tier === 'adept' ? 2 : ability.tier === 'master' ? 3 : 
           ability.tier === 'grandmaster' ? 4 : 5);
        return total + cost;
      }, 0);
      
      // Ensure we don't exceed the maximum for this path or the effective max
      const finalAmount = Math.min(newAmount, maxForPath, effectiveMaxPoints);
      
      return {
        ...prev,
        activeEssenceByPath: {
          ...prev.activeEssenceByPath,
          [pathId]: finalAmount
        }
      };
    });
  };

  // When level changes, validate all abilities
  useEffect(() => {
    // Check if any abilities need to be unallocated due to level change
    const shouldBeUnallocated = new Set<string>();
    
    ESSENCE_PATHS.forEach(path => {
      const pathAbilities = getPathAbilities(path.id, allAbilities, cantrips, spells);
      
      pathAbilities.forEach(ability => {
        if (
          character.selectedAbilities.includes(ability.id) &&
          shouldUnallocateAbility(ability, character.selectedAbilities, pathAbilities, character.level)
        ) {
          shouldBeUnallocated.add(ability.id);
        }
      });
    });
    
    if (shouldBeUnallocated.size > 0) {
      setCharacter(prev => ({
        ...prev,
        selectedAbilities: prev.selectedAbilities.filter(id => !shouldBeUnallocated.has(id)),
        // Reset active essence for paths with unallocated abilities
        activeEssenceByPath: ESSENCE_PATHS.reduce((acc, path) => {
          const pathHasUnallocated = getPathAbilities(path.id, allAbilities, cantrips, spells)
            .some(ability => 
              ability.id in shouldBeUnallocated && 
              (ability.isActive || ability.isSpell)
            );
            
          return {
            ...acc,
            [path.id]: pathHasUnallocated ? 0 : (prev.activeEssenceByPath[path.id] || 0)
          };
        }, { ...prev.activeEssenceByPath })
      }));
    }
  }, [character.level, character.selectedAbilities, allAbilities, cantrips, spells]);

  return {
    character,
    totalEssencePoints,
    totalPointsSpent,
    effectiveMaxPoints,
    availablePoints,
    toggleAbility,
    updateCharacterLevel,
    resetCharacter,
    updateActiveEssence
  };
};

export default useEssenceAllocation;
