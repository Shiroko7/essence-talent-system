import { createContext, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Columns3, Network } from 'lucide-react';

export const DESIGNS = [
  { id: 'classic', label: 'Classic', icon: Columns3, blurb: 'Path list with tiers stacked from the bottom up' },
  { id: 'constellation', label: 'Constellation', icon: Network, blurb: 'Game board with tiers running left to right' }
] as const;

/** 'legacy' is the untouched original page, kept reachable via ?ui=legacy for reference. */
export type DesignId = typeof DESIGNS[number]['id'] | 'legacy';

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

/** The talent page design, from ?ui= or the last one picked in this browser. */
export const useDesign = (): [DesignId, (id: DesignId) => void] => {
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

export const DesignContext = createContext<{ design: DesignId; setDesign: (id: DesignId) => void } | null>(null);

export const useDesignContext = () => useContext(DesignContext);
