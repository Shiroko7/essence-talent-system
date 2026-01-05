import React from 'react';
import { Search, X, ArrowUp, ArrowDown } from 'lucide-react';
import {
  ItemFilterState,
  ItemRarity,
  ItemType,
  WeaponType,
  ArmorType,
  ITEM_RARITIES,
  ITEM_TYPES,
  WEAPON_TYPES,
  ARMOR_TYPES,
  getRarityColor
} from '../../types/merchant';

interface ItemFiltersProps {
  filterState: ItemFilterState;
  onSearchChange: (term: string) => void;
  onRarityToggle: (rarity: ItemRarity) => void;
  onTypeToggle: (type: ItemType) => void;
  onAttunementChange: (value: boolean | null) => void;
  onWeaponTypeToggle: (weaponType: WeaponType) => void;
  onArmorTypeToggle: (armorType: ArmorType) => void;
  onClearAll: () => void;
  totalItems: number;
  filteredItems: number;
  sortBy: 'name' | 'rarity' | 'type' | 'price';
  onSortChange: (value: 'name' | 'rarity' | 'type' | 'price') => void;
  sortDirection: 'asc' | 'desc';
  onSortDirectionToggle: () => void;
}

const ItemFilters: React.FC<ItemFiltersProps> = ({
  filterState,
  onSearchChange,
  onRarityToggle,
  onTypeToggle,
  onAttunementChange,
  onWeaponTypeToggle,
  onArmorTypeToggle,
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
    filterState.type.length > 0 ||
    filterState.requiresAttunement !== null ||
    filterState.weaponType.length > 0 ||
    filterState.armorType.length > 0;

  const showWeaponFilters = filterState.type.includes('weapon');
  const showArmorFilters = filterState.type.includes('armor');

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
            placeholder="Search items..."
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
            const value = e.target.value as ItemRarity;
            if (value) {
              onRarityToggle(value);
              e.target.value = '';
            }
          }}
          className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value=""
        >
          <option value="">+ Rarity</option>
          {ITEM_RARITIES.filter(r => !filterState.rarity.includes(r.id)).map((rarity) => (
            <option key={rarity.id} value={rarity.id}>
              {rarity.label}
            </option>
          ))}
        </select>

        {/* Type Dropdown */}
        <select
          onChange={(e) => {
            const value = e.target.value as ItemType;
            if (value) {
              onTypeToggle(value);
              e.target.value = '';
            }
          }}
          className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value=""
        >
          <option value="">+ Type</option>
          {ITEM_TYPES.filter(t => !filterState.type.includes(t.id)).map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>

        {/* Attunement Filter Buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => onAttunementChange(null)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filterState.requiresAttunement === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onAttunementChange(true)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filterState.requiresAttunement === true
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Attunement
          </button>
          <button
            onClick={() => onAttunementChange(false)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filterState.requiresAttunement === false
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            No Attunement
          </button>
        </div>

        {/* Weapon Type Dropdown (conditional) */}
        {showWeaponFilters && (
          <select
            onChange={(e) => {
              const value = e.target.value as WeaponType;
              if (value) {
                onWeaponTypeToggle(value);
                e.target.value = '';
              }
            }}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value=""
          >
            <option value="">+ Weapon</option>
            {/* Group by category */}
            {['Simple Melee', 'Martial Melee', 'Simple Ranged', 'Martial Ranged'].map(category => {
              const categoryWeapons = WEAPON_TYPES.filter(w =>
                w.category === category && !filterState.weaponType.includes(w.id)
              );
              if (categoryWeapons.length === 0) return null;
              return (
                <optgroup key={category} label={category}>
                  {categoryWeapons.map((weaponType) => (
                    <option key={weaponType.id} value={weaponType.id}>
                      {weaponType.label}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        )}

        {/* Armor Type Dropdown (conditional) */}
        {showArmorFilters && (
          <select
            onChange={(e) => {
              const value = e.target.value as ArmorType;
              if (value) {
                onArmorTypeToggle(value);
                e.target.value = '';
              }
            }}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value=""
          >
            <option value="">+ Armor</option>
            {ARMOR_TYPES.filter(a => !filterState.armorType.includes(a.id)).map((armorType) => (
              <option key={armorType.id} value={armorType.id}>
                {armorType.label}
              </option>
            ))}
          </select>
        )}

        {/* Sort Controls - pushed to right */}
        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sort" className="text-sm text-gray-400">Sort:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'name' | 'rarity' | 'type' | 'price')}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rarity">Rarity</option>
            <option value="type">Type</option>
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
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 ${getRarityColor(rarity)}`}
            >
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              <X size={12} />
            </button>
          ))}

          {/* Type Pills */}
          {filterState.type.map((type) => (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-full text-xs font-medium text-white transition-colors"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <X size={12} />
            </button>
          ))}

          {/* Weapon Type Pills */}
          {filterState.weaponType.map((weaponType) => (
            <button
              key={weaponType}
              onClick={() => onWeaponTypeToggle(weaponType)}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-full text-xs font-medium text-white transition-colors"
            >
              {weaponType.charAt(0).toUpperCase() + weaponType.slice(1)}
              <X size={12} />
            </button>
          ))}

          {/* Armor Type Pills */}
          {filterState.armorType.map((armorType) => (
            <button
              key={armorType}
              onClick={() => onArmorTypeToggle(armorType)}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-full text-xs font-medium text-white transition-colors"
            >
              {armorType.charAt(0).toUpperCase() + armorType.slice(1)}
              <X size={12} />
            </button>
          ))}
        </div>
      )}

      {/* Row 3: Item Count */}
      <div className="flex items-center">
        <span className="text-sm text-gray-400">
          Showing {filteredItems} of {totalItems} items
        </span>
      </div>
    </div>
  );
};

export default ItemFilters;
