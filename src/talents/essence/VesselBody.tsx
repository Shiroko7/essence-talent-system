import React, { useId } from 'react';
import { TalentController, tint } from '../model';
import { TrackedPath } from './shared';
import { Figure, bodyStage } from './dao';
import { FIGURE_ART } from './lotus';
import { BRANCHES, ROOT_TIPS, SEED, branch, fullness, growthsFor, hash, innerStrands, root, usePoolPulses } from './tree';

const LIQUID_TOP = 14;
const LIQUID_BOTTOM = 376;

const LEAF = 'M0,0 C3,-4 10,-4 13,0 C10,4 3,4 0,0 Z';

/** Lotus petals of glass the vessel sits on. */
const Pedestal: React.FC = () => (
  <g>
    {[[-86, 176, 30], [86, 176, 30], [-64, 150, 32], [64, 150, 32], [-40, 128, 30], [40, 128, 30]].map(([angle, len, w]) => (
      <path key={angle} transform={`translate(200 404) rotate(${angle})`}
        d={`M0,0 C ${-w},${-len * 0.4} ${-w * 0.6},${-len * 0.9} 0,${-len} C ${w * 0.6},${-len * 0.9} ${w},${-len * 0.4} 0,0 Z`}
        fill="rgba(200,215,255,0.05)" stroke="rgba(215,228,255,0.35)" strokeWidth={1.2} />
    ))}
    <ellipse cx={200} cy={404} rx={150} ry={10} fill="rgba(200,215,255,0.06)" stroke="rgba(215,228,255,0.25)" />
  </g>
);

/**
 * The Vessel: the cultivator's body as a glass flask filled with essence. Each
 * path is a layer of liquid (its current pool) stacked from the seat up; essence
 * held by passives is the striped cap at the crown. The Dao Tree is etched into
 * the glass, with the stages you have not reached yet drawn as faint guides.
 */
export const VesselBody: React.FC<{
  ctl: TalentController; paths: TrackedPath[]; figure: Figure;
  highlightId?: string | null; onHover?: (id: string | null) => void; onSelect?: (id: string) => void;
  className?: string; style?: React.CSSProperties;
}> = ({ ctl, paths, figure, highlightId, onHover, onSelect, className = '', style }) => {
  const id = useId().replace(/:/g, '');
  const art = FIGURE_ART[figure];
  const stage = bodyStage(ctl);
  const growths = growthsFor(ctl, paths);
  const pulses = usePoolPulses(paths);

  const capacity = paths.reduce((n, t) => n + t.pool.max + t.pool.reserved, 0);
  const unit = capacity > 0 ? (LIQUID_BOTTOM - LIQUID_TOP) / capacity : 0;
  const held = paths.reduce((n, t) => n + t.pool.reserved, 0);
  let cursor = LIQUID_BOTTOM;
  const strata = growths.map(g => {
    const h = g.tracked.pool.current * unit;
    cursor -= h;
    return { g, y: cursor, h };
  }).filter(s => s.h > 0);
  const surface = cursor;
  const topColor = strata.length ? strata[strata.length - 1].g.tracked.path.accent : '#c9a959';

  const ghost = { stroke: 'rgba(232,208,138,0.16)', strokeWidth: 1.2, strokeDasharray: '2 4', fill: 'none' } as const;
  const hoverProps = (pathId: string) => ({
    onMouseEnter: () => onHover?.(pathId),
    onMouseLeave: () => onHover?.(null),
    onClick: () => onSelect?.(pathId),
    style: { cursor: onSelect ? 'pointer' : undefined }
  });

  return (
    <svg viewBox="-6 -64 412 484" className={`overflow-visible ${className}`} style={style} role="img"
      aria-label="Your body as a vessel of essence">
      <defs>
        <clipPath id={`${id}-body`}><path d={art.outline} clipRule="evenodd" /></clipPath>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(200,215,255,0.10)" />
          <stop offset="45%" stopColor="rgba(200,215,255,0.02)" />
          <stop offset="100%" stopColor="rgba(200,215,255,0.08)" />
        </linearGradient>
        <pattern id={`${id}-held`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="rgba(255,107,74,0.08)" />
          <rect width="3" height="8" fill="rgba(255,107,74,0.4)" />
        </pattern>
        {growths.map(g => (
          <linearGradient key={g.tracked.path.id} id={`${id}-l-${g.tracked.path.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={g.tracked.path.accent} stopOpacity={0.95} />
            <stop offset="100%" stopColor={g.tracked.path.accent} stopOpacity={0.55} />
          </linearGradient>
        ))}
      </defs>
      <style>{`
        .vessel-wave { animation: vessel-wave 3.5s linear infinite; }
        @keyframes vessel-wave { to { transform: translateX(-40px); } }
        .vessel-bubble { animation: vessel-rise var(--dur) ease-in infinite; animation-delay: var(--delay); }
        @keyframes vessel-rise { from { transform: translateY(0); opacity: 0.8; } to { transform: translateY(var(--rise)); opacity: 0; } }
        .vessel-flash { animation: vessel-flash 900ms ease-out forwards; }
        @keyframes vessel-flash { from { opacity: 0.7; } to { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .vessel-wave, .vessel-bubble, .vessel-flash { animation: none; } }
      `}</style>

      <Pedestal />

      {/* Glass body */}
      <path d={art.outline} fillRule="evenodd" fill={`url(#${id}-glass)`} />

      {/* Liquid strata, clipped to the body */}
      <g clipPath={`url(#${id}-body)`}>
        {held > 0 && <rect x={0} y={LIQUID_TOP} width={400} height={held * unit} fill={`url(#${id}-held)`}><title>{`${held} held by passives and cantrips`}</title></rect>}
        {strata.map(({ g, y, h }) => {
          const { path, pool } = g.tracked;
          const dim = !!highlightId && highlightId !== path.id;
          return (
            <g key={path.id} {...hoverProps(path.id)}>
              <title>{`${path.name}: ${pool.current}/${pool.max}`}</title>
              <rect x={0} y={y} width={400} height={h + 0.5} fill={`url(#${id}-l-${path.id})`} opacity={dim ? 0.35 : 1} style={{ transition: 'all 400ms' }} />
              <line x1={0} x2={400} y1={y + h} y2={y + h} stroke="rgba(10,10,15,0.35)" strokeWidth={1} />
              {pulses[path.id] && <rect key={pulses[path.id]} x={0} y={y} width={400} height={h} fill="#fff" className="vessel-flash" />}
            </g>
          );
        })}
        {strata.length > 0 && (
          <g className="vessel-wave">
            <path d={`M -40 ${surface} ${'q 10 -5 20 0 q 10 5 20 0 '.repeat(12)} V ${surface + 8} H -40 Z`}
              fill={topColor} opacity={0.9} />
          </g>
        )}
        {strata.length > 0 && Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx={130 + hash(i) * 140} cy={LIQUID_BOTTOM - 6} r={1.5 + hash(i + 9) * 2} fill="rgba(255,255,255,0.45)" className="vessel-bubble"
            style={{ '--rise': `${surface - LIQUID_BOTTOM + 10}px`, '--dur': `${3 + hash(i + 3) * 3}s`, '--delay': `${hash(i + 5) * 4}s` } as React.CSSProperties} />
        ))}
      </g>

      {/* Glass rim and highlights */}
      <path d={art.outline} fillRule="evenodd" fill="none" stroke="rgba(215,228,255,0.7)" strokeWidth={2.2} strokeLinejoin="round" />
      {art.details.map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(215,228,255,0.3)" strokeWidth={1.2} strokeLinecap="round" />)}
      {art.face && <path d={art.face} fill="none" stroke="rgba(215,228,255,0.35)" strokeWidth={1.2} />}
      <path d="M 128,186 C 124,214 124,236 128,256" stroke="rgba(255,255,255,0.35)" strokeWidth={3} strokeLinecap="round" fill="none" />
      <path d="M 181,56 C 178,64 178,76 182,86" stroke="rgba(255,255,255,0.35)" strokeWidth={2.5} strokeLinecap="round" fill="none" />

      {/* The Tree, etched into the glass. Unreached stages are faint guides. */}
      {stage < 2 && [ROOT_TIPS[0], ROOT_TIPS[1], ROOT_TIPS[4]].map((tip, i) => <path key={i} d={root(SEED, tip).d} {...ghost} />)}
      {stage < 3 && <path d={`M 200 ${SEED[1]} L 200 150`} {...ghost} />}
      {stage < 3 && [BRANCHES[0], BRANCHES[1], BRANCHES[2], BRANCHES[3]].map((b, i) => <path key={i} d={branch(b.from, b.tip).d} {...ghost} />)}
      {stage < 4 && [[150, 170], [250, 170]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} {...ghost} />)}
      {stage < 5 && <circle cx={200} cy={34} r={62} {...ghost} />}

      {stage >= 3 && (
        <path d={`M 200 ${SEED[1]} L 200 ${stage >= 5 ? 60 : 150}`} stroke="#e8d08a" strokeWidth={3.2} strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 4px rgba(232,208,138,0.8))' }} />
      )}
      {stage >= 5 && (
        <g fill="none" stroke="#e8d08a" style={{ filter: 'drop-shadow(0 0 5px rgba(232,208,138,0.7))' }}>
          <circle cx={200} cy={34} r={62} strokeWidth={1.4} />
          <circle cx={200} cy={34} r={72} strokeWidth={0.8} strokeDasharray="1 5" />
        </g>
      )}

      {growths.map(g => {
        const { path } = g.tracked;
        const s = innerStrands(g);
        const lit = highlightId === path.id;
        const dim = !!highlightId && !lit;
        const glow = 0.35 + 0.65 * fullness(g.tracked.pool);
        return (
          <g key={path.id} {...hoverProps(path.id)} opacity={dim ? 0.3 : 1} style={{ ...hoverProps(path.id).style, transition: 'opacity 250ms' }}>
            <title>{path.name}</title>
            {[s.root, s.branch].filter(Boolean).map((st, i) => (
              <g key={i}>
                <path d={st!.d} fill="none" stroke="transparent" strokeWidth={14} />
                <path d={st!.d} fill="none" stroke={path.accent} strokeWidth={lit ? 2.6 : 1.6} strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 3px ${tint('#e8d08a', 0.9)})` }} />
              </g>
            ))}
            {s.root && [-1, 1].map(side => (
              <path key={side} d={`M ${s.root!.tip[0]} ${s.root!.tip[1] - 22} q ${side * 10} 8 ${side * 14} 20`} fill="none" stroke={path.accent} strokeWidth={1} />
            ))}
            {s.branch && g.learned.slice(0, 9).map((_, i, all) => {
              const p = s.branch!.at(0.3 + (0.66 * (i + 0.5)) / all.length);
              return (
                <path key={i} d={LEAF} transform={`translate(${p.x} ${p.y}) rotate(${p.angle + (i % 2 ? 50 : -50)})`}
                  fill={path.accent} fillOpacity={0.2 + glow * 0.6} stroke="#e8d08a" strokeWidth={0.6} />
              );
            })}
            {s.branch && Array.from({ length: Math.min(3, g.fruits) }).map((_, i) => {
              const p = s.branch!.at(1 - i * 0.14);
              return <circle key={i} cx={p.x} cy={p.y + 6} r={5} fill={path.accent} stroke="#e8d08a" strokeWidth={1.2}
                style={{ filter: `drop-shadow(0 0 5px ${path.accent})` }} />;
            })}
          </g>
        );
      })}

      {/* The seed */}
      {stage >= 1
        ? <ellipse cx={SEED[0]} cy={SEED[1]} rx={6} ry={9} fill="#f4e4a8" stroke="#e8d08a" style={{ filter: 'drop-shadow(0 0 8px #e8d08a)' }} />
        : <ellipse cx={SEED[0]} cy={SEED[1]} rx={6} ry={9} {...ghost} />}
    </svg>
  );
};
