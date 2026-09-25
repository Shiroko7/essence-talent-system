import React, { useState } from 'react';
import { Hand, Lock, Map as MapIcon } from 'lucide-react';
import { Ability, TierId } from '../../types/essence';
import { SystemPath, TIER_IDS, TalentController, pathsByGroup, searchAll, sortAbilities, tierInfo, tierOf, tint } from '../model';
import type { LayoutProps } from '../TalentPage';
import {
  AbilityBody, AbilityIcon, BudgetMeter, CharacterMenu, EmptyState, EssenceBoard, LearnButton, LevelStepper, PathSigil, SearchField,
  UseButton, VersionSwitch, ViewTabs
} from '../ui';

type View = 'paths' | 'hand';

/** A full-text ability card: reading first, actions at the foot. */
const AbilityCard: React.FC<{ ctl: TalentController; ability: Ability; path: SystemPath; search?: string; showPath?: boolean }> = ({
  ctl, ability, path, search, showPath
}) => {
  const status = ctl.statusOf(ability, path.id);
  const learned = status === 'learned';
  return (
    <article
      className="break-inside-avoid mb-4 rounded-lg border p-5 transition-shadow"
      style={{
        borderColor: learned ? path.accent : 'rgba(201,169,89,0.15)',
        background: learned ? `linear-gradient(160deg, ${tint(path.accent, 0.12)}, rgba(18,18,26,0.95) 45%)` : 'rgba(18,18,26,0.9)',
        boxShadow: learned ? `0 0 24px ${tint(path.accent, 0.15)}` : undefined
      }}
    >
      <header className="flex items-center gap-3 mb-3">
        <AbilityIcon ability={ability} path={path} status={status} size={44} />
        <div className="min-w-0">
          {showPath && <p className="text-[11px] font-display tracking-[0.2em] uppercase" style={{ color: path.accent }}>{path.name}</p>}
          <h3 className="font-display text-lg text-ivory tracking-wide leading-tight">{ability.name}</h3>
        </div>
      </header>
      <AbilityBody ctl={ctl} ability={ability} path={path} searchTerm={search} />
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gold-subtle">
        <UseButton ctl={ctl} ability={ability} path={path} />
        <LearnButton ctl={ctl} ability={ability} path={path} className="ml-auto" />
      </div>
    </article>
  );
};

/**
 * Atlas — reading first. A path bar that is always on screen, a tier ladder that
 * climbs from Initiate at the bottom, and every ability's full text on its card.
 * The hand (learned abilities with their pools) is its own tab with a shortcut.
 */
const AtlasLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [view, setView] = useState<View>('paths');
  const [pathId, setPathId] = useState(system.paths[0].id);
  const [tierId, setTierId] = useState<TierId>('initiate');
  const [search, setSearch] = useState('');

  const path = system.paths.find(p => p.id === pathId)!;
  const pathAbilities = system.abilitiesByPath[pathId] || [];
  const searching = search.trim().length > 0;

  const openPath = (id: string) => {
    setView('paths');
    setSearch('');
    setPathId(id);
    setTierId('initiate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-4">
        <h1 className="font-display text-xl text-ivory tracking-wide">{system.name}</h1>
        <VersionSwitch current={system.version} />
        <ViewTabs
          value={view}
          onChange={setView}
          options={[
            { id: 'paths', label: 'Paths', icon: MapIcon },
            { id: 'hand', label: 'Hand', icon: Hand, badge: ctl.selectedIds.length }
          ]}
        />
        <div className="flex flex-wrap items-center gap-4 ml-auto">
          <LevelStepper ctl={ctl} />
          <BudgetMeter ctl={ctl} className="w-48" />
          <CharacterMenu ctl={ctl} />
        </div>
      </div>

      {view === 'hand' ? (
        <div className="arcane-panel p-5">
          <EssenceBoard ctl={ctl} onOpenPath={openPath} />
        </div>
      ) : (
        <>
          {/* Path bar — always visible, so switching paths is one click */}
          <div className="sticky top-0 z-20 -mx-4 px-4 py-2 mb-5 bg-void/90 backdrop-blur border-b border-gold-subtle">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1">
                  {pathsByGroup(system).map(({ group, paths }, gi) => (
                    <React.Fragment key={group.id}>
                      {gi > 0 && <span className="w-px h-6 mx-2" style={{ background: tint(group.accent, 0.4) }} />}
                      {paths.map(p => {
                        const active = p.id === pathId && !searching;
                        return (
                          <button
                            key={p.id}
                            onClick={() => openPath(p.id)}
                            title={`${group.label}: ${p.name}`}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-display tracking-wide whitespace-nowrap transition-colors ${
                              active ? 'text-ivory' : 'text-fog hover:text-parchment hover:bg-charcoal/50'
                            }`}
                            style={active ? { background: tint(p.accent, 0.18), boxShadow: `inset 0 -2px 0 ${p.accent}` } : undefined}
                          >
                            {p.icon(14)} {p.name}
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="w-56 flex-shrink-0 hidden md:block">
                <SearchField value={search} onChange={setSearch} placeholder="Search every path…" />
              </div>
            </div>
            <div className="md:hidden mt-2"><SearchField value={search} onChange={setSearch} placeholder="Search every path…" /></div>
          </div>

          {searching ? (
            <div>
              {searchAll(system, search).length === 0 && <EmptyState title="No abilities match" />}
              <div className="columns-1 md:columns-2 gap-4">
                {searchAll(system, search).flatMap(({ path: p, abilities }) =>
                  abilities.map(a => <AbilityCard key={a.id} ctl={ctl} ability={a} path={p} search={search} showPath />)
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Chapter header */}
              <section
                className="rounded-xl border p-5 mb-6 flex items-center gap-4"
                style={{ borderColor: tint(path.accent, 0.35), background: `radial-gradient(100% 140% at 0% 0%, ${tint(path.accent, 0.18)}, rgba(18,18,26,0.95) 55%)` }}
              >
                <PathSigil path={path} size={56} active />
                <div className="min-w-0">
                  <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim">
                    {system.groups.find(g => g.id === path.groupId)?.label}{path.patron && ` · ${path.patron}`}
                  </p>
                  <h2 className="font-display text-3xl text-ivory tracking-wide">{path.name}</h2>
                  <p className="text-parchment/90">{path.description ?? path.concept}</p>
                </div>
              </section>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Ascension ladder: Great Grandmaster on top, Initiate at the foot */}
                <nav className="w-full md:w-52 flex-shrink-0 md:sticky md:top-20 flex md:flex-col-reverse overflow-x-auto">
                  {TIER_IDS.map((t, i) => {
                    const tier = tierInfo(t);
                    const open = ctl.tierUnlocked(t, pathId);
                    const inTier = pathAbilities.filter(a => tierOf(a) === t);
                    const learned = inTier.filter(a => ctl.isLearned(a.id)).length;
                    const active = t === tierId;
                    return (
                      <div key={t} className="flex md:flex-col-reverse items-center md:items-stretch flex-shrink-0">
                        {i > 0 && <span className="w-4 h-px md:w-px md:h-4 md:ml-5" style={{ background: open ? path.accent : 'rgba(106,106,122,0.4)' }} />}
                        <button
                          onClick={() => setTierId(t)}
                          disabled={!inTier.length}
                          className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors disabled:opacity-35 ${active ? '' : 'hover:bg-charcoal/50'}`}
                          style={active ? { background: tint(path.accent, 0.14), boxShadow: `inset 0 0 0 1px ${tint(path.accent, 0.5)}` } : undefined}
                        >
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center font-display text-[10px] border flex-shrink-0"
                            style={{
                              borderColor: open ? path.accent : 'rgba(106,106,122,0.5)',
                              background: learned ? path.accent : 'transparent',
                              color: learned ? '#0a0a0f' : open ? path.accent : '#6a6a7a'
                            }}
                          >
                            {open ? ['I', 'II', 'III', 'IV', 'V'][i] : <Lock size={10} />}
                          </span>
                          <span className="min-w-0">
                            <span className={`block font-display text-sm tracking-wide whitespace-nowrap ${active ? 'text-ivory' : 'text-fog'}`}>{tier.name}</span>
                            <span className="block text-[11px] text-mist whitespace-nowrap">
                              Lv {tier.levelRequirement}+ · {learned ? <span style={{ color: path.accent }}>{learned} learned</span> : `${inTier.length} options`}
                            </span>
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </nav>

                <div className="flex-1 min-w-0">
                  {!ctl.tierUnlocked(tierId, pathId) && (
                    <div className="flex items-center gap-2 text-sm text-fog bg-void/50 border border-gold-subtle rounded-lg px-4 py-3 mb-4">
                      <Lock size={14} className="text-gold" />
                      {ctl.level < tierInfo(tierId).levelRequirement
                        ? `${tierInfo(tierId).name} opens at level ${tierInfo(tierId).levelRequirement}. You can still read ahead.`
                        : `Learn a ${tierInfo(TIER_IDS[TIER_IDS.indexOf(tierId) - 1]).name} ability in ${path.name} to open this tier.`}
                    </div>
                  )}
                  <div className="columns-1 lg:columns-2 gap-4">
                    {sortAbilities(pathAbilities.filter(a => tierOf(a) === tierId)).map(a => (
                      <AbilityCard key={a.id} ctl={ctl} ability={a} path={path} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Shortcut to the hand */}
          <button
            onClick={() => setView('hand')}
            className="fixed right-5 bottom-16 z-30 flex items-center gap-2 rounded-full border border-gold-accent bg-obsidian/95 backdrop-blur px-4 py-2.5 shadow-arcane-lg font-display text-sm text-gold-bright hover:border-gold"
          >
            <Hand size={16} /> Hand
            <span className="text-[11px] px-1.5 rounded-full bg-gold/20">{ctl.selectedIds.length}</span>
            {ctl.learnedPaths.slice(0, 4).map(p => (
              <span key={p.id} className="hidden sm:flex items-center gap-0.5 text-xs tabular-nums" style={{ color: p.accent }}>
                {p.icon(12)} {ctl.pool(p.id).current}
              </span>
            ))}
          </button>
        </>
      )}
    </div>
  );
};

export default AtlasLayout;
