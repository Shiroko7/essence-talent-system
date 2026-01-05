import { MerchantItem, ItemFilterState, ItemRarity, MerchantPricing, getItemPrice } from '../types/merchant';

/**
 * Performs fuzzy search on items by name, type, and source
 * @param items - The array of items to search through
 * @param searchTerm - The search term to match against
 * @returns Filtered array of items that match the search
 */
export function searchItems(items: MerchantItem[], searchTerm: string): MerchantItem[] {
  if (!searchTerm.trim()) {
    return items;
  }

  const lowercaseSearchTerm = searchTerm.toLowerCase().trim();

  return items.filter(item => {
    // Match against name
    if (item.name.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }

    // Match against type
    if (item.type.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }

    // Match against source
    if (item.source && item.source.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }

    return false;
  });
}

/**
 * Applies all filters to an array of items
 * @param items - The array of items to filter
 * @param filters - The filter state containing all active filters
 * @returns Filtered array of items
 */
export function filterItems(items: MerchantItem[], filters: ItemFilterState): MerchantItem[] {
  let filtered = [...items];

  // Apply search filter
  filtered = searchItems(filtered, filters.search);

  // Rarity filter (OR logic - show items matching ANY selected rarity)
  if (filters.rarity.length > 0) {
    filtered = filtered.filter(item => filters.rarity.includes(item.rarity));
  }

  // Type filter (OR logic - show items matching ANY selected type)
  if (filters.type.length > 0) {
    filtered = filtered.filter(item => filters.type.includes(item.type));
  }

  // Attunement filter
  if (filters.requiresAttunement !== null) {
    filtered = filtered.filter(item => item.requiresAttunement === filters.requiresAttunement);
  }

  // Weapon type filter (OR logic)
  if (filters.weaponType.length > 0) {
    filtered = filtered.filter(item =>
      item.properties?.weaponType &&
      filters.weaponType.includes(item.properties.weaponType)
    );
  }

  // Armor type filter (OR logic)
  if (filters.armorType.length > 0) {
    filtered = filtered.filter(item =>
      item.properties?.armorType &&
      filters.armorType.includes(item.properties.armorType)
    );
  }

  return filtered;
}

/**
 * Sorts items by name, rarity, type, or price
 * @param items - The array of items to sort
 * @param sortBy - The field to sort by
 * @param pricing - Optional merchant pricing (required for price sorting)
 * @param direction - Sort direction ('asc' for ascending, 'desc' for descending)
 * @returns Sorted array of items
 */
export function sortItems(
  items: MerchantItem[],
  sortBy: 'name' | 'rarity' | 'type' | 'price' = 'name',
  pricing?: MerchantPricing,
  direction: 'asc' | 'desc' = 'asc'
): MerchantItem[] {
  const sorted = [...items];
  let result: MerchantItem[];

  if (sortBy === 'name') {
    result = sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'rarity') {
    const rarityOrder: Record<ItemRarity, number> = {
      'common': 1,
      'uncommon': 2,
      'rare': 3,
      'very rare': 4,
      'legendary': 5,
      'artifact': 6
    };
    result = sorted.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
  } else if (sortBy === 'type') {
    result = sorted.sort((a, b) => a.type.localeCompare(b.type));
  } else if (sortBy === 'price' && pricing) {
    result = sorted.sort((a, b) => {
      const priceA = getItemPrice(a, pricing);
      const priceB = getItemPrice(b, pricing);
      return priceA - priceB;
    });
  } else {
    result = sorted;
  }

  return direction === 'desc' ? result.reverse() : result;
}
