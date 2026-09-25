import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Check, ChevronDown, Download, Lock, Minus, Moon, Plus, RotateCcw, Search, Sparkles, Trash2, Upload, X, Zap
} from 'lucide-react';
import { Ability } from '../types/essence';
import AbilityMarkdown from '../components/essences/AbilityMarkdown';
import {
  AbilityStatus, KIND_META, SystemPath, TalentController, costOf, kindLabel, kindOf, reservesEssence, tierInfo, tierOf, tint
} from './model';

/* ---------------------------------------------------------------- atoms */

export const PathSigil: React.FC<{ path: SystemPath; size?: number; active?: boolean; className?: string }> = ({
  path, size = 36, active = false, className = ''
}) => (
  <span
    className={`inline-flex items-center justify-center rounded-lg flex-shrink-0 transition-shadow ${className}`}
    style={{
      width: size,
      height: size,
      background: tint(path.accent, active ? 0.22 : 0.1),
      border: `1px solid ${tint(path.accent, active ? 0.6 : 0.25)}`,
      boxShadow: active ? `0 0 18px ${tint(path.accent, 0.35)}` : undefined
    }}
  >
    {path.icon(Math.round(size * 0.5))}
  </span>
);

export const KindTag: React.FC<{ ability: Ability; compact?: boolean }> = ({ ability, compact }) => {
  const meta = KIND_META[kindOf(ability)];
  return (
    <span
      className={`inline-flex items-center rounded font-display tracking-wide whitespace-nowrap ${compact ? 'px-1.5 py-0 text-[10px]' : 'px-2 py-0.5 text-[11px]'}`}
      style={{ color: meta.color, background: tint(meta.color, 0.12), border: `1px solid ${tint(meta.color, 0.35)}` }}
    >
      {compact ? (ability.isSpell ? ability.tier : meta.label) : kindLabel(ability)}
    </span>
  );
};

/** Cost expressed the way the rule works: reserved permanently, or paid per use. */
export const CostTag: React.FC<{ ability: Ability; verbose?: boolean }> = ({ ability, verbose }) => {
  const cost = costOf(ability);
  const reserve = reservesEssence(ability);
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-display tracking-wide whitespace-nowrap"
      title={reserve ? `Reserves ${cost} of this path's essence permanently` : `Costs ${cost} essence each use`}
    >
      <span className={reserve ? 'text-essence-fire' : 'text-essence-water'}>{reserve ? <Lock size={10} /> : <Zap size={10} />}</span>
      <span className="text-parchment">{cost}</span>
      {verbose && <span className="text-mist">{reserve ? 'reserved' : 'per use'}</span>}
    </span>
  );
};

export const StatusDot: React.FC<{ status: AbilityStatus; accent: string }> = ({ status, accent }) => {
  if (status === 'learned') {
    return (
      <span className="w-5 h-5 rounded-full inline-flex items-center justify-center flex-shrink-0 align-middle" style={{ background: accent }}>
        <Check size={12} className="text-void" strokeWidth={3} />
      </span>
    );
  }
  if (status === 'locked') return <Lock size={14} className="text-mist flex-shrink-0" />;
  return (
    <span
      className="w-5 h-5 rounded-full border inline-block flex-shrink-0 align-middle"
      style={{ borderColor: status === 'available' ? tint(accent, 0.7) : 'rgba(106,106,122,0.5)' }}
    />
  );
};

export const SearchField: React.FC<{
  value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean; inputRef?: React.Ref<HTMLInputElement>;
}> = ({ value, onChange, placeholder = 'Search abilities…', autoFocus, inputRef }) => (
  <label className="relative flex items-center w-full">
    <Search size={15} className="absolute left-3 text-mist pointer-events-none" />
    <input
      ref={inputRef}
      autoFocus={autoFocus}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="arcane-input w-full pl-9 pr-8 py-2 text-sm"
    />
    {value && (
      <button onClick={() => onChange('')} className="absolute right-2 p-1 text-mist hover:text-parchment" aria-label="Clear search">
        <X size={14} />
      </button>
    )}
  </label>
);

export const Segmented = <T extends string>({ value, options, onChange, size = 'sm' }: {
  value: T; options: { id: T; label: React.ReactNode }[]; onChange: (v: T) => void; size?: 'xs' | 'sm';
}) => (
  <div className="inline-flex rounded-md bg-void/60 border border-gold-subtle p-0.5">
    {options.map(option => (
      <button
        key={option.id}
        onClick={() => onChange(option.id)}
        className={`rounded font-display tracking-wide transition-colors whitespace-nowrap ${size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'} ${
          value === option.id ? 'bg-gold/20 text-gold-bright' : 'text-fog hover:text-parchment'
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

/* ------------------------------------------------------- character state */

export const LevelStepper: React.FC<{ ctl: TalentController; compact?: boolean }> = ({ ctl, compact }) => (
  <div className="inline-flex items-center gap-1.5">
    {!compact && <span className="font-display text-[11px] tracking-widest uppercase text-mist">Level</span>}
    <button
      onClick={() => ctl.setLevel(Math.max(1, ctl.level - 1))}
      disabled={ctl.level <= 1}
      className="w-6 h-6 rounded border border-gold-subtle text-fog hover:text-gold hover:border-gold/50 disabled:opacity-30 flex items-center justify-center"
      aria-label="Decrease level"
    >
      <Minus size={12} />
    </button>
    <span className="font-display text-lg text-ivory w-7 text-center tabular-nums">{ctl.level}</span>
    <button
      onClick={() => ctl.setLevel(Math.min(20, ctl.level + 1))}
      disabled={ctl.level >= 20}
      className="w-6 h-6 rounded border border-gold-subtle text-fog hover:text-gold hover:border-gold/50 disabled:opacity-30 flex items-center justify-center"
      aria-label="Increase level"
    >
      <Plus size={12} />
    </button>
  </div>
);

/** Talent budget: points spent from the level-based total. */
export const BudgetMeter: React.FC<{ ctl: TalentController; className?: string }> = ({ ctl, className = '' }) => {
  const pct = ctl.pointsTotal ? Math.min(100, (ctl.pointsSpent / ctl.pointsTotal) * 100) : 0;
  return (
    <div className={`min-w-[140px] ${className}`}>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <span className="font-display text-[11px] tracking-widest uppercase text-mist whitespace-nowrap">Talent points</span>
        <span className="font-display text-sm tabular-nums whitespace-nowrap">
          <span className={ctl.pointsLeft === 0 ? 'text-gold-bright' : 'text-gold'}>{ctl.pointsLeft}</span>
          <span className="text-mist"> left of {ctl.pointsTotal}</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-void/80 overflow-hidden border border-gold-subtle/50">
        <div className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

/** Save, load, reset and undo — grouped behind one menu so the header stays calm. */
export const CharacterMenu: React.FC<{ ctl: TalentController; align?: 'left' | 'right'; direction?: 'down' | 'up' }> = ({
  ctl, align = 'right', direction = 'down'
}) => {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) { setOpen(false); setConfirming(false); }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const item = 'w-full flex items-center gap-2.5 px-3 py-2 text-sm font-body text-parchment hover:bg-charcoal/80 rounded text-left';

  return (
    <div className="relative" ref={rootRef}>
      <button onClick={() => setOpen(!open)} className="arcane-btn !px-3 !py-1.5 text-xs flex items-center gap-1.5">
        Character <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          className={`absolute z-50 w-60 p-1.5 arcane-tooltip animate-fade-in ${align === 'right' ? 'right-0' : 'left-0'} ${direction === 'down' ? 'top-full mt-2' : 'bottom-full mb-2'}`}
        >
          <button className={item} onClick={() => { ctl.save(); setOpen(false); }}>
            <Download size={15} className="text-essence-water" /> Save build to file
          </button>
          <button className={item} onClick={() => fileRef.current?.click()}>
            <Upload size={15} className="text-essence-wood" /> Load build from file
          </button>
          {ctl.canUndo && (
            <button className={item} onClick={() => { ctl.undo(); setOpen(false); }}>
              <RotateCcw size={15} className="text-gold" /> Undo reset
            </button>
          )}
          <div className="arcane-divider my-1.5" />
          {confirming ? (
            <div className="px-3 py-2">
              <p className="text-xs text-fog mb-2">Forget every learned ability and reset the level?</p>
              <div className="flex gap-2">
                <button className="arcane-btn !px-3 !py-1 text-xs !text-essence-fire !border-essence-fire/50" onClick={() => { ctl.reset(); setConfirming(false); setOpen(false); }}>
                  Reset
                </button>
                <button className="arcane-btn !px-3 !py-1 text-xs" onClick={() => setConfirming(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className={`${item} disabled:opacity-40`} disabled={ctl.selectedIds.length === 0} onClick={() => setConfirming(true)}>
              <Trash2 size={15} className="text-essence-fire" /> Reset build
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) ctl.load(file);
              e.target.value = '';
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------- pools */

/**
 * Clickable essence pips: click a filled pip to spend down to it, an empty pip to
 * regain up to it. Reserved essence is drawn as struck-out pips at the end.
 */
export const PoolPips: React.FC<{ ctl: TalentController; path: SystemPath; size?: 'sm' | 'md' | 'lg' }> = ({ ctl, path, size = 'md' }) => {
  const { current, max, reserved } = ctl.pool(path.id);
  const dim = size === 'lg' ? 18 : size === 'md' ? 13 : 9;
  return (
    <div className="flex flex-wrap items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < current;
        return (
          <button
            key={i}
            onClick={() => ctl.adjustPool(path.id, (filled ? i : i + 1) - current)}
            className="rounded-full transition-all duration-150 hover:scale-110"
            style={{
              width: dim, height: dim,
              background: filled ? path.accent : 'transparent',
              border: `1.5px solid ${filled ? path.accent : tint(path.accent, 0.4)}`,
              boxShadow: filled ? `0 0 8px ${tint(path.accent, 0.5)}` : undefined
            }}
            aria-label={filled ? `Spend down to ${i}` : `Regain up to ${i + 1}`}
          />
        );
      })}
      {Array.from({ length: reserved }).map((_, i) => (
        <span
          key={`r${i}`}
          className="rounded-full relative"
          title="Reserved by passives and cantrips"
          style={{
            width: dim, height: dim,
            background: 'repeating-linear-gradient(-45deg, transparent 0 2px, rgba(255,107,74,0.35) 2px 4px)',
            border: '1.5px solid rgba(255,107,74,0.3)'
          }}
        />
      ))}
    </div>
  );
};

export const PoolCounter: React.FC<{ ctl: TalentController; path: SystemPath; large?: boolean }> = ({ ctl, path, large }) => {
  const { current, max } = ctl.pool(path.id);
  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        onClick={() => ctl.adjustPool(path.id, -1)}
        disabled={current <= 0}
        className="w-7 h-7 rounded border border-gold-subtle text-fog hover:text-essence-fire hover:border-essence-fire/60 disabled:opacity-30 flex items-center justify-center"
        aria-label={`Spend 1 ${path.name}`}
      >
        <Minus size={13} />
      </button>
      <span className={`font-display tabular-nums text-center ${large ? 'text-2xl w-16' : 'text-base w-12'}`}>
        <span style={{ color: path.accent }}>{current}</span><span className="text-mist text-[0.7em]">/{max}</span>
      </span>
      <button
        onClick={() => ctl.adjustPool(path.id, 1)}
        disabled={current >= max}
        className="w-7 h-7 rounded border border-gold-subtle text-fog hover:text-essence-wood hover:border-essence-wood/60 disabled:opacity-30 flex items-center justify-center"
        aria-label={`Regain 1 ${path.name}`}
      >
        <Plus size={13} />
      </button>
    </div>
  );
};

export const RestButtons: React.FC<{ ctl: TalentController; compact?: boolean }> = ({ ctl, compact }) => (
  <div className="flex gap-2">
    <button
      onClick={ctl.fullRest}
      disabled={ctl.learnedPaths.length === 0}
      className={`arcane-btn flex items-center gap-1.5 whitespace-nowrap !text-essence-wood !border-essence-wood/40 hover:!border-essence-wood disabled:opacity-40 ${compact ? '!px-2.5 !py-1 text-[11px]' : '!px-3 !py-1.5 text-xs'}`}
      title="Refill every essence pool"
    >
      <Moon size={13} /> Long rest
    </button>
    <button
      onClick={ctl.emptyPools}
      disabled={ctl.learnedPaths.length === 0}
      className={`arcane-btn flex items-center gap-1.5 whitespace-nowrap disabled:opacity-40 ${compact ? '!px-2.5 !py-1 text-[11px]' : '!px-3 !py-1.5 text-xs'}`}
      title="Empty every essence pool"
    >
      Empty all
    </button>
  </div>
);

/* -------------------------------------------------------- ability detail */

export const LearnButton: React.FC<{ ctl: TalentController; ability: Ability; path: SystemPath; className?: string }> = ({
  ctl, ability, path, className = ''
}) => {
  const status = ctl.statusOf(ability, path.id);
  if (status === 'learned') {
    return (
      <button onClick={() => ctl.toggle(ability, path.id)} className={`arcane-btn !py-2 text-xs !text-essence-fire !border-essence-fire/40 hover:!border-essence-fire ${className}`}>
        Unlearn
      </button>
    );
  }
  return (
    <button
      onClick={() => ctl.toggle(ability, path.id)}
      disabled={status !== 'available'}
      className={`arcane-btn arcane-btn-primary !py-2 text-xs disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {status === 'locked' ? 'Locked' : status === 'unaffordable' ? 'Not enough points' : `Learn · ${costOf(ability)} pt${costOf(ability) > 1 ? 's' : ''}`}
    </button>
  );
};

export const UseButton: React.FC<{ ctl: TalentController; ability: Ability; path: SystemPath; compact?: boolean }> = ({ ctl, ability, path, compact }) => {
  if (reservesEssence(ability) || !ctl.isLearned(ability.id)) return null;
  const cost = costOf(ability);
  const canUse = ctl.pool(path.id).current >= cost;
  return (
    <button
      onClick={() => ctl.spend(ability, path.id)}
      disabled={!canUse}
      className={`rounded font-display tracking-wide inline-flex items-center gap-1 transition-all disabled:opacity-35 disabled:cursor-not-allowed ${compact ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1.5 text-xs'}`}
      style={{ color: path.accent, border: `1px solid ${tint(path.accent, 0.5)}`, background: tint(path.accent, 0.08) }}
      title={`Spend ${cost} ${path.name} essence`}
    >
      <Zap size={compact ? 10 : 12} /> Use · {cost}
    </button>
  );
};

/** Everything about one ability: meta row, full text, provenance. */
export const AbilityBody: React.FC<{ ctl: TalentController; ability: Ability; path: SystemPath; searchTerm?: string }> = ({
  ctl, ability, path, searchTerm
}) => {
  const tier = tierInfo(tierOf(ability));
  const lock = ctl.statusOf(ability, path.id) === 'locked' ? ctl.lockReason(ability, path.id) : null;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <KindTag ability={ability} />
        <span className="text-[11px] font-display tracking-wide text-fog">{tier.name} · Lv {tier.levelRequirement}+</span>
        <span className="text-mist">·</span>
        <CostTag ability={ability} verbose />
      </div>
      {lock && (
        <div className="flex items-center gap-2 text-xs text-fog bg-void/50 border border-gold-subtle rounded px-3 py-2">
          <Lock size={13} className="text-gold" /> {lock}
        </div>
      )}
      <AbilityMarkdown content={ability.description} searchTerm={searchTerm} className="text-[15px]" />
      {(ability.author || ability.location) && (
        <p className="text-xs text-mist font-body border-t border-gold-subtle pt-3">
          {ability.author && <span className="text-gold/80">{ability.author}</span>}
          {ability.author && ability.location && ' · '}
          {ability.location}
        </p>
      )}
    </div>
  );
};

/** Slide-over panel used by layouts that don't show full text inline. */
export const AbilityDrawer: React.FC<{
  ctl: TalentController; ability: Ability | null; onClose: () => void;
}> = ({ ctl, ability, onClose }) => {
  useEffect(() => {
    if (!ability) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ability, onClose]);

  if (!ability) return null;
  const path = ctl.pathOf(ability.id)!;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-void/70 backdrop-blur-[2px]" />
      <aside
        className="relative w-full max-w-lg h-full bg-obsidian border-l border-gold-subtle shadow-arcane-lg flex flex-col animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-5 border-b border-gold-subtle flex items-start gap-3" style={{ background: `linear-gradient(135deg, ${tint(path.accent, 0.12)}, transparent 60%)` }}>
          <PathSigil path={path} size={42} active />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-display tracking-widest uppercase" style={{ color: path.accent }}>{path.name}</p>
            <h2 className="font-display text-xl text-ivory leading-tight">{ability.name}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-mist hover:text-parchment rounded hover:bg-charcoal" aria-label="Close">
            <X size={18} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">
          <AbilityBody ctl={ctl} ability={ability} path={path} />
        </div>
        <footer className="p-4 border-t border-gold-subtle flex items-center justify-between gap-3">
          <UseButton ctl={ctl} ability={ability} path={path} />
          <LearnButton ctl={ctl} ability={ability} path={path} className="ml-auto" />
        </footer>
      </aside>
    </div>
  );
};

/* ------------------------------------------------------------- chrome */

export const Toast: React.FC<{ ctl: TalentController }> = ({ ctl }) => {
  if (!ctl.notice) return null;
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] max-w-md w-[calc(100%-2rem)] animate-fade-in">
      <div className="arcane-tooltip px-4 py-3 flex items-start gap-3">
        <Sparkles size={16} className="text-gold mt-0.5 flex-shrink-0" />
        <p className="text-sm text-parchment flex-1">{ctl.notice}</p>
        <button onClick={ctl.dismissNotice} className="text-mist hover:text-parchment" aria-label="Dismiss"><X size={14} /></button>
      </div>
    </div>
  );
};

export const VersionSwitch: React.FC<{ current: 'v1' | 'v2' }> = ({ current }) => {
  const { search } = useLocation();
  const options = [
    { id: 'v1', to: '/', label: 'V1', hint: 'Elements' },
    { id: 'v2', to: '/v2', label: 'V2', hint: 'Cultivation' }
  ];
  return (
    <div className="inline-flex rounded-md bg-void/60 border border-gold-subtle p-0.5">
      {options.map(option => (
        <Link
          key={option.id}
          to={`${option.to}${search}`}
          className={`rounded px-2.5 py-1 text-xs font-display tracking-wide transition-colors ${
            current === option.id ? 'bg-gold/20 text-gold-bright' : 'text-fog hover:text-parchment'
          }`}
        >
          {option.label} <span className="hidden sm:inline text-[10px] opacity-70">{option.hint}</span>
        </Link>
      ))}
    </div>
  );
};

export const EmptyState: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="text-center py-10 px-4">
    <Sparkles size={22} className="text-gold/50 mx-auto mb-3" />
    <p className="font-display text-sm text-fog tracking-wide">{title}</p>
    {children && <div className="text-sm text-mist mt-1.5 max-w-sm mx-auto">{children}</div>}
  </div>
);
