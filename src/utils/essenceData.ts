// src/utils/essenceData.ts
import { Ability, EssencePathId, TierId, SpellLevel } from '../types/essence';

// Import all essence files directly
import { fireAbilities, fireCantrips, fireSpells } from '../components/essences/consts/fire';
import { waterAbilities, waterCantrips, waterSpells } from '../components/essences/consts/water';
import { earthAbilities, earthCantrips, earthSpells } from '../components/essences/consts/earth';
import { metalAbilities, metalCantrips, metalSpells } from '../components/essences/consts/metal';
import { woodAbilities, woodCantrips, woodSpells } from '../components/essences/consts/wood';
import { poisonAbilities, poisonCantrips, poisonSpells } from '../components/essences/consts/poison';
import { acidAbilities, acidCantrips, acidSpells } from '../components/essences/consts/acid';
import { lightningAbilities, lightningCantrips, lightningSpells } from '../components/essences/consts/lightning';
import { airAbilities, airCantrips, airSpells } from '../components/essences/consts/air';

/**
 * Converts a raw ability object to a standardized Ability type with proper typing.
 * This ensures the tier property is correctly typed as TierId | SpellLevel.
 */
function convertRawAbility(rawAbility: any): Ability {
  // Validate tier to ensure it matches expected types
  const validTiers: (TierId | SpellLevel)[] = [
    'initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster',
    'cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'
  ];
  
  // Ensure tier is a valid value
  const tier = validTiers.includes(rawAbility.tier as any) 
    ? (rawAbility.tier as TierId | SpellLevel)
    : 'initiate'; // Default to initiate if invalid
  
  return {
    id: rawAbility.id || '',
    name: rawAbility.name || '',
    description: rawAbility.description || '',
    tier: tier,
    isActive: !!rawAbility.isActive,
    isPassive: !!rawAbility.isPassive,
    isSpell: !!rawAbility.isSpell,
    isCantrip: !!rawAbility.isCantrip
  };
}

/**
 * Converts an array of raw abilities to standardized Ability types with proper typing.
 */
function convertRawAbilities(rawAbilities: any[]): Ability[] {
  if (!Array.isArray(rawAbilities)) {
    console.warn('Expected an array for raw abilities, got:', typeof rawAbilities);
    return [];
  }
  
  return rawAbilities.map(convertRawAbility);
}

/**
 * Imports essence data directly from the module imports and properly converts the data
 * to ensure all types match the Ability interface requirements.
 */
export function importEssenceData(): {
  abilities: Record<EssencePathId, Ability[]>;
  cantrips: Record<EssencePathId, Ability[]>;
  spells: Record<EssencePathId, Ability[]>;
} {
  return {
    abilities: {
      fire: convertRawAbilities(fireAbilities),
      water: convertRawAbilities(waterAbilities),
      earth: convertRawAbilities(earthAbilities),
      metal: convertRawAbilities(metalAbilities),
      wood: convertRawAbilities(woodAbilities),
      poison: convertRawAbilities(poisonAbilities),
      acid: convertRawAbilities(acidAbilities),
      lightning: convertRawAbilities(lightningAbilities),
      wind: convertRawAbilities(airAbilities), // Note: using 'wind' key to match EssencePathId
    },
    cantrips: {
      fire: convertRawAbilities(fireCantrips),
      water: convertRawAbilities(waterCantrips),
      earth: convertRawAbilities(earthCantrips),
      metal: convertRawAbilities(metalCantrips),
      wood: convertRawAbilities(woodCantrips),
      poison: convertRawAbilities(poisonCantrips),
      acid: convertRawAbilities(acidCantrips),
      lightning: convertRawAbilities(lightningCantrips),
      wind: convertRawAbilities(airCantrips),
    },
    spells: {
      fire: convertRawAbilities(fireSpells),
      water: convertRawAbilities(waterSpells),
      earth: convertRawAbilities(earthSpells),
      metal: convertRawAbilities(metalSpells),
      wood: convertRawAbilities(woodSpells),
      poison: convertRawAbilities(poisonSpells),
      acid: convertRawAbilities(acidSpells),
      lightning: convertRawAbilities(lightningSpells),
      wind: convertRawAbilities(airSpells),
    }
  };
}
