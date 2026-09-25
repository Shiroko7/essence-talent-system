import { useEffect, useRef, useState } from 'react';
import { Ability } from '../../types/essence';
import { TIER_IDS, TalentController, tierOf } from '../model';
import { fruitCount, pathStage } from './dao';
import { TrackedPath } from './shared';
import { L } from './lotus';

export type Pt = [number, number];

/** A quadratic strand with helpers to place leaves, acupoints and fruit along it. */
export interface Strand {
  d: string;
  start: Pt;
  control: Pt;
  tip: Pt;
  at: (t: number) => { x: number; y: number; angle: number };
}

export const strand = (start: Pt, control: Pt, tip: Pt): Strand => ({
  d: `M ${start[0]} ${start[1]} Q ${control[0]} ${control[1]} ${tip[0]} ${tip[1]}`,
  start,
  control,
  tip,
  at: t => {
    const u = 1 - t;
    const x = u * u * start[0] + 2 * u * t * control[0] + t * t * tip[0];
    const y = u * u * start[1] + 2 * u * t * control[1] + t * t * tip[1];
    const dx = 2 * u * (control[0] - start[0]) + 2 * t * (tip[0] - control[0]);
    const dy = 2 * u * (control[1] - start[1]) + 2 * t * (tip[1] - control[1]);
    return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
  }
});

/** A branch leaving the trunk at height `fromY`, arching up toward its tip. */
export const branch = (fromY: number, tip: Pt, arch = 24) =>
  strand([200, fromY], [(200 + tip[0]) / 2, Math.min(fromY, tip[1]) - arch], tip);

/** A root leaving the seed and bending outward as it falls. */
export const root = (seed: Pt, tip: Pt) =>
  strand([seed[0], seed[1] + 6], [seed[0] + (tip[0] - seed[0]) * 0.15, tip[1] - 30], tip);

/** One learned path as the Tree sees it. */
export interface Growth {
  tracked: TrackedPath;
  index: number;
  stage: number;
  /** Every learned ability, lowest tier first. */
  learned: Ability[];
  fruits: number;
}

const byTier = (a: Ability, b: Ability) => TIER_IDS.indexOf(tierOf(a)) - TIER_IDS.indexOf(tierOf(b));

export const growthsFor = (ctl: TalentController, paths: TrackedPath[]): Growth[] =>
  paths.map((tracked, index) => ({
    tracked,
    index,
    stage: pathStage(ctl, tracked.path.id),
    learned: [...tracked.actions, ...tracked.constant].sort(byTier),
    fruits: fruitCount(ctl, tracked.path.id)
  }));

/** How full a pool is, 0..1; a pool with no room (all held) reads as half lit. */
export const fullness = ({ current, max }: { current: number; max: number }) => (max > 0 ? current / max : 0.5);

/** Remembers each pool's last value so a spend can flash its strand. */
export const usePoolPulses = (paths: TrackedPath[]) => {
  const last = useRef<Record<string, number>>({});
  const [pulses, setPulses] = useState<Record<string, number>>({});
  const signature = paths.map(t => `${t.path.id}:${t.pool.current}`).join('|');
  useEffect(() => {
    const spent: Record<string, number> = {};
    paths.forEach(t => {
      const before = last.current[t.path.id];
      if (before !== undefined && t.pool.current < before) spent[t.path.id] = Date.now();
      last.current[t.path.id] = t.pool.current;
    });
    if (Object.keys(spent).length) setPulses(p => ({ ...p, ...spent }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);
  return pulses;
};

/** Deterministic 0..1 noise, so scattered details stay put between renders. */
export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ------------------------------------------------ geometry inside the body */

export const SEED: Pt = [L.dantian.x, L.dantian.y];

export const ROOT_TIPS: Pt[] = [
  [150, 398], [250, 398], [108, 392], [292, 392], [186, 404], [214, 404], [72, 384], [328, 384], [166, 402], [234, 402]
];
export const BRANCHES: { from: number; tip: Pt }[] = [
  { from: 196, tip: [126, 238] }, { from: 196, tip: [274, 238] },
  { from: 170, tip: [142, 152] }, { from: 170, tip: [258, 152] },
  { from: 222, tip: [176, 286] }, { from: 222, tip: [224, 286] },
  { from: 150, tip: [178, 128] }, { from: 150, tip: [222, 128] },
  { from: 184, tip: [124, 196] }, { from: 184, tip: [276, 196] }
];
export const CROWN_TIPS: Pt[] = [
  [150, -20], [250, -20], [118, 10], [282, 10], [200, -52], [174, -42], [226, -42], [100, -26], [300, -26], [200, -24]
];

/** A path's root and branch inside the seated body. */
export const innerStrands = (g: Growth) => ({
  root: g.stage >= 2 ? root(SEED, ROOT_TIPS[g.index % ROOT_TIPS.length]) : null,
  branch: g.stage >= 3
    ? g.stage >= 5
      ? branch(70, CROWN_TIPS[g.index % CROWN_TIPS.length], 10)
      : branch(BRANCHES[g.index % BRANCHES.length].from, BRANCHES[g.index % BRANCHES.length].tip)
    : null
});
