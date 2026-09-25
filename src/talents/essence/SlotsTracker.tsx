import React from 'react';
import { Lock, RotateCcw, X } from 'lucide-react';
import { costOf, tint } from '../model';
import { RestButtons } from '../ui';
import { TrackerProps, refillGroup, refillPath, setPool, trackerGroups } from './shared';

/**
 * Slots — the paper character sheet. Each point of essence is a box; you tick
 * boxes off as you spend, exactly like spell slots, and a rest clears them.
 * Traditions sit side by side as columns so they never blur together.
 */
const SlotsTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath }) => {
  const groups = trackerGroups(ctl);
  const cols = groups.length >= 3 ? 'lg:grid-cols-3' : groups.length === 2 ? 'md:grid-cols-2' : '';

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-mist flex-1 min-w-[240px]">Tick a box for each point you spend · a crossed box is spent · locked boxes are held by passives</p>
        <RestButtons ctl={ctl} compact />
      </div>
      <div className={`grid gap-4 ${cols}`}>
        {groups.map(g => (
          <section key={g.group.id} className="rounded-lg border border-gold-subtle bg-obsidian/60">
            <header className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: tint(g.group.accent, 0.35) }}>
              <h3 className="font-display text-xs tracking-[0.2em] uppercase" style={{ color: g.group.accent }}>{g.group.label}</h3>
              <button onClick={() => refillGroup(ctl, g)} className="text-[11px] text-mist hover:text-essence-wood inline-flex items-center gap-1" title={`Clear all ${g.group.label} boxes`}>
                <RotateCcw size={11} /> Clear
              </button>
            </header>
            <div className="divide-y divide-gold-subtle/50">
              {g.paths.map(({ path, pool, actions }) => {
                const spent = pool.max - pool.current;
                return (
                  <div key={path.id} className="px-4 py-3">
                    <div className="flex items-baseline gap-2 mb-2">
                      <button
                        onClick={() => onOpenPath?.(path.id)}
                        disabled={!onOpenPath}
                        className={`flex items-center gap-1.5 font-display text-sm ${onOpenPath ? 'hover:underline underline-offset-4' : ''}`}
                        style={{ color: path.accent }}
                      >
                        {path.icon(14)} {path.name}
                      </button>
                      <span className="text-xs text-fog tabular-nums">{pool.current} left</span>
                      {spent > 0 && (
                        <button onClick={() => refillPath(ctl, path.id)} className="ml-auto text-mist hover:text-gold" title="Clear boxes" aria-label={`Clear ${path.name}`}>
                          <RotateCcw size={12} />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from({ length: pool.max }).map((_, i) => {
                        const isSpent = i < spent;
                        return (
                          <button
                            key={i}
                            // Ticking box i marks i+1 spent; unticking it leaves i spent.
                            onClick={() => setPool(ctl, path.id, pool.max - (isSpent ? i : i + 1))}
                            className="w-7 h-7 rounded-[3px] border-2 flex items-center justify-center transition-colors"
                            style={{
                              borderColor: tint(path.accent, isSpent ? 0.35 : 0.8),
                              background: isSpent ? 'rgba(10,10,15,0.8)' : tint(path.accent, 0.14)
                            }}
                            aria-label={isSpent ? 'Spent' : 'Available'}
                          >
                            {isSpent && <X size={16} strokeWidth={2.5} className="text-mist" />}
                          </button>
                        );
                      })}
                      {Array.from({ length: pool.reserved }).map((_, i) => (
                        <span key={`r${i}`} className="w-7 h-7 rounded-[3px] border-2 border-dashed flex items-center justify-center" style={{ borderColor: 'rgba(255,107,74,0.35)' }} title="Held by a passive or cantrip">
                          <Lock size={11} className="text-essence-fire/60" />
                        </span>
                      ))}
                    </div>
                    {actions.length > 0 && (
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                        {actions.map(a => {
                          const cost = costOf(a);
                          return (
                            <button
                              key={a.id}
                              onClick={() => ctl.spend(a, path.id)}
                              disabled={pool.current < cost}
                              className="text-xs text-parchment hover:text-ivory disabled:text-mist disabled:cursor-not-allowed"
                              title={`Tick ${cost} box${cost > 1 ? 'es' : ''}`}
                            >
                              {a.name} <span className="font-display" style={{ color: path.accent }}>({cost})</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SlotsTracker;
