import React from 'react';
import { X, Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind } from 'lucide-react';
import { Ability, EssencePath, EssencePathId, getTierCost } from '../../types/essence';

interface AbilityDetailsProps {
  ability: Ability;
  path: EssencePath;
  onClose: () => void;
  isSelected: boolean;
  isLocked: boolean;
  onToggle: () => void;
}

const ESSENCE_ICON_COLORS: Record<EssencePathId, string> = {
  water: '#4a9eff',
  fire: '#ff6b4a',
  earth: '#c49a6c',
  metal: '#a8b4c4',
  wood: '#5dba6f',
  poison: '#9b4dca',
  acid: '#a8e04a',
  lightning: '#c084fc',
  wind: '#7dd3fc',
};

import AbilityMarkdown from './AbilityMarkdown';

const AbilityDetails: React.FC<AbilityDetailsProps> = ({
  ability,
  path,
  onClose,
  isSelected,
  isLocked,
  onToggle
}) => {
  const getEssenceIcon = (id: EssencePathId) => {
    const iconProps = { size: 16, style: { color: ESSENCE_ICON_COLORS[id] } };
    switch (id) {
      case 'water': return <Droplet {...iconProps} />;
      case 'fire': return <Flame {...iconProps} />;
      case 'earth': return <Mountain {...iconProps} />;
      case 'metal': return <Sword {...iconProps} />;
      case 'wood': return <TreeDeciduous {...iconProps} />;
      case 'poison': return <Skull {...iconProps} />;
      case 'acid': return <FlaskConical {...iconProps} />;
      case 'lightning': return <Zap {...iconProps} />;
      case 'wind': return <Wind {...iconProps} />;
      default: return null;
    }
  };

  const cost = getTierCost(ability.tier);

  let abilityType = '';
  let typeColorClass = '';

  if (ability.isPassive) {
    abilityType = 'Passive Ability';
    typeColorClass = 'text-type-passive';
  } else if (ability.isActive) {
    abilityType = 'Active Ability';
    typeColorClass = 'text-type-active';
  } else if (ability.isCantrip) {
    abilityType = 'Cantrip Spell';
    typeColorClass = 'text-type-cantrip';
  } else if (ability.isSpell) {
    abilityType = `${ability.tier} Level Spell`;
    typeColorClass = 'text-type-spell';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="arcane-panel max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate p-5 border-b border-gold-subtle flex justify-between items-center">
          <div>
            <h2 className="font-display text-xl tracking-wide text-ivory">{ability.name}</h2>
            {(ability.author || ability.location) && (
              <div className="text-xs text-gold/85 mt-1 font-body flex items-center gap-1.5">
                {ability.author && <span className="font-medium">{ability.author}</span>}
                {ability.author && ability.location && <span className="text-mist/50">•</span>}
                {ability.location && <span className="text-mist">{ability.location}</span>}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-mist hover:text-parchment hover:bg-charcoal rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* Meta info */}
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${path.color} flex items-center justify-center ${path.glowClass}`}>
                {getEssenceIcon(path.id)}
              </div>
              <span className={`font-display text-sm tracking-wide ${path.textColor}`}>
                {path.name} Path
              </span>
            </div>

            <span className={`font-display text-sm tracking-wider ${typeColorClass}`}>
              {abilityType}
            </span>
          </div>

          {/* Description */}
          <div className="arcane-card p-5 mb-5">
            <h3 className="font-display text-sm tracking-wider text-gold mb-3">Description</h3>
            <AbilityMarkdown content={ability.description} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="arcane-card p-4">
              <h3 className="font-display text-xs tracking-wider text-mist mb-1">Tier</h3>
              <div className="font-display text-sm text-ivory">
                {ability.tier.toString().charAt(0).toUpperCase() + ability.tier.toString().slice(1)}
              </div>
            </div>

            <div className="arcane-card p-4">
              <h3 className="font-display text-xs tracking-wider text-mist mb-1">Essence Cost</h3>
              <div className="font-body text-sm">
                {ability.isPassive || ability.isCantrip
                  ? <span className="text-essence-fire">Reduces max by {cost}</span>
                  : <span className="text-essence-water">Costs {cost} to use</span>
                }
              </div>
            </div>
          </div>

          {/* Origin / Source */}
          {(ability.author || ability.location) && (
            <div className={`grid ${ability.author && ability.location ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mb-5`}>
              {ability.author && (
                <div className="arcane-card p-4">
                  <h3 className="font-display text-xs tracking-wider text-gold mb-1">Source / Author</h3>
                  <div className="font-display text-sm text-ivory">
                    {ability.author}
                  </div>
                </div>
              )}
              {ability.location && (
                <div className="arcane-card p-4">
                  <h3 className="font-display text-xs tracking-wider text-mist mb-1">Origin / Location</h3>
                  <div className="font-display text-sm text-ivory">
                    {ability.location}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          {!isLocked && (
            <div className="flex justify-end">
              <button
                onClick={onToggle}
                className={`
                  arcane-btn-primary px-5 py-2.5 font-display text-sm tracking-wider
                  ${isSelected
                    ? '!text-essence-fire !border-essence-fire hover:!shadow-glow-fire'
                    : '!text-essence-water !border-essence-water hover:!shadow-glow-water'
                  }
                `}
              >
                {isSelected ? 'Remove Ability' : 'Select Ability'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbilityDetails;
