// src/utils/essenceData.ts
import { Ability, EssencePathId } from '../types/essence';

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
 * Imports essence data directly from the module imports.
 * This replaces the previous approach that tried to use window globals.
 */
export function importEssenceData(): {
  abilities: Record<EssencePathId, Ability[]>;
  cantrips: Record<EssencePathId, Ability[]>;
  spells: Record<EssencePathId, Ability[]>;
} {
  return {
    abilities: {
      fire: fireAbilities,
      water: waterAbilities,
      earth: earthAbilities,
      metal: metalAbilities,
      wood: woodAbilities,
      poison: poisonAbilities,
      acid: acidAbilities,
      lightning: lightningAbilities,
      wind: airAbilities, // Note: using 'wind' key to match EssencePathId
    },
    cantrips: {
      fire: fireCantrips,
      water: waterCantrips,
      earth: earthCantrips,
      metal: metalCantrips,
      wood: woodCantrips,
      poison: poisonCantrips,
      acid: acidCantrips,
      lightning: lightningCantrips,
      wind: airCantrips,
    },
    spells: {
      fire: fireSpells,
      water: waterSpells,
      earth: earthSpells,
      metal: metalSpells,
      wood: woodSpells,
      poison: poisonSpells,
      acid: acidSpells,
      lightning: lightningSpells,
      wind: airSpells,
    }
  };
}

