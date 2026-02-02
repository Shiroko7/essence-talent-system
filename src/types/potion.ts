// Potion rarity types
export type PotionRarity = 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';

// Potion category types
export type PotionCategory = 'potion' | 'elixir' | 'poison' | 'medicine';

// Individual Potion
export interface Potion {
  id: string;
  name: string;
  rarity: PotionRarity;
  category: PotionCategory;
  effect: string;
  isAddictive?: boolean;
  overdoseEffect?: string;
  savingThrow?: string; // e.g., "Constitution", "Wisdom"
  duration?: string; // e.g., "1 hour", "1 minute"
}

// Filter state for potions
export interface PotionFilterState {
  search: string;
  rarity: PotionRarity[];
  category: PotionCategory[];
}

// Constants for filters
export const POTION_RARITIES: Array<{ id: PotionRarity; label: string }> = [
  { id: 'common', label: 'Common' },
  { id: 'uncommon', label: 'Uncommon' },
  { id: 'rare', label: 'Rare' },
  { id: 'very rare', label: 'Very Rare' },
  { id: 'legendary', label: 'Legendary' },
];

export const POTION_CATEGORIES: Array<{ id: PotionCategory; label: string }> = [
  { id: 'potion', label: 'Potion' },
  { id: 'elixir', label: 'Spell Elixir' },
  { id: 'poison', label: 'Poison' },
  { id: 'medicine', label: 'Medicine' },
];

// Helper function to get rarity color
export function getPotionRarityColor(rarity: PotionRarity): string {
  const colors: Record<PotionRarity, string> = {
    'common': 'bg-gray-600 text-gray-200',
    'uncommon': 'bg-green-600 text-green-200',
    'rare': 'bg-blue-600 text-blue-200',
    'very rare': 'bg-purple-600 text-purple-200',
    'legendary': 'bg-orange-600 text-orange-200',
  };
  return colors[rarity];
}

// Crafting cost in gold (half of base item cost)
const CRAFTING_COST_GP: Record<PotionRarity, number> = {
  'common': 25,
  'uncommon': 100,
  'rare': 1000,
  'very rare': 10000,
  'legendary': 50000,
};

export interface CraftingCost {
  cp: number;
  sp: number;
  ep: number;
  gp: number;
  pp: number;
}

// Get crafting cost for a potion rarity in all currencies
export function getCraftingCost(rarity: PotionRarity): CraftingCost {
  const gp = CRAFTING_COST_GP[rarity];
  return {
    cp: gp * 100,
    sp: gp * 10,
    ep: gp * 2,
    gp: gp,
    pp: gp / 10,
  };
}

