import { Potion, PotionFilterState, PotionRarity } from '../types/potion';

/**
 * Performs fuzzy search on potions by name, effect, and category
 * @param potions - The array of potions to search through
 * @param searchTerm - The search term to match against
 * @returns Filtered array of potions that match the search
 */
export function searchPotions(potions: Potion[], searchTerm: string): Potion[] {
  if (!searchTerm.trim()) {
    return potions;
  }

  const lowercaseSearchTerm = searchTerm.toLowerCase().trim();

  return potions.filter(potion => {
    // Match against name
    if (potion.name.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }

    // Match against effect/description
    if (potion.effect.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }

    // Match against category
    if (potion.category.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }

    // Match against saving throw type
    if (potion.savingThrow && potion.savingThrow.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }

    // Match against duration
    if (potion.duration && potion.duration.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }

    return false;
  });
}

/**
 * Applies all filters to an array of potions
 * @param potions - The array of potions to filter
 * @param filters - The filter state containing all active filters
 * @returns Filtered array of potions
 */
export function filterPotions(potions: Potion[], filters: PotionFilterState): Potion[] {
  let filtered = [...potions];

  // Apply search filter
  filtered = searchPotions(filtered, filters.search);

  // Rarity filter (OR logic - show potions matching ANY selected rarity)
  if (filters.rarity.length > 0) {
    filtered = filtered.filter(potion => filters.rarity.includes(potion.rarity));
  }

  // Category filter (OR logic - show potions matching ANY selected category)
  if (filters.category.length > 0) {
    filtered = filtered.filter(potion => filters.category.includes(potion.category));
  }

  return filtered;
}

/**
 * Sorts potions by name or rarity
 * @param potions - The array of potions to sort
 * @param sortBy - The field to sort by
 * @param direction - Sort direction ('asc' for ascending, 'desc' for descending)
 * @returns Sorted array of potions
 */
export function sortPotions(
  potions: Potion[],
  sortBy: 'name' | 'rarity' | 'category' = 'name',
  direction: 'asc' | 'desc' = 'asc'
): Potion[] {
  const sorted = [...potions];
  let result: Potion[];

  if (sortBy === 'name') {
    result = sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'rarity') {
    const rarityOrder: Record<PotionRarity, number> = {
      'common': 1,
      'uncommon': 2,
      'rare': 3,
      'very rare': 4,
      'legendary': 5
    };
    result = sorted.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
  } else if (sortBy === 'category') {
    result = sorted.sort((a, b) => a.category.localeCompare(b.category));
  } else {
    result = sorted;
  }

  return direction === 'desc' ? result.reverse() : result;
}
