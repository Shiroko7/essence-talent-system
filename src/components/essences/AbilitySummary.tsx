import React, { useState, useMemo } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Ability, 
  EssencePathId, 
  ESSENCE_PATHS, 
  FilterType
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
  
  // Sort abilities by path and name
  const sortedAbilities = useMemo(() => {
    return [...filteredAbilities].sort((a, b) => {
      // First sort by path
      const pathA = a.id.split('_')[0];
      const pathB = b.id.split('_')[0];
      
      if (pathA !== pathB) {
        return pathA.localeCompare(pathB);
      }
      
      // Then by name
      return a.name.localeCompare(b.name);
    });
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
        
        {sortedAbilities.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <p>No abilities selected or no matches found with the current filters.</p>
            <p className="mt-2 text-sm">Select abilities from the Tree View or adjust your filters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedAbilities.map(ability => {
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
                        {pathName} Path • {ability.tier.toString().charAt(0).toUpperCase() + ability.tier.toString().slice(1)} Tier
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
        )}
      </div>
    </div>
  );
};

export default AbilitySummary;
