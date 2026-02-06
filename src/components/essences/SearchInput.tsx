import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search abilities..."
}) => {
  return (
<div className="relative w-full group">
    {/* Search icon */}
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <Search size={16} className="text-mist group-focus-within:text-gold transition-colors" />
    </div>

    {/* Input - pl-10 ensures the text starts after the icon */}
    <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="arcane-input w-full pl-12 pr-10 py-2 text-sm"
        placeholder={placeholder}
    />

    {/* Clear button */}
    {searchTerm && (
        <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-mist hover:text-parchment transition-colors z-10"
            aria-label="Clear search"
        >
            <X size={16} />
        </button>
    )}
</div>
  );
};

export default SearchInput;
