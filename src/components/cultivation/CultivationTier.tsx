import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Ability, Tier } from '../../types/essence';
import { CultivationPath } from '../../types/cultivation';
import CultivationAbilityCard from './CultivationAbilityCard';

interface CultivationTierProps {
  tier: Tier;
  path: CultivationPath;
  abilities: Ability[];
  isUnlocked: boolean;
  selectedAbilities: string[];
  onToggleAbility: (ability: Ability) => void;
  onShowDetails: (ability: Ability) => void;
}

const CultivationTier: React.FC<CultivationTierProps> = ({
  tier,
  path,
  abilities,
  isUnlocked,
  selectedAbilities,
  onToggleAbility,
  onShowDetails
}) => {
  if (abilities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Tier Header */}
      <div className="flex items-center justify-between py-2 border-b border-gold-subtle/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-base tracking-wide text-ivory">
              {tier.name}
            </span>
            <span className="text-xs text-mist font-body">
              (Levels {tier.levels})
            </span>
          </div>

          <span className="px-2 py-0.5 rounded text-[11px] font-display bg-charcoal text-gold border border-gold-subtle">
            {tier.pointCost} pt{tier.pointCost > 1 ? 's' : ''} each
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-display">
              <Unlock size={14} /> Unlocked
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-fog font-display">
              <Lock size={14} /> Requires Lvl {tier.levelRequirement} & Prior Tier
            </span>
          )}
        </div>
      </div>

      {/* Ability Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {abilities.map(ability => (
          <CultivationAbilityCard
            key={ability.id}
            ability={ability}
            path={path}
            isSelected={selectedAbilities.includes(ability.id)}
            isLocked={!isUnlocked}
            onToggle={() => onToggleAbility(ability)}
            onShowDetails={() => onShowDetails(ability)}
          />
        ))}
      </div>
    </div>
  );
};

export default CultivationTier;
