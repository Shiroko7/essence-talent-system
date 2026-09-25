import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TalentController } from '../model';
import { pagePath } from '../routes';
import EssenceTracker from '../essence/EssenceTracker';
import { CharacterMenu, LevelStepper, PageTitle } from '../ui';

/** The play surface: every essence pool and learned ability, ready at the table. */
const EssencePage: React.FC<{ ctl: TalentController }> = ({ ctl }) => {
  const navigate = useNavigate();
  const openPath = (pathId: string) => navigate(`${pagePath(ctl.system.version, 'talents')}?path=${pathId}`);

  return (
    <div className="max-w-[1600px] mx-auto space-y-5">
      <div className="arcane-panel p-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <PageTitle ctl={ctl} page="essence" className="mr-auto" />
        <LevelStepper ctl={ctl} />
        <CharacterMenu ctl={ctl} />
      </div>
      <section className="arcane-panel p-4 md:p-5">
        <EssenceTracker ctl={ctl} onOpenPath={openPath} />
      </section>
    </div>
  );
};

export default EssencePage;
