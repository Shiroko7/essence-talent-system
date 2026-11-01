import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { SystemPath, tint } from '../talents/model';
import { buildV2System } from '../talents/systems';
import { GroupLabel, PathSigil } from '../talents/ui';
import { ATTUNEMENTS, DOMAIN_CLASH, GENERAL_RULES, Matchup, VAULT_URL, matchup } from '../data/attunementRules';

const MATCHUP_STYLE: Record<Matchup, { mark: string; className: string }> = {
  coexist: { mark: '=', className: 'text-emerald-400 bg-emerald-500/10' },
  overcome: { mark: '▲', className: 'text-violet-300 bg-violet-500/20' },
  'overcome-by': { mark: '–', className: 'text-mist bg-charcoal/60' },
  clash: { mark: '–', className: 'text-mist bg-charcoal/60' },
  opposite: { mark: '✕', className: 'text-red-400 bg-red-500/10' }
};

/** Every path against every other: rows are your path, columns the enemy's. */
const MatchupChart: React.FC<{ paths: SystemPath[] }> = ({ paths }) => {
  const [pair, setPair] = useState<[SystemPath, SystemPath] | null>(null);
  const shown = pair && matchup(pair[0].id, pair[1].id);
  return (
    <div className="space-y-2">
      <div className="arcane-panel p-3 overflow-x-auto">
        <table className="border-separate border-spacing-[2px] mx-auto" aria-label="Your path (rows) against the enemy's path (columns)">
          <thead>
            <tr>
              <th />
              {paths.map(c => (
                <th key={c.id} scope="col" title={c.name} className={`pb-1 transition-opacity ${pair && pair[1].id !== c.id ? 'opacity-40' : ''}`}><span className="sr-only">{c.name}</span><span className="inline-flex justify-center"><PathSigil path={c} size={22} /></span></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paths.map(r => (
              <tr key={r.id}>
                <th scope="row" className={`pr-2 text-right text-sm font-normal whitespace-nowrap transition-opacity ${pair && pair[0].id !== r.id ? 'opacity-40' : 'font-display'}`} style={{ color: r.accent }}>{r.name}</th>
                {paths.map(c => {
                  const m = matchup(r.id, c.id);
                  const style = MATCHUP_STYLE[m.kind];
                  const select = () => setPair([r, c]);
                  return (
                    <td key={c.id}>
                      <span
                        tabIndex={0} title={`${r.name} vs ${c.name}`} onMouseEnter={select} onFocus={select} onClick={select}
                        className={`grid place-items-center w-7 h-7 rounded text-xs font-display cursor-default focus:outline-none ${style.className} ${pair && pair[0].id === r.id && pair[1].id === c.id ? 'ring-2 ring-gold scale-110' : pair && (pair[0].id === r.id || pair[1].id === c.id) ? 'brightness-150' : ''}`}
                      >{style.mark}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="arcane-panel px-4 py-3 min-h-[76px] flex items-center" aria-live="polite">
        {pair && shown ? <Verdict a={pair[0]} b={pair[1]} kind={shown.kind} why={shown.why} /> : <p className="text-sm text-mist">Hover or tap a cell to see who wins.</p>}
      </div>
    </div>
  );
};

/** The hovered matchup, said plainly: who wins, or that nobody does. */
const Verdict: React.FC<{ a: SystemPath; b: SystemPath; kind: Matchup; why: string }> = ({ a, b, kind, why }) => {
  const name = (p: SystemPath, dim = false) => (
    <span className={`inline-flex items-center gap-1.5 font-display tracking-wide ${dim ? 'opacity-50' : ''}`} style={{ color: p.accent }}>
      <PathSigil path={p} size={dim ? 20 : 26} active={!dim} /> {p.name}
    </span>
  );
  const [winner, loser] = kind === 'overcome-by' ? [b, a] : [a, b];
  const style = MATCHUP_STYLE[kind === 'overcome-by' ? 'overcome' : kind];
  const [headline, rule] = {
    overcome: [<>{name(winner)} <span className="text-violet-300">overcomes</span> {name(loser, true)}</>, `${winner.name} wins the edge: it rolls one die size larger.`],
    'overcome-by': [<>{name(winner)} <span className="text-violet-300">overcomes</span> {name(loser, true)}</>, `${winner.name} wins the edge: it rolls one die size larger.`],
    clash: [<>{name(a)} <span className="text-mist">clashes with</span> {name(b)}</>, 'Neither has the edge. The highest roll wins.'],
    coexist: [<>{name(a)} <span className="text-emerald-400">coexists with</span> {name(b)}</>, 'No clash. Both stay up.'],
    opposite: [<>{name(a)} <span className="text-red-400">opposes</span> {name(b)}</>, 'Nobody wins. Both collapse before the roll.']
  }[kind] as [React.ReactNode, string];
  return (
    <div className="flex gap-3 items-start">
      <span className={`grid place-items-center w-9 h-9 shrink-0 rounded text-base font-display ${style.className}`}>{style.mark}</span>
      <div className="min-w-0 space-y-0.5">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg">{headline}</p>
        <p className="text-sm text-fog"><span className="text-parchment">{rule}</span> {kind !== 'clash' && why}</p>
      </div>
    </div>
  );
};

const RulesPage: React.FC = () => {
  const system = useMemo(buildV2System, []);
  const initial = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
  const [active, setActive] = useState(ATTUNEMENTS.some(a => a.id === initial) ? initial : ATTUNEMENTS[0].id);
  const attunement = ATTUNEMENTS.find(a => a.id === active)!;
  const accent = system.groups.find(g => g.id === attunement.family)!.accent;
  const pathOf = (id: string) => system.paths.find(p => p.id === id);

  const domainPaths = ATTUNEMENTS.flatMap(a => a.domains.map(d => pathOf(d.path))).filter((p): p is SystemPath => !!p);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Essence Dao Rules · Essence Talent System';
    if (initial === 'domain-clash') document.getElementById('domain-clash')?.scrollIntoView();
    return () => { document.title = previous; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <section id="domain-clash" aria-label="Domain clash" className="space-y-4 pt-2 scroll-mt-6">
          <GroupLabel label="Domain clash" accent={accent} />
          <div className="arcane-panel overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <thead>
                <tr className="text-[10px] font-display tracking-wider uppercase text-mist">
                  <th scope="col" className="text-left font-normal px-3 py-2">Level or CR</th>
                  {DOMAIN_CLASH.levels.map(l => <th key={l.level} scope="col" className="font-normal px-2 py-2">{l.level}</th>)}
                </tr>
              </thead>
              <tbody>
                {([
                  ['clash', 'Clash', DOMAIN_CLASH.levels.map(l => l.clash)],
                  ['overcome', 'Overcome', DOMAIN_CLASH.levels.map(l => l.overcome)],
                  ['coexist', 'Coexist', DOMAIN_CLASH.coexist],
                  ['opposite', 'Opposites', DOMAIN_CLASH.opposite]
                ] as [Matchup, string, string[] | string][]).map(([kind, name, cells]) => (
                  <tr key={kind} className="border-t border-gold-subtle">
                    <th scope="row" className="text-left font-normal px-3 py-2 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2 font-display tracking-wide text-ivory">
                        <span className={`grid place-items-center w-6 h-6 rounded text-xs ${MATCHUP_STYLE[kind].className}`}>{MATCHUP_STYLE[kind].mark}</span>{name}
                      </span>
                    </th>
                    {typeof cells === 'string'
                      ? <td colSpan={DOMAIN_CLASH.levels.length} className="px-2 py-2 text-fog">{cells}</td>
                      : cells.map((roll, i) => <td key={i} className="px-2 py-2 text-center font-display text-parchment whitespace-nowrap">{roll}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ol className="arcane-panel">
            {DOMAIN_CLASH.steps.map((step, i) => (
              <li key={step} className="flex gap-3 px-4 py-3 border-t border-gold-subtle first:border-t-0 text-parchment/90">
                <span className="font-display tabular-nums" style={{ color: accent }}>{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <p className="text-parchment/90"><span className="font-display tracking-wide" style={{ color: accent }}>Sovereign Domain.</span> {DOMAIN_CLASH.sovereign}</p>

          <MatchupChart paths={domainPaths} />
        </section>
      </div>
    </Layout>
  );
};

export default RulesPage;
