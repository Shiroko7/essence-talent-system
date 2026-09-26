import { AlertTriangle, Info, XOctagon } from 'lucide-react';
import { Ability, SpellLevel, TierId, calculateEssencePoints, getTierCost } from '../types/essence';
import { isTierUnlocked, toV2Id } from '../utils/cultivationUtils';
import { SystemPath, TalentSystem, TIER_IDS, costOf, kindOf, KIND_META, tierInfo, tierOf } from './model';
import { buildV1System, buildV2System } from './systems';
import { STORAGE_KEY_CULTIVATION, backUpCultivationSave } from '../hooks/useCultivationAllocation';

/**
 * Carrying a V1 (elemental essences) character into V2 (cultivation paths).
 *
 * Most abilities kept their ID and only changed path or tier. Those re-keyed
 * under a new ID (mostly spells that moved path) are listed in RENAMED_V1_IDS;
 * anything whose ID is in neither catalog counts as removed.
 */

/** Where a V1 character came from; kept so the guide can be reread later. */
export interface MigrationSource {
  level: number;
  selectedAbilities: string[];
  origin: 'browser' | 'file';
  importedAt: string;
  dismissed?: boolean;
}

export type MigrationFate = 'kept' | 'moved' | 'merged' | 'removed' | 'blocked';

export interface MigrationEntry {
  v1: Ability;
  v1Path: SystemPath;
  v2?: Ability;
  v2Path?: SystemPath;
  fate: MigrationFate;
  /** Adjusted in V2: different tier or spell level, or a different kind (passive ↔ active). */
  tierChanged: boolean;
  kindChanged: boolean;
  /** The other V1 ability that already carries this one's V2 counterpart. */
  mergedWith?: { ability: Ability; path: SystemPath };
  /** Why a carried-over ability could not stay learned. */
  blocked?: { kind: 'level'; requirement: number } | { kind: 'prerequisite'; missing: TierId[] };
}

export type Severity = 'error' | 'warning' | 'info' | 'ok';

export interface MigrationPlan {
  level: number;
  entries: MigrationEntry[];
  /** The V2 build: every carried-over ability whose prerequisites still hold. */
  selectedAbilities: string[];
  activeEssenceByPath: Record<string, number>;
  pointsSpent: number;
  pointsTotal: number;
}

export const V1_STORAGE_KEY = 'essence-talent-system-character';
const SOURCE_STORAGE_KEY = 'talent-v1-migration-source';

const readJson = <T,>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  } catch {
    return null;
  }
};

/** The V1 character saved in this browser, if it has any abilities. */
export const readV1Save = (): Pick<MigrationSource, 'level' | 'selectedAbilities'> | null => {
  const saved = readJson<{ level?: number; selectedAbilities?: unknown }>(V1_STORAGE_KEY);
  if (!saved || !Array.isArray(saved.selectedAbilities) || saved.selectedAbilities.length === 0) return null;
  return { level: typeof saved.level === 'number' ? saved.level : 1, selectedAbilities: saved.selectedAbilities as string[] };
};

export const readMigrationSource = () => readJson<MigrationSource>(SOURCE_STORAGE_KEY);

export const writeMigrationSource = (source: MigrationSource) => {
  try { localStorage.setItem(SOURCE_STORAGE_KEY, JSON.stringify(source)); } catch { /* storage unavailable */ }
};

/** The V1 character the guide explains: the last one imported, else the V1 save in this browser. */
export const currentMigration = (v2: TalentSystem) => {
  const source = readMigrationSource();
  const v1Save = readV1Save();
  const origin = source ?? v1Save;
  return { source, v1Save, plan: origin && planV1Migration(origin, v2) };
};

let v1System: TalentSystem | null = null;
/** The V1 catalog, built once: the guide and banner read it on every V2 page. */
export const getV1System = () => (v1System ??= buildV1System());

const indexSystem = (system: TalentSystem) => {
  const byId = new Map<string, { ability: Ability; path: SystemPath }>();
  for (const path of system.paths) {
    for (const ability of system.abilitiesByPath[path.id] || []) byId.set(ability.id, { ability, path });
  }
  return byId;
};

/** Map a V1 character onto the V2 catalog and explain what happened to each ability. */
export function planV1Migration(
  source: Pick<MigrationSource, 'level' | 'selectedAbilities'>,
  v2: TalentSystem,
  v1: TalentSystem = getV1System()
): MigrationPlan {
  const oldIndex = indexSystem(v1);
  const newIndex = indexSystem(v2);
  const level = source.level;

  const oldSelected = [...new Set(source.selectedAbilities)]
    .map(id => oldIndex.get(id))
    .filter((hit): hit is NonNullable<typeof hit> => !!hit);


  const firstClaim = new Map<string, { ability: Ability; path: SystemPath }>();
  const entries: MigrationEntry[] = oldSelected.map(({ ability, path }) => {
    const hit = newIndex.get(toV2Id(ability.id));
    const base = { v1: ability, v1Path: path, tierChanged: false, kindChanged: false };
    if (!hit) return { ...base, fate: 'removed' };

    const entry: MigrationEntry = {
      ...base,
      v2: hit.ability,
      v2Path: hit.path,
      fate: hit.path.id === path.id ? 'kept' : 'moved',
      tierChanged: hit.ability.tier !== ability.tier,
      kindChanged: kindOf(hit.ability) !== kindOf(ability)
    };
    const claimedBy = firstClaim.get(hit.ability.id);
    if (claimedBy) return { ...entry, fate: 'merged', mergedWith: claimedBy };
    firstClaim.set(hit.ability.id, { ability, path });
    return entry;
  });

  // Drop anything whose tier no longer opens, repeating until the build is stable
  // because losing one ability can close the next tier up.
  const learned = new Set(entries.filter(e => e.fate === 'kept' || e.fate === 'moved').map(e => e.v2!.id));
  for (let changed = true; changed;) {
    changed = false;
    for (const entry of entries) {
      if (!entry.v2 || !learned.has(entry.v2.id)) continue;
      const pathAbilities = v2.abilitiesByPath[entry.v2Path!.id] || [];
      if (isTierUnlocked(entry.v2.tier, [...learned], pathAbilities, level)) continue;
      learned.delete(entry.v2.id);
      entry.fate = 'blocked';
      changed = true;
    }
  }

  // Explain each block against the final build.
  for (const entry of entries) {
    if (entry.fate !== 'blocked') continue;
    const tierId = tierOf(entry.v2!);
    const requirement = tierInfo(tierId).levelRequirement;
    if (level < requirement) {
      entry.blocked = { kind: 'level', requirement };
      continue;
    }
    const pathAbilities = v2.abilitiesByPath[entry.v2Path!.id] || [];
    const missing = TIER_IDS.slice(0, TIER_IDS.indexOf(tierId))
      .filter(lower => !pathAbilities.some(a => learned.has(a.id) && tierOf(a) === lower));
    entry.blocked = { kind: 'prerequisite', missing };
  }

  const selectedAbilities = [...learned];
  const activeEssenceByPath: Record<string, number> = Object.fromEntries(v2.paths.map(p => [p.id, 0]));
  let pointsSpent = 0;
  for (const entry of entries) {
    if (!entry.v2 || !learned.has(entry.v2.id) || entry.fate === 'merged') continue;
    const cost = getTierCost(entry.v2.tier);
    pointsSpent += cost;
    if (entry.v2.isActive || entry.v2.isSpell) activeEssenceByPath[entry.v2Path!.id] += cost;
  }

  return { level, entries, selectedAbilities, activeEssenceByPath, pointsSpent, pointsTotal: calculateEssencePoints(level) };
}

/**
 * From the V1 page: overwrite the V2 save with this V1 character (backing up the
 * old V2 build) so V2 opens with it learned on the new paths.
 */
export const moveV1ToV2 = (v1Character: Pick<MigrationSource, 'level' | 'selectedAbilities'>) => {
  const plan = planV1Migration(v1Character, buildV2System());
  writeMigrationSource({ ...v1Character, origin: 'browser', importedAt: new Date().toISOString() });
  backUpCultivationSave('v2');
  localStorage.setItem(STORAGE_KEY_CULTIVATION.v2, JSON.stringify({
    level: plan.level, selectedAbilities: plan.selectedAbilities, activeEssenceByPath: plan.activeEssenceByPath, version: 'v2'
  }));
};

/* ------------------------------------------------------------ wording */

const SPELL_LEVELS: SpellLevel[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];

/** "Master" for talents, "3rd-level spell" or "cantrip" for spells. */
export const rankLabel = (ability: Ability) => {
  if (ability.tier === 'cantrip') return 'Cantrip';
  if ((SPELL_LEVELS as string[]).includes(ability.tier)) return `${ability.tier}-level spell`;
  return tierInfo(ability.tier as TierId).name;
};

const joinWith = (items: string[], word: string) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} ${word} ${items[items.length - 1]}`;

const article = (word: string) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

export const SEVERITY_META: Record<Severity, { label: string; color: string; icon: typeof Info }> = {
  error: { label: 'Needs attention', color: '#ff6b4a', icon: XOctagon },
  warning: { label: 'Changed', color: '#fbbf24', icon: AlertTriangle },
  info: { label: 'Moved', color: '#4a9eff', icon: Info },
  ok: { label: 'Unchanged', color: '#8a8a9a', icon: Info }
};

export const severityOf = (entry: MigrationEntry): Severity => {
  if (entry.fate === 'blocked') return 'error';
  if (entry.fate === 'removed') return 'warning';
  if (entry.tierChanged || entry.kindChanged) return 'warning';
  if (entry.fate === 'moved' || entry.fate === 'merged') return 'info';
  return 'ok';
};

/** One plain sentence (or two) telling the player what happened and what to do. */
export const describeEntry = (entry: MigrationEntry, level: number): string[] => {
  const { v1, v1Path, v2, v2Path } = entry;
  if (!v2 || !v2Path) {
    return [`${v1.name} was removed from the game. No V2 path offers it, so its points are free to spend elsewhere.`];
  }

  const lines: string[] = [];
  const moved = v1Path.id !== v2Path.id;
  const where = moved ? `moved from ${v1Path.name} to ${v2Path.name}` : `stays in ${v2Path.name}`;

  if (entry.fate === 'blocked' && entry.blocked?.kind === 'prerequisite') {
    const missing = entry.blocked.missing.map(t => tierInfo(t).name);
    lines.push(
      `${v1.name} is ${article(rankLabel(v2))} ${rankLabel(v2)} ability that ${where}, but you have no ${joinWith(missing, 'or')} abilities in ${v2Path.name}, so it could not stay learned.`,
      `Learn ${joinWith(missing.map(t => `${article(t)} ${t}`), 'and')} ability in ${v2Path.name}, then learn ${v2.name} again.`
    );
  } else if (entry.fate === 'blocked' && entry.blocked?.kind === 'level') {
    lines.push(
      `${v1.name} ${where} as ${article(rankLabel(v2))} ${rankLabel(v2)} ability, which opens at level ${entry.blocked.requirement}. Your character is level ${level}, so it could not stay learned.`
    );
  } else if (entry.fate === 'merged') {
    const other = entry.mergedWith!;
    lines.push(other.ability.name === v1.name
      ? `You learned ${v1.name} in both ${other.path.name} and ${v1Path.name}. V2 has a single copy in ${v2Path.name}, so this one's points are free to spend elsewhere.`
      : `${v1.name} merged into ${v2.name} in ${v2Path.name}, which you already get from ${other.ability.name}. Its points are free to spend elsewhere.`);
  } else if (moved) {
    lines.push(`${v1.name} moved from ${v1Path.name} to ${v2Path.name}.`);
  }

  if (entry.tierChanged) {
    const before = costOf(v1);
    const after = costOf(v2);
    const cost = before === after ? '' : ` It now costs ${after} point${after === 1 ? '' : 's'} instead of ${before}.`;
    lines.push(`Adjusted from ${rankLabel(v1)} to ${rankLabel(v2)}.${cost}`);
  }
  if (entry.kindChanged) {
    const label = KIND_META[kindOf(v2)].label.toLowerCase();
    lines.push(`It is now ${article(label)} ${label} ability instead of ${KIND_META[kindOf(v1)].label.toLowerCase()}, which changes how it uses essence.`);
  }
  if (!lines.length) lines.push(`${v1.name} carried over unchanged.`);
  return lines;
};

export const summarize = (plan: MigrationPlan) => {
  const count = (severity: Severity) => plan.entries.filter(e => severityOf(e) === severity).length;
  return {
    errors: count('error'),
    warnings: count('warning'),
    info: count('info'),
    unchanged: count('ok'),
    overBudget: Math.max(0, plan.pointsSpent - plan.pointsTotal)
  };
};
