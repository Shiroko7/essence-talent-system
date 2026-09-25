import React, { useMemo, useState } from 'react';
import { ChevronDown, Hammer, Swords } from 'lucide-react';
import { Ability } from '../../types/essence';
import { SystemPath, TalentController, groupByTier, learnedCount, matchesSearch, previewText, reservesEssence, sortAbilities, tint } from '../model';
import type { LayoutProps } from '../TalentPage';
import {
  AbilityBody, BudgetMeter, CharacterMenu, CostTag, EmptyState, KindTag, LevelStepper, PathSigil, PoolCounter, PoolPips,
  RestButtons, SearchField, Segmented, StatusDot, UseButton, VersionSwitch
} from '../ui';

type Mode = 'play' | 'build';

/** A row that expands in place to show the full ability text. */
const ExpandableRow: React.FC<{
  ctl: TalentController; ability: Ability; path: SystemPath; mode: Mode; search: string;
}> = ({ ctl, ability, path, mode, search }) => {
  const [open, setOpen] = useState(false);
  const status = ctl.statusOf(ability, path.id);
  return (
    <li className={`border-b border-gold-subtle/40 last:border-0 ${status === 'locked' && mode === 'build' ? 'opacity-55' : ''}`}>
      <div className="flex items-center gap-3 py-2.5">
        {mode === 'build' && (
          <button onClick={() => ctl.toggle(ability, path.id)} aria-label={status === 'learned' ? `Unlearn ${ability.name}` : `Learn ${ability.name}`}>
            <StatusDot status={status} accent={path.accent} />
          </button>
        )}
        <button onClick={() => setOpen(!open)} className="flex-1 min-w-0 text-left">
          <span className="flex items-center gap-2">
            <span className={`text-[15px] ${status === 'learned' ? 'text-ivory font-semibold' : 'text-parchment'}`}>{ability.name}</span>
            <ChevronDown size={13} className={`text-mist transition-transform ${open ? 'rotate-180' : ''}`} />
          </span>
          {!open && <span className="block text-xs text-mist truncate">{previewText(ability.description, 110)}</span>}
        </button>
        <KindTag ability={ability} compact />
        <CostTag ability={ability} />
        {mode === 'play' && <UseButton ctl={ctl} ability={ability} path={path} compact />}
      </div>
      {open && (
        <div className="pb-4 pl-1 pr-2 animate-fade-in">
          <AbilityBody ctl={ctl} ability={ability} path={path} searchTerm={search} />
        </div>
      )}
    </li>
  );
};

/**
 * Sheet — built to sit next to a character sheet at the table. Play mode shows only
 * what the character knows, with pip trackers and one-tap Use buttons. Build mode
 * is a single-column checklist of every path, one accordion per path.
 */
const SheetLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [mode, setMode] = useState<Mode>(ctl.selectedIds.length ? 'play' : 'build');
  const [search, setSearch] = useState('');
  const [openPaths, setOpenPaths] = useState<Set<string>>(() => new Set(ctl.learnedPaths.map(p => p.id).slice(0, 1)));
  const [usableOnly, setUsableOnly] = useState(false);

  const togglePath = (id: string) => setOpenPaths(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const learnedByPath = useMemo(() => ctl.learnedPaths.map(path => ({
    path,
    abilities: sortAbilities((system.abilitiesByPath[path.id] || []).filter(a => ctl.isLearned(a.id) && matchesSearch(a, search)))
  })), [ctl, system, search]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Sheet header */}
      <div className="arcane-panel p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="mr-auto">
            <h1 className="font-display text-xl text-ivory tracking-wide">{system.name}</h1>
            <p className="text-xs text-mist">{system.tagline}</p>
          </div>
          <VersionSwitch current={system.version} />
          <CharacterMenu ctl={ctl} />
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="inline-flex rounded-lg border border-gold-accent p-1 bg-void/60">
            {([['play', 'Play', Swords], ['build', 'Build', Hammer]] as const).map(([id, label, Icon]) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md font-display text-sm tracking-wide transition-colors ${
                  mode === id ? 'bg-gold/20 text-gold-bright' : 'text-fog hover:text-parchment'
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
          <LevelStepper ctl={ctl} />
          <BudgetMeter ctl={ctl} className="flex-1 min-w-[180px]" />
        </div>
      </div>

      <div className="mb-4">
        <SearchField value={search} onChange={setSearch} placeholder={mode === 'play' ? 'Find one of your abilities…' : 'Search every path…'} />
      </div>

      {mode === 'play' ? (
        <>
          {ctl.learnedPaths.length === 0 ? (
            <div className="arcane-panel">
              <EmptyState title="No abilities learned yet">
                Switch to <button className="text-gold underline" onClick={() => setMode('build')}>Build</button> to choose your talents.
              </EmptyState>
            </div>
          ) : (
            <>
              {/* Essence pools */}
              <section className="arcane-panel p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-sm tracking-widest uppercase text-gold">Essence</h2>
                  <RestButtons ctl={ctl} compact />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ctl.learnedPaths.map(path => (
                    <div key={path.id} className="rounded-lg p-3 border" style={{ borderColor: tint(path.accent, 0.25), background: tint(path.accent, 0.05) }}>
                      <div className="flex items-center gap-2 mb-2">
                        <PathSigil path={path} size={26} />
                        <span className="font-display text-sm flex-1" style={{ color: path.accent }}>{path.name}</span>
                        <PoolCounter ctl={ctl} path={path} />
                      </div>
                      <PoolPips ctl={ctl} path={path} size="lg" />
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-mist mt-3">Tap a pip to set the pool, or use an ability below to spend its cost. Striped pips are reserved by passives and cantrips.</p>
              </section>

              {/* Known abilities */}
              <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="font-display text-sm tracking-widest uppercase text-gold">Abilities</h2>
                <Segmented value={usableOnly ? 'usable' : 'all'} onChange={v => setUsableOnly(v === 'usable')} size="xs"
                  options={[{ id: 'all', label: 'Everything' }, { id: 'usable', label: 'Actions only' }]} />
              </div>
              <div className="space-y-3">
                {learnedByPath.map(({ path, abilities }) => {
                  const shown = usableOnly ? abilities.filter(a => !reservesEssence(a)) : abilities;
                  if (!shown.length) return null;
                  return (
                    <section key={path.id} className="arcane-panel px-4 py-2" style={{ boxShadow: `inset 3px 0 0 ${path.accent}` }}>
                      <h3 className="font-display text-xs tracking-widest uppercase pt-1.5" style={{ color: path.accent }}>{path.name}</h3>
                      <ul>
                        {shown.map(a => <ExpandableRow key={a.id} ctl={ctl} ability={a} path={path} mode="play" search={search} />)}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="space-y-2">
          {system.groups.map(group => (
            <div key={group.id}>
              {system.groups.length > 1 && (
                <h2 className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim mt-5 mb-2 px-1">{group.label}</h2>
              )}
              <div className="space-y-2">
                {system.paths.filter(p => p.groupId === group.id).map(path => {
                  const all = system.abilitiesByPath[path.id] || [];
                  const matches = all.filter(a => matchesSearch(a, search));
                  if (search && !matches.length) return null;
                  const expanded = openPaths.has(path.id) || !!search;
                  const count = learnedCount(ctl, path.id);
                  return (
                    <section key={path.id} className="arcane-panel overflow-hidden">
                      <button onClick={() => togglePath(path.id)} className="w-full flex items-center gap-3 p-3 text-left hover:bg-charcoal/40">
                        <PathSigil path={path} size={34} active={count > 0} />
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-base text-ivory tracking-wide">{path.name}</div>
                          <div className="text-xs text-mist truncate">{path.concept}{path.patron && ` · ${path.patron}`}</div>
                        </div>
                        {count > 0 && <span className="text-xs font-display" style={{ color: path.accent }}>{count} learned</span>}
                        <span className="text-xs text-mist">{search ? `${matches.length} match${matches.length === 1 ? '' : 'es'}` : `${all.length} abilities`}</span>
                        <ChevronDown size={16} className={`text-mist transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                      {expanded && (
                        <div className="px-4 pb-3 border-t border-gold-subtle">
                          {groupByTier(matches).map(({ tier, abilities }) => abilities.length > 0 && (
                            <div key={tier.id} className="mt-3">
                              <h4 className="flex items-center gap-2 font-display text-[11px] tracking-widest uppercase text-gold">
                                {tier.name}
                                <span className="text-mist normal-case tracking-normal font-body">
                                  {ctl.tierUnlocked(tier.id, path.id) ? `Levels ${tier.levels}` : `Locked · ${ctl.lockReason(abilities[0], path.id)}`}
                                </span>
                              </h4>
                              <ul>
                                {abilities.map(a => <ExpandableRow key={a.id} ctl={ctl} ability={a} path={path} mode="build" search={search} />)}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SheetLayout;
