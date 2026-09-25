import React, { useState } from 'react';
import { ChevronRight, Info, Lock, Unlock } from 'lucide-react';
import { Ability } from '../../types/essence';
import { KIND_META, groupByTier, kindOf, previewText, learnedCount, tint } from '../model';
import type { LayoutProps } from '../TalentPage';
import {
  AbilityDrawer, BudgetMeter, CharacterMenu, CostTag, KindTag, LevelStepper, PathSigil, PoolCounter, RestButtons,
  VersionSwitch
} from '../ui';

/** Ring around a path sigil showing how much of the path has been learned. */
const ProgressRing: React.FC<{ value: number; max: number; color: string; size: number; children: React.ReactNode }> = ({
  value, max, color, size, children
}) => {
  const r = size / 2 - 2;
  const c = 2 * Math.PI * r;
  const pct = max ? Math.min(1, value / max) : 0;
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(201,169,89,0.12)" strokeWidth={2} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={2} strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round" />
      </svg>
      {children}
    </span>
  );
};

/**
 * Constellation — the talent tree as a game board. Tiers run left to right with a
 * gate between each; nodes light up as they are learned. A heads-up bar pinned to
 * the bottom carries level, budget and every essence pool for play.
 */
const ConstellationLayout: React.FC<LayoutProps> = ({ ctl }) => {
  const { system } = ctl;
  const [pathId, setPathId] = useState(system.paths[0].id);
  const [detail, setDetail] = useState<Ability | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const path = system.paths.find(p => p.id === pathId)!;
  const pathAbilities = system.abilitiesByPath[pathId] || [];
  const tiers = groupByTier(pathAbilities);

  return (
    <div className="max-w-[1600px] mx-auto pb-24">
      {/* Path constellation strip */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-lg text-ivory tracking-wide">{system.name}</h1>
          <VersionSwitch current={system.version} />
        </div>
      </div>
      <div className="arcane-panel p-3 mb-5 overflow-x-auto">
        <div className="flex items-end gap-5 min-w-max">
          {system.groups.map(group => (
            <div key={group.id} className="flex flex-col gap-1.5">
              {system.groups.length > 1 && (
                <span className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-dim px-1">{group.label}</span>
              )}
              <div className="flex gap-1">
                {system.paths.filter(p => p.groupId === group.id).map(p => {
                  const active = p.id === pathId;
                  const total = (system.abilitiesByPath[p.id] || []).length;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPathId(p.id)}
                      className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-colors w-[72px] ${active ? 'bg-charcoal' : 'hover:bg-charcoal/50'}`}
                    >
                      <ProgressRing value={learnedCount(ctl, p.id)} max={total} color={p.accent} size={46}>
                        <PathSigil path={p} size={34} active={active} className="!rounded-full" />
                      </ProgressRing>
                      <span className={`text-[11px] font-display tracking-wide truncate w-full text-center ${active ? 'text-ivory' : 'text-fog'}`}>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Path title */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4 px-1">
        <h2 className="font-display text-2xl tracking-wide" style={{ color: path.accent }}>{path.name}</h2>
        <p className="text-fog">{path.concept}{path.patron && <span className="text-mist"> · {path.patron}</span>}</p>
        <div className="ml-auto flex items-center gap-3 text-[11px] text-mist">
          {(['passive', 'active', 'cantrip', 'spell'] as const).map(k => (
            <span key={k} className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: KIND_META[k].color }} /> {KIND_META[k].label}
            </span>
          ))}
        </div>
      </div>

      {/* Tier board */}
      <div className="flex flex-col xl:flex-row gap-3 xl:gap-0 items-stretch">
        {tiers.map(({ tier, abilities }, index) => {
          const open = ctl.tierUnlocked(tier.id, pathId);
          return (
            <React.Fragment key={tier.id}>
              {index > 0 && (
                <div className="flex xl:flex-col items-center justify-center xl:justify-start xl:pt-10 gap-1 xl:w-8 flex-shrink-0 text-mist">
                  <span className="h-px w-8 xl:h-16 xl:w-px" style={{ background: open ? path.accent : 'rgba(106,106,122,0.4)' }} />
                  {open ? <Unlock size={13} style={{ color: path.accent }} /> : <Lock size={13} />}
                  <span className="h-px w-8 xl:h-16 xl:w-px" style={{ background: open ? path.accent : 'rgba(106,106,122,0.4)' }} />
                </div>
              )}
              <section
                className={`flex-1 min-w-0 rounded-lg border p-3 transition-colors ${open ? '' : 'opacity-55'}`}
                style={{
                  borderColor: open ? tint(path.accent, 0.3) : 'rgba(201,169,89,0.1)',
                  background: open ? `linear-gradient(180deg, ${tint(path.accent, 0.06)}, rgba(18,18,26,0.6))` : 'rgba(18,18,26,0.5)'
                }}
              >
                <header className="mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm tracking-widest uppercase text-ivory">{tier.name}</h3>
                    <span className="text-[11px] font-display text-gold">{tier.pointCost} pt</span>
                  </div>
                  <p className="text-[11px] text-mist">
                    {open ? `Levels ${tier.levels}` : ctl.level < tier.levelRequirement ? `Opens at level ${tier.levelRequirement}` : 'Learn one from the previous tier'}
                  </p>
                </header>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-1 gap-2">
                  {abilities.length === 0 && <p className="text-xs text-mist italic col-span-full">No abilities</p>}
                  {abilities.map(ability => {
                    const status = ctl.statusOf(ability, pathId);
                    const learned = status === 'learned';
                    const kindColor = KIND_META[kindOf(ability)].color;
                    return (
                      <div key={ability.id} className="relative" onMouseEnter={() => setHover(ability.id)} onMouseLeave={() => setHover(null)}>
                        <button
                          onClick={() => ctl.toggle(ability, pathId)}
                          className={`relative w-full text-left rounded-md pl-3 pr-7 py-2 border transition-all duration-200 ${
                            status === 'available' ? 'hover:-translate-y-0.5' : ''
                          } ${status === 'locked' || status === 'unaffordable' ? 'cursor-not-allowed' : ''}`}
                          style={{
                            borderColor: learned ? path.accent : 'rgba(201,169,89,0.15)',
                            background: learned ? tint(path.accent, 0.18) : 'rgba(10,10,15,0.55)',
                            boxShadow: learned ? `0 0 16px ${tint(path.accent, 0.35)}` : undefined
                          }}
                        >
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r" style={{ background: kindColor }} />
                          <span className={`block text-[13px] leading-snug ${learned ? 'text-ivory font-semibold' : status === 'unaffordable' ? 'text-mist' : 'text-parchment'}`}>
                            {ability.name}
                          </span>
                          <span className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-display tracking-wide" style={{ color: kindColor }}>
                              {ability.isSpell ? ability.tier : KIND_META[kindOf(ability)].label}
                            </span>
                            <CostTag ability={ability} />
                          </span>
                        </button>
                        <button
                          onClick={() => setDetail(ability)}
                          className="absolute top-1.5 right-1.5 p-0.5 text-mist hover:text-gold"
                          aria-label={`Read ${ability.name}`}
                        >
                          <Info size={13} />
                        </button>
                        {hover === ability.id && (
                          <div className={`hidden xl:block absolute z-30 top-0 w-72 ${index >= 3 ? 'right-full mr-2' : 'left-full ml-2'} p-3 arcane-tooltip pointer-events-none animate-fade-in`}>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="font-display text-sm text-ivory">{ability.name}</span>
                              <KindTag ability={ability} compact />
                            </div>
                            <p className="text-sm text-parchment/90 leading-snug">{previewText(ability.description, 220)}</p>
                            {status === 'locked' && <p className="text-xs text-gold mt-2">{ctl.lockReason(ability, pathId)}</p>}
                            <p className="text-[11px] text-mist mt-2">Click to {learned ? 'unlearn' : 'learn'} · ⓘ for full text</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </React.Fragment>
          );
        })}
      </div>

      {/* HUD */}
      <div className="fixed bottom-11 inset-x-0 z-30 border-t border-gold-accent bg-obsidian/95 backdrop-blur-md shadow-arcane-lg">
        <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex items-center gap-5 overflow-x-auto">
          <LevelStepper ctl={ctl} />
          <BudgetMeter ctl={ctl} className="w-44 flex-shrink-0" />
          <span className="w-px h-8 bg-gold-subtle flex-shrink-0" />
          <div className="flex items-center gap-4 flex-1">
            {ctl.learnedPaths.length === 0 && <span className="text-xs text-mist whitespace-nowrap">Essence pools appear here as you learn abilities.</span>}
            {ctl.learnedPaths.map(p => (
              <div key={p.id} className="flex items-center gap-1.5 flex-shrink-0" title={`${p.name} essence`}>
                <button onClick={() => setPathId(p.id)}><PathSigil path={p} size={26} active={p.id === pathId} /></button>
                <PoolCounter ctl={ctl} path={p} />
              </div>
            ))}
          </div>
          <RestButtons ctl={ctl} compact />
          <CharacterMenu ctl={ctl} direction="up" />
        </div>
      </div>

      <p className="text-center text-xs text-mist mt-6 flex items-center justify-center gap-1">
        Tiers open left to right <ChevronRight size={12} /> learn any ability in a tier to open the next once you reach its level
      </p>

      <AbilityDrawer ctl={ctl} ability={detail} onClose={() => setDetail(null)} />
    </div>
  );
};

export default ConstellationLayout;
