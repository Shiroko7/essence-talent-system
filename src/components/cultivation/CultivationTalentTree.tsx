import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeftRight,
  Moon
} from 'lucide-react';
import {
  CultivationPathId,
  CultivationTradition,
  CultivationVersion,
  FilterType
} from '../../types/cultivation';
import CharacterControls from '../essences/CharacterControls';
import FilterPills from '../essences/FilterPills';
import SearchInput from '../essences/SearchInput';
import CultivationPath from './CultivationPath';
import { getCultivationPathIcon } from './CultivationIcon';
import CultivationTrackingBar from './CultivationTrackingBar';
import CultivationSummary from './CultivationSummary';
import { useCultivationAllocation } from '../../hooks/useCultivationAllocation';
import {
  calculatePathEssenceStatus,
  pathHasActiveAbilities,
  migrateV1CharacterToCultivation,
  reconcileCultivationCharacter
} from '../../utils/cultivationUtils';
import { importCultivationData } from '../../utils/cultivationData';
import { fuzzySearch } from '../../utils/fuzzySearch';
import Layout from '../layout/Layout';

interface SavedCultivationConfig {
  characterLevel: number;
  selectedAbilities: string[];
  activeEssenceByPath: Record<string, number>;
  version: string;
  catalogVersion: CultivationVersion;
}

const CultivationTalentTree: React.FC<{ version: CultivationVersion }> = ({ version }) => {
  const [cultivationData] = useState(() => importCultivationData(version));
  const { abilities, cantrips, spells, paths, groups, catalog } = cultivationData;

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedTradition, setSelectedTradition] = useState<'all' | CultivationTradition>('all');
  const [selectedPathId, setSelectedPathId] = useState<CultivationPathId>(paths[0].id);
  const [viewMode, setViewMode] = useState<'tree' | 'summary'>('tree');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [migrationMessage, setMigrationMessage] = useState<string | null>(null);

  const {
    character,
    totalEssencePoints,
    totalPointsSpent,
    toggleAbility,
    updateCharacterLevel,
    resetCharacter,
    undoReset,
    canUndo,
    updateActiveEssence,
    setCharacterState
  } = useCultivationAllocation({
    initialLevel: 9,
    paths,
    catalogVersion: version,
    allAbilities: abilities,
    cantrips,
    spells
  });

  const selectedPath = paths.find(p => p.id === selectedPathId) || paths[0];

  const getAllPathAbilities = (pathId: CultivationPathId) => [
    ...(abilities[pathId] || []),
    ...(cantrips[pathId] || []),
    ...(spells[pathId] || [])
  ];

  const getFilteredPathAbilities = (pathId: CultivationPathId) => {
    const allPathAbilities = getAllPathAbilities(pathId);
    return fuzzySearch(allPathAbilities, searchTerm);
  };

  const pathsWithActiveAbilities = paths.filter(path =>
    pathHasActiveAbilities(path.id, character.selectedAbilities, abilities, cantrips, spells)
  );

  useEffect(() => {
    setSearchTerm('');
  }, [viewMode, selectedPathId]);

  useEffect(() => {
    if (!character.migrationNotice) return;
    setMigrationMessage(character.migrationNotice);
    const updatedCharacter = { ...character };
    delete updatedCharacter.migrationNotice;
    setCharacterState(updatedCharacter);
  }, [character, setCharacterState]);

  const handleSaveConfig = () => {
    const config: SavedCultivationConfig = {
      characterLevel: character.level,
      selectedAbilities: character.selectedAbilities,
      activeEssenceByPath: character.activeEssenceByPath,
      version: '2.4',
      catalogVersion: version
    };

    const configData = JSON.stringify(config, null, 2);
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cultivation-config-${version}-${new Date().toISOString().slice(0, 10)}.json`;
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
        const rawJson = JSON.parse(e.target?.result as string);

        if (!rawJson.characterLevel && !rawJson.level) {
          throw new Error('Invalid configuration format');
        }

        if (rawJson.catalogVersion === version && rawJson.version === '2.4') {
          setCharacterState({
            level: rawJson.characterLevel || rawJson.level,
            selectedAbilities: Array.isArray(rawJson.selectedAbilities) ? rawJson.selectedAbilities : [],
            activeEssenceByPath: rawJson.activeEssenceByPath || {},
            version
          });
          setMigrationMessage(`Loaded Cultivation ${version.toUpperCase()} configuration successfully.`);
        } else if (version === 'v2' && ['2.3', '2.2', '2.1', '2.0'].includes(rawJson.version)) {
          const migrated = reconcileCultivationCharacter({
            level: rawJson.characterLevel || rawJson.level,
            selectedAbilities: Array.isArray(rawJson.selectedAbilities) ? rawJson.selectedAbilities : [],
            activeEssenceByPath: rawJson.activeEssenceByPath || {},
            version: rawJson.version
          }, cultivationData, paths, version);
          setCharacterState(migrated);
          setMigrationMessage(migrated.migrationNotice || 'Updated the saved configuration to the current V2 path catalog.');
        } else if (rawJson.catalogVersion && rawJson.catalogVersion !== version) {
          throw new Error(`This save belongs to ${String(rawJson.catalogVersion).toUpperCase()}. Open that catalog to load it.`);
        } else {
          const migrated = migrateV1CharacterToCultivation(rawJson, cultivationData, paths, version);
          setCharacterState(migrated);
          setMigrationMessage(`Successfully migrated the V1 Elemental character into Cultivation ${version.toUpperCase()}.`);
        }

        setTimeout(() => setMigrationMessage(null), 6000);
      } catch (error) {
        console.error('Error loading configuration:', error);
        alert('Error loading configuration file. The file might be corrupted or in an invalid format.');
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        {/* Catalog version and family overview */}
        <div className="arcane-panel p-4 mb-6 border border-gold-accent/40 bg-gradient-to-r from-charcoal via-slate to-charcoal">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold flex items-center justify-center shadow-glow-gold">
                <Sparkles size={20} className="text-gold-bright" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-lg md:text-xl text-ivory tracking-wide">
                    Cultivation Paths
                  </h1>
                  <span className="px-2 py-0.5 rounded text-[11px] font-display uppercase tracking-widest bg-gold/20 text-gold-bright border border-gold/40">
                    {version.toUpperCase()} Â· {catalog.title}
                  </span>
                </div>
                <p className="text-xs text-mist font-body mt-0.5">
                  {catalog.subtitle} · {paths.length} paths · {catalog.principle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to="/"
                className="arcane-btn text-xs px-3.5 py-2 flex items-center gap-2 !border-gold/30 hover:!border-gold text-parchment"
              >
                <ArrowLeftRight size={14} className="text-gold" />
                <span>Switch to V1 Elements</span>
              </Link>
            </div>
          </div>

          {/* Migration notification banner */}
          {migrationMessage && (
            <div className="mt-3 p-2.5 rounded bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-body flex items-center gap-2 animate-fade-in">
              <Sparkles size={14} className="text-emerald-400" />
              {migrationMessage}
            </div>
          )}
        </div>

        {/* Character Setup Panel */}
        <div className="arcane-panel p-5 mb-6">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gold-subtle">
            <h2 className="font-display text-lg tracking-wide text-ivory flex items-center gap-2">
              <Sparkles size={20} className="text-gold" />
              Cultivator Progression
            </h2>
            <div className="text-xs text-mist font-body">
              Shared budget across all {paths.length} paths
            </div>
          </div>

          <CharacterControls
            level={character.level}
            onLevelChange={updateCharacterLevel}
            onReset={resetCharacter}
            onUndo={undoReset}
            canUndo={canUndo}
            hasSpentTalents={character.selectedAbilities.length > 0}
            onSaveConfig={handleSaveConfig}
            onLoadConfig={handleLoadConfig}
          />
        </div>

        {/* Active Essence Tracking */}
        {pathsWithActiveAbilities.length > 0 && (
          <div className="arcane-panel p-5 mb-6">
            <h2 className="font-display text-lg tracking-wide text-ivory mb-4 pb-3 border-b border-gold-subtle flex items-center gap-2">
              <Moon size={20} className="text-gold" />
              Active Essence Capacity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pathsWithActiveAbilities.map(path => {
                const { spent, available, max, passiveReduction } = calculatePathEssenceStatus(
                  path.id, character, abilities, cantrips, spells
                );

                return (
                  <CultivationTrackingBar
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
                  const newActive = { ...character.activeEssenceByPath };
                  pathsWithActiveAbilities.forEach(path => {
                    const { available } = calculatePathEssenceStatus(
                      path.id, character, abilities, cantrips, spells
                    );
                    newActive[path.id] = available;
                  });
                  setCharacterState({ ...character, activeEssenceByPath: newActive });
                }}
                className="arcane-btn flex-1 !text-emerald-400 !border-emerald-500/50 hover:!border-emerald-400 hover:!shadow-glow-wood"
              >
                Full Rest (Restore All)
              </button>
              <button
                onClick={() => {
                  const newActive = { ...character.activeEssenceByPath };
                  pathsWithActiveAbilities.forEach(path => {
                    newActive[path.id] = 0;
                  });
                  setCharacterState({ ...character, activeEssenceByPath: newActive });
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
          <CultivationSummary
            paths={paths}
            groups={groups}
            allAbilities={abilities}
            cantrips={cantrips}
            spells={spells}
            selectedAbilities={character.selectedAbilities}
            onToggleView={() => setViewMode('tree')}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        )}

        {/* Tree View */}
        {viewMode === 'tree' && (
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar - Cultivation Paths */}
            <aside className="w-full md:w-64 arcane-panel p-4 flex-shrink-0">
              <div className="flex flex-wrap rounded bg-charcoal/70 p-1 mb-4 border border-gold-subtle text-xs font-display">
                <button
                  onClick={() => setSelectedTradition('all')}
                  className={`flex-1 py-1 px-1 rounded text-center transition-colors ${selectedTradition === 'all' ? 'bg-gold/20 text-gold-bright font-semibold' : 'text-fog hover:text-parchment'}`}
                >
                  All ({paths.length})
                </button>
                {groups.map(group => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedTradition(group.id)}
                    className={`flex-1 py-1 px-1 rounded text-center transition-colors ${selectedTradition === group.id ? 'bg-gold/20 text-gold-bright font-semibold' : 'text-fog hover:text-parchment'}`}
                  >
                    {group.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {groups.filter(group => selectedTradition === 'all' || selectedTradition === group.id).map(group => {
                  const groupPaths = paths.filter(path => path.tradition === group.id);
                  return (
                    <section key={group.id}>
                      <h3 className="text-[11px] font-display uppercase tracking-widest text-gold mb-2 px-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                        {group.label} Paths ({groupPaths.length})
                      </h3>
                      <ul className="space-y-1">
                        {groupPaths.map(path => {
                          const isSelected = selectedPathId === path.id;
                          const pathTalents = abilities[path.id] || [];
                          const activeCount = pathTalents.filter(ability => ability.isActive).length;
                          const passiveCount = pathTalents.filter(ability => ability.isPassive).length;
                          return (
                            <li key={path.id}>
                              <button
                                className={`w-full text-left px-2.5 py-2 rounded flex items-center gap-2.5 transition-all duration-200 font-body ${isSelected ? `bg-charcoal border border-gold/40 ${path.glowClass}` : 'text-fog hover:text-parchment hover:bg-charcoal/50 border border-transparent'}`}
                                onClick={() => setSelectedPathId(path.id)}
                              >
                                <div className="w-7 h-7 rounded flex items-center justify-center bg-charcoal border border-gold-subtle flex-shrink-0">
                                  {getCultivationPathIcon(path.id, path.accentColor, 15)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className={`text-xs font-display truncate ${isSelected ? path.textColor : ''}`}>{path.name}</div>
                                  <div className="text-[10px] text-mist truncate">{path.concept}</div>
                                  <div className="text-[9px] text-fog/80 truncate">
                                    {activeCount} active · {passiveCount} passive · {cantrips[path.id]?.length || 0} cantrips · {spells[path.id]?.length || 0} spells
                                  </div>
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </aside>

            {/* Main Panel - Selected Path Content */}
            <div className="flex-1 arcane-panel p-5 min-w-0">
              {/* Controls Bar */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <FilterPills
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                  />

                  <div className="w-full max-w-md ml-auto">
                    <SearchInput
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      placeholder={`Search ${selectedPath.name} abilities...`}
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
                    onClick={() => setViewMode('summary')}
                    className="arcane-btn text-xs"
                  >
                    Switch to Summary
                  </button>
                </div>
              </div>

              {/* Path Content */}
              <CultivationPath
                path={selectedPath}
                abilities={getFilteredPathAbilities(selectedPathId)}
                selectedAbilities={character.selectedAbilities}
                characterLevel={character.level}
                activeFilter={selectedFilter}
                onToggleAbility={(ability) => toggleAbility(ability, selectedPathId)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CultivationTalentTree;
