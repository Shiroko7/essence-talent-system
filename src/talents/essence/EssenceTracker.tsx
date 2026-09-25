import React, { useContext } from 'react';
import { EmptyState, EssenceBoard } from '../ui';
import { TrackerProps } from './shared';
import LedgerTracker from './LedgerTracker';
import VialsTracker from './VialsTracker';
import CastLogTracker from './CastLogTracker';
import RingsTracker from './RingsTracker';
import SlotsTracker from './SlotsTracker';
import { EssenceVariantContext } from './variant';

/** Renders whichever essence tracker is selected in the compare bar. */
const EssenceTracker: React.FC<TrackerProps> = props => {
  const variant = useContext(EssenceVariantContext);
  if (!props.ctl.learnedPaths.length) {
    return <EmptyState title="No essence to track yet">Learn an ability and its path's pool appears here.</EmptyState>;
  }
  switch (variant) {
    case 'vials': return <VialsTracker {...props} />;
    case 'cast': return <CastLogTracker {...props} />;
    case 'rings': return <RingsTracker {...props} />;
    case 'slots': return <SlotsTracker {...props} />;
    case 'cards': return <EssenceBoard {...props} />;
    default: return <LedgerTracker {...props} />;
  }
};

export default EssenceTracker;
