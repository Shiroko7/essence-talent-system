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

// Map essence IDs to hex colors for glow effects
const getEssenceColorHex = (id: EssencePathId): { color: string; glowColor: string } => {
  switch (id) {
    case 'water':
      return { color: '#3b82f6', glowColor: 'rgba(59, 130, 246, 0.4)' };
    case 'fire':
      return { color: '#ef4444', glowColor: 'rgba(239, 68, 68, 0.4)' };
    case 'earth':
      return { color: '#ca8a04', glowColor: 'rgba(202, 138, 4, 0.4)' };
    case 'metal':
      return { color: '#6b7280', glowColor: 'rgba(107, 114, 128, 0.4)' };
    case 'wood':
      return { color: '#15803d', glowColor: 'rgba(21, 128, 61, 0.4)' };
    case 'poison':
      return { color: '#581c87', glowColor: 'rgba(88, 28, 135, 0.4)' };
    case 'acid':
      return { color: '#84cc16', glowColor: 'rgba(132, 204, 22, 0.4)' };
    case 'lightning':
      return { color: '#a855f7', glowColor: 'rgba(168, 85, 247, 0.4)' };
    case 'wind':
      return { color: '#0ea5e9', glowColor: 'rgba(14, 165, 233, 0.4)' };
    default:
      return { color: '#6b7280', glowColor: 'rgba(107, 114, 128, 0.4)' };
  }
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
    const iconProps = { size: 20, style: { color: getEssenceColorHex(id).color } };
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

  const { color, glowColor } = getEssenceColorHex(path.id);
  const currentUsed = spent;

  // Calculate percentages for the bar
  const usedPercentage = (currentUsed / max) * 100;
  const reducedPercentage = (passiveReduction / max) * 100;

  return (
    <div className="bg-gray-800/50 backdrop-blur rounded-lg p-5 border border-gray-700/50 hover:border-gray-600/50 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: `${color}20`,
              boxShadow: `0 0 20px ${glowColor}`
            }}
          >
            {getEssenceIcon(path.id)}
          </div>
          <h3 className="text-lg font-semibold text-white">{path.name} Essence</h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-2xl font-bold text-white">
              {currentUsed}/{available}
            </span>
            {passiveReduction > 0 && (
              <span className="ml-2 text-sm text-red-400 font-medium">
                (-{passiveReduction} reduced)
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onDecrement}
              disabled={currentUsed === 0}
              className="w-8 h-8 rounded-full border-2 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30 disabled:hover:border-gray-600 disabled:hover:text-gray-300 disabled:hover:bg-transparent transition-all flex items-center justify-center font-bold text-lg"
            >
              −
            </button>
            <button
              onClick={onIncrement}
              disabled={currentUsed >= available}
              className="w-8 h-8 rounded-full border-2 border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400 hover:bg-green-500/10 disabled:opacity-30 disabled:hover:border-gray-600 disabled:hover:text-gray-300 disabled:hover:bg-transparent transition-all flex items-center justify-center font-bold text-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
        {/* Reduced portion (darker, on the right) */}
        {passiveReduction > 0 && (
          <div
            className="absolute right-0 top-0 h-full bg-gray-900/80 border-l-2 border-red-900/50"
            style={{
              width: `${reducedPercentage}%`,
            }}
          />
        )}

        {/* Active/Used portion (colored) */}
        {currentUsed > 0 && (
          <div
            className="absolute left-0 top-0 h-full transition-all duration-300 ease-out rounded-full"
            style={{
              width: `${usedPercentage}%`,
              backgroundColor: color,
              boxShadow: `0 0 15px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.2)`
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
              className="flex-1 border-r border-gray-900/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EssenceTrackingBar;
