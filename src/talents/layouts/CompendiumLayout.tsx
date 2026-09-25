import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronRight, Lock, Moon, SlidersHorizontal, Table2, X } from 'lucide-react';
import { Ability, TierId } from '../../types/essence';
import {
  AbilityKind, AbilityStatus, KIND_META, SystemPath, TIER_IDS, TalentController, abilitySortKey, groupByTier, kindOf, matchesSearch,
  pathsByGroup, previewText, sortAbilities, tierInfo, tierOf, tint
} from '../model';
import type { LayoutProps } from '../TalentPage';
import {
  AbilityBody, AbilityIcon, BudgetMeter, CharacterMenu, EmptyState, EssenceBoard, GroupLabel, KindTag, LearnButton, LevelStepper,
  PathSigil, SearchField, Segmented, StatusDot, UseButton, VersionSwitch, ViewTabs
} from '../ui';

type SortKey = 'name' | 'path' | 'tier' | 'kind' | 'status';
type StatusFilter = 'all' | 'learned' | 'available' | 'locked';
type View = 'talents' | 'essence';

interface Row { ability: Ability; path: SystemPath }

const STATUS_ORDER: Record<AbilityStatus, number> = { learned: 0, available: 1, unaffordable: 2, locked: 3 };
const STATUS_LABEL: Record<AbilityStatus, string> = { learned: 'Learned', available: 'Available', unaffordable: 'No points', locked: 'Locked' };

const toggleIn = <T,>(set: Set<T>, value: T) => {
  const next = new Set(set);
  if (next.has(value)) next.delete(value); else next.add(value);
  return next;
};

const FacetCheck: React.FC<{ checked: boolean; onChange: () => void; label: React.ReactNode; color?: string }> = ({ checked, onChange, label, color }) => (
  <label className="flex items-center gap-2 py-0.5 cursor-pointer text-sm text-parchment hover:text-ivory">
    <input type="checkbox" checked={checked} onChange={onChange} className="accent-[#c9a959]" />
    {color && <span className="w-2 h-2 rounded-full" style={{ background: color }} />}
    <span className="flex-1 truncate">{label}</span>
  </label>
);

/** I–V chips showing how far up a path the character can reach. */
const TierLadder: React.FC<{ ctl: TalentController; path: SystemPath }> = ({ ctl, path }) => (
  <div className="flex items-center gap-1">
    {TIER_IDS.map((t, i) => {
      const open = ctl.tierUnlocked(t, path.id);
      const learned = (ctl.system.abilitiesByPath[path.id] || []).some(a => tierOf(a) === t && ctl.isLearned(a.id));
      return (
        <React.Fragment key={t}>
          {i > 0 && <span className="w-2 h-px" style={{ background: open ? path.accent : 'rgba(106,106,122,0.4)' }} />}
          <span
            title={`${tierInfo(t).name}: ${learned ? 'learned' : open ? 'open' : 'locked'}`}
            className="w-6 h-6 rounded-full flex items-center justify-center font-display text-[10px] border"
            style={{
              borderColor: open ? path.accent : 'rgba(106,106,122,0.4)',
              background: learned ? path.accent : open ? tint(path.accent, 0.12) : 'transparent',
              color: learned ? '#0a0a0f' : open ? path.accent : '#6a6a7a'
            }}
          >
            {open ? ['I', 'II', 'III', 'IV', 'V'][i] : <Lock size={9} />}
          </span>
        </React.Fragment>
      );
    })}
  </div>
);

/** A single ability row; expands in place to the full text. */
const AbilityRow: React.FC<{
  ctl: TalentController; ability: Ability; path: SystemPath; open: boolean; onToggleOpen: () => void; search: string; showPath?: boolean;
}> = ({ ctl, ability, path, open, onToggleOpen, search, showPath }) => {
  const s = ctl.statusOf(ability, path.id);
  return (
    <div className={`border-b border-gold-subtle/40 ${open ? 'bg-charcoal/60' : ''} ${s === 'locked' ? 'opacity-60' : ''}`}>
      <div onClick={onToggleOpen} className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-charcoal/40">
        <button onClick={e => { e.stopPropagation(); ctl.toggle(ability, path.id); }} aria-label={s === 'learned' ? 'Unlearn' : 'Learn'}>
          <StatusDot status={s} accent={path.accent} />
        </button>
        <AbilityIcon ability={ability} path={path} status={s} size={28} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <ChevronRight size={12} className={`text-mist flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
            <span className={`text-[15px] truncate ${s === 'learned' ? 'text-ivory font-semibold' : 'text-parchment'}`}>{ability.name}</span>
          </div>
          {!open && <div className="text-xs text-mist truncate pl-[18px]">{previewText(ability.description, 110)}</div>}
        </div>
        {showPath && (
          <span className="hidden md:inline-flex items-center gap-1.5 text-sm w-32 flex-shrink-0 truncate" style={{ color: path.accent }}>{path.icon(13)} {path.name}</span>
        )}
        {showPath && <span className="hidden md:block text-sm text-fog w-36 flex-shrink-0 truncate">{tierInfo(tierOf(ability)).name}</span>}
        {showPath && <span className="hidden md:block text-xs text-fog w-16 flex-shrink-0">{STATUS_LABEL[s]}</span>}
        <span className="w-[68px] flex justify-end flex-shrink-0" onClick={e => e.stopPropagation()}>
          <UseButton ctl={ctl} ability={ability} path={path} compact />
        </span>
        <span className="w-20 flex justify-end flex-shrink-0"><KindTag ability={ability} compact /></span>
      </div>
      {open && (
        <div className="px-4 pb-4 pt-1 pl-14 max-w-4xl">
          <AbilityBody ctl={ctl} ability={ability} path={path} searchTerm={search} />
          <div className="mt-4"><LearnButton ctl={ctl} ability={ability} path={path} /></div>
        </div>
      )}
    </div>
  );
};

/**
 * Compendium — every ability in one reference. Grouped by path (with a tier
 * ladder showing what is open) or as one flat sortable table. Facets narrow it
 * down; the right rail is the build; essence tracking is its own tab.
 */
const CompendiumLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [view, setView] = useState<View>('talents');
  const [mode, setMode] = useState<'grouped' | 'table'>('grouped');
  const [search, setSearch] = useState('');
  const [paths, setPaths] = useState<Set<string>>(new Set());
  const [tiers, setTiers] = useState<Set<TierId>>(new Set());
  const [kinds, setKinds] = useState<Set<AbilityKind>>(new Set());
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'path', dir: 1 });
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

  const rows = allRows.filter(({ ability, path }) =>
    (!paths.size || paths.has(path.id)) &&
    (!tiers.size || tiers.has(tierOf(ability))) &&
    (!kinds.size || kinds.has(kindOf(ability))) &&
    matchesSearch(ability, search) &&
    statusMatches(ctl.statusOf(ability, path.id))
  );

  const sortedRows = [...rows].sort((a, b) => {
    const pathOrder = system.paths.indexOf(a.path) - system.paths.indexOf(b.path);
    const tierOrder = TIER_IDS.indexOf(tierOf(a.ability)) - TIER_IDS.indexOf(tierOf(b.ability));
    let diff = 0;
    if (sort.key === 'name') diff = a.ability.name.localeCompare(b.ability.name);
    if (sort.key === 'path') diff = pathOrder || tierOrder;
    if (sort.key === 'tier') diff = tierOrder || pathOrder;
    if (sort.key === 'kind') diff = abilitySortKey(a.ability) - abilitySortKey(b.ability);
    if (sort.key === 'status') diff = STATUS_ORDER[ctl.statusOf(a.ability, a.path.id)] - STATUS_ORDER[ctl.statusOf(b.ability, b.path.id)];
    return diff * sort.dir || a.ability.name.localeCompare(b.ability.name);
  });

  const activeFilterCount = paths.size + tiers.size + kinds.size + (status !== 'all' ? 1 : 0);
  const clearFilters = () => { setPaths(new Set()); setTiers(new Set()); setKinds(new Set()); setStatus('all'); };

  const header = (id: SortKey, label: string, className = '') => (
    <button
      onClick={() => setSort(prev => ({ key: id, dir: prev.key === id ? (prev.dir === 1 ? -1 : 1) : 1 }))}
      className={`inline-flex items-center gap-1 font-display text-[11px] tracking-widest uppercase text-gold hover:text-gold-bright ${className}`}
    >
      {label}
      {sort.key === id && (sort.dir === 1 ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
    </button>
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
          <FacetCheck key={k} checked={kinds.has(k)} onChange={() => setKinds(toggleIn(kinds, k))} label={KIND_META[k].label} color={KIND_META[k].color} />
        ))}
      </div>
      <div>
        <h3 className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim mb-1.5">Tier</h3>
        {TIER_IDS.map(t => <FacetCheck key={t} checked={tiers.has(t)} onChange={() => setTiers(toggleIn(tiers, t))} label={tierInfo(t).name} />)}
      </div>
      {pathsByGroup(system).map(({ group, paths: groupPaths }) => (
        <div key={group.id}>
          <GroupLabel label={system.groups.length > 1 ? group.label : 'Path'} accent={group.accent} className="mb-1.5" />
          {groupPaths.map(p => (
            <FacetCheck key={p.id} checked={paths.has(p.id)} onChange={() => setPaths(toggleIn(paths, p.id))} label={p.name} color={p.accent} />
          ))}
        </div>
      ))}
    </div>
  );

  const grouped = system.paths
    .map(path => ({ path, abilities: sortAbilities(rows.filter(r => r.path === path).map(r => r.ability)) }))
    .filter(g => g.abilities.length > 0);

  return (
    <div className="max-w-[1700px] mx-auto">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="font-display text-lg text-ivory tracking-wide">{system.name} Compendium</h1>
        <VersionSwitch current={system.version} />
        <div className="ml-auto">
          <ViewTabs
            value={view}
            onChange={setView}
            options={[
              { id: 'talents', label: 'Compendium', icon: Table2 },
              { id: 'essence', label: 'Essence', icon: Moon, badge: ctl.learnedPaths.length }
            ]}
          />
        </div>
      </div>

      {view === 'essence' ? (
        <div className="arcane-panel p-5">
          <EssenceBoard ctl={ctl} onOpenPath={id => { setView('talents'); setPaths(new Set([id])); }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px] gap-4 items-start">
          {/* Facets — scroll independently of the page */}
          <aside className="arcane-panel hidden lg:flex flex-col lg:sticky lg:top-4 lg:max-h-[calc(100vh-7rem)]">
            <div className="flex items-center justify-between p-4 pb-3 border-b border-gold-subtle">
              <span className="font-display text-xs tracking-widest uppercase text-ivory">Filters</span>
              {activeFilterCount > 0 && <button onClick={clearFilters} className="text-[11px] text-gold hover:text-gold-bright">Clear {activeFilterCount}</button>}
            </div>
            <div className="overflow-y-auto p-4">{facets}</div>
          </aside>

          {/* Results */}
          <section className="arcane-panel min-w-0">
            <div className="p-3 border-b border-gold-subtle flex flex-wrap items-center gap-2">
              <button onClick={() => setFiltersOpen(true)} className="lg:hidden arcane-btn !px-2.5 !py-1.5 text-xs flex items-center gap-1.5">
                <SlidersHorizontal size={13} /> Filters{activeFilterCount ? ` (${activeFilterCount})` : ''}
              </button>
              <div className="flex-1 min-w-[200px]"><SearchField value={search} onChange={setSearch} inputRef={searchRef} placeholder="Search names and rules text…  ( / )" /></div>
              <Segmented value={mode} onChange={setMode} size="xs" options={[{ id: 'grouped', label: 'By path' }, { id: 'table', label: 'Table' }]} />
              <span className="text-xs text-mist whitespace-nowrap tabular-nums">{rows.length} of {allRows.length}</span>
            </div>

            {rows.length === 0 ? (
              <EmptyState title="No abilities match">Loosen a filter or clear the search.</EmptyState>
            ) : mode === 'grouped' ? (
              <div>
                {grouped.map(({ path, abilities }) => (
                  <section key={path.id} className="border-b border-gold-subtle">
                    <header
                      className="sticky top-0 z-10 flex flex-wrap items-center gap-3 px-4 py-2.5 backdrop-blur border-b border-gold-subtle"
                      style={{ background: `linear-gradient(90deg, ${tint(path.accent, 0.14)}, rgba(26,26,36,0.96) 50%)` }}
                    >
                      <PathSigil path={path} size={30} active />
                      <h2 className="font-display text-base tracking-wide" style={{ color: path.accent }}>{path.name}</h2>
                      <span className="text-xs text-mist hidden sm:inline">{path.concept}</span>
                      <div className="ml-auto"><TierLadder ctl={ctl} path={path} /></div>
                    </header>
                    {groupByTier(abilities, 'ascending').map(({ tier, abilities: tierAbilities }) => {
                      if (!tierAbilities.length) return null;
                      const open = ctl.tierUnlocked(tier.id, path.id);
                      return (
                        <div key={tier.id}>
                          <div className="flex items-center gap-2 px-4 py-1.5 bg-void/40 border-b border-gold-subtle/50">
                            {!open && <Lock size={11} className="text-mist" />}
                            <span className="font-display text-[11px] tracking-widest uppercase text-gold">{tier.name}</span>
                            <span className="text-[11px] text-mist">Levels {tier.levels} · {tier.pointCost} pt</span>
                            {!open && (
                              <span className="ml-auto text-[11px] text-fog">
                                {ctl.level < tier.levelRequirement ? `Opens at level ${tier.levelRequirement}` : ctl.lockReason(tierAbilities[0], path.id)}
                              </span>
                            )}
                          </div>
                          {tierAbilities.map(a => (
                            <AbilityRow
                              key={a.id} ctl={ctl} ability={a} path={path} search={search}
                              open={expanded === a.id} onToggleOpen={() => setExpanded(expanded === a.id ? null : a.id)}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </section>
                ))}
              </div>
            ) : (
              <div>
                <div className="sticky top-0 z-10 hidden md:flex items-center gap-3 px-3 py-2 bg-slate/95 backdrop-blur border-b border-gold-subtle">
                  <span className="w-5" />
                  <span className="w-7" />
                  <span className="flex-1 pl-[18px]">{header('name', 'Ability')}</span>
                  <span className="w-32">{header('path', 'Path')}</span>
                  <span className="w-36">{header('tier', 'Tier')}</span>
                  <span className="w-16">{header('status', 'Status')}</span>
                  <span className="w-[68px]" />
                  <span className="w-20 text-right">{header('kind', 'Type')}</span>
                </div>
                {sortedRows.map(({ ability, path }) => (
                  <AbilityRow
                    key={ability.id} ctl={ctl} ability={ability} path={path} search={search} showPath
                    open={expanded === ability.id} onToggleOpen={() => setExpanded(expanded === ability.id ? null : ability.id)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Build rail */}
          <aside className="arcane-panel p-4 xl:sticky xl:top-4 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto space-y-4 lg:col-span-2 xl:col-span-1">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs tracking-widest uppercase text-ivory">Your build</span>
              <CharacterMenu ctl={ctl} />
            </div>
            <LevelStepper ctl={ctl} />
            <BudgetMeter ctl={ctl} />
            <button onClick={() => setView('essence')} className="arcane-btn w-full !py-2 text-xs flex items-center justify-center gap-2">
              <Moon size={13} /> Track essence
            </button>
            {ctl.learnedPaths.length === 0 && <p className="text-xs text-mist">Nothing learned yet.</p>}
            {pathsByGroup(system, ctl.learnedPaths).map(({ group, paths: groupPaths }) => (
              <div key={group.id}>
                {system.groups.length > 1 && <GroupLabel label={group.label} accent={group.accent} className="mb-2" />}
                {groupPaths.map(p => (
                  <div key={p.id} className="mb-3">
                    <p className="flex items-center gap-1.5 font-display text-xs mb-1" style={{ color: p.accent }}>{p.icon(12)} {p.name}</p>
                    <ul className="space-y-0.5">
                      {sortAbilities((system.abilitiesByPath[p.id] || []).filter(a => ctl.isLearned(a.id))).map(a => (
                        <li key={a.id} className="group flex items-center gap-2 text-sm">
                          <AbilityIcon ability={a} path={p} status="learned" size={20} />
                          <button onClick={() => { setMode('grouped'); setExpanded(a.id); }} className="flex-1 truncate text-left text-parchment hover:text-gold-bright">
                            {a.name}
                          </button>
                          <UseButton ctl={ctl} ability={a} path={p} compact />
                          <button onClick={() => ctl.toggle(a, p.id)} className="opacity-0 group-hover:opacity-100 text-mist hover:text-essence-fire" aria-label={`Unlearn ${a.name}`}>
                            <X size={12} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </aside>
        </div>
      )}

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
