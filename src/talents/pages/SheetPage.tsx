import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronsDownUp, ChevronsUpDown, Network, Printer } from 'lucide-react';
import { Ability } from '../../types/essence';
import AbilityMarkdown from '../../components/essences/AbilityMarkdown';
import {
  KindFilter, TalentController, costOf, groupByTier, kindOf, matchesKind, matchesSearch, pathsByGroup, reservesEssence, tint
} from '../model';
import type { SystemPath } from '../model';
import { pagePath } from '../routes';
import {
  AbilityIcon, CharacterMenu, EmptyState, GroupLabel, KindTag, LevelStepper, PageTitle, PathSigil, SearchField, Segmented, UseButton
} from '../ui';

const KIND_OPTIONS: { id: KindFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'passive', label: 'Passive' },
  { id: 'cantrip', label: 'Cantrip' },
  { id: 'spell', label: 'Spell' }
];

const Stat: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="px-4 py-3">
    <p className="font-display text-[10px] tracking-[0.2em] uppercase text-mist">{label}</p>
    <p className="font-display text-xl text-ivory tabular-nums leading-tight mt-0.5">{children}</p>
  </div>
);

/** One learned ability, with its full text. Collapsed cards still print in full. */
const AbilityEntry: React.FC<{
  ctl: TalentController; ability: Ability; path: SystemPath; open: boolean; onToggle: () => void; searchTerm: string;
}> = ({ ctl, ability, path, open, onToggle, searchTerm }) => {
  const cost = costOf(ability);
  return (
    <article className="rounded-lg border break-inside-avoid" style={{ borderColor: tint(path.accent, 0.22), background: 'rgba(12,12,18,0.6)' }}>
      <div className="flex items-center gap-3 p-3">
        <button onClick={onToggle} className="flex-1 min-w-0 flex items-center gap-3 text-left" aria-expanded={open}>
          <AbilityIcon ability={ability} path={path} status="learned" size={36} />
          <span className="min-w-0">
            <span className="block font-display text-[15px] text-ivory tracking-wide">{ability.name}</span>
            <span className="flex flex-wrap items-center gap-2 mt-0.5">
              <KindTag ability={ability} compact />
              <span className="text-[11px] text-mist">
                {reservesEssence(ability) ? `Holds ${cost} essence` : `Costs ${cost} to use`}
              </span>
            </span>
          </span>
        </button>
        <UseButton ctl={ctl} ability={ability} path={path} compact />
        <button onClick={onToggle} className="p-1 text-mist hover:text-gold print:hidden" aria-label={open ? 'Collapse' : 'Expand'}>
          <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className={`px-4 pb-4 sm:pl-[60px] ${open ? '' : 'hidden print:block'}`}>
        <AbilityMarkdown content={ability.description} searchTerm={searchTerm} className="text-[15px]" />
        {(ability.author || ability.location) && (
          <p className="text-xs text-mist border-t border-gold-subtle pt-2 mt-3">
            {ability.author && <span className="text-gold/80">{ability.author}</span>}
            {ability.author && ability.location && ' · '}
            {ability.location}
          </p>
        )}
      </div>
    </article>
  );
};

/**
 * The detailed character sheet: every learned ability in full, grouped by path
 * and tier, for reference at the table or on paper.
 */
const SheetPage: React.FC<{ ctl: TalentController }> = ({ ctl }) => {
  const { system } = ctl;
  const [kind, setKind] = useState<KindFilter>('all');
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const learnedIn = (pathId: string) => (system.abilitiesByPath[pathId] || []).filter(a => ctl.isLearned(a.id));
  const visibleIn = (pathId: string) => learnedIn(pathId).filter(a => matchesKind(a, kind) && matchesSearch(a, search));
  const groups = pathsByGroup(system, ctl.learnedPaths)
    .map(({ group, paths }) => ({ group, paths: paths.filter(p => visibleIn(p.id).length > 0) }))
    .filter(g => g.paths.length > 0);
  const allLearned = ctl.learnedPaths.flatMap(p => learnedIn(p.id));
  const pools = ctl.learnedPaths.map(p => ctl.pool(p.id));
  const toggle = (id: string) => setCollapsed(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      <div className="arcane-panel p-4 flex flex-wrap items-center gap-x-6 gap-y-3 print:hidden">
        <PageTitle ctl={ctl} page="sheet" className="mr-auto" />
        <LevelStepper ctl={ctl} />
        <button onClick={() => window.print()} className="arcane-btn !px-3 !py-1.5 text-xs flex items-center gap-1.5" disabled={!allLearned.length}>
          <Printer size={13} /> Print
        </button>
        <CharacterMenu ctl={ctl} />
      </div>

      {!allLearned.length ? (
        <div className="arcane-panel">
          <EmptyState title="Nothing learned yet">
            Pick abilities on the <Link to={pagePath(system.version, 'talents')} className="text-gold hover:text-gold-bright">Talents page</Link> and they appear here in full.
          </EmptyState>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="arcane-panel grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-gold-subtle/60">
            <Stat label="Level">{ctl.level}</Stat>
            <Stat label="Talent points">{ctl.pointsSpent}<span className="text-sm text-mist"> / {ctl.pointsTotal}</span></Stat>
            <Stat label="Paths">{ctl.learnedPaths.length}</Stat>
            <Stat label="Abilities">{allLearned.length}</Stat>
            <Stat label="Essence">
              {pools.reduce((n, p) => n + p.current, 0)}<span className="text-sm text-mist"> / {pools.reduce((n, p) => n + p.max, 0)}</span>
            </Stat>
            <Stat label="Held by passives"><span className="text-essence-fire">{pools.reduce((n, p) => n + p.reserved, 0)}</span></Stat>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 print:hidden">
            <Segmented value={kind} options={KIND_OPTIONS.filter(o => o.id === 'all' || allLearned.some(a => kindOf(a) === o.id))} onChange={setKind} />
            <div className="md:w-80"><SearchField value={search} onChange={setSearch} placeholder="Search your abilities…" /></div>
            <div className="md:ml-auto flex gap-2">
              <button onClick={() => setCollapsed(new Set())} className="arcane-btn !px-3 !py-1.5 text-xs flex items-center gap-1.5">
                <ChevronsUpDown size={13} /> Expand all
              </button>
              <button onClick={() => setCollapsed(new Set(allLearned.map(a => a.id)))} className="arcane-btn !px-3 !py-1.5 text-xs flex items-center gap-1.5">
                <ChevronsDownUp size={13} /> Collapse all
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 items-start">
            {/* Contents */}
            <nav className="w-full lg:w-60 flex-shrink-0 arcane-panel p-3 lg:sticky lg:top-4 print:hidden" aria-label="Paths on this sheet">
              {groups.map(({ group, paths }) => (
                <div key={group.id} className="mb-2 last:mb-0">
                  {system.groups.length > 1 && <GroupLabel label={group.label} accent={group.accent} className="px-1.5 py-1.5" />}
                  <ul className="space-y-0.5">
                    {paths.map(p => {
                      const pool = ctl.pool(p.id);
                      return (
                        <li key={p.id}>
                          <a href={`#path-${p.id}`} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-charcoal/50">
                            <PathSigil path={p} size={24} />
                            <span className="flex-1 text-sm font-display text-fog truncate">{p.name}</span>
                            <span className="text-xs tabular-nums" style={{ color: p.accent }}>{pool.current}/{pool.max}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {!groups.length && <p className="text-xs text-mist px-2 py-1">No abilities match.</p>}
            </nav>

            {/* Abilities in full */}
            <div className="flex-1 min-w-0 space-y-6">
              {!groups.length && (
                <div className="arcane-panel"><EmptyState title="No abilities match">Try another type or search term.</EmptyState></div>
              )}
              {groups.flatMap(({ group, paths }) => paths.map(p => {
                const pool = ctl.pool(p.id);
                return (
                  <section key={p.id} id={`path-${p.id}`} className="arcane-panel p-4 md:p-5 scroll-mt-4 break-inside-avoid-page">
                    <header className="flex flex-wrap items-center gap-4 pb-4 mb-4 border-b" style={{ borderColor: tint(p.accent, 0.2) }}>
                      <PathSigil path={p} size={48} active />
                      <div className="flex-1 min-w-[200px]">
                        <p className="font-display text-[10px] tracking-[0.2em] uppercase" style={{ color: group.accent }}>
                          {group.label}{p.patron && ` · ${p.patron}`}
                        </p>
                        <h2 className="font-display text-2xl tracking-wide" style={{ color: p.accent }}>{p.name}</h2>
                        {(p.description ?? p.concept) && <p className="text-sm text-fog">{p.description ?? p.concept}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl tabular-nums" style={{ color: p.accent }}>
                          {pool.current}<span className="text-sm text-mist"> / {pool.max}</span>
                        </p>
                        {pool.reserved > 0 && <p className="text-[11px] text-mist"><span className="text-essence-fire">{pool.reserved}</span> held</p>}
                      </div>
                      <Link to={`${pagePath(system.version, 'talents')}?path=${p.id}`}
                        className="inline-flex items-center gap-1 text-xs font-display text-gold hover:text-gold-bright print:hidden">
                        <Network size={12} /> Open tree
                      </Link>
                    </header>
                    <div className="space-y-5">
                      {groupByTier(visibleIn(p.id)).map(({ tier, abilities }) => abilities.length > 0 && (
                        <div key={tier.id}>
                          <h3 className="flex items-baseline gap-2 mb-2">
                            <span className="font-display text-xs tracking-widest uppercase text-ivory">{tier.name}</span>
                            <span className="text-[11px] text-mist">Levels {tier.levels}</span>
                          </h3>
                          <div className="space-y-2">
                            {abilities.map(a => (
                              <AbilityEntry key={a.id} ctl={ctl} ability={a} path={p} open={!collapsed.has(a.id)} onToggle={() => toggle(a.id)} searchTerm={search} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SheetPage;
