import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy, Megaphone } from 'lucide-react';
import { tint } from '../../talents/model';
import { buildV2System } from '../../talents/systems';
import { PathSigil } from '../../talents/ui';
import {
  ACTIVATION_SET, DAO_DOMAIN, HOMEBREW_URL, LEVEL_CHANGES, NEW_SPELLS, NEW_TAGS, PATCH, RUIN_CHANGES, STAT_BLOCK_REWRITES
} from '../../data/patchNotes/v2-1';
import { patchDate } from '../../data/patchNotes';
import { AbilityChip, AbilityDialog, Chips, PathChip, Prose, Section, Tag } from './shared';
import { Found, makeLookup } from './lookup';

const TOC = [
  ['undertow', 'New path: Undertow'],
  ['domain', 'Domain Expansion'],
  ['dao-domain', 'Dao Domain'],
  ['ruin', 'Ruin'],
  ['spells', 'Spells'],
  ['tags', 'Ability tags'],
  ['format', 'Format cleanup'],
  ['homebrew', 'Homebrew sources']
];

/** V2.1: the Undertow path, the Ruin rebalance, the spell pass, ability tags and a format cleanup. */
const PatchV2_1: React.FC = () => {
  const { v2, find } = useMemo(() => {
    const v2 = buildV2System();
    return { v2, find: makeLookup(v2) };
  }, []);
  const [open, setOpen] = useState<Found | null>(null);
  const [copied, setCopied] = useState(false);
  const path = (id: string) => v2.paths.find(p => p.id === id);
  const undertow = path('undertow');
  const ruin = path('ruin');

  const copyHomebrew = async () => {
    try {
      await navigator.clipboard.writeText(HOMEBREW_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <header className="arcane-panel p-6 md:p-10 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(60% 90% at 15% 0%, ${tint(undertow?.accent ?? '#9d90ff', 0.14)}, transparent 70%), radial-gradient(50% 90% at 90% 0%, ${tint(ruin?.accent ?? '#f87171', 0.1)}, transparent 70%)` }} />
        <div className="relative">
          <p className="flex flex-wrap items-center gap-2 font-display text-[11px] tracking-[0.25em] uppercase text-gold">
            <Megaphone size={14} /> Patch {PATCH.version} · {PATCH.name} <span className="text-mist">· {patchDate(PATCH)}</span>
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl text-ivory leading-tight tracking-wide max-w-4xl">{PATCH.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              ['1', 'new path'],
              [String(NEW_SPELLS.reduce((n, p) => n + (p.spells?.length ?? 0), 0)), 'new spells'],
              ['397', 'spells rewritten from source'],
              [String(LEVEL_CHANGES.length), 'spell levels corrected']
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
          <Section id="undertow" kicker="New Divine path" title="Undertow">
            {undertow && (
              <div className="rounded-lg border p-4 flex gap-4" style={{ borderColor: tint(undertow.accent, 0.3), background: tint(undertow.accent, 0.05) }}>
                <PathSigil path={undertow} size={52} active />
                <div className="min-w-0">
                  <p className="flex items-center gap-2">
                    <span className="font-display text-xl text-ivory tracking-wide">{undertow.name}</span>
                    <span className="text-[10px] font-display tracking-wider uppercase px-1.5 rounded" style={{ color: undertow.accent, background: tint(undertow.accent, 0.12) }}>New</span>
                  </p>
                  {undertow.patron && <p className="text-sm text-gold-dim">Portfolio of {undertow.patron}</p>}
                  <p className="text-parchment/90 mt-1">{undertow.description}</p>
                </div>
              </div>
            )}
            <Prose>
              <p>The Portfolio of Yhal'etsu, for the abyssal depths of the water: the lightless sea below the last light, where things drown and are dragged under. Everything in it is new.</p>
            </Prose>
            <Link to="/?path=undertow" className="arcane-btn !px-4 !py-2 text-sm inline-flex items-center gap-2">Open the Undertow path <ArrowRight size={14} /></Link>
          </Section>

          <Section id="domain" kicker="New rule" title="Domain Expansion">
            <Prose>
              <p>Domains now boost abilities, enhancing their power in many different and unique ways while you're in your domain. There are also domain-exclusive abilities, at Grandmaster and higher, that you can only use while in your domain.</p>
              <p>Because of this, domains are now meant to be contested. The rules for domain clashes are here:</p>
            </Prose>
            <Link to="/rules#domain-clash" className="arcane-btn !px-4 !py-2 text-sm inline-flex items-center gap-2">Domain clash rules <ArrowRight size={14} /></Link>
            <Prose>
              <p>I'll use this to balance abilities, starting with the Undertow and Ruin paths.</p>
            </Prose>
          </Section>

          <Section id="dao-domain" kicker="Immortal Attunement" title="Dao Domain">
            <Prose>
              <p>Dao Domain kept you in your Sanctum all the time, so domain bonuses would have been permanent for Immortals. It now lasts an hour a day, like Domain Manifestation and Consecration, but no clash can take that hour away.</p>
            </Prose>
            <div className="arcane-panel px-4 text-sm">
              {([['Before', DAO_DOMAIN.before, 'text-mist'], ['Now', DAO_DOMAIN.after, 'text-parchment/90']] as const).map(([label, text, color]) => (
                <div key={label} className="grid md:grid-cols-[80px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
                  <p className="font-display text-[11px] tracking-[0.2em] uppercase text-gold-dim md:pt-0.5">{label}</p>
                  <p className={color}>{text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="ruin" kicker="Rebalance" title="Ruin">
            <Prose>
              <p>Ruin is rebalanced around its Consecrated Ground. Some abilities now gain a bonus there, printed under their text as their <strong className="text-ivory">Domain Expansion</strong>. Click any ability to read it.</p>
            </Prose>
            <ul className="arcane-panel px-4">
              {RUIN_CHANGES.map(c => (
                <li key={c.name} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0 text-sm">
                  <div><AbilityChip name={c.name} found={find('ruin', c.name)} onOpen={setOpen} /></div>
                  <p className="text-parchment/90">{c.text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="spells" kicker="Every path" title="Spells">
            <Prose>
              <p>Every spell and cantrip has a new summary written from its 5etools entry, and links to its source.</p>
            </Prose>
            <div className="grid lg:grid-cols-2 gap-3">
              <div className="arcane-panel px-4">
                <h3 className="font-display text-ivory pt-4">New spells</h3>
                <p className="text-sm text-mist">Every path now has at least one spell of each level from 1st to 9th.</p>
                {NEW_SPELLS.map(entry => (
                  <div key={entry.path} className="grid sm:grid-cols-[130px_1fr] gap-2 sm:gap-3 py-3 border-t border-gold-subtle first:border-t-0">
                    <PathChip path={path(entry.path)} />
                    <Chips names={entry.spells!} pathId={entry.path} lookup={find} onOpen={setOpen} />
                  </div>
                ))}
              </div>
              <div className="arcane-panel p-4">
                <h3 className="font-display text-ivory mb-1">Levels corrected</h3>
                <p className="text-sm text-mist mb-3">These now match their source.</p>
                <ul className="space-y-2">
                  {LEVEL_CHANGES.map(r => (
                    <li key={r.name} className="flex flex-wrap items-center gap-2 text-sm">
                      <AbilityChip name={r.name} found={find(r.path, r.name)} onOpen={setOpen} />
                      <span className="text-mist line-through">{r.before}</span>
                      <ArrowRight size={12} className="text-mist" />
                      <span className="text-gold-bright">{r.after}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section id="tags" kicker="Every path" title="Ability tags">
            <Prose>
              <p>I added tags to abilities that show how they're used.</p>
            </Prose>
            <div className="flex flex-wrap gap-2">
              {NEW_TAGS.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>
          </Section>

          <Section id="format" kicker="No rules changed" title="Format cleanup">
            <Prose>
              <p>Some abilities were written like spells, with Casting Time, Range, Components and Duration lines. They now read like every other ability. How they work didn't change.</p>
            </Prose>
            <div className="arcane-panel px-4">
              {STAT_BLOCK_REWRITES.map(entry => (
                <div key={entry.path} className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
                  <PathChip path={path(entry.path)} />
                  <Chips names={entry.talents!} pathId={entry.path} lookup={find} onOpen={setOpen} />
                </div>
              ))}
            </div>
            <div className="arcane-panel px-4">
              <p className="pt-4 text-sm text-mist">These never said what they cost to use. Now their tag does.</p>
              {ACTIVATION_SET.map(entry => (
                <div key={entry.tags.join()} className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 py-3 border-t border-gold-subtle first:border-t-0">
                  <div className="flex flex-wrap content-start gap-1.5">{entry.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
                  <Chips names={entry.names} pathId="" lookup={find} onOpen={setOpen} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="homebrew" kicker="For the table" title="Homebrew sources">
            <Prose>
              <p>Some spells come from partnered or community books. Open this link once on 5e.tools to load every source the paths use. Loaded homebrew stays in your browser.</p>
            </Prose>
            <div className="arcane-panel p-4 space-y-3">
              <p className="font-mono text-xs text-fog bg-void/60 border border-gold-subtle rounded px-3 py-2 overflow-x-auto whitespace-nowrap">{HOMEBREW_URL}</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={HOMEBREW_URL} target="_blank" rel="noreferrer" className="arcane-btn arcane-btn-primary !px-4 !py-2 text-sm">Open on 5e.tools</a>
                <button type="button" onClick={copyHomebrew} className="arcane-btn !px-4 !py-2 text-sm inline-flex items-center gap-2"><Copy size={14} /> {copied ? 'Copied' : 'Copy link'}</button>
              </div>
              <p className="text-sm text-mist">Obojima: Tales from the Tall Grass loads with <span className="text-parchment">Load All Partnered</span> in 5etools' Manage Homebrew.</p>
            </div>
          </Section>
        </div>
      </div>
      <AbilityDialog found={open} onClose={() => setOpen(null)} />
    </>
  );
};

export default PatchV2_1;
