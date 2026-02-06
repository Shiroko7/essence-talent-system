import React from 'react';
import { FILTER_PILLS, FilterType } from '../../types/essence';

interface FilterPillsProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const getFilterColors = (filterId: FilterType, isSelected: boolean) => {
  const baseClasses = 'transition-all duration-200';

  if (!isSelected) {
    return `${baseClasses} bg-charcoal/50 text-mist border-gold-subtle hover:text-parchment hover:border-gold-accent`;
  }

  switch (filterId) {
    case 'active':
      return `${baseClasses} bg-type-active/20 text-type-active border-type-active`;
    case 'passive':
      return `${baseClasses} bg-type-passive/20 text-type-passive border-type-passive`;
    case 'cantrip':
      return `${baseClasses} bg-type-cantrip/20 text-type-cantrip border-type-cantrip`;
    case 'spell':
      return `${baseClasses} bg-type-spell/20 text-type-spell border-type-spell`;
    default:
      return `${baseClasses} bg-gold/20 text-gold border-gold`;
  }
};

const FilterPills: React.FC<FilterPillsProps> = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_PILLS.map((pill) => (
        <button
          key={pill.id}
          className={`
            px-4 py-1.5 rounded border font-display text-xs tracking-wider uppercase
            ${getFilterColors(pill.id, selectedFilter === pill.id)}
          `}
          onClick={() => onFilterChange(pill.id)}
        >
          {pill.label}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;
