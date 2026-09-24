import React from 'react';
import { CultivationPath } from '../../types/cultivation';
import { getCultivationPathIcon } from './CultivationIcon';

interface CultivationTrackingBarProps {
  path: CultivationPath;
  spent: number;
  available: number;
  max: number;
  passiveReduction: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CultivationTrackingBar: React.FC<CultivationTrackingBarProps> = ({
  path,
  spent,
  available,
  max,
  passiveReduction,
  onIncrement,
  onDecrement
}) => {
  const accent = path.accentColor;
  const usedPercentage = max > 0 ? (spent / max) * 100 : 0;
  const reducedPercentage = max > 0 ? (passiveReduction / max) * 100 : 0;

  return (
    <div className="arcane-card p-4 transition-all duration-200 hover:border-gold-accent">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center relative"
            style={{
              backgroundColor: `${accent}15`,
              boxShadow: `0 0 20px ${accent}40`
            }}
          >
            {getCultivationPathIcon(path.id, accent, 20)}
            <div
              className="absolute inset-0 rounded-lg animate-essence-pulse"
              style={{ boxShadow: `inset 0 0 15px ${accent}40` }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm tracking-wide text-ivory">{path.name}</h3>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-display uppercase tracking-wider ${path.badgeClass}`}>
                {path.tradition}
              </span>
            </div>
            <p className="text-xs text-mist font-body">{path.concept}</p>
          </div>
        </div>

        {/* Stats and Controls */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <span
                className="text-xl font-display font-semibold"
                style={{ color: accent }}
              >
                {spent}
              </span>
              <span className="text-fog">/</span>
              <span className="text-base text-parchment">{available}</span>
            </div>
            {passiveReduction > 0 && (
              <span className="text-[11px] text-amber-400">
                -{passiveReduction} from passives
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onDecrement}
              disabled={spent <= 0}
              className={`
                w-8 h-8 rounded flex items-center justify-center font-display text-base
                transition-all duration-200 border
                ${spent <= 0
                  ? 'border-gold-subtle text-mist cursor-not-allowed opacity-40 bg-charcoal/50'
                  : 'border-gold-subtle text-parchment hover:text-gold hover:border-gold hover:bg-charcoal'
                }
              `}
              aria-label={`Decrease active essence for ${path.name}`}
            >
              -
            </button>
            <button
              onClick={onIncrement}
              disabled={spent >= available}
              className={`
                w-8 h-8 rounded flex items-center justify-center font-display text-base
                transition-all duration-200 border
                ${spent >= available
                  ? 'border-gold-subtle text-mist cursor-not-allowed opacity-40 bg-charcoal/50'
                  : 'border-gold-subtle text-parchment hover:text-gold hover:border-gold hover:bg-charcoal'
                }
              `}
              aria-label={`Increase active essence for ${path.name}`}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-charcoal rounded-full overflow-hidden border border-gold-subtle/40">
        {/* Spent active essence */}
        <div
          className="absolute left-0 top-0 bottom-0 transition-all duration-300 rounded-full"
          style={{
            width: `${usedPercentage}%`,
            backgroundColor: accent,
            boxShadow: `0 0 10px ${accent}60`
          }}
        />

        {/* Passive capacity reduction (from right) */}
        {passiveReduction > 0 && (
          <div
            className="absolute right-0 top-0 bottom-0 bg-red-950/60 border-l border-red-500/40 transition-all duration-300"
            style={{ width: `${reducedPercentage}%` }}
          />
        )}
      </div>

      {/* Footer info */}
      <div className="flex justify-between items-center mt-2 text-[11px] text-mist font-body">
        <span>Active Essence: {spent} of {available} allocated</span>
        {passiveReduction > 0 && <span>Capacity reduction: -{passiveReduction} pts</span>}
      </div>
    </div>
  );
};

export default CultivationTrackingBar;
