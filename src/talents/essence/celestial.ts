import { Growth, Pt, SEED, branch, root } from './tree';

/** The Celestial body is drawn in this box so the tree of light can spread past it. */
export const CEL_VIEW = { x: -60, y: -150, w: 520, h: 570 };

/** Trunk height by stage: it rises behind the spine and breaks out above the head. */
export const CEL_TRUNK_TOP = [246, 246, 246, -20, -60, -110];

/** Path branches fan up from the trunk into a canopy above the head. */
const FAN = [-150, -30, -120, -60, -165, -15, -135, -45, -105, -75];
const CEL_BRANCHES: { from: number; tip: Pt }[] = FAN.map((deg, i) => {
  const a = (deg * Math.PI) / 180;
  return { from: 120 - Math.floor(i / 2) * 22, tip: [Math.round(200 + Math.cos(a) * 190), Math.round(60 + Math.sin(a) * 160)] };
});

/** Unnamed boughs that fill out the canopy as the Tree matures. */
export const celestialBoughs = (stage: number) => {
  const count = stage >= 5 ? 14 : stage >= 4 ? 9 : stage >= 3 ? 5 : 0;
  return Array.from({ length: count }).map((_, i) => {
    const deg = -165 + (150 * (i + 0.5)) / count;
    const a = (deg * Math.PI) / 180;
    const reach = 120 + (i % 3) * 22;
    return branch(90 - (i % 3) * 30, [200 + Math.cos(a) * reach * 1.2, 40 + Math.sin(a) * reach], 18);
  });
};

const CEL_ROOTS: Pt[] = [
  [20, 392], [380, 392], [70, 408], [330, 408], [-20, 372], [420, 372], [130, 414], [270, 414], [0, 402], [400, 402]
];

/** A path's root of light across the lotus and its branch of light behind the body. */
export const celestialStrands = (g: Growth) => ({
  root: g.stage >= 2 ? root(SEED, CEL_ROOTS[g.index % CEL_ROOTS.length]) : null,
  branch: g.stage >= 3 ? branch(CEL_BRANCHES[g.index % CEL_BRANCHES.length].from, CEL_BRANCHES[g.index % CEL_BRANCHES.length].tip, 30) : null
});

/** Where a path's growth ends: the branch tip, root tip, or the seed. */
export const celestialAnchor = (stage: number, index: number): Pt => {
  if (stage >= 3) return CEL_BRANCHES[index % CEL_BRANCHES.length].tip;
  if (stage >= 2) return CEL_ROOTS[index % CEL_ROOTS.length];
  return SEED;
};
