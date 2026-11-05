import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Megaphone } from 'lucide-react';
import { SystemPath, tint } from '../../talents/model';
import { buildV2System } from '../../talents/systems';
import { PathSigil } from '../../talents/ui';
import { HOMEBREW_URL } from '../../data/patchNotes/v2-1';
import {
  EXPANDED, LUNAR_CANTRIPS, LUNAR_CHANGES, LUNAR_DOMAIN, LUNAR_DOMAIN_LINES, LUNAR_SPELLS, LUNAR_TECHNIQUES, MOVED, NEW_PATHS, NewPath, PATCH, STAGED
} from '../../data/patchNotes/v2-2';
import { patchDate } from '../../data/patchNotes';
import { AbilityChip, AbilityDialog, Chips, PathChip, Prose, Section } from './shared';
import { Found, makeLookup } from './lookup';

const titleCase = (id: string) => id[0].toUpperCase() + id.slice(1);

const TOC = [
  ...NEW_PATHS.map(p => [p.id, `${p.sealed ? 'Sealed' : 'New'} path: ${titleCase(p.id)}`]),
  ['moved', 'Moved abilities'],
  ['lunar', 'Lunar'],
  ['techniques', 'New techniques and Domain Expansions'],
  ['filters', 'Path filters'],
  ['staged', 'Staged techniques'],
  ['homebrew', 'Homebrew sources']
];

const count = (lists: string[][]) => String(lists.reduce((sum, list) => sum + list.length, 0));

type Lookup = ReturnType<typeof makeLookup>;

/** One new path: its card, abilities, domain, Domain Expansions, and clashes. */
const NewPathSection: React.FC<{
  data: NewPath;
  pathById: (id: string) => SystemPath | undefined;
  find: Lookup;
  onOpen: (f: Found) => void;
}> = ({ data, pathById, find, onOpen }) => {
  const path = pathById(data.id);
  const name = path?.name ?? titleCase(data.id);
  return (
    <Section id={data.id} kicker={data.kicker} title={name}>
      {path && (
        <div className="rounded-lg border p-4 flex gap-4" style={{ borderColor: tint(path.accent, 0.3), background: tint(path.accent, 0.05) }}>
          <PathSigil path={path} size={52} active />
          <div className="min-w-0">
            <p className="flex items-center gap-2">
              <span className="font-display text-xl text-ivory tracking-wide">{path.name}</span>
              <span className="text-[10px] font-display tracking-wider uppercase px-1.5 rounded inline-flex items-center gap-1" style={{ color: path.accent, background: tint(path.accent, 0.12) }}>
                {data.sealed ? <><Lock size={10} /> Sealed</> : 'New'}
              </span>
            </p>
            {path.patron && <p className="text-sm text-gold-dim">{data.kicker.includes('Immortal') ? 'Taught by' : 'Portfolio of'} {path.patron}</p>}
            <p className="text-parchment/90 mt-1">{path.description}</p>
          </div>
        </div>
      )}
      <Prose>
        <p>{data.intro} Click any ability to read it.</p>
      </Prose>
      <div className="arcane-panel px-4">
        {([['Techniques', data.techniques], ['Cantrips', data.cantrips], ['Spells', data.spells]] as const).map(([label, names]) => (
          <div key={label} className="grid md:grid-cols-[110px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
            <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim md:pt-1">{label}</p>
            <Chips names={[...names]} pathId={data.id} lookup={find} onOpen={onOpen} />
          </div>
        ))}
      </div>
      <div className="arcane-panel px-4">
        <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim pt-4">{data.domain.label}</p>
        <h3 className="font-display text-ivory">{data.domain.name}</h3>
        <p className="pt-1 pb-2 text-sm text-mist">{data.domain.examples}.</p>
        <h3 className="font-display text-ivory pt-2">Domain Expansions</h3>
        <ul>
          {data.domainLines.map(line => (
            <li key={line.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
              <div><AbilityChip name={line.name} found={find(data.id, line.name)} onOpen={onOpen} /></div>
              <p className="text-parchment/90">{line.text}</p>
            </li>
          ))}
        </ul>
        {data.domainNote && <p className="pb-4 text-sm text-mist">{data.domainNote}</p>}
      </div>
      <div className="arcane-panel px-4">
        <h3 className="font-display text-ivory pt-4">Domain clashes</h3>
        <ul>
          {data.matchups.map(m => (
            <li key={m.path} className="grid md:grid-cols-[130px_170px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
              <div><PathChip path={pathById(m.path)} /></div>
              <p className="text-gold-bright md:pt-0.5">{m.result}</p>
              <p className="text-parchment/90 md:pt-0.5">{m.why}</p>
            </li>
          ))}
        </ul>
        <p className="pb-4 text-sm text-mist">Every other path clashes with it evenly.</p>
      </div>
      <Link to={`/?path=${data.id}`} className="arcane-btn !px-4 !py-2 text-sm inline-flex items-center gap-2">
        {data.sealed ? 'See' : 'Open'} the {name} path <ArrowRight size={14} />
      </Link>
    </Section>
  );
};

/** V2.2: Navigation, Crypt, Wisdom, and the sealed Tyranny, the abilities that moved into them, and Lunar's new abilities. */
const PatchV2_2: React.FC = () => {
  const { v2, find } = useMemo(() => {
    const v2 = buildV2System();
    return { v2, find: makeLookup(v2) };
  }, []);
  const [open, setOpen] = useState<Found | null>(null);
  const path = (id: string) => v2.paths.find(p => p.id === id);
  const lunar = path('lunar');
  const glow = (id: string, fallback: string, alpha: number) => tint(path(id)?.accent ?? fallback, alpha);

  return (
    <>
      <header className="arcane-panel p-6 md:p-10 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(60% 90% at 10% 0%, ${glow('navigation', '#fde68a', 0.14)}, transparent 70%), radial-gradient(50% 90% at 55% 0%, ${glow('crypt', '#34d399', 0.07)}, transparent 70%), radial-gradient(50% 90% at 95% 0%, ${glow('wisdom', '#818cf8', 0.12)}, transparent 70%)` }} />
        <div className="relative">
          <p className="flex flex-wrap items-center gap-2 font-display text-[11px] tracking-[0.25em] uppercase text-gold">
            <Megaphone size={14} /> Patch {PATCH.version} · {PATCH.name} <span className="text-mist">· {patchDate(PATCH)}</span>
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl text-ivory leading-tight tracking-wide max-w-4xl">{PATCH.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              [String(NEW_PATHS.length), 'new paths'],
              [count([...NEW_PATHS.map(p => p.techniques), LUNAR_TECHNIQUES, ...EXPANDED.map(p => p.techniques)]), 'new techniques'],
              [count([...NEW_PATHS.flatMap(p => [p.cantrips, p.spells]), LUNAR_CANTRIPS, LUNAR_SPELLS]), 'new spells and cantrips'],
              [String(MOVED.length), 'abilities moved']
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
          {NEW_PATHS.map(data => (
            <NewPathSection key={data.id} data={data} pathById={path} find={find} onOpen={setOpen} />
          ))}

          <Section id="moved" kicker="Other paths" title="Moved abilities">
            <Prose>
              <p>These now belong to another path, mostly one of the new ones. Mage Hand goes back to Mysteries, since moving things through space is its domain and not Ruin's. If you've learned one, it stays on your sheet.</p>
            </Prose>
            <ul className="arcane-panel px-4">
              {MOVED.map(m => (
                <li key={m.name} className="flex flex-wrap items-center gap-3 py-3 border-t border-gold-subtle first:border-t-0">
                  <AbilityChip name={m.name} found={find(m.to, m.name)} onOpen={setOpen} />
                  <PathChip path={path(m.from)} />
                  <ArrowRight size={12} className="text-mist" />
                  <PathChip path={path(m.to)} />
                </li>
              ))}
            </ul>
            <Prose>
              <p>If a moved ability was the only one that opened a tier in its old path, such as Storm Navigator for Tempest's Initiate tier, abilities that needed it are removed from your build and their Essence is refunded. The app tells you which ones when you load the character.</p>
            </Prose>
          </Section>

          <Section id="lunar" kicker="Expanded path" title="Lunar">
            <Prose>
              <p>If a star itself hits something, it's Lunar. If it tells you something, or a pattern of stars works for you, it's Navigation. Lunar also gets new abilities, including its first Initiate techniques and its first attack cantrip. Lycanthropy is now part of it too, as Selûne's blessing and not a curse: you can take a hybrid form and share it with your pack.</p>
            </Prose>
            <div className="arcane-panel px-4">
              {([['Techniques', LUNAR_TECHNIQUES], ['Cantrips', LUNAR_CANTRIPS], ['Spells', LUNAR_SPELLS]] as const).map(([label, names]) => (
                <div key={label} className="grid md:grid-cols-[110px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
                  <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim md:pt-1">{label}</p>
                  <Chips names={[...names]} pathId="lunar" lookup={find} onOpen={setOpen} />
                </div>
              ))}
            </div>
            <div className="arcane-panel px-4">
              <h3 className="font-display text-ivory pt-4">Domain Expansions</h3>
              <ul>
                {LUNAR_DOMAIN_LINES.map(line => (
                  <li key={line.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                    <div><AbilityChip name={line.name} found={find('lunar', line.name)} onOpen={setOpen} /></div>
                    <p className="text-parchment/90">{line.text}</p>
                  </li>
                ))}
              </ul>
              <p className="pb-4 text-sm text-mist">Full Moon can be used only on Consecrated Ground.</p>
            </div>
            <div className="arcane-panel px-4">
              <h3 className="font-display text-ivory pt-4">Changed abilities</h3>
              <ul>
                {LUNAR_CHANGES.map(change => (
                  <li key={change.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                    <div><AbilityChip name={change.name} found={find('lunar', change.name)} onOpen={setOpen} /></div>
                    <p className="text-parchment/90">{change.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="arcane-panel px-4 text-sm">
              <p className="font-display text-ivory text-base pt-4">Consecrated Ground</p>
              {([['Before', LUNAR_DOMAIN.before, 'text-mist'], ['Now', LUNAR_DOMAIN.after, 'text-parchment/90']] as const).map(([label, text, color]) => (
                <div key={label} className="grid md:grid-cols-[80px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
                  <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim md:pt-0.5">{label}</p>
                  <p className={color}>{text}</p>
                </div>
              ))}
            </div>
            <div className="arcane-panel p-4 flex flex-wrap items-center gap-3 text-sm">
              <PathChip path={lunar} />
              <span className="text-mist">still overcomes</span>
              <PathChip path={path('tempest')} />
              <span className="text-parchment/90">but for a new reason: every storm blows over, and the moon still rises. Guiding ships through storms is Navigation's now.</span>
            </div>
          </Section>

          <Section id="techniques" kicker="Existing paths" title="New techniques and Domain Expansions">
            <Prose>
              <p>Water, Mysteries, and Alchemy get new techniques, adapted from Pathfinder 2e spells, and Water, Alchemy, and Heart get Domain Expansions on techniques they already had. Click any ability to read it.</p>
            </Prose>
            {EXPANDED.map(entry => (
              <div key={entry.id} className="arcane-panel px-4">
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <PathChip path={path(entry.id)} />
                  <p className="text-sm text-parchment/90">{entry.intro}</p>
                </div>
                {entry.techniques.length > 0 && (
                  <div className="py-3">
                    <Chips names={entry.techniques} pathId={entry.id} lookup={find} onOpen={setOpen} />
                  </div>
                )}
                {entry.changes?.map(change => (
                  <div key={change.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 py-2 border-t border-gold-subtle text-sm">
                    <div><AbilityChip name={change.name} found={find(entry.id, change.name)} onOpen={setOpen} /></div>
                    <p className="text-parchment/90"><span className="text-mist">Changed: </span>{change.text}</p>
                  </div>
                ))}
                {entry.domainLines.length > 0 && (
                  <ul className="pb-2">
                    {entry.domainLines.map(line => (
                      <li key={line.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 py-2 border-t border-gold-subtle text-sm">
                        <div><AbilityChip name={line.name} found={find(entry.id, line.name)} onOpen={setOpen} /></div>
                        <p className="text-parchment/90"><span className="text-mist">Domain Expansion: </span>{line.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>

          <Section id="filters" kicker="Talent tree" title="Path filters">
            <Prose>
              <p>Eight paths now have filter chips above their tiers. The path is still one path: the chips only narrow what you see.</p>
              <ul>
                <li><strong>Alchemy:</strong> Acid, Medicine, Poison, Explosives, Mutation</li>
                <li><strong>Water:</strong> Water, Ice</li>
                <li><strong>Heart:</strong> Unarmed, Blades, Spears, Blunt, Ranged, Body &amp; Mind. Techniques that work with any weapon show under every weapon.</li>
                <li><strong>Wisdom:</strong> Memory, Names, Knowledge, Thoughts &amp; Deduction</li>
                <li><strong>Lunar:</strong> Moonlight, Stars, Visions, Lycanthropy</li>
                <li><strong>Pestilence:</strong> Disease, Venom, Curses</li>
                <li><strong>Providence:</strong> Endurance, Martyrdom, Wards</li>
                <li><strong>Ruin:</strong> Murder, Pain, Strife</li>
              </ul>
              <p>Poison and Venom are different things. Venom grows in a body or spreads like sickness, and belongs to Pestilence. Poison is brewed, measured, and delivered by needle or vial, and belongs to Alchemy.</p>
            </Prose>
          </Section>

          <Section id="staged" kicker="Talent tree" title="Staged techniques">
            <Prose>
              <p>Techniques learned in stages, such as Stone Fist I to V, are now linked as one series.</p>
              <ul>
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

          <Section id="homebrew" kicker="For the table" title="Homebrew sources">
            <Prose>
              <p>The new paths' spells come from books already in the homebrew link, so if you loaded it for V2.1 there's nothing new to load.</p>
            </Prose>
            <a href={HOMEBREW_URL} target="_blank" rel="noreferrer" className="arcane-btn !px-4 !py-2 text-sm inline-flex items-center gap-2">Open on 5e.tools <ArrowRight size={14} /></a>
          </Section>
        </div>
      </div>
      <AbilityDialog found={open} onClose={() => setOpen(null)} />
    </>
  );
};

export default PatchV2_2;
