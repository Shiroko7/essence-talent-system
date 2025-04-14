import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { EssencePath } from '../../types/essence';

interface EssenceTrackingBarProps {
  path: EssencePath;
  spent: number;
  available: number;
  max: number; 
  passiveReduction: number; // Added to track passive/cantrip reductions
  onIncrement: () => void;
  onDecrement: () => void;
}

const EssenceTrackingBar: React.FC<EssenceTrackingBarProps> = ({
  path,
  spent,
  available,
  max,
  passiveReduction,
  onIncrement,
  onDecrement
}) => {
  // Calculate the width percentages for the bar segments
  const totalCapacity = max + passiveReduction; // Total width of the bar (100%)
  const spentPercentage = (spent / totalCapacity) * 100;
  const availablePercentage = (available / totalCapacity) * 100;
  const reducedPercentage = (passiveReduction / totalCapacity) * 100;
  
  return (
    <div className="w-full mb-3">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${path.color}`}></div>
          <span className="font-medium">{path.name} Essence</span>
        </div>
        <div className="text-sm">
          {spent}/{max + available} ({available} available)
          {passiveReduction > 0 && ` (-${passiveReduction} reduced)`}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrement}
          disabled={spent <= 0}
          className={`p-1 rounded ${
            spent <= 0 ? 'bg-gray-700 text-gray-500' : 'bg-red-700 hover:bg-red-600 text-white'
          }`}
          aria-label="Decrease essence points"
        >
          <Minus size={16} />
        </button>

        <div className="flex-1 h-8 bg-gray-700 rounded overflow-hidden">
          {/* Visualization of the bar with all states */}
          <div className="flex h-full w-full">
            {/* Spent essence (active) - shown as solid blue */}
            {spent > 0 && (
              <div
                className="h-full bg-blue-600"
                style={{ width: `${spentPercentage}%` }}
                role="progressbar"
                aria-valuenow={spent}
                aria-valuemin={0}
                aria-valuemax={totalCapacity}
              ></div>
            )}
            
            {/* Available essence - shown as dark blue */}
            {available > 0 && (
              <div
                className="h-full bg-blue-900"
                style={{ width: `${availablePercentage}%` }}
              ></div>
            )}
            
            {/* Reduced essence (from passives/cantrips) - shown as lighter gray */}
            {passiveReduction > 0 && (
              <div
                className="h-full bg-gray-800"
                style={{ width: `${reducedPercentage}%` }}
              ></div>
            )}
          </div>
        </div>

        <button
          onClick={onIncrement}
          disabled={available <= 0}
          className={`p-1 rounded ${
            available <= 0 ? 'bg-gray-700 text-gray-500' : 'bg-green-700 hover:bg-green-600 text-white'
          }`}
          aria-label="Increase essence points"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default EssenceTrackingBar;
