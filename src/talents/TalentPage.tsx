import React, { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import EssenceTalentTree from '../components/essences/EssenceTalentTree';
import CultivationTalentTree from '../components/cultivation/CultivationTalentTree';
import { SystemVersion, TalentController } from './model';
import { useV1Controller, useV2Controller } from './useTalentController';
import { Toast } from './ui';
import ConstellationLayout from './layouts/ConstellationLayout';
import ClassicLayout from './layouts/ClassicLayout';
import EssencePage from './pages/EssencePage';
import SheetPage from './pages/SheetPage';
import { TalentPageId } from './routes';
import { DesignContext, DesignId, useDesign } from './design';
import {
  DEFAULT_ESSENCE_VARIANT, ESSENCE_VARIANTS, EssenceVariant, EssenceVariantContext, isEssenceVariant
} from './essence/variant';

export interface LayoutProps {
  ctl: TalentController;
}

const ESSENCE_STORAGE_KEY = 'talent-essence-variant';

/** The essence tracker being compared, from ?essence= or the last one picked. */
const useEssenceVariant = (): [EssenceVariant, (id: EssenceVariant) => void] => {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get('essence');
  let stored: string | null = null;
  try { stored = localStorage.getItem(ESSENCE_STORAGE_KEY); } catch { /* storage unavailable */ }
  const variant = isEssenceVariant(fromUrl) ? fromUrl : isEssenceVariant(stored) ? stored : DEFAULT_ESSENCE_VARIANT;

  const setVariant = (id: EssenceVariant) => {
    try { localStorage.setItem(ESSENCE_STORAGE_KEY, id); } catch { /* storage unavailable */ }
    const next = new URLSearchParams(params);
    next.set('essence', id);
    setParams(next, { replace: true });
  };

  return [variant, setVariant];
};

/** Fixed bar at the foot of the Essence page for comparing trackers. */
const EssenceSwitcher: React.FC<{ value: EssenceVariant; onChange: (id: EssenceVariant) => void }> = ({ value, onChange }) => (
  <div className="fixed bottom-0 inset-x-0 z-40 border-t border-gold-subtle bg-void/95 backdrop-blur-md">
    <div className="max-w-[1600px] mx-auto px-3 h-11 flex items-center gap-3 overflow-x-auto">
      <span className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim whitespace-nowrap">Essence</span>
      <div className="flex items-center gap-1">
        {ESSENCE_VARIANTS.map(v => (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            title={v.blurb}
            className={`px-2.5 py-1 rounded font-display text-xs tracking-wide whitespace-nowrap transition-colors ${
              v.id === value ? 'bg-gold/20 text-gold-bright border border-gold/40' : 'text-fog hover:text-parchment border border-transparent'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const renderDesign = (design: DesignId, ctl: TalentController) => {
  switch (design) {
    case 'constellation': return <ConstellationLayout ctl={ctl} />;
    default: return <ClassicLayout ctl={ctl} />;
  }
};

type Render = (ctl: TalentController) => ReactNode;

const V1: React.FC<{ render: Render }> = ({ render }) => {
  const ctl = useV1Controller();
  return <>{render(ctl)}<Toast ctl={ctl} /></>;
};

const V2: React.FC<{ render: Render }> = ({ render }) => {
  const ctl = useV2Controller();
  return <>{render(ctl)}<Toast ctl={ctl} /></>;
};

const WithCharacter: React.FC<{ version: SystemVersion; render: Render }> = ({ version, render }) =>
  version === 'v1' ? <V1 render={render} /> : <V2 render={render} />;

/**
 * A character's three pages: pick talents, track essence, and read the
 * summary. Each page loads the same saved character for its version.
 */
const TalentPage: React.FC<{ version: SystemVersion; page?: TalentPageId }> = ({ version, page = 'talents' }) => {
  const [design, setDesign] = useDesign();
  const [essence, setEssence] = useEssenceVariant();

  if (page === 'talents' && design === 'legacy') {
    return version === 'v1' ? <EssenceTalentTree /> : <CultivationTalentTree key="v2" version="v2" />;
  }

  const render: Render = ctl => {
    if (page === 'essence') return <EssencePage ctl={ctl} />;
    if (page === 'sheet') return <SheetPage ctl={ctl} />;
    return renderDesign(design, ctl);
  };

  return (
    <Layout>
      <DesignContext.Provider value={{ design, setDesign }}>
        <EssenceVariantContext.Provider value={essence}>
          {/* Room for the character dock, and on the Essence page the switcher bar below it */}
          <div className={page === 'essence' ? 'pb-28' : 'pb-16'}>
            <WithCharacter version={version} render={render} />
          </div>
        </EssenceVariantContext.Provider>
      </DesignContext.Provider>
      {page === 'essence' && <EssenceSwitcher value={essence} onChange={setEssence} />}
    </Layout>
  );
};

export default TalentPage;
