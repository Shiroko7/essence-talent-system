import React, { useEffect, useState } from 'react';
import { History, Minus, Moon, Plus, Undo2 } from 'lucide-react';
import { costOf, tint } from '../model';
import type { TalentController } from '../model';
import { AbilityIcon, AlwaysOnChips, EmptyState, InfoButton, PathLinkButton, PathSigil } from '../ui';
import { TrackerProps, trackerGroups } from './shared';

interface LogEntry {
  id: number;
  at: string;
  label: string;
  /** Pool changes this entry made, so it can be reversed. */
  deltas: Record<string, number>;
  undone?: boolean;
}

const storageKey = (version: string) => `essence-cast-log-${version}`;

const loadLog = (version: string): LogEntry[] => {
  try {
    return JSON.parse(sessionStorage.getItem(storageKey(version)) || '[]');
  } catch {
    return [];
  }
};

/** Session log of every essence change, with undo per entry. */
const useCastLog = (ctl: TalentController) => {
  const version = ctl.system.version;
  const [log, setLog] = useState<LogEntry[]>(() => loadLog(version));

  useEffect(() => {
    try { sessionStorage.setItem(storageKey(version), JSON.stringify(log.slice(0, 60))); } catch { /* storage unavailable */ }
  }, [log, version]);

  const record = (label: string, deltas: Record<string, number>) => {
    const effective = Object.fromEntries(Object.entries(deltas).filter(([, d]) => d !== 0));
    if (!Object.keys(effective).length) return;
    Object.entries(effective).forEach(([pathId, d]) => ctl.adjustPool(pathId, d));
    const at = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLog(prev => [{ id: Date.now() + Math.random(), at, label, deltas: effective }, ...prev]);
  };

  const undo = (entry: LogEntry) => {
    Object.entries(entry.deltas).forEach(([pathId, d]) => ctl.adjustPool(pathId, -d));
    setLog(prev => prev.map(e => (e.id === entry.id ? { ...e, undone: true } : e)));
  };

  return { log, record, undo, clear: () => setLog([]) };
};

/**
 * Cast log — action first. Every learned ability is a button that spends its
 * cost; every change (spends, ±1, rests) lands in a session log you can undo
 * entry by entry, so a misclick mid-combat is one tap to fix.
 */
const CastLogTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath, onInfo }) => {
  const groups = trackerGroups(ctl);
  const { log, record, undo, clear } = useCastLog(ctl);

  const longRest = () => record('Long rest', Object.fromEntries(
    groups.flatMap(g => g.paths.map(t => [t.path.id, t.pool.max - t.pool.current]))
  ));

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-4 items-start">
      <div className="space-y-4">
        {groups.map(g => (
          <section key={g.group.id}>
            <h3 className="font-display text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: g.group.accent }}>
              {g.group.label} <span className="text-fog tracking-normal">· {g.current}/{g.max}</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {g.paths.map(({ path, pool, actions, constant }) => (
                <div key={path.id} className="rounded-lg border p-3" style={{ borderColor: tint(path.accent, 0.3), background: tint(path.accent, 0.04) }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-2 flex-1 min-w-0">
                      <PathSigil path={path} size={28} active />
                      <span className="font-display text-sm truncate" style={{ color: path.accent }}>{path.name}</span>
                      <PathLinkButton path={path} onOpenPath={onOpenPath} compact />
                    </span>
                    <button onClick={() => record(`${path.name} −1`, { [path.id]: -Math.min(1, pool.current) })} disabled={pool.current <= 0}
                      className="w-6 h-6 rounded border border-gold-subtle text-fog hover:text-essence-fire disabled:opacity-30 flex items-center justify-center" aria-label="Spend 1">
                      <Minus size={11} />
                    </button>
                    <span className="font-display text-xl tabular-nums w-14 text-center" style={{ color: path.accent }}>
                      {pool.current}<span className="text-xs text-mist">/{pool.max}</span>
                    </span>
                    <button onClick={() => record(`${path.name} +1`, { [path.id]: pool.current < pool.max ? 1 : 0 })} disabled={pool.current >= pool.max}
                      className="w-6 h-6 rounded border border-gold-subtle text-fog hover:text-essence-wood disabled:opacity-30 flex items-center justify-center" aria-label="Regain 1">
                      <Plus size={11} />
                    </button>
                  </div>
                  {/* Usable pool, then striped segments held by passives and cantrips */}
                  <div className={`flex gap-0.5 ${pool.reserved > 0 ? 'mb-1' : 'mb-3'}`}>
                    {Array.from({ length: pool.max }).map((_, i) => (
                      <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < pool.current ? path.accent : 'rgba(106,106,122,0.3)' }} />
                    ))}
                    {Array.from({ length: pool.reserved }).map((_, i) => (
                      <span
                        key={`r${i}`}
                        className="h-1.5 flex-1 rounded-full"
                        title="Held by passives and cantrips"
                        style={{ background: 'repeating-linear-gradient(-45deg, rgba(255,107,74,0.15) 0 2px, rgba(255,107,74,0.45) 2px 4px)' }}
                      />
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
                            onClick={() => record(a.name, { [path.id]: -cost })}
                            disabled={pool.current < cost}
                            className="flex-1 min-w-0 flex items-center gap-2.5 rounded-md border px-2 py-1.5 text-left transition-all hover:-translate-y-px disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            style={{ borderColor: tint(path.accent, 0.3), background: 'rgba(10,10,15,0.6)' }}
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

      {/* Session log */}
      <aside className="rounded-lg border border-gold-subtle bg-obsidian/70 lg:sticky lg:top-4">
        <header className="flex items-center gap-2 px-3 py-2 border-b border-gold-subtle">
          <History size={14} className="text-gold" />
          <span className="font-display text-xs tracking-widest uppercase text-ivory flex-1">Session log</span>
          <button onClick={longRest} className="text-[11px] font-display text-essence-wood hover:brightness-125 inline-flex items-center gap-1">
            <Moon size={11} /> Long rest
          </button>
        </header>
        <ul className="max-h-[420px] overflow-y-auto">
          {log.length === 0 && <EmptyState title="Nothing spent yet">Every spend and rest shows up here, with undo.</EmptyState>}
          {log.map(entry => (
            <li key={entry.id} className={`flex items-center gap-2 px-3 py-1.5 border-b border-gold-subtle/40 text-sm ${entry.undone ? 'opacity-40 line-through' : ''}`}>
              <span className="text-[10px] text-mist tabular-nums w-10">{entry.at}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-parchment truncate">{entry.label}</span>
                <span className="flex flex-wrap gap-x-2 text-[11px] font-display tabular-nums">
                  {Object.entries(entry.deltas).map(([pathId, d]) => {
                    const p = ctl.system.paths.find(x => x.id === pathId);
                    return <span key={pathId} style={{ color: p?.accent }}>{d > 0 ? '+' : '−'}{Math.abs(d)} {p?.name}</span>;
                  })}
                </span>
              </span>
              {!entry.undone && (
                <button onClick={() => undo(entry)} className="text-mist hover:text-gold p-1" aria-label={`Undo ${entry.label}`} title="Undo">
                  <Undo2 size={13} />
                </button>
              )}
            </li>
          ))}
        </ul>
        {log.length > 0 && (
          <button onClick={clear} className="w-full text-[11px] text-mist hover:text-parchment py-1.5">Clear log</button>
        )}
      </aside>
    </div>
  );
};

export default CastLogTracker;
