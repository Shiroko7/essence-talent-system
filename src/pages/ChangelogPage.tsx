import React, { useState, useMemo } from 'react';
import { ScrollText, ChevronDown, ChevronRight, History } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ChangelogFilters from '../components/changelog/ChangelogFilters';
import ChangelogTimeline from '../components/changelog/ChangelogTimeline';
import { ChangeTypeFilter } from '../types/changelog';
import { FilterType, EssencePathId } from '../types/essence';
import changelogDataRaw from '../data/changelog.json';
import { ChangelogData } from '../types/changelog';

const changelogData = changelogDataRaw as ChangelogData;

const MIGRATION_COMMIT = 'ffa4fa029d83317feb7d5eb543dad3b7ab023c80';
const MIGRATION_DATE = new Date('2025-12-03T21:49:15-0300');

const ChangelogPage: React.FC = () => {
  const [selectedEssences, setSelectedEssences] = useState<EssencePathId[]>([]);
  const [selectedChangeTypes, setSelectedChangeTypes] = useState<ChangeTypeFilter[]>([]);
  const [selectedAbilityTypes, setSelectedAbilityTypes] = useState<FilterType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLegacy, setShowLegacy] = useState(false);

  const { currentEntries, legacyEntries } = useMemo(() => {
    const nonMigrationEntries = changelogData.entries.filter(
      entry => entry.commitHash !== MIGRATION_COMMIT
    );

    const legacy: typeof changelogData.entries = [];
    const current: typeof changelogData.entries = [];

    nonMigrationEntries.forEach(entry => {
      const entryDate = new Date(entry.date);
      if (entryDate < MIGRATION_DATE) {
        legacy.push(entry);
      } else {
        current.push(entry);
      }
    });

    const applyFilters = (entries: typeof changelogData.entries) => {
      return entries.filter(entry => {
        const normalizedEssenceType = entry.essenceType === 'air' ? 'wind' : entry.essenceType;

        if (selectedEssences.length > 0 && !selectedEssences.includes(normalizedEssenceType as EssencePathId)) {
          return false;
        }

        if (selectedChangeTypes.length > 0 && !selectedChangeTypes.includes(entry.changeType as ChangeTypeFilter)) {
          return false;
        }

        if (selectedAbilityTypes.length > 0) {
          const matchesAny = selectedAbilityTypes.some(type => {
            if (type === 'active') return entry.ability.isActive;
            if (type === 'passive') return entry.ability.isPassive;
            if (type === 'cantrip') return entry.ability.isCantrip;
            if (type === 'spell') return entry.ability.isSpell;
            return false;
          });
          if (!matchesAny) return false;
        }

        if (searchTerm) {
          const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
          let matchFound = false;

          if (entry.ability.name.toLowerCase().includes(lowercaseSearchTerm)) {
            matchFound = true;
          }

          if (!matchFound && entry.ability.description &&
              entry.ability.description.toLowerCase().includes(lowercaseSearchTerm)) {
            matchFound = true;
          }

          if (!matchFound && entry.changes) {
            for (const change of entry.changes) {
              if ('oldValue' in change && change.oldValue !== undefined &&
                  String(change.oldValue).toLowerCase().includes(lowercaseSearchTerm)) {
                matchFound = true;
                break;
              }
              if ('newValue' in change && change.newValue !== undefined &&
                  String(change.newValue).toLowerCase().includes(lowercaseSearchTerm)) {
                matchFound = true;
                break;
              }
            }
          }

          if (!matchFound) return false;
        }

        return true;
      });
    };

    return {
      currentEntries: applyFilters(current),
      legacyEntries: applyFilters(legacy)
    };
  }, [selectedEssences, selectedChangeTypes, selectedAbilityTypes, searchTerm]);

  const totalFilteredCount = currentEntries.length + legacyEntries.length;
  const totalCount = changelogData.entries.filter(e => e.commitHash !== MIGRATION_COMMIT).length;

  const handleEssenceToggle = (essence: EssencePathId) => {
    setSelectedEssences(prev =>
      prev.includes(essence) ? prev.filter(e => e !== essence) : [...prev, essence]
    );
  };

  const handleChangeTypeToggle = (changeType: ChangeTypeFilter) => {
    setSelectedChangeTypes(prev =>
      prev.includes(changeType) ? prev.filter(c => c !== changeType) : [...prev, changeType]
    );
  };

  const handleAbilityTypeToggle = (abilityType: FilterType) => {
    setSelectedAbilityTypes(prev =>
      prev.includes(abilityType) ? prev.filter(t => t !== abilityType) : [...prev, abilityType]
    );
  };

  const handleClearAll = () => {
    setSelectedEssences([]);
    setSelectedChangeTypes([]);
    setSelectedAbilityTypes([]);
    setSearchTerm('');
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <ScrollText size={32} className="text-gold" />
            <h1 className="font-display text-3xl md:text-4xl tracking-wide text-ivory">
              Changelog
            </h1>
          </div>
          <p className="text-fog text-lg font-body">
            Track all changes to essence abilities across commits.
          </p>
        </div>

        {/* Filters */}
        <ChangelogFilters
          selectedEssences={selectedEssences}
          selectedChangeTypes={selectedChangeTypes}
          selectedAbilityTypes={selectedAbilityTypes}
          searchTerm={searchTerm}
          lastUpdated={changelogData.generatedAt}
          onEssenceToggle={handleEssenceToggle}
          onChangeTypeToggle={handleChangeTypeToggle}
          onAbilityTypeToggle={handleAbilityTypeToggle}
          onSearchChange={setSearchTerm}
          onClearAll={handleClearAll}
        />

        {/* Results Count */}
        <div className="mb-4 text-sm text-mist font-body">
          Showing <span className="text-parchment">{totalFilteredCount}</span> of <span className="text-parchment">{totalCount}</span> changes
        </div>

        {/* Current Changes */}
        {currentEntries.length > 0 ? (
          <ChangelogTimeline entries={currentEntries} />
        ) : (
          <div className="arcane-panel p-8 text-center">
            <History size={32} className="mx-auto mb-3 text-mist/30" />
            <p className="text-fog font-body">No current changes match your filters</p>
          </div>
        )}

        {/* Legacy Section Toggle */}
        {legacyEntries.length > 0 && (
          <div className="mt-12">
            <button
              onClick={() => setShowLegacy(!showLegacy)}
              className="w-full arcane-card arcane-card-hover p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <History size={20} className="text-gold/60" />
                <span className="font-display text-lg tracking-wide text-ivory">
                  Legacy Changes (Pre-Markdown Era)
                </span>
                <span className="arcane-badge bg-charcoal text-mist">
                  {legacyEntries.length} changes
                </span>
              </div>
              <div className="text-mist">
                {showLegacy ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </button>

            {showLegacy && (
              <div className="mt-6">
                <ChangelogTimeline entries={legacyEntries} />
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChangelogPage;
