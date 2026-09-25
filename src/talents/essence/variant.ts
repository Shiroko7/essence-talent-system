import { createContext } from 'react';

export const ESSENCE_VARIANTS = [
  { id: 'ledger', label: 'Ledger', blurb: 'Resource table: type exact values, ±1, spend chips' },
  { id: 'vials', label: 'Vials', blurb: 'Liquid gauges on tradition shelves; click the glass to set' },
  { id: 'cast', label: 'Cast log', blurb: 'Tap abilities to spend; every change is logged with undo' },
  { id: 'rings', label: 'Rings', blurb: 'HUD rings; scroll to adjust, select for actions' },
  { id: 'slots', label: 'Slots', blurb: 'Spell-slot boxes you tick off as you spend' },
  { id: 'cards', label: 'Cards', blurb: 'The previous card tracker, for comparison' }
] as const;

export type EssenceVariant = typeof ESSENCE_VARIANTS[number]['id'];

export const isEssenceVariant = (value: string | null): value is EssenceVariant =>
  ESSENCE_VARIANTS.some(v => v.id === value);

export const EssenceVariantContext = createContext<EssenceVariant>('ledger');
