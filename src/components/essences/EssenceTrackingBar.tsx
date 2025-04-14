import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { EssencePath } from '../../types/essence';

interface EssenceTrackingBarProps {
  path: EssencePath;
  spent: number;
  available: number;
  max: number; 
  passiveReduction: number;
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
  // Calculate the total capacity - this is the sum of all segments 
  // (spent + available + reduced)
  const totalCapacity = max + passiveReduction;
  
  // Calculate the width percentages for the bar segments
  // In the inverted logic, we want to show available first, then spent
  const availablePercentage = (available / totalCapacity) * 100;
  const spentPercentage = (spent / totalCapacity) * 100;
  const reducedPercentage = (passiveReduction / totalCapacity) * 100;

  return (
    <div className="w-full mb-3">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${path.color}`}></div>
          <span className="font-medium">{path.name} Essence</span>
        </div>
        <div className="text-sm">
          Available: {available}/{max}
          {passiveReduction > 0 && ` (-${passiveReduction} reduced)`}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onIncrement}
          disabled={available <= 0}
          className={`p-1 rounded ${
            available <= 0 ? 'bg-gray-700 text-gray-500' : 'bg-red-700 hover:bg-red-600 text-white'
          }`}
          aria-label="Decrease essence points"
        >
          <Minus size={16} />
        </button>

        <div className="flex-1 h-8 bg-gray-700 rounded overflow-hidden">
          {/* Visualization of the bar with all three states in the inverted order */}
          <div className="flex h-full w-full">
            {/* Available essence (unused) - shown as bright blue */}
            {available > 0 && (
              <div
                className="h-full bg-blue-600"
                style={{ width: `${availablePercentage}%` }}
                role="progressbar"
                aria-valuenow={available}
                aria-valuemin={0}
                aria-valuemax={totalCapacity}
              ></div>
            )}
            
            {/* Spent essence (active) - shown as dark blue */}
            {spent > 0 && (
              <div
                className="h-full bg-blue-900"
                style={{ width: `${spentPercentage}%` }}
              ></div>
            )}
            
            {/* Reduced essence (from passives/cantrips) - shown as dark gray */}
            {passiveReduction > 0 && (
              <div
                className="h-full bg-gray-800"
                style={{ width: `${reducedPercentage}%` }}
              ></div>
            )}
          </div>
        </div>

        <button
          onClick={onDecrement}
          disabled={spent <= 0}
          className={`p-1 rounded ${
            spent <= 0 ? 'bg-gray-700 text-gray-500' : 'bg-green-700 hover:bg-green-600 text-white'
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
