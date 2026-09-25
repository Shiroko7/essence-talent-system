import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Columns3, LayoutGrid, Network, ScrollText, Table2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import EssenceTalentTree from '../components/essences/EssenceTalentTree';
import CultivationTalentTree from '../components/cultivation/CultivationTalentTree';
import { SystemVersion, TalentController } from './model';
import { useV1Controller, useV2Controller } from './useTalentController';
import { Toast } from './ui';
import GrimoireLayout from './layouts/GrimoireLayout';
import ConstellationLayout from './layouts/ConstellationLayout';
import SheetLayout from './layouts/SheetLayout';
import CompendiumLayout from './layouts/CompendiumLayout';
import AtlasLayout from './layouts/AtlasLayout';
import ClassicLayout from './layouts/ClassicLayout';

export interface LayoutProps {
  ctl: TalentController;
}

const DESIGNS = [
  { id: 'classic', label: 'Classic', icon: Columns3, blurb: 'The original structure, reworked: collapsible traditions, All paths, global search' },
  { id: 'grimoire', label: 'Grimoire', icon: BookOpen, blurb: 'Three-pane reader with a build summary; essence on its own tab' },
  { id: 'constellation', label: 'Constellation', icon: Network, blurb: 'Game board: tiers left to right, essence at the foot of the page' },
  { id: 'sheet', label: 'Sheet', icon: ScrollText, blurb: 'Character-sheet companion: Play and Build modes' },
  { id: 'compendium', label: 'Compendium', icon: Table2, blurb: 'Reference grouped by path with tier ladders, or one sortable table' },
  { id: 'atlas', label: 'Atlas', icon: LayoutGrid, blurb: 'Reading first: full-text cards, tier ladder, hand tab' }
] as const;

/** 'legacy' is the untouched original page, kept reachable via ?ui=legacy for reference. */
type DesignId = typeof DESIGNS[number]['id'] | 'legacy';

const STORAGE_KEY = 'talent-ui-design';
const DEFAULT_DESIGN: DesignId = 'grimoire';

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

/** Fixed bar for comparing the candidate designs side by side. */
const DesignSwitcher: React.FC<{ design: DesignId; onChange: (id: DesignId) => void }> = ({ design, onChange }) => {
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
        <span className="ml-auto text-xs text-mist font-body whitespace-nowrap hidden lg:inline">{current.blurb}</span>
      </div>
    </div>
  );
};

const renderDesign = (design: DesignId, ctl: TalentController) => {
  switch (design) {
    case 'constellation': return <ConstellationLayout ctl={ctl} />;
    case 'sheet': return <SheetLayout ctl={ctl} />;
    case 'compendium': return <CompendiumLayout ctl={ctl} />;
    case 'atlas': return <AtlasLayout ctl={ctl} />;
    case 'classic': return <ClassicLayout ctl={ctl} />;
    default: return <GrimoireLayout ctl={ctl} />;
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
      <div className="pb-11">
        {version === 'v1' ? <V1Designs design={design} /> : <V2Designs design={design} />}
      </div>
      <DesignSwitcher design={design} onChange={setDesign} />
    </Layout>
  );
};

export default TalentPage;
