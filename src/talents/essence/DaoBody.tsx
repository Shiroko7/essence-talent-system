import React, { useEffect, useRef, useState } from 'react';
import { Bean, Cherry, Leaf, Mars, Sprout, TreeDeciduous, Venus } from 'lucide-react';
import { Ability } from '../../types/essence';
import { TalentController, tint } from '../model';
import { AbilityIcon } from '../ui';
import { TrackedPath } from './shared';
import {
  BODY_H, BODY_W, CROWN, DANTIAN, DAO_STAGES, Figure, HEART, alongQuad, bodyStage, branchFor, fruitCount, pathStage, rootFor, stageInfo
} from './dao';

/* ---------------------------------------------------------- silhouette */

type Shape =
  | { kind: 'ellipse'; cx: number; cy: number; rx: number; ry: number }
  | { kind: 'limb'; x1: number; y1: number; x2: number; y2: number; w: number }
  | { kind: 'path'; d: string };

const mirror = (shapes: Shape[]): Shape[] => shapes.flatMap<Shape>(s => {
  if (s.kind === 'ellipse') return [s, { ...s, cx: BODY_W - s.cx }];
  if (s.kind === 'limb') return [s, { ...s, x1: BODY_W - s.x1, x2: BODY_W - s.x2 }];
  return [s];
});

const FIGURES: Record<Figure, Shape[]> = {
  masculine: [
    { kind: 'ellipse', cx: 200, cy: 70, rx: 29, ry: 35 },
    { kind: 'limb', x1: 200, y1: 98, x2: 200, y2: 134, w: 24 },
    { kind: 'path', d: 'M146,140 C170,128 230,128 254,140 C262,150 262,170 258,190 C252,230 244,262 240,292 C246,312 250,330 250,350 L150,350 C150,330 154,312 160,292 C156,262 148,230 142,190 C138,170 138,150 146,140 Z' },
    ...mirror([
      { kind: 'limb', x1: 154, y1: 150, x2: 126, y2: 246, w: 26 },
      { kind: 'limb', x1: 126, y1: 246, x2: 108, y2: 332, w: 20 },
      { kind: 'ellipse', cx: 105, cy: 350, rx: 10, ry: 17 },
      { kind: 'limb', x1: 176, y1: 340, x2: 172, y2: 472, w: 40 },
      { kind: 'limb', x1: 172, y1: 472, x2: 168, y2: 594, w: 27 },
      { kind: 'ellipse', cx: 162, cy: 606, rx: 20, ry: 9 }
    ])
  ],
  feminine: [
    { kind: 'ellipse', cx: 200, cy: 78, rx: 36, ry: 44 },
    { kind: 'path', d: 'M166,70 C158,120 156,150 168,176 L232,176 C244,150 242,120 234,70 Z' },
    { kind: 'ellipse', cx: 200, cy: 72, rx: 26, ry: 32 },
    { kind: 'limb', x1: 200, y1: 98, x2: 200, y2: 136, w: 20 },
    { kind: 'path', d: 'M156,142 C176,132 224,132 244,142 C250,152 250,170 246,186 C244,214 234,236 230,262 C240,290 256,318 256,350 L144,350 C144,318 160,290 170,262 C166,236 156,214 154,186 C150,170 150,152 156,142 Z' },
    ...mirror([
      { kind: 'limb', x1: 160, y1: 152, x2: 136, y2: 246, w: 21 },
      { kind: 'limb', x1: 136, y1: 246, x2: 120, y2: 330, w: 16 },
      { kind: 'ellipse', cx: 117, cy: 346, rx: 9, ry: 15 },
      { kind: 'limb', x1: 180, y1: 344, x2: 178, y2: 472, w: 38 },
      { kind: 'limb', x1: 178, y1: 472, x2: 174, y2: 594, w: 24 },
      { kind: 'ellipse', cx: 170, cy: 606, rx: 17, ry: 8 }
    ])
  ]
};

/** Draw every shape as an outline, then again as fill: the result is one merged silhouette. */
const Silhouette: React.FC<{ figure: Figure; stage: number }> = ({ figure, stage }) => {
  const shapes = FIGURES[figure];
  const draw = (outline: boolean) => shapes.map((s, i) => {
    const stroke = outline ? `rgba(201,169,89,${0.25 + stage * 0.05})` : 'url(#dao-flesh)';
    if (s.kind === 'ellipse') {
      return <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} fill={outline ? 'none' : 'url(#dao-flesh)'} stroke={outline ? stroke : 'none'} strokeWidth={3} />;
    }
    if (s.kind === 'limb') {
      return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={stroke} strokeWidth={s.w + (outline ? 3 : 0)} strokeLinecap="round" />;
    }
    return <path key={i} d={s.d} fill={outline ? 'none' : 'url(#dao-flesh)'} stroke={outline ? stroke : 'none'} strokeWidth={3} />;
  });
  return (
    <g>
      <g>{draw(true)}</g>
      <g>{draw(false)}</g>
    </g>
  );
};

/* ---------------------------------------------------------------- tree */

const intensity = ({ current, max }: { current: number; max: number }) => (max > 0 ? 0.3 + 0.7 * (current / max) : 0.55);

interface Growth {
  tracked: TrackedPath;
  index: number;
  stage: number;
  leaves: number;
  fruits: number;
}

const PathGrowth: React.FC<{
  growth: Growth; dimmed: boolean; highlighted: boolean; pulse: number;
  onHover?: (id: string | null) => void; onSelect?: (id: string) => void;
}> = ({ growth, dimmed, highlighted, pulse, onHover, onSelect }) => {
  const { tracked: { path, pool }, index, stage, leaves, fruits } = growth;
  const glow = intensity(pool);
  const flowing = pool.current > 0;
  const root = stage >= 2 ? rootFor(index) : null;
  const branch = stage >= 3 ? branchFor(index, stage >= 5) : null;
  const branchD = branch ? `M ${branch.start[0]} ${branch.start[1]} Q ${branch.control[0]} ${branch.control[1]} ${branch.tip[0]} ${branch.tip[1]}` : null;
  const strands = [root?.d, branchD].filter(Boolean) as string[];

  return (
    <g
      onMouseEnter={() => onHover?.(path.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onSelect?.(path.id)}
      style={{ cursor: onSelect ? 'pointer' : undefined, opacity: dimmed ? 0.22 : 1, transition: 'opacity 250ms' }}
    >
      <title>{`${path.name} · ${stageInfo(stage).name} · ${pool.current}/${pool.max}`}</title>
      {strands.map((d, i) => (
        <g key={i}>
          {/* wide invisible hit area */}
          <path d={d} fill="none" stroke="transparent" strokeWidth={16} />
          <path d={d} fill="none" stroke={path.accent} strokeOpacity={glow} strokeWidth={highlighted ? 4.5 : 3} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 ${highlighted ? 6 : 3}px ${tint(path.accent, 0.9)})`, transition: 'all 300ms' }} />
          {flowing && <path d={d} fill="none" stroke="#fff" strokeOpacity={0.55 * glow} strokeWidth={1.4} strokeDasharray="3 13" className="dao-flow" />}
          {pulse > 0 && <path key={pulse} d={d} fill="none" stroke={path.accent} strokeWidth={10} strokeLinecap="round" className="dao-pulse" />}
        </g>
      ))}

      {/* rootlets near each root tip */}
      {root && [-1, 1].map(side => (
        <path key={side} d={`M ${root.tip[0]} ${root.tip[1] - 28} q ${side * 12} 10 ${side * 16} 26`} fill="none" stroke={path.accent} strokeOpacity={glow * 0.8} strokeWidth={1.5} strokeLinecap="round" />
      ))}

      {branch && Array.from({ length: leaves }).map((_, i) => {
        const t = 0.3 + (0.62 * (i + 0.5)) / leaves;
        const p = alongQuad(branch.start, branch.control, branch.tip, t);
        const side = i % 2 ? 1 : -1;
        return (
          <path key={i} d="M0,0 C4,-5 12,-5 16,0 C12,5 4,5 0,0 Z" fill={path.accent} fillOpacity={0.35 + glow * 0.55}
            stroke={path.accent} strokeOpacity={0.9} strokeWidth={0.6}
            transform={`translate(${p.x} ${p.y}) rotate(${p.angle + side * 48})`} />
        );
      })}

      {/* leaf cluster at the tip */}
      {branch && [-60, -20, 20, 60].map(r => (
        <path key={r} d="M0,0 C4,-5 12,-5 16,0 C12,5 4,5 0,0 Z" fill={path.accent} fillOpacity={0.3 + glow * 0.5}
          transform={`translate(${branch.tip[0]} ${branch.tip[1]}) rotate(${alongQuad(branch.start, branch.control, branch.tip, 1).angle + r})`} />
      ))}

      {branch && fruits > 0 && Array.from({ length: Math.min(3, fruits) }).map((_, i) => {
        const p = alongQuad(branch.start, branch.control, branch.tip, 1 - i * 0.12);
        return (
          <circle key={i} cx={p.x} cy={p.y + 7} r={5.5} fill={path.accent} stroke="#faf8f2" strokeOpacity={0.6} strokeWidth={1}
            style={{ filter: `drop-shadow(0 0 6px ${path.accent})` }} className="dao-fruit" />
        );
      })}
    </g>
  );
};

/** Deterministic scatter of canopy leaves around the head. */
const CANOPY = Array.from({ length: 90 })
  .map((_, i) => {
    const r = Math.sqrt((i + 0.5) / 90);
    const a = i * 2.39996;
    return { x: 190 + Math.cos(a) * 128 * r, y: 64 + Math.sin(a) * 82 * r, r: (i * 47) % 360, depth: 1 - r * 0.6 };
  })
  .filter(leaf => leaf.y < 138);

const BOUGHS = [
  'M200,260 Q180,236 166,222', 'M200,248 Q222,226 236,214',
  'M200,190 Q176,168 160,166', 'M200,176 Q226,158 242,158'
];

const ROOT_FLARE = ['M200,316 Q188,334 176,340', 'M200,316 Q212,334 224,340', 'M200,318 Q199,336 200,352'];

/** Remembers each pool's last value so a spend can flash its branch. */
const usePulses = (paths: TrackedPath[]) => {
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

/**
 * The cultivator's body with the Dao Tree growing inside it. The seed sits in
 * the lower dantian; roots, trunk, leaves, fruits and crown appear as tiers are
 * reached. Each learned path is its own coloured strand whose glow is its pool.
 */
export const DaoBody: React.FC<{
  ctl: TalentController; paths: TrackedPath[]; figure: Figure;
  highlightId?: string | null; onHover?: (id: string | null) => void; onSelect?: (id: string) => void;
  className?: string; style?: React.CSSProperties;
}> = ({ ctl, paths, figure, highlightId, onHover, onSelect, className = '', style }) => {
  const stage = bodyStage(ctl);
  const pulses = usePulses(paths);
  const growths: Growth[] = paths.map((tracked, index) => ({
    tracked,
    index,
    stage: pathStage(ctl, tracked.path.id),
    leaves: Math.min(8, tracked.actions.length + tracked.constant.length),
    fruits: fruitCount(ctl, tracked.path.id)
  }));
  const crowned = growths.filter(g => g.stage >= 5);
  const lastPulse = Math.max(0, ...Object.values(pulses));

  return (
    <svg viewBox={`0 0 ${BODY_W} ${BODY_H}`} className={`overflow-visible ${className}`} style={style} role="img"
      aria-label={`Your Dao Tree: ${stage ? `${stageInfo(stage).tier}, ${stageInfo(stage).name}` : 'no seed yet'}`}>
      <defs>
        <linearGradient id="dao-flesh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1c28" />
          <stop offset="100%" stopColor="#12121a" />
        </linearGradient>
        <radialGradient id="dao-aura" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#c9a959" stopOpacity={0.08 + stage * 0.05} />
          <stop offset="100%" stopColor="#c9a959" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="dao-seed" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff7d6" />
          <stop offset="60%" stopColor="#c9a959" />
          <stop offset="100%" stopColor="#6b5520" />
        </radialGradient>
      </defs>
      <style>{`
        .dao-flow { animation: dao-flow 1.6s linear infinite; }
        @keyframes dao-flow { to { stroke-dashoffset: -32; } }
        .dao-pulse { animation: dao-pulse 900ms ease-out forwards; }
        @keyframes dao-pulse { from { stroke-opacity: 0.9; } to { stroke-opacity: 0; stroke-width: 22px; } }
        .dao-orbit { animation: dao-orbit 14s linear infinite; transform-origin: ${DANTIAN.x}px ${DANTIAN.y}px; }
        @keyframes dao-orbit { to { transform: rotate(360deg); } }
        .dao-fruit { animation: dao-bob 3s ease-in-out infinite; }
        @keyframes dao-bob { 50% { transform: translateY(1.5px); } }
        .dao-burst { animation: dao-burst 800ms ease-out forwards; transform-origin: ${DANTIAN.x}px ${DANTIAN.y}px; }
        @keyframes dao-burst { from { opacity: 0.8; transform: scale(0.4); } to { opacity: 0; transform: scale(2.4); } }
        @media (prefers-reduced-motion: reduce) { .dao-flow, .dao-orbit, .dao-fruit, .dao-burst, .dao-pulse { animation: none; } }
      `}</style>

      <ellipse cx={200} cy={300} rx={200} ry={330} fill="url(#dao-aura)" />
      {stage >= 2 && <ellipse cx={200} cy={618} rx={130} ry={12} fill="rgba(201,169,89,0.08)" stroke="rgba(201,169,89,0.15)" />}

      {/* Crown canopy: a foliage cloud breaking past the head */}
      {crowned.length > 0 && CANOPY.map((leaf, i) => {
        const accent = i % 4 === 3 ? '#c9a959' : crowned[i % crowned.length].tracked.path.accent;
        return (
          <path key={i} d="M0,0 C5,-6 15,-6 20,0 C15,6 5,6 0,0 Z" fill={accent} fillOpacity={0.25 + leaf.depth * 0.45}
            stroke={accent} strokeOpacity={0.6} strokeWidth={0.6}
            transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`} />
        );
      })}

      <Silhouette figure={figure} stage={stage} />

      {/* Central channel and the three dantians */}
      <line x1={200} y1={CROWN.y} x2={200} y2={DANTIAN.y} stroke="rgba(201,169,89,0.12)" strokeWidth={1} strokeDasharray="2 5" />
      {[
        { at: CROWN, lit: stage >= 5 },
        { at: HEART, lit: stage >= 3 }
      ].map(({ at, lit }, i) => (
        <circle key={i} cx={at.x} cy={at.y} r={lit ? 7 : 4} fill={lit ? '#c9a959' : 'none'} stroke="rgba(201,169,89,0.5)"
          style={lit ? { filter: 'drop-shadow(0 0 8px #c9a959)' } : undefined} />
      ))}

      {/* Trunk */}
      {stage >= 3 && (
        <path
          d={stage >= 5
            ? 'M191,322 C193,250 196,150 198,40 L202,40 C204,150 207,250 209,322 Z'
            : 'M192,322 C194,260 196,200 198,150 L202,150 C204,200 206,260 208,322 Z'}
          fill="#c9a959" fillOpacity={0.8} style={{ filter: 'drop-shadow(0 0 6px rgba(201,169,89,0.7))' }}
        />
      )}

      {/* Gold boughs that belong to the Tree itself, not any one path */}
      {stage >= 3 && BOUGHS.slice(0, stage >= 4 ? 4 : 2).map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#c9a959" strokeOpacity={0.55} strokeWidth={2} strokeLinecap="round" />
      ))}
      {stage >= 2 && ROOT_FLARE.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#c9a959" strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round" />
      ))}

      {growths.map(g => (
        <PathGrowth
          key={g.tracked.path.id}
          growth={g}
          dimmed={!!highlightId && highlightId !== g.tracked.path.id}
          highlighted={highlightId === g.tracked.path.id}
          pulse={pulses[g.tracked.path.id] ?? 0}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}

      {/* The seed and the motes of each path orbiting it */}
      {stage >= 1 && (
        <>
          <g className="dao-orbit">
            {growths.map((g, i) => {
              const a = (2 * Math.PI * i) / growths.length;
              return (
                <g key={g.tracked.path.id} onClick={() => onSelect?.(g.tracked.path.id)}
                  onMouseEnter={() => onHover?.(g.tracked.path.id)} onMouseLeave={() => onHover?.(null)}
                  style={{ cursor: onSelect ? 'pointer' : undefined }}>
                  <title>{g.tracked.path.name}</title>
                  <circle cx={DANTIAN.x + Math.cos(a) * 20} cy={DANTIAN.y + Math.sin(a) * 20} r={7} fill="transparent" />
                  <circle cx={DANTIAN.x + Math.cos(a) * 20} cy={DANTIAN.y + Math.sin(a) * 20} r={highlightId === g.tracked.path.id ? 4.5 : 3.2}
                    fill={g.tracked.path.accent} fillOpacity={intensity(g.tracked.pool)}
                    style={{ filter: `drop-shadow(0 0 4px ${g.tracked.path.accent})` }} />
                </g>
              );
            })}
          </g>
          <ellipse cx={DANTIAN.x} cy={DANTIAN.y} rx={7} ry={10} fill="url(#dao-seed)" style={{ filter: 'drop-shadow(0 0 10px #c9a959)' }} />
          {lastPulse > 0 && <circle key={lastPulse} cx={DANTIAN.x} cy={DANTIAN.y} r={16} fill="none" stroke="#faf8f2" strokeWidth={2} className="dao-burst" />}
        </>
      )}
    </svg>
  );
};

/* ---------------------------------------------------------- stage chrome */

const STAGE_ICONS = [Bean, Sprout, Leaf, Cherry, TreeDeciduous];

export const StageIcon: React.FC<{ level: number; size?: number; className?: string; style?: React.CSSProperties }> = ({ level, size = 14, className, style }) => {
  const Icon = STAGE_ICONS[Math.max(1, Math.min(5, level)) - 1];
  return <Icon size={size} className={className} style={style} />;
};

/** A path's growth stage, e.g. "Roots", in its accent colour. */
export const StageBadge: React.FC<{ level: number; accent: string }> = ({ level, accent }) => (
  level > 0 ? (
    <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-display tracking-wide whitespace-nowrap"
      style={{ color: accent, background: tint(accent, 0.1), border: `1px solid ${tint(accent, 0.3)}` }}
      title={`${stageInfo(level).tier}: ${stageInfo(level).summary}`}>
      <StageIcon level={level} size={10} /> {stageInfo(level).name}
    </span>
  ) : null
);

/** The five stages of the Tree, with the reached ones lit. */
export const RealmLadder: React.FC<{ stage: number; compact?: boolean }> = ({ stage, compact }) => (
  <ol className="flex items-center gap-1">
    {DAO_STAGES.map((s, i) => {
      const reached = s.level <= stage;
      const current = s.level === stage;
      return (
        <li key={s.level} className="flex items-center gap-1">
          {i > 0 && <span className={`h-px ${compact ? 'w-2' : 'w-3'} ${reached ? 'bg-gold/70' : 'bg-ash'}`} />}
          <span
            className={`flex items-center justify-center rounded-full border transition-all ${compact ? 'w-6 h-6' : 'w-8 h-8'} ${
              current ? 'border-gold bg-gold/20 text-ivory shadow-[0_0_12px_rgba(201,169,89,0.5)]' : reached ? 'border-gold/50 text-gold' : 'border-ash text-ash'
            }`}
            title={`${s.tier} — ${s.name}: ${s.summary}`}
          >
            <StageIcon level={s.level} size={compact ? 12 : 15} />
          </span>
        </li>
      );
    })}
  </ol>
);

export const FigureToggle: React.FC<{ figure: Figure; onChange: (f: Figure) => void }> = ({ figure, onChange }) => (
  <div className="inline-flex flex-shrink-0 rounded border border-gold-subtle overflow-hidden" role="group" aria-label="Body shape">
    {([['masculine', Mars], ['feminine', Venus]] as const).map(([id, Icon]) => (
      <button key={id} onClick={() => onChange(id)} aria-pressed={figure === id} title={`${id[0].toUpperCase()}${id.slice(1)} figure`}
        className={`px-2 py-1 transition-colors ${figure === id ? 'bg-gold/20 text-gold' : 'text-mist hover:text-parchment'}`}>
        <Icon size={13} />
      </button>
    ))}
  </div>
);

/** Realm title for the whole body: tier, stage name and what it means. */
export const RealmTitle: React.FC<{ stage: number }> = ({ stage }) => (
  stage > 0 ? (
    <div>
      <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gold/80">{stageInfo(stage).tier} realm</p>
      <p className="font-display text-lg text-ivory leading-tight">{stageInfo(stage).name}</p>
      <p className="text-xs text-mist leading-snug mt-0.5">{stageInfo(stage).summary}</p>
    </div>
  ) : (
    <p className="font-display text-sm text-fog">No Dao seed yet</p>
  )
);

/** Every always-on ability across paths: what the Tree does to you, all the time. */
export const Manifestations: React.FC<{ paths: TrackedPath[]; onInfo?: (a: Ability) => void; onHover?: (id: string | null) => void }> = ({ paths, onInfo, onHover }) => {
  const all = paths.flatMap(t => t.constant.map(a => ({ a, t })));
  if (!all.length) return null;
  const held = paths.reduce((n, t) => n + t.pool.reserved, 0);
  return (
    <div>
      <p className="flex items-baseline justify-between font-display text-[10px] tracking-[0.2em] uppercase text-mist mb-1.5">
        <span>Manifestations</span>
        <span className="tracking-normal normal-case text-[11px]">holding <span className="text-essence-fire">{held}</span> essence</span>
      </p>
      <ul className="space-y-1">
        {all.map(({ a, t }) => (
          <li key={a.id}>
            <button onClick={() => onInfo?.(a)} onMouseEnter={() => onHover?.(t.path.id)} onMouseLeave={() => onHover?.(null)}
              className="w-full flex items-center gap-2 rounded px-1 py-0.5 text-left hover:bg-charcoal/60" title={`Read ${a.name}`}>
              <AbilityIcon ability={a} path={t.path} status="learned" size={20} />
              <span className="flex-1 min-w-0 text-[13px] text-parchment truncate">{a.name}</span>
              <span className="text-[10px] font-display" style={{ color: t.path.accent }}>{t.path.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/** Body plus its realm: the centrepiece most trackers are laid out around. */
export const DaoPanel: React.FC<{
  ctl: TalentController; paths: TrackedPath[]; figure: Figure; onFigure: (f: Figure) => void;
  highlightId?: string | null; onHover?: (id: string | null) => void; onSelect?: (id: string) => void; onInfo?: (a: Ability) => void;
  bodyWidth?: number; showManifestations?: boolean;
}> = ({ ctl, paths, figure, onFigure, highlightId, onHover, onSelect, onInfo, bodyWidth = 300, showManifestations = true }) => {
  const stage = bodyStage(ctl);
  return (
    <div className="rounded-xl border border-gold-subtle p-4 flex flex-col gap-3"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, rgba(201,169,89,0.07), rgba(10,10,15,0.85) 70%)' }}>
      <div className="flex items-start justify-between gap-3">
        <RealmTitle stage={stage} />
        <FigureToggle figure={figure} onChange={onFigure} />
      </div>
      <DaoBody ctl={ctl} paths={paths} figure={figure} highlightId={highlightId} onHover={onHover} onSelect={onSelect}
        className="mx-auto w-full" style={{ maxWidth: bodyWidth }} />
      <div className="flex justify-center"><RealmLadder stage={stage} /></div>
      {showManifestations && <Manifestations paths={paths} onInfo={onInfo} onHover={onHover} />}
    </div>
  );
};
