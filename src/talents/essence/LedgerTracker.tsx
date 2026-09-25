import React, { useEffect, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { costOf, tint } from '../model';
import { PathSigil, RestButtons } from '../ui';
import { TrackedPath, TrackerProps, refillGroup, refillPath, setPool, trackerGroups } from './shared';
import type { TalentController } from '../model';

/** Exact-value field: type a number and press Enter (or leave the field). */
const ValueInput: React.FC<{ ctl: TalentController; tracked: TrackedPath }> = ({ ctl, tracked }) => {
  const { path, pool } = tracked;
  const current = pool.current;
  const [draft, setDraft] = useState(String(current));
  useEffect(() => setDraft(String(current)), [current]);
  const commit = () => {
    const value = Number(draft);
    if (Number.isFinite(value)) setPool(ctl, path.id, Math.round(value));
    else setDraft(String(pool.current));
  };
  return (
    <span className="inline-flex items-baseline gap-1 font-display tabular-nums whitespace-nowrap">
      <input
        value={draft}
        onChange={e => setDraft(e.target.value.replace(/[^0-9]/g, ''))}
        onBlur={commit}
        onKeyDown={e => {
          if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
          if (e.key === 'ArrowUp') { e.preventDefault(); ctl.adjustPool(path.id, 1); }
          if (e.key === 'ArrowDown') { e.preventDefault(); ctl.adjustPool(path.id, -1); }
        }}
        inputMode="numeric"
        aria-label={`${path.name} essence`}
        className="w-10 text-center text-xl bg-void/60 border border-gold-subtle rounded focus:border-gold focus:outline-none py-0.5"
        style={{ color: path.accent }}
      />
      <span className="text-mist text-sm">/ {pool.max}</span>
    </span>
  );
};

/**
 * Ledger — the character-sheet resource table. One row per path, exact values you
 * can type, quick ±1 and refill, and the path's actions as spend chips. Dense and
 * fast; everything is visible without clicking into anything.
 */
const LedgerTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath }) => {
  const groups = trackerGroups(ctl);
  const iconBtn = 'w-7 h-7 rounded border border-gold-subtle text-fog flex items-center justify-center disabled:opacity-30 transition-colors';

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <p className="text-xs text-mist flex-1 min-w-[240px]">Type an exact value (↑ ↓ work too), use ±1, or click an ability to spend its cost</p>
        <RestButtons ctl={ctl} compact />
      </div>
      <div className="rounded-lg border border-gold-subtle overflow-hidden">
        {groups.map(g => (
          <div key={g.group.id}>
            <div className="flex items-center gap-3 px-3 py-1.5 border-b border-gold-subtle" style={{ background: tint(g.group.accent, 0.08) }}>
              <span className="font-display text-[11px] tracking-[0.2em] uppercase" style={{ color: g.group.accent }}>{g.group.label}</span>
              <span className="font-display text-xs tabular-nums text-fog">{g.current} / {g.max}</span>
              <button onClick={() => refillGroup(ctl, g)} className="ml-auto text-[11px] font-display text-mist hover:text-essence-wood inline-flex items-center gap-1">
                <RotateCcw size={11} /> Refill {g.group.label.toLowerCase()}
              </button>
            </div>
            {g.paths.map(tracked => {
              const { path, pool, actions, constant } = tracked;
              const pct = pool.max ? (pool.current / pool.max) * 100 : 0;
              return (
                <div key={path.id} className="grid grid-cols-[minmax(120px,160px)_auto_1fr] md:grid-cols-[160px_auto_auto_1fr] items-center gap-x-4 gap-y-2 px-3 py-2.5 border-b border-gold-subtle/50 last:border-b-0">
                  <button
                    onClick={() => onOpenPath?.(path.id)}
                    disabled={!onOpenPath}
                    className="flex items-center gap-2 min-w-0 text-left group"
                    title={onOpenPath ? `Open the ${path.name} tree` : undefined}
                  >
                    <PathSigil path={path} size={26} active />
                    <span className={`font-display text-sm truncate underline-offset-4 ${onOpenPath ? 'group-hover:underline' : ''}`} style={{ color: path.accent }}>{path.name}</span>
                  </button>

                  <ValueInput ctl={ctl} tracked={tracked} />

                  <div className="flex items-center gap-1">
                    <button onClick={() => ctl.adjustPool(path.id, -1)} disabled={pool.current <= 0} className={`${iconBtn} hover:text-essence-fire hover:border-essence-fire/60`} aria-label="Spend 1">
                      <Minus size={13} />
                    </button>
                    <button onClick={() => ctl.adjustPool(path.id, 1)} disabled={pool.current >= pool.max} className={`${iconBtn} hover:text-essence-wood hover:border-essence-wood/60`} aria-label="Regain 1">
                      <Plus size={13} />
                    </button>
                    <button onClick={() => refillPath(ctl, path.id)} disabled={pool.current >= pool.max} className={`${iconBtn} hover:text-gold hover:border-gold/60`} aria-label={`Refill ${path.name}`} title="Refill">
                      <RotateCcw size={12} />
                    </button>
                  </div>

                  <div className="col-span-3 md:col-span-1 min-w-0">
                    <div className="h-1.5 rounded-full bg-void/80 overflow-hidden mb-2">
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: path.accent }} />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {actions.map(a => {
                        const cost = costOf(a);
                        return (
                          <button
                            key={a.id}
                            onClick={() => ctl.spend(a, path.id)}
                            disabled={pool.current < cost}
                            className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs border transition-colors disabled:opacity-35 disabled:cursor-not-allowed hover:bg-charcoal"
                            style={{ borderColor: tint(path.accent, 0.35), color: '#f0ece0' }}
                            title={`Spend ${cost} ${path.name}`}
                          >
                            {a.name}
                            <span className="font-display" style={{ color: path.accent }}>−{cost}</span>
                          </button>
                        );
                      })}
                      {constant.length > 0 && (
                        <span className="text-[11px] text-mist" title={constant.map(a => a.name).join(', ')}>
                          +{pool.reserved} held by {constant.length} passive{constant.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LedgerTracker;
