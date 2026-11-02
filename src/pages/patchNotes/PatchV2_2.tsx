import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Megaphone } from 'lucide-react';
import { tint } from '../../talents/model';
import { buildV2System } from '../../talents/systems';
import { PathSigil } from '../../talents/ui';
import { HOMEBREW_URL } from '../../data/patchNotes/v2-1';
import {
  CONSECRATED_GROUND, DOMAIN_LINES, LUNAR_CANTRIPS, LUNAR_CHANGES, LUNAR_DOMAIN, LUNAR_DOMAIN_LINES, LUNAR_SPELLS, LUNAR_TECHNIQUES, MATCHUPS, MOVED,
  NEW_CANTRIPS, NEW_SPELLS, NEW_TECHNIQUES, PATCH
} from '../../data/patchNotes/v2-2';
import { patchDate } from '../../data/patchNotes';
import { AbilityChip, AbilityDialog, Chips, PathChip, Prose, Section } from './shared';
import { Found, makeLookup } from './lookup';

const TOC = [
  ['navigation', 'New path: Navigation'],
  ['domain', 'The Charted Way'],
  ['moved', 'Moved abilities'],
  ['lunar', 'Lunar'],
  ['homebrew', 'Homebrew sources']
];

/** V2.2: the Navigation path, the abilities that moved into it, and Lunar's new abilities. */
const PatchV2_2: React.FC = () => {
  const { v2, find } = useMemo(() => {
    const v2 = buildV2System();
    return { v2, find: makeLookup(v2) };
  }, []);
  const [open, setOpen] = useState<Found | null>(null);
  const path = (id: string) => v2.paths.find(p => p.id === id);
  const navigation = path('navigation');
  const lunar = path('lunar');

  return (
    <>
      <header className="arcane-panel p-6 md:p-10 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(60% 90% at 15% 0%, ${tint(navigation?.accent ?? '#fde68a', 0.14)}, transparent 70%), radial-gradient(50% 90% at 90% 0%, ${tint(lunar?.accent ?? '#c7d2fe', 0.1)}, transparent 70%)` }} />
        <div className="relative">
          <p className="flex flex-wrap items-center gap-2 font-display text-[11px] tracking-[0.25em] uppercase text-gold">
            <Megaphone size={14} /> Patch {PATCH.version} · {PATCH.name} <span className="text-mist">· {patchDate(PATCH)}</span>
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl text-ivory leading-tight tracking-wide max-w-4xl">{PATCH.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              ['1', 'new path'],
              [String(NEW_TECHNIQUES.length + LUNAR_TECHNIQUES.length), 'new techniques'],
              [String(NEW_CANTRIPS.length + NEW_SPELLS.length + LUNAR_CANTRIPS.length + LUNAR_SPELLS.length), 'new spells and cantrips'],
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
          <Section id="navigation" kicker="New Divine path" title="Navigation">
            {navigation && (
              <div className="rounded-lg border p-4 flex gap-4" style={{ borderColor: tint(navigation.accent, 0.3), background: tint(navigation.accent, 0.05) }}>
                <PathSigil path={navigation} size={52} active />
                <div className="min-w-0">
                  <p className="flex items-center gap-2">
                    <span className="font-display text-xl text-ivory tracking-wide">{navigation.name}</span>
                    <span className="text-[10px] font-display tracking-wider uppercase px-1.5 rounded" style={{ color: navigation.accent, background: tint(navigation.accent, 0.12) }}>New</span>
                  </p>
                  {navigation.patron && <p className="text-sm text-gold-dim">Portfolio of {navigation.patron}</p>}
                  <p className="text-parchment/90 mt-1">{navigation.description}</p>
                </div>
              </div>
            )}
            <Prose>
              <p>The second Portfolio of Selûne. Lunar holds the moon and the stars themselves; Navigation holds the reading of them, for those who steer by the stars on land and at sea. Click any ability to read it.</p>
            </Prose>
            <div className="arcane-panel px-4">
              {([['Techniques', NEW_TECHNIQUES], ['Cantrips', NEW_CANTRIPS], ['Spells', NEW_SPELLS]] as const).map(([label, names]) => (
                <div key={label} className="grid md:grid-cols-[110px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
                  <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim md:pt-1">{label}</p>
                  <Chips names={[...names]} pathId="navigation" lookup={find} onOpen={setOpen} />
                </div>
              ))}
            </div>
            <Link to="/?path=navigation" className="arcane-btn !px-4 !py-2 text-sm inline-flex items-center gap-2">Open the Navigation path <ArrowRight size={14} /></Link>
          </Section>

          <Section id="domain" kicker="Consecrated Ground" title={CONSECRATED_GROUND.name}>
            <Prose>
              <p>{CONSECRATED_GROUND.examples}.</p>
            </Prose>
            <div className="arcane-panel px-4">
              <h3 className="font-display text-ivory pt-4">Domain Expansions</h3>
              <ul>
                {DOMAIN_LINES.map(line => (
                  <li key={line.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                    <div><AbilityChip name={line.name} found={find('navigation', line.name)} onOpen={setOpen} /></div>
                    <p className="text-parchment/90">{line.text}</p>
                  </li>
                ))}
              </ul>
              <p className="pb-4 text-sm text-mist">Tears of Selûne can be used only on Consecrated Ground.</p>
            </div>
            <div className="arcane-panel px-4">
              <h3 className="font-display text-ivory pt-4">Domain clashes</h3>
              <ul>
                {MATCHUPS.map(m => (
                  <li key={m.path} className="grid md:grid-cols-[130px_170px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                    <div><PathChip path={path(m.path)} /></div>
                    <p className="text-gold-bright md:pt-0.5">{m.result}</p>
                    <p className="text-parchment/90 md:pt-0.5">{m.why}</p>
                  </li>
                ))}
              </ul>
              <p className="pb-4 text-sm text-mist">Every other path clashes with it evenly.</p>
            </div>
          </Section>

          <Section id="moved" kicker="Other paths" title="Moved abilities">
            <Prose>
              <p>These now belong to Navigation. If you've learned one, it stays on your sheet.</p>
            </Prose>
            <ul className="arcane-panel px-4">
              {MOVED.map(m => (
                <li key={m.name} className="flex flex-wrap items-center gap-3 py-3 border-t border-gold-subtle first:border-t-0">
                  <AbilityChip name={m.name} found={find('navigation', m.name)} onOpen={setOpen} />
                  <PathChip path={path(m.from)} />
                  <ArrowRight size={12} className="text-mist" />
                  <PathChip path={navigation} />
                </li>
              ))}
            </ul>
            <Prose>
              <p>If Storm Navigator was your only Tempest Initiate ability, Tempest abilities that needed it are removed from your build and their Essence is refunded. The app tells you which ones when you load the character.</p>
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
              <span className="text-mist">and</span>
              <PathChip path={path('tempest')} />
              <span className="text-parchment/90">now clash evenly. Lunar no longer overcomes Tempest, because guiding ships through storms is Navigation's now.</span>
            </div>
          </Section>

          <Section id="homebrew" kicker="For the table" title="Homebrew sources">
            <Prose>
              <p>Navigation's spells come from books already in the homebrew link, so if you loaded it for V2.1 there's nothing new to load.</p>
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
