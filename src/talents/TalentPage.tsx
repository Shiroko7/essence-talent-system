import React, { ReactNode, useEffect } from 'react';
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
import EssencePage from './pages/EssencePage';
import SheetPage from './pages/SheetPage';
import { TalentPageId } from './routes';
import {
  DEFAULT_HEADER_VARIANT, HEADER_VARIANTS, HeaderVariant, HeaderVariantContext, isHeaderVariant
} from './header/variant';
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

/** A compared option kept in the URL (so links share it) and remembered in the browser. */
const useStoredParam = <T extends string>(
  param: string, storageKey: string, isValid: (v: string | null) => v is T, fallback: T
): [T, (id: T) => void] => {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get(param);
  let stored: string | null = null;
  try { stored = localStorage.getItem(storageKey); } catch { /* storage unavailable */ }
  const value = isValid(fromUrl) ? fromUrl : isValid(stored) ? stored : fallback;

  const setValue = (id: T) => {
    try { localStorage.setItem(storageKey, id); } catch { /* storage unavailable */ }
    const next = new URLSearchParams(params);
    next.set(param, id);
    setParams(next, { replace: true });
  };

  return [value, setValue];
};

const useEssenceVariant = () =>
  useStoredParam<EssenceVariant>('essence', 'talent-essence-variant', isEssenceVariant, DEFAULT_ESSENCE_VARIANT);

const useHeader = () =>
  useStoredParam<HeaderVariant>('header', 'talent-header-variant', isHeaderVariant, DEFAULT_HEADER_VARIANT);

interface SwitchGroup<T extends string> {
  label: string;
  value: T;
  options: readonly { id: T; label: string; blurb: string; icon?: typeof Columns3 }[];
  onChange: (id: T) => void;
}

const Group = <T extends string>({ group, first }: { group: SwitchGroup<T>; first: boolean }) => (
  <>
    {!first && <span className="w-px h-6 bg-gold-subtle flex-shrink-0" />}
    <span className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim whitespace-nowrap">{group.label}</span>
    <div className="flex items-center gap-1">
      {group.options.map(o => {
        const Icon = o.icon;
        return (
          <button
            key={o.id}
            onClick={() => group.onChange(o.id)}
            title={o.blurb}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-display text-xs tracking-wide whitespace-nowrap transition-colors ${
              o.id === group.value ? 'bg-gold/20 text-gold-bright border border-gold/40' : 'text-fog hover:text-parchment border border-transparent'
            }`}
          >
            {Icon && <Icon size={13} />}
            {o.label}
          </button>
        );
      })}
    </div>
  </>
);

/** Fixed bar at the foot of the page for comparing designs, trackers and headers. */
const DesignSwitcher: React.FC<{
  design?: DesignId; onDesign?: (id: DesignId) => void;
  essence?: EssenceVariant; onEssence?: (id: EssenceVariant) => void;
  header?: HeaderVariant; onHeader?: (id: HeaderVariant) => void;
}> = ({ design, onDesign, essence, onEssence, header, onHeader }) => {
  useEffect(() => {
    if (!onDesign) return;
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      const index = Number(e.key);
      if (Number.isInteger(index) && DESIGNS[index]) {
        e.preventDefault();
        onDesign(DESIGNS[index].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDesign]);

  const groups = [
    design && onDesign && <Group<DesignId> key="design" first group={{ label: 'Design', value: design, options: DESIGNS, onChange: onDesign }} />,
    essence && onEssence && <Group key="essence" first={!design} group={{ label: 'Essence', value: essence, options: ESSENCE_VARIANTS, onChange: onEssence }} />,
    header && onHeader && <Group key="header" first={!design && !essence} group={{ label: 'Header', value: header, options: HEADER_VARIANTS, onChange: onHeader }} />
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-gold-subtle bg-void/95 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-3 h-11 flex items-center gap-3 overflow-x-auto">
        {groups}
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
 * A character's three pages: pick talents, track essence, and read the full
 * sheet. Each page loads the same saved character for its version.
 */
const TalentPage: React.FC<{ version: SystemVersion; page?: TalentPageId }> = ({ version, page = 'talents' }) => {
  const [design, setDesign] = useDesign();
  const [essence, setEssence] = useEssenceVariant();
  const [header, setHeader] = useHeader();

  if (page === 'talents' && design === 'legacy') {
    return (
      <div className="pb-11">
        {version === 'v1' ? <EssenceTalentTree /> : <CultivationTalentTree key="v2" version="v2" />}
        <DesignSwitcher design={design} onDesign={setDesign} />
      </div>
    );
  }

  const render: Render = ctl => {
    if (page === 'essence') return <EssencePage ctl={ctl} />;
    if (page === 'sheet') return <SheetPage ctl={ctl} />;
    return renderDesign(design, ctl);
  };

  return (
    <Layout>
      <HeaderVariantContext.Provider value={header}>
        <EssenceVariantContext.Provider value={essence}>
          {/* Room for the switcher bar, and for the character dock above it */}
          <div className={header === 'dock' ? 'pb-28' : 'pb-11'}>
            <WithCharacter version={version} render={render} />
          </div>
        </EssenceVariantContext.Provider>
      </HeaderVariantContext.Provider>
      <DesignSwitcher
        {...(page === 'talents' && { design, onDesign: setDesign })}
        {...(page === 'essence' && { essence, onEssence: setEssence })}
        header={header}
        onHeader={setHeader}
      />
    </Layout>
  );
};

export default TalentPage;
