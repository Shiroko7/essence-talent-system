import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { tint } from '../model';
import type { TalentController } from '../model';
import { AbilityIcon, AlwaysOnChips, InfoButton, PathLinkButton, RestButtons, UseButton } from '../ui';
import { TrackedPath, TrackerProps, refillPath, trackerGroups } from './shared';
import { FigureToggle, RealmLadder, StageBadge } from './DaoChrome';
import { CelestialBody } from './CelestialBody';
import { CEL_VIEW, celestialAnchor } from './celestial';
import { bodyStage, pathStage, stageInfo, useFigure } from './dao';
import { hash } from './tree';

const SIZE = 92;
const R = 38;
const GAP_DEG = 6;

const polar = (deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [SIZE / 2 + R * Math.cos(rad), SIZE / 2 + R * Math.sin(rad)];
};

const arc = (from: number, to: number) => {
  const [x1, y1] = polar(from);
  const [x2, y2] = polar(to);
  return `M ${x1} ${y1} A ${R} ${R} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

/** A segmented ring: one segment per point, reserved points drawn as dim red. */
const Ring: React.FC<{
  ctl: TalentController; tracked: TrackedPath; selected: boolean; onSelect: () => void;
  onHover?: (id: string | null) => void; groupLabel?: { label: string; accent: string };
}> = ({ ctl, tracked, selected, onSelect, onHover, groupLabel }) => {
  const { path, pool } = tracked;
  const total = Math.max(1, pool.max + pool.reserved);
  const step = 360 / total;
  const ref = useRef<HTMLButtonElement>(null);
  const adjust = useRef((d: number) => ctl.adjustPool(path.id, d));
  adjust.current = (d: number) => ctl.adjustPool(path.id, d);

  // Scroll over a ring to adjust it (needs a non-passive listener to stop page scroll).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => { e.preventDefault(); adjust.current(e.deltaY < 0 ? 1 : -1); };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <button
      ref={ref}
      onClick={onSelect}
      onMouseEnter={() => onHover?.(path.id)}
      onMouseLeave={() => onHover?.(null)}
      onKeyDown={e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); adjust.current(1); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); adjust.current(-1); }
      }}
      className={`flex flex-col items-center gap-1 rounded-xl px-1.5 pt-1.5 pb-2 transition-all focus:outline-none ${selected ? '' : 'bg-void/70 hover:bg-charcoal/80'}`}
      style={selected ? {
        background: `linear-gradient(${tint(path.accent, 0.16)}, ${tint(path.accent, 0.16)}), #0a0a0f`,
        boxShadow: `0 0 0 1px ${tint(path.accent, 0.5)}, 0 0 24px ${tint(path.accent, 0.25)}`
      } : undefined}
      title={`${path.name} — scroll or use arrow keys to adjust`}
      aria-label={`${path.name}: ${pool.current} of ${pool.max}`}
    >
      <svg width={SIZE} height={SIZE}>
        {Array.from({ length: total }).map((_, i) => {
          const from = i * step + GAP_DEG / 2;
          const to = (i + 1) * step - GAP_DEG / 2;
          const reserved = i >= pool.max;
          const lit = i < pool.current;
          return (
            <path
              key={i}
              d={arc(from, Math.max(from + 1, to))}
              fill="none"
              strokeWidth={lit ? 7 : 5}
              strokeLinecap="round"
              stroke={reserved ? 'rgba(255,107,74,0.35)' : lit ? path.accent : 'rgba(106,106,122,0.35)'}
              style={lit ? { filter: `drop-shadow(0 0 4px ${tint(path.accent, 0.8)})`, transition: 'all 200ms' } : { transition: 'all 200ms' }}
            />
          );
        })}
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R - 10} fill={tint(path.accent, 0.08)} />
        <foreignObject x={SIZE / 2 - 14} y={16} width={28} height={20}>
          <div className="flex justify-center">{path.icon(16)}</div>
        </foreignObject>
        <text x="50%" y={SIZE / 2 + 12} textAnchor="middle" className="font-display" fontSize="22" fill={path.accent}>{pool.current}</text>
        <text x="50%" y={SIZE / 2 + 26} textAnchor="middle" fontSize="10" fill="#8888a0">of {pool.max}</text>
      </svg>
      <span className={`font-display text-xs tracking-wide ${selected ? 'text-ivory' : 'text-fog'}`}>{path.name}</span>
      {groupLabel && (
        <span className="font-display text-[9px] tracking-[0.18em] uppercase -mt-1" style={{ color: tint(groupLabel.accent, 0.8) }}>{groupLabel.label}</span>
      )}
    </button>
  );
};

const useWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
};

const STAGE_H = 700;
const BODY_PX = 480;

/**
 * Rings — a cultivation HUD. The body stands at the centre with the Dao Tree
 * inside it; every path's pool is a segmented ring orbiting it, tethered by a
 * thread of qi to where that path grows in the body. Scroll over a ring (or
 * focus it and use arrow keys) to adjust; select one to open its tray.
 */
const RingsTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath, onInfo }) => {
  const groups = trackerGroups(ctl);
  const all = groups.flatMap(g => g.paths.map(t => ({ ...t, group: g.group })));
  const [selectedId, setSelectedId] = useState<string | null>(all[0]?.path.id ?? null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [figure, setFigure] = useFigure();
  const [stageRef, width] = useWidth();
  const selected = all.find(t => t.path.id === selectedId) ?? all[0];
  const stage = bodyStage(ctl);
  const multiGroup = ctl.system.groups.length > 1;
  const orbit = width >= 760;
  const focusId = hoverId ?? selected?.path.id;

  const ring = (t: typeof all[number]) => (
    <Ring key={t.path.id} ctl={ctl} tracked={t} selected={t.path.id === selected?.path.id}
      onSelect={() => setSelectedId(t.path.id)} onHover={setHoverId}
      groupLabel={multiGroup ? { label: t.group.label.split(' ')[0], accent: t.group.accent } : undefined} />
  );

  const body = (px: number) => (
    <CelestialBody ctl={ctl} paths={all} figure={figure} highlightId={focusId} onHover={setHoverId} onSelect={setSelectedId} style={{ width: px }} />
  );

  // Orbit geometry: two curved columns of rings either side of the body.
  const W = Math.min(width, 1240);
  const scale = BODY_PX / CEL_VIEW.w;
  const bodyLeft = (W - BODY_PX) / 2;
  const bodyTop = (STAGE_H - CEL_VIEW.h * scale) / 2;
  const half = Math.ceil(all.length / 2);
  const place = (j: number, k: number, side: -1 | 1) => {
    const gap = k > 1 ? Math.min(150, (STAGE_H - 150) / (k - 1)) : 0;
    const y = STAGE_H / 2 + (j - (k - 1) / 2) * gap;
    const ry = STAGE_H / 2 + 60;
    const rx = Math.min(W / 2 - 80, 430);
    const x = W / 2 + side * rx * Math.sqrt(Math.max(0, 1 - ((y - STAGE_H / 2) / ry) ** 2));
    return { x, y };
  };
  const positions = all.map((_, i) => (i < half ? place(i, half, -1) : place(i - half, all.length - half, 1)));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {stage > 0 && (
          <div className="flex items-center gap-3">
            <RealmLadder stage={stage} compact />
            <p className="leading-tight">
              <span className="block font-display text-[10px] tracking-[0.2em] uppercase text-gold/80">{stageInfo(stage).tier} realm</span>
              <span className="font-display text-sm text-ivory">{stageInfo(stage).name}</span>
            </p>
          </div>
        )}
        <p className="text-xs text-mist flex-1 min-w-[220px]">Scroll over a ring to adjust · select a ring, or its strand in the body, for actions</p>
        <FigureToggle figure={figure} onChange={setFigure} />
        <RestButtons ctl={ctl} compact />
      </div>

      <div ref={stageRef}>
        {orbit ? (
          <div
            className="relative mx-auto rounded-2xl border border-gold-subtle overflow-hidden"
            style={{ width: W, height: STAGE_H, background: 'radial-gradient(ellipse at 50% 55%, #1a1433 0%, #0b0a18 45%, #050509 80%)' }}
          >
            {/* Starfield */}
            <svg className="absolute inset-0 pointer-events-none" width={W} height={STAGE_H}>
              <style>{`.star { animation: star 3s ease-in-out infinite; } @keyframes star { 50% { opacity: 0.2; } }
                @media (prefers-reduced-motion: reduce) { .star { animation: none; } }`}</style>
              {Array.from({ length: 110 }).map((_, i) => (
                <circle key={i} cx={hash(i) * W} cy={hash(i + 200) * STAGE_H} r={0.4 + hash(i + 400) * 1.1} fill="#fff"
                  opacity={0.25 + hash(i + 600) * 0.6} className={i % 3 ? undefined : 'star'} style={{ animationDelay: `${hash(i + 800) * 3}s` }} />
              ))}
            </svg>
            <div className="absolute rounded-[50%] border border-dashed border-gold/10" style={{ left: W / 2 - Math.min(W / 2 - 80, 430), right: W / 2 - Math.min(W / 2 - 80, 430), top: -60, bottom: -60 }} />
            <div className="absolute" style={{ left: bodyLeft, top: bodyTop }}>{body(BODY_PX)}</div>
            {/* Threads of qi from each ring to where its path grows in the body */}
            <svg className="absolute inset-0 pointer-events-none" width={W} height={STAGE_H}>
              <style>{`.qi-thread { animation: qi-flow 1.4s linear infinite; } @keyframes qi-flow { to { stroke-dashoffset: -24; } }
                @media (prefers-reduced-motion: reduce) { .qi-thread { animation: none; } }`}</style>
              {all.map((t, i) => {
                const [ax, ay] = celestialAnchor(pathStage(ctl, t.path.id), i);
                const end = { x: bodyLeft + (ax - CEL_VIEW.x) * scale, y: bodyTop + (ay - CEL_VIEW.y) * scale };
                const start = positions[i];
                const mid = { x: (start.x + end.x) / 2, y: Math.min(start.y, end.y) - 30 };
                const lit = t.path.id === focusId;
                const flowing = t.pool.current > 0;
                return (
                  <path key={t.path.id} d={`M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`} fill="none"
                    stroke={t.path.accent} strokeOpacity={lit ? 0.85 : 0.3} strokeWidth={lit ? 2 : 1.2}
                    strokeDasharray={flowing ? '4 8' : '1 6'} className={flowing ? 'qi-thread' : undefined} />
                );
              })}
            </svg>
            {all.map((t, i) => (
              <div key={t.path.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: positions[i].x, top: positions[i].y }}>
                {ring(t)}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center">{body(Math.min(340, width))}</div>
            <div className="flex flex-wrap justify-center gap-2">{all.map(ring)}</div>
          </div>
        )}
      </div>

      {/* Tray for the selected ring */}
      {selected && (
        <div className="rounded-xl border p-4 animate-fade-in" style={{ borderColor: tint(selected.path.accent, 0.4), background: `linear-gradient(135deg, ${tint(selected.path.accent, 0.1)}, rgba(18,18,26,0.9) 60%)` }}>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="font-display text-lg tracking-wide" style={{ color: selected.path.accent }}>{selected.path.name}</h3>
            <StageBadge level={pathStage(ctl, selected.path.id)} accent={selected.path.accent} />
            <div className="flex items-center gap-1">
              <button onClick={() => ctl.adjustPool(selected.path.id, -1)} disabled={selected.pool.current <= 0} className="w-7 h-7 rounded border border-gold-subtle text-fog hover:text-essence-fire disabled:opacity-30 flex items-center justify-center"><Minus size={13} /></button>
              <span className="font-display text-xl tabular-nums w-14 text-center text-ivory">{selected.pool.current}<span className="text-xs text-mist">/{selected.pool.max}</span></span>
              <button onClick={() => ctl.adjustPool(selected.path.id, 1)} disabled={selected.pool.current >= selected.pool.max} className="w-7 h-7 rounded border border-gold-subtle text-fog hover:text-essence-wood disabled:opacity-30 flex items-center justify-center"><Plus size={13} /></button>
              <button onClick={() => refillPath(ctl, selected.path.id)} className="ml-1 text-xs text-mist hover:text-gold inline-flex items-center gap-1"><RotateCcw size={12} /> Refill</button>
            </div>
            <span className="ml-auto"><PathLinkButton path={selected.path} onOpenPath={onOpenPath} /></span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {selected.actions.map(a => (
              <div key={a.id} className="flex items-center gap-2 rounded-md border border-gold-subtle bg-void/50 px-2 py-1.5">
                <AbilityIcon ability={a} path={selected.path} status="learned" size={26} />
                <span className="flex-1 text-sm text-parchment truncate">{a.name}</span>
                <UseButton ctl={ctl} ability={a} path={selected.path} compact />
                <InfoButton ability={a} onInfo={onInfo} />
              </div>
            ))}
          </div>
          <AlwaysOnChips abilities={selected.constant} path={selected.path} onInfo={onInfo} className="mt-3" />
        </div>
      )}
    </div>
  );
};

export default RingsTracker;
