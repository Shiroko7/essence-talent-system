import React from 'react';
import { X, Sparkles, User, MapPin } from 'lucide-react';
import { Ability, getTierCost } from '../../types/essence';
import { CultivationPath } from '../../types/cultivation';
import { AbilityMarkdown } from '../essences/AbilityMarkdown';

interface CultivationAbilityDetailsModalProps {
  ability: Ability | null;
  path: CultivationPath;
  isSelected: boolean;
  isLocked: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const CultivationAbilityDetailsModal: React.FC<CultivationAbilityDetailsModalProps> = ({
  ability,
  path,
  isSelected,
  isLocked,
  onClose,
  onToggle
}) => {
  if (!ability) return null;

  const cost = getTierCost(ability.tier);

  const getAbilityTypeBadge = () => {
    if (ability.isPassive) {
      return <span className="px-2.5 py-1 rounded text-xs font-display bg-type-passive text-void">Passive</span>;
    }
    if (ability.isActive) {
      return <span className="px-2.5 py-1 rounded text-xs font-display bg-type-active text-void">Active</span>;
    }
    if (ability.isCantrip) {
      return <span className="px-2.5 py-1 rounded text-xs font-display bg-type-cantrip text-void">Cantrip</span>;
    }
    if (ability.isSpell) {
      return <span className="px-2.5 py-1 rounded text-xs font-display bg-type-spell text-void">{ability.tier} Spell</span>;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto arcane-panel border border-gold-accent p-6 rounded-lg shadow-arcane-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-mist hover:text-parchment hover:bg-charcoal transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="pb-4 mb-4 border-b border-gold-subtle pr-8">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-display uppercase tracking-wider ${path.badgeClass}`}>
              {path.traditionLabel}
            </span>
            <span className="text-xs text-mist font-body">|</span>
            <span className={`text-xs font-display ${path.textColor}`}>{path.name} Path</span>
          </div>

          <h3 className="font-display text-2xl text-ivory tracking-wide mb-2 flex items-center gap-2">
            {ability.name}
            {isSelected && <Sparkles size={18} className="text-gold animate-pulse" />}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            {getAbilityTypeBadge()}

            <div className="flex items-center gap-1.5 text-xs text-parchment bg-charcoal/80 px-2.5 py-1 rounded border border-gold-subtle">
              <span className="text-mist uppercase tracking-wider">Tier:</span>
              <span className="capitalize font-display">{ability.tier}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gold bg-charcoal/80 px-2.5 py-1 rounded border border-gold-subtle">
              <span className="text-mist uppercase tracking-wider">Cost:</span>
              <span className="font-display">{cost} pt{cost > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Metadata (Author / Location / Source) */}
        {(ability.author || ability.location || ability.source) && (
          <div className="flex flex-wrap gap-4 text-xs text-fog mb-4 bg-charcoal/40 p-3 rounded border border-gold-subtle/50">
            {ability.author && (
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-gold-dim" />
                <span className="text-mist">Tradition/Master:</span>
                <span className="text-parchment">{ability.author}</span>
              </div>
            )}
            {ability.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-gold-dim" />
                <span className="text-mist">Origin:</span>
                <span className="text-parchment">{ability.location}</span>
              </div>
            )}
          </div>
        )}

        {/* Ability Full Description */}
        <div className="py-2 text-sm leading-relaxed">
          <AbilityMarkdown content={ability.description} />
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-gold-subtle flex justify-between items-center">
          <button
            onClick={onClose}
            className="arcane-btn text-xs px-4 py-2"
          >
            Close
          </button>

          <button
            onClick={() => {
              if (!isLocked) {
                onToggle();
              }
            }}
            disabled={isLocked}
            className={`
              arcane-btn text-xs px-6 py-2 transition-all duration-200
              ${isLocked
                ? 'opacity-40 cursor-not-allowed'
                : isSelected
                  ? '!border-red-500/50 !text-red-400 hover:!border-red-500'
                  : '!border-gold text-gold-bright hover:!shadow-glow-gold'
              }
            `}
          >
            {isLocked ? 'Prerequisites Needed' : isSelected ? 'Deallocate Ability' : 'Allocate Ability'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CultivationAbilityDetailsModal;
