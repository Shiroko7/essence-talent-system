import { useEffect, useState } from 'react';
import { TIER_IDS, TalentController, tierOf } from '../model';

/**
 * The Dao Tree: cultivation as a metaphysical tree grown inside the body.
 * Each tier reached grows the next part of it.
 */
export interface DaoStage {
  /** 1 = Initiate … 5 = Great Grandmaster. */
  level: number;
  tier: string;
  name: string;
  summary: string;
}

export const DAO_STAGES: DaoStage[] = [
  { level: 1, tier: 'Initiate', name: 'Dao Seed', summary: 'A seed of essence condenses in the lower dantian.' },
  { level: 2, tier: 'Adept', name: 'Roots', summary: 'Roots open through the meridians and anchor you to the world.' },
  { level: 3, tier: 'Master', name: 'Trunk & Leaves', summary: 'The trunk rises along the spine and leaves unfurl through the limbs.' },
  { level: 4, tier: 'Grandmaster', name: 'Fruits', summary: 'Your branches bear fruit: power ripened into mastery.' },
  { level: 5, tier: 'Great Grandmaster', name: 'World Tree', summary: 'The Tree is whole; its crown breaks past the body.' }
];

export const stageInfo = (level: number) => DAO_STAGES[Math.max(1, Math.min(5, level)) - 1];

/** Highest tier learned in a path, as a stage level (0 when nothing is learned). */
export const pathStage = (ctl: TalentController, pathId: string) =>
  (ctl.system.abilitiesByPath[pathId] || [])
    .filter(a => ctl.isLearned(a.id))
    .reduce((best, a) => Math.max(best, TIER_IDS.indexOf(tierOf(a)) + 1), 0);

/** How many learned abilities in a path sit at Grandmaster or above: the tree's fruits. */
export const fruitCount = (ctl: TalentController, pathId: string) =>
  (ctl.system.abilitiesByPath[pathId] || [])
    .filter(a => ctl.isLearned(a.id) && TIER_IDS.indexOf(tierOf(a)) >= 3).length;

export const bodyStage = (ctl: TalentController) =>
  ctl.learnedPaths.reduce((best, p) => Math.max(best, pathStage(ctl, p.id)), 0);

/* ------------------------------------------------------------ geometry */

/** The body is drawn in a 400 × 660 box; these are its landmarks. */
export const BODY_W = 400;
export const BODY_H = 660;
export const DANTIAN = { x: 200, y: 305 };
export const HEART = { x: 200, y: 200 };
export const CROWN = { x: 200, y: 62 };

type Pt = [number, number];

/** Branch tips, in order: elbows, collarbones, hands, chest, shoulders. */
const BRANCH_TIPS: { from: number; tip: Pt }[] = [
  { from: 232, tip: [124, 240] }, { from: 232, tip: [276, 240] },
  { from: 196, tip: [150, 160] }, { from: 196, tip: [250, 160] },
  { from: 254, tip: [106, 326] }, { from: 254, tip: [294, 326] },
  { from: 214, tip: [170, 206] }, { from: 214, tip: [230, 206] },
  { from: 180, tip: [136, 186] }, { from: 180, tip: [264, 186] }
];

/** Root tips: down the legs and out into the ground. */
const ROOT_TIPS: Pt[] = [
  [166, 600], [234, 600], [148, 640], [252, 640], [176, 470],
  [224, 470], [124, 650], [276, 650], [190, 560], [210, 560]
];

/** A crowned branch climbs to the canopy above the head instead. */
const CROWN_TIPS: Pt[] = [
  [150, 44], [250, 44], [176, 18], [224, 18], [128, 76], [272, 76], [200, 10], [112, 30], [288, 30], [200, 30]
];

export const branchFor = (index: number, crowned: boolean) => {
  const b = BRANCH_TIPS[index % BRANCH_TIPS.length];
  const tip = crowned ? CROWN_TIPS[index % CROWN_TIPS.length] : b.tip;
  const start: Pt = [200, crowned ? b.from - 20 : b.from];
  const control: Pt = [(start[0] + tip[0]) / 2, Math.min(start[1], tip[1]) - (crowned ? 60 : 26)];
  return { start, control, tip };
};

export const rootFor = (index: number) => {
  const tip = ROOT_TIPS[index % ROOT_TIPS.length];
  const spread = tip[0] - DANTIAN.x;
  return {
    tip,
    d: `M ${DANTIAN.x} ${DANTIAN.y + 8} C ${DANTIAN.x + spread * 0.2} 380, ${tip[0] + spread * 0.3} ${tip[1] - 90}, ${tip[0]} ${tip[1]}`
  };
};

/** Point and tangent angle (degrees) along a quadratic curve. */
export const alongQuad = (p0: Pt, c: Pt, p1: Pt, t: number) => {
  const u = 1 - t;
  const x = u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0];
  const y = u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1];
  const dx = 2 * u * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]);
  const dy = 2 * u * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
};

/** Where a path's growth ends in the body: its branch tip, root tip, or the seed. */
export const anchorFor = (stage: number, index: number): Pt => {
  if (stage >= 3) return branchFor(index, stage >= 5).tip;
  if (stage >= 2) return rootFor(index).tip;
  return [DANTIAN.x, DANTIAN.y];
};

/* -------------------------------------------------------------- figure */

export type Figure = 'masculine' | 'feminine';

const FIGURE_KEY = 'talent-dao-figure';

export const useFigure = () => {
  const [figure, setFigure] = useState<Figure>(() => {
    try { return localStorage.getItem(FIGURE_KEY) === 'feminine' ? 'feminine' : 'masculine'; } catch { return 'masculine'; }
  });
  useEffect(() => {
    try { localStorage.setItem(FIGURE_KEY, figure); } catch { /* storage unavailable */ }
  }, [figure]);
  return [figure, setFigure] as const;
};
