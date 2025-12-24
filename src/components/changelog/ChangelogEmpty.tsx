import React from 'react';
import { SearchX } from 'lucide-react';

const ChangelogEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX className="w-16 h-16 mb-4 text-gray-400" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Changes Found</h3>
      <p className="text-gray-500 max-w-md">
        No changelog entries match your current filters. Try adjusting your filters or search term.
      </p>
    </div>
  );
};

export default ChangelogEmpty;
