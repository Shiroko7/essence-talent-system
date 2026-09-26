import { createContext, useContext } from 'react';
import { CircleGauge, LayoutGrid } from 'lucide-react';

export const ESSENCE_VARIANTS = [
  { id: 'cast', label: 'Cast', icon: LayoutGrid, blurb: 'Path cards; tap an ability to spend its cost' },
  { id: 'rings', label: 'Rings', icon: CircleGauge, blurb: 'One column per path: a ring gauge over its abilities' }
] as const;

export type EssenceVariant = typeof ESSENCE_VARIANTS[number]['id'];

export const DEFAULT_ESSENCE_VARIANT: EssenceVariant = 'cast';

export const isEssenceVariant = (value: string | null): value is EssenceVariant =>
  ESSENCE_VARIANTS.some(v => v.id === value);

export const EssenceVariantContext = createContext<EssenceVariant>(DEFAULT_ESSENCE_VARIANT);

/** Lets the page header switch trackers; absent outside the Essence page. */
export const EssenceVariantControl = createContext<{ variant: EssenceVariant; setVariant: (id: EssenceVariant) => void } | null>(null);

export const useEssenceVariantControl = () => useContext(EssenceVariantControl);
