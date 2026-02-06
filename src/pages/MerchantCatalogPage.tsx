import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Package } from 'lucide-react';
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

  const merchant = merchantsData.merchants.find(m => m.id === merchantId);

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

  const processedItems = useMemo(() => {
    const filtered = filterItems(items, filterState);
    return sortItems(filtered, sortBy, merchant?.pricing, sortDirection);
  }, [items, filterState, sortBy, merchant?.pricing, sortDirection]);

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

  if (!merchantId || !merchant) {
    return <Navigate to="/merchants" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl">
        {/* Merchant Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl tracking-wide text-ivory mb-2">{merchant.name}</h1>
          <p className="text-fog text-lg font-body">{merchant.description}</p>
          {merchant.location && (
            <div className="flex items-center gap-2 text-mist text-sm mt-2 font-body">
              <MapPin size={16} className="text-gold/60" />
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
          <div className="arcane-panel p-12 text-center">
            <p className="text-fog text-lg font-body">Loading items...</p>
          </div>
        ) : (
          /* Split Layout */
          <div className="flex gap-4 h-[calc(100vh-420px)] min-h-[500px]">
            {/* Left: Item List */}
            <div className="w-1/3 arcane-panel overflow-hidden">
              <div className="h-full overflow-y-auto">
                {processedItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <Package size={32} className="mx-auto mb-3 text-mist/30" />
                    <p className="text-fog font-body">No items found</p>
                    {filterState.search && (
                      <p className="text-sm text-mist mt-2">Try adjusting your search or filters</p>
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
            <div className="flex-1 arcane-panel overflow-hidden">
              <ItemDetailPanel item={selectedItem} pricing={merchant.pricing} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MerchantCatalogPage;
