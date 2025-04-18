import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Ability, getTierCost } from '../../types/essence';

interface EssenceErrorDialogProps {
  ability: Ability;
  currentPoints: number;
  totalPoints: number;
  onClose: () => void;
}

const EssenceErrorDialog: React.FC<EssenceErrorDialogProps> = ({
  ability,
  currentPoints,
  totalPoints,
  onClose
}) => {
  const requiredPoints = getTierCost(ability.tier);
  const pointsNeeded = requiredPoints + currentPoints - totalPoints;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div 
        className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside dialog from closing it
      >
        <div className="flex items-start mb-4">
          <div className="mr-3 text-red-500">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Insufficient Essence Points</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="text-gray-300 mb-6 pl-9">
          <p className="mb-4">
            You don't have enough essence points to select <strong>{ability.name}</strong>.
          </p>
          
          <div className="bg-gray-700 p-3 rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <span>Required points:</span>
              <span className="font-medium">{requiredPoints}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Current spent:</span>
              <span className="font-medium">{currentPoints}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total available:</span>
              <span className="font-medium">{totalPoints}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-600">
              <span>You need:</span>
              <span className="font-medium text-red-400">{pointsNeeded} more points</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default EssenceErrorDialog;
