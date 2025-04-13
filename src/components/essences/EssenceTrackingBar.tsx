import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { EssencePath } from '../../types/essence';

interface EssenceTrackingBarProps {
  path: EssencePath;
  spent: number;
  available: number;
  max: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const EssenceTrackingBar: React.FC<EssenceTrackingBarProps> = ({
  path,
  spent,
  available,
  max,
  onIncrement,
  onDecrement
}) => {
  // Calculate the width percentages for the bar segments
  const spentPercentage = (spent / max) * 100;
  const availablePercentage = (available / max) * 100;
  const reducedPercentage = 100 - spentPercentage - availablePercentage;

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${path.color}`}></div>
          <span className="font-medium">{path.name} Essence</span>
        </div>
        <div className="text-sm">
          {spent}/{max} ({available} available)
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrement}
          disabled={spent <= 0}
          className={`p-1 rounded ${
            spent <= 0 ? 'bg-gray-700 text-gray-500' : 'bg-red-700 hover:bg-red-600 text-white'
          }`}
        >
          <Minus size={16} />
        </button>

        <div className="flex-1 h-6 bg-gray-700 rounded overflow-hidden">
          {/* Spent essence (active) */}
          {spent > 0 && (
            <div
              className="h-full bg-blue-600 float-left"
              style={{ width: `${spentPercentage}%` }}
            ></div>
          )}
          
          {/* Available essence */}
          {available > 0 && (
            <div
              className="h-full bg-blue-900 float-left"
              style={{ width: `${availablePercentage}%` }}
            ></div>
          )}
          
          {/* Reduced essence (from passives/cantrips) */}
          {reducedPercentage > 0 && (
            <div
              className="h-full bg-gray-800 float-left"
              style={{ width: `${reducedPercentage}%` }}
            ></div>
          )}
        </div>

        <button
          onClick={onIncrement}
          disabled={available <= 0}
          className={`p-1 rounded ${
            available <= 0 ? 'bg-gray-700 text-gray-500' : 'bg-green-700 hover:bg-green-600 text-white'
          }`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default EssenceTrackingBar;
