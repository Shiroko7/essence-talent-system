import { Ability } from '../../types/essence';
import { SystemPath, TalentSystem, TIER_IDS, tierInfo } from '../../talents/model';

/* Finding abilities by name, so patch notes can show their tier and full text. */

const RANKS = [...TIER_IDS, 'cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];
const normalize = (name: string) => name.toLowerCase().replace(/[’‘]/g, "'");

export interface Found { ability: Ability; path: SystemPath }

/** Finds abilities by name, preferring the given path, so the notes can show tiers and full text. */
export const makeLookup = (system: TalentSystem) => {
  const index = new Map<string, Found>();
  const any = new Map<string, Found>();
  for (const path of system.paths) {
    for (const ability of system.abilitiesByPath[path.id] || []) {
      index.set(`${path.id}|${normalize(ability.name)}`, { ability, path });
      if (!any.has(normalize(ability.name))) any.set(normalize(ability.name), { ability, path });
    }
  }
  return (pathId: string, name: string) => index.get(`${pathId}|${normalize(name)}`) ?? any.get(normalize(name));
};

export const rankLabel = (ability: Ability) => {
  if (ability.tier === 'cantrip') return 'Cantrip';
  if (ability.isSpell) return ability.tier;
  return tierInfo(ability.tier as never)?.name ?? ability.tier;
};

export const byRank = (lookup: ReturnType<typeof makeLookup>, pathId: string) => (a: string, b: string) =>
  RANKS.indexOf(lookup(pathId, a)?.ability.tier ?? '') - RANKS.indexOf(lookup(pathId, b)?.ability.tier ?? '');
