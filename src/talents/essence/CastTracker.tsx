import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { costOf, tint } from '../model';
import { AbilityIcon, AlwaysOnChips, InfoButton, PathLinkButton, PathSigil, RestButtons } from '../ui';
import { TrackerProps, trackerGroups } from './shared';

/**
 * Cast — action first. Every learned ability is a button that spends its cost;
 * each path's bar shows what is left, what is spent, and what passives hold.
 */
const CastTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath, onInfo }) => (
  <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-mist flex-1 min-w-[240px]">Tap an ability to spend its cost · ± adjusts a pool by one · ⓘ reads an ability</p>
      <RestButtons ctl={ctl} compact />
    </div>
    <div className="flex flex-wrap gap-x-4 gap-y-5">
    {trackerGroups(ctl).map(g => (
      <section key={g.group.id} className="min-w-0" style={{ flexGrow: g.paths.length, flexBasis: g.paths.length * 330 }}>
        <h3 className="font-display text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: g.group.accent }}>
          {g.group.label} <span className="text-fog tracking-normal">· {g.current}/{g.max}</span>
        </h3>
        <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {g.paths.map(({ path, pool, actions, constant }) => (
            <div key={path.id} className="rounded-lg border p-3" style={{ borderColor: tint(path.accent, 0.3), background: tint(path.accent, 0.04) }}>
              <div className="flex items-center gap-2 mb-2">
                <PathSigil path={path} size={28} active />
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-sm truncate" style={{ color: path.accent }}>{path.name}</span>
                  <PathLinkButton path={path} onOpenPath={onOpenPath} compact />
                </span>
                <button onClick={() => ctl.adjustPool(path.id, -1)} disabled={pool.current <= 0}
                  className="w-6 h-6 rounded border border-gold-subtle text-fog hover:text-essence-fire disabled:opacity-30 flex items-center justify-center" aria-label={`Spend 1 ${path.name}`}>
                  <Minus size={11} />
                </button>
                <span className="font-display text-xl tabular-nums w-14 text-center" style={{ color: path.accent }}>
                  {pool.current}<span className="text-xs text-mist">/{pool.max}</span>
                </span>
                <button onClick={() => ctl.adjustPool(path.id, 1)} disabled={pool.current >= pool.max}
                  className="w-6 h-6 rounded border border-gold-subtle text-fog hover:text-essence-wood disabled:opacity-30 flex items-center justify-center" aria-label={`Regain 1 ${path.name}`}>
                  <Plus size={11} />
                </button>
              </div>
              {/* Usable pool, then striped segments held by passives and cantrips */}
              <div className={`flex gap-0.5 ${pool.reserved > 0 ? 'mb-1' : 'mb-3'}`}>
                {Array.from({ length: pool.max }).map((_, i) => (
                  <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < pool.current ? path.accent : 'rgba(106,106,122,0.3)' }} />
                ))}
                {Array.from({ length: pool.reserved }).map((_, i) => (
                  <span key={`r${i}`} className="h-1.5 flex-1 rounded-full" title="Held by passives and cantrips"
                    style={{ background: 'repeating-linear-gradient(-45deg, rgba(255,107,74,0.15) 0 2px, rgba(255,107,74,0.45) 2px 4px)' }} />
                ))}
              </div>
              {pool.reserved > 0 && (
                <p className="text-[11px] text-mist mb-3">
                  Max reduced by <span className="text-essence-fire">{pool.reserved}</span> held by passives and cantrips
                </p>
              )}
              <div className="space-y-1.5">
                {actions.map(a => {
                  const cost = costOf(a);
                  return (
                    <div key={a.id} className="flex items-center gap-1">
                      <button
                        onClick={() => ctl.spend(a, path.id)}
                        disabled={pool.current < cost}
                        className="flex-1 min-w-0 flex items-center gap-2.5 rounded-md border px-2 py-1.5 text-left transition-all hover:-translate-y-px disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        style={{ borderColor: tint(path.accent, 0.3), background: 'rgba(10,10,15,0.6)' }}
                        title={`Spend ${cost} ${path.name} essence`}
                      >
                        <AbilityIcon ability={a} path={path} status="learned" size={26} />
                        <span className="flex-1 text-sm text-parchment truncate">{a.name}</span>
                        <span className="font-display text-sm tabular-nums" style={{ color: path.accent }}>−{cost}</span>
                      </button>
                      <InfoButton ability={a} onInfo={onInfo} />
                    </div>
                  );
                })}
              </div>
              <AlwaysOnChips abilities={constant} path={path} onInfo={onInfo} className="mt-2" />
            </div>
          ))}
        </div>
      </section>
    ))}
    </div>
  </div>
);

export default CastTracker;
