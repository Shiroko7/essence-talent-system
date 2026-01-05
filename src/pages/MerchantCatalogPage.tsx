import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ItemListRow from '../components/merchants/ItemListRow';
import ItemDetailPanel from '../components/merchants/ItemDetailPanel';
import ItemFilters from '../components/merchants/ItemFilters';
import { MerchantItem, ItemFilterState, ItemRarity, ItemType, WeaponType, ArmorType } from '../types/merchant';
import merchantsData from '../data/merchants.json';
import { filterItems, sortItems } from '../utils/itemUtils';

type SortOption = 'name' | 'rarity' | 'type' | 'price';

const MerchantCatalogPage: React.FC = () => {
  const { merchantId } = useParams<{ merchantId: string }>();
  const [selectedItem, setSelectedItem] = useState<MerchantItem | null>(null);
  const [items, setItems] = useState<MerchantItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterState, setFilterState] = useState<ItemFilterState>({
    search: '',
    rarity: [],
    type: [],
    requiresAttunement: null,
    weaponType: [],
    armorType: []
  });

  // Find merchant
  const merchant = merchantsData.merchants.find(m => m.id === merchantId);

  // Load items dynamically
  useEffect(() => {
    if (merchant) {
      setIsLoading(true);
      import(`../data/items/${merchant.inventoryFile}.json`)
        .then(module => {
          setItems(module.default.items);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to load items:', err);
          setIsLoading(false);
        });
    }
  }, [merchant]);

  // Filter and sort items
  const processedItems = useMemo(() => {
    const filtered = filterItems(items, filterState);
    return sortItems(filtered, sortBy, merchant?.pricing, sortDirection);
  }, [items, filterState, sortBy, merchant?.pricing, sortDirection]);

  // Filter handlers
  const handleRarityToggle = (rarity: ItemRarity) => {
    setFilterState(prev => ({
      ...prev,
      rarity: prev.rarity.includes(rarity)
        ? prev.rarity.filter(r => r !== rarity)
        : [...prev.rarity, rarity]
    }));
  };

  const handleTypeToggle = (type: ItemType) => {
    setFilterState(prev => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type]
    }));
  };

  const handleWeaponTypeToggle = (weaponType: WeaponType) => {
    setFilterState(prev => ({
      ...prev,
      weaponType: prev.weaponType.includes(weaponType)
        ? prev.weaponType.filter(w => w !== weaponType)
        : [...prev.weaponType, weaponType]
    }));
  };

  const handleArmorTypeToggle = (armorType: ArmorType) => {
    setFilterState(prev => ({
      ...prev,
      armorType: prev.armorType.includes(armorType)
        ? prev.armorType.filter(a => a !== armorType)
        : [...prev.armorType, armorType]
    }));
  };

  const handleClearAll = () => {
    setFilterState({
      search: '',
      rarity: [],
      type: [],
      requiresAttunement: null,
      weaponType: [],
      armorType: []
    });
  };

  // Redirect if merchant not found
  if (!merchantId || !merchant) {
    return <Navigate to="/merchants" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Merchant Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">{merchant.name}</h1>
          <p className="text-gray-400 text-lg">{merchant.description}</p>
          {merchant.location && (
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
              <MapPin size={16} />
              <span>{merchant.location}</span>
            </div>
          )}
        </div>

        {/* Filters */}
        <ItemFilters
          filterState={filterState}
          onSearchChange={(term) => setFilterState(prev => ({ ...prev, search: term }))}
          onRarityToggle={handleRarityToggle}
          onTypeToggle={handleTypeToggle}
          onAttunementChange={(value) => setFilterState(prev => ({ ...prev, requiresAttunement: value }))}
          onWeaponTypeToggle={handleWeaponTypeToggle}
          onArmorTypeToggle={handleArmorTypeToggle}
          onClearAll={handleClearAll}
          totalItems={items.length}
          filteredItems={processedItems.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortDirection={sortDirection}
          onSortDirectionToggle={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
        />

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Loading items...</p>
          </div>
        ) : (
          /* Split Layout */
          <div className="flex gap-4 h-[calc(100vh-450px)]">
            {/* Left: Item List */}
            <div className="w-1/3 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="h-full overflow-y-auto">
                {processedItems.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <p>No items found</p>
                    {filterState.search && (
                      <p className="text-sm mt-2">Try adjusting your search or filters</p>
                    )}
                  </div>
                ) : (
                  processedItems.map(item => (
                    <ItemListRow
                      key={item.id}
                      item={item}
                      pricing={merchant.pricing}
                      isSelected={selectedItem?.id === item.id}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Right: Detail Panel */}
            <div className="flex-1 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <ItemDetailPanel item={selectedItem} pricing={merchant.pricing} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MerchantCatalogPage;
