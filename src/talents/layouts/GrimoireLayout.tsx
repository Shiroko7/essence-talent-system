import React, { useEffect, useRef, useState } from 'react';
import { Lock } from 'lucide-react';
import { Ability } from '../../types/essence';
import { KindFilter, groupByTier, matchesKind, matchesSearch, previewText, learnedCount, tint } from '../model';
import type { LayoutProps } from '../TalentPage';
import {
  AbilityBody, AbilityDrawer, BudgetMeter, CharacterMenu, CostTag, EmptyState, KindTag, LearnButton, LevelStepper,
  PathSigil, PoolCounter, RestButtons, SearchField, Segmented, StatusDot, UseButton, VersionSwitch
} from '../ui';

const KIND_OPTIONS: { id: KindFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'passive', label: 'Passive' },
  { id: 'cantrip', label: 'Cantrip' },
  { id: 'spell', label: 'Spell' }
];

/**
 * Grimoire — a three-pane reader. Paths on the left, a dense ability index in the
 * middle, and a persistent inspector on the right so the full text is always one
 * click (or arrow key) away. Resources live at the bottom of the path rail.
 */
const GrimoireLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [pathId, setPathId] = useState(system.paths[0].id);
  const [kind, setKind] = useState<KindFilter>('all');
  const [search, setSearch] = useState('');
  const [focusId, setFocusId] = useState<string | null>(null);
  const [mobileDetail, setMobileDetail] = useState<Ability | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const path = system.paths.find(p => p.id === pathId)!;
  const pathAbilities = system.abilitiesByPath[pathId] || [];

  const tiers = groupByTier(pathAbilities.filter(a => matchesKind(a, kind) && matchesSearch(a, search)));

  const visible = tiers.flatMap(t => t.abilities);
  const focused = visible.find(a => a.id === focusId) ?? null;

  useEffect(() => { setFocusId(null); }, [pathId]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (!visible.length) return;
    const index = visible.findIndex(a => a.id === focusId);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = e.key === 'ArrowDown' ? Math.min(visible.length - 1, index + 1) : Math.max(0, index - 1);
      setFocusId(visible[next].id);
      listRef.current?.querySelector(`[data-id="${visible[next].id}"]`)?.scrollIntoView({ block: 'nearest' });
    } else if ((e.key === 'Enter' || e.key === ' ') && focused) {
      e.preventDefault();
      ctl.toggle(focused, pathId);
    }
  };

  const groups = system.groups.map(group => ({ group, paths: system.paths.filter(p => p.groupId === group.id) }));

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Character strip */}
      <div className="arcane-panel px-4 py-3 mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-3 mr-auto">
          <h1 className="font-display text-lg text-ivory tracking-wide">{system.name}</h1>
          <VersionSwitch current={system.version} />
        </div>
        <LevelStepper ctl={ctl} />
        <BudgetMeter ctl={ctl} className="w-52" />
        <CharacterMenu ctl={ctl} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_minmax(340px,420px)] gap-4 lg:h-[calc(100vh-15rem)] lg:min-h-[560px]">
        {/* Path rail */}
        <aside className="arcane-panel flex flex-col min-h-0">
          <div className="lg:hidden p-3">
            <select value={pathId} onChange={e => setPathId(e.target.value)} className="arcane-input w-full py-2 px-3 text-sm font-display">
              {system.paths.map(p => <option key={p.id} value={p.id} className="bg-obsidian">{p.name}</option>)}
            </select>
          </div>
          <nav className="hidden lg:block flex-1 overflow-y-auto p-2">
            {groups.map(({ group, paths }) => (
              <div key={group.id} className="mb-3">
                {system.groups.length > 1 && (
                  <h3 className="px-2 pt-1 pb-1.5 font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim">{group.label}</h3>
                )}
                {paths.map(p => {
                  const active = p.id === pathId;
                  const count = learnedCount(ctl, p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPathId(p.id)}
                      className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left transition-colors ${active ? 'bg-charcoal' : 'hover:bg-charcoal/50'}`}
                      style={active ? { boxShadow: `inset 2px 0 0 ${p.accent}` } : undefined}
                    >
                      <PathSigil path={p} size={28} active={active} />
                      <span className={`flex-1 text-sm font-display tracking-wide truncate ${active ? 'text-ivory' : 'text-fog'}`}>{p.name}</span>
                      {count > 0 && (
                        <span className="text-[10px] font-display px-1.5 rounded-full" style={{ color: p.accent, background: tint(p.accent, 0.15) }}>{count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Resources */}
          <section className="border-t border-gold-subtle p-3 lg:max-h-[45%] overflow-y-auto">
            <h3 className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim mb-2">Essence pools</h3>
            {ctl.learnedPaths.length === 0 ? (
              <p className="text-xs text-mist">Learn an ability to start tracking its pool.</p>
            ) : (
              <div className="space-y-1.5 mb-3">
                {ctl.learnedPaths.map(p => (
                  <div key={p.id} className="flex items-center gap-2">
                    <span className="flex-1 text-xs font-display truncate" style={{ color: p.accent }}>{p.name}</span>
                    <PoolCounter ctl={ctl} path={p} />
                  </div>
                ))}
              </div>
            )}
            <RestButtons ctl={ctl} compact />
          </section>
        </aside>

        {/* Ability index */}
        <section className="arcane-panel flex flex-col min-h-0">
          <header className="p-4 border-b border-gold-subtle" style={{ background: `linear-gradient(135deg, ${tint(path.accent, 0.1)}, transparent 55%)` }}>
            <div className="flex items-start gap-3 mb-3">
              <PathSigil path={path} size={40} active />
              <div className="min-w-0">
                <h2 className="font-display text-xl text-ivory tracking-wide leading-tight">{path.name}</h2>
                <p className="text-sm text-fog truncate">
                  {path.concept}{path.patron && <span className="text-mist"> · {path.patron}</span>}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Segmented value={kind} options={KIND_OPTIONS} onChange={setKind} size="xs" />
              <div className="sm:ml-auto sm:w-64">
                <SearchField value={search} onChange={setSearch} placeholder={`Search ${path.name}…`} />
              </div>
            </div>
          </header>

          <div ref={listRef} tabIndex={0} onKeyDown={onListKey} className="flex-1 overflow-y-auto focus:outline-none">
            {visible.length === 0 && <EmptyState title="Nothing matches">Try another type filter or search term.</EmptyState>}
            {tiers.map(({ tier, abilities }) => {
              if (!abilities.length) return null;
              const open = ctl.tierUnlocked(tier.id, pathId);
              return (
                <div key={tier.id}>
                  <div className="sticky top-0 z-10 px-4 py-1.5 bg-slate/95 backdrop-blur border-b border-gold-subtle flex items-center gap-2">
                    <span className="font-display text-xs tracking-widest uppercase text-gold">{tier.name}</span>
                    <span className="text-[11px] text-mist">Lv {tier.levelRequirement}+</span>
                    {!open && <Lock size={11} className="text-mist ml-auto" />}
                  </div>
                  {abilities.map(ability => {
                    const status = ctl.statusOf(ability, pathId);
                    const isFocused = ability.id === focusId;
                    return (
                      <div
                        key={ability.id}
                        data-id={ability.id}
                        onClick={() => { setFocusId(ability.id); if (window.innerWidth < 1024) setMobileDetail(ability); }}
                        className={`group flex items-center gap-3 px-4 py-2 border-b border-gold-subtle/40 cursor-pointer transition-colors ${
                          isFocused ? 'bg-charcoal' : 'hover:bg-charcoal/40'
                        } ${status === 'locked' ? 'opacity-50' : ''}`}
                        style={isFocused ? { boxShadow: `inset 2px 0 0 ${path.accent}` } : undefined}
                      >
                        <button
                          onClick={e => { e.stopPropagation(); ctl.toggle(ability, pathId); }}
                          className="p-0.5 -m-0.5"
                          aria-label={status === 'learned' ? `Unlearn ${ability.name}` : `Learn ${ability.name}`}
                        >
                          <StatusDot status={status} accent={path.accent} />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className={`text-[15px] truncate ${status === 'learned' ? 'text-ivory font-semibold' : 'text-parchment'}`}>{ability.name}</div>
                          <div className="text-xs text-mist truncate">{previewText(ability.description, 90)}</div>
                        </div>
                        <KindTag ability={ability} compact />
                        <span className="w-8 text-right"><CostTag ability={ability} /></span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <p className="px-4 py-3 text-[11px] text-mist hidden lg:block">↑ ↓ to browse · Enter to learn or unlearn</p>
          </div>
        </section>

        {/* Inspector */}
        <aside className="arcane-panel hidden lg:flex flex-col min-h-0">
          {focused ? (
            <>
              <header className="p-5 border-b border-gold-subtle">
                <h2 className="font-display text-xl text-ivory leading-tight">{focused.name}</h2>
              </header>
              <div className="flex-1 overflow-y-auto p-5">
                <AbilityBody ctl={ctl} ability={focused} path={path} searchTerm={search} />
              </div>
              <footer className="p-4 border-t border-gold-subtle flex items-center gap-3">
                <UseButton ctl={ctl} ability={focused} path={path} />
                <LearnButton ctl={ctl} ability={focused} path={path} className="ml-auto" />
              </footer>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-5">
              <p className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim mb-2">{system.groups.find(g => g.id === path.groupId)?.label}</p>
              <h2 className="font-display text-2xl text-ivory mb-2">{path.name}</h2>
              {path.description && <p className="text-parchment/90 mb-4">{path.description}</p>}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {(['active', 'passive', 'cantrip', 'spell'] as const).map(k => (
                  <div key={k} className="arcane-card px-3 py-2">
                    <div className="font-display text-lg text-ivory">{pathAbilities.filter(a => matchesKind(a, k)).length}</div>
                    <div className="text-[11px] text-mist capitalize">{k}s</div>
                  </div>
                ))}
              </div>
              <h3 className="font-display text-xs tracking-widest uppercase text-gold mb-2">Learned here</h3>
              {pathAbilities.filter(a => ctl.isLearned(a.id)).length === 0 ? (
                <p className="text-sm text-mist">Nothing yet. Select an ability to read it, then learn it.</p>
              ) : (
                <ul className="space-y-1">
                  {pathAbilities.filter(a => ctl.isLearned(a.id)).map(a => (
                    <li key={a.id}>
                      <button onClick={() => setFocusId(a.id)} className="w-full flex items-center gap-2 text-left text-sm text-parchment hover:text-gold-bright">
                        <StatusDot status="learned" accent={path.accent} /> <span className="flex-1 truncate">{a.name}</span> <CostTag ability={a} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </aside>
      </div>

      <AbilityDrawer ctl={ctl} ability={mobileDetail} onClose={() => setMobileDetail(null)} />
    </div>
  );
};

export default GrimoireLayout;
