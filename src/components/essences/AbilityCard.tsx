import React, { useState } from 'react';
import { Ability, EssencePath, getTierCost } from '../../types/essence';

interface AbilityCardProps {
  ability: Ability;
  path: EssencePath;
  isSelected: boolean;
  isLocked: boolean;
  onToggle: () => void;
}

const AbilityCard: React.FC<AbilityCardProps> = ({
  ability,
  path,
  isSelected,
  isLocked,
  onToggle
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const cost = getTierCost(ability.tier);
  
  // Determine the type of ability for the badge
  let typeLabel = '';
  let typeBgColor = '';
  
  if (ability.isPassive) {
    typeLabel = 'Passive';
    typeBgColor = 'bg-yellow-800 text-yellow-200';
  } else if (ability.isActive) {
    typeLabel = 'Active';
    typeBgColor = 'bg-blue-800 text-blue-200';
  } else if (ability.isCantrip) {
    typeLabel = 'Cantrip';
    typeBgColor = 'bg-purple-800 text-purple-200';
  } else if (ability.isSpell) {
    typeLabel = `${ability.tier} Spell`;
    typeBgColor = 'bg-green-800 text-green-200';
  }

  return (
    <div 
      className={`
        relative border rounded p-3 cursor-pointer transition-all duration-150
        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isSelected 
          ? `border-${path.color.split('-')[1]}-500 bg-gray-700` 
          : 'border-gray-600 hover:bg-gray-700'}
        ${ability.isPassive || ability.isCantrip ? 'border-l-4' : ''}
      `}
      onClick={() => !isLocked && onToggle()}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="text-sm font-medium">{ability.name}</div>
      
      {/* Type indicator */}
      <div className="absolute top-1 right-1">
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${typeBgColor}`}>
          {typeLabel}
        </span>
      </div>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-10 bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 border border-gray-600 rounded shadow-lg">
          <h4 className="font-bold">{ability.name}</h4>
          <p className="text-sm text-gray-300 mt-1">{ability.description}</p>
          <div className="mt-2 flex justify-between text-xs">
            <span>Tier: {ability.tier}</span>
            <span>
              {ability.isPassive || ability.isCantrip
                ? `Reduces max essence by ${cost}`
                : `Costs ${cost} essence to use`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbilityCard;
