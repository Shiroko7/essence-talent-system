import React from 'react';
import { ScrollText } from 'lucide-react';

const ChangelogEmpty: React.FC = () => {
  return (
    <div className="arcane-panel p-12 flex flex-col items-center justify-center text-center">
      <ScrollText className="w-16 h-16 mb-4 text-mist/30" />
      <h3 className="font-display text-xl tracking-wide text-ivory mb-2">No Changes Found</h3>
      <p className="text-fog font-body max-w-md leading-relaxed">
        No chronicle entries match your current filters. Try adjusting your search or clearing some filters.
      </p>
    </div>
  );
};

export default ChangelogEmpty;
