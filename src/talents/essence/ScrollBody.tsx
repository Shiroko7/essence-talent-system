import React, { useId } from 'react';
import { Ability } from '../../types/essence';
import { TalentController, costOf, reservesEssence } from '../model';
import { TrackedPath } from './shared';
import { DAO_STAGES, Figure, bodyStage } from './dao';
import { FIGURE_ART } from './lotus';
import { Growth, Pt, SEED, Strand, growthsFor, hash, innerStrands, strand, usePoolPulses } from './tree';

const INK = '#2b2118';
const PAPER = '#f6eedb';
const VERMILION = '#b8322a';

/** Darken an accent toward ink so it reads on parchment. */
const inked = (hex: string, amount = 0.35) => {
  const v = hex.replace('#', '');
  const mix = (i: number, ink: number) => Math.round(parseInt(v.slice(i, i + 2), 16) * (1 - amount) + ink * amount);
  return `rgb(${mix(0, 0x2b)}, ${mix(2, 0x21)}, ${mix(4, 0x18)})`;
};

const SPROUT_ANGLES = [-140, -40, -110, -70, -165, -15, -125, -55, -90, 160];

/** A path's meridian: its branch, else its root, else a short curl from the seed. */
const meridianOf = (g: Growth): Strand => {
  const inner = innerStrands(g);
  if (inner.branch) return inner.branch;
  if (inner.root) return inner.root;
  const a = (SPROUT_ANGLES[g.index % SPROUT_ANGLES.length] * Math.PI) / 180;
  const tip: Pt = [SEED[0] + Math.cos(a) * 58, SEED[1] + Math.sin(a) * 50];
  const control: Pt = [SEED[0] + Math.cos(a + 0.6) * 34, SEED[1] + Math.sin(a + 0.6) * 30];
  return strand(SEED, control, tip);
};

/* The brush-painted tree beside the cultivator, grown by stage. */
const TRUNK = 'M 322,396 C 314,300 334,222 314,140 C 300,82 268,30 236,-22 L 246,-18 C 280,32 314,82 330,138 C 350,220 332,300 350,396 Z';
const BOUGHS = [
  'M 322,190 C 292,170 262,160 236,166',
  'M 330,250 C 360,236 384,236 404,246',
  'M 318,122 C 346,102 372,98 398,106',
  'M 298,72 C 262,56 228,54 198,64',
  'M 274,26 C 244,8 210,-2 174,2',
  'M 250,-8 C 230,-40 200,-56 160,-60'
];
const BOUGH_TIPS: Pt[] = [[236, 166], [404, 246], [398, 106], [198, 64], [174, 2], [160, -60]];
const GROUND_ROOTS = ['M 336,394 C 300,398 260,402 214,404', 'M 336,394 C 364,398 392,400 418,398', 'M 330,392 C 316,380 300,378 284,384'];
const TRUNK_TOP = [0, 0, 0, 70, 0, -100];

const Blossom: React.FC<{ x: number; y: number; color: string; r?: number }> = ({ x, y, color, r = 4.5 }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <circle key={i} cx={Math.cos((i * 2 * Math.PI) / 5) * r} cy={Math.sin((i * 2 * Math.PI) / 5) * r} r={r * 0.75} fill={color} fillOpacity={0.85} />
    ))}
    <circle r={r * 0.45} fill={VERMILION} />
  </g>
);

/**
 * The Meridian Scroll: an ink chart of the seated cultivator on parchment.
 * Each path is a meridian drawn through the body with one acupoint per learned
 * ability — filled when you can cast it now, hollow when you can't, dark when
 * always on. A brush-painted tree beside the figure grows with each stage, and
 * the red seals down the side mark the stages you have reached.
 */
export const ScrollBody: React.FC<{
  ctl: TalentController; paths: TrackedPath[]; figure: Figure;
  highlightId?: string | null; onHover?: (id: string | null) => void; onInfo?: (a: Ability) => void;
  className?: string; style?: React.CSSProperties;
}> = ({ ctl, paths, figure, highlightId, onHover, onInfo, className = '', style }) => {
  const id = useId().replace(/:/g, '');
  const art = FIGURE_ART[figure];
  const stage = bodyStage(ctl);
  const growths = growthsFor(ctl, paths);
  const pulses = usePoolPulses(paths);
  const blossomColors = growths.filter(g => g.fruits > 0).map(g => g.tracked.path.accent);
  const blossoms = stage >= 4 ? Math.min(14, Math.max(4, growths.reduce((n, g) => n + g.fruits, 0) * 2)) : 0;
  const visibleBoughs = stage >= 3 ? BOUGHS.filter((_, i) => i < (stage >= 5 ? 6 : stage >= 4 ? 5 : 3)) : [];

  return (
    <svg viewBox="-40 -90 500 510" className={`overflow-visible ${className}`} style={style} role="img" aria-label="Meridian chart of your cultivation">
      <defs>
        <filter id={`${id}-brush`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" />
        </filter>
        <filter id={`${id}-wash`}><feGaussianBlur stdDeviation="6" /></filter>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="0.12" stopColor="#fff" stopOpacity={1} />
        </linearGradient>
        <mask id={`${id}-grown`} maskUnits="userSpaceOnUse" x={-40} y={-100} width={500} height={520}>
          <rect x={-40} y={(TRUNK_TOP[Math.min(5, stage)] || 0) - 40} width={500} height={520} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <style>{`
        .ink-ripple { animation: ink-ripple 900ms ease-out forwards; transform-box: fill-box; transform-origin: center; }
        @keyframes ink-ripple { from { opacity: 0.8; transform: scale(0.3); } to { opacity: 0; transform: scale(2.6); } }
        .ink-flash { animation: ink-flash 900ms ease-out forwards; }
        @keyframes ink-flash { from { stroke-opacity: 0.9; } to { stroke-opacity: 0; stroke-width: 12px; } }
        @media (prefers-reduced-motion: reduce) { .ink-ripple, .ink-flash { animation: none; } }
      `}</style>

      {/* The brush tree */}
      <g filter={`url(#${id}-brush)`}>
        {stage >= 2 && GROUND_ROOTS.map((d, i) => <path key={i} d={d} fill="none" stroke={INK} strokeOpacity={0.55} strokeWidth={3 - i * 0.6} strokeLinecap="round" />)}
        {stage >= 5 && [[250, -40, 90, 50], [170, -20, 70, 40], [330, 20, 70, 44], [230, 40, 60, 30]].map(([cx, cy, rx, ry], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={INK} fillOpacity={0.1} filter={`url(#${id}-wash)`} />
        ))}
        {stage >= 3 && (
          <g mask={`url(#${id}-grown)`}>
            <path d={TRUNK} fill={INK} fillOpacity={0.62} />
            {visibleBoughs.map((d, i) => <path key={i} d={d} fill="none" stroke={INK} strokeOpacity={0.6} strokeWidth={3.2 - i * 0.2} strokeLinecap="round" />)}
          </g>
        )}
        {visibleBoughs.map((_, i) => Array.from({ length: 9 }).map((__, j) => {
          const [x, y] = BOUGH_TIPS[i];
          return (
            <ellipse key={`${i}-${j}`} cx={x + (hash(i * 9 + j) - 0.5) * 44} cy={y + (hash(i * 9 + j + 50) - 0.5) * 26} rx={6} ry={2.6}
              transform={`rotate(${hash(j + i) * 180} ${x + (hash(i * 9 + j) - 0.5) * 44} ${y + (hash(i * 9 + j + 50) - 0.5) * 26})`}
              fill={INK} fillOpacity={0.35 + hash(j) * 0.3} />
          );
        }))}
      </g>
      {Array.from({ length: blossoms }).map((_, i) => {
        const [x, y] = BOUGH_TIPS[i % visibleBoughs.length];
        return <Blossom key={i} x={x + (hash(i + 70) - 0.5) * 50} y={y + (hash(i + 90) - 0.5) * 30} color={blossomColors[i % blossomColors.length] ?? VERMILION} />;
      })}

      {/* The cultivator, in ink */}
      <path d={art.outline} fillRule="evenodd" fill={PAPER} fillOpacity={0.94} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" filter={`url(#${id}-brush)`} />
      {art.details.map((d, i) => <path key={i} d={d} fill="none" stroke={INK} strokeOpacity={0.7} strokeWidth={1.3} strokeLinecap="round" />)}
      {art.face && <path d={art.face} fill="none" stroke={INK} strokeOpacity={0.6} strokeWidth={1.2} />}

      {/* Meridians and acupoints */}
      {growths.map(g => {
        const { path, pool } = g.tracked;
        const main = meridianOf(g);
        const inner = innerStrands(g);
        const color = inked(path.accent);
        const lit = highlightId === path.id;
        const dim = !!highlightId && !lit;
        const labelLeft = main.tip[0] < 200;
        return (
          <g key={path.id} opacity={dim ? 0.25 : 1} style={{ transition: 'opacity 250ms' }}
            onMouseEnter={() => onHover?.(path.id)} onMouseLeave={() => onHover?.(null)}>
            {inner.branch && inner.root && <path d={inner.root.d} fill="none" stroke={color} strokeWidth={1.2} strokeDasharray="3 3" />}
            <path d={main.d} fill="none" stroke={INK} strokeOpacity={0.25} strokeWidth={lit ? 5 : 3.6} strokeLinecap="round" />
            <path d={main.d} fill="none" stroke={color} strokeWidth={lit ? 2.8 : 1.9} strokeLinecap="round" />
            {pulses[path.id] && <path key={pulses[path.id]} d={main.d} fill="none" stroke={path.accent} strokeWidth={4} className="ink-flash" />}
            {pulses[path.id] && <circle key={`r${pulses[path.id]}`} cx={main.tip[0]} cy={main.tip[1]} r={10} fill="none" stroke={color} strokeWidth={2} className="ink-ripple" />}
            {g.learned.map((a, i) => {
              const p = main.at(0.22 + (0.78 * (i + 0.5)) / g.learned.length);
              const always = reservesEssence(a);
              const ready = !always && pool.current >= costOf(a);
              return (
                <g key={a.id} onClick={() => onInfo?.(a)} style={{ cursor: onInfo ? 'pointer' : undefined }}>
                  <title>{`${a.name} — ${always ? 'always on' : ready ? 'ready to cast' : 'not enough essence'}`}</title>
                  <circle cx={p.x} cy={p.y} r={8} fill="transparent" />
                  <circle cx={p.x} cy={p.y} r={lit ? 4.6 : 3.8} fill={always ? INK : ready ? path.accent : PAPER} stroke={always ? color : color}
                    strokeWidth={always ? 1.6 : 1.5} />
                  {ready && <circle cx={p.x} cy={p.y} r={1.3} fill={PAPER} />}
                </g>
              );
            })}
            {lit && <text x={main.tip[0] + (labelLeft ? -7 : 7)} y={main.tip[1] - 4} textAnchor={labelLeft ? 'end' : 'start'}
              fontSize={13} className="font-display" fill={color} stroke={PAPER} strokeWidth={3} paintOrder="stroke" style={{ letterSpacing: 0.5 }}>
              {path.name}
            </text>}
          </g>
        );
      })}

      {/* The seed: a vermilion dot in the lower dantian */}
      {stage >= 1 && <circle cx={SEED[0]} cy={SEED[1]} r={5.5} fill={VERMILION} stroke={INK} strokeWidth={1.2} />}

      {/* Seals for each stage reached */}
      {DAO_STAGES.map((s, i) => {
        const reached = s.level <= stage;
        const glyph = ['種', '根', '幹', '果', '樹'][i];
        return (
          <g key={s.level} transform={`translate(430 ${-70 + i * 36})`}>
            <title>{`${s.tier} — ${s.name}${reached ? '' : ' (not yet)'}`}</title>
            <rect x={-14} y={-14} width={28} height={28} rx={3} fill={reached ? VERMILION : 'none'} stroke={VERMILION} strokeOpacity={reached ? 1 : 0.3}
              strokeWidth={1.5} transform={`rotate(${(hash(i) - 0.5) * 6})`} />
            <text y={6} textAnchor="middle" fontSize={17} fill={reached ? PAPER : VERMILION} fillOpacity={reached ? 1 : 0.3}
              style={{ fontFamily: "'Noto Serif SC','Songti SC','SimSun','MS Mincho',serif" }}>{glyph}</text>
          </g>
        );
      })}
    </svg>
  );
};
