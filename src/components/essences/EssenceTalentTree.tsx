import React, { useState, useEffect } from 'react';
import { Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind, Sparkles, Moon } from 'lucide-react';
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

interface SavedConfig {
  characterLevel: number;
  selectedAbilities: string[];
  activeEssenceByPath: Record<string, number>;
  version: string;
}

// Essence icon colors
const ESSENCE_ICON_COLORS: Record<EssencePathId, string> = {
  water: '#4a9eff',
  fire: '#ff6b4a',
  earth: '#c49a6c',
  metal: '#a8b4c4',
  wood: '#5dba6f',
  poison: '#9b4dca',
  acid: '#a8e04a',
  lightning: '#c084fc',
  wind: '#7dd3fc',
};

const EssenceTalentTree: React.FC = () => {
  const [essenceData] = useState(() => importEssenceData());
  const { abilities, cantrips, spells } = essenceData;

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedPath, setSelectedPath] = useState<EssencePathId>('water');
  const [viewMode, setViewMode] = useState<'tree' | 'summary'>('tree');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getEssenceIcon = (id: EssencePathId) => {
    const iconProps = { size: 18, style: { color: ESSENCE_ICON_COLORS[id] } };
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
    initialLevel: 9,
    allAbilities: abilities,
    cantrips,
    spells
  });

  const handleFilterChange = (filter: FilterType) => setSelectedFilter(filter);
  const toggleViewMode = () => setViewMode(viewMode === 'tree' ? 'summary' : 'tree');

  const getAllPathAbilities = (pathId: EssencePathId) => [
    ...(abilities[pathId] || []),
    ...(cantrips[pathId] || []),
    ...(spells[pathId] || [])
  ];

  const getFilteredPathAbilities = (pathId: EssencePathId) => {
    const allPathAbilities = getAllPathAbilities(pathId);
    return fuzzySearch(allPathAbilities, searchTerm);
  };

  const pathsWithActiveAbilities = ESSENCE_PATHS.filter(path =>
    pathHasActiveAbilities(path.id, character.selectedAbilities, abilities, cantrips, spells)
  );

  useEffect(() => {
    setSearchTerm('');
  }, [viewMode]);

  const handleSaveConfig = () => {
    const config: SavedConfig = {
      characterLevel: character.level,
      selectedAbilities: character.selectedAbilities,
      activeEssenceByPath: character.activeEssenceByPath,
      version: '1.0'
    };

    const configData = JSON.stringify(config, null, 2);
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `essence-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleLoadConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string) as SavedConfig;

        if (!config.characterLevel || !Array.isArray(config.selectedAbilities)) {
          throw new Error('Invalid configuration file format');
        }

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
    event.target.value = '';
  };

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        {/* Character Setup Panel */}
        <div className="arcane-panel p-5 mb-6">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gold-subtle">
            <h2 className="font-display text-lg tracking-wide text-ivory flex items-center gap-2">
              <Sparkles size={20} className="text-gold" />
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

        {/* Active Essence Tracking */}
        {pathsWithActiveAbilities.length > 0 && (
          <div className="arcane-panel p-5 mb-6">
            <h2 className="font-display text-lg tracking-wide text-ivory mb-4 pb-3 border-b border-gold-subtle flex items-center gap-2">
              <Moon size={20} className="text-gold" />
              Active Essence
            </h2>

            <div className="flex flex-col gap-4">
              {pathsWithActiveAbilities.map(path => {
                const { spent, available, max, passiveReduction } = calculatePathEssenceStatus(
                  path.id, character, abilities, cantrips, spells
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
            <div className="mt-6 pt-4 border-t border-gold-subtle flex gap-4">
              <button
                onClick={() => {
                  const newActiveEssence = { ...character.activeEssenceByPath };
                  pathsWithActiveAbilities.forEach(path => {
                    const { available } = calculatePathEssenceStatus(
                      path.id, character, abilities, cantrips, spells
                    );
                    newActiveEssence[path.id] = available;
                  });
                  setCharacterState({ ...character, activeEssenceByPath: newActiveEssence });
                }}
                className="arcane-btn flex-1 !text-essence-wood !border-essence-wood/50 hover:!border-essence-wood hover:!shadow-glow-wood"
              >
                Full Rest (Restore All)
              </button>
              <button
                onClick={() => {
                  const newActiveEssence = { ...character.activeEssenceByPath };
                  pathsWithActiveAbilities.forEach(path => {
                    newActiveEssence[path.id] = 0;
                  });
                  setCharacterState({ ...character, activeEssenceByPath: newActiveEssence });
                }}
                className="arcane-btn flex-1"
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
            <aside className="w-full md:w-56 arcane-panel p-4">
              <h2 className="font-display text-sm tracking-wider text-gold mb-3 pb-2 border-b border-gold-subtle">
                Essence Paths
              </h2>
              <ul className="space-y-1">
                {ESSENCE_PATHS.map(path => {
                  const isSelected = selectedPath === path.id;
                  return (
                    <li key={path.id}>
                      <button
                        className={`
                          w-full text-left px-3 py-2.5 rounded flex items-center gap-3
                          transition-all duration-200 font-body
                          ${isSelected
                            ? `bg-charcoal border border-gold/30 ${path.glowClass}`
                            : 'text-fog hover:text-parchment hover:bg-charcoal/50 border border-transparent'
                          }
                        `}
                        onClick={() => setSelectedPath(path.id)}
                      >
                        <div className="w-8 h-8 rounded flex items-center justify-center bg-charcoal border border-gold-subtle">
                          {getEssenceIcon(path.id)}
                        </div>
                        <span className={`text-sm ${isSelected ? path.textColor : ''}`}>{path.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Main Panel - Talent Tree */}
            <div className="flex-1 arcane-panel p-5">
              {/* Controls Bar */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <FilterPills
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                  />

                  <div className="w-full max-w-md ml-auto">
                    <SearchInput
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      placeholder="Search abilities..."
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gold-subtle">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs tracking-wider text-mist uppercase">
                      Essence Points
                    </span>
                    <div className="arcane-card px-3 py-1.5 flex items-center gap-2">
                      <span className="font-display text-lg text-gold">{totalPointsSpent}</span>
                      <span className="text-mist">/</span>
                      <span className="font-display text-lg text-parchment">{totalEssencePoints}</span>
                    </div>
                  </div>

                  <button
                    onClick={toggleViewMode}
                    className="arcane-btn text-xs"
                  >
                    Switch to Summary
                  </button>
                </div>
              </div>

              {/* Selected Path Content */}
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
