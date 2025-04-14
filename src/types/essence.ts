// Define the essence paths
export type EssencePathId = 
  | 'water' 
  | 'fire' 
  | 'earth' 
  | 'metal' 
  | 'wood' 
  | 'poison' 
  | 'acid' 
  | 'lightning' 
  | 'wind';

// Define the tiers
export type TierId = 'initiate' | 'adept' | 'master' | 'grandmaster' | 'greatgrandmaster';

// Define spell levels
export type SpellLevel = 'cantrip' | '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th' | '7th' | '8th' | '9th';

// Define ability types
export interface EssencePath {
  id: EssencePathId;
  name: string;
  color: string;
}

export interface Tier {
  id: TierId;
  name: string;
  levels: string;
  pointCost: number;
  levelRequirement: number;
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  tier: TierId | SpellLevel;
  isActive: boolean;
  isPassive: boolean;
  isSpell: boolean;
  isCantrip: boolean;
}

// Define the character state
export interface Character {
  level: number;
  selectedAbilities: string[];
  activeEssenceByPath: Record<EssencePathId, number>;
}

// Define constants
export const ESSENCE_PATHS: EssencePath[] = [
  { id: 'water', name: 'Water', color: 'bg-blue-500' },
  { id: 'fire', name: 'Fire', color: 'bg-red-500' },
  { id: 'earth', name: 'Earth', color: 'bg-yellow-800' },
  { id: 'metal', name: 'Metal', color: 'bg-gray-500' },
  { id: 'wood', name: 'Wood', color: 'bg-green-700' },
  { id: 'poison', name: 'Poison', color: 'bg-purple-900' },
  { id: 'acid', name: 'Acid', color: 'bg-lime-500' },
  { id: 'lightning', name: 'Lightning', color: 'bg-purple-500' },
  { id: 'wind', name: 'Wind', color: 'bg-sky-300' },
];

export const TIERS: Tier[] = [
  { id: 'initiate', name: 'Initiate', levels: '1-4', pointCost: 1, levelRequirement: 1 },
  { id: 'adept', name: 'Adept', levels: '5-8', pointCost: 2, levelRequirement: 5 },
  { id: 'master', name: 'Master', levels: '9-12', pointCost: 3, levelRequirement: 9 },
  { id: 'grandmaster', name: 'Grandmaster', levels: '13-16', pointCost: 4, levelRequirement: 13 },
  { id: 'greatgrandmaster', name: 'Great Grandmaster', levels: '17-20', pointCost: 5, levelRequirement: 17 },
];

// Filters
export type FilterType = 'all' | 'active' | 'passive' | 'cantrip' | 'spell';

export interface FilterPill {
  id: FilterType;
  label: string;
}

export const FILTER_PILLS: FilterPill[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'passive', label: 'Passive' },
  { id: 'cantrip', label: 'Cantrip' },
  { id: 'spell', label: 'Spell' },
];

// Helper functions to get tier cost
export function getTierCost(tier: TierId | SpellLevel): number {
  if (tier === 'cantrip') return 1;
  if (tier === '1st') return 1;
  if (tier === '2nd') return 1;
  if (tier === '3rd') return 2;
  if (tier === '4th') return 2;
  if (tier === '5th') return 3;
  if (tier === '6th') return 3;
  if (tier === '7th') return 4;
  if (tier === '8th') return 4;
  if (tier === '9th') return 5;

  const foundTier = TIERS.find(t => t.id === tier);
  return foundTier ? foundTier.pointCost : 0;
}

// Helper function to get essence points based on level
export function calculateEssencePoints(level: number): number {
  let points = level; // Base points equal to level
  
  // Add bonus points at tier thresholds
  if (level >= 5) points += 4;
  if (level >= 9) points += 4;
  if (level >= 13) points += 4;
  if (level >= 17) points += 4;
  
  return points;
}

