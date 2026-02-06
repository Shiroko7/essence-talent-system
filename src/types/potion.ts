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
  savingThrow?: string;
  duration?: string;
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

// Updated rarity colors for Arcane Grimoire theme
export function getPotionRarityColor(rarity: PotionRarity): string {
  const colors: Record<PotionRarity, string> = {
    'common': 'bg-rarity-common/20 text-rarity-common border border-rarity-common/30',
    'uncommon': 'bg-rarity-uncommon/20 text-rarity-uncommon border border-rarity-uncommon/30',
    'rare': 'bg-rarity-rare/20 text-rarity-rare border border-rarity-rare/30',
    'very rare': 'bg-rarity-very-rare/20 text-rarity-very-rare border border-rarity-very-rare/30',
    'legendary': 'bg-rarity-legendary/20 text-rarity-legendary border border-rarity-legendary/30',
  };
  return colors[rarity];
}

// Get text color class for rarity
export function getRarityTextColor(rarity: PotionRarity): string {
  const colors: Record<PotionRarity, string> = {
    'common': 'text-rarity-common',
    'uncommon': 'text-rarity-uncommon',
    'rare': 'text-rarity-rare',
    'very rare': 'text-rarity-very-rare',
    'legendary': 'text-rarity-legendary',
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
