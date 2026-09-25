import React, { useState } from 'react';
import { Info, Minus, Plus } from 'lucide-react';
import { costOf, tint } from '../model';
import type { SystemGroup } from '../model';
import { DaoPanel, Manifestations, StageBadge } from './DaoBody';
import { pathStage, useFigure } from './dao';
import { AbilityIcon, PathLinkButton, RestButtons } from '../ui';
import { Ability } from '../../types/essence';
import { TrackedPath, TrackerProps, setPool, trackerGroups } from './shared';
import type { TalentController } from '../model';

const VIAL_HEIGHT = 220;

/**
 * One vial. Liquid height is the current pool; the striped cap is essence held
 * by passives. Click anywhere on the glass to set the level to that mark.
 */
const Vial: React.FC<{
  ctl: TalentController; tracked: TrackedPath; onOpenPath?: (id: string) => void; onInfo?: (a: Ability) => void;
  highlighted?: boolean; onHover?: (id: string | null) => void;
}> = ({ ctl, tracked, onOpenPath, onInfo, highlighted, onHover }) => {
  const { path, pool, actions, constant } = tracked;
  const total = Math.max(1, pool.max + pool.reserved);
  const unit = VIAL_HEIGHT / total;

  const onGlassClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const fromBottom = rect.bottom - e.clientY;
    const value = Math.min(pool.max, Math.max(0, Math.round(fromBottom / unit)));
    setPool(ctl, path.id, value);
  };

  return (
    <div
      className="flex flex-col items-center gap-2 w-[104px] rounded-lg py-2 transition-colors"
      style={highlighted ? { background: tint(path.accent, 0.08) } : undefined}
      onMouseEnter={() => onHover?.(path.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <span className="font-display text-2xl tabular-nums leading-none" style={{ color: path.accent }}>
        {pool.current}<span className="text-sm text-mist">/{pool.max}</span>
      </span>

      <button
        onClick={onGlassClick}
        className="relative w-16 rounded-t-md rounded-b-[28px] overflow-hidden border-2 cursor-pointer"
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

      <span className="font-display text-xs tracking-wide truncate max-w-full" style={{ color: path.accent }}>{path.name}</span>
      <StageBadge level={pathStage(ctl, path.id)} accent={path.accent} />
      <PathLinkButton path={path} onOpenPath={onOpenPath} compact />

      {/* Actions as icon buttons: tap to spend, the corner badge opens details */}
      <div className="flex flex-wrap justify-center gap-1.5 pt-1">
        {actions.map(a => {
          const cost = costOf(a);
          const disabled = pool.current < cost;
          return (
            <span key={a.id} className="relative">
              <button
                onClick={() => ctl.spend(a, path.id)}
                disabled={disabled}
                title={`${a.name} — spend ${cost}`}
                className="block disabled:opacity-35 disabled:cursor-not-allowed hover:scale-110 transition-transform"
              >
                <AbilityIcon ability={a} path={path} status="learned" size={30} />
                <span className="absolute -bottom-1 -right-1 min-w-[14px] h-[14px] px-0.5 rounded-full bg-void border text-[9px] font-display leading-[12px]" style={{ borderColor: path.accent, color: path.accent }}>
                  {cost}
                </span>
              </button>
              {onInfo && (
                <button
                  onClick={() => onInfo(a)}
                  className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-void border border-gold-subtle text-mist hover:text-gold hover:border-gold flex items-center justify-center"
                  title={`Read ${a.name}`}
                  aria-label={`Read ${a.name}`}
                >
                  <Info size={10} />
                </button>
              )}
            </span>
          );
        })}
      </div>
      {constant.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1" title="Always on">
          {constant.map(a => (
            <button key={a.id} onClick={() => onInfo?.(a)} disabled={!onInfo} title={`${a.name} (always on)`} className="opacity-70 hover:opacity-100">
              <AbilityIcon ability={a} path={path} status="learned" size={20} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/** Split paths into two wings, keeping each tradition's paths together in runs. */
const splitWings = (paths: (TrackedPath & { group: SystemGroup })[]) => {
  const half = Math.ceil(paths.length / 2);
  return [paths.slice(0, half), paths.slice(half)];
};

const runsByGroup = (paths: (TrackedPath & { group: SystemGroup })[]) =>
  paths.reduce<{ group: SystemGroup; paths: TrackedPath[] }[]>((runs, t) => {
    const last = runs[runs.length - 1];
    if (last && last.group.id === t.group.id) last.paths.push(t);
    else runs.push({ group: t.group, paths: [t] });
    return runs;
  }, []);

/**
 * Vials — an alchemist's body. The cultivator stands in the middle with the Dao
 * Tree inside; each path's pool is a glass vial on the shelves either side.
 * Hover a vial to light its strand in the body, click the glass to set a level,
 * tap an ability's icon to spend its cost.
 */
const VialsTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath, onInfo }) => {
  const [figure, setFigure] = useFigure();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const groups = trackerGroups(ctl);
  const flat = groups.flatMap(g => g.paths.map(t => ({ ...t, group: g.group })));
  const wings = splitWings(flat);

  const wing = (paths: typeof flat, side: 'left' | 'right') => (
    <section className="flex-1 rounded-xl border border-gold-subtle bg-obsidian/60 overflow-hidden flex flex-col">
      <div className={`flex flex-wrap gap-x-6 gap-y-4 px-4 pt-3 pb-4 ${side === 'left' ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}>
        {runsByGroup(paths).map((run, i) => (
          <div key={`${run.group.id}${i}`}>
            <header className="flex items-baseline justify-between gap-3 mb-2 border-b pb-1" style={{ borderColor: tint(run.group.accent, 0.25) }}>
              <h3 className="font-display text-[11px] tracking-[0.2em] uppercase" style={{ color: run.group.accent }}>{run.group.label}</h3>
              <span className="font-display text-[11px] tabular-nums text-fog">
                {run.paths.reduce((n, t) => n + t.pool.current, 0)} / {run.paths.reduce((n, t) => n + t.pool.max, 0)}
              </span>
            </header>
            <div className="flex flex-wrap justify-center gap-2">
              {run.paths.map(t => (
                <Vial key={t.path.id} ctl={ctl} tracked={t} onOpenPath={onOpenPath} onInfo={onInfo}
                  highlighted={hoverId === t.path.id} onHover={setHoverId} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto h-2" style={{ background: 'linear-gradient(180deg, rgba(201,169,89,0.3), rgba(201,169,89,0.06))' }} />
    </section>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-mist flex-1 min-w-[240px]">Click the glass to set a level · tap an icon to spend its cost · ⓘ reads it · stripes are held by passives</p>
        <RestButtons ctl={ctl} compact />
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)_minmax(0,1fr)] items-stretch">
        <DaoPanel ctl={ctl} paths={flat} figure={figure} onFigure={setFigure} highlightId={hoverId} onHover={setHoverId} onInfo={onInfo}
          showManifestations={false} />
        <div className="flex flex-col gap-4 lg:order-first">
          {wing(wings[0], 'left')}
        </div>
        <div className="flex flex-col gap-4">
          {wing(wings[1], 'right')}
          {flat.some(t => t.constant.length > 0) && (
            <div className="rounded-xl border border-gold-subtle bg-obsidian/60 p-4">
              <Manifestations paths={flat} onInfo={onInfo} onHover={setHoverId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VialsTracker;
