import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Ability, EssencePath, getTierCost } from '../../types/essence';

interface AbilityCardProps {
  ability: Ability;
  path: EssencePath;
  isSelected: boolean;
  isLocked: boolean;
  onToggle: () => void;
  onShowDetails: () => void;
}

// Helper function to format description text
const formatDescription = (description: string): React.ReactNode => {
  // Check if it's a URL (for spells)
  if (description.startsWith('http')) {
    return (
        <></>
    );
  }
  
  // Get a shortened preview (first 120 chars)
  const preview = description.length > 120 
    ? description.substring(0, 120) + '...' 
    : description;
    
  return <p>{preview}</p>;
};

const AbilityCard: React.FC<AbilityCardProps> = ({
  ability,
  path,
  isSelected,
  isLocked,
  onToggle,
  onShowDetails
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
        relative border rounded h-16 p-5 transition-all duration-150 flex flex-col
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
      <div className="absolute top-2 right-2">
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${typeBgColor}`}>
          {typeLabel}
        </span>
      </div>
      
      {/* Info icon for details */}
      <button 
        className="absolute bottom-2 right-2 text-gray-400 hover:text-white"
        onClick={(e) => {
          e.stopPropagation(); // Prevent toggling the ability
          onShowDetails();
        }}
        aria-label="Show ability details"
      >
        <Info size={16} />
      </button>
      
      {/* Enhanced Tooltip */}
      {showTooltip && (
        <div className="absolute z-10 bottom-full left-0 mb-2 w-72 p-3 bg-gray-900 border border-gray-600 rounded shadow-lg">
          <h4 className="font-bold text-sm">{ability.name}</h4>
          <div className="text-xs text-gray-300 mt-1 leading-relaxed max-h-48 overflow-y-auto">
            {formatDescription(ability.description)}
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-400">
            <span>Tier: {ability.tier}</span>
            <span>
              {ability.isPassive || ability.isCantrip
                ? `Reduces max essence by ${cost}`
                : `Costs ${cost} essence to use`}
            </span>
          </div>
          <div className="mt-2 text-xs text-blue-300 text-center italic">
            Click the info icon for full details
          </div>
        </div>
      )}
    </div>
  );
};

export default AbilityCard;
