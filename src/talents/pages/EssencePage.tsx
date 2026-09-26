import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TalentController } from '../model';
import { pagePath } from '../routes';
import EssenceTracker from '../essence/EssenceTracker';
import { CharacterCard, PageHeader } from '../header/PageHeader';

/** The play surface: every essence pool and learned ability, ready at the table. */
const EssencePage: React.FC<{ ctl: TalentController }> = ({ ctl }) => {
  const navigate = useNavigate();
  const openPath = (pathId: string) => navigate(`${pagePath(ctl.system.version, 'talents')}?path=${pathId}`);

  return (
    <div className="max-w-[1600px] mx-auto space-y-5">
      <PageHeader ctl={ctl} page="essence" />
      <section className="arcane-panel p-4 md:p-5">
        <CharacterCard ctl={ctl} layout="row" className="pb-4 mb-4 border-b border-gold-subtle" />
        <EssenceTracker ctl={ctl} onOpenPath={openPath} />
      </section>
    </div>
  );
};

export default EssencePage;
