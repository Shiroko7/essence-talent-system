import React, { useState, useEffect } from 'react';
import { Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind } from 'lucide-react';
import {
  ESSENCE_PATHS,
  EssencePathId,
  FilterType,
} from '../../types/essence';
import CharacterControls from './CharacterControls';
import FilterPills from './FilterPills';
import EssencePath from './EssencePath';
import EssenceTrackingBar from './EssenceTrackingBar';
import AbilitySummary from './AbilitySummary';
import useEssenceAllocation from '../../hooks/useEssenceAllocation';
import { 
  calculatePathEssenceStatus,
  pathHasActiveAbilities 
} from '../../utils/essenceUtils';
import { importEssenceData } from '../../utils/essenceData';
import { fuzzySearch } from '../../utils/fuzzySearch';
import SearchInput from './SearchInput';
import Layout from '../layout/Layout';

// Type for saved configuration
interface SavedConfig {
  characterLevel: number;
  selectedAbilities: string[];
  activeEssenceByPath: Record<string, number>;
  version: string;
}

const EssenceTalentTree: React.FC = () => {
  // Try to import essence data
  const [essenceData] = useState(() => {
    return importEssenceData();
  });

  const { abilities, cantrips, spells } = essenceData;

  // Set up filter state
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedPath, setSelectedPath] = useState<EssencePathId>('water');
  const [viewMode, setViewMode] = useState<'tree' | 'summary'>('tree');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Get icon for essence path
  const getEssenceIcon = (id: EssencePathId) => {
    const iconProps = { size: 16, className: "inline" };
    switch (id) {
      case 'water': return <Droplet {...iconProps} />;
      case 'fire': return <Flame {...iconProps} />;
      case 'earth': return <Mountain {...iconProps} />;
      case 'metal': return <Sword {...iconProps} />;
      case 'wood': return <TreeDeciduous {...iconProps} />;
      case 'poison': return <Skull {...iconProps} />;
      case 'acid': return <FlaskConical {...iconProps} />;
      case 'lightning': return <Zap {...iconProps} />;
      case 'wind': return <Wind {...iconProps} />;
      default: return null;
    }
  };
  
  // Set up essence allocation hook
  const {
    character,
    totalEssencePoints,
    totalPointsSpent,
    toggleAbility,
    updateCharacterLevel,
    resetCharacter,
    updateActiveEssence,
    setCharacterState
  } = useEssenceAllocation({
    initialLevel: 9, // Start at level 9 as default
    allAbilities: abilities,
    cantrips,
    spells
  });
  
  // Handle filter change
  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
  };
  
  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'tree' ? 'summary' : 'tree');
  };
  
  // Get all abilities for the current path
  const getAllPathAbilities = (pathId: EssencePathId) => {
    return [
      ...(abilities[pathId] || []),
      ...(cantrips[pathId] || []),
      ...(spells[pathId] || [])
    ];
  };
  
  // Get filtered abilities for the current path with search applied
  const getFilteredPathAbilities = (pathId: EssencePathId) => {
    const allPathAbilities = getAllPathAbilities(pathId);
    return fuzzySearch(allPathAbilities, searchTerm);
  };
  
  // Get paths that have active abilities or spells allocated
  const pathsWithActiveAbilities = ESSENCE_PATHS.filter(path => 
    pathHasActiveAbilities(
      path.id, 
      character.selectedAbilities, 
      abilities, 
      cantrips, 
      spells
    )
  );

  // Reset search when changing view mode
  useEffect(() => {
    setSearchTerm('');
  }, [viewMode]);
  
  // Save configuration
  const handleSaveConfig = () => {
    // Create configuration object
    const config: SavedConfig = {
      characterLevel: character.level,
      selectedAbilities: character.selectedAbilities,
      activeEssenceByPath: character.activeEssenceByPath,
      version: '1.0' // Add version for future compatibility
    };
    
    // Convert to JSON
    const configData = JSON.stringify(config, null, 2);
    
    // Create download link
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create and click a download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `essence-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
  // Load configuration
  const handleLoadConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string) as SavedConfig;
        
        // Validate basic structure
        if (!config.characterLevel || !Array.isArray(config.selectedAbilities)) {
          throw new Error('Invalid configuration file format');
        }
        
        // Set character state
        setCharacterState({
          level: config.characterLevel,
          selectedAbilities: config.selectedAbilities,
          activeEssenceByPath: config.activeEssenceByPath || {}
        });
        
      } catch (error) {
        console.error('Error loading configuration:', error);
        alert('Error loading configuration. The file might be corrupted or in an invalid format.');
      }
    };
    
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="w-full bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
            <h2 className="text-lg font-bold">
              Character Setup
            </h2>
          </div>
          
          <CharacterControls
            level={character.level}
            onLevelChange={updateCharacterLevel}
            onReset={resetCharacter}
            onSaveConfig={handleSaveConfig}
            onLoadConfig={handleLoadConfig}
          />
        </div>
        
        {/* Essence Tracking Bars Section */}
        {pathsWithActiveAbilities.length > 0 && (
          <div className="w-full bg-gray-800 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">
              Active Essence
            </h2>
            
            <div className="flex flex-col gap-3">
              {pathsWithActiveAbilities.map(path => {
                const { spent, available, max, passiveReduction } = calculatePathEssenceStatus(
                  path.id,
                  character,
                  abilities,
                  cantrips,
                  spells
                );

                return (
                  <EssenceTrackingBar
                    key={path.id}
                    path={path}
                    spent={spent}
                    available={available}
                    max={max}
                    passiveReduction={passiveReduction}
                    onIncrement={() => updateActiveEssence(path.id, 1)}
                    onDecrement={() => updateActiveEssence(path.id, -1)}
                  />
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  // Set all active essence to max available
                  const newActiveEssence = { ...character.activeEssenceByPath };
                  pathsWithActiveAbilities.forEach(path => {
                    const { available } = calculatePathEssenceStatus(
                      path.id,
                      character,
                      abilities,
                      cantrips,
                      spells
                    );
                    newActiveEssence[path.id] = available;
                  });
                  setCharacterState({
                    ...character,
                    activeEssenceByPath: newActiveEssence
                  });
                }}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors"
              >
                Full Rest (Restore All)
              </button>
              <button
                onClick={() => {
                  // Set all active essence to 0
                  const newActiveEssence = { ...character.activeEssenceByPath };
                  pathsWithActiveAbilities.forEach(path => {
                    newActiveEssence[path.id] = 0;
                  });
                  setCharacterState({
                    ...character,
                    activeEssenceByPath: newActiveEssence
                  });
                }}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Summary View */}
        {viewMode === 'summary' && (
          <AbilitySummary
            allAbilities={abilities}
            cantrips={cantrips}
            spells={spells}
            selectedAbilities={character.selectedAbilities}
            onToggleView={toggleViewMode}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        )}

        {/* Tree View */}
        {viewMode === 'tree' && (
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar - Essence Paths */}
            <aside className="w-full md:w-48 bg-gray-800 rounded p-2">
              <h2 className="text-lg font-bold border-b border-gray-700 pb-2">Essence Paths</h2>
              <ul className="space-y-1">
                {ESSENCE_PATHS.map(path => (
                  <li key={path.id}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded flex items-center gap-2
                        ${selectedPath === path.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                      onClick={() => setSelectedPath(path.id)}
                    >
                      <div className={`w-6 h-6 rounded-full ${path.color} flex items-center justify-center text-white`}>
                        {getEssenceIcon(path.id)}
                      </div>
                      {path.name}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            
            {/* Main Panel - Talent Tree */}
            <div className="flex-1 bg-gray-800 rounded p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                
                <div className="flex flex-col w-full gap-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full">
                    <FilterPills 
                      selectedFilter={selectedFilter} 
                      onFilterChange={handleFilterChange}
                    />
                    
                    <div className="w-full max-w-md ml-auto">
                      <SearchInput 
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        placeholder="Search abilities by name or description..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-400">Essence Points Spent:</div>
                      <div className="px-3 py-1 bg-indigo-900 rounded-md font-medium">
                        {totalPointsSpent} / {totalEssencePoints}
                      </div>
                    </div>
                    
                    <button
                      onClick={toggleViewMode}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium"
                    >
                      Switch to Summary
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Render the selected path */}
              <EssencePath
                path={ESSENCE_PATHS.find(p => p.id === selectedPath)!}
                abilities={getFilteredPathAbilities(selectedPath)}
                selectedAbilities={character.selectedAbilities}
                characterLevel={character.level}
                activeFilter={selectedFilter}
                onToggleAbility={(ability) => toggleAbility(ability, selectedPath)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EssenceTalentTree;
