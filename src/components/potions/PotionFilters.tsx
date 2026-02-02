import React from 'react';
import { Search, X, ArrowUp, ArrowDown } from 'lucide-react';
import {
  PotionFilterState,
  PotionRarity,
  PotionCategory,
  POTION_RARITIES,
  POTION_CATEGORIES,
  getPotionRarityColor
} from '../../types/potion';

interface PotionFiltersProps {
  filterState: PotionFilterState;
  onSearchChange: (term: string) => void;
  onRarityToggle: (rarity: PotionRarity) => void;
  onCategoryToggle: (category: PotionCategory) => void;
  onClearAll: () => void;
  totalItems: number;
  filteredItems: number;
  sortBy: 'name' | 'rarity' | 'category';
  onSortChange: (value: 'name' | 'rarity' | 'category') => void;
  sortDirection: 'asc' | 'desc';
  onSortDirectionToggle: () => void;
}

const PotionFilters: React.FC<PotionFiltersProps> = ({
  filterState,
  onSearchChange,
  onRarityToggle,
  onCategoryToggle,
  onClearAll,
  totalItems,
  filteredItems,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionToggle
}) => {
  const hasFilters =
    filterState.rarity.length > 0 ||
    filterState.category.length > 0;

  return (
    <div className="space-y-2 mb-6">
      {/* Row 1: Search + Filters + Sort */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={filterState.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-md pl-10 pr-10 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search potions by name, effect, saving throw..."
          />
          {filterState.search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <span className="hidden sm:inline text-sm text-gray-400 font-medium">Filters:</span>

        {/* Rarity Dropdown */}
        <select
          onChange={(e) => {
            const value = e.target.value as PotionRarity;
            if (value) {
              onRarityToggle(value);
              e.target.value = '';
            }
          }}
          className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value=""
        >
          <option value="">+ Rarity</option>
          {POTION_RARITIES.filter(r => !filterState.rarity.includes(r.id)).map((rarity) => (
            <option key={rarity.id} value={rarity.id}>
              {rarity.label}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select
          onChange={(e) => {
            const value = e.target.value as PotionCategory;
            if (value) {
              onCategoryToggle(value);
              e.target.value = '';
            }
          }}
          className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value=""
        >
          <option value="">+ Category</option>
          {POTION_CATEGORIES.filter(c => !filterState.category.includes(c.id)).map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>

        {/* Sort Controls - pushed to right */}
        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sort" className="text-sm text-gray-400">Sort:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'name' | 'rarity' | 'category')}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Name</option>
            <option value="rarity">Rarity</option>
            <option value="category">Category</option>
          </select>
          <button
            onClick={onSortDirectionToggle}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 hover:bg-gray-600 transition-colors"
            title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </button>
        </div>

        {/* Clear All Button */}
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Row 2: Selected Filter Pills */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {/* Rarity Pills */}
          {filterState.rarity.map((rarity) => (
            <button
              key={rarity}
              onClick={() => onRarityToggle(rarity)}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 ${getPotionRarityColor(rarity)}`}
            >
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              <X size={12} />
            </button>
          ))}

          {/* Category Pills */}
          {filterState.category.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryToggle(category)}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 bg-indigo-600 text-white"
            >
              {POTION_CATEGORIES.find(c => c.id === category)?.label || category}
              <X size={12} />
            </button>
          ))}
        </div>
      )}

      {/* Row 3: Item Count */}
      <div className="flex items-center">
        <span className="text-sm text-gray-400">
          Showing {filteredItems} of {totalItems} potions
        </span>
      </div>
    </div>
  );
};

export default PotionFilters;
