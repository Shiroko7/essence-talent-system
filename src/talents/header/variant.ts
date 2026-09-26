import { createContext, useContext } from 'react';

export const HEADER_VARIANTS = [
  { id: 'tiers', label: 'Two tiers', blurb: 'Navigation on top, the character bar below it' },
  { id: 'card', label: 'Tabs + card', blurb: 'A tab strip; level, points and Character in a card inside the page' },
  { id: 'dock', label: 'Dock', blurb: 'A slim title; level, points and Character pinned to the bottom' }
] as const;

export type HeaderVariant = typeof HEADER_VARIANTS[number]['id'];

export const DEFAULT_HEADER_VARIANT: HeaderVariant = 'tiers';

export const isHeaderVariant = (value: string | null): value is HeaderVariant =>
  HEADER_VARIANTS.some(v => v.id === value);

export const HeaderVariantContext = createContext<HeaderVariant>(DEFAULT_HEADER_VARIANT);

export const useHeaderVariant = () => useContext(HeaderVariantContext);
