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
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 border-b border-gold-subtle transition-all duration-200
        ${isSelected
          ? 'bg-gold/10 border-l-2 border-l-gold'
          : 'hover:bg-charcoal/50 border-l-2 border-l-transparent'
        }
      `}
    >
      {/* Title row */}
      <h3 className={`font-display text-sm tracking-wide mb-2 ${isSelected ? 'text-gold-bright' : 'text-ivory'}`}>
        {item.name}
      </h3>

      {/* Badges and price row */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-2">
          <span className={`px-2 py-0.5 rounded text-xs font-display tracking-wide ${rarityColor}`}>
            {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          </span>
          <span className="text-xs text-mist font-body">
            {getItemTypeDisplay()}
          </span>
        </div>
        <p className="text-sm font-display text-type-spell">{priceFormatted}</p>
      </div>
    </button>
  );
};

export default ItemListRow;
