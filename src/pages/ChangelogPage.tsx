import React, { useState, useMemo } from 'react';
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

  // Separate and filter entries
  const { currentEntries, legacyEntries } = useMemo(() => {
    // First, filter out the migration commit entirely
    const nonMigrationEntries = changelogData.entries.filter(
      entry => entry.commitHash !== MIGRATION_COMMIT
    );

    // Separate into legacy (before migration) and current (after migration)
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

    // Apply filters to both
    const applyFilters = (entries: typeof changelogData.entries) => {
      return entries.filter(entry => {
        // Map legacy 'air' essence type to 'wind'
        const normalizedEssenceType = entry.essenceType === 'air' ? 'wind' : entry.essenceType;

        // Filter by essence type (OR logic - show if matches ANY selected essence)
        if (selectedEssences.length > 0 && !selectedEssences.includes(normalizedEssenceType as EssencePathId)) {
          return false;
        }

        // Filter by change type (OR logic - show if matches ANY selected change type)
        if (selectedChangeTypes.length > 0 && !selectedChangeTypes.includes(entry.changeType as ChangeTypeFilter)) {
          return false;
        }

        // Filter by ability type (OR logic - show if matches ANY selected ability type)
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

        // Filter by search term (fuzzy search on ability name, description, and change values)
        if (searchTerm) {
          const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
          let matchFound = false;

          // Search in ability name
          if (entry.ability.name.toLowerCase().includes(lowercaseSearchTerm)) {
            matchFound = true;
          }

          // Search in ability description (for added/removed entries)
          if (!matchFound && entry.ability.description &&
              entry.ability.description.toLowerCase().includes(lowercaseSearchTerm)) {
            matchFound = true;
          }

          // Search in old/new values for modified entries
          if (!matchFound && entry.changes) {
            for (const change of entry.changes) {
              // Search in old value
              if ('oldValue' in change && change.oldValue !== undefined &&
                  String(change.oldValue).toLowerCase().includes(lowercaseSearchTerm)) {
                matchFound = true;
                break;
              }
              // Search in new value
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
      prev.includes(essence)
        ? prev.filter(e => e !== essence)
        : [...prev, essence]
    );
  };

  const handleChangeTypeToggle = (changeType: ChangeTypeFilter) => {
    setSelectedChangeTypes(prev =>
      prev.includes(changeType)
        ? prev.filter(c => c !== changeType)
        : [...prev, changeType]
    );
  };

  const handleAbilityTypeToggle = (abilityType: FilterType) => {
    setSelectedAbilityTypes(prev =>
      prev.includes(abilityType)
        ? prev.filter(t => t !== abilityType)
        : [...prev, abilityType]
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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Changelog</h1>
          <p className="text-gray-400 text-lg">
            Track all changes to essence abilities across commits
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
        <div className="mb-4 text-sm text-gray-400">
          Showing {totalFilteredCount} of {totalCount} changes
        </div>

        {/* Current Changes */}
        {currentEntries.length > 0 ? (
          <ChangelogTimeline entries={currentEntries} />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No current changes match your filters
          </div>
        )}

        {/* Legacy Section Toggle */}
        {legacyEntries.length > 0 && (
          <div className="mt-12">
            <button
              onClick={() => setShowLegacy(!showLegacy)}
              className="w-full flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-white">
                  Legacy Changes (Pre-Markdown Era)
                </span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                  {legacyEntries.length} changes
                </span>
              </div>
              <div className="text-gray-400">
                {showLegacy ? '▼ Hide' : '▶ Show'}
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
