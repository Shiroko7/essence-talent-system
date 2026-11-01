import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import AbilityMarkdown from '../../components/essences/AbilityMarkdown';
import { SystemPath, tint } from '../../talents/model';
import { PathSigil } from '../../talents/ui';
import { Found, byRank, makeLookup, rankLabel } from './lookup';

/* Building blocks shared by every patch's notes. */

/* ---------------------------------------------------------------- atoms */

export const PathChip: React.FC<{ path?: SystemPath; strike?: boolean }> = ({ path, strike }) => path ? (
  <span className={`inline-flex items-center gap-1.5 text-sm font-display tracking-wide ${strike ? 'line-through opacity-70' : ''}`} style={{ color: path.accent }}>
    <PathSigil path={path} size={22} /> {path.name}
  </span>
) : null;

export const AbilityChip: React.FC<{ found?: Found; name: string; onOpen: (f: Found) => void; strike?: boolean }> = ({ found, name, onOpen, strike }) => {
  const accent = found?.path.accent ?? '#9a9aa8';
  return (
    <button
      type="button"
      disabled={!found}
      onClick={() => found && onOpen(found)}
      className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-sm text-parchment border transition-colors hover:text-ivory disabled:cursor-default"
      style={{ borderColor: tint(accent, 0.25), background: tint(accent, 0.06) }}
    >
      <span className={strike ? 'line-through decoration-mist' : ''}>{found?.ability.name ?? name}</span>
      {found && <span className="text-[10px] font-display tracking-wide text-mist">{rankLabel(found.ability)}</span>}
    </button>
  );
};

export const Chips: React.FC<{ names: string[]; pathId: string; lookup: ReturnType<typeof makeLookup>; onOpen: (f: Found) => void; strike?: boolean }> = ({
  names, pathId, lookup, onOpen, strike
}) => (
  <div className="flex flex-wrap gap-1.5">
    {[...names].sort(byRank(lookup, pathId)).map(name => (
      <AbilityChip key={name} name={name} found={lookup(pathId, name)} onOpen={onOpen} strike={strike} />
    ))}
  </div>
);

export const Section: React.FC<{ id: string; kicker: string; title: string; children: React.ReactNode }> = ({ id, kicker, title, children }) => (
  <section id={id} className="scroll-mt-6 space-y-4">
    <div>
      <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gold-dim">{kicker}</p>
      <h2 className="font-display text-2xl text-ivory tracking-wide">{title}</h2>
    </div>
    {children}
  </section>
);

export const Prose: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-3 text-[17px] leading-relaxed text-parchment/90">{children}</div>
);

export const AbilityDialog: React.FC<{ found: Found | null; onClose: () => void }> = ({ found, onClose }) => {
  useEffect(() => {
    if (!found) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [found, onClose]);
  if (!found) return null;
  const { ability, path } = found;
  const origin = [ability.author, ability.location].filter(Boolean).join(' · ');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-void/75 backdrop-blur-[3px]" />
      <div
        role="dialog" aria-label={ability.name}
        className="relative w-full max-w-xl max-h-[85vh] rounded-xl border bg-obsidian shadow-arcane-lg flex flex-col animate-fade-in"
        style={{ borderColor: tint(path.accent, 0.35) }}
        onClick={e => e.stopPropagation()}
      >
        <header className="p-5 pb-4 flex items-start gap-3 border-b border-gold-subtle rounded-t-xl"
          style={{ background: `radial-gradient(90% 120% at 0% 0%, ${tint(path.accent, 0.16)}, transparent 70%)` }}>
          <PathSigil path={path} size={40} active />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-display tracking-[0.2em] uppercase" style={{ color: path.accent }}>{path.name} · {rankLabel(ability)}</p>
            <h3 className="font-display text-xl text-ivory leading-tight">{ability.name}</h3>
            {origin && <p className="text-xs text-mist mt-0.5">{origin}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 text-mist hover:text-parchment rounded hover:bg-charcoal" aria-label="Close"><X size={18} /></button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">
          <AbilityMarkdown content={ability.description} />
        </div>
      </div>
    </div>
  );
};

/** A grey usage tag (Action, Concentration…), as on ability cards. */
export const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-display tracking-wide whitespace-nowrap text-fog border border-ash/60 bg-charcoal/40">
    {children}
  </span>
);
