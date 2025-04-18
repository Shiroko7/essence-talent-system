import React, { useState, useMemo } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Ability, 
  EssencePathId, 
  ESSENCE_PATHS,
  TIERS,
  FilterType,
  TierId,
  SpellLevel
} from '../../types/essence';
import FilterPills from './FilterPills';
import { getFilteredAbilities } from '../../utils/essenceUtils';

interface AbilitySummaryProps {
  allAbilities: Record<EssencePathId, Ability[]>;
  cantrips: Record<EssencePathId, Ability[]>;
  spells: Record<EssencePathId, Ability[]>;
  selectedAbilities: string[];
  onToggleView: () => void;
}

// Helper function to get which character tier a spell belongs to
const getSpellCharacterTier = (spellLevel: SpellLevel): TierId => {
  if (spellLevel === 'cantrip' || spellLevel === '1st' || spellLevel === '2nd') {
    return 'initiate';
  } else if (spellLevel === '3rd' || spellLevel === '4th') {
    return 'adept';
  } else if (spellLevel === '5th' || spellLevel === '6th') {
    return 'master';
  } else if (spellLevel === '7th' || spellLevel === '8th') {
    return 'grandmaster';
  } else if (spellLevel === '9th') {
    return 'greatgrandmaster';
  }
  return 'initiate'; // Default fallback
};

// Helper function to get sort priority for abilities (inverse of EssencePath sorting)
const getAbilitySortPriority = (ability: Ability): number => {
  // Create a map for the inverse spell level priority
  const spellLevelMap: Record<string, number> = {
    '9th': 0,
    '8th': 1,
    '7th': 2,
    '6th': 3,
    '5th': 4,
    '4th': 5,
    '3rd': 6,
    '2nd': 7,
    '1st': 8,
    'cantrip': 9,
  };

  if (ability.isSpell) {
    return (spellLevelMap[ability.tier.toString()] || 10);
  }
  if (ability.isCantrip) return 11;
  if (ability.isActive) return 12;
  if (ability.isPassive) return 13;
  return 14; // Fallback for any unclassified abilities
};

// Helper function to get tier priority (highest first)
const getTierPriority = (tier: TierId): number => {
  const tierMap: Record<string, number> = {
    'greatgrandmaster': 0,
    'grandmaster': 1,
    'master': 2,
    'adept': 3,
    'initiate': 4
  };
  return tierMap[tier] || 10;
};

// Helper function to get tier display name
const getTierDisplayName = (tier: TierId): string => {
  const displayNames: Record<string, string> = {
    'greatgrandmaster': 'Great Grandmaster',
    'grandmaster': 'Grandmaster',
    'master': 'Master',
    'adept': 'Adept',
    'initiate': 'Initiate'
  };
  return displayNames[tier] || tier.toString();
};

const AbilitySummary: React.FC<AbilitySummaryProps> = ({
  allAbilities,
  cantrips,
  spells,
  selectedAbilities,
  onToggleView
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedPaths, setSelectedPaths] = useState<EssencePathId[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Combine all abilities into a single array
  const allAbilitiesList = useMemo(() => {
    const result: Ability[] = [];
    
    // Only include selected abilities
    ESSENCE_PATHS.forEach(path => {
      const pathAbilities = [
        ...(allAbilities[path.id] || []),
        ...(cantrips[path.id] || []),
        ...(spells[path.id] || [])
      ].filter(ability => selectedAbilities.includes(ability.id));
      
      result.push(...pathAbilities);
    });
    
    return result;
  }, [allAbilities, cantrips, spells, selectedAbilities]);
  
  // Apply filters
  const filteredAbilities = useMemo(() => {
    let result = allAbilitiesList;
    
    // Filter by selected paths if any are selected
    if (selectedPaths.length > 0) {
      result = result.filter(ability => {
        const pathId = ability.id.split('_')[0] as EssencePathId;
        return selectedPaths.includes(pathId);
      });
    }
    
    // Apply type filter
    return getFilteredAbilities(result, selectedFilter);
  }, [allAbilitiesList, selectedPaths, selectedFilter]);
  
  // Group abilities by character tier and sort within tiers in inverse order
  const groupedAbilities = useMemo(() => {
    const tierGroups = new Map<TierId, Ability[]>();
    
    // Initialize tier groups
    TIERS.forEach(tier => {
      tierGroups.set(tier.id, []);
    });
    
    // Group abilities by character tier
    filteredAbilities.forEach(ability => {
      let characterTier: TierId;
      
      if (ability.isSpell || ability.isCantrip) {
        // Map spell levels to character tiers
        characterTier = getSpellCharacterTier(ability.tier as SpellLevel);
      } else {
        // Use the tier directly for regular abilities
        characterTier = ability.tier as TierId;
      }
      
      tierGroups.get(characterTier)?.push(ability);
    });
    
    // Sort abilities within each tier (inverse order)
    tierGroups.forEach(abilities => {
      abilities.sort((a, b) => {
        return getAbilitySortPriority(a) - getAbilitySortPriority(b);
      });
    });
    
    // Convert to array and sort tiers by priority (highest first)
    const result = Array.from(tierGroups.entries())
      .filter(([_, abilities]) => abilities.length > 0) // Only include tiers with abilities
      .map(([tier, abilities]) => ({
        tier: tier as TierId,
        abilities
      }));
    
    result.sort((a, b) => {
      return getTierPriority(a.tier) - getTierPriority(b.tier);
    });
    
    return result;
  }, [filteredAbilities]);
  
  // Toggle a path selection
  const togglePath = (pathId: EssencePathId) => {
    setSelectedPaths(prev => {
      if (prev.includes(pathId)) {
        return prev.filter(id => id !== pathId);
      } else {
        return [...prev, pathId];
      }
    });
  };
  
  // Toggle all paths
  const toggleAllPaths = () => {
    if (selectedPaths.length === ESSENCE_PATHS.length) {
      setSelectedPaths([]);
    } else {
      setSelectedPaths(ESSENCE_PATHS.map(path => path.id));
    }
  };
  
  // Get path color for an ability
  const getPathColor = (abilityId: string) => {
    const pathId = abilityId.split('_')[0] as EssencePathId;
    const path = ESSENCE_PATHS.find(p => p.id === pathId);
    return path?.color || 'bg-gray-500';
  };
  
  // Get path name for an ability
  const getPathName = (abilityId: string) => {
    const pathId = abilityId.split('_')[0] as EssencePathId;
    const path = ESSENCE_PATHS.find(p => p.id === pathId);
    return path?.name || 'Unknown';
  };
  
  // Get ability type label and color
  const getAbilityTypeInfo = (ability: Ability) => {
    if (ability.isPassive) {
      return { label: 'Passive', color: 'bg-yellow-800 text-yellow-200' };
    } else if (ability.isActive) {
      return { label: 'Active', color: 'bg-blue-800 text-blue-200' };
    } else if (ability.isCantrip) {
      return { label: 'Cantrip', color: 'bg-purple-800 text-purple-200' };
    } else if (ability.isSpell) {
      return { label: `${ability.tier} Spell`, color: 'bg-green-800 text-green-200' };
    }
    return { label: 'Unknown', color: 'bg-gray-800 text-gray-200' };
  };
  
  // Format description text
  const formatDescription = (description: string) => {
    if (description.startsWith('http')) {
      return (
        <div>
          <p className="mb-2">This ability references an external spell. For detailed information:</p>
          <a 
            href={description} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-300 underline"
          >
            View spell details
          </a>
        </div>
      );
    }
    
    // Split by sentences and create logical paragraphs
    const sentences = description.split(/(?<=[.!?])\s+/g);
    const paragraphs: string[] = [];
    let currentParagraph = '';
    
    sentences.forEach((sentence, index) => {
      currentParagraph += sentence + (index < sentences.length - 1 ? ' ' : '');
      
      // Create paragraphs after roughly 150 characters or at explicit line breaks
      if (currentParagraph.length > 150 || sentence.includes('\n') || index === sentences.length - 1) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
      }
    });
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className={index > 0 ? "mt-2" : ""}>
        {paragraph}
      </p>
    ));
  };
  
  return (
    <div className="w-full bg-gray-800 rounded-lg p-4">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <FilterPills 
              selectedFilter={selectedFilter} 
              onFilterChange={(filter) => setSelectedFilter(filter)} 
            />
            
            {/* Multi-select dropdown for path filter */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm"
              >
                <span>
                  {selectedPaths.length === 0 
                    ? "All Paths" 
                    : selectedPaths.length === ESSENCE_PATHS.length 
                      ? "All Paths" 
                      : `${selectedPaths.length} Path${selectedPaths.length !== 1 ? 's' : ''} Selected`}
                </span>
                {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-20 mt-1 w-64 bg-gray-700 border border-gray-600 rounded-md shadow-lg">
                  <div className="p-2 border-b border-gray-600">
                    <button
                      onClick={toggleAllPaths}
                      className="flex items-center justify-between w-full px-3 py-1.5 text-sm rounded hover:bg-gray-600"
                    >
                      <span>{selectedPaths.length === ESSENCE_PATHS.length ? "Deselect All" : "Select All"}</span>
                      {selectedPaths.length === ESSENCE_PATHS.length && <Check size={16} />}
                    </button>
                  </div>
                  
                  <div className="max-h-60 overflow-y-auto">
                    {ESSENCE_PATHS.map(path => (
                      <button
                        key={path.id}
                        onClick={() => togglePath(path.id)}
                        className="flex items-center justify-between w-full px-3 py-1.5 text-sm hover:bg-gray-600"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${path.color}`}></div>
                          <span>{path.name}</span>
                        </div>
                        {selectedPaths.includes(path.id) && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                  
                  <div className="p-2 border-t border-gray-600">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-3 py-1.5 text-sm bg-gray-600 rounded hover:bg-gray-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleView}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium"
            >
              Switch to Tree View
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-6">
        <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Selected Abilities Summary</h2>
        
        {groupedAbilities.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <p>No abilities selected or no matches found with the current filters.</p>
            <p className="mt-2 text-sm">Select abilities from the Tree View or adjust your filters.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {groupedAbilities.map(({ tier, abilities }) => (
              <div key={tier} className="space-y-6">
                <h3 className="text-lg font-bold text-left border-b border-gray-700 pb-2">
                  {getTierDisplayName(tier)}
                </h3>
                
                <div className="space-y-6">
                  {abilities.map(ability => {
                    const pathColor = getPathColor(ability.id);
                    const pathName = getPathName(ability.id);
                    const { label: typeLabel, color: typeColor } = getAbilityTypeInfo(ability);
                    
                    return (
                      <div 
                        key={ability.id} 
                        className="p-4 border border-gray-700 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${pathColor}`}></div>
                              {ability.name}
                            </h3>
                            <div className="text-sm text-gray-400 mt-1">
                              {pathName} Path • {ability.tier.toString().charAt(0).toUpperCase() + ability.tier.toString().slice(1)}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${typeColor}`}>
                            {typeLabel}
                          </span>
                        </div>
                        
                        <div className="bg-gray-700 p-4 rounded-lg mt-3">
                          <h4 className="text-sm font-medium mb-2">Description</h4>
                          <div className="text-gray-300 leading-relaxed text-left">
                            {formatDescription(ability.description)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AbilitySummary;
