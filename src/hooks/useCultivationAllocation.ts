import { useState, useEffect } from 'react';
import { Ability, calculateEssencePoints, getTierCost } from '../types/essence';
import {
  CultivationCharacter,
  CultivationPathId,
  CultivationPath,
  CultivationVersion
} from '../types/cultivation';
import {
  calculateTotalPointsSpent,
  calculateEffectiveMaxPoints,
  getCultivationPathAbilities,
  shouldUnallocateAbility,
  reconcileCultivationCharacter
} from '../utils/cultivationUtils';

const STORAGE_KEY_CULTIVATION: Record<CultivationVersion, string> = {
  v2: 'cultivation-paths-character-v2-seven-plus-seven'
};

interface CultivationAllocationProps {
  initialLevel?: number;
  initialSelectedAbilities?: string[];
  paths: CultivationPath[];
  catalogVersion: CultivationVersion;
  allAbilities: Record<CultivationPathId, Ability[]>;
  cantrips: Record<CultivationPathId, Ability[]>;
  spells: Record<CultivationPathId, Ability[]>;
}

export const useCultivationAllocation = ({
  initialLevel = 9,
  initialSelectedAbilities = [],
  paths,
  catalogVersion,
  allAbilities,
  cantrips,
  spells
}: CultivationAllocationProps) => {
  const loadCharacterFromStorage = (): CultivationCharacter => {
    try {
      const storageKey = STORAGE_KEY_CULTIVATION[catalogVersion];
      const activeCatalogData = localStorage.getItem(storageKey);
      const savedData = activeCatalogData ?? localStorage.getItem('cultivation-paths-character-v2');
      if (savedData) {
        const parsed = JSON.parse(savedData) as CultivationCharacter;
        if (parsed && typeof parsed.level === 'number' && Array.isArray(parsed.selectedAbilities)) {
          if (activeCatalogData && parsed.version === catalogVersion) return parsed;
          return reconcileCultivationCharacter(parsed, { abilities: allAbilities, cantrips, spells }, paths, catalogVersion);
        }
      }
    } catch (error) {
      console.error('Error loading cultivation character from storage:', error);
    }

    return {
      level: initialLevel,
      selectedAbilities: initialSelectedAbilities,
      activeEssenceByPath: paths.reduce((acc, path) => ({
        ...acc,
        [path.id]: 0
      }), {} as Record<CultivationPathId, number>),
      version: catalogVersion
    };
  };

  const [character, setCharacter] = useState<CultivationCharacter>(loadCharacterFromStorage);
  const [previousCharacter, setPreviousCharacter] = useState<CultivationCharacter | null>(null);
  const [currentAbilityError, setCurrentAbilityError] = useState<Ability | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CULTIVATION[catalogVersion], JSON.stringify(character));
    } catch (error) {
      console.error('Error saving cultivation character to storage:', error);
    }
  }, [character, catalogVersion]);

  const allAbilitiesList = Object.values(allAbilities).flat().concat(
    Object.values(cantrips).flat(),
    Object.values(spells).flat()
  );

  const totalEssencePoints = calculateEssencePoints(character.level);
  const totalPointsSpent = calculateTotalPointsSpent(character.selectedAbilities, allAbilitiesList);
  const effectiveMaxPoints = calculateEffectiveMaxPoints(character.level, character.selectedAbilities, allAbilitiesList);
  const availablePoints = effectiveMaxPoints;

  const getPathPassiveReduction = (pathId: CultivationPathId) => {
    const pathAbilities = getCultivationPathAbilities(pathId, allAbilities, cantrips, spells);
    return character.selectedAbilities.reduce((total, abilityId) => {
      const ability = pathAbilities.find(a => a.id === abilityId);
      if (!ability) return total;
      if (ability.isPassive || ability.isCantrip) {
        return total + getTierCost(ability.tier);
      }
      return total;
    }, 0);
  };

  const toggleAbility = (ability: Ability, pathId: CultivationPathId) => {
    const isSelected = character.selectedAbilities.includes(ability.id);
    const pathAbilities = getCultivationPathAbilities(pathId, allAbilities, cantrips, spells);

    if (isSelected) {
      const newSelectedAbilities = character.selectedAbilities.filter(id => id !== ability.id);

      const abilitiesToUnallocate = pathAbilities
        .filter(a =>
          character.selectedAbilities.includes(a.id) &&
          shouldUnallocateAbility(a, newSelectedAbilities, pathAbilities, character.level)
        )
        .map(a => a.id);

      const allToRemove = [ability.id, ...abilitiesToUnallocate];

      let essenceToRemove = 0;
      if (ability.isActive || ability.isSpell) {
        essenceToRemove += getTierCost(ability.tier);
        abilitiesToUnallocate.forEach(abilityId => {
          const unallocatedAbility = pathAbilities.find(a => a.id === abilityId);
          if (unallocatedAbility && (unallocatedAbility.isActive || unallocatedAbility.isSpell)) {
            essenceToRemove += getTierCost(unallocatedAbility.tier);
          }
        });
      }

      setCharacter(prev => ({
        ...prev,
        selectedAbilities: prev.selectedAbilities.filter(id => !allToRemove.includes(id)),
        activeEssenceByPath: {
          ...prev.activeEssenceByPath,
          [pathId]: Math.max(0, (prev.activeEssenceByPath[pathId] || 0) - essenceToRemove)
        }
      }));
      return;
    }

    const cost = getTierCost(ability.tier);
    if (cost + totalPointsSpent > totalEssencePoints) {
      setCurrentAbilityError(ability);
      return;
    }

    setCharacter(prev => {
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

  const clearAbilityError = () => setCurrentAbilityError(null);

  const updateCharacterLevel = (newLevel: number) => {
    setCharacter(prev => ({ ...prev, level: newLevel }));
  };

  const resetCharacter = () => {
    setPreviousCharacter(character);
    const newCharacter: CultivationCharacter = {
      level: initialLevel,
      selectedAbilities: [],
      activeEssenceByPath: paths.reduce((acc, path) => ({
        ...acc,
        [path.id]: 0
      }), {} as Record<CultivationPathId, number>),
      version: catalogVersion
    };

    setCharacter(newCharacter);
    try {
      localStorage.removeItem(STORAGE_KEY_CULTIVATION[catalogVersion]);
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
  };

  const undoReset = () => {
    if (previousCharacter) {
      setCharacter(previousCharacter);
      setPreviousCharacter(null);
    }
  };

  const setCharacterState = (newState: CultivationCharacter) => {
    setCharacter(newState);
  };

  const updateActiveEssence = (pathId: CultivationPathId, amount: number) => {
    setCharacter(prev => {
      const currentSpent = prev.activeEssenceByPath[pathId] || 0;
      const newAmount = Math.max(0, currentSpent + amount);

      const pathAbilities = getCultivationPathAbilities(pathId, allAbilities, cantrips, spells)
        .filter(ability =>
          prev.selectedAbilities.includes(ability.id) &&
          (ability.isActive || ability.isSpell)
        );

      const maxForPath = pathAbilities.reduce((total, ability) =>
        total + getTierCost(ability.tier), 0
      );

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

  // Level validation
  useEffect(() => {
    const shouldBeUnallocated = new Set<string>();

    paths.forEach(path => {
      const pathAbilities = getCultivationPathAbilities(path.id, allAbilities, cantrips, spells);

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
        activeEssenceByPath: paths.reduce((acc, path) => {
          const pathHasUnallocated = getCultivationPathAbilities(path.id, allAbilities, cantrips, spells)
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
  }, [character.level, character.selectedAbilities, allAbilities, cantrips, spells, paths]);

  return {
    character,
    totalEssencePoints,
    totalPointsSpent,
    effectiveMaxPoints,
    availablePoints,
    toggleAbility,
    updateCharacterLevel,
    resetCharacter,
    undoReset,
    canUndo: previousCharacter !== null,
    updateActiveEssence,
    getPathPassiveReduction,
    setCharacterState,
    currentAbilityError,
    clearAbilityError
  };
};

export default useCultivationAllocation;
