import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { tint } from '../talents/model';
import { buildV2System } from '../talents/systems';
import { GroupLabel, PathSigil } from '../talents/ui';
import { ATTUNEMENTS, GENERAL_RULES, VAULT_URL } from '../data/attunementRules';

const RulesPage: React.FC = () => {
  const system = useMemo(buildV2System, []);
  const initial = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
  const [active, setActive] = useState(ATTUNEMENTS.some(a => a.id === initial) ? initial : ATTUNEMENTS[0].id);
  const attunement = ATTUNEMENTS.find(a => a.id === active)!;
  const accent = system.groups.find(g => g.id === attunement.family)!.accent;
  const pathOf = (id: string) => system.paths.find(p => p.id === id);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Essence Dao Rules · Essence Talent System';
    return () => { document.title = previous; };
  }, []);

  const choose = (id: string) => {
    setActive(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <Layout>
      <div className="max-w-[1000px] mx-auto space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 font-display text-[11px] tracking-[0.25em] uppercase text-gold"><BookOpen size={14} /> Essence Dao · Rules</p>
            <h1 className="font-display text-3xl md:text-4xl text-ivory tracking-wide">Attunement</h1>
          </div>
          <a href={VAULT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-gold-dim hover:text-gold">
            Original rule in the vault <ExternalLink size={12} />
          </a>
        </header>

        <ul className="space-y-1 text-parchment/85 list-disc pl-5">
          {GENERAL_RULES.map(rule => <li key={rule}>{rule}</li>)}
        </ul>

        <div role="tablist" aria-label="Attunements" className="grid grid-cols-3 gap-2">
          {ATTUNEMENTS.map(a => {
            const g = system.groups.find(x => x.id === a.family)!;
            const selected = a.id === active;
            return (
              <button
                key={a.id} role="tab" aria-selected={selected} onClick={() => choose(a.id)}
                className="rounded-lg border px-3 py-2.5 text-left transition-colors"
                style={{ borderColor: tint(g.accent, selected ? 0.6 : 0.2), background: tint(g.accent, selected ? 0.12 : 0.03) }}
              >
                <p className="font-display text-[10px] tracking-[0.2em] uppercase text-mist">{g.label}</p>
                <p className={`font-display text-sm sm:text-base tracking-wide ${selected ? 'text-ivory' : 'text-fog'}`}>{a.name}</p>
                <p className="font-display text-[10px] tracking-[0.2em] uppercase" style={{ color: g.accent }}>{a.domainLabel}</p>
              </button>
            );
          })}
        </div>

        <section role="tabpanel" aria-label={attunement.name} className="space-y-5">
          <p className="text-[17px] text-parchment/90">
            <span className="font-display tracking-wide" style={{ color: accent }}>{attunement.domainLabel}.</span> {attunement.summary}
          </p>

          {attunement.domains.length > 0 && <div className="grid sm:grid-cols-2 gap-2">
            {attunement.domains.map(domain => {
              const path = pathOf(domain.path);
              if (!path) return null;
              return (
                <div key={domain.path} className="rounded-lg border p-2.5 flex gap-3 items-center" style={{ borderColor: tint(path.accent, 0.25), background: tint(path.accent, 0.04) }}>
                  <PathSigil path={path} size={34} />
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display tracking-wide" style={{ color: path.accent }}>{path.name}</span>
                      <span className="text-ivory text-sm">{domain.name}</span>
                    </p>
                    <p className="text-sm text-fog">{domain.examples}</p>
                  </div>
                </div>
              );
            })}
          </div>}

          <div>
            <GroupLabel label="Benefits by tier" accent={accent} className="mb-2" />
            <ol className="arcane-panel">
              {attunement.tiers.map(row => (
                <li key={row.tier} className="grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-5 px-4 py-3 border-t border-gold-subtle first:border-t-0">
                  <p className="font-display text-ivory tracking-wide">{row.tier} <span className="block text-xs text-mist font-body tracking-normal">Levels {row.levels}</span></p>
                  <p className="text-parchment/85"><span className="font-display tracking-wide" style={{ color: accent }}>{row.name}.</span> {row.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {attunement.notes.length > 0 && (
            <ul className="space-y-1 text-sm text-mist list-disc pl-5">
              {attunement.notes.map(note => <li key={note}>{note}</li>)}
            </ul>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default RulesPage;
