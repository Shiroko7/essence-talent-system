import type { Figure } from './dao';

/**
 * A cultivator seated in lotus position, front view, in a 400 × 400 box.
 * Each figure is one clean closed outline (built from its left half and
 * mirrored) plus a few interior lines for the arms, hands and crossed legs.
 */
export const LOTUS_W = 400;
export const LOTUS_H = 400;

type P = [number, number];
/** A cubic segment: two control points and an end point. */
type Seg = [P, P, P];

const mx = ([x, y]: P): P => [LOTUS_W - x, y];
const pt = ([x, y]: P) => `${x.toFixed(1)},${y.toFixed(1)}`;

/** Close a left half-outline (top centre → bottom centre) with its mirror. */
const mirrored = (start: P, left: Seg[]) => {
  const points = [start, ...left.map(s => s[2])];
  const right = [...left].reverse().map((s, i) => {
    const from = points[left.length - i - 1];
    return [mx(s[1]), mx(s[0]), mx(from)] as Seg;
  });
  return `M ${pt(start)} ${[...left, ...right].map(s => `C ${pt(s[0])} ${pt(s[1])} ${pt(s[2])}`).join(' ')} Z`;
};

const mirrorD = (d: string) => d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x, y) => `${LOTUS_W - Number(x)},${y}`);

interface FigureArt {
  outline: string;
  /** Interior contour lines: arm edges, forearms, crossed shins. */
  details: string[];
  /** Face framed by hair; drawn over the outline. */
  face?: string;
}

const MASCULINE_LEFT: Seg[] = [
  [[195, 16], [191, 20], [191, 25]],     // topknot
  [[191, 29], [193, 31], [194, 33]],
  [[181, 36], [174, 48], [174, 66]],     // crown to temple
  [[174, 85], [181, 97], [189, 102]],    // jaw
  [[189, 109], [188, 115], [186, 119]],  // neck
  [[170, 124], [148, 126], [136, 134]],  // trapezius
  [[122, 142], [117, 158], [117, 176]],  // deltoid
  [[114, 204], [109, 228], [111, 250]],  // upper arm to elbow
  [[113, 265], [121, 277], [130, 285]],  // elbow down to the thigh
  [[108, 290], [80, 300], [62, 320]],    // thigh out to the knee
  [[50, 334], [54, 354], [72, 359]],     // knee
  [[112, 369], [160, 372], [200, 372]]   // under the crossed shins
];

const FEMININE_LEFT: Seg[] = [
  [[190, 12], [184, 18], [184, 26]],     // hair bun
  [[184, 32], [186, 36], [189, 38]],
  [[178, 42], [171, 54], [171, 70]],     // crown to temple
  [[170, 90], [171, 104], [175, 112]],   // hair down to the jaw
  [[180, 114], [186, 113], [190, 112]],  // hair tips in to the neck
  [[190, 118], [189, 123], [187, 127]],  // neck
  [[174, 131], [154, 134], [143, 141]],  // trapezius
  [[135, 147], [132, 157], [132, 170]],  // shoulder
  [[130, 192], [124, 226], [126, 250]],  // upper arm to elbow
  [[128, 265], [134, 277], [141, 285]],  // elbow down to the thigh
  [[114, 291], [82, 301], [64, 322]],    // thigh out to the knee
  [[53, 335], [57, 355], [75, 360]],     // knee
  [[114, 370], [160, 374], [200, 374]]   // under the crossed shins
];

/** The gap between the upper arm and the torso, so the arms read clearly. */
const ARM_GAP: Record<Figure, string> = {
  masculine: 'M 150,172 C 153,200 156,226 160,246 C 152,251 145,253 138,251 C 134,228 134,200 138,180 C 141,175 146,172 150,172 Z',
  feminine: 'M 157,176 C 160,202 162,228 165,246 C 158,251 152,253 146,251 C 143,230 143,204 146,184 C 149,179 153,176 157,176 Z'
};

const forearm = (from: P) => [
  // forearm top edge, from the elbow down to the hands in the lap
  `M ${pt(from)} C ${pt([from[0] + 8, from[1] + 20])} 168,282 182,290`
];

const withMirror = (lines: string[]) => lines.flatMap(d => [d, mirrorD(d)]);

const LEGS = [
  // upper shin (right foot over left thigh)
  'M 84,334 C 124,318 176,314 232,322',
  // lower shin
  'M 316,346 C 276,342 232,341 186,347',
  // upper foot resting on the thigh
  'M 232,322 C 250,322 266,328 270,336 C 258,338 244,336 232,332',
  // hands in dhyana mudra
  'M 176,292 C 186,284 214,284 224,292 C 214,300 186,300 176,292 Z'
];

export const FIGURE_ART: Record<Figure, FigureArt> = {
  masculine: {
    outline: `${mirrored([200, 16], MASCULINE_LEFT)} ${ARM_GAP.masculine} ${mirrorD(ARM_GAP.masculine)}`,
    details: [...withMirror(forearm([160, 246])), ...LEGS, 'M 186,36 C 194,33 206,33 214,36']
  },
  feminine: {
    outline: `${mirrored([200, 12], FEMININE_LEFT)} ${ARM_GAP.feminine} ${mirrorD(ARM_GAP.feminine)}`,
    details: [...withMirror(forearm([165, 246])), ...LEGS, 'M 189,38 C 196,35 204,35 211,38'],
    face: 'M 200,48 C 187,48 180,59 180,72 C 180,88 189,100 200,101 C 211,100 220,88 220,72 C 220,59 213,48 200,48 Z'
  }
};

/** Landmarks inside the seated body. */
export const L = {
  crown: { x: 200, y: 34 },
  brow: { x: 200, y: 62 },
  throat: { x: 200, y: 116 },
  heart: { x: 200, y: 170 },
  dantian: { x: 200, y: 246 },
  base: { x: 200, y: 330 },
  seat: 372
};
