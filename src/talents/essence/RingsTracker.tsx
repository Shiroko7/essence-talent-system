import React, { useEffect, useRef } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { tint } from '../model';
import type { TalentController } from '../model';
import { AbilityIcon, AlwaysOnChips, InfoButton, PathLinkButton, RestButtons, UseButton } from '../ui';
import { TrackedPath, TrackerProps, refillPath, trackerGroups } from './shared';

const SIZE = 104;
const R = 43;
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

/**
 * A segmented ring gauge: one segment per point, reserved points in dim red.
 * Scroll over it, or focus it and use the arrow keys, to adjust the pool.
 */
const Ring: React.FC<{ ctl: TalentController; tracked: TrackedPath }> = ({ ctl, tracked }) => {
  const { path, pool } = tracked;
  const total = Math.max(1, pool.max + pool.reserved);
  const step = 360 / total;
  const ref = useRef<HTMLDivElement>(null);
  const adjust = useRef((d: number) => ctl.adjustPool(path.id, d));
  adjust.current = (d: number) => ctl.adjustPool(path.id, d);

  // Scrolling adjusts the pool (needs a non-passive listener to stop the page scrolling).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => { e.preventDefault(); adjust.current(e.deltaY < 0 ? 1 : -1); };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="meter"
      aria-valuenow={pool.current}
      aria-valuemin={0}
      aria-valuemax={pool.max}
      aria-label={`${path.name}: ${pool.current} of ${pool.max}`}
      title="Scroll or use the arrow keys to adjust"
      onKeyDown={e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); adjust.current(1); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); adjust.current(-1); }
      }}
      className="rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-ns-resize"
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
              strokeWidth={lit ? 8 : 6}
              strokeLinecap="round"
              stroke={reserved ? 'rgba(255,107,74,0.35)' : lit ? path.accent : 'rgba(106,106,122,0.35)'}
              style={lit ? { filter: `drop-shadow(0 0 4px ${tint(path.accent, 0.8)})`, transition: 'all 200ms' } : { transition: 'all 200ms' }}
            />
          );
        })}
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R - 11} fill={tint(path.accent, 0.08)} />
        <foreignObject x={SIZE / 2 - 14} y={20} width={28} height={20}>
          <div className="flex justify-center">{path.icon(16)}</div>
        </foreignObject>
        <text x="50%" y={SIZE / 2 + 13} textAnchor="middle" className="font-display" fontSize="24" fill={path.accent}>{pool.current}</text>
        <text x="50%" y={SIZE / 2 + 28} textAnchor="middle" fontSize="10" fill="#8888a0">of {pool.max}</text>
      </svg>
    </div>
  );
};

/** One path as a column: the ring on top, quick controls, then every action with Use. */
const RingColumn: React.FC<{ ctl: TalentController; tracked: TrackedPath } & Pick<TrackerProps, 'onOpenPath' | 'onInfo'>> = ({
  ctl, tracked, onOpenPath, onInfo
}) => {
  const { path, pool, actions, constant } = tracked;
  return (
    <div className="flex flex-col rounded-lg border p-3 min-w-0"
      style={{ borderColor: tint(path.accent, 0.28), background: `linear-gradient(180deg, ${tint(path.accent, 0.08)}, rgba(10,10,15,0.5) 45%)` }}>
      <div className="flex flex-col items-center gap-1.5">
        <Ring ctl={ctl} tracked={tracked} />
        <span className="font-display text-sm tracking-wide text-ivory">{path.name}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => ctl.adjustPool(path.id, -1)} disabled={pool.current <= 0} aria-label={`Spend 1 ${path.name}`}
            className="w-6 h-6 rounded border border-gold-subtle text-fog hover:text-essence-fire disabled:opacity-30 flex items-center justify-center"><Minus size={11} /></button>
          <button onClick={() => refillPath(ctl, path.id)} disabled={pool.current >= pool.max} title={`Refill ${path.name}`}
            className="h-6 px-2 rounded border border-gold-subtle text-[11px] text-mist hover:text-gold disabled:opacity-30 inline-flex items-center gap-1"><RotateCcw size={11} /> Refill</button>
          <button onClick={() => ctl.adjustPool(path.id, 1)} disabled={pool.current >= pool.max} aria-label={`Regain 1 ${path.name}`}
            className="w-6 h-6 rounded border border-gold-subtle text-fog hover:text-essence-wood disabled:opacity-30 flex items-center justify-center"><Plus size={11} /></button>
          <PathLinkButton path={path} onOpenPath={onOpenPath} compact />
        </div>
        {/* Always rendered (hidden when empty) so ability lists line up across columns */}
        <p className={`text-[10px] text-mist ${pool.reserved > 0 ? '' : 'invisible'}`} aria-hidden={pool.reserved === 0}>
          <span className="text-essence-fire">{pool.reserved}</span> held by passives and cantrips
        </p>
      </div>
      {actions.length > 0 && (
        <ul className="mt-3 space-y-1 border-t pt-2" style={{ borderColor: tint(path.accent, 0.18) }}>
          {actions.map(a => (
            <li key={a.id} className="flex items-center gap-1.5">
              <AbilityIcon ability={a} path={path} status="learned" size={22} />
              <span className="flex-1 min-w-0 text-[13px] text-parchment truncate" title={a.name}>{a.name}</span>
              <UseButton ctl={ctl} ability={a} path={path} compact />
              <InfoButton ability={a} onInfo={onInfo} className="!p-0.5" />
            </li>
          ))}
        </ul>
      )}
      <AlwaysOnChips abilities={constant} path={path} onInfo={onInfo} className="mt-2" />
    </div>
  );
};

const COLUMN_MIN = 200;
const COLUMN_GAP = 12;
/** Section padding plus border, left and right. */
const SECTION_CHROME = 26;

/**
 * Size a tradition so every path column is the same width across traditions:
 * the basis is only the fixed chrome, and free space is shared per column.
 * The minimum width makes a tradition wrap to a new line before its columns
 * get too narrow.
 */
const columnSizing = (columns: number): React.CSSProperties => {
  const chrome = SECTION_CHROME + (columns - 1) * COLUMN_GAP;
  return { flexGrow: columns, flexBasis: chrome, minWidth: `min(100%, ${chrome + columns * COLUMN_MIN}px)` };
};

/**
 * Rings — a HUD with one column per path. Traditions sit side by side and grow
 * with their number of paths, so the whole width is used.
 */
const RingsTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath, onInfo }) => (
  <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-mist flex-1 min-w-[240px]">Scroll over a ring to adjust it · Use spends an ability's cost · ⓘ reads it</p>
      <RestButtons ctl={ctl} compact />
    </div>
    <div className="flex flex-wrap gap-4 items-stretch">
      {trackerGroups(ctl).map(g => (
        <section
          key={g.group.id}
          className="rounded-xl border p-3 flex flex-col"
          style={{ ...columnSizing(g.paths.length), borderColor: tint(g.group.accent, 0.3), background: tint(g.group.accent, 0.03) }}
        >
          <header className="flex items-baseline justify-between gap-3 mb-3 px-1">
            <h3 className="font-display text-[11px] tracking-[0.2em] uppercase" style={{ color: g.group.accent }}>{g.group.label}</h3>
            <span className="font-display text-xs tabular-nums text-fog">{g.current} / {g.max}</span>
          </header>
          <div className="flex-1 grid gap-3 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {g.paths.map(t => <RingColumn key={t.path.id} ctl={ctl} tracked={t} onOpenPath={onOpenPath} onInfo={onInfo} />)}
          </div>
        </section>
      ))}
    </div>
  </div>
);

export default RingsTracker;
