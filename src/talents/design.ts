import { createContext, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Columns3, Network } from 'lucide-react';
import type { SystemVersion } from './model';

export const DESIGNS = [
  { id: 'classic', label: 'Classic', icon: Columns3, blurb: 'Path list with tiers stacked from the bottom up' },
  { id: 'constellation', label: 'Constellation', icon: Network, blurb: 'Game board with tiers running left to right' }
] as const;

/** 'legacy' is the untouched original page, kept reachable via ?ui=legacy for reference. */
export type DesignId = typeof DESIGNS[number]['id'] | 'legacy';

/** V1 opens in Classic, V2 on the Constellation board; each remembers its own choice. */
const DEFAULT_DESIGN: Record<SystemVersion, DesignId> = { v1: 'classic', v2: 'constellation' };
const storageKey = (version: SystemVersion) => `talent-ui-design-${version}`;

const isDesign = (value: string | null): value is DesignId => value === 'legacy' || DESIGNS.some(d => d.id === value);

const readStoredDesign = (version: SystemVersion): DesignId => {
  try {
    const stored = localStorage.getItem(storageKey(version));
    return isDesign(stored) ? stored : DEFAULT_DESIGN[version];
  } catch {
    return DEFAULT_DESIGN[version];
  }
};

/** The talent page design, from ?ui= or the last one picked for this version in this browser. */
export const useDesign = (version: SystemVersion): [DesignId, (id: DesignId) => void] => {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get('ui');
  const design = isDesign(fromUrl) ? fromUrl : readStoredDesign(version);

  const setDesign = (id: DesignId) => {
    try { localStorage.setItem(storageKey(version), id); } catch { /* storage unavailable */ }
    const next = new URLSearchParams(params);
    next.set('ui', id);
    setParams(next, { replace: true });
  };

  return [design, setDesign];
};

export const DesignContext = createContext<{ design: DesignId; setDesign: (id: DesignId) => void } | null>(null);

export const useDesignContext = () => useContext(DesignContext);
