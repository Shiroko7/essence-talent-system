import { Ability, EssencePathId } from '../types/essence';

/**
 * Imports essence data directly from the window globals.
 * This function reads from the global variables loaded from the imported .tsx files.
 */
export function importEssenceData(): {
  abilities: Record<EssencePathId, Ability[]>;
  cantrips: Record<EssencePathId, Ability[]>;
  spells: Record<EssencePathId, Ability[]>;
} {
  // Access the global variables
  return {
    abilities: {
      water: (window as any).waterAbilities || [],
      fire: (window as any).fireAbilities || [],
      earth: (window as any).earthAbilities || [],
      metal: (window as any).metalAbilities || [],
      wood: (window as any).woodAbilities || [],
      poison: (window as any).poisonAbilities || [],
      acid: (window as any).acidAbilities || [],
      lightning: (window as any).lightningAbilities || [],
      wind: (window as any).airAbilities || [],
    },
    cantrips: {
      water: (window as any).waterCantrips || [],
      fire: (window as any).fireCantrips || [],
      earth: (window as any).earthCantrips || [],
      metal: (window as any).metalCantrips || [],
      wood: (window as any).woodCantrips || [],
      poison: (window as any).poisonCantrips || [],
      acid: (window as any).acidCantrips || [],
      lightning: (window as any).lightningCantrips || [],
      wind: (window as any).airCantrips || [],
    },
    spells: {
      water: (window as any).waterSpells || [],
      fire: (window as any).fireSpells || [],
      earth: (window as any).earthSpells || [],
      metal: (window as any).metalSpells || [],
      wood: (window as any).woodSpells || [],
      poison: (window as any).poisonSpells || [],
      acid: (window as any).acidSpells || [],
      lightning: (window as any).lightningSpells || [],
      wind: (window as any).airSpells || [],
    }
  };
}

/**
 * Alternative implementation that directly accesses the window globals.
 * This provides a fallback in case the other method doesn't work.
 * (In this implementation, it's identical to importEssenceData)
 */
export function importEssenceDataDirect(): {
  abilities: Record<EssencePathId, Ability[]>;
  cantrips: Record<EssencePathId, Ability[]>;
  spells: Record<EssencePathId, Ability[]>;
} {
  return importEssenceData();
}
