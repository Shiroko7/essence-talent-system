import React, { useState, useMemo } from 'react';
import { FlaskConical } from 'lucide-react';
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
  const [filterState, setFilterState] = useState<PotionFilterState>({
    search: '',
    rarity: [],
    category: []
  });

  const potions = potionsData.potions as Potion[];

  // Filter and sort potions
  const processedPotions = useMemo(() => {
    const filtered = filterPotions(potions, filterState);
    return sortPotions(filtered, sortBy, sortDirection);
  }, [potions, filterState, sortBy, sortDirection]);

  // Filter handlers
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
    setFilterState({
      search: '',
      rarity: [],
      category: []
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical size={32} className="text-pink-500" />
            <h1 className="text-4xl font-bold text-white">Potion Encyclopedia</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Browse and search through all available potions, elixirs, poisons, and medicines.
          </p>
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
        <div className="flex gap-4 h-[calc(100vh-400px)] min-h-[500px]">
          {/* Left: Potion List */}
          <div className="w-1/3 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="h-full overflow-y-auto">
              {processedPotions.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <p>No potions found</p>
                  {filterState.search && (
                    <p className="text-sm mt-2">Try adjusting your search or filters</p>
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
          <div className="flex-1 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <PotionDetailPanel potion={selectedPotion} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PotionsPage;
