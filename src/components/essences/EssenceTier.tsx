import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
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
    <div className={`p-4 rounded-lg relative border ${isUnlocked ? 'border-gray-600' : 'border-gray-700 opacity-70'}`}>
      <div className="flex justify-between mb-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          {tier.name} 
          <span className="text-sm font-normal text-gray-400">
            (Levels {tier.levels})
          </span>
        </h3>
        <div className="text-sm">
          Cost: <span className="font-medium">{tier.pointCost} essence {tier.pointCost === 1 ? 'point' : 'points'}</span>
        </div>
      </div>
      
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center z-10">
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded">
            <AlertCircle size={18} />
            <span>Unlock previous tier first</span>
          </div>
        </div>
      )}
      
      {/* Updated grid layout with fewer columns and more space */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="col-span-full text-gray-500 text-center py-4">
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
