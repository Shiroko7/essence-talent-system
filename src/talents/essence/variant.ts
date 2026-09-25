import { createContext } from 'react';

export const ESSENCE_VARIANTS = [
  { id: 'cast', label: 'Cast', blurb: 'Path cards; tap an ability to spend its cost' },
  { id: 'rings', label: 'Rings', blurb: 'One column per path: a ring gauge over its abilities' }
] as const;

export type EssenceVariant = typeof ESSENCE_VARIANTS[number]['id'];

export const DEFAULT_ESSENCE_VARIANT: EssenceVariant = 'cast';

export const isEssenceVariant = (value: string | null): value is EssenceVariant =>
  ESSENCE_VARIANTS.some(v => v.id === value);

export const EssenceVariantContext = createContext<EssenceVariant>(DEFAULT_ESSENCE_VARIANT);
