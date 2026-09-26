import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Ability } from '../../types/essence';
import { KIND_META, TIER_IDS, groupByTier, pathsByGroup, searchAll, tierOf, tint } from '../model';
import type { LayoutProps } from '../TalentPage';
import { useInitialPath } from '../routes';
import { PageHeader } from '../header/PageHeader';
import {
  AbilityModal, AbilityTile, EmptyState, PathSigil, SearchField
} from '../ui';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V'];

/**
 * Constellation — the talent tree as a game board. A full-width path selector
 * split by tradition sits on top; tiers run left to right with a seal between each.
 */
const ConstellationLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [pathId, setPathId] = useState(useInitialPath(ctl));
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState<Ability | null>(null);

  const path = system.paths.find(p => p.id === pathId)!;
  const tiers = groupByTier(system.abilitiesByPath[pathId] || []);
  const searching = search.trim().length > 0;
  const results = searching ? searchAll(system, search) : [];

  const openPath = (id: string) => {
    setPathId(id);
    setSearch('');
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader ctl={ctl} page="talents" />

      {/* Search sits with the board it filters */}
      <div className="my-4 w-full sm:w-96">
        <SearchField value={search} onChange={setSearch} placeholder="Search every path…" />
      </div>

      {/* Path selector: one segment per tradition, sized by its number of paths */}
      <div className="arcane-panel mb-6 overflow-x-auto">
        <div className="flex min-w-max xl:min-w-0">
          {pathsByGroup(system).map(({ group, paths }, gi) => (
            <div
              key={group.id}
              className={`flex flex-col min-w-0 ${gi > 0 ? 'border-l border-gold-subtle' : ''}`}
              style={{ flexGrow: paths.length, flexBasis: 0 }}
            >
              {system.groups.length > 1 && (
                <div className="flex items-center justify-center gap-2 pt-3 pb-1">
                  <span className="h-px w-6" style={{ background: tint(group.accent, 0.5) }} />
                  <span className="font-display text-[10px] tracking-[0.25em] uppercase" style={{ color: group.accent }}>{group.label}</span>
                  <span className="h-px w-6" style={{ background: tint(group.accent, 0.5) }} />
                </div>
              )}
              <div className="flex justify-around px-2 pb-3 pt-2 gap-1">
                {paths.map(p => {
                  const active = p.id === pathId && !searching;
                  const abilities = system.abilitiesByPath[p.id] || [];
                  return (
                    <button
                      key={p.id}
                      onClick={() => openPath(p.id)}
                      className={`flex flex-col items-center gap-1.5 px-2 pt-2 pb-1.5 rounded-lg transition-all w-[84px] xl:w-auto xl:flex-1 xl:min-w-0 xl:max-w-[84px] ${active ? '-translate-y-0.5' : 'hover:bg-charcoal/50'}`}
                      style={active ? { background: tint(p.accent, 0.12), boxShadow: `0 0 0 1px ${tint(p.accent, 0.45)}, 0 6px 20px ${tint(p.accent, 0.2)}` } : undefined}
                    >
                      <PathSigil path={p} size={46} active={active} className="!rounded-full" />
                      <span className={`text-[11px] font-display tracking-wide truncate w-full text-center ${active ? 'text-ivory' : 'text-fog'}`}>{p.name}</span>
                      {/* One segment per tier, lit once something in it is learned */}
                      <span className="flex gap-0.5 w-12">
                        {TIER_IDS.map(t => {
                          const lit = abilities.some(a => tierOf(a) === t && ctl.isLearned(a.id));
                          return <span key={t} className="h-1 flex-1 rounded-full" style={{ background: lit ? p.accent : 'rgba(106,106,122,0.3)' }} />;
                        })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {searching ? (
        <div className="arcane-panel p-5 mb-8">
          <h2 className="font-display text-lg text-ivory mb-4">Results for “{search}”</h2>
          {results.length === 0 && <EmptyState title="No abilities match" />}
          <div className="space-y-6">
            {results.map(({ path: p, abilities }) => (
              <section key={p.id}>
                <button
                  onClick={() => openPath(p.id)}
                  className="flex items-center gap-2 mb-2 font-display tracking-wide hover:underline underline-offset-4"
                  style={{ color: p.accent }}
                >
                  {p.icon(15)} {p.name}
                </button>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {abilities.map(a => <AbilityTile key={a.id} ctl={ctl} ability={a} path={p} onInfo={setDetail} />)}
                </div>
              </section>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Path title */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4 px-1">
            <h2 className="font-display text-3xl tracking-wide" style={{ color: path.accent }}>{path.name}</h2>
            <p className="text-fog">{path.concept}{path.patron && <span className="text-mist"> · {path.patron}</span>}</p>
            <div className="ml-auto flex items-center gap-4 text-[11px] text-mist">
              {(['passive', 'active', 'cantrip', 'spell'] as const).map(k => (
                <span key={k} className="inline-flex items-center gap-1.5">
                  <span
                    className={`w-3 h-3 border ${k === 'passive' || k === 'cantrip' ? 'rounded-full' : 'rounded-sm'}`}
                    style={{ borderColor: KIND_META[k].color }}
                  />
                  {KIND_META[k].label}
                </span>
              ))}
            </div>
          </div>

          {/* Tier board — left to right on desktop, bottom to top when stacked */}
          <div className="flex flex-col-reverse xl:flex-row gap-3 xl:gap-0 items-stretch mb-10">
            {tiers.map(({ tier, abilities }, index) => {
              const open = ctl.tierUnlocked(tier.id, pathId);
              const lineColor = open ? path.accent : 'rgba(106,106,122,0.35)';
              return (
                <React.Fragment key={tier.id}>
                  {index > 0 && (
                    <div className="flex xl:flex-col items-center justify-center xl:justify-start xl:pt-6 gap-1 xl:w-9 flex-shrink-0">
                      <span className="h-px w-10 xl:h-8 xl:w-px" style={{ background: lineColor }} />
                      <span
                        className="w-7 h-7 rotate-45 flex items-center justify-center border"
                        style={{
                          borderColor: lineColor,
                          background: open ? tint(path.accent, 0.15) : 'rgba(10,10,15,0.8)',
                          boxShadow: open ? `0 0 12px ${tint(path.accent, 0.4)}` : undefined
                        }}
                      >
                        <span className="-rotate-45">
                          {open ? <Unlock size={12} style={{ color: path.accent }} /> : <Lock size={12} className="text-mist" />}
                        </span>
                      </span>
                      <span className="h-px w-10 xl:h-8 xl:w-px" style={{ background: lineColor }} />
                    </div>
                  )}
                  <section
                    className={`flex-1 min-w-0 rounded-xl border p-3 transition-colors ${open ? '' : 'opacity-60'}`}
                    style={{
                      borderColor: open ? tint(path.accent, 0.3) : 'rgba(201,169,89,0.1)',
                      background: open
                        ? `radial-gradient(120% 60% at 50% 0%, ${tint(path.accent, 0.1)}, rgba(18,18,26,0.7) 70%)`
                        : 'rgba(18,18,26,0.5)'
                    }}
                  >
                    <header className="flex items-center gap-3 mb-3">
                      <span
                        className="w-9 h-9 rounded-full flex items-center justify-center font-display text-sm border flex-shrink-0"
                        style={{ borderColor: open ? path.accent : 'rgba(106,106,122,0.5)', color: open ? path.accent : '#6a6a7a' }}
                      >
                        {NUMERALS[index]}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-sm tracking-widest uppercase text-ivory truncate">{tier.name}</h3>
                        <p className="text-[11px] text-mist">
                          {open
                            ? `Levels ${tier.levels} · ${tier.pointCost} pt${tier.pointCost > 1 ? 's' : ''}`
                            : ctl.level < tier.levelRequirement ? `Opens at level ${tier.levelRequirement}` : 'Learn one from the tier before'}
                        </p>
                      </div>
                    </header>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2">
                      {abilities.length === 0 && <p className="text-xs text-mist italic">No abilities in this tier</p>}
                      {abilities.map(a => <AbilityTile key={a.id} ctl={ctl} ability={a} path={path} onInfo={setDetail} />)}
                    </div>
                  </section>
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}

      <AbilityModal ctl={ctl} ability={detail} onClose={() => setDetail(null)} />
    </div>
  );
};

export default ConstellationLayout;
