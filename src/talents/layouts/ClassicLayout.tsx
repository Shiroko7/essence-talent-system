import React, { useState } from 'react';
import { ChevronDown, Layers, Lock } from 'lucide-react';
import { Ability } from '../../types/essence';
import { KindFilter, SystemPath, groupByTier, learnedCount, matchesKind, pathsByGroup, searchAll, tint } from '../model';
import type { TalentController } from '../model';
import type { LayoutProps } from '../TalentPage';
import EssenceTracker from '../essence/EssenceTracker';
import {
  AbilityModal, AbilityTile, BudgetMeter, CharacterMenu, EmptyState, GroupLabel, LevelStepper, PathSigil,
  SearchField, Segmented, VersionSwitch
} from '../ui';

const KIND_OPTIONS: { id: KindFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'passive', label: 'Passive' },
  { id: 'cantrip', label: 'Cantrip' },
  { id: 'spell', label: 'Spell' }
];

/** One path's tiers, stacked so the tree grows upward: Initiate sits at the bottom. */
const AscendingTiers: React.FC<{
  ctl: TalentController; path: SystemPath; abilities: Ability[]; onInfo: (a: Ability) => void; compact?: boolean;
}> = ({ ctl, path, abilities, onInfo, compact }) => (
  <div className="space-y-3">
    {groupByTier(abilities, 'ascending').map(({ tier, abilities: tierAbilities }) => {
      if (!tierAbilities.length) return null;
      const open = ctl.tierUnlocked(tier.id, path.id);
      return (
        <section
          key={tier.id}
          className={`rounded-lg border ${compact ? 'p-3' : 'p-4'}`}
          style={{ borderColor: open ? tint(path.accent, 0.22) : 'rgba(201,169,89,0.1)', background: open ? tint(path.accent, 0.03) : 'rgba(10,10,15,0.4)' }}
        >
          <header className="flex items-center gap-2 mb-3">
            {!open && <Lock size={12} className="text-mist" />}
            <h3 className="font-display text-sm tracking-widest uppercase text-ivory">{tier.name}</h3>
            <span className="text-xs text-mist">Levels {tier.levels}</span>
            <span className="ml-auto font-display text-[11px] text-gold">{tier.pointCost} pt{tier.pointCost > 1 ? 's' : ''} each</span>
          </header>
          {!open && (
            <p className="text-xs text-fog mb-3">
              {ctl.level < tier.levelRequirement ? `Opens at level ${tier.levelRequirement}.` : ctl.lockReason(tierAbilities[0], path.id)}
            </p>
          )}
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {tierAbilities.map(a => <AbilityTile key={a.id} ctl={ctl} ability={a} path={path} onInfo={onInfo} />)}
          </div>
        </section>
      );
    })}
  </div>
);

/**
 * Classic — the original structure (setup, essence, path sidebar, tier panels),
 * reworked: collapsible traditions, an All paths view, global search, essence
 * grouped by tradition, and tiers that climb from the bottom up.
 */
const ClassicLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [pathId, setPathId] = useState<string | null>(system.paths[0].id);
  const [kind, setKind] = useState<KindFilter>('all');
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [essenceOpen, setEssenceOpen] = useState(true);
  const [detail, setDetail] = useState<Ability | null>(null);

  const path = pathId ? system.paths.find(p => p.id === pathId)! : null;
  const showAll = !path || search.trim().length > 0;
  const results = showAll ? searchAll(system, search, kind) : [];

  const toggleGroup = (id: string) => setCollapsed(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const openPath = (id: string) => {
    setPathId(id);
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      {/* Setup */}
      <div className="arcane-panel p-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-3 mr-auto">
          <h1 className="font-display text-xl text-ivory tracking-wide">{system.name}</h1>
          <VersionSwitch current={system.version} />
        </div>
        <LevelStepper ctl={ctl} />
        <BudgetMeter ctl={ctl} className="w-56" />
        <CharacterMenu ctl={ctl} />
      </div>

      {/* Essence */}
      {ctl.learnedPaths.length > 0 && (
        <section className="arcane-panel p-4">
          <header className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-lg tracking-wide text-ivory">Essence</h2>
            {!essenceOpen && (
              <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {ctl.learnedPaths.map(p => (
                  <span key={p.id} className="flex items-center gap-1 text-sm tabular-nums" title={p.name}>
                    {p.icon(14)}
                    <span className="font-display" style={{ color: p.accent }}>{ctl.pool(p.id).current}</span>
                    <span className="text-xs text-mist">/{ctl.pool(p.id).max}</span>
                  </span>
                ))}
              </span>
            )}
            <button
              onClick={() => setEssenceOpen(!essenceOpen)}
              className="ml-auto arcane-btn !px-3 !py-1.5 text-xs flex items-center gap-1.5"
              aria-expanded={essenceOpen}
            >
              {essenceOpen ? 'Hide tracker' : 'Show tracker'}
              <ChevronDown size={14} className={`transition-transform ${essenceOpen ? 'rotate-180' : ''}`} />
            </button>
          </header>
          {essenceOpen && <div className="mt-4"><EssenceTracker ctl={ctl} onOpenPath={openPath} /></div>}
        </section>
      )}

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Path sidebar */}
        <aside className="w-full md:w-64 arcane-panel p-3 flex-shrink-0 md:sticky md:top-4 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto">
          <button
            onClick={() => setPathId(null)}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 mb-2 rounded font-display text-sm tracking-wide transition-colors ${
              !path ? 'bg-gold/15 text-gold-bright border border-gold/30' : 'text-fog hover:text-parchment hover:bg-charcoal/50 border border-transparent'
            }`}
          >
            <Layers size={16} /> All paths
          </button>
          {pathsByGroup(system).map(({ group, paths }) => {
            const isCollapsed = collapsed.has(group.id);
            return (
              <div key={group.id} className="mb-1">
                {system.groups.length > 1 && (
                  <button onClick={() => toggleGroup(group.id)} className="w-full flex items-center px-1.5 py-2 hover:bg-charcoal/40 rounded">
                    <GroupLabel label={group.label} accent={group.accent} className="flex-1" />
                    <ChevronDown size={14} className={`text-mist transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
                  </button>
                )}
                {!isCollapsed && (
                  <ul className="space-y-0.5 mb-2">
                    {paths.map(p => {
                      const active = p.id === pathId;
                      const count = learnedCount(ctl, p.id);
                      return (
                        <li key={p.id}>
                          <button
                            onClick={() => openPath(p.id)}
                            className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left transition-colors ${active ? 'bg-charcoal' : 'hover:bg-charcoal/50'}`}
                            style={active ? { boxShadow: `inset 2px 0 0 ${p.accent}` } : undefined}
                          >
                            <PathSigil path={p} size={30} active={active} />
                            <span className="flex-1 min-w-0">
                              <span className={`block text-sm font-display tracking-wide truncate ${active ? 'text-ivory' : 'text-fog'}`}>{p.name}</span>
                              {p.concept && <span className="block text-[11px] text-mist truncate">{p.concept}</span>}
                            </span>
                            {count > 0 && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.accent }} title={`${count} learned`} />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>

        {/* Main panel */}
        <div className="flex-1 min-w-0 arcane-panel p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
            <Segmented value={kind} options={KIND_OPTIONS} onChange={setKind} />
            <div className="md:ml-auto md:w-80"><SearchField value={search} onChange={setSearch} placeholder="Search every path…" /></div>
          </div>

          {showAll ? (
            results.length === 0 ? (
              <EmptyState title="No abilities match">Try another type or search term.</EmptyState>
            ) : (
              <div className="space-y-8">
                {results.map(({ path: p, abilities }) => (
                  <section key={p.id}>
                    <header className="flex items-center gap-3 mb-3">
                      <PathSigil path={p} size={32} active />
                      <h2 className="font-display text-lg tracking-wide" style={{ color: p.accent }}>{p.name}</h2>
                      <button onClick={() => openPath(p.id)} className="ml-auto text-xs font-display text-gold hover:text-gold-bright">Open path →</button>
                    </header>
                    <AscendingTiers ctl={ctl} path={p} abilities={abilities} onInfo={setDetail} compact />
                  </section>
                ))}
              </div>
            )
          ) : path && (
            <>
              <header className="flex items-center gap-4 p-4 mb-5 rounded-lg border" style={{ borderColor: tint(path.accent, 0.25), background: `linear-gradient(135deg, ${tint(path.accent, 0.12)}, transparent 60%)` }}>
                <PathSigil path={path} size={52} active />
                <div>
                  <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim">
                    {system.groups.find(g => g.id === path.groupId)?.label}{path.patron && ` · ${path.patron}`}
                  </p>
                  <h2 className="font-display text-2xl text-ivory tracking-wide">{path.name}</h2>
                  <p className="text-sm text-fog">{path.description ?? path.concept}</p>
                </div>
              </header>
              <AscendingTiers
                ctl={ctl}
                path={path}
                abilities={(system.abilitiesByPath[path.id] || []).filter(a => matchesKind(a, kind))}
                onInfo={setDetail}
              />
            </>
          )}
        </div>
      </div>

      <AbilityModal ctl={ctl} ability={detail} onClose={() => setDetail(null)} />
    </div>
  );
};

export default ClassicLayout;
