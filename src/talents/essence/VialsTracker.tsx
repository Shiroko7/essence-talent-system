import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { costOf, tint } from '../model';
import { AbilityIcon, RestButtons } from '../ui';
import { TrackedPath, TrackerProps, setPool, trackerGroups } from './shared';
import type { TalentController } from '../model';

const VIAL_HEIGHT = 168;

/**
 * One vial. Liquid height is the current pool; the striped cap is essence held
 * by passives. Click anywhere on the glass to set the level to that mark.
 */
const Vial: React.FC<{ ctl: TalentController; tracked: TrackedPath; onOpenPath?: (id: string) => void }> = ({ ctl, tracked, onOpenPath }) => {
  const { path, pool, actions } = tracked;
  const total = Math.max(1, pool.max + pool.reserved);
  const unit = VIAL_HEIGHT / total;

  const onGlassClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const fromBottom = rect.bottom - e.clientY;
    const value = Math.min(pool.max, Math.max(0, Math.round(fromBottom / unit)));
    setPool(ctl, path.id, value);
  };

  return (
    <div className="flex flex-col items-center gap-2 w-[92px]">
      <span className="font-display text-2xl tabular-nums leading-none" style={{ color: path.accent }}>
        {pool.current}<span className="text-sm text-mist">/{pool.max}</span>
      </span>

      <button
        onClick={onGlassClick}
        className="relative w-14 rounded-t-md rounded-b-[28px] overflow-hidden border-2 cursor-pointer"
        style={{
          height: VIAL_HEIGHT,
          borderColor: tint(path.accent, 0.55),
          background: 'linear-gradient(90deg, rgba(255,255,255,0.04), rgba(10,10,15,0.9) 40%, rgba(255,255,255,0.05))',
          boxShadow: `0 0 18px ${tint(path.accent, 0.15)}, inset 0 0 12px rgba(0,0,0,0.6)`
        }}
        aria-label={`${path.name}: ${pool.current} of ${pool.max}. Click to set.`}
        title="Click a mark to set the level"
      >
        {/* Reserved cap */}
        {pool.reserved > 0 && (
          <span
            className="absolute inset-x-0 top-0"
            style={{ height: pool.reserved * unit, background: 'repeating-linear-gradient(-45deg, transparent 0 4px, rgba(255,107,74,0.28) 4px 8px)' }}
          />
        )}
        {/* Liquid */}
        <span
          className="absolute inset-x-0 bottom-0 transition-all duration-500 ease-out"
          style={{
            height: pool.current * unit,
            background: `linear-gradient(180deg, ${tint(path.accent, 0.95)}, ${tint(path.accent, 0.55)})`,
            boxShadow: `0 0 16px ${tint(path.accent, 0.6)}`
          }}
        >
          <span className="absolute inset-x-0 top-0 h-1.5 bg-white/30" />
        </span>
        {/* Graduation marks */}
        {Array.from({ length: pool.max - 1 }).map((_, i) => (
          <span key={i} className="absolute left-0 w-3 h-px bg-white/25" style={{ bottom: (i + 1) * unit }} />
        ))}
        <span className="absolute top-2 bottom-6 left-2 w-1 rounded-full bg-white/10" />
      </button>

      <div className="flex items-center gap-1">
        <button onClick={() => ctl.adjustPool(path.id, -1)} disabled={pool.current <= 0} className="w-6 h-6 rounded-full border border-gold-subtle text-fog hover:text-essence-fire disabled:opacity-30 flex items-center justify-center" aria-label="Spend 1">
          <Minus size={11} />
        </button>
        <button onClick={() => ctl.adjustPool(path.id, 1)} disabled={pool.current >= pool.max} className="w-6 h-6 rounded-full border border-gold-subtle text-fog hover:text-essence-wood disabled:opacity-30 flex items-center justify-center" aria-label="Regain 1">
          <Plus size={11} />
        </button>
      </div>

      <button
        onClick={() => onOpenPath?.(path.id)}
        disabled={!onOpenPath}
        className={`font-display text-xs tracking-wide truncate max-w-full ${onOpenPath ? 'hover:underline underline-offset-4' : ''}`}
        style={{ color: path.accent }}
      >
        {path.name}
      </button>

      {/* Actions as icon buttons: tap to spend */}
      <div className="flex flex-wrap justify-center gap-1">
        {actions.map(a => {
          const cost = costOf(a);
          const disabled = pool.current < cost;
          return (
            <button
              key={a.id}
              onClick={() => ctl.spend(a, path.id)}
              disabled={disabled}
              title={`${a.name} — spend ${cost}`}
              className="relative disabled:opacity-35 disabled:cursor-not-allowed hover:scale-110 transition-transform"
            >
              <AbilityIcon ability={a} path={path} status="learned" size={28} />
              <span className="absolute -bottom-1 -right-1 min-w-[14px] h-[14px] px-0.5 rounded-full bg-void border text-[9px] font-display leading-[12px]" style={{ borderColor: path.accent, color: path.accent }}>
                {cost}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Vials — an alchemist's shelf. Each tradition is a shelf of glass vials whose
 * liquid is the pool: readable at a glance from across the table, set by clicking
 * the glass, spent by tapping an ability's icon beneath it.
 */
const VialsTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath }) => (
  <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-mist flex-1 min-w-[240px]">Click the glass to set a level · tap an icon to spend its cost · stripes are held by passives</p>
      <RestButtons ctl={ctl} compact />
    </div>
    <div className="flex flex-wrap gap-4">
      {trackerGroups(ctl).map(g => (
        <section key={g.group.id} className="rounded-xl border border-gold-subtle bg-obsidian/60 px-4 pt-3 pb-0 min-w-[200px]">
          <header className="flex items-baseline justify-between gap-4 mb-3">
            <h3 className="font-display text-xs tracking-[0.2em] uppercase" style={{ color: g.group.accent }}>{g.group.label}</h3>
            <span className="font-display text-xs tabular-nums text-fog">{g.current} / {g.max}</span>
          </header>
          <div className="flex flex-wrap justify-center gap-3 pb-4">
            {g.paths.map(t => <Vial key={t.path.id} ctl={ctl} tracked={t} onOpenPath={onOpenPath} />)}
          </div>
          {/* The shelf */}
          <div className="h-2 -mx-4 rounded-b-xl" style={{ background: `linear-gradient(180deg, ${tint(g.group.accent, 0.35)}, ${tint(g.group.accent, 0.08)})` }} />
        </section>
      ))}
    </div>
  </div>
);

export default VialsTracker;
