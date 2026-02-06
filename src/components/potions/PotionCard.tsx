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
      className={`
        w-full text-left p-4 border-b border-gold-subtle transition-all duration-200
        ${isSelected
          ? 'bg-charcoal border-l-2 border-l-gold'
          : 'hover:bg-charcoal/50 border-l-2 border-l-transparent'
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-display text-sm tracking-wide ${isSelected ? 'text-gold-bright' : 'text-ivory'}`}>
            {potion.name}
          </h3>
          <p className="text-mist text-xs font-body mt-0.5">{categoryLabel}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={`px-2 py-0.5 rounded text-xs font-display tracking-wide ${getPotionRarityColor(potion.rarity)}`}>
            {potion.rarity.charAt(0).toUpperCase() + potion.rarity.slice(1)}
          </span>
          {potion.isAddictive && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-display tracking-wide bg-essence-fire/20 text-essence-fire border border-essence-fire/30">
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
