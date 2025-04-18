import React from 'react';
import { X } from 'lucide-react';
import { Ability, EssencePath, getTierCost } from '../../types/essence';

interface AbilityDetailsProps {
  ability: Ability;
  path: EssencePath;
  onClose: () => void;
  isSelected: boolean;
  isLocked: boolean;
  onToggle: () => void;
}

// Helper function to format description text
const formatDescription = (description: string): React.ReactNode => {
  // Check if it's a URL (for spells)
  if (description.startsWith('http')) {
    return (
      <div className="text-left">
        <p className="mb-2">This ability references an external spell. For detailed information:</p>
        <a 
          href={description} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-300 underline"
        >
          View spell details
        </a>
      </div>
    );
  }
  
  // Format normal text descriptions with proper paragraphs
  // Split by sentences and create logical paragraphs
  const sentences = description.split(/(?<=[.!?])\s+/g);
  const paragraphs: string[] = [];
  let currentParagraph = '';
  
  sentences.forEach((sentence, index) => {
    currentParagraph += sentence + (index < sentences.length - 1 ? ' ' : '');
    
    // Create paragraphs after roughly 150 characters or at explicit line breaks
    if (currentParagraph.length > 150 || sentence.includes('\n') || index === sentences.length - 1) {
      paragraphs.push(currentParagraph.trim());
      currentParagraph = '';
    }
  });
  
  return paragraphs.map((paragraph, index) => (
    <p key={index} className={index > 0 ? "mt-2 text-left" : "text-left"}>
      {paragraph}
    </p>
  ));
};

const AbilityDetails: React.FC<AbilityDetailsProps> = ({
  ability,
  path,
  onClose,
  isSelected,
  isLocked,
  onToggle
}) => {
  const cost = getTierCost(ability.tier);
  
  let abilityType = '';
  let typeColor = '';
  
  if (ability.isPassive) {
    abilityType = 'Passive Ability';
    typeColor = 'text-yellow-300';
  } else if (ability.isActive) {
    abilityType = 'Active Ability';
    typeColor = 'text-blue-300';
  } else if (ability.isCantrip) {
    abilityType = 'Cantrip Spell';
    typeColor = 'text-purple-300';
  } else if (ability.isSpell) {
    abilityType = `${ability.tier} Level Spell`;
    typeColor = 'text-green-300';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div className="bg-gray-800 border border-gray-600 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-600 flex justify-between items-center">
          <h2 className="text-xl font-bold">{ability.name}</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${path.color} mr-2`}></div>
              <span>{path.name} Path</span>
            </div>
            
            <div className={`${typeColor} font-medium`}>
              {abilityType}
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <div className="text-gray-300 leading-relaxed">
              {formatDescription(ability.description)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-sm font-medium mb-1">Tier</h3>
              <div className="text-gray-300">
                {ability.tier.toString().charAt(0).toUpperCase() + ability.tier.toString().slice(1)}
              </div>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-sm font-medium mb-1">Essence Cost</h3>
              <div className="text-gray-300">
                {ability.isPassive || ability.isCantrip
                  ? `Reduces max essence by ${cost}`
                  : `Costs ${cost} essence to use`}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            {!isLocked && (
              <button
                onClick={onToggle}
                className={`
                  px-4 py-2 rounded font-medium
                  ${isSelected
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-blue-600 hover:bg-blue-500'
                  }
                `}
              >
                {isSelected ? 'Remove Ability' : 'Select Ability'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbilityDetails;
