import type { ReactNode } from 'react';
import { Ability, SpellLevel, Tier, TierId, TIERS, getTierCost } from '../types/essence';
import { isTierUnlocked } from '../utils/cultivationUtils';

/**
 * A normalized view of a talent system. V1 (nine essences) and V2 (cultivation
 * paths) are both adapted into this shape so every layout renders them the same way.
 */
export type SystemVersion = 'v1' | 'v2';

export interface SystemGroup {
  id: string;
  label: string;
  accent: string;
}

export interface SystemPath {
  id: string;
  name: string;
  groupId: string;
  concept?: string;
  description?: string;
  patron?: string;
  accent: string;
  icon: (size?: number, color?: string) => ReactNode;
}

export interface TalentSystem {
  version: SystemVersion;
  name: string;
  tagline: string;
  resourceName: string;
  groups: SystemGroup[];
  paths: SystemPath[];
  abilitiesByPath: Record<string, Ability[]>;
}

export interface PoolStatus {
  current: number;
  max: number;
  reserved: number;
}

export type AbilityStatus = 'learned' | 'available' | 'unaffordable' | 'locked';

export interface TalentController {
  system: TalentSystem;
  level: number;
  setLevel: (level: number) => void;
  selectedIds: string[];
  isLearned: (abilityId: string) => boolean;
  pointsTotal: number;
  pointsSpent: number;
  pointsLeft: number;
  toggle: (ability: Ability, pathId: string) => void;
  statusOf: (ability: Ability, pathId: string) => AbilityStatus;
  lockReason: (ability: Ability, pathId: string) => string | null;
  tierUnlocked: (tierId: TierId, pathId: string) => boolean;
  pool: (pathId: string) => PoolStatus;
  adjustPool: (pathId: string, delta: number) => void;
  spend: (ability: Ability, pathId: string) => void;
  fullRest: () => void;
  emptyPools: () => void;
  reset: () => void;
  undo: () => void;
  canUndo: boolean;
  save: () => void;
  load: (file: File) => void;
  notice: string | null;
  dismissNotice: () => void;
  pathOf: (abilityId: string) => SystemPath | undefined;
  learnedPaths: SystemPath[];
}

export const TIER_IDS: TierId[] = ['initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster'];

const SPELL_BUCKETS: Record<SpellLevel, TierId> = {
  cantrip: 'initiate', '1st': 'initiate', '2nd': 'initiate',
  '3rd': 'adept', '4th': 'adept',
  '5th': 'master', '6th': 'master',
  '7th': 'grandmaster', '8th': 'grandmaster',
  '9th': 'greatgrandmaster'
};

/** The talent tier an ability sits in; spells are bucketed by their level. */
export const tierOf = (ability: Ability): TierId =>
  (TIER_IDS as string[]).includes(ability.tier) ? ability.tier as TierId : SPELL_BUCKETS[ability.tier as SpellLevel] ?? 'initiate';

export const tierInfo = (tierId: TierId): Tier => TIERS.find(t => t.id === tierId)!;

export const costOf = (ability: Ability) => getTierCost(ability.tier);

/** Passives and cantrips permanently reserve essence; actives and spells are paid on use. */
export const reservesEssence = (ability: Ability) => ability.isPassive || ability.isCantrip;

export type AbilityKind = 'passive' | 'active' | 'cantrip' | 'spell';

export const kindOf = (ability: Ability): AbilityKind => {
  if (ability.isPassive) return 'passive';
  if (ability.isActive) return 'active';
  if (ability.isCantrip) return 'cantrip';
  return 'spell';
};

export const KIND_META: Record<AbilityKind, { label: string; color: string }> = {
  passive: { label: 'Passive', color: '#c49a6c' },
  active: { label: 'Active', color: '#4a9eff' },
  cantrip: { label: 'Cantrip', color: '#c084fc' },
  spell: { label: 'Spell', color: '#4ade80' }
};

export const kindLabel = (ability: Ability) =>
  ability.isSpell ? `${ability.tier} Spell` : KIND_META[kindOf(ability)].label;

const SPELL_ORDER = ['cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];

/** Passives, then actives, cantrips and spells by level — matches the classic layout. */
export const abilitySortKey = (ability: Ability) => {
  if (ability.isPassive) return 0;
  if (ability.isActive) return 1;
  if (ability.isCantrip) return 2;
  return 3 + SPELL_ORDER.indexOf(ability.tier);
};

export const sortAbilities = (abilities: Ability[]) =>
  [...abilities].sort((a, b) => abilitySortKey(a) - abilitySortKey(b) || a.name.localeCompare(b.name));

/**
 * Abilities bucketed by tier. Vertical layouts use 'ascending' so the tree grows
 * upward: Great Grandmaster on top, Initiate at the bottom.
 */
export const groupByTier = (abilities: Ability[], direction: 'ascending' | 'left-to-right' = 'left-to-right') => {
  const ids = direction === 'ascending' ? [...TIER_IDS].reverse() : TIER_IDS;
  return ids.map(tierId => ({
    tier: tierInfo(tierId),
    abilities: sortAbilities(abilities.filter(a => tierOf(a) === tierId))
  }));
};

/** Global search: every path with at least one match, in catalog order. */
export const searchAll = (system: TalentSystem, term: string, kind: KindFilter = 'all') =>
  system.paths
    .map(path => ({
      path,
      abilities: sortAbilities((system.abilitiesByPath[path.id] || []).filter(a => matchesSearch(a, term) && matchesKind(a, kind)))
    }))
    .filter(result => result.abilities.length > 0);

/** Paths grouped by their tradition, keeping only non-empty groups. */
export const pathsByGroup = (system: TalentSystem, paths: SystemPath[] = system.paths) =>
  system.groups
    .map(group => ({ group, paths: paths.filter(p => p.groupId === group.id) }))
    .filter(entry => entry.paths.length > 0);

export const isTierOpen = (tierId: TierId, selectedIds: string[], pathAbilities: Ability[], level: number) =>
  isTierUnlocked(tierId, selectedIds, pathAbilities, level);

export const matchesSearch = (ability: Ability, term: string) => {
  const q = term.trim().toLowerCase();
  if (!q) return true;
  return ability.name.toLowerCase().includes(q) || ability.description.toLowerCase().includes(q);
};

export type KindFilter = 'all' | AbilityKind;

export const matchesKind = (ability: Ability, filter: KindFilter) => filter === 'all' || kindOf(ability) === filter;

/** A short plain-text preview of a markdown description. */
export const previewText = (description: string, length = 140) => {
  if (description.trim().startsWith('http')) return 'Standard spell — see the linked reference.';
  const plain = description
    .split('\n\n')[0]
    .replace(/[*_`#>|]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > length ? `${plain.slice(0, length).trimEnd()}…` : plain;
};

/** How many abilities in a path the character has learned. */
export const learnedCount = (ctl: TalentController, pathId: string) =>
  (ctl.system.abilitiesByPath[pathId] || []).filter(a => ctl.isLearned(a.id)).length;

/** Hex colour with alpha, for tinting surfaces with a path accent. */
export const tint = (hex: string, alpha: number) => {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
