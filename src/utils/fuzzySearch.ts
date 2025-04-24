import { Ability } from '../types/essence';

/**
 * Performs a simple fuzzy search on an array of abilities
 * @param abilities - The array of abilities to search through
 * @param searchTerm - The search term to match against titles and descriptions
 * @returns Filtered array of abilities that match the search
 */
export function fuzzySearch(abilities: Ability[], searchTerm: string): Ability[] {
  if (!searchTerm.trim()) {
    return abilities;
  }

  const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
  
  return abilities.filter(ability => {
    // Match against name (title)
    if (ability.name.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }
    
    // Match against description
    if (ability.description.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }
    
    return false;
  });
}
