import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BookOpen, Lock, Moon } from 'lucide-react';
import { Ability } from '../../types/essence';
import {
  KindFilter, SystemPath, groupByTier, learnedCount, matchesKind, pathsByGroup, previewText, searchAll, sortAbilities, tint
} from '../model';
import type { LayoutProps } from '../TalentPage';
import {
  AbilityBody, AbilityIcon, AbilityModal, BudgetMeter, CharacterMenu, EmptyState, EssenceBoard, GroupLabel, KindTag, LearnButton,
  LevelStepper, PathSigil, SearchField, Segmented, StatusDot, UseButton, VersionSwitch, ViewTabs
} from '../ui';

const KIND_OPTIONS: { id: KindFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'passive', label: 'Passive' },
  { id: 'cantrip', label: 'Cantrip' },
  { id: 'spell', label: 'Spell' }
];

type View = 'talents' | 'essence';

interface Section {
  key: string;
  label: React.ReactNode;
  locked?: boolean;
  path: SystemPath;
  abilities: Ability[];
}

/**
 * Grimoire — a three-pane reader. Paths on the left, an index that climbs from
 * Initiate at the bottom, and an inspector on the right that shows the selected
 * ability or, when idle, the whole build. Essence tracking is its own tab.
 */
const GrimoireLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [view, setView] = useState<View>('talents');
  const [pathId, setPathId] = useState(system.paths[0].id);
  const [kind, setKind] = useState<KindFilter>('all');
  const [search, setSearch] = useState('');
  const [focusId, setFocusId] = useState<string | null>(null);
  const [mobileDetail, setMobileDetail] = useState<Ability | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const path = system.paths.find(p => p.id === pathId)!;
  const searching = search.trim().length > 0;

  // Rows to render: search results across every path, or one path's tiers.
  const sections: Section[] = searching
    ? searchAll(system, search, kind).map(({ path: p, abilities }) => ({
      key: p.id,
      path: p,
      abilities,
      label: <span className="flex items-center gap-2" style={{ color: p.accent }}>{p.icon(13)} {p.name}</span>
    }))
    : groupByTier((system.abilitiesByPath[pathId] || []).filter(a => matchesKind(a, kind)), 'ascending')
      .filter(t => t.abilities.length > 0)
      .map(({ tier, abilities }) => ({
        key: tier.id,
        path,
        abilities,
        locked: !ctl.tierUnlocked(tier.id, pathId),
        label: (
          <span className="flex items-center gap-2 text-gold">
            {tier.name}
            <span className="text-mist normal-case tracking-normal font-body">Levels {tier.levels} · {tier.pointCost} pt</span>
          </span>
        )
      }));

  const visible = sections.flatMap(s => s.abilities.map(a => ({ ability: a, path: s.path })));
  const focusedPath = focusId ? ctl.pathOf(focusId) ?? null : null;
  const focused = focusedPath ? system.abilitiesByPath[focusedPath.id].find(a => a.id === focusId) ?? null : null;

  // The tree grows upward, so each path opens scrolled down to Initiate.
  useLayoutEffect(() => {
    const el = listRef.current;
    if (view !== 'talents' || !el) return;
    el.scrollTop = searching ? 0 : el.scrollHeight;
  }, [pathId, view, searching, search, kind]);

  const [pendingFocus, setPendingFocus] = useState<string | null>(null);
  useEffect(() => {
    setFocusId(pendingFocus);
    setPendingFocus(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathId]);

  const openPath = (id: string, abilityId?: string) => {
    setView('talents');
    setSearch('');
    if (id === pathId) setFocusId(abilityId ?? null);
    else { setPendingFocus(abilityId ?? null); setPathId(id); }
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (!visible.length) return;
    const index = visible.findIndex(v => v.ability.id === focusId);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = e.key === 'ArrowDown'
        ? Math.min(visible.length - 1, index + 1)
        : Math.max(0, index < 0 ? visible.length - 1 : index - 1);
      setFocusId(visible[next].ability.id);
      listRef.current?.querySelector(`[data-id="${visible[next].ability.id}"]`)?.scrollIntoView({ block: 'nearest' });
    } else if ((e.key === 'Enter' || e.key === ' ') && focused && focusedPath) {
      e.preventDefault();
      ctl.toggle(focused, focusedPath.id);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Top bar */}
      <div className="arcane-panel px-4 py-3 mb-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-lg text-ivory tracking-wide">{system.name}</h1>
          <VersionSwitch current={system.version} />
        </div>
        <ViewTabs
          value={view}
          onChange={setView}
          options={[
            { id: 'talents', label: 'Talents', icon: BookOpen },
            { id: 'essence', label: 'Essence', icon: Moon, badge: ctl.learnedPaths.length }
          ]}
        />
        <div className="flex-1 min-w-[180px] max-w-sm">
          <SearchField value={search} onChange={v => { setSearch(v); if (v) setView('talents'); }} placeholder="Search every path…" />
        </div>
        <div className="flex flex-wrap items-center gap-4 ml-auto">
          <LevelStepper ctl={ctl} />
          <BudgetMeter ctl={ctl} className="w-44" />
          <CharacterMenu ctl={ctl} />
        </div>
      </div>

      {view === 'essence' ? (
        <div className="arcane-panel p-5">
          <EssenceBoard ctl={ctl} onOpenPath={id => openPath(id)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_minmax(340px,420px)] gap-4 lg:h-[calc(100vh-15rem)] lg:min-h-[560px]">
          {/* Path rail */}
          <aside className="arcane-panel flex flex-col min-h-0">
            <div className="lg:hidden p-3">
              <select value={pathId} onChange={e => openPath(e.target.value)} className="arcane-input w-full py-2 px-3 text-sm font-display">
                {system.paths.map(p => <option key={p.id} value={p.id} className="bg-obsidian">{p.name}</option>)}
              </select>
            </div>
            <nav className="hidden lg:block flex-1 overflow-y-auto p-2">
              {pathsByGroup(system).map(({ group, paths }) => (
                <div key={group.id} className="mb-3">
                  {system.groups.length > 1 && <GroupLabel label={group.label} accent={group.accent} className="px-2 pt-1 pb-1.5" />}
                  {paths.map(p => {
                    const active = p.id === pathId && !searching;
                    const count = learnedCount(ctl, p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => openPath(p.id)}
                        className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left transition-colors ${active ? 'bg-charcoal' : 'hover:bg-charcoal/50'}`}
                        style={active ? { boxShadow: `inset 2px 0 0 ${p.accent}` } : undefined}
                      >
                        <PathSigil path={p} size={28} active={active} />
                        <span className={`flex-1 text-sm font-display tracking-wide truncate ${active ? 'text-ivory' : 'text-fog'}`}>{p.name}</span>
                        {count > 0 && <span className="w-2 h-2 rounded-full" style={{ background: p.accent }} title={`${count} learned`} />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </aside>

          {/* Ability index */}
          <section className="arcane-panel flex flex-col min-h-0">
            <header
              className="p-4 border-b border-gold-subtle"
              style={searching ? undefined : { background: `linear-gradient(135deg, ${tint(path.accent, 0.1)}, transparent 55%)` }}
            >
              {searching ? (
                <h2 className="font-display text-lg text-ivory mb-3">
                  Results for “{search}” <span className="text-sm text-mist">{visible.length}</span>
                </h2>
              ) : (
                <div className="flex items-start gap-3 mb-3">
                  <PathSigil path={path} size={40} active />
                  <div className="min-w-0">
                    <h2 className="font-display text-xl text-ivory tracking-wide leading-tight">{path.name}</h2>
                    <p className="text-sm text-fog truncate">{path.concept}{path.patron && <span className="text-mist"> · {path.patron}</span>}</p>
                  </div>
                </div>
              )}
              <Segmented value={kind} options={KIND_OPTIONS} onChange={setKind} size="xs" />
            </header>

            <div ref={listRef} tabIndex={0} onKeyDown={onListKey} className="flex-1 overflow-y-auto focus:outline-none">
              {visible.length === 0 && <EmptyState title="Nothing matches">Try another type filter or search term.</EmptyState>}
              {sections.map(section => (
                <div key={section.key}>
                  <div className="sticky top-0 z-10 px-4 py-1.5 bg-slate/95 backdrop-blur border-b border-gold-subtle flex items-center gap-2 font-display text-xs tracking-widest uppercase">
                    {section.label}
                    {section.locked && <Lock size={11} className="text-mist ml-auto" />}
                  </div>
                  {section.abilities.map(ability => {
                    const status = ctl.statusOf(ability, section.path.id);
                    const isFocused = ability.id === focusId;
                    return (
                      <div
                        key={ability.id}
                        data-id={ability.id}
                        onClick={() => { setFocusId(ability.id); if (window.innerWidth < 1024) setMobileDetail(ability); }}
                        className={`flex items-center gap-3 px-4 py-2 border-b border-gold-subtle/40 cursor-pointer transition-colors ${
                          isFocused ? 'bg-charcoal' : 'hover:bg-charcoal/40'
                        } ${status === 'locked' ? 'opacity-50' : ''}`}
                        style={isFocused ? { boxShadow: `inset 2px 0 0 ${section.path.accent}` } : undefined}
                      >
                        <button
                          onClick={e => { e.stopPropagation(); ctl.toggle(ability, section.path.id); }}
                          aria-label={status === 'learned' ? `Unlearn ${ability.name}` : `Learn ${ability.name}`}
                        >
                          <StatusDot status={status} accent={section.path.accent} />
                        </button>
                        <AbilityIcon ability={ability} path={section.path} status={status} size={30} />
                        <div className="flex-1 min-w-0">
                          <div className={`text-[15px] truncate ${status === 'learned' ? 'text-ivory font-semibold' : 'text-parchment'}`}>{ability.name}</div>
                          <div className="text-xs text-mist truncate">{previewText(ability.description, 90)}</div>
                        </div>
                        <span onClick={e => e.stopPropagation()}><UseButton ctl={ctl} ability={ability} path={section.path} compact /></span>
                        <KindTag ability={ability} compact />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <p className="px-4 py-2 text-[11px] text-mist border-t border-gold-subtle hidden lg:block">
              ↑ ↓ browse · Enter learn / unlearn · Initiate is at the bottom, mastery climbs upward
            </p>
          </section>

          {/* Inspector, or the whole build when nothing is selected */}
          <aside className="arcane-panel hidden lg:flex flex-col min-h-0">
            {focused && focusedPath ? (
              <>
                <header className="p-5 border-b border-gold-subtle flex items-center gap-3">
                  <AbilityIcon ability={focused} path={focusedPath} status={ctl.statusOf(focused, focusedPath.id)} size={48} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-display tracking-[0.2em] uppercase" style={{ color: focusedPath.accent }}>{focusedPath.name}</p>
                    <h2 className="font-display text-xl text-ivory leading-tight">{focused.name}</h2>
                  </div>
                </header>
                <div className="flex-1 overflow-y-auto p-5">
                  <AbilityBody ctl={ctl} ability={focused} path={focusedPath} searchTerm={search} />
                </div>
                <footer className="p-4 border-t border-gold-subtle flex items-center gap-3">
                  <button onClick={() => setFocusId(null)} className="text-xs text-mist hover:text-parchment whitespace-nowrap">← Your build</button>
                  <UseButton ctl={ctl} ability={focused} path={focusedPath} />
                  <LearnButton ctl={ctl} ability={focused} path={focusedPath} className="ml-auto" />
                </footer>
              </>
            ) : (
              <>
                <header className="p-5 border-b border-gold-subtle">
                  <h2 className="font-display text-lg text-ivory tracking-wide">Your build</h2>
                  <p className="text-xs text-mist">
                    {ctl.selectedIds.length} abilities across {ctl.learnedPaths.length} paths · {ctl.pointsLeft} points left
                  </p>
                </header>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {ctl.learnedPaths.length === 0 && <EmptyState title="Nothing learned yet">Select an ability to read it, then learn it.</EmptyState>}
                  {pathsByGroup(system, ctl.learnedPaths).map(({ group, paths }) => (
                    <div key={group.id}>
                      {system.groups.length > 1 && <GroupLabel label={group.label} accent={group.accent} className="mb-2" />}
                      <div className="space-y-3">
                        {paths.map(p => (
                          <div key={p.id}>
                            <button
                              onClick={() => openPath(p.id)}
                              className="flex items-center gap-2 font-display text-sm mb-1 hover:underline underline-offset-4"
                              style={{ color: p.accent }}
                            >
                              {p.icon(14)} {p.name}
                            </button>
                            <ul>
                              {sortAbilities((system.abilitiesByPath[p.id] || []).filter(a => ctl.isLearned(a.id))).map(a => (
                                <li key={a.id} className="flex items-center gap-2 py-0.5">
                                  <AbilityIcon ability={a} path={p} status="learned" size={22} />
                                  <button onClick={() => openPath(p.id, a.id)} className="flex-1 truncate text-left text-sm text-parchment hover:text-gold-bright">
                                    {a.name}
                                  </button>
                                  <UseButton ctl={ctl} ability={a} path={p} compact />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      <AbilityModal ctl={ctl} ability={mobileDetail} onClose={() => setMobileDetail(null)} />
    </div>
  );
};

export default GrimoireLayout;
