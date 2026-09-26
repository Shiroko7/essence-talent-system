import React, { useEffect, useRef } from 'react';
import { tint } from '../model';
import type { TalentController } from '../model';
import { AbilityIcon, AlwaysOnChips, InfoButton, PathLinkButton, PathSigil, RestButtons, UseButton } from '../ui';
import { PoolSources, PoolStepper, PoolTitle } from './PoolParts';
import { TrackedPath, TrackedPool, TrackerProps, poolGrid, trackedPools } from './shared';

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
const Ring: React.FC<{ ctl: TalentController; tracked: TrackedPool }> = ({ ctl, tracked }) => {
  const { pool, status, shared, paths } = tracked;
  const total = Math.max(1, status.max + status.reserved);
  const step = 360 / total;
  // Narrow the gaps as a family pool grows, so many segments still read as a ring.
  const gap = Math.min(GAP_DEG, step * 0.35);
  const ref = useRef<HTMLDivElement>(null);
  const adjust = useRef((d: number) => ctl.adjustPool(pool.id, d));
  adjust.current = (d: number) => ctl.adjustPool(pool.id, d);

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
      aria-valuenow={status.current}
      aria-valuemin={0}
      aria-valuemax={status.max}
      aria-label={`${pool.label}: ${status.current} of ${status.max}`}
      title="Scroll or use the arrow keys to adjust"
      onKeyDown={e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); adjust.current(1); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); adjust.current(-1); }
      }}
      className="rounded-full flex-shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-ns-resize"
    >
      <svg width={SIZE} height={SIZE}>
        {Array.from({ length: total }).map((_, i) => {
          const from = i * step + gap / 2;
          const to = (i + 1) * step - gap / 2;
          const reserved = i >= status.max;
          const lit = i < status.current;
          const color = shared ? pool.accent : paths[0].path.accent;
          return (
            <path
              key={i}
              d={arc(from, Math.max(from + 1, to))}
              fill="none"
              strokeWidth={lit ? 8 : 6}
              strokeLinecap={gap > 2 ? 'round' : 'butt'}
              stroke={reserved ? 'rgba(255,107,74,0.35)' : lit ? color : 'rgba(106,106,122,0.35)'}
              style={lit ? { filter: `drop-shadow(0 0 4px ${tint(color, 0.8)})`, transition: 'all 200ms' } : { transition: 'all 200ms' }}
            />
          );
        })}
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R - 11} fill={tint(pool.accent, 0.08)} />
        {!shared && (
          <foreignObject x={SIZE / 2 - 14} y={20} width={28} height={20}>
            <div className="flex justify-center">{paths[0].path.icon(16)}</div>
          </foreignObject>
        )}
        <text x="50%" y={SIZE / 2 + (shared ? 6 : 13)} textAnchor="middle" className="font-display" fontSize={shared ? 28 : 24} fill={pool.accent}>{status.current}</text>
        <text x="50%" y={SIZE / 2 + (shared ? 22 : 28)} textAnchor="middle" fontSize="10" fill="#8888a0">of {status.max}</text>
      </svg>
    </div>
  );
};

/** One path's learned abilities, each with Use; titled when it shares a family pool. */
const PathColumn: React.FC<{ ctl: TalentController; tracked: TrackedPath; titled: boolean } & Pick<TrackerProps, 'onOpenPath' | 'onInfo'>> = ({
  ctl, tracked: { path, actions, constant }, titled, onOpenPath, onInfo
}) => (
  <div className="flex flex-col rounded-lg border p-3 min-w-0"
    style={{ borderColor: tint(path.accent, 0.28), background: `linear-gradient(180deg, ${tint(path.accent, 0.08)}, rgba(10,10,15,0.5) 45%)` }}>
    {titled && (
      <div className="flex items-center gap-2 mb-2">
        <PathSigil path={path} size={22} active />
        <span className="flex-1 min-w-0 font-display text-sm tracking-wide truncate" style={{ color: path.accent }}>{path.name}</span>
        <PathLinkButton path={path} onOpenPath={onOpenPath} compact />
      </div>
    )}
    {actions.length > 0 && (
      <ul className={`space-y-1 ${titled ? 'border-t pt-2' : ''}`} style={{ borderColor: tint(path.accent, 0.18) }}>
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

/** One pool: its ring and controls on top, then a column per path that draws on it. */
const PoolSection: React.FC<{ ctl: TalentController; tracked: TrackedPool } & Pick<TrackerProps, 'onOpenPath' | 'onInfo'>> = ({
  ctl, tracked, onOpenPath, onInfo
}) => {
  const { pool, shared, paths } = tracked;
  const single = paths[0].path;
  return (
    <section
      className="rounded-xl border p-3 min-w-0 flex flex-col gap-3 md:grid md:grid-rows-subgrid md:row-span-2 md:gap-y-3 md:mb-4"
      style={{ borderColor: tint(pool.accent, 0.3), background: tint(pool.accent, 0.03) }}
    >
      <header className="flex items-center gap-4 px-1">
        <Ring ctl={ctl} tracked={tracked} />
        <div className="flex-1 min-w-0 space-y-2">
          {shared ? (
            <PoolTitle pool={pool} resourceName={ctl.system.resourceName} />
          ) : (
            <h3 className="font-display text-sm tracking-wide truncate" style={{ color: single.accent }}>{single.name}</h3>
          )}
          <div className="flex items-center gap-1">
            <PoolStepper ctl={ctl} tracked={tracked} showValue={false} />
            {!shared && <PathLinkButton path={single} onOpenPath={onOpenPath} compact />}
          </div>
          <PoolSources tracked={tracked} />
        </div>
      </header>
      <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        {paths.map(t => <PathColumn key={t.path.id} ctl={ctl} tracked={t} titled={shared} onOpenPath={onOpenPath} onInfo={onInfo} />)}
      </div>
    </section>
  );
};

/**
 * Rings — a HUD with one ring per essence pool. A family's ring sits over a
 * column for each of its paths; every pool gets an equal share of the width.
 */
const RingsTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath, onInfo }) => {
  const pools = trackedPools(ctl);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-mist flex-1 min-w-[240px]">
          Scroll over a ring to adjust it · Use spends an ability's cost · ⓘ reads it
          {ctl.system.sharedPools && ' · every path in a family draws on the same pool'}
        </p>
        <RestButtons ctl={ctl} compact />
      </div>
      <div {...poolGrid(pools.length)}>
        {pools.map(t => <PoolSection key={t.pool.id} ctl={ctl} tracked={t} onOpenPath={onOpenPath} onInfo={onInfo} />)}
      </div>
    </div>
  );
};

export default RingsTracker;
