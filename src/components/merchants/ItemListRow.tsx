import React from 'react';
import { MerchantItem, MerchantPricing, getItemPrice, formatPrice, getRarityColor } from '../../types/merchant';

interface ItemListRowProps {
  item: MerchantItem;
  pricing: MerchantPricing;
  isSelected: boolean;
  onClick: () => void;
}

const ItemListRow: React.FC<ItemListRowProps> = ({ item, pricing, isSelected, onClick }) => {
  const price = getItemPrice(item, pricing);
  const priceFormatted = formatPrice(price, pricing.currency);
  const rarityColor = getRarityColor(item.rarity);

  // Get specific weapon/armor type or fall back to generic type
  const getItemTypeDisplay = () => {
    if (item.type === 'weapon' && item.properties?.weaponType) {
      return item.properties.weaponType.charAt(0).toUpperCase() + item.properties.weaponType.slice(1);
    }
    if (item.type === 'armor' && item.properties?.armorType) {
      return item.properties.armorType.charAt(0).toUpperCase() + item.properties.armorType.slice(1);
    }
    return item.type.charAt(0).toUpperCase() + item.type.slice(1);
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-3 border-b border-gray-700 cursor-pointer transition-colors
        ${isSelected ? 'bg-blue-900 border-blue-600' : 'hover:bg-gray-700'}
      `}
    >
      {/* Title row - left aligned */}
      <h3 className="text-sm font-medium text-white text-left mb-2">{item.name}</h3>

      {/* Badges and price row */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-2">
          <span className={`text-xs px-1.5 py-0.5 rounded ${rarityColor}`}>
            {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          </span>
          <span className="text-xs text-gray-400">
            {getItemTypeDisplay()}
          </span>
        </div>
        <p className="text-sm font-bold text-green-400">{priceFormatted}</p>
      </div>
    </div>
  );
};

export default ItemListRow;
