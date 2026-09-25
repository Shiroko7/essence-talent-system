import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Columns3, Network } from 'lucide-react';
import Layout from '../components/layout/Layout';
import EssenceTalentTree from '../components/essences/EssenceTalentTree';
import CultivationTalentTree from '../components/cultivation/CultivationTalentTree';
import { SystemVersion, TalentController } from './model';
import { useV1Controller, useV2Controller } from './useTalentController';
import { Toast } from './ui';
import ConstellationLayout from './layouts/ConstellationLayout';
import ClassicLayout from './layouts/ClassicLayout';
import {
  DEFAULT_ESSENCE_VARIANT, ESSENCE_VARIANTS, EssenceVariant, EssenceVariantContext, isEssenceVariant
} from './essence/variant';

export interface LayoutProps {
  ctl: TalentController;
}

const DESIGNS = [
  { id: 'classic', label: 'Classic', icon: Columns3, blurb: 'The original structure, reworked: collapsible traditions, All paths, global search' },
  { id: 'constellation', label: 'Constellation', icon: Network, blurb: 'Game board: tiers left to right, essence at the foot of the page' },
] as const;

/** 'legacy' is the untouched original page, kept reachable via ?ui=legacy for reference. */
type DesignId = typeof DESIGNS[number]['id'] | 'legacy';

const STORAGE_KEY = 'talent-ui-design';
const DEFAULT_DESIGN: DesignId = 'classic';

const isDesign = (value: string | null): value is DesignId => value === 'legacy' || DESIGNS.some(d => d.id === value);

const readStoredDesign = (): DesignId => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isDesign(stored) ? stored : DEFAULT_DESIGN;
  } catch {
    return DEFAULT_DESIGN;
  }
};

const useDesign = (): [DesignId, (id: DesignId) => void] => {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get('ui');
  const design = isDesign(fromUrl) ? fromUrl : readStoredDesign();

  const setDesign = (id: DesignId) => {
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* storage unavailable */ }
    const next = new URLSearchParams(params);
    next.set('ui', id);
    setParams(next, { replace: true });
  };

  return [design, setDesign];
};

const ESSENCE_STORAGE_KEY = 'talent-essence-variant';

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

/** Fixed bar for comparing the candidate designs and essence trackers. */
const DesignSwitcher: React.FC<{
  design: DesignId; onChange: (id: DesignId) => void; essence?: EssenceVariant; onEssence?: (id: EssenceVariant) => void;
}> = ({ design, onChange, essence, onEssence }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      const index = Number(e.key);
      if (Number.isInteger(index) && DESIGNS[index]) {
        e.preventDefault();
        onChange(DESIGNS[index].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onChange]);

  const current = DESIGNS.find(d => d.id === design) ?? { blurb: 'The original page, unchanged' };
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-gold-subtle bg-void/95 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-3 h-11 flex items-center gap-3 overflow-x-auto">
        <span className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim whitespace-nowrap hidden md:inline">
          Compare designs
        </span>
        <div className="flex items-center gap-1">
          {DESIGNS.map((d, i) => {
            const Icon = d.icon;
            const active = d.id === design;
            return (
              <button
                key={d.id}
                onClick={() => onChange(d.id)}
                title={`${d.blurb} (Alt+${i})`}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-display text-xs tracking-wide whitespace-nowrap transition-colors ${
                  active ? 'bg-gold/20 text-gold-bright border border-gold/40' : 'text-fog hover:text-parchment border border-transparent'
                }`}
              >
                <Icon size={13} />
                {d.label}
              </button>
            );
          })}
        </div>
        {essence && onEssence && (
          <>
            <span className="w-px h-6 bg-gold-subtle flex-shrink-0" />
            <span className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim whitespace-nowrap">Essence</span>
            <div className="flex items-center gap-1">
              {ESSENCE_VARIANTS.map(v => (
                <button
                  key={v.id}
                  onClick={() => onEssence(v.id)}
                  title={v.blurb}
                  className={`px-2.5 py-1 rounded font-display text-xs tracking-wide whitespace-nowrap transition-colors ${
                    v.id === essence ? 'bg-gold/20 text-gold-bright border border-gold/40' : 'text-fog hover:text-parchment border border-transparent'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </>
        )}
        <span className="ml-auto text-xs text-mist font-body whitespace-nowrap hidden 2xl:inline">
          {essence ? ESSENCE_VARIANTS.find(v => v.id === essence)?.blurb : current.blurb}
        </span>
      </div>
    </div>
  );
};

const renderDesign = (design: DesignId, ctl: TalentController) => {
  switch (design) {
    case 'constellation': return <ConstellationLayout ctl={ctl} />;
    default: return <ClassicLayout ctl={ctl} />;
  }
};

const V1Designs: React.FC<{ design: DesignId }> = ({ design }) => {
  const ctl = useV1Controller();
  return <>{renderDesign(design, ctl)}<Toast ctl={ctl} /></>;
};

const V2Designs: React.FC<{ design: DesignId }> = ({ design }) => {
  const ctl = useV2Controller();
  return <>{renderDesign(design, ctl)}<Toast ctl={ctl} /></>;
};

const TalentPage: React.FC<{ version: SystemVersion }> = ({ version }) => {
  const [design, setDesign] = useDesign();
  const [essence, setEssence] = useEssenceVariant();

  if (design === 'legacy') {
    return (
      <div className="pb-11">
        {version === 'v1' ? <EssenceTalentTree /> : <CultivationTalentTree key="v2" version="v2" />}
        <DesignSwitcher design={design} onChange={setDesign} />
      </div>
    );
  }

  return (
    <Layout>
      <EssenceVariantContext.Provider value={essence}>
        <div className="pb-11">
          {version === 'v1' ? <V1Designs design={design} /> : <V2Designs design={design} />}
        </div>
      </EssenceVariantContext.Provider>
      <DesignSwitcher design={design} onChange={setDesign} essence={essence} onEssence={setEssence} />
    </Layout>
  );
};

export default TalentPage;
