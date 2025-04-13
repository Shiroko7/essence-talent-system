import React from 'react';
import { FilterPill, FILTER_PILLS } from '../../types/essence';

interface FilterPillsProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterPills: React.FC<FilterPillsProps> = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {FILTER_PILLS.map((pill) => (
        <button
          key={pill.id}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedFilter === pill.id
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => onFilterChange(pill.id)}
        >
          {pill.label}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;
