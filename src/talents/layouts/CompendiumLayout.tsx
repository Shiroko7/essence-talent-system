import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { Ability, TierId } from '../../types/essence';
import {
  AbilityKind, AbilityStatus, KIND_META, SystemPath, TIER_IDS, abilitySortKey, costOf, kindOf, matchesSearch, previewText, tierInfo, tierOf
} from '../model';
import type { LayoutProps } from '../TalentPage';
import {
  AbilityBody, BudgetMeter, CharacterMenu, CostTag, EmptyState, KindTag, LearnButton, LevelStepper, PathSigil, PoolCounter,
  RestButtons, SearchField, StatusDot, UseButton, VersionSwitch
} from '../ui';

type SortKey = 'name' | 'path' | 'tier' | 'kind' | 'cost';
type StatusFilter = 'all' | 'learned' | 'available' | 'locked';

interface Row { ability: Ability; path: SystemPath }

const toggleIn = <T,>(set: Set<T>, value: T) => {
  const next = new Set(set);
  if (next.has(value)) next.delete(value); else next.add(value);
  return next;
};

const FacetCheck: React.FC<{ checked: boolean; onChange: () => void; label: React.ReactNode; count?: number; color?: string }> = ({
  checked, onChange, label, count, color
}) => (
  <label className="flex items-center gap-2 py-0.5 cursor-pointer text-sm text-parchment hover:text-ivory">
    <input type="checkbox" checked={checked} onChange={onChange} className="accent-[#c9a959]" />
    {color && <span className="w-2 h-2 rounded-full" style={{ background: color }} />}
    <span className="flex-1 truncate">{label}</span>
    {count !== undefined && <span className="text-[11px] text-mist tabular-nums">{count}</span>}
  </label>
);

/**
 * Compendium — every ability from every path in one table. Facets narrow it down,
 * columns sort it, rows expand to the full text. The right rail is the build: what
 * you have learned, your budget, and your pools.
 */
const CompendiumLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [search, setSearch] = useState('');
  const [paths, setPaths] = useState<Set<string>>(new Set());
  const [tiers, setTiers] = useState<Set<TierId>>(new Set());
  const [kinds, setKinds] = useState<Set<AbilityKind>>(new Set());
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'tier', dir: 1 });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).closest('input, textarea, select');
      if (e.key === '/' && !typing) { e.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const allRows: Row[] = useMemo(() => system.paths.flatMap(path =>
    (system.abilitiesByPath[path.id] || []).map(ability => ({ ability, path }))
  ), [system]);

  const statusMatches = (s: AbilityStatus) =>
    status === 'all' || (status === 'learned' ? s === 'learned' : status === 'locked' ? s === 'locked' : s === 'available' || s === 'unaffordable');

  const rows = allRows
    .filter(({ ability, path }) =>
      (!paths.size || paths.has(path.id)) &&
      (!tiers.size || tiers.has(tierOf(ability))) &&
      (!kinds.size || kinds.has(kindOf(ability))) &&
      matchesSearch(ability, search) &&
      statusMatches(ctl.statusOf(ability, path.id))
    )
    .sort((a, b) => {
      const pathOrder = system.paths.indexOf(a.path) - system.paths.indexOf(b.path);
      const tierOrder = TIER_IDS.indexOf(tierOf(a.ability)) - TIER_IDS.indexOf(tierOf(b.ability));
      let diff = 0;
      if (sort.key === 'name') diff = a.ability.name.localeCompare(b.ability.name);
      if (sort.key === 'path') diff = pathOrder || tierOrder;
      if (sort.key === 'tier') diff = tierOrder || pathOrder;
      if (sort.key === 'kind') diff = abilitySortKey(a.ability) - abilitySortKey(b.ability);
      if (sort.key === 'cost') diff = costOf(a.ability) - costOf(b.ability);
      return diff * sort.dir || a.ability.name.localeCompare(b.ability.name);
    });

  const activeFilterCount = paths.size + tiers.size + kinds.size + (status !== 'all' ? 1 : 0);
  const clearFilters = () => { setPaths(new Set()); setTiers(new Set()); setKinds(new Set()); setStatus('all'); };

  const header = (id: SortKey, children: React.ReactNode, className = '') => (
    <th className={`px-3 py-2 font-display text-[11px] tracking-widest uppercase text-gold font-normal ${className}`}>
      <button
        onClick={() => setSort(prev => ({ key: id, dir: prev.key === id ? (prev.dir === 1 ? -1 : 1) : 1 }))}
        className="inline-flex items-center gap-1 hover:text-gold-bright"
      >
        {children}
        {sort.key === id && (sort.dir === 1 ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
      </button>
    </th>
  );

  const facets = (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim mb-1.5">Status</h3>
        {(['all', 'learned', 'available', 'locked'] as StatusFilter[]).map(s => (
          <label key={s} className="flex items-center gap-2 py-0.5 cursor-pointer text-sm text-parchment capitalize">
            <input type="radio" name="status" checked={status === s} onChange={() => setStatus(s)} className="accent-[#c9a959]" /> {s}
          </label>
        ))}
      </div>
      <div>
        <h3 className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim mb-1.5">Type</h3>
        {(Object.keys(KIND_META) as AbilityKind[]).map(k => (
          <FacetCheck key={k} checked={kinds.has(k)} onChange={() => setKinds(toggleIn(kinds, k))} label={KIND_META[k].label} color={KIND_META[k].color}
            count={allRows.filter(r => kindOf(r.ability) === k).length} />
        ))}
      </div>
      <div>
        <h3 className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim mb-1.5">Tier</h3>
        {TIER_IDS.map(t => (
          <FacetCheck key={t} checked={tiers.has(t)} onChange={() => setTiers(toggleIn(tiers, t))} label={tierInfo(t).name}
            count={allRows.filter(r => tierOf(r.ability) === t).length} />
        ))}
      </div>
      {system.groups.map(group => (
        <div key={group.id}>
          <h3 className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim mb-1.5">{system.groups.length > 1 ? group.label : 'Path'}</h3>
          {system.paths.filter(p => p.groupId === group.id).map(p => (
            <FacetCheck key={p.id} checked={paths.has(p.id)} onChange={() => setPaths(toggleIn(paths, p.id))} label={p.name} color={p.accent}
              count={(system.abilitiesByPath[p.id] || []).length} />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-[1700px] mx-auto">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="font-display text-lg text-ivory tracking-wide">{system.name} Compendium</h1>
        <VersionSwitch current={system.version} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px] gap-4 items-start">
        {/* Facets */}
        <aside className="arcane-panel p-4 hidden lg:block lg:sticky lg:top-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-xs tracking-widest uppercase text-ivory">Filters</span>
            {activeFilterCount > 0 && <button onClick={clearFilters} className="text-[11px] text-gold hover:text-gold-bright">Clear {activeFilterCount}</button>}
          </div>
          {facets}
        </aside>

        {/* Table */}
        <section className="arcane-panel min-w-0">
          <div className="p-3 border-b border-gold-subtle flex items-center gap-2">
            <button onClick={() => setFiltersOpen(true)} className="lg:hidden arcane-btn !px-2.5 !py-1.5 text-xs flex items-center gap-1.5">
              <SlidersHorizontal size={13} /> Filters{activeFilterCount ? ` (${activeFilterCount})` : ''}
            </button>
            <div className="flex-1"><SearchField value={search} onChange={setSearch} inputRef={searchRef} placeholder="Search names and rules text…  ( / )" /></div>
            <span className="text-xs text-mist whitespace-nowrap tabular-nums">{rows.length} of {allRows.length}</span>
          </div>

          {rows.length === 0 ? (
            <EmptyState title="No abilities match">Loosen a filter or clear the search.</EmptyState>
          ) : (
            <table className="w-full text-left border-collapse md:table-fixed">
              <thead className="sticky top-0 z-10 bg-slate/95 backdrop-blur hidden md:table-header-group">
                <tr className="border-b border-gold-subtle">
                  <th className="w-10" />
                  {header('name', 'Ability')}
                  {header('path', 'Path', 'w-32')}
                  {header('tier', 'Tier', 'w-40')}
                  {header('kind', 'Type', 'w-24')}
                  {header('cost', 'Cost', 'w-16 text-right')}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ ability, path }) => {
                  const s = ctl.statusOf(ability, path.id);
                  const open = expanded === ability.id;
                  return (
                    <React.Fragment key={ability.id}>
                      <tr
                        onClick={() => setExpanded(open ? null : ability.id)}
                        className={`border-b border-gold-subtle/40 cursor-pointer transition-colors flex flex-wrap md:table-row items-center ${open ? 'bg-charcoal' : 'hover:bg-charcoal/40'} ${s === 'locked' ? 'opacity-55' : ''}`}
                      >
                        <td className="pl-3 py-2 md:w-10">
                          <button onClick={e => { e.stopPropagation(); ctl.toggle(ability, path.id); }} aria-label={s === 'learned' ? 'Unlearn' : 'Learn'}>
                            <StatusDot status={s} accent={path.accent} />
                          </button>
                        </td>
                        <td className="px-3 py-2 flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center gap-1.5">
                            <ChevronRight size={12} className={`text-mist flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
                            <span className={`text-[15px] ${s === 'learned' ? 'text-ivory font-semibold' : 'text-parchment'}`}>{ability.name}</span>
                          </div>
                          {!open && <div className="text-xs text-mist truncate pl-[18px]">{previewText(ability.description, 100)}</div>}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap overflow-hidden">
                          <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: path.accent }}>
                            {path.icon(13)} {path.name}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-sm text-fog whitespace-nowrap">{tierInfo(tierOf(ability)).name}</td>
                        <td className="px-3 py-2"><KindTag ability={ability} compact /></td>
                        <td className="px-3 py-2 text-right"><CostTag ability={ability} /></td>
                      </tr>
                      {open && (
                        <tr className="bg-charcoal/50 border-b border-gold-subtle flex md:table-row">
                          <td />
                          <td colSpan={5} className="px-3 pb-4 pt-1 flex-1">
                            <div className="max-w-3xl">
                              <AbilityBody ctl={ctl} ability={ability} path={path} searchTerm={search} />
                              <div className="flex items-center gap-3 mt-4">
                                <LearnButton ctl={ctl} ability={ability} path={path} />
                                <UseButton ctl={ctl} ability={ability} path={path} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        {/* Build rail */}
        <aside className="arcane-panel p-4 xl:sticky xl:top-4 space-y-4 lg:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <span className="font-display text-xs tracking-widest uppercase text-ivory">Your build</span>
            <CharacterMenu ctl={ctl} />
          </div>
          <LevelStepper ctl={ctl} />
          <BudgetMeter ctl={ctl} />
          <div>
            <h3 className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim mb-2">Pools</h3>
            {ctl.learnedPaths.length === 0 && <p className="text-xs text-mist">Nothing learned yet.</p>}
            <div className="space-y-1.5">
              {ctl.learnedPaths.map(p => (
                <div key={p.id} className="flex items-center gap-2">
                  <PathSigil path={p} size={22} />
                  <span className="flex-1 text-xs font-display truncate" style={{ color: p.accent }}>{p.name}</span>
                  <PoolCounter ctl={ctl} path={p} />
                </div>
              ))}
            </div>
            <div className="mt-3"><RestButtons ctl={ctl} compact /></div>
          </div>
          <div>
            <h3 className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim mb-2">Learned ({ctl.selectedIds.length})</h3>
            <ul className="space-y-0.5 max-h-80 overflow-y-auto">
              {ctl.selectedIds.map(id => {
                const path = ctl.pathOf(id);
                const ability = path && system.abilitiesByPath[path.id].find(a => a.id === id);
                if (!path || !ability) return null;
                return (
                  <li key={id} className="group flex items-center gap-2 text-sm py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: path.accent }} />
                    <button onClick={() => setExpanded(id)} className="flex-1 truncate text-left text-parchment hover:text-gold-bright">{ability.name}</button>
                    <CostTag ability={ability} />
                    <button onClick={() => ctl.toggle(ability, path.id)} className="opacity-0 group-hover:opacity-100 text-mist hover:text-essence-fire" aria-label={`Unlearn ${ability.name}`}>
                      <X size={12} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {/* Mobile filter sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setFiltersOpen(false)}>
          <div className="absolute inset-0 bg-void/70" />
          <div className="absolute inset-y-0 left-0 w-72 bg-obsidian border-r border-gold-subtle p-4 overflow-y-auto animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-sm text-ivory">Filters</span>
              <button onClick={() => setFiltersOpen(false)} className="text-mist"><X size={16} /></button>
            </div>
            {facets}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompendiumLayout;
