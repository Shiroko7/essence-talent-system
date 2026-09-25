import React, { useId } from 'react';
import { TalentController, tint } from '../model';
import { TrackedPath } from './shared';
import { Figure, bodyStage } from './dao';
import { FIGURE_ART, L } from './lotus';
import { SEED, fullness, growthsFor, usePoolPulses } from './tree';
import { CEL_TRUNK_TOP, CEL_VIEW, celestialBoughs, celestialStrands } from './celestial';

const STAR = 'M0,-7 L1.6,-1.6 L7,0 L1.6,1.6 L0,7 L-1.6,1.6 L-7,0 L-1.6,-1.6 Z';

/** Energy centres along the spine, lit in the order the Tree reaches them. */
const CHAKRAS = [
  { at: L.dantian, stage: 1 }, { at: L.base, stage: 2 }, { at: L.heart, stage: 3 },
  { at: L.throat, stage: 4 }, { at: L.brow, stage: 5 }, { at: L.crown, stage: 5 }
];

/** A lotus of light for the figure to sit on; `front` petals overlap the legs. */
const LightLotus: React.FC<{ id: string; front?: boolean; stage: number }> = ({ id, front, stage }) => {
  const petals = front
    ? [[-24, 58, 20], [0, 64, 22], [24, 58, 20]]
    : [[-84, 190, 34], [84, 190, 34], [-62, 168, 36], [62, 168, 36], [-40, 146, 34], [40, 146, 34], [-16, 130, 30], [16, 130, 30]];
  return (
    <g opacity={0.45 + stage * 0.1}>
      {petals.map(([angle, len, w]) => (
        <path key={angle} transform={`translate(200 ${front ? 404 : 408}) rotate(${angle})`}
          d={`M0,0 C ${-w},${-len * 0.4} ${-w * 0.6},${-len * 0.9} 0,${-len} C ${w * 0.6},${-len * 0.9} ${w},${-len * 0.4} 0,0 Z`}
          fill={`url(#${id}-petal)`} stroke="rgba(255,214,240,0.55)" strokeWidth={1} />
      ))}
    </g>
  );
};

/**
 * The Celestial Lotus: the cultivator as a dark, rim-lit silhouette seated on a
 * lotus of light, with the Dao Tree as a tree of light rising behind them.
 * Abilities hang in its branches as orbs, grandmaster fruit burns as stars,
 * and the energy centres along the spine light up stage by stage.
 */
export const CelestialBody: React.FC<{
  ctl: TalentController; paths: TrackedPath[]; figure: Figure;
  highlightId?: string | null; onHover?: (id: string | null) => void; onSelect?: (id: string) => void;
  className?: string; style?: React.CSSProperties;
}> = ({ ctl, paths, figure, highlightId, onHover, onSelect, className = '', style }) => {
  const id = useId().replace(/:/g, '');
  const art = FIGURE_ART[figure];
  const stage = bodyStage(ctl);
  const growths = growthsFor(ctl, paths);
  const pulses = usePoolPulses(paths);
  const lastPulse = Math.max(0, ...Object.values(pulses));

  return (
    <svg viewBox={`${CEL_VIEW.x} ${CEL_VIEW.y} ${CEL_VIEW.w} ${CEL_VIEW.h}`} className={`overflow-visible ${className}`} style={style}
      role="img" aria-label="Your tree of light">
      <defs>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="55%" stopColor="#c9a959" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <linearGradient id={`${id}-petal`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f0abfc" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#ffe9a8" stopOpacity={0.08} />
        </linearGradient>
        <radialGradient id={`${id}-nimbus`}>
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity={0.55} />
          <stop offset="60%" stopColor="#c9a959" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#c9a959" stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`${id}-aura`} cx="50%" cy="60%">
          <stop offset="0%" stopColor="#8b7cf6" stopOpacity={0.12 + stage * 0.04} />
          <stop offset="100%" stopColor="#8b7cf6" stopOpacity={0} />
        </radialGradient>
      </defs>
      <style>{`
        .cel-flow { animation: cel-flow 1.8s linear infinite; }
        @keyframes cel-flow { to { stroke-dashoffset: -30; } }
        .cel-twinkle { animation: cel-twinkle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes cel-twinkle { 50% { transform: scale(0.7) rotate(20deg); opacity: 0.7; } }
        .cel-pulse { animation: cel-pulse 900ms ease-out forwards; }
        @keyframes cel-pulse { from { stroke-opacity: 1; } to { stroke-opacity: 0; stroke-width: 18px; } }
        .cel-burst { animation: cel-burst 900ms ease-out forwards; transform-box: fill-box; transform-origin: center; }
        @keyframes cel-burst { from { opacity: 0.9; transform: scale(0.3); } to { opacity: 0; transform: scale(3); } }
        .cel-spin { animation: cel-spin 60s linear infinite; transform-origin: 200px 60px; }
        @keyframes cel-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .cel-flow, .cel-twinkle, .cel-pulse, .cel-burst, .cel-spin { animation: none; } }
      `}</style>

      <ellipse cx={200} cy={200} rx={260} ry={300} fill={`url(#${id}-aura)`} />

      {/* Nimbus and crown rays at the final stage */}
      {stage >= 5 && (
        <g>
          <circle cx={200} cy={60} r={120} fill={`url(#${id}-nimbus)`} />
          <g className="cel-spin">
            {Array.from({ length: 36 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 36;
              return <line key={i} x1={200 + Math.cos(a) * 70} y1={60 + Math.sin(a) * 70} x2={200 + Math.cos(a) * (i % 2 ? 96 : 118)} y2={60 + Math.sin(a) * (i % 2 ? 96 : 118)}
                stroke="#ffe9a8" strokeOpacity={0.35} strokeWidth={1} />;
            })}
          </g>
        </g>
      )}

      <LightLotus id={id} stage={stage} />

      {/* The trunk of light */}
      {stage >= 3 && (() => {
        const top = CEL_TRUNK_TOP[Math.min(5, stage)];
        return (
          <path d={`M 190 ${SEED[1]} C 194 150 197 ${top + 60} 199 ${top} L 201 ${top} C 203 ${top + 60} 206 150 210 ${SEED[1]} Z`}
            fill="#ffe9a8" fillOpacity={0.9} style={{ filter: 'drop-shadow(0 0 8px #ffe9a8) drop-shadow(0 0 18px #c9a959)' }} />
        );
      })()}
      {celestialBoughs(stage).map((b, i) => (
        <g key={i}>
          <path d={b.d} fill="none" stroke="#ffe9a8" strokeOpacity={0.4} strokeWidth={1.6} strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px #c9a959)' }} />
          {[0.55, 0.8, 1].map(t => {
            const p = b.at(t);
            return <circle key={t} cx={p.x} cy={p.y} r={t === 1 ? 2.6 : 1.8} fill="#ffe9a8" fillOpacity={0.8} style={{ filter: 'drop-shadow(0 0 4px #ffe9a8)' }} />;
          })}
        </g>
      ))}

      {/* Each path's roots and branches of light, with orbs and star fruit */}
      {growths.map(g => {
        const { path, pool } = g.tracked;
        const s = celestialStrands(g);
        const lit = highlightId === path.id;
        const dim = !!highlightId && !lit;
        const glow = 0.35 + 0.65 * fullness(pool);
        return (
          <g key={path.id} opacity={dim ? 0.3 : 1} style={{ transition: 'opacity 250ms', cursor: onSelect ? 'pointer' : undefined }}
            onMouseEnter={() => onHover?.(path.id)} onMouseLeave={() => onHover?.(null)} onClick={() => onSelect?.(path.id)}>
            <title>{`${path.name}: ${pool.current}/${pool.max}`}</title>
            {[s.root, s.branch].filter(Boolean).map((st, i) => (
              <g key={i}>
                <path d={st!.d} fill="none" stroke="transparent" strokeWidth={16} />
                <path d={st!.d} fill="none" stroke={path.accent} strokeOpacity={glow} strokeWidth={lit ? 4 : 2.6} strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 ${lit ? 8 : 5}px ${path.accent})` }} />
                {pool.current > 0 && <path d={st!.d} fill="none" stroke="#fff" strokeOpacity={0.7} strokeWidth={1.2} strokeDasharray="2 13" className="cel-flow" />}
                {pulses[path.id] && <path key={pulses[path.id]} d={st!.d} fill="none" stroke={path.accent} strokeWidth={6} className="cel-pulse" />}
              </g>
            ))}
            {s.branch && g.learned.map((a, i) => {
              const p = s.branch!.at(0.28 + (0.62 * (i + 0.5)) / g.learned.length);
              const off = i % 2 ? 9 : -9;
              return (
                <circle key={a.id} cx={p.x + off * Math.sin((p.angle * Math.PI) / 180)} cy={p.y - off * Math.cos((p.angle * Math.PI) / 180)} r={3.6}
                  fill={path.accent} fillOpacity={0.4 + glow * 0.6} style={{ filter: `drop-shadow(0 0 5px ${path.accent})` }} />
              );
            })}
            {s.branch && Array.from({ length: Math.min(3, g.fruits) }).map((_, i) => {
              const p = s.branch!.at(1 - i * 0.16);
              return (
                <g key={i} transform={`translate(${p.x} ${p.y}) scale(${1.3 - i * 0.2})`}>
                  <path d={STAR} fill="#fffbe8" className="cel-twinkle" style={{ filter: `drop-shadow(0 0 6px ${path.accent}) drop-shadow(0 0 12px ${path.accent})` }} />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* The silhouette, dark and rim-lit */}
      <path d={art.outline} fillRule="evenodd" fill="#06060b" stroke={`url(#${id}-rim)`} strokeWidth={2.2} strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 ${4 + stage * 2}px rgba(201,169,89,0.55))` }} />
      {art.details.map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(255,233,168,0.18)" strokeWidth={1.2} strokeLinecap="round" />)}
      {art.face && <path d={art.face} fill="none" stroke="rgba(255,233,168,0.22)" strokeWidth={1.2} />}
      <LightLotus id={id} stage={stage} front />

      {/* Energy centres along the spine */}
      <line x1={200} y1={L.crown.y} x2={200} y2={L.base.y} stroke="rgba(255,233,168,0.12)" strokeWidth={1} />
      {CHAKRAS.map(({ at, stage: need }, i) => {
        const on = stage >= need;
        return (
          <circle key={i} cx={at.x} cy={at.y} r={on ? 5 : 3} fill={on ? '#ffe9a8' : 'none'} stroke={on ? '#fff' : 'rgba(255,233,168,0.3)'} strokeWidth={1}
            style={on ? { filter: 'drop-shadow(0 0 6px #ffe9a8) drop-shadow(0 0 12px #c9a959)' } : undefined} />
        );
      })}

      {/* Orbiting motes of each path around the seed */}
      {growths.map((g, i) => {
        const a = (2 * Math.PI * i) / growths.length - Math.PI / 2;
        return (
          <circle key={g.tracked.path.id} cx={SEED[0] + Math.cos(a) * 18} cy={SEED[1] + Math.sin(a) * 18} r={highlightId === g.tracked.path.id ? 4 : 2.8}
            fill={g.tracked.path.accent} style={{ filter: `drop-shadow(0 0 4px ${g.tracked.path.accent})`, cursor: onSelect ? 'pointer' : undefined }}
            onClick={() => onSelect?.(g.tracked.path.id)} onMouseEnter={() => onHover?.(g.tracked.path.id)} onMouseLeave={() => onHover?.(null)}>
            <title>{g.tracked.path.name}</title>
          </circle>
        );
      })}
      {lastPulse > 0 && <circle key={lastPulse} cx={SEED[0]} cy={SEED[1]} r={14} fill="none" stroke={tint('#ffe9a8', 0.9)} strokeWidth={2} className="cel-burst" />}
    </svg>
  );
};
