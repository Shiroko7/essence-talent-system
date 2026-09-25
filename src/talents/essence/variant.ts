import { createContext } from 'react';

export const ESSENCE_VARIANTS = [
  { id: 'vials', label: 'Vials', blurb: 'Liquid gauges on tradition shelves; click the glass to set' },
  { id: 'cast', label: 'Cast log', blurb: 'Tap abilities to spend; every change is logged with undo' },
  { id: 'rings', label: 'Rings', blurb: 'HUD rings; scroll to adjust, select for actions' }
] as const;

export type EssenceVariant = typeof ESSENCE_VARIANTS[number]['id'];

export const DEFAULT_ESSENCE_VARIANT: EssenceVariant = 'vials';

export const isEssenceVariant = (value: string | null): value is EssenceVariant =>
  ESSENCE_VARIANTS.some(v => v.id === value);

export const EssenceVariantContext = createContext<EssenceVariant>(DEFAULT_ESSENCE_VARIANT);
