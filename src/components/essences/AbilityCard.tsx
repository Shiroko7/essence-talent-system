import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Ability, EssencePath, getTierCost } from '../../types/essence';

interface AbilityCardProps {
  ability: Ability;
  path: EssencePath;
  isSelected: boolean;
  isLocked: boolean;
  onToggle: () => void;
  onShowDetails: () => void;
}

const getTypeStyles = (ability: Ability) => {
  if (ability.isPassive) {
    return {
      label: 'Passive',
      className: 'bg-type-passive text-void',
    };
  } else if (ability.isActive) {
    return {
      label: 'Active',
      className: 'bg-type-active text-void',
    };
  } else if (ability.isCantrip) {
    return {
      label: 'Cantrip',
      className: 'bg-type-cantrip text-void',
    };
  } else if (ability.isSpell) {
    return {
      label: `${ability.tier} Spell`,
      className: 'bg-type-spell text-void',
    };
  }
  return {
    label: '',
    className: '',
  };
};

const AbilityCard: React.FC<AbilityCardProps> = ({
  ability,
  isSelected,
  isLocked,
  onToggle,
  onShowDetails
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const cost = getTierCost(ability.tier);
  const typeStyles = getTypeStyles(ability);

  const handleCardClick = () => {
    if (isLocked) return;
    onToggle();
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowDetails();
  };

  const formatDescription = (description: string): React.ReactNode => {
    if (description.startsWith('http')) {
      return null;
    }
    const preview = description.length > 120
      ? description.substring(0, 120) + '...'
      : description;
    return <p className="text-parchment/80 text-sm leading-relaxed">{preview}</p>;
  };

  return (
    <div
      className={`
        relative arcane-card transition-all duration-200 cursor-pointer
        ${isLocked ? 'opacity-40 cursor-not-allowed' : 'arcane-card-hover'}
        ${isSelected ? 'ability-selected' : 'border-l-2 border-l-transparent'}
      `}
      onClick={handleCardClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ minHeight: '80px' }}
    >
      {/* Top row: Name (left) and Type badge (right) */}
      <div className="absolute top-3 left-4 right-4 flex items-start justify-between gap-3">
        <h4 className={`font-display text-base tracking-wide ${isSelected ? 'text-gold-bright' : 'text-ivory'}`}>
          {ability.name}
        </h4>
        <span className={`
          px-2.5 py-1 rounded text-xs font-display tracking-wide flex-shrink-0 ${typeStyles.className}
        `}>
          {typeStyles.label}
        </span>
      </div>

      {/* Bottom row: Info button (right) */}
      <button
        className="absolute bottom-3 right-3 text-mist hover:text-gold transition-colors p-1.5 rounded hover:bg-charcoal"
        onClick={handleInfoClick}
        aria-label="Show ability details"
      >
        <Info size={18} />
      </button>

      {/* Selected indicator line */}
      {isSelected && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/80 via-gold to-gold/80" />
      )}

      {/* Tooltip */}
      {showTooltip && !isLocked && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-80 p-4 arcane-tooltip pointer-events-none">
          <h4 className="font-display text-base tracking-wide text-ivory mb-2">
            {ability.name}
          </h4>
          <div className="text-sm leading-relaxed max-h-48 overflow-y-auto font-body text-parchment/90">
            {formatDescription(ability.description)}
          </div>
          <div className="arcane-divider my-3" />
          <div className="flex justify-between text-sm text-fog font-body">
            <span>Tier: <span className="text-gold">{ability.tier}</span></span>
            <span>
              {ability.isPassive || ability.isCantrip
                ? <span className="text-essence-fire">Reduces max by {cost}</span>
                : <span className="text-essence-water">Costs {cost} essence</span>
              }
            </span>
          </div>
          <p className="mt-2 text-xs text-mist">
            Click info icon for full details
          </p>
        </div>
      )}
    </div>
  );
};

export default AbilityCard;
