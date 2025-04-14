import React from 'react';
import { Info } from 'lucide-react';

interface EssenceLegendProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const EssenceLegend: React.FC<EssenceLegendProps> = ({ isOpen = false, onToggle }) => {
  if (!isOpen) {
    return (
      <button 
        onClick={onToggle}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200"
      >
        <Info size={14} />
        <span>Show Legend</span>
      </button>
    );
  }

  return (
    <div className="rounded bg-gray-700 p-3 text-sm">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">Essence Bar Legend</h4>
        <button 
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-200"
        >
          Close
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 bg-blue-600"></div>
          <span>Spent essence (active abilities currently using essence)</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 bg-blue-900"></div>
          <span>Available essence (can be spent on active abilities)</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 bg-gray-800"></div>
          <span>Reduced essence (from passive abilities and cantrips)</span>
        </div>
      </div>
      
      <div className="mt-3 text-gray-400 italic">
        Example: A bar showing "─────■■■" means you have some spent essence (blue),
        some available essence (dark blue), and some essence reduction from passives (gray).
      </div>
    </div>
  );
};

export default EssenceLegend;
