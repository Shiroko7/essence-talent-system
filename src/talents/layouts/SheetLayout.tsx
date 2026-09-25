import React, { useState } from 'react';
import { ChevronDown, Hammer, Swords } from 'lucide-react';
import { Ability } from '../../types/essence';
import {
  SystemPath, TalentController, groupByTier, learnedCount, matchesSearch, pathsByGroup, previewText, reservesEssence, sortAbilities, tint
} from '../model';
import type { LayoutProps } from '../TalentPage';
import {
  AbilityBody, AbilityIcon, BudgetMeter, CharacterMenu, EmptyState, EssenceBoard, GroupLabel, KindTag, LevelStepper, PathSigil,
  SearchField, Segmented, StatusDot, UseButton, VersionSwitch, ViewTabs
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
      <div className="flex items-center gap-3 py-2">
        {mode === 'build' && (
          <button onClick={() => ctl.toggle(ability, path.id)} aria-label={status === 'learned' ? `Unlearn ${ability.name}` : `Learn ${ability.name}`}>
            <StatusDot status={status} accent={path.accent} />
          </button>
        )}
        <AbilityIcon ability={ability} path={path} status={status} size={30} />
        <button onClick={() => setOpen(!open)} className="flex-1 min-w-0 text-left">
          <span className="flex items-center gap-2">
            <span className={`text-[15px] ${status === 'learned' ? 'text-ivory font-semibold' : 'text-parchment'}`}>{ability.name}</span>
            <ChevronDown size={13} className={`text-mist transition-transform ${open ? 'rotate-180' : ''}`} />
          </span>
          {!open && <span className="block text-xs text-mist truncate">{previewText(ability.description, 110)}</span>}
        </button>
        <KindTag ability={ability} compact />
        <UseButton ctl={ctl} ability={ability} path={path} compact />
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
 * Sheet — built to sit next to a character sheet at the table. Play mode is the
 * essence tracker, grouped by tradition, followed by what the character knows.
 * Build mode is a single-column checklist, one accordion per path, whose tiers
 * climb from Initiate at the bottom.
 */
const SheetLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [mode, setMode] = useState<Mode>(ctl.selectedIds.length ? 'play' : 'build');
  const [search, setSearch] = useState('');
  const [openPaths, setOpenPaths] = useState<Set<string>>(() => new Set(ctl.learnedPaths.map(p => p.id).slice(0, 1)));
  const [actionsOnly, setActionsOnly] = useState(false);

  const togglePath = (id: string) => setOpenPaths(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const openInBuild = (id: string) => {
    setMode('build');
    setOpenPaths(prev => new Set(prev).add(id));
    setTimeout(() => document.getElementById(`sheet-path-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <div className="max-w-5xl mx-auto">
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
          <ViewTabs
            value={mode}
            onChange={setMode}
            options={[{ id: 'play', label: 'Play', icon: Swords }, { id: 'build', label: 'Build', icon: Hammer }]}
          />
          <LevelStepper ctl={ctl} />
          <BudgetMeter ctl={ctl} className="flex-1 min-w-[180px]" />
        </div>
      </div>

      <div className="mb-4">
        <SearchField value={search} onChange={setSearch} placeholder={mode === 'play' ? 'Find one of your abilities…' : 'Search every path…'} />
      </div>

      {mode === 'play' ? (
        ctl.learnedPaths.length === 0 ? (
          <div className="arcane-panel">
            <EmptyState title="No abilities learned yet">
              Switch to <button className="text-gold underline" onClick={() => setMode('build')}>Build</button> to choose your talents.
            </EmptyState>
          </div>
        ) : (
          <>
            <section className="arcane-panel p-4 mb-6">
              <h2 className="font-display text-sm tracking-widest uppercase text-gold mb-3">Essence</h2>
              <EssenceBoard ctl={ctl} onOpenPath={openInBuild} showAbilities={false} columns={2} />
            </section>

            <div className="flex items-center justify-between mb-2 px-1">
              <h2 className="font-display text-sm tracking-widest uppercase text-gold">Abilities</h2>
              <Segmented
                value={actionsOnly ? 'actions' : 'all'}
                onChange={v => setActionsOnly(v === 'actions')}
                size="xs"
                options={[{ id: 'all', label: 'Everything' }, { id: 'actions', label: 'Actions only' }]}
              />
            </div>
            <div className="space-y-5">
              {pathsByGroup(system, ctl.learnedPaths).map(({ group, paths }) => (
                <div key={group.id}>
                  {system.groups.length > 1 && <GroupLabel label={group.label} accent={group.accent} className="mb-2 px-1" />}
                  <div className="space-y-3">
                    {paths.map(path => {
                      const shown = sortAbilities((system.abilitiesByPath[path.id] || []).filter(a =>
                        ctl.isLearned(a.id) && matchesSearch(a, search) && (!actionsOnly || !reservesEssence(a))
                      ));
                      if (!shown.length) return null;
                      return (
                        <section key={path.id} className="arcane-panel px-4 py-2" style={{ boxShadow: `inset 3px 0 0 ${path.accent}` }}>
                          <h3 className="font-display text-xs tracking-widest uppercase pt-1.5" style={{ color: path.accent }}>{path.name}</h3>
                          <ul>{shown.map(a => <ExpandableRow key={a.id} ctl={ctl} ability={a} path={path} mode="play" search={search} />)}</ul>
                        </section>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      ) : (
        <div className="space-y-2">
          {pathsByGroup(system).map(({ group, paths }) => (
            <div key={group.id}>
              {system.groups.length > 1 && <GroupLabel label={group.label} accent={group.accent} className="mt-6 mb-2 px-1" />}
              <div className="space-y-2">
                {paths.map(path => {
                  const matches = (system.abilitiesByPath[path.id] || []).filter(a => matchesSearch(a, search));
                  if (search && !matches.length) return null;
                  const expanded = openPaths.has(path.id) || !!search;
                  const count = learnedCount(ctl, path.id);
                  return (
                    <section key={path.id} id={`sheet-path-${path.id}`} className="arcane-panel overflow-hidden scroll-mt-4">
                      <button onClick={() => togglePath(path.id)} className="w-full flex items-center gap-3 p-3 text-left hover:bg-charcoal/40">
                        <PathSigil path={path} size={34} active={count > 0} />
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-base text-ivory tracking-wide">{path.name}</div>
                          <div className="text-xs text-mist truncate">{path.concept}{path.patron && ` · ${path.patron}`}</div>
                        </div>
                        {count > 0 && <span className="w-2 h-2 rounded-full" style={{ background: path.accent }} />}
                        <ChevronDown size={16} className={`text-mist transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                      {expanded && (
                        <div className="px-4 pb-3 border-t border-gold-subtle" style={{ background: `linear-gradient(0deg, ${tint(path.accent, 0.04)}, transparent)` }}>
                          {groupByTier(matches, 'ascending').map(({ tier, abilities }) => abilities.length > 0 && (
                            <div key={tier.id} className="mt-3">
                              <h4 className="flex items-center gap-2 font-display text-[11px] tracking-widest uppercase text-gold">
                                {tier.name}
                                <span className="text-mist normal-case tracking-normal font-body">
                                  {ctl.tierUnlocked(tier.id, path.id) ? `Levels ${tier.levels} · ${tier.pointCost} pt` : ctl.lockReason(abilities[0], path.id)}
                                </span>
                              </h4>
                              <ul>{abilities.map(a => <ExpandableRow key={a.id} ctl={ctl} ability={a} path={path} mode="build" search={search} />)}</ul>
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
