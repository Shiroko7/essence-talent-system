import React, { useState, useMemo } from 'react';
import { FlaskConical, Coins, ChevronDown } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PotionCard from '../components/potions/PotionCard';
import PotionDetailPanel from '../components/potions/PotionDetailPanel';
import PotionFilters from '../components/potions/PotionFilters';
import { Potion, PotionFilterState, PotionRarity, PotionCategory } from '../types/potion';
import { filterPotions, sortPotions } from '../utils/potionUtils';
import potionsData from '../data/potions.json';

type SortOption = 'name' | 'rarity' | 'category';

const PotionsPage: React.FC = () => {
  const [selectedPotion, setSelectedPotion] = useState<Potion | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [craftingExpanded, setCraftingExpanded] = useState(false);
  const [filterState, setFilterState] = useState<PotionFilterState>({
    search: '',
    rarity: [],
    category: []
  });

  const potions = potionsData.potions as Potion[];

  const processedPotions = useMemo(() => {
    const filtered = filterPotions(potions, filterState);
    return sortPotions(filtered, sortBy, sortDirection);
  }, [potions, filterState, sortBy, sortDirection]);

  const handleRarityToggle = (rarity: PotionRarity) => {
    setFilterState(prev => ({
      ...prev,
      rarity: prev.rarity.includes(rarity)
        ? prev.rarity.filter(r => r !== rarity)
        : [...prev.rarity, rarity]
    }));
  };

  const handleCategoryToggle = (category: PotionCategory) => {
    setFilterState(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleClearAll = () => {
    setFilterState({ search: '', rarity: [], category: [] });
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <FlaskConical size={32} className="text-essence-poison" />
            <h1 className="font-display text-3xl md:text-4xl tracking-wide text-ivory">
              Potion Encyclopedia
            </h1>
          </div>
          <p className="text-fog text-lg font-body">
            Browse and search through all available potions, elixirs, poisons, and medicines.
          </p>
        </div>

        {/* Crafting Cost Guideline */}
        <div className="arcane-panel p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base tracking-wide text-ivory flex items-center gap-2">
              <Coins size={18} className="text-gold" />
              Crafting Guidelines
            </h2>
            <button
              onClick={() => setCraftingExpanded(!craftingExpanded)}
              className="arcane-btn px-3 py-1.5 text-xs flex items-center gap-1"
            >
              {craftingExpanded ? 'Hide' : 'Show'} Full Rules
              <ChevronDown size={14} className={`transition-transform ${craftingExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Cost & Time & DC Table */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'Common', cost: '25 gp', time: '2.5 days', dc: '10', color: 'text-rarity-common' },
              { label: 'Uncommon', cost: '100 gp', time: '5 days', dc: '15', color: 'text-rarity-uncommon' },
              { label: 'Rare', cost: '1,000 gp', time: '25 days', dc: '20', color: 'text-rarity-rare' },
              { label: 'Very Rare', cost: '10,000 gp', time: '62.5 days', dc: '25', color: 'text-rarity-very-rare' },
              { label: 'Legendary', cost: '50,000 gp', time: '125 days', dc: '30', color: 'text-rarity-legendary' },
            ].map(item => (
              <div key={item.label} className="arcane-card p-3 text-center">
                <div className={`font-display text-xs tracking-wider mb-2 ${item.color}`}>
                  {item.label}
                </div>
                <div className="text-gold font-display text-sm">{item.cost}</div>
                <div className="text-mist text-xs mt-1">{item.time}</div>
                <div className="text-fog text-xs mt-1">DC {item.dc}</div>
              </div>
            ))}
          </div>

          {/* Expanded Rules */}
          {craftingExpanded && (
            <div className="mt-6 pt-4 border-t border-gold-subtle space-y-4">
              <div>
                <h3 className="font-display text-sm tracking-wide text-gold mb-2">Work per Day</h3>
                <p className="text-fog text-sm font-body">
                  For each day of crafting, you must work for 8 hours. If an item requires multiple days, those days needn't be consecutive.
                </p>
              </div>

              <div>
                <h3 className="font-display text-sm tracking-wide text-gold mb-2">Assistants</h3>
                <p className="text-fog text-sm font-body">
                  Characters can combine their efforts to shorten the crafting time. Divide the time needed to create an item by the number of characters working on it. Normally, only one other character can assist you, but the DM might allow more assistants.
                </p>
              </div>

              <div>
                <h3 className="font-display text-sm tracking-wide text-gold mb-2">Raw Materials</h3>
                <p className="text-fog text-sm font-body">
                  The cost represents the raw materials needed to craft the item. The DM determines whether appropriate raw materials are available, and may assign a probability based on location (major city, settlement, or traveling).
                </p>
              </div>

              <div>
                <h3 className="font-display text-sm tracking-wide text-gold mb-2">Items with Base Cost</h3>
                <p className="text-fog text-sm font-body">
                  If a magic item incorporates an item that has a purchase cost (such as a weapon or a suit of armor), you must also pay that entire cost or craft that item using the rules in the Player's Handbook. For example, to make +1 Armor (Plate Armor), you must pay 3,500 GP or pay 2,000 GP and craft the armor.
                </p>
              </div>

              <div>
                <h3 className="font-display text-sm tracking-wide text-gold mb-2">Failed Crafting Checks</h3>
                <p className="text-fog text-sm font-body">
                  When failing a crafting check, the degree of failure and its consequences are up to the DM's discretion given the circumstances.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <PotionFilters
          filterState={filterState}
          onSearchChange={(term) => setFilterState(prev => ({ ...prev, search: term }))}
          onRarityToggle={handleRarityToggle}
          onCategoryToggle={handleCategoryToggle}
          onClearAll={handleClearAll}
          totalItems={potions.length}
          filteredItems={processedPotions.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortDirection={sortDirection}
          onSortDirectionToggle={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
        />

        {/* Split Layout */}
        <div className="flex gap-4 h-[calc(100vh-420px)] min-h-[500px]">
          {/* Left: Potion List */}
          <div className="w-1/3 arcane-panel overflow-hidden">
            <div className="h-full overflow-y-auto">
              {processedPotions.length === 0 ? (
                <div className="p-8 text-center">
                  <FlaskConical size={32} className="mx-auto mb-3 text-mist/30" />
                  <p className="text-fog font-body">No potions found</p>
                  {filterState.search && (
                    <p className="text-sm text-mist mt-2">Try adjusting your search or filters</p>
                  )}
                </div>
              ) : (
                processedPotions.map(potion => (
                  <PotionCard
                    key={potion.id}
                    potion={potion}
                    isSelected={selectedPotion?.id === potion.id}
                    onClick={() => setSelectedPotion(potion)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right: Detail Panel */}
          <div className="flex-1 arcane-panel overflow-hidden">
            <PotionDetailPanel potion={selectedPotion} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PotionsPage;
