import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, CircleSlash, Network, RefreshCw, XOctagon } from 'lucide-react';
import type { SystemPath, TalentController } from '../model';
import { tint } from '../model';
import { pagePath } from '../routes';
import { PageHeader } from '../header/PageHeader';
import { AbilityIcon, EmptyState, LearnButton, PathSigil } from '../ui';
import {
  MigrationEntry, MigrationPlan, SEVERITY_META, Severity, currentMigration, describeEntry, getV1System, rankLabel, severityOf, summarize
} from '../migration';

const PathChip: React.FC<{ path: SystemPath; muted?: boolean }> = ({ path, muted }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-display tracking-wide ${muted ? 'opacity-60' : ''}`} style={{ color: path.accent }}>
    <PathSigil path={path} size={20} /> {path.name}
  </span>
);

/** One V1 ability: where it went, what changed, and whether it is learned now. */
const EntryRow: React.FC<{ ctl: TalentController; entry: MigrationEntry; level: number }> = ({ ctl, entry, level }) => {
  const severity = SEVERITY_META[severityOf(entry)];
  const { v1, v1Path, v2, v2Path } = entry;
  const learned = v2 ? ctl.isLearned(v2.id) : false;

  return (
    <li className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 rounded-lg border"
      style={{ borderColor: tint(severity.color, 0.22), background: 'rgba(12,12,18,0.6)' }}>
      <AbilityIcon ability={v2 ?? v1} path={v2Path ?? v1Path} status={learned ? 'learned' : entry.fate === 'removed' ? 'locked' : 'available'} size={36} />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className={`font-display text-[15px] tracking-wide ${entry.fate === 'removed' ? 'text-mist line-through' : 'text-ivory'}`}>{v1.name}</span>
          <span className="text-[11px] text-mist">
            {rankLabel(v1)}{v2 && entry.tierChanged && <> → <span style={{ color: severity.color }}>{rankLabel(v2)}</span></>}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <PathChip path={v1Path} muted={!!v2Path && v2Path.id !== v1Path.id} />
          {v2Path && v2Path.id !== v1Path.id && <><ArrowRight size={12} className="text-mist" /><PathChip path={v2Path} /></>}
          {!v2Path && <><ArrowRight size={12} className="text-mist" /><span className="inline-flex items-center gap-1 text-xs text-mist"><CircleSlash size={12} /> Removed</span></>}
        </div>
        <div className="mt-1.5 space-y-0.5">
          {describeEntry(entry, level).map(line => <p key={line} className="text-sm text-fog">{line}</p>)}
        </div>
      </div>
      {v2 && v2Path && (
        <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
          {learned
            ? <span className="text-[11px] font-display tracking-wide px-2 py-0.5 rounded" style={{ color: v2Path.accent, background: tint(v2Path.accent, 0.12) }}>Learned</span>
            : entry.fate === 'merged'
              ? <span className="text-[11px] text-mist">Covered by {entry.mergedWith!.path.name}</span>
              : <LearnButton ctl={ctl} ability={v2} path={v2Path} className="!py-1" />}
          <Link to={`${pagePath('v2', 'talents')}?path=${v2Path.id}`} className="inline-flex items-center gap-1 text-xs font-display text-gold hover:text-gold-bright">
            <Network size={12} /> Open {v2Path.name}
          </Link>
        </div>
      )}
    </li>
  );
};

const Section: React.FC<{
  ctl: TalentController; plan: MigrationPlan; title: string; blurb: string; severity: Severity; entries: MigrationEntry[]; collapsible?: boolean;
}> = ({ ctl, plan, title, blurb, severity, entries, collapsible }) => {
  const [open, setOpen] = useState(!collapsible);
  if (!entries.length) return null;
  const meta = SEVERITY_META[severity];
  const Icon = meta.icon;
  return (
    <section className="arcane-panel p-4 md:p-5">
      <button className="w-full flex items-center gap-3 text-left" onClick={() => setOpen(!open)} aria-expanded={open}>
        <Icon size={18} style={{ color: meta.color }} />
        <span className="flex-1">
          <span className="font-display text-lg text-ivory tracking-wide">{title}</span>
          <span className="ml-2 font-display text-sm tabular-nums" style={{ color: meta.color }}>{entries.length}</span>
          <span className="block text-sm text-mist">{blurb}</span>
        </span>
        <ChevronDown size={16} className={`text-mist transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="mt-4 space-y-2">
          {entries.map(entry => <EntryRow key={entry.v1.id} ctl={ctl} entry={entry} level={plan.level} />)}
        </ul>
      )}
    </section>
  );
};

/** Per V1 essence: which V2 paths its abilities landed in. */
const Destinations: React.FC<{ plan: MigrationPlan }> = ({ plan }) => {
  const rows = getV1System().paths
    .map(path => {
      const entries = plan.entries.filter(e => e.v1Path.id === path.id);
      const targets = new Map<string, { path: SystemPath; count: number }>();
      entries.forEach(e => {
        if (!e.v2Path) return;
        const hit = targets.get(e.v2Path.id) ?? { path: e.v2Path, count: 0 };
        targets.set(e.v2Path.id, { ...hit, count: hit.count + 1 });
      });
      return { path, total: entries.length, targets: [...targets.values()], removed: entries.filter(e => e.fate === 'removed').length };
    })
    .filter(row => row.total > 0);

  return (
    <section className="arcane-panel p-4 md:p-5">
      <h2 className="font-display text-lg text-ivory tracking-wide">Where your essences went</h2>
      <p className="text-sm text-mist mb-4">V1's nine essences became fifteen cultivation paths. Each of your essences, and where its abilities now live.</p>
      <ul className="space-y-2.5">
        {rows.map(({ path, total, targets, removed }) => (
          <li key={path.id} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="w-32 flex-shrink-0"><PathChip path={path} /></span>
            <span className="text-xs text-mist w-16">{total} learned</span>
            <ArrowRight size={12} className="text-mist" />
            {targets.map(t => (
              <span key={t.path.id} className="inline-flex items-center gap-1.5">
                <PathChip path={t.path} /><span className="text-xs text-mist tabular-nums">×{t.count}</span>
              </span>
            ))}
            {removed > 0 && <span className="inline-flex items-center gap-1 text-xs text-mist"><CircleSlash size={12} /> {removed} removed</span>}
          </li>
        ))}
      </ul>
    </section>
  );
};

/**
 * The V1 → V2 migration guide: what happened to every ability the character
 * learned in V1, and what to do about the ones that need attention.
 */
const MigrationPage: React.FC<{ ctl: TalentController }> = ({ ctl }) => {
  const { source, v1Save, plan } = currentMigration(ctl.system);
  const [confirming, setConfirming] = useState(false);

  if (!plan) {
    return (
      <div className="max-w-[1100px] mx-auto space-y-5">
        <PageHeader ctl={ctl} page="migration" />
        <div className="arcane-panel">
          <EmptyState title="No V1 character found">
            There is no V1 build saved in this browser. To bring one over, load its saved file with <span className="text-gold">Character → Load build from file</span>.
          </EmptyState>
        </div>
      </div>
    );
  }

  const counts = summarize(plan);
  const by = (fn: (e: MigrationEntry) => boolean) => plan.entries.filter(fn);
  const imported = source?.importedAt ? new Date(source.importedAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) : null;
  const stats: { severity: Severity; value: number }[] = [
    { severity: 'error', value: counts.errors },
    { severity: 'warning', value: counts.warnings },
    { severity: 'info', value: counts.info },
    { severity: 'ok', value: counts.unchanged }
  ];

  return (
    <div className="max-w-[1100px] mx-auto space-y-5">
      <PageHeader ctl={ctl} page="migration" />

      <section className="arcane-panel p-4 md:p-5">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex-1 min-w-[240px]">
            <p className="font-display text-[10px] tracking-[0.2em] uppercase text-gold">Migration guide</p>
            <h2 className="font-display text-2xl text-ivory tracking-wide">From Elemental Essences to Cultivation Paths</h2>
            <p className="text-sm text-fog mt-1">
              Your level {plan.level} V1 character with {plan.entries.length} learned abilities
              {source ? <> was carried over from {source.origin === 'file' ? 'a saved V1 file' : 'this browser'}{imported && ` on ${imported}`}.</> : ' in this browser.'}
              {' '}Everything below has already been applied to your V2 build; this page explains what changed.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-2">
          <Link to={pagePath('v2', 'talents')} className="arcane-btn arcane-btn-primary !px-3 !py-1.5 text-xs flex items-center gap-1.5">
            <Network size={13} /> View your V2 talents
          </Link>
          {v1Save && ctl.importFromV1 && (
            confirming ? (
              <div className="flex flex-col items-end gap-2">
                <p className="text-xs text-fog max-w-[260px] text-right">Replace your current V2 build with your V1 character?</p>
                <div className="flex gap-2">
                  <button className="arcane-btn arcane-btn-primary !px-3 !py-1.5 text-xs" onClick={() => { ctl.importFromV1!(); setConfirming(false); }}>Replace</button>
                  <button className="arcane-btn !px-3 !py-1.5 text-xs" onClick={() => setConfirming(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <button className="arcane-btn !px-3 !py-1.5 text-xs flex items-center gap-1.5" onClick={() => setConfirming(true)}>
                <RefreshCw size={13} /> {source ? 'Import V1 again' : 'Import V1 character'}
              </button>
            )
          )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {stats.map(({ severity, value }) => (
            <div key={severity} className="rounded-lg px-3 py-2 border" style={{ borderColor: tint(SEVERITY_META[severity].color, 0.25), background: tint(SEVERITY_META[severity].color, 0.05) }}>
              <p className="font-display text-2xl tabular-nums" style={{ color: value ? SEVERITY_META[severity].color : '#55556a' }}>{value}</p>
              <p className="text-xs text-mist">{SEVERITY_META[severity].label}</p>
            </div>
          ))}
        </div>

        {counts.overBudget > 0 && (
          <p className="mt-4 text-sm flex items-start gap-2" style={{ color: SEVERITY_META.error.color }}>
            <XOctagon size={15} className="mt-0.5 flex-shrink-0" />
            Some abilities cost more in V2: the build uses {plan.pointsSpent} points but a level {plan.level} character has {plan.pointsTotal}. Unlearn {counts.overBudget} point{counts.overBudget === 1 ? '' : 's'}' worth to get back under budget.
          </p>
        )}
        {counts.errors + counts.warnings === 0 && (
          <p className="mt-4 text-sm text-fog">Everything carried over cleanly. Nothing needs your attention.</p>
        )}
      </section>

      <Destinations plan={plan} />

      <Section ctl={ctl} plan={plan} severity="error" title="Needs attention"
        blurb="These moved somewhere their prerequisites don't hold, so they are not learned. Follow the steps to get them back."
        entries={by(e => severityOf(e) === 'error')} />
      <Section ctl={ctl} plan={plan} severity="warning" title="Removed from the game"
        blurb="No V2 path offers these any more. Their points are yours to spend."
        entries={by(e => e.fate === 'removed')} />
      <Section ctl={ctl} plan={plan} severity="warning" title="Adjusted"
        blurb="Carried over, but at a different tier or as a different kind of ability."
        entries={by(e => severityOf(e) === 'warning' && e.fate !== 'removed')} />
      <Section ctl={ctl} plan={plan} severity="info" title="Moved to a new path"
        blurb="Learned as before, just on a different path."
        entries={by(e => severityOf(e) === 'info')} />
      <Section ctl={ctl} plan={plan} severity="ok" title="Unchanged" collapsible
        blurb="Same path, same tier."
        entries={by(e => severityOf(e) === 'ok')} />
    </div>
  );
};

export default MigrationPage;
