import { useState, useEffect } from 'react';
import { 
  Character, 
  Ability, 
  EssencePathId,
  calculateEssencePoints,
  ESSENCE_PATHS,
  getTierCost
} from '../types/essence';
import { 
  calculateTotalPointsSpent, 
  calculateEffectiveMaxPoints,
  getPathAbilities,
  shouldUnallocateAbility
} from '../utils/essenceUtils';

// Create storage keys
const STORAGE_KEY_CHARACTER = 'essence-talent-system-character';

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
  // Try to load character from localStorage or use default
  const loadCharacterFromStorage = (): Character => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY_CHARACTER);
      if (savedData) {
        const parsedData = JSON.parse(savedData) as Character;
        return parsedData;
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }

    // Return default character if nothing in storage or error
    return {
      level: initialLevel,
      selectedAbilities: initialSelectedAbilities,
      activeEssenceByPath: ESSENCE_PATHS.reduce((acc, path) => ({
        ...acc,
        [path.id]: 0
      }), {} as Record<EssencePathId, number>)
    };
  };

  const [character, setCharacter] = useState<Character>(loadCharacterFromStorage);
  const [currentAbilityError, setCurrentAbilityError] = useState<Ability | null>(null);

  // Save character to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHARACTER, JSON.stringify(character));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [character]);

  // Derived states
  const allAbilitiesList = Object.values(allAbilities).flat().concat(
    Object.values(cantrips).flat(),
    Object.values(spells).flat()
  );
  
  const totalEssencePoints = calculateEssencePoints(character.level);
  const totalPointsSpent = calculateTotalPointsSpent(character.selectedAbilities, allAbilitiesList);
  const effectiveMaxPoints = calculateEffectiveMaxPoints(character.level, character.selectedAbilities, allAbilitiesList);
  const availablePoints = effectiveMaxPoints;

  // Calculate the passive reduction per path
  const getPathPassiveReduction = (pathId: EssencePathId) => {
    const pathAbilities = getPathAbilities(pathId, allAbilities, cantrips, spells);
    
    return character.selectedAbilities.reduce((total, abilityId) => {
      const ability = pathAbilities.find(a => a.id === abilityId);
      if (!ability) return total;
      
      // Only passive abilities and cantrips reduce maximum essence
      if (ability.isPassive || ability.isCantrip) {
        return total + getTierCost(ability.tier);
      }
      return total;
    }, 0);
  };

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

      // Calculate how much essence to deallocate from this path
      let essenceToRemove = 0;
      if (ability.isActive || ability.isSpell) {
        // For the ability being removed
        essenceToRemove += getTierCost(ability.tier);

        // For any active abilities that are being unallocated
        abilitiesToUnallocate.forEach(abilityId => {
          const unallocatedAbility = pathAbilities.find(a => a.id === abilityId);
          if (unallocatedAbility && (unallocatedAbility.isActive || unallocatedAbility.isSpell)) {
            essenceToRemove += getTierCost(unallocatedAbility.tier);
          }
        });
      }

      // Update character state
      setCharacter(prev => ({
        ...prev,
        selectedAbilities: prev.selectedAbilities.filter(id => !allToRemove.includes(id)),
        // Decrease active essence for this path
        activeEssenceByPath: {
          ...prev.activeEssenceByPath,
          [pathId]: Math.max(0, (prev.activeEssenceByPath[pathId] || 0) - essenceToRemove)
        }
      }));

      return;
    }
    
    // Check available points
    const cost = getTierCost(ability.tier);
  
    if (cost + totalPointsSpent > totalEssencePoints) {
      // Instead of alert, set the current ability with error
      setCurrentAbilityError(ability);
      return;
    }
    
    // Add the ability
    setCharacter(prev => {
      // If it's an active ability or spell, auto-allocate its essence
      const essenceToAdd = (ability.isActive || ability.isSpell) ? getTierCost(ability.tier) : 0;

      return {
        ...prev,
        selectedAbilities: [...prev.selectedAbilities, ability.id],
        activeEssenceByPath: {
          ...prev.activeEssenceByPath,
          [pathId]: (prev.activeEssenceByPath[pathId] || 0) + essenceToAdd
        }
      };
    });
  };

  // Function to clear the ability error
  const clearAbilityError = () => {
    setCurrentAbilityError(null);
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
    const newCharacter = {
      level: initialLevel,
      selectedAbilities: [],
      activeEssenceByPath: ESSENCE_PATHS.reduce((acc, path) => ({
        ...acc,
        [path.id]: 0
      }), {} as Record<EssencePathId, number>)
    };
    
    setCharacter(newCharacter);
    
    // Also clear localStorage
    try {
      localStorage.removeItem(STORAGE_KEY_CHARACTER);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  // Function to set the entire character state (used for loading saved configs)
  const setCharacterState = (newState: Character) => {
    setCharacter(newState);
  };

  // Function to update active essence spent per path
  const updateActiveEssence = (pathId: EssencePathId, amount: number) => {
    setCharacter(prev => {
      // Calculate the new amount, ensuring it's within bounds
      const currentSpent = prev.activeEssenceByPath[pathId] || 0;
      const newAmount = Math.max(0, currentSpent + amount);

      // Calculate the maximum that can be spent on this path
      // (sum of costs for all selected active abilities and spells in this path)
      const pathAbilities = getPathAbilities(pathId, allAbilities, cantrips, spells)
        .filter(ability =>
          prev.selectedAbilities.includes(ability.id) &&
          (ability.isActive || ability.isSpell)
        );

      const maxForPath = pathAbilities.reduce((total, ability) => {
        return total + getTierCost(ability.tier);
      }, 0);

      // Ensure we don't exceed the maximum for this path
      const finalAmount = Math.min(newAmount, maxForPath);

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
              shouldBeUnallocated.has(ability.id) && 
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
    updateActiveEssence,
    getPathPassiveReduction,
    setCharacterState,
    currentAbilityError,
    clearAbilityError
  };
};

export default useEssenceAllocation;
