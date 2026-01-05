import React, { useState } from 'react';
import { Info, Lock } from 'lucide-react';
import { MerchantItem, getRarityColor } from '../../types/merchant';

interface ItemCardProps {
  item: MerchantItem;
  onShowDetails: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onShowDetails }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const rarityColor = getRarityColor(item.rarity);

  return (
    <div
      className="relative border border-gray-600 rounded h-20 p-3 transition-all duration-150 cursor-pointer hover:bg-gray-700 flex flex-col justify-between"
      onClick={onShowDetails}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Item Name */}
      <div className="text-sm font-medium pr-16">{item.name}</div>

      {/* Badges Row */}
      <div className="flex gap-1.5 flex-wrap">
        {/* Rarity Badge */}
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${rarityColor}`}>
          {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
        </span>

        {/* Type Badge */}
        <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-300">
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>

        {/* Attunement Indicator */}
        {item.requiresAttunement && (
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-indigo-700 text-indigo-200 flex items-center gap-1">
            <Lock size={10} />
            Attune
          </span>
        )}
      </div>

      {/* Info Icon */}
      <button
        className="absolute bottom-2 right-2 text-gray-400 hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          onShowDetails();
        }}
        aria-label="Show item details"
      >
        <Info size={16} />
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-10 bottom-full left-0 mb-2 w-72 p-3 bg-gray-900 border border-gray-600 rounded shadow-lg">
          <h4 className="font-bold text-sm mb-1">{item.name}</h4>
          <div className="flex gap-2 mb-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full ${rarityColor}`}>
              {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            {item.requiresAttunement && (
              <p>Requires Attunement</p>
            )}
            {item.properties?.weaponType && (
              <p>Weapon: {item.properties.weaponType}</p>
            )}
            {item.properties?.armorType && (
              <p>Armor: {item.properties.armorType}</p>
            )}
            {item.source && (
              <p>Source: {item.source}</p>
            )}
          </div>
          <div className="mt-2 text-xs text-blue-300 italic">
            Click for full details
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
