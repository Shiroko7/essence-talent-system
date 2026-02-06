import React from 'react';
import { Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind } from 'lucide-react';
import { EssencePath, EssencePathId } from '../../types/essence';

interface EssenceTrackingBarProps {
  path: EssencePath;
  spent: number;
  available: number;
  max: number;
  passiveReduction: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

// Essence color configurations
const ESSENCE_COLORS: Record<EssencePathId, { color: string; glow: string; cssVar: string }> = {
  water: { color: '#4a9eff', glow: 'rgba(74, 158, 255, 0.4)', cssVar: 'var(--essence-water)' },
  fire: { color: '#ff6b4a', glow: 'rgba(255, 107, 74, 0.4)', cssVar: 'var(--essence-fire)' },
  earth: { color: '#c49a6c', glow: 'rgba(196, 154, 108, 0.4)', cssVar: 'var(--essence-earth)' },
  metal: { color: '#a8b4c4', glow: 'rgba(168, 180, 196, 0.4)', cssVar: 'var(--essence-metal)' },
  wood: { color: '#5dba6f', glow: 'rgba(93, 186, 111, 0.4)', cssVar: 'var(--essence-wood)' },
  poison: { color: '#9b4dca', glow: 'rgba(155, 77, 202, 0.4)', cssVar: 'var(--essence-poison)' },
  acid: { color: '#a8e04a', glow: 'rgba(168, 224, 74, 0.4)', cssVar: 'var(--essence-acid)' },
  lightning: { color: '#c084fc', glow: 'rgba(192, 132, 252, 0.4)', cssVar: 'var(--essence-lightning)' },
  wind: { color: '#7dd3fc', glow: 'rgba(125, 211, 252, 0.4)', cssVar: 'var(--essence-wind)' },
};

const EssenceTrackingBar: React.FC<EssenceTrackingBarProps> = ({
  path,
  spent,
  available,
  max,
  passiveReduction,
  onIncrement,
  onDecrement
}) => {
  const getEssenceIcon = (id: EssencePathId) => {
    const iconProps = { size: 20, style: { color: ESSENCE_COLORS[id].color } };
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

  const essenceColor = ESSENCE_COLORS[path.id];
  const usedPercentage = (spent / max) * 100;
  const reducedPercentage = (passiveReduction / max) * 100;

  return (
    <div className="arcane-card p-5 transition-all duration-200 hover:border-gold-accent">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Essence Icon with glow */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center relative"
            style={{
              backgroundColor: `${essenceColor.color}15`,
              boxShadow: `0 0 20px ${essenceColor.glow}`
            }}
          >
            {getEssenceIcon(path.id)}
            <div
              className="absolute inset-0 rounded-lg animate-essence-pulse"
              style={{ boxShadow: `inset 0 0 15px ${essenceColor.glow}` }}
            />
          </div>

          <div>
            <h3 className="font-display text-base tracking-wide text-ivory">{path.name}</h3>
            <p className="text-xs text-mist font-body">Active Essence</p>
          </div>
        </div>

        {/* Stats and Controls */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <span
                className="text-2xl font-display font-semibold"
                style={{ color: essenceColor.color }}
              >
                {spent}
              </span>
              <span className="text-fog">/</span>
              <span className="text-lg text-parchment">{available}</span>
            </div>
            {passiveReduction > 0 && (
              <span className="text-xs text-essence-fire">
                -{passiveReduction} from passives
              </span>
            )}
          </div>

          {/* Increment/Decrement Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onDecrement}
              disabled={spent === 0}
              className="w-8 h-8 rounded border border-gold-subtle text-fog
                hover:border-essence-fire hover:text-essence-fire hover:shadow-glow-fire
                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gold-subtle disabled:hover:text-fog disabled:hover:shadow-none
                transition-all duration-200 flex items-center justify-center font-display text-lg"
            >
              -
            </button>
            <button
              onClick={onIncrement}
              disabled={spent >= available}
              className="w-8 h-8 rounded border border-gold-subtle text-fog
                hover:border-essence-wood hover:text-essence-wood hover:shadow-glow-wood
                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gold-subtle disabled:hover:text-fog disabled:hover:shadow-none
                transition-all duration-200 flex items-center justify-center font-display text-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-charcoal rounded-sm overflow-hidden border border-gold-subtle/50">
        {/* Reduced portion (darker, on the right) */}
        {passiveReduction > 0 && (
          <div
            className="absolute right-0 top-0 h-full bg-void/80"
            style={{ width: `${reducedPercentage}%` }}
          >
            {/* Diagonal stripes pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 3px,
                  rgba(255, 107, 74, 0.3) 3px,
                  rgba(255, 107, 74, 0.3) 6px
                )`
              }}
            />
          </div>
        )}

        {/* Active/Used portion (colored) */}
        {spent > 0 && (
          <div
            className="absolute left-0 top-0 h-full transition-all duration-300 ease-out"
            style={{
              width: `${usedPercentage}%`,
              backgroundColor: essenceColor.color,
              boxShadow: `0 0 10px ${essenceColor.glow}`
            }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}

        {/* Segment markers */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: max - 1 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-void/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EssenceTrackingBar;
