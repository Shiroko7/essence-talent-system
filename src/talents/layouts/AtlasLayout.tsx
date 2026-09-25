import React, { useState } from 'react';
import { ArrowLeft, ChevronUp, Layers, Lock, Moon, Zap } from 'lucide-react';
import { TierId } from '../../types/essence';
import { KIND_META, TIER_IDS, groupByTier, kindOf, sortAbilities, tierInfo, tierOf, learnedCount, tint } from '../model';
import type { LayoutProps } from '../TalentPage';
import {
  AbilityBody, BudgetMeter, CharacterMenu, LearnButton, LevelStepper, PathSigil, PoolPips, RestButtons, UseButton,
  VersionSwitch
} from '../ui';

const PRIMER = [
  {
    icon: Layers,
    title: 'Spend talent points',
    body: 'Your level sets a budget of talent points. Each ability costs its tier: 1 at Initiate up to 5 at Great Grandmaster.'
  },
  {
    icon: Lock,
    title: 'Climb each path in order',
    body: 'A tier opens once you reach its level and have learned something from the tier before it in the same path.'
  },
  {
    icon: Zap,
    title: 'Actives spend, passives reserve',
    body: 'Actives and spells fill a per-path essence pool that you spend on use. Passives and cantrips permanently reserve essence instead.'
  },
  {
    icon: Moon,
    title: 'Rest to recover',
    body: 'A long rest refills every pool. Track pools here during play as an extension of your character sheet.'
  }
];

/**
 * Atlas — made for players who are still learning the system. It opens on a
 * primer and a gallery of paths; each path reads like a chapter, one tier at a
 * time, with every ability's full text on its card. Learned abilities collect in
 * a hand tray at the bottom that doubles as the play tracker.
 */
const AtlasLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [pathId, setPathId] = useState<string | null>(null);
  const [tierId, setTierId] = useState<TierId>('initiate');
  const [trayOpen, setTrayOpen] = useState(false);

  const openPath = (id: string) => {
    setPathId(id);
    setTierId('initiate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const path = pathId ? system.paths.find(p => p.id === pathId)! : null;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {!path ? (
        <>
          {/* Hero */}
          <section className="text-center pt-4 pb-8">
            <div className="flex justify-center mb-4"><VersionSwitch current={system.version} /></div>
            <h1 className="font-display text-3xl md:text-4xl text-ivory tracking-wide mb-2">{system.name}</h1>
            <p className="text-lg text-fog max-w-2xl mx-auto">{system.tagline}</p>
          </section>

          {/* Primer */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {PRIMER.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="arcane-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-gold/15 border border-gold/40 text-gold font-display text-xs flex items-center justify-center">{i + 1}</span>
                  <Icon size={15} className="text-gold" />
                </div>
                <h3 className="font-display text-sm text-ivory tracking-wide mb-1">{title}</h3>
                <p className="text-sm text-fog leading-snug">{body}</p>
              </div>
            ))}
          </section>

          {/* Path gallery */}
          {system.groups.map(group => (
            <section key={group.id} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-display text-lg tracking-wide text-gold">{system.groups.length > 1 ? group.label : 'Choose a path'}</h2>
                <span className="flex-1 arcane-divider" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {system.paths.filter(p => p.groupId === group.id).map(p => {
                  const all = system.abilitiesByPath[p.id] || [];
                  const count = learnedCount(ctl, p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => openPath(p.id)}
                      className="group text-left rounded-xl border p-5 transition-all duration-200 hover:-translate-y-1"
                      style={{
                        borderColor: tint(p.accent, count ? 0.5 : 0.2),
                        background: `radial-gradient(120% 90% at 100% 0%, ${tint(p.accent, 0.14)}, rgba(18,18,26,0.92) 60%)`
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <PathSigil path={p} size={48} active={count > 0} />
                        {count > 0 && (
                          <span className="text-[11px] font-display px-2 py-0.5 rounded-full" style={{ color: p.accent, background: tint(p.accent, 0.15) }}>
                            {count} learned
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl text-ivory tracking-wide">{p.name}</h3>
                      {p.patron && <p className="text-xs text-mist mb-1">{p.patron}</p>}
                      <p className="text-sm mb-3" style={{ color: p.accent }}>{p.concept}</p>
                      {p.description && <p className="text-sm text-fog leading-snug mb-4 line-clamp-2">{p.description}</p>}
                      <div className="flex gap-3 text-[11px] text-mist">
                        {(['active', 'passive', 'cantrip', 'spell'] as const).map(k => {
                          const n = all.filter(a => kindOf(a) === k).length;
                          return n ? (
                            <span key={k} className="inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ background: KIND_META[k].color }} />{n} {KIND_META[k].label.toLowerCase()}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </>
      ) : (
        <>
          {/* Chapter hero */}
          <button onClick={() => setPathId(null)} className="flex items-center gap-1.5 text-sm text-fog hover:text-gold mb-4">
            <ArrowLeft size={15} /> All paths
          </button>
          <section
            className="rounded-xl border p-6 md:p-8 mb-6"
            style={{ borderColor: tint(path.accent, 0.35), background: `radial-gradient(100% 140% at 0% 0%, ${tint(path.accent, 0.18)}, rgba(18,18,26,0.95) 55%)` }}
          >
            <div className="flex items-center gap-4">
              <PathSigil path={path} size={64} active />
              <div>
                <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim">
                  {system.groups.find(g => g.id === path.groupId)?.label}{path.patron && ` · ${path.patron}`}
                </p>
                <h1 className="font-display text-3xl md:text-4xl text-ivory tracking-wide">{path.name}</h1>
                <p className="text-lg" style={{ color: path.accent }}>{path.concept}</p>
              </div>
            </div>
            {path.description && <p className="text-parchment/90 mt-4 max-w-3xl">{path.description}</p>}
          </section>

          {/* Tier stepper */}
          <nav className="flex overflow-x-auto gap-1 mb-6 border-b border-gold-subtle">
            {groupByTier(system.abilitiesByPath[path.id] || []).map(({ tier, abilities }) => {
              const open = ctl.tierUnlocked(tier.id, path.id);
              const learned = abilities.filter(a => ctl.isLearned(a.id)).length;
              const active = tier.id === tierId;
              return (
                <button
                  key={tier.id}
                  onClick={() => setTierId(tier.id)}
                  className={`flex-shrink-0 px-4 py-2.5 -mb-px border-b-2 text-left transition-colors ${active ? '' : 'border-transparent hover:bg-charcoal/40'}`}
                  style={active ? { borderColor: path.accent } : undefined}
                >
                  <span className={`flex items-center gap-1.5 font-display text-sm tracking-wide ${active ? 'text-ivory' : 'text-fog'}`}>
                    {!open && <Lock size={11} className="text-mist" />}
                    {tier.name}
                  </span>
                  <span className="text-[11px] text-mist">
                    Lv {tier.levelRequirement}+ · {tier.pointCost} pt · {learned ? <span style={{ color: path.accent }}>{learned} learned</span> : `${abilities.length} options`}
                  </span>
                </button>
              );
            })}
          </nav>

          {!ctl.tierUnlocked(tierId, path.id) && (
            <div className="flex items-center gap-2 text-sm text-fog bg-void/50 border border-gold-subtle rounded-lg px-4 py-3 mb-4">
              <Lock size={14} className="text-gold" />
              {ctl.level < tierInfo(tierId).levelRequirement
                ? `This tier opens at level ${tierInfo(tierId).levelRequirement}. You can still read ahead.`
                : `Learn a ${tierInfo(TIER_IDS[TIER_IDS.indexOf(tierId) - 1]).name} ability in ${path.name} to open this tier.`}
            </div>
          )}

          {/* Full-text cards */}
          <div className="columns-1 md:columns-2 gap-4">
            {sortAbilities((system.abilitiesByPath[path.id] || []).filter(a => tierOf(a) === tierId)).map(ability => {
              const learned = ctl.isLearned(ability.id);
              return (
                <article
                  key={ability.id}
                  className="break-inside-avoid mb-4 rounded-lg border p-5 transition-shadow"
                  style={{
                    borderColor: learned ? path.accent : 'rgba(201,169,89,0.15)',
                    background: learned ? `linear-gradient(160deg, ${tint(path.accent, 0.12)}, rgba(18,18,26,0.95) 45%)` : 'rgba(18,18,26,0.9)',
                    boxShadow: learned ? `0 0 24px ${tint(path.accent, 0.15)}` : undefined
                  }}
                >
                  <h3 className="font-display text-lg text-ivory tracking-wide mb-3">{ability.name}</h3>
                  <AbilityBody ctl={ctl} ability={ability} path={path} />
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gold-subtle">
                    <UseButton ctl={ctl} ability={ability} path={path} />
                    <LearnButton ctl={ctl} ability={ability} path={path} className="ml-auto" />
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      {/* Hand tray */}
      <div className="fixed bottom-11 inset-x-0 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-t-xl border border-b-0 border-gold-accent bg-obsidian/95 backdrop-blur-md shadow-arcane-lg">
            <div className="flex items-center gap-4 px-4 py-2.5">
              <button onClick={() => setTrayOpen(!trayOpen)} className="flex items-center gap-2 font-display text-sm text-ivory tracking-wide whitespace-nowrap mr-auto sm:mr-0">
                <ChevronUp size={16} className={`text-gold transition-transform ${trayOpen ? 'rotate-180' : ''}`} />
                Your hand <span className="text-mist">({ctl.selectedIds.length})</span>
              </button>
              <div className="hidden sm:flex items-center gap-3 flex-1 overflow-x-auto">
                {ctl.learnedPaths.map(p => (
                  <span key={p.id} className="flex items-center gap-1.5 flex-shrink-0">
                    {p.icon(14)}
                    <span className="font-display text-sm tabular-nums" style={{ color: p.accent }}>{ctl.pool(p.id).current}</span>
                    <span className="text-xs text-mist">/{ctl.pool(p.id).max}</span>
                  </span>
                ))}
              </div>
              <span className="hidden sm:inline-flex"><LevelStepper ctl={ctl} compact /></span>
              <BudgetMeter ctl={ctl} className="w-56 flex-shrink-0 hidden md:block" />
              <CharacterMenu ctl={ctl} direction="up" />
            </div>
            {trayOpen && (
              <div className="border-t border-gold-subtle max-h-[50vh] overflow-y-auto px-4 py-3 animate-fade-in">
                {ctl.learnedPaths.length === 0 ? (
                  <p className="text-sm text-mist py-3">Learned abilities gather here, with their essence pools, ready for play.</p>
                ) : (
                  <div className="space-y-4">
                    <RestButtons ctl={ctl} compact />
                    {ctl.learnedPaths.map(p => (
                      <div key={p.id}>
                        <div className="flex items-center gap-3 mb-2">
                          <button onClick={() => { openPath(p.id); setTrayOpen(false); }} className="font-display text-sm" style={{ color: p.accent }}>{p.name}</button>
                          <PoolPips ctl={ctl} path={p} size="md" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sortAbilities((system.abilitiesByPath[p.id] || []).filter(a => ctl.isLearned(a.id))).map(a => (
                            <div key={a.id} className="flex items-center gap-2 rounded-md border border-gold-subtle bg-slate/80 pl-2.5 pr-1.5 py-1">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ background: KIND_META[kindOf(a)].color }} />
                              <span className="text-sm text-parchment">{a.name}</span>
                              <UseButton ctl={ctl} ability={a} path={p} compact />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtlasLayout;
