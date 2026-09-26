import React from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { EssencePool, TalentController, tint } from '../model';
import { TrackedPool, refillPool } from './shared';

/** −, current / max, + and refill for one pool. The value can be left to a gauge that already shows it. */
export const PoolStepper: React.FC<{ ctl: TalentController; tracked: TrackedPool; size?: 'md' | 'lg'; showValue?: boolean }> = ({
  ctl, tracked, size = 'md', showValue = true
}) => {
  const { pool, status } = tracked;
  const step = 'w-6 h-6 rounded border border-gold-subtle text-fog disabled:opacity-30 flex items-center justify-center';
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => ctl.adjustPool(pool.id, -1)} disabled={status.current <= 0}
        className={`${step} hover:text-essence-fire`} aria-label={`Spend 1 ${pool.label}`}>
        <Minus size={11} />
      </button>
      {showValue && <span className={`font-display tabular-nums text-center ${size === 'lg' ? 'text-2xl min-w-16' : 'text-xl min-w-14'}`} style={{ color: pool.accent }}>
        {status.current}<span className="text-xs text-mist">/{status.max}</span>
      </span>}
      <button onClick={() => ctl.adjustPool(pool.id, 1)} disabled={status.current >= status.max}
        className={`${step} hover:text-essence-wood`} aria-label={`Regain 1 ${pool.label}`}>
        <Plus size={11} />
      </button>
      <button onClick={() => refillPool(ctl, pool.id)} disabled={status.current >= status.max} title={`Refill ${pool.label}`}
        aria-label={`Refill ${pool.label}`} className={`${step} hover:text-gold ml-1`}>
        <RotateCcw size={11} />
      </button>
    </div>
  );
};

/** Which paths supply a shared pool, and what passives and cantrips hold. */
export const PoolSources: React.FC<{ tracked: TrackedPool; className?: string }> = ({ tracked, className = '' }) => {
  const { status, shared } = tracked;
  if (!shared && status.reserved === 0) return null;
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-mist ${className}`}>
      {shared && status.sources.map(s => (
        <span key={s.path.id} className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.path.accent }} />
          <span style={{ color: tint(s.path.accent, 0.9) }}>{s.path.name}</span>
          <span className="tabular-nums">{s.max}</span>
        </span>
      ))}
      {status.reserved > 0 && (
        <span><span className="text-essence-fire">{status.reserved}</span> held by passives and cantrips</span>
      )}
    </p>
  );
};

/** Diamond-marked family name, as used for groups elsewhere. */
export const PoolTitle: React.FC<{ pool: EssencePool; resourceName: string }> = ({ pool, resourceName }) => (
  <h3 className="flex items-center gap-2 font-display text-xs tracking-[0.2em] uppercase" style={{ color: pool.accent }}>
    <span className="w-2 h-2 rotate-45" style={{ background: pool.accent }} />
    {pool.label} <span className="text-mist">{resourceName}</span>
  </h3>
);
