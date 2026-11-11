import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Megaphone } from 'lucide-react';
import { tint } from '../../talents/model';
import { buildV2System } from '../../talents/systems';
import { ALCHEMY, FILTERS, MOVED, PATCH, STAGED, TEMPEST_ERRATA } from '../../data/patchNotes/v2-1-1';
import { patchDate } from '../../data/patchNotes';
import { AbilityChip, AbilityDialog, Chips, PathChip, Prose, Section } from './shared';
import { Found, makeLookup } from './lookup';

const TOC = [
  ['tempest-errata', 'Tempest errata'],
  ['alchemy', 'Alchemy'],
  ['filters', 'Path filters'],
  ['staged', 'Staged techniques'],
  ['moved', 'Moved abilities'],
  ['colours', 'Path colours']
];

/** V2.1.1: Alchemy's expansion, path filters, staged techniques, and new colours for Ruin and Shadow. */
const PatchV2_1_1: React.FC = () => {
  const { v2, find } = useMemo(() => {
    const v2 = buildV2System();
    return { v2, find: makeLookup(v2) };
  }, []);
  const [open, setOpen] = useState<Found | null>(null);
  const path = (id: string) => v2.paths.find(p => p.id === id);
  const alchemy = path('alchemy');
  const heart = path('heart');

  return (
    <>
      <header className="arcane-panel p-6 md:p-10 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(60% 90% at 15% 0%, ${tint(alchemy?.accent ?? '#5eead4', 0.14)}, transparent 70%), radial-gradient(50% 90% at 90% 0%, ${tint(heart?.accent ?? '#e879f9', 0.1)}, transparent 70%)` }} />
        <div className="relative">
          <p className="flex flex-wrap items-center gap-2 font-display text-[11px] tracking-[0.25em] uppercase text-gold">
            <Megaphone size={14} /> Patch {PATCH.version} · {PATCH.name} <span className="text-mist">· {patchDate(PATCH)}</span>
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl text-ivory leading-tight tracking-wide max-w-4xl">{PATCH.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              [String(ALCHEMY.techniques.length), 'new Alchemy techniques'],
              [String(FILTERS.length), 'paths with filters'],
              [String(STAGED.length), 'staged techniques linked']
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-2xl text-gold-bright tabular-nums">{value}</p>
                <p className="text-mist">{label}</p>
              </div>
            ))}
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
          <Section id="tempest-errata" kicker="Errata" title="Tempest">
            <Prose>
              <p>Stormshot replaces Lightning Arrow in Tempest. If you had Lightning Arrow learned, the app removes it and frees its Essence points when you load your character.</p>
              <p>Thunderhead Judgment strikes a single target at Master. At Grandmaster, Red Lightning of Punishment blasts a 30-foot-radius sphere. Terrain of Tempest moves creatures and vehicles across the domain at initiative count 20, and The Last Shipwreck traps one creature in a shipwreck illusion. Terrain of Tempest and The Last Shipwreck require Consecrated Ground.</p>
              <p>Stormborn Presence and Raincaller gain Domain Expansions on Consecrated Ground.</p>
            </Prose>
            <div className="arcane-panel px-4">
              <div className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 py-3">
                <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim md:pt-1">New techniques</p>
                <Chips names={TEMPEST_ERRATA.techniques} pathId="tempest" lookup={find} onOpen={setOpen} />
              </div>
              <div className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle">
                <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim md:pt-1">Updated techniques</p>
                <Chips names={TEMPEST_ERRATA.updated} pathId="tempest" lookup={find} onOpen={setOpen} />
              </div>
            </div>
            <Link to="/?path=tempest" className="arcane-btn !px-4 !py-2 text-sm inline-flex items-center gap-2">Open the Tempest path <ArrowRight size={14} /></Link>
          </Section>

          <Section id="alchemy" kicker="Immortal path" title="Alchemy">
            <Prose>
              <p>Alchemy gets crafted poisons, body grafts (claws and wings), and new medicine, all of Nilo's own invention, and its older techniques get Domain Expansions. Vital Essence Sublimation gets a fourth stage at Grandmaster, which can seal one of a poisoned creature's abilities. Suicide Fuse makes a creature you finish burst over everyone near it. Two Grandmaster techniques work only in your Sanctum: Eight Trigrams Furnace seals a creature in a burning furnace, and Myriad Poison Sanctum poisons the creatures you choose there. Twenty new spells fill out its poisons, acids, explosives, medicine, and transmutation, from Wine Bomb to Bite of the King. Click any ability to read it.</p>
            </Prose>
            <div className="arcane-panel px-4">
              <div className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 py-3">
                <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim md:pt-1">New techniques</p>
                <Chips names={ALCHEMY.techniques} pathId="alchemy" lookup={find} onOpen={setOpen} />
              </div>
              <div className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle">
                <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim md:pt-1">New spells</p>
                <Chips names={ALCHEMY.spells} pathId="alchemy" lookup={find} onOpen={setOpen} />
              </div>
            </div>
            <div className="arcane-panel px-4">
              <p className="pt-4 text-sm text-mist">Domain Expansions: what each technique gains in your Sanctum.</p>
              <ul>
                {ALCHEMY.domainLines.map(c => (
                  <li key={c.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                    <div><AbilityChip name={c.name} found={find('alchemy', c.name)} onOpen={setOpen} /></div>
                    <p className="text-parchment/90">{c.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="arcane-panel px-4">
              <p className="pt-4 text-sm text-mist">Tier changes. If your build no longer fits, the app removes what doesn't and refunds its Essence when you load the character.</p>
              <ul>
                {ALCHEMY.changes.map(c => (
                  <li key={c.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                    <div><AbilityChip name={c.name} found={find('alchemy', c.name)} onOpen={setOpen} /></div>
                    <p className="text-parchment/90">{c.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/?path=alchemy" className="arcane-btn !px-4 !py-2 text-sm inline-flex items-center gap-2">Open the Alchemy path <ArrowRight size={14} /></Link>
          </Section>

          <Section id="filters" kicker="Talent tree" title="Path filters">
            <Prose>
              <p>{FILTERS.length} paths now have filter chips above their tiers. The path is still one path: the chips only narrow what you see.</p>
              <p>Poison and Venom are different things. Venom grows in a body or spreads like sickness, and belongs to Pestilence. Poison is brewed, measured, and delivered by needle or vial, and belongs to Alchemy.</p>
            </Prose>
            <div className="arcane-panel px-4">
              {FILTERS.map(f => (
                <div key={f.path} className="grid md:grid-cols-[150px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                  <div><PathChip path={path(f.path)} /></div>
                  <p className="text-parchment/90">{f.facets}{f.note && <span className="text-mist"> · {f.note}</span>}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="staged" kicker="Talent tree" title="Staged techniques">
            <Prose>
              <p>Techniques learned in stages, such as Stone Fist I to V, are now linked as one series.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Each stage needs the one before it. Unlearning a stage also removes the stages after it.</li>
                <li>A staged technique costs the price of its highest stage, so each upgrade costs the difference: Stone Fist I, II, and III cost 3 together, not 6.</li>
                <li>Every active stage still adds its own cost to your Essence pool, since you still use it: Radiant Vein Blade I, II, and III cost 3 and add 6. Only the highest stage holds Essence, if it's a passive.</li>
                <li>On the talent tree, each series has its own row, so its stages line up across the tiers.</li>
                <li>When each stage is a stronger copy of the one before, your sheet shows only the highest.</li>
              </ul>
              <p>If your build has a later stage without the earlier ones, the earlier ones are added for you. If you can't afford them, the later stages are removed and their Essence refunded. The app tells you which when you load the character.</p>
            </Prose>
            <div className="arcane-panel px-4">
              <ul>
                {STAGED.map(series => (
                  <li key={series.names[0]} className="grid md:grid-cols-[130px_150px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                    <div><PathChip path={path(series.path)} /></div>
                    <p className="text-gold-bright md:pt-0.5">{series.stages === 'replace' ? 'Sheet shows the highest' : 'Sheet shows every stage'}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {series.names.map(name => <AbilityChip key={name} name={name} found={find(series.path, name)} onOpen={setOpen} />)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="moved" kicker="Path boundaries" title="Moved abilities">
            <Prose>
              <p>Mage Hand fit none of Ruin's filters, so it goes back to Mysteries. If you had it, it's still learned; the app re-checks your build when you load the character.</p>
            </Prose>
            <ul className="arcane-panel px-4">
              {MOVED.map(m => (
                <li key={m.name} className="flex flex-wrap items-center gap-3 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                  <AbilityChip name={m.name} found={find(m.to, m.name)} onOpen={setOpen} />
                  <PathChip path={path(m.from)} strike />
                  <ArrowRight size={12} className="text-mist" />
                  <PathChip path={path(m.to)} />
                </li>
              ))}
            </ul>
          </Section>

          <Section id="colours" kicker="Talent tree" title="Path colours">
            <Prose>
              <p>Ruin is now violet and Shadow a darker purple. Divine paths are reordered: Lunar, Providence, Love, Tempest, Undertow, Ruin, Pestilence, Shadow.</p>
            </Prose>
            <div className="flex flex-wrap gap-4">
              <PathChip path={path('ruin')} />
              <PathChip path={path('shadow')} />
            </div>
          </Section>
        </div>
      </div>
      <AbilityDialog found={open} onClose={() => setOpen(null)} />
    </>
  );
};

export default PatchV2_1_1;
