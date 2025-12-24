import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind, ChevronDown } from 'lucide-react';
import { ESSENCE_PATHS, FilterType, FILTER_PILLS, EssencePathId } from '../../types/essence';
import { ChangeTypeFilter } from '../../types/changelog';

interface ChangelogFiltersProps {
  selectedEssences: EssencePathId[];
  selectedChangeTypes: ChangeTypeFilter[];
  selectedAbilityTypes: FilterType[];
  searchTerm: string;
  lastUpdated: string;
  onEssenceToggle: (essence: EssencePathId) => void;
  onChangeTypeToggle: (changeType: ChangeTypeFilter) => void;
  onAbilityTypeToggle: (abilityType: FilterType) => void;
  onSearchChange: (term: string) => void;
  onClearAll: () => void;
}

const CHANGE_TYPES: Array<{ id: ChangeTypeFilter; label: string }> = [
  { id: 'all', label: 'All Changes' },
  { id: 'added', label: 'Added' },
  { id: 'modified', label: 'Modified' },
  { id: 'removed', label: 'Removed' },
];

const ChangelogFilters: React.FC<ChangelogFiltersProps> = ({
  selectedEssences,
  selectedChangeTypes,
  selectedAbilityTypes,
  searchTerm,
  lastUpdated,
  onEssenceToggle,
  onChangeTypeToggle,
  onAbilityTypeToggle,
  onSearchChange,
  onClearAll
}) => {
  const [essenceDropdownOpen, setEssenceDropdownOpen] = useState(false);
  const essenceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (essenceDropdownRef.current && !essenceDropdownRef.current.contains(event.target as Node)) {
        setEssenceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  const getEssenceIcon = (id: EssencePathId) => {
    const iconProps = { size: 14, className: "inline" };
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

  const getEssenceName = (id: EssencePathId) => {
    return ESSENCE_PATHS.find(e => e.id === id)?.name || id;
  };

  const getEssenceColor = (id: EssencePathId): string => {
    const path = ESSENCE_PATHS.find(e => e.id === id);
    return path?.color || 'bg-gray-600';
  };

  const getAbilityTypeName = (id: FilterType) => {
    return FILTER_PILLS.find(p => p.id === id)?.label || id;
  };

  const getChangeTypeName = (id: ChangeTypeFilter) => {
    return CHANGE_TYPES.find(c => c.id === id)?.label || id;
  };

  return (
    <div className="space-y-3 mb-6 relative z-50">
      {/* Row 1: Search + Updated Date */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:flex-1 sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-md pl-10 pr-10 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search abilities..."
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Updated Date */}
        <span className="text-sm text-gray-400">
          Updated: {formatDate(lastUpdated)}
        </span>
      </div>

      {/* Row 2: Filters Dropdowns + Clear All */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-400 font-medium">Filters:</span>

          {/* Essence Dropdown */}
          <div className="relative" ref={essenceDropdownRef}>
            <button
              onClick={() => setEssenceDropdownOpen(!essenceDropdownOpen)}
              className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center gap-2 hover:bg-gray-600 transition-colors"
            >
              + Essence
              <ChevronDown size={14} className={`transition-transform ${essenceDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {essenceDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-100 min-w-[160px]">
                {ESSENCE_PATHS.filter(e => !selectedEssences.includes(e.id)).map((essence) => (
                  <button
                    key={essence.id}
                    onClick={() => {
                      onEssenceToggle(essence.id);
                      setEssenceDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-600 transition-colors flex items-center gap-2 text-white"
                  >
                    {getEssenceIcon(essence.id)}
                    {essence.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type Dropdown */}
          <select
            onChange={(e) => {
              const value = e.target.value as FilterType;
              if (value) {
                onAbilityTypeToggle(value);
                e.target.value = '';
              }
            }}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value=""
          >
            <option value="">+ Type</option>
            {FILTER_PILLS.filter(p => p.id !== 'all' && !selectedAbilityTypes.includes(p.id)).map((pill) => (
              <option key={pill.id} value={pill.id}>
                {pill.label}
              </option>
            ))}
          </select>

          {/* Change Type Dropdown */}
          <select
            onChange={(e) => {
              const value = e.target.value as ChangeTypeFilter;
              if (value) {
                onChangeTypeToggle(value);
                e.target.value = '';
              }
            }}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value=""
          >
            <option value="">+ Change</option>
            {CHANGE_TYPES.filter(c => c.id !== 'all' && !selectedChangeTypes.includes(c.id)).map((changeType) => (
              <option key={changeType.id} value={changeType.id}>
                {changeType.label}
              </option>
            ))}
          </select>

          {/* Clear All Button */}
          {(selectedEssences.length > 0 || selectedChangeTypes.length > 0 || selectedAbilityTypes.length > 0) && (
            <button
              onClick={onClearAll}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors ml-auto"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Selected Filter Pills */}
        {(selectedEssences.length > 0 || selectedChangeTypes.length > 0 || selectedAbilityTypes.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {/* Essence Pills */}
            {selectedEssences.map((essence) => (
              <button
                key={essence}
                onClick={() => onEssenceToggle(essence)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-white transition-colors hover:opacity-80 ${getEssenceColor(essence)}`}
              >
                {getEssenceIcon(essence)}
                {getEssenceName(essence)}
                <X size={12} />
              </button>
            ))}

            {/* Ability Type Pills */}
            {selectedAbilityTypes.map((type) => (
              <button
                key={type}
                onClick={() => onAbilityTypeToggle(type)}
                className="flex items-center gap-1 px-2 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-full text-xs font-medium text-white transition-colors"
              >
                {getAbilityTypeName(type)}
                <X size={12} />
              </button>
            ))}

            {/* Change Type Pills */}
            {selectedChangeTypes.map((changeType) => (
              <button
                key={changeType}
                onClick={() => onChangeTypeToggle(changeType)}
                className="flex items-center gap-1 px-2 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-full text-xs font-medium text-white transition-colors"
              >
                {getChangeTypeName(changeType)}
                <X size={12} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangelogFilters;
