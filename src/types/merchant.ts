// Rarity types matching D&D 5e
export type ItemRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'very rare'
  | 'legendary'
  | 'artifact';

// Item types matching D&D 5e
export type ItemType =
  | 'weapon'
  | 'armor'
  | 'wondrous item'
  | 'potion'
  | 'scroll'
  | 'ring'
  | 'rod'
  | 'staff'
  | 'wand'
  | 'adventuring gear'
  | 'other';

// Weapon categories and specific weapon types
export type WeaponType =
  // Broad categories
  | 'simple melee'
  | 'simple ranged'
  | 'martial melee'
  | 'martial ranged'
  // Simple Melee Weapons
  | 'club'
  | 'dagger'
  | 'greatclub'
  | 'handaxe'
  | 'javelin'
  | 'light hammer'
  | 'mace'
  | 'quarterstaff'
  | 'sickle'
  | 'spear'
  // Simple Ranged Weapons
  | 'light crossbow'
  | 'dart'
  | 'shortbow'
  | 'sling'
  // Martial Melee Weapons
  | 'battleaxe'
  | 'flail'
  | 'glaive'
  | 'greataxe'
  | 'greatsword'
  | 'halberd'
  | 'lance'
  | 'longsword'
  | 'maul'
  | 'morningstar'
  | 'pike'
  | 'rapier'
  | 'scimitar'
  | 'shortsword'
  | 'trident'
  | 'war pick'
  | 'warhammer'
  | 'whip'
  // Martial Ranged Weapons
  | 'blowgun'
  | 'hand crossbow'
  | 'heavy crossbow'
  | 'longbow'
  | 'net';

// Armor categories
export type ArmorType =
  | 'light armor'
  | 'medium armor'
  | 'heavy armor'
  | 'shield';

// Item properties (weapon/armor specifics)
export interface ItemProperties {
  weaponType?: WeaponType;
  armorType?: ArmorType;
  damageType?: string;
  properties?: string[]; // e.g., ['finesse', 'versatile', 'two-handed']
  acBonus?: number;
}

// Detailed item data from 5e.tools
export interface ItemDetailedData {
  entries?: Array<string | { type: string; items?: string[]; name?: string }>;
  dmgType?: string;
  dmg1?: string; // damage dice
  dmg2?: string; // versatile damage
  range?: string;
  ac?: number;
  stealth?: boolean; // disadvantage on stealth
  strength?: number; // strength requirement
  bonusWeapon?: string;
  bonusAc?: string;
  bonusSpellAttack?: string;
  bonusSavingThrow?: string;
  charges?: number;
  recharge?: string;
  ability?: Record<string, number>;
  resist?: string[];
  immune?: string[];
  conditionImmune?: string[];
  [key: string]: any; // Allow other 5etools fields
}

// Individual Item
export interface MerchantItem {
  id: string;
  name: string;
  rarity: ItemRarity;
  type: ItemType;
  requiresAttunement: boolean;
  properties?: ItemProperties;
  toolsUrl: string; // Full 5e.tools URL
  source?: string; // Book source (DMG, PHB, etc.)
  detailedData?: ItemDetailedData; // Full 5etools data
}

// Pricing structure (merchant-specific)
export interface MerchantPricing {
  currency: string; // e.g., "electrum", "gold", "platinum"
  priceByRarity: Record<ItemRarity, number>;
}

// Merchant metadata
export interface Merchant {
  id: string;
  name: string;
  description: string;
  location?: string;
  region?: string; // Grouping region (e.g., "Sirius")
  isAvailable: boolean; // locked/unlocked for players
  lockReason?: string; // Why merchant is locked (e.g., "Complete quest X")
  inventoryFile: string; // Path to items JSON file
  pricing: MerchantPricing; // Merchant-specific pricing
}

// Merchant inventory file structure
export interface MerchantInventory {
  merchantId: string;
  lastUpdated: string;
  items: MerchantItem[];
}

// Filter state
export type RarityFilter = ItemRarity | 'all';
export type TypeFilter = ItemType | 'all';

export interface ItemFilterState {
  search: string;
  rarity: ItemRarity[];
  type: ItemType[];
  requiresAttunement: boolean | null; // null = show all, true = only attunement, false = only non-attunement
  weaponType: WeaponType[];
  armorType: ArmorType[];
}

// Constants for filters
export const ITEM_RARITIES: Array<{ id: ItemRarity; label: string }> = [
  { id: 'common', label: 'Common' },
  { id: 'uncommon', label: 'Uncommon' },
  { id: 'rare', label: 'Rare' },
  { id: 'very rare', label: 'Very Rare' },
  { id: 'legendary', label: 'Legendary' },
  { id: 'artifact', label: 'Artifact' },
];

export const ITEM_TYPES: Array<{ id: ItemType; label: string }> = [
  { id: 'weapon', label: 'Weapon' },
  { id: 'armor', label: 'Armor' },
  { id: 'wondrous item', label: 'Wondrous Item' },
  { id: 'potion', label: 'Potion' },
  { id: 'scroll', label: 'Scroll' },
  { id: 'ring', label: 'Ring' },
  { id: 'rod', label: 'Rod' },
  { id: 'staff', label: 'Staff' },
  { id: 'wand', label: 'Wand' },
  { id: 'adventuring gear', label: 'Adventuring Gear' },
  { id: 'other', label: 'Other' },
];

export const WEAPON_TYPES: Array<{ id: WeaponType; label: string; category?: string }> = [
  // Simple Melee Weapons
  { id: 'club', label: 'Club', category: 'Simple Melee' },
  { id: 'dagger', label: 'Dagger', category: 'Simple Melee' },
  { id: 'greatclub', label: 'Greatclub', category: 'Simple Melee' },
  { id: 'handaxe', label: 'Handaxe', category: 'Simple Melee' },
  { id: 'javelin', label: 'Javelin', category: 'Simple Melee' },
  { id: 'light hammer', label: 'Light Hammer', category: 'Simple Melee' },
  { id: 'mace', label: 'Mace', category: 'Simple Melee' },
  { id: 'quarterstaff', label: 'Quarterstaff', category: 'Simple Melee' },
  { id: 'sickle', label: 'Sickle', category: 'Simple Melee' },
  { id: 'spear', label: 'Spear', category: 'Simple Melee' },

  // Simple Ranged Weapons
  { id: 'light crossbow', label: 'Crossbow, Light', category: 'Simple Ranged' },
  { id: 'dart', label: 'Dart', category: 'Simple Ranged' },
  { id: 'shortbow', label: 'Shortbow', category: 'Simple Ranged' },
  { id: 'sling', label: 'Sling', category: 'Simple Ranged' },

  // Martial Melee Weapons
  { id: 'battleaxe', label: 'Battleaxe', category: 'Martial Melee' },
  { id: 'flail', label: 'Flail', category: 'Martial Melee' },
  { id: 'glaive', label: 'Glaive', category: 'Martial Melee' },
  { id: 'greataxe', label: 'Greataxe', category: 'Martial Melee' },
  { id: 'greatsword', label: 'Greatsword', category: 'Martial Melee' },
  { id: 'halberd', label: 'Halberd', category: 'Martial Melee' },
  { id: 'lance', label: 'Lance', category: 'Martial Melee' },
  { id: 'longsword', label: 'Longsword', category: 'Martial Melee' },
  { id: 'maul', label: 'Maul', category: 'Martial Melee' },
  { id: 'morningstar', label: 'Morningstar', category: 'Martial Melee' },
  { id: 'pike', label: 'Pike', category: 'Martial Melee' },
  { id: 'rapier', label: 'Rapier', category: 'Martial Melee' },
  { id: 'scimitar', label: 'Scimitar', category: 'Martial Melee' },
  { id: 'shortsword', label: 'Shortsword', category: 'Martial Melee' },
  { id: 'trident', label: 'Trident', category: 'Martial Melee' },
  { id: 'war pick', label: 'War Pick', category: 'Martial Melee' },
  { id: 'warhammer', label: 'Warhammer', category: 'Martial Melee' },
  { id: 'whip', label: 'Whip', category: 'Martial Melee' },

  // Martial Ranged Weapons
  { id: 'blowgun', label: 'Blowgun', category: 'Martial Ranged' },
  { id: 'hand crossbow', label: 'Crossbow, Hand', category: 'Martial Ranged' },
  { id: 'heavy crossbow', label: 'Crossbow, Heavy', category: 'Martial Ranged' },
  { id: 'longbow', label: 'Longbow', category: 'Martial Ranged' },
  { id: 'net', label: 'Net', category: 'Martial Ranged' },
];

export const ARMOR_TYPES: Array<{ id: ArmorType; label: string }> = [
  { id: 'light armor', label: 'Light Armor' },
  { id: 'medium armor', label: 'Medium Armor' },
  { id: 'heavy armor', label: 'Heavy Armor' },
  { id: 'shield', label: 'Shield' },
];

// Helper function to get rarity color
export function getRarityColor(rarity: ItemRarity): string {
  const colors: Record<ItemRarity, string> = {
    'common': 'bg-gray-600 text-gray-200',
    'uncommon': 'bg-green-600 text-green-200',
    'rare': 'bg-blue-600 text-blue-200',
    'very rare': 'bg-purple-600 text-purple-200',
    'legendary': 'bg-orange-600 text-orange-200',
    'artifact': 'bg-red-600 text-red-200'
  };
  return colors[rarity];
}

// Helper function to get item price from merchant pricing
export function getItemPrice(item: MerchantItem, pricing: MerchantPricing): number {
  return pricing.priceByRarity[item.rarity];
}

// Helper function to format price with currency
export function formatPrice(price: number, currency: string): string {
  return `${price.toLocaleString()} ${currency}`;
}
