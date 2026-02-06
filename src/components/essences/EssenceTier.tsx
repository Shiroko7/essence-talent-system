import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Ability, EssencePath, Tier } from '../../types/essence';
import AbilityCard from './AbilityCard';
import AbilityDetails from './AbilityDetails';

interface EssenceTierProps {
  tier: Tier;
  path: EssencePath;
  abilities: Ability[];
  isUnlocked: boolean;
  selectedAbilities: string[];
  onToggleAbility: (ability: Ability) => void;
}

const EssenceTier: React.FC<EssenceTierProps> = ({
  tier,
  path,
  abilities,
  isUnlocked,
  selectedAbilities,
  onToggleAbility
}) => {
  const [selectedAbilityForDetails, setSelectedAbilityForDetails] = useState<Ability | null>(null);

  const handleShowDetails = (ability: Ability) => {
    setSelectedAbilityForDetails(ability);
  };

  return (
    <div className={`
      arcane-panel p-5 relative
      ${isUnlocked ? '' : 'opacity-60'}
    `}>
      {/* Tier Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gold-subtle">
        <div>
          <h3 className="font-display text-base tracking-wide text-ivory flex items-center gap-2">
            {tier.name}
            <span className="text-xs font-body text-mist font-normal">
              (Levels {tier.levels})
            </span>
          </h3>
        </div>
        <div className="font-display text-xs tracking-wider text-gold">
          {tier.pointCost} {tier.pointCost === 1 ? 'Point' : 'Points'}
        </div>
      </div>

      {/* Lock Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-void/60 backdrop-blur-[2px] rounded-md flex items-center justify-center z-10">
          <div className="arcane-card px-4 py-2 flex items-center gap-2">
            <Lock size={16} className="text-gold" />
            <span className="font-display text-sm tracking-wide text-fog">
              Unlock previous tier first
            </span>
          </div>
        </div>
      )}

      {/* Abilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {abilities.length > 0 ? (
          abilities.map((ability) => (
            <AbilityCard
              key={ability.id}
              ability={ability}
              path={path}
              isSelected={selectedAbilities.includes(ability.id)}
              isLocked={!isUnlocked}
              onToggle={() => onToggleAbility(ability)}
              onShowDetails={() => handleShowDetails(ability)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-6 text-mist font-body italic">
            No abilities available for this tier
          </div>
        )}
      </div>

      {/* Ability Details Modal */}
      {selectedAbilityForDetails && (
        <AbilityDetails
          ability={selectedAbilityForDetails}
          path={path}
          isSelected={selectedAbilities.includes(selectedAbilityForDetails.id)}
          isLocked={!isUnlocked}
          onToggle={() => {
            onToggleAbility(selectedAbilityForDetails);
          }}
          onClose={() => setSelectedAbilityForDetails(null)}
        />
      )}
    </div>
  );
};

export default EssenceTier;
