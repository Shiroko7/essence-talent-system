/**
 * This file contains utility functions to help convert your existing data arrays
 * to the format expected by the Essence Talent Tree component.
 * 
 * You can use these functions when initially setting up the data if the original format
 * doesn't exactly match what's expected.
 */

import { Ability } from '../types/essence';

/**
 * Converts a raw ability object from your data file to a standardized Ability type.
 * This is useful if your data structure doesn't exactly match the expected format.
 */
export function convertRawAbility(rawAbility: any): Ability {
  return {
    id: rawAbility.id || '',
    name: rawAbility.name || '',
    description: rawAbility.description || '',
    tier: rawAbility.tier || 'initiate',
    isActive: !!rawAbility.isActive,
    isPassive: !!rawAbility.isPassive,
    isSpell: !!rawAbility.isSpell,
    isCantrip: !!rawAbility.isCantrip
  };
}

/**
 * Converts an array of raw abilities to standardized Ability types.
 * This ensures all abilities have the expected structure.
 */
export function convertRawAbilities(rawAbilities: any[]): Ability[] {
  if (!Array.isArray(rawAbilities)) {
    console.warn('Expected an array for raw abilities, got:', typeof rawAbilities);
    return [];
  }
  
  return rawAbilities.map(convertRawAbility);
}

/**
 * Helps initialize the data if it's not in the expected format.
 * You can use this during the initial data setup to ensure everything is correct.
 */
export function initializeEssenceData(rawData: Record<string, any>): {
  abilities: Record<string, Ability[]>;
  cantrips: Record<string, Ability[]>;
  spells: Record<string, Ability[]>;
} {
  const result = {
    abilities: {} as Record<string, Ability[]>,
    cantrips: {} as Record<string, Ability[]>,
    spells: {} as Record<string, Ability[]>
  };
  
  // Process each path
  Object.keys(rawData).forEach(pathId => {
    const pathData = rawData[pathId];
    
    // Handle abilities
    if (Array.isArray(pathData.abilities)) {
      result.abilities[pathId] = convertRawAbilities(pathData.abilities);
    } else {
      result.abilities[pathId] = [];
    }
    
    // Handle cantrips
    if (Array.isArray(pathData.cantrips)) {
      result.cantrips[pathId] = convertRawAbilities(pathData.cantrips);
    } else {
      result.cantrips[pathId] = [];
    }
    
    // Handle spells
    if (Array.isArray(pathData.spells)) {
      result.spells[pathId] = convertRawAbilities(pathData.spells);
    } else {
      result.spells[pathId] = [];
    }
  });
  
  return result;
}
