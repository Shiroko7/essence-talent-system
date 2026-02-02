import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Potion, getPotionRarityColor, POTION_CATEGORIES } from '../../types/potion';

interface PotionCardProps {
  potion: Potion;
  isSelected: boolean;
  onClick: () => void;
}

const PotionCard: React.FC<PotionCardProps> = ({ potion, isSelected, onClick }) => {
  const categoryLabel = POTION_CATEGORIES.find(c => c.id === potion.category)?.label || potion.category;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border-b border-gray-700 transition-colors ${
        isSelected
          ? 'bg-gray-700'
          : 'hover:bg-gray-750 hover:bg-opacity-50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium">{potion.name}</h3>
          <p className="text-gray-500 text-sm">{categoryLabel}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPotionRarityColor(potion.rarity)}`}>
            {potion.rarity.charAt(0).toUpperCase() + potion.rarity.slice(1)}
          </span>
          {potion.isAddictive && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-700 text-red-200">
              <AlertTriangle size={10} />
              Addictive
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default PotionCard;
