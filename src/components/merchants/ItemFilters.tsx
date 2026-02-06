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
    <div className="space-y-3 mb-6">
      {/* Row 1: Search + Filters + Sort */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-mist group-focus-within:text-gold transition-colors" />
          </div>
          <input
            type="text"
            value={filterState.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="arcane-input w-full pl-12 pr-10 py-2 text-sm"
            placeholder="Search items..."
          />
          {filterState.search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-mist hover:text-parchment transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <span className="hidden sm:inline font-display text-xs tracking-wider text-mist uppercase">Filters:</span>

        {/* Rarity Dropdown */}
        <select
          onChange={(e) => {
            const value = e.target.value as ItemRarity;
            if (value) {
              onRarityToggle(value);
              e.target.value = '';
            }
          }}
          className="arcane-input py-1.5 px-3 text-sm font-display tracking-wide cursor-pointer"
          value=""
        >
          <option value="" className="bg-obsidian">+ Rarity</option>
          {ITEM_RARITIES.filter(r => !filterState.rarity.includes(r.id)).map((rarity) => (
            <option key={rarity.id} value={rarity.id} className="bg-obsidian">
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
          className="arcane-input py-1.5 px-3 text-sm font-display tracking-wide cursor-pointer"
          value=""
        >
          <option value="" className="bg-obsidian">+ Type</option>
          {ITEM_TYPES.filter(t => !filterState.type.includes(t.id)).map((type) => (
            <option key={type.id} value={type.id} className="bg-obsidian">
              {type.label}
            </option>
          ))}
        </select>

        {/* Attunement Filter Buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => onAttunementChange(null)}
            className={`px-3 py-1.5 text-sm rounded font-display tracking-wide transition-colors ${
              filterState.requiresAttunement === null
                ? 'bg-gold/20 text-gold border border-gold/40'
                : 'bg-charcoal text-mist border border-gold-subtle hover:border-gold/30'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onAttunementChange(true)}
            className={`px-3 py-1.5 text-sm rounded font-display tracking-wide transition-colors ${
              filterState.requiresAttunement === true
                ? 'bg-gold/20 text-gold border border-gold/40'
                : 'bg-charcoal text-mist border border-gold-subtle hover:border-gold/30'
            }`}
          >
            Attunement
          </button>
          <button
            onClick={() => onAttunementChange(false)}
            className={`px-3 py-1.5 text-sm rounded font-display tracking-wide transition-colors ${
              filterState.requiresAttunement === false
                ? 'bg-gold/20 text-gold border border-gold/40'
                : 'bg-charcoal text-mist border border-gold-subtle hover:border-gold/30'
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
            className="arcane-input py-1.5 px-3 text-sm font-display tracking-wide cursor-pointer"
            value=""
          >
            <option value="" className="bg-obsidian">+ Weapon</option>
            {['Simple Melee', 'Martial Melee', 'Simple Ranged', 'Martial Ranged'].map(category => {
              const categoryWeapons = WEAPON_TYPES.filter(w =>
                w.category === category && !filterState.weaponType.includes(w.id)
              );
              if (categoryWeapons.length === 0) return null;
              return (
                <optgroup key={category} label={category} className="bg-obsidian">
                  {categoryWeapons.map((weaponType) => (
                    <option key={weaponType.id} value={weaponType.id} className="bg-obsidian">
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
            className="arcane-input py-1.5 px-3 text-sm font-display tracking-wide cursor-pointer"
            value=""
          >
            <option value="" className="bg-obsidian">+ Armor</option>
            {ARMOR_TYPES.filter(a => !filterState.armorType.includes(a.id)).map((armorType) => (
              <option key={armorType.id} value={armorType.id} className="bg-obsidian">
                {armorType.label}
              </option>
            ))}
          </select>
        )}

        {/* Sort Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sort" className="font-display text-xs tracking-wider text-mist uppercase">Sort:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'name' | 'rarity' | 'type' | 'price')}
            className="arcane-input py-1.5 px-3 text-sm font-display tracking-wide cursor-pointer"
          >
            <option value="name" className="bg-obsidian">Name</option>
            <option value="price" className="bg-obsidian">Price</option>
            <option value="rarity" className="bg-obsidian">Rarity</option>
            <option value="type" className="bg-obsidian">Type</option>
          </select>
          <button
            onClick={onSortDirectionToggle}
            className="arcane-btn p-1.5"
            title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </button>
        </div>

        {/* Clear All Button */}
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="font-display text-xs tracking-wider text-gold hover:text-gold-bright transition-colors"
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
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-display tracking-wide transition-colors hover:opacity-80 ${getRarityColor(rarity)}`}
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
              className="flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-gold border border-gold/30 rounded text-xs font-display tracking-wide transition-colors hover:opacity-80"
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
              className="flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-gold border border-gold/30 rounded text-xs font-display tracking-wide transition-colors hover:opacity-80"
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
              className="flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-gold border border-gold/30 rounded text-xs font-display tracking-wide transition-colors hover:opacity-80"
            >
              {armorType.charAt(0).toUpperCase() + armorType.slice(1)}
              <X size={12} />
            </button>
          ))}
        </div>
      )}

      {/* Row 3: Item Count */}
      <div className="flex items-center">
        <span className="text-sm text-mist font-body">
          Showing <span className="text-parchment">{filteredItems}</span> of <span className="text-parchment">{totalItems}</span> items
        </span>
      </div>
    </div>
  );
};

export default ItemFilters;
