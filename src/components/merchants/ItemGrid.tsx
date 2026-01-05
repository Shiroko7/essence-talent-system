import React from 'react';
import ItemCard from './ItemCard';
import { MerchantItem } from '../../types/merchant';

interface ItemGridProps {
  items: MerchantItem[];
  onItemClick: (item: MerchantItem) => void;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, onItemClick }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No items match your filters</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onShowDetails={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

export default ItemGrid;
