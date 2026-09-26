import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, CircleSlash, Layers, Megaphone, Route, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import AbilityMarkdown from '../components/essences/AbilityMarkdown';
import { Ability } from '../types/essence';
import { SystemPath, TalentSystem, TIER_IDS, tierInfo, tint } from '../talents/model';
import { buildV1System, buildV2System } from '../talents/systems';
import { GroupLabel, PathSigil } from '../talents/ui';
import {
  DELETED_ESSENCES, FIXES, MOTIVATION, MOVED, NEW_PATH_IDS, NEW_SPELLS, NEW_TALENTS, PATCH, PathAbilities, QA,
  REMOVED, RETIERED, REWORKED, STONE_FIST
} from '../data/patchNotesV2';

const RANKS = [...TIER_IDS, 'cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];
const normalize = (name: string) => name.toLowerCase().replace(/[’‘]/g, "'");

interface Found { ability: Ability; path: SystemPath }

/** Finds abilities by name, preferring the given path, so the notes can show tiers and full text. */
const makeLookup = (system: TalentSystem) => {
  const index = new Map<string, Found>();
  const any = new Map<string, Found>();
  for (const path of system.paths) {
    for (const ability of system.abilitiesByPath[path.id] || []) {
      index.set(`${path.id}|${normalize(ability.name)}`, { ability, path });
      if (!any.has(normalize(ability.name))) any.set(normalize(ability.name), { ability, path });
    }
  }
  return (pathId: string, name: string) => index.get(`${pathId}|${normalize(name)}`) ?? any.get(normalize(name));
};

const rankLabel = (ability: Ability) => {
  if (ability.tier === 'cantrip') return 'Cantrip';
  if (ability.isSpell) return ability.tier;
  return tierInfo(ability.tier as never)?.name ?? ability.tier;
};

const byRank = (lookup: ReturnType<typeof makeLookup>, pathId: string) => (a: string, b: string) =>
  RANKS.indexOf(lookup(pathId, a)?.ability.tier ?? '') - RANKS.indexOf(lookup(pathId, b)?.ability.tier ?? '');

/* ---------------------------------------------------------------- atoms */

const PathChip: React.FC<{ path?: SystemPath; strike?: boolean }> = ({ path, strike }) => path ? (
  <span className={`inline-flex items-center gap-1.5 text-sm font-display tracking-wide ${strike ? 'line-through opacity-70' : ''}`} style={{ color: path.accent }}>
    <PathSigil path={path} size={22} /> {path.name}
  </span>
) : null;

const AbilityChip: React.FC<{ found?: Found; name: string; onOpen: (f: Found) => void; strike?: boolean }> = ({ found, name, onOpen, strike }) => {
  const accent = found?.path.accent ?? '#9a9aa8';
  return (
    <button
      type="button"
      disabled={!found}
      onClick={() => found && onOpen(found)}
      className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-sm text-parchment border transition-colors hover:text-ivory disabled:cursor-default"
      style={{ borderColor: tint(accent, 0.25), background: tint(accent, 0.06) }}
    >
      <span className={strike ? 'line-through decoration-mist' : ''}>{found?.ability.name ?? name}</span>
      {found && <span className="text-[10px] font-display tracking-wide text-mist">{rankLabel(found.ability)}</span>}
    </button>
  );
};

const Chips: React.FC<{ names: string[]; pathId: string; lookup: ReturnType<typeof makeLookup>; onOpen: (f: Found) => void; strike?: boolean }> = ({
  names, pathId, lookup, onOpen, strike
}) => (
  <div className="flex flex-wrap gap-1.5">
    {[...names].sort(byRank(lookup, pathId)).map(name => (
      <AbilityChip key={name} name={name} found={lookup(pathId, name)} onOpen={onOpen} strike={strike} />
    ))}
  </div>
);

const Section: React.FC<{ id: string; kicker: string; title: string; children: React.ReactNode }> = ({ id, kicker, title, children }) => (
  <section id={id} className="scroll-mt-6 space-y-4">
    <div>
      <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gold-dim">{kicker}</p>
      <h2 className="font-display text-2xl text-ivory tracking-wide">{title}</h2>
    </div>
    {children}
  </section>
);

const Prose: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-3 text-[17px] leading-relaxed text-parchment/90">{children}</div>
);

const AbilityDialog: React.FC<{ found: Found | null; onClose: () => void }> = ({ found, onClose }) => {
  useEffect(() => {
    if (!found) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [found, onClose]);
  if (!found) return null;
  const { ability, path } = found;
  const origin = [ability.author, ability.location].filter(Boolean).join(' · ');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-void/75 backdrop-blur-[3px]" />
      <div
        role="dialog" aria-label={ability.name}
        className="relative w-full max-w-xl max-h-[85vh] rounded-xl border bg-obsidian shadow-arcane-lg flex flex-col animate-fade-in"
        style={{ borderColor: tint(path.accent, 0.35) }}
        onClick={e => e.stopPropagation()}
      >
        <header className="p-5 pb-4 flex items-start gap-3 border-b border-gold-subtle rounded-t-xl"
          style={{ background: `radial-gradient(90% 120% at 0% 0%, ${tint(path.accent, 0.16)}, transparent 70%)` }}>
          <PathSigil path={path} size={40} active />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-display tracking-[0.2em] uppercase" style={{ color: path.accent }}>{path.name} · {rankLabel(ability)}</p>
            <h3 className="font-display text-xl text-ivory leading-tight">{ability.name}</h3>
            {origin && <p className="text-xs text-mist mt-0.5">{origin}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 text-mist hover:text-parchment rounded hover:bg-charcoal" aria-label="Close"><X size={18} /></button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">
          <AbilityMarkdown content={ability.description} />
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- page */

const TOC = [
  ['why', 'Why this patch'],
  ['pools', 'Three Essence pools'],
  ['qa', 'Q&A'],
  ['ui', 'UI/UX'],
  ['paths', 'New paths'],
  ['new', 'New abilities'],
  ['moved', 'Where did my abilities go?'],
  ['rebalances', 'Rebalances'],
  ['removed', 'Abilities removed'],
  ['migration', 'Migration guide']
];

const PatchNotesPage: React.FC = () => {
  const { v1, v2, find1, find2 } = useMemo(() => {
    const v1 = buildV1System();
    const v2 = buildV2System();
    return { v1, v2, find1: makeLookup(v1), find2: makeLookup(v2) };
  }, []);
  const [open, setOpen] = useState<Found | null>(null);
  const p1 = (id: string) => v1.paths.find(p => p.id === id);
  const p2 = (id: string) => v2.paths.find(p => p.id === id);
  const countNewTalents = NEW_TALENTS.reduce((n, p) => n + (p.talents?.length ?? 0), 0);
  const countNewSpells = NEW_SPELLS.reduce((n, p) => n + (p.spells?.length ?? 0), 0);
  const date = new Date(`${PATCH.date}T12:00:00`).toLocaleDateString(undefined, { dateStyle: 'long' });

  const destRow = (entry: PathAbilities, key: string) => (
    <div key={key} className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
      <PathChip path={p2(entry.path)} />
      <div className="space-y-1.5">
        {entry.talents && <Chips names={entry.talents} pathId={entry.path} lookup={find2} onOpen={setOpen} />}
        {entry.spells && <Chips names={entry.spells} pathId={entry.path} lookup={find2} onOpen={setOpen} />}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto">
        {/* Hero */}
        <header className="arcane-panel p-6 md:p-10 mb-8 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(60% 80% at 15% 0%, rgba(52,211,153,0.10), transparent 70%), radial-gradient(50% 80% at 55% 0%, rgba(165,180,252,0.10), transparent 70%), radial-gradient(50% 80% at 95% 0%, rgba(240,171,252,0.10), transparent 70%)' }} />
          <div className="relative">
            <p className="flex flex-wrap items-center gap-2 font-display text-[11px] tracking-[0.25em] uppercase text-gold">
              <Megaphone size={14} /> Patch {PATCH.version} · {PATCH.name} <span className="text-mist">· {date}</span>
            </p>
            <h1 className="mt-3 font-display text-3xl md:text-5xl text-ivory leading-tight tracking-wide max-w-4xl">{PATCH.title}</h1>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                ['9 → 16', 'essences became paths'],
                ['3', 'Essence pools'],
                [String(countNewTalents + countNewSpells), 'new abilities'],
                [String(REMOVED.reduce((n, r) => n + (r.spells?.length ?? 0), 0)), 'abilities removed']
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl text-gold-bright tabular-nums">{value}</p>
                  <p className="text-mist">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/v2" className="arcane-btn arcane-btn-primary !px-4 !py-2 text-sm inline-flex items-center gap-2"><Layers size={15} /> Open Talents V2</Link>
              <a href="#migration" className="arcane-btn !px-4 !py-2 text-sm inline-flex items-center gap-2"><Route size={15} /> How do I migrate?</a>
            </div>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-10">
          <nav className="hidden lg:block" aria-label="Patch notes sections">
            <ul className="sticky top-6 space-y-1 border-l border-gold-subtle">
              {TOC.map(([id, label]) => (
                <li key={id}><a href={`#${id}`} className="block pl-4 py-1 text-sm text-fog hover:text-gold-bright -ml-px border-l border-transparent hover:border-gold">{label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14 min-w-0">
            <Section id="why" kicker="Developer notes" title="Why this patch exists">
              <Prose>{MOTIVATION.map(p => <p key={p}>{p}</p>)}</Prose>
            </Section>

            <Section id="pools" kicker="Headline change" title="Three Essence pools">
              <Prose>
                <p>You can use the same number of abilities as before. The difference is where the Essence comes from. Instead of one pool per essence, you now have <strong className="text-ivory">three pools, divided by source: Primordial, Divine, and Immortal.</strong> Every path you learn adds to the pool of its source, and any ability from that source can spend from it.</p>
              </Prose>
              <div className="grid md:grid-cols-3 gap-3">
                {v2.groups.map(group => (
                  <div key={group.id} className="arcane-panel p-4" style={{ borderColor: tint(group.accent, 0.3) }}>
                    <GroupLabel label={`${group.label} pool`} accent={group.accent} className="mb-3" />
                    <div className="flex flex-col gap-2">
                      {v2.paths.filter(p => p.groupId === group.id).map(p => <PathChip key={p.id} path={p} />)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-3 flex items-center gap-3 text-sm">
                  <Check size={18} className="text-emerald-400 flex-shrink-0" />
                  <span className="flex flex-wrap items-center gap-2">Essence from <PathChip path={p2('fire')} /> can pay for <PathChip path={p2('water')} /></span>
                </div>
                <div className="rounded-lg border border-red-400/30 bg-red-400/5 p-3 flex items-center gap-3 text-sm">
                  <X size={18} className="text-red-400 flex-shrink-0" />
                  <span className="flex flex-wrap items-center gap-2">Essence from <PathChip path={p2('fire')} /> can't pay for <PathChip path={p2('lunar')} /></span>
                </div>
              </div>
              <Prose>
                <p>For now, the only drawback to mixing sources is that your Essence is split between pools. I haven't decided on drawbacks for mixing paths, or benefits for sticking to one. Those may come later.</p>
                <p><strong className="text-ivory">Attunement.</strong> I still need to rework Elemental Attunement and create its counterparts, Divine Attunement and Immortal Attunement. You will most likely only be able to hold one of them. Choosing your path to immortality may never come up, since it is likely a Grandmaster-level decision.</p>
              </Prose>
              <p className="rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-parchment">
                For now, treat everyone as a <span className="text-gold-bright">Primordial cultivator with Elemental Attunement</span>.
              </p>
            </Section>

            <Section id="qa" kicker="You asked" title="Q&A">
              <dl className="grid md:grid-cols-2 gap-3">
                {QA.map(({ q, a }) => (
                  <div key={q} className="arcane-panel p-4">
                    <dt className="font-display text-ivory tracking-wide">{q}</dt>
                    <dd className="mt-1.5 text-parchment/85 leading-relaxed">{a}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section id="ui" kicker="Interface" title="UI/UX">
              <Prose>
                <p>The site got a new look, split into three pages: <strong className="text-ivory">Talents</strong>, <strong className="text-ivory">Essence</strong>, and <strong className="text-ivory">Summary</strong>. Your level and remaining points now sit in a dock at the bottom of the screen.</p>
                <p>Prefer the old look? Use the layout toggle in the header to switch between <strong className="text-ivory">Constellation</strong> (the new design, V2's default) and <strong className="text-ivory">Classic</strong> (the old design, V1's default). Classic isn't an exact copy of the old site; I fixed a few things along the way.</p>
                <p>Every ability now shows <strong className="text-ivory">who taught it and where</strong>: a sect, tribe, person, or deity, and Sirius, Leatrux, or Phudara / Isle of Whispers. It's there if it helps your immersion. Spells from books name their sourcebook instead.</p>
                <p>The Essence page tracks your pools during play. Switch between two trackers in its header: <strong className="text-ivory">Cast</strong>, where you tap an ability to spend its cost, and <strong className="text-ivory">Rings</strong>, a ring gauge for each pool.</p>
              </Prose>
            </Section>

            <Section id="paths" kicker="Sixteen paths" title="New paths">
              <Prose>
                <p>V1's nine essences became sixteen paths in three families.</p>
              </Prose>
              {v2.groups.map(group => (
                <div key={group.id}>
                  <GroupLabel label={group.label} accent={group.accent} className="mb-2" />
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {v2.paths.filter(p => p.groupId === group.id).map(path => {
                      const badge = NEW_PATH_IDS.includes(path.id) ? 'New' : path.id === 'sky' ? 'Formerly Air' : null;
                      return (
                        <div key={path.id} className="rounded-lg border p-3 flex gap-3" style={{ borderColor: tint(path.accent, 0.25), background: tint(path.accent, 0.04) }}>
                          <PathSigil path={path} size={40} active={!!badge} />
                          <div className="min-w-0">
                            <p className="flex items-center gap-2">
                              <span className="font-display text-ivory tracking-wide">{path.name}</span>
                              {badge && <span className="text-[10px] font-display tracking-wider uppercase px-1.5 rounded" style={{ color: path.accent, background: tint(path.accent, 0.12) }}>{badge}</span>}
                            </p>
                            {path.patron && <p className="text-xs text-gold-dim">{path.patron}</p>}
                            <p className="text-sm text-fog mt-0.5">{path.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap items-center gap-3 text-sm text-mist">
                <span className="font-display text-[10px] tracking-[0.2em] uppercase text-red-400">Deleted</span>
                {DELETED_ESSENCES.map(id => <PathChip key={id} path={p1(id)} strike />)}
              </div>
            </Section>

            <Section id="new" kicker={`${countNewTalents} talents · ${countNewSpells} spells`} title="New abilities">
              <p className="text-sm text-mist">Click any ability to read it.</p>
              <h3 className="font-display text-lg text-ivory">Talents</h3>
              <div className="arcane-panel px-4">
                {NEW_TALENTS.map(entry => (
                  <div key={entry.path} className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
                    <PathChip path={p2(entry.path)} />
                    <div className="space-y-1.5">
                      <Chips names={entry.talents!} pathId={entry.path} lookup={find2} onOpen={setOpen} />
                      <p className="text-xs text-mist">Taught by {entry.teacher}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="font-display text-lg text-ivory pt-2">Spells and cantrips</h3>
              <p className="text-sm text-mist">Some come from partnered or community books. Those only open on 5e.tools once that homebrew is loaded in its Homebrew manager.</p>
              <div className="arcane-panel px-4">
                {NEW_SPELLS.map(entry => destRow(entry, entry.path))}
              </div>
            </Section>

            <Section id="moved" kicker="Abilities moved by path" title="Where did my abilities go?">
              <p className="text-sm text-mist">Spells that V1 listed under two essences (Fog Cloud, Misty Step, Cloudkill, Storm of Vengeance and others) now have a single home.</p>
              <div className="space-y-4">
                {MOVED.map(group => {
                  const from = p1(group.from);
                  const status = group.status === 'deleted' ? { label: 'Deleted', color: '#f87171' }
                    : group.status === 'renamed' ? { label: 'Renamed to Sky', color: '#7dd3fc' } : null;
                  return (
                    <div key={group.from} className="arcane-panel p-4">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <PathChip path={from} strike={group.status === 'deleted'} />
                        {status && <span className="text-[10px] font-display tracking-wider uppercase px-1.5 rounded" style={{ color: status.color, background: tint(status.color, 0.12) }}>{status.label}</span>}
                        <span className="text-sm text-mist">{group.note}</span>
                      </div>
                      <div className="flex items-center gap-2 text-mist text-xs mb-1"><ArrowRight size={12} /> moved to</div>
                      {group.to.map(entry => destRow(entry, `${group.from}-${entry.path}`))}
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section id="rebalances" kicker="Abilities changed" title="Rebalances">
              <div className="grid lg:grid-cols-2 gap-3">
                <div className="arcane-panel p-4">
                  <h3 className="font-display text-ivory mb-3">Tier changes</h3>
                  <ul className="space-y-2">
                    {RETIERED.map(r => (
                      <li key={r.name} className="flex flex-wrap items-center gap-2 text-sm">
                        <AbilityChip name={r.name} found={find2(r.path, r.name)} onOpen={setOpen} />
                        <span className="text-mist line-through">{r.before}</span>
                        <ArrowRight size={12} className="text-mist" />
                        <span className={r.after === 'Adept' ? 'text-emerald-400' : 'text-amber-300'}>{r.after}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="arcane-panel p-4">
                  <h3 className="font-display text-ivory mb-1">Stone Fist, rescaled</h3>
                  <p className="text-sm text-mist mb-3">Moved to <span style={{ color: p2('heart')?.accent }}>Heart</span> and stretched into a five-step line.</p>
                  <table className="w-full text-sm">
                    <thead><tr className="text-left text-mist font-display text-[11px] tracking-wider uppercase"><th className="font-normal pb-1">Talent</th><th className="font-normal pb-1">V1</th><th className="font-normal pb-1">V2</th></tr></thead>
                    <tbody>
                      {STONE_FIST.map(s => (
                        <tr key={s.name} className="border-t border-gold-subtle">
                          <td className="py-1.5"><button className="text-parchment hover:text-ivory text-left" onClick={() => { const f = find2('heart', s.name); if (f) setOpen(f); }}>{s.name}</button> <span className="text-xs text-mist">{s.tier}</span></td>
                          <td className="py-1.5 text-mist tabular-nums">{s.before ?? '—'}</td>
                          <td className="py-1.5 tabular-nums text-gold-bright">{s.after}{!s.before && <span className="ml-1.5 text-[10px] font-display uppercase text-emerald-400">new</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="arcane-panel p-4">
                <h3 className="font-display text-ivory mb-3">Other changes</h3>
                <ul className="space-y-3">
                  {REWORKED.map(r => (
                    <li key={r.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 text-sm">
                      <div><AbilityChip name={r.name} found={find2(r.path, r.name)} onOpen={setOpen} /></div>
                      <div>
                        <p><span className="text-mist line-through">{r.before}</span></p>
                        <p className="text-parchment">{r.after}</p>
                        {r.note && <p className="text-xs text-mist">{r.note}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="arcane-panel p-4">
                <h3 className="font-display text-ivory mb-3">Fixes</h3>
                <ul className="space-y-3">
                  {FIXES.map(f => (
                    <li key={f.text} className="text-sm space-y-1">
                      <div className="flex flex-wrap gap-1.5">{f.names.map(n => <AbilityChip key={n} name={n} found={find2('', n)} onOpen={setOpen} />)}</div>
                      <p className="text-fog">{f.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            <Section id="removed" kicker="Gone for now" title="Abilities removed">
              <Prose>
                <p>Most removals are Acid spells. V1 assumed the nine essences covered everything, so they absorbed any spell with an elemental flavor. Most of those found a new home. These didn't, and are removed for now:</p>
              </Prose>
              <div className="arcane-panel px-4">
                {REMOVED.map(entry => (
                  <div key={entry.path} className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
                    <PathChip path={p1(entry.path)} />
                    <div className="flex flex-wrap items-center gap-1.5">
                      <CircleSlash size={14} className="text-mist" />
                      <Chips names={entry.spells!} pathId={entry.path} lookup={find1} onOpen={setOpen} strike />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="migration" kicker="Moving your character" title="Migration guide">
              <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-4 py-3 text-parchment">
                <strong className="text-emerald-300">You don't have to do anything.</strong> Your character is carried over for you, and your V1 character stays on the V1 page, so you can keep playing it until the Sirius arc ends.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  ['Automatic', 'The first time you open Talents V2 in the browser you used for V1, your V1 character is carried over. If you already had a V2 build, it is backed up first.'],
                  ['From the V1 page', 'Press Move to V2 in the bottom dock to carry your current V1 character over at any time.'],
                  ['From a saved file', 'On the V2 page, use Character → Load build from file with your saved V1 file. It is converted the same way.']
                ].map(([title, text]) => (
                  <div key={title} className="arcane-panel p-4">
                    <h3 className="font-display text-ivory">{title}</h3>
                    <p className="text-sm text-fog mt-1">{text}</p>
                  </div>
                ))}
              </div>
              <div className="arcane-panel p-4">
                <h3 className="font-display text-ivory mb-2">What happens to your abilities</h3>
                <ul className="space-y-2 text-parchment/90">
                  <li><strong className="text-ivory">Moved abilities</strong> stay learned on their new path.</li>
                  <li><strong className="text-ivory">Removed abilities</strong> are unlearned, and their Essence is refunded.</li>
                  <li><strong className="text-ivory">Retiered abilities</strong> stay learned as long as you meet the new tier's requirements. If an ability's tier no longer unlocks (for example, Stone Fist III now needs Heart's lower tiers), it is unlearned and refunded, along with anything above it that depended on it.</li>
                  <li><strong className="text-ivory">Essence</strong> is counted per source (Primordial, Divine, Immortal) instead of per essence. You have the same total as before.</li>
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/v2/migration" className="arcane-btn arcane-btn-primary !px-4 !py-2 text-sm inline-flex items-center gap-2"><Route size={15} /> Open your migration guide</Link>
                <span className="text-sm text-mist">Lists every ability you had, where it went, and anything that needs your attention.</span>
              </div>
            </Section>
          </div>
        </div>
      </div>
      <AbilityDialog found={open} onClose={() => setOpen(null)} />
    </Layout>
  );
};

export default PatchNotesPage;
