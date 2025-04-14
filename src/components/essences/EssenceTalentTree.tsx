import React, { useState, useEffect } from 'react';
import { Settings, Info } from 'lucide-react';
import { 
  ESSENCE_PATHS, 
  EssencePathId,
  Ability,
  FilterType,
  calculateEssencePoints
} from '../../types/essence';
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
    getPathPassiveReduction
  } = useEssenceAllocation({
    initialLevel: 8,
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
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Essence Talent System</h1>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <span>Character Level:</span>
              <select 
                value={character.level} 
                onChange={(e) => updateCharacterLevel(parseInt(e.target.value))}
                className="bg-gray-700 rounded p-1"
              >
                {Array.from({length: 20}, (_, i) => i + 1).map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={resetCharacter}
              className="px-4 py-1 bg-red-600 rounded hover:bg-red-700"
            >
              Reset
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 flex flex-col gap-4">
        {/* Essence Tracking Bars Section - Full width, one per line */}
        {pathsWithActiveAbilities.length > 0 && (
          <div className="w-full bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <h2 className="text-lg font-bold">
                Active Essence
              </h2>
              <EssenceLegend 
                isOpen={showLegend} 
                onToggle={() => setShowLegend(!showLegend)} 
              />
            </div>
            
            {showLegend && (
              <div className="mb-4">
                <EssenceLegend isOpen={true} onToggle={() => setShowLegend(false)} />
              </div>
            )}
            
            <div className="flex flex-col gap-4">
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
              <h2 className="text-xl font-bold">
                {ESSENCE_PATHS.find(p => p.id === selectedPath)?.name} Path
              </h2>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <FilterPills 
                  selectedFilter={selectedFilter} 
                  onFilterChange={handleFilterChange} 
                />
                
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-400">Essence Points:</div>
                  <div className="px-3 py-1 bg-indigo-900 rounded-md font-medium">
                    {totalPointsSpent} / {effectiveMaxPoints}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-400">Total Essence:</div>
                  <div className="px-3 py-1 bg-purple-900 rounded-md font-medium">
                    {totalEssencePoints}
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
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          Character essence calculator for the Leatrux campaign
        </div>
      </footer>
    </div>
  );
};

export default EssenceTalentTree;
