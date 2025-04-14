import React, { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import { 
  ESSENCE_PATHS, 
  EssencePathId,
  Ability,
  FilterType,
  calculateEssencePoints
} from '../../types/essence';
import CharacterControls from './CharacterControls';
import FilterPills from './FilterPills';
import EssencePath from './EssencePath';
import EssenceTrackingBar from './EssenceTrackingBar';
import EssenceLegend from './EssenceLegend';
import useEssenceAllocation from '../../hooks/useEssenceAllocation';
import { 
  calculatePathEssenceStatus,
  pathHasActiveAbilities 
} from '../../utils/essenceUtils';
import { importEssenceData } from '../../utils/essenceData';
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
  const [showLegend, setShowLegend] = useState<boolean>(false);
  
  // Set up essence allocation hook
  const {
    character,
    totalEssencePoints,
    totalPointsSpent,
    effectiveMaxPoints,
    availablePoints,
    toggleAbility,
    updateCharacterLevel,
    resetCharacter,
    updateActiveEssence,
    getPathPassiveReduction,
    setCharacterState
  } = useEssenceAllocation({
    initialLevel: 5, // Start at level 5 as default
    allAbilities: abilities,
    cantrips,
    spells
  });
  
  // Handle filter change
  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
  };
  
  // Get all abilities for the current path
  const getAllPathAbilities = (pathId: EssencePathId) => {
    return [
      ...(abilities[pathId] || []),
      ...(cantrips[pathId] || []),
      ...(spells[pathId] || [])
    ];
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
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <h2 className="text-lg font-bold">
                Active Essence
              </h2>
              <button 
                onClick={() => setShowLegend(!showLegend)}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200"
              >
                <Info size={14} />
                <span>{showLegend ? 'Hide' : 'Show'} Legend</span>
              </button>
            </div>
            
            {showLegend && (
              <div className="mb-4">
                <div className="rounded bg-gray-700 p-3 text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold">Essence Bar Legend</h4>
                    <button 
                      onClick={() => setShowLegend(false)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      Close
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-blue-600"></div>
                      <span>Spent essence (active abilities currently using essence)</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-blue-900"></div>
                      <span>Available essence (can be spent on active abilities)</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-gray-800"></div>
                      <span>Reduced essence (from passive abilities and cantrips)</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-gray-400 italic">
                    Example: A bar showing "─────■■■" means you have some spent essence (blue),
                    some available essence (dark blue), and some essence reduction from passives (gray).
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-4">
              {pathsWithActiveAbilities.map(path => {
                const { spent, available, max, passiveReduction } = calculatePathEssenceStatus(
                  path.id,
                  character,
                  abilities,
                  cantrips,
                  spells,
                  availablePoints
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
          </div>
        )}

        {/* Content area with sidebar and talent tree */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar - Essence Paths */}
          <aside className="w-full md:w-48 bg-gray-800 rounded p-2">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Essence Paths</h2>
            <ul className="space-y-1">
              {ESSENCE_PATHS.map(path => (
                <li key={path.id}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded flex items-center gap-2
                      ${selectedPath === path.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                    onClick={() => setSelectedPath(path.id)}
                  >
                    <div className={`w-3 h-3 rounded-full ${path.color}`}></div>
                    {path.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          
          {/* Main Panel - Talent Tree */}
          <div className="flex-1 bg-gray-800 rounded p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <FilterPills 
                  selectedFilter={selectedFilter} 
                  onFilterChange={handleFilterChange} 
                />
                
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-400">Essence Points Spent:</div>
                  <div className="px-3 py-1 bg-indigo-900 rounded-md font-medium">
                    {totalPointsSpent} / {totalEssencePoints}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Render the selected path */}
            <EssencePath
              path={ESSENCE_PATHS.find(p => p.id === selectedPath)!}
              abilities={getAllPathAbilities(selectedPath)}
              selectedAbilities={character.selectedAbilities}
              characterLevel={character.level}
              activeFilter={selectedFilter}
              onToggleAbility={(ability) => toggleAbility(ability, selectedPath)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EssenceTalentTree;
