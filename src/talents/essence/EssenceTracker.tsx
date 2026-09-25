import React, { useContext, useState } from 'react';
import { Ability } from '../../types/essence';
import { AbilityModal, EmptyState } from '../ui';
import { TrackerProps } from './shared';
import CastTracker from './CastTracker';
import RingsTracker from './RingsTracker';
import { EssenceVariantContext } from './variant';

/** Renders whichever essence tracker is selected, plus the shared details window. */
const EssenceTracker: React.FC<Omit<TrackerProps, 'onInfo'>> = props => {
  const variant = useContext(EssenceVariantContext);
  const [detail, setDetail] = useState<Ability | null>(null);

  if (!props.ctl.learnedPaths.length) {
    return <EmptyState title="No essence to track yet">Learn an ability and its path's pool appears here.</EmptyState>;
  }

  const trackerProps: TrackerProps = { ...props, onInfo: setDetail };
  const tracker = (() => {
    switch (variant) {
      case 'rings': return <RingsTracker {...trackerProps} />;
      default: return <CastTracker {...trackerProps} />;
    }
  })();

  return (
    <>
      {tracker}
      <AbilityModal ctl={props.ctl} ability={detail} onClose={() => setDetail(null)} />
    </>
  );
};

export default EssenceTracker;
