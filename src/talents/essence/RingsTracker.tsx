import React, { useEffect, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { tint } from '../model';
import type { TalentController } from '../model';
import { AbilityIcon, RestButtons, UseButton } from '../ui';
import { TrackedPath, TrackerProps, refillPath, trackerGroups } from './shared';

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
}> = ({ ctl, tracked, selected, onSelect }) => {
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
      onKeyDown={e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); adjust.current(1); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); adjust.current(-1); }
      }}
      className={`flex flex-col items-center gap-1 rounded-xl px-1.5 pt-1.5 pb-2 transition-all focus:outline-none ${selected ? '' : 'hover:bg-charcoal/40'}`}
      style={selected ? { background: tint(path.accent, 0.12), boxShadow: `0 0 0 1px ${tint(path.accent, 0.5)}` } : undefined}
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
    </button>
  );
};

/**
 * Rings — a game HUD. Every pool is a segmented ring, clustered by tradition.
 * Scroll over a ring (or focus it and use arrow keys) to adjust; select one to
 * open its tray with actions and quick controls.
 */
const RingsTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath }) => {
  const groups = trackerGroups(ctl);
  const all = groups.flatMap(g => g.paths);
  const [selectedId, setSelectedId] = useState<string | null>(all[0]?.path.id ?? null);
  const selected = all.find(t => t.path.id === selectedId) ?? all[0];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-mist flex-1 min-w-[240px]">Scroll over a ring to adjust · select it for actions</p>
        <RestButtons ctl={ctl} compact />
      </div>

      <div className="flex flex-wrap items-stretch gap-3">
        {groups.map(g => (
          <section key={g.group.id} className="rounded-2xl border px-2 pt-2" style={{ borderColor: tint(g.group.accent, 0.3), background: tint(g.group.accent, 0.03) }}>
            <p className="text-center font-display text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: g.group.accent }}>
              {g.group.label} <span className="text-fog tracking-normal">{g.current}/{g.max}</span>
            </p>
            <div className="flex flex-wrap justify-center">
              {g.paths.map(t => (
                <Ring key={t.path.id} ctl={ctl} tracked={t} selected={t.path.id === selected?.path.id} onSelect={() => setSelectedId(t.path.id)} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Tray for the selected ring */}
      {selected && (
        <div className="rounded-xl border p-4 animate-fade-in" style={{ borderColor: tint(selected.path.accent, 0.4), background: `linear-gradient(135deg, ${tint(selected.path.accent, 0.1)}, rgba(18,18,26,0.9) 60%)` }}>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="font-display text-lg tracking-wide" style={{ color: selected.path.accent }}>{selected.path.name}</h3>
            <div className="flex items-center gap-1">
              <button onClick={() => ctl.adjustPool(selected.path.id, -1)} disabled={selected.pool.current <= 0} className="w-7 h-7 rounded border border-gold-subtle text-fog hover:text-essence-fire disabled:opacity-30 flex items-center justify-center"><Minus size={13} /></button>
              <span className="font-display text-xl tabular-nums w-14 text-center text-ivory">{selected.pool.current}<span className="text-xs text-mist">/{selected.pool.max}</span></span>
              <button onClick={() => ctl.adjustPool(selected.path.id, 1)} disabled={selected.pool.current >= selected.pool.max} className="w-7 h-7 rounded border border-gold-subtle text-fog hover:text-essence-wood disabled:opacity-30 flex items-center justify-center"><Plus size={13} /></button>
              <button onClick={() => refillPath(ctl, selected.path.id)} className="ml-1 text-xs text-mist hover:text-gold inline-flex items-center gap-1"><RotateCcw size={12} /> Refill</button>
            </div>
            {onOpenPath && (
              <button onClick={() => onOpenPath(selected.path.id)} className="ml-auto text-xs font-display text-gold hover:text-gold-bright">Open tree →</button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {selected.actions.map(a => (
              <div key={a.id} className="flex items-center gap-2 rounded-md border border-gold-subtle bg-void/50 px-2 py-1.5">
                <AbilityIcon ability={a} path={selected.path} status="learned" size={26} />
                <span className="flex-1 text-sm text-parchment truncate">{a.name}</span>
                <UseButton ctl={ctl} ability={a} path={selected.path} compact />
              </div>
            ))}
          </div>
          {selected.constant.length > 0 && (
            <p className="text-xs text-mist mt-3">Always on · {selected.constant.map(a => a.name).join(', ')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RingsTracker;
