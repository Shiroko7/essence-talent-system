import React from 'react';
import { Info, Sparkles } from 'lucide-react';
import { Ability, getTierCost } from '../../types/essence';
import { CultivationPath } from '../../types/cultivation';
import { AbilityMarkdown } from '../essences/AbilityMarkdown';

interface CultivationAbilityCardProps {
  ability: Ability;
  path: CultivationPath;
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

const CultivationAbilityCard: React.FC<CultivationAbilityCardProps> = ({
  ability,
  path,
  isSelected,
  isLocked,
  onToggle,
  onShowDetails
}) => {
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
    const firstParagraph = description.split('\n\n')[0];
    const preview = firstParagraph.length > 150
      ? firstParagraph.substring(0, 150) + '...'
      : firstParagraph;
    return <AbilityMarkdown content={preview} className="text-xs" />;
  };

  return (
    <div
      className={`
        relative arcane-card transition-all duration-200 cursor-pointer p-3.5 flex flex-col justify-between
        ${isLocked ? 'opacity-40 cursor-not-allowed' : 'arcane-card-hover'}
        ${isSelected
          ? `ability-selected border-l-2 !border-gold ${path.glowClass}`
          : 'border-l-2 border-l-transparent hover:border-l-gold/40'
        }
      `}
      onClick={handleCardClick}
      style={{ minHeight: '90px' }}
    >
      {/* Selected indicator line */}
      {isSelected && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold/80 via-gold to-gold/80" />
      )}

      {/* Top row: Name & Type badge */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h4 className={`font-display text-sm tracking-wide ${isSelected ? 'text-gold-bright' : 'text-ivory'}`}>
            {ability.name}
          </h4>
          <span className={`px-2 py-0.5 rounded text-[11px] font-display tracking-wider flex-shrink-0 ${typeStyles.className}`}>
            {typeStyles.label}
          </span>
        </div>

        {/* Preview description */}
        <div className="text-fog/80 text-xs mb-3 line-clamp-3">
          {formatDescription(ability.description)}
        </div>
      </div>

      {/* Bottom row: Cost & Info */}
      <div className="flex items-center justify-between pt-2 border-t border-gold-subtle/50 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-mist uppercase font-display">Cost:</span>
          <span className="font-display font-medium text-gold">{cost} pt{cost > 1 ? 's' : ''}</span>
          {isSelected && (
            <span className="flex items-center gap-1 text-[11px] text-gold-bright ml-2">
              <Sparkles size={12} /> Learned
            </span>
          )}
        </div>

        <button
          onClick={handleInfoClick}
          className="p-1 rounded text-mist hover:text-gold hover:bg-charcoal transition-colors"
          aria-label="View details"
          title="View full details"
        >
          <Info size={15} />
        </button>
      </div>
    </div>
  );
};

export default CultivationAbilityCard;
