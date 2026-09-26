import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import type { TalentController } from '../model';
import { tint } from '../model';
import { pagePath } from '../routes';
import { SEVERITY_META, currentMigration, summarize, writeMigrationSource } from '../migration';

/** After a V1 character is carried into V2: what needs attention, and a way into the guide. */
const MigrationBanner: React.FC<{ ctl: TalentController }> = ({ ctl }) => {
  const [hidden, setHidden] = useState(false);
  const { source, plan } = currentMigration(ctl.system);
  if (hidden || !source || source.dismissed || !plan) return null;

  const { errors, warnings, overBudget } = summarize(plan);
  const color = errors || overBudget ? SEVERITY_META.error.color : warnings ? SEVERITY_META.warning.color : SEVERITY_META.info.color;
  const parts = [
    errors && `${errors} need${errors === 1 ? 's' : ''} attention`,
    warnings && `${warnings} changed or removed`,
    overBudget && `${overBudget} point${overBudget === 1 ? '' : 's'} over budget`
  ].filter(Boolean);

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm"
      style={{ borderColor: tint(color, 0.35), background: tint(color, 0.07) }}>
      <p className="flex-1 text-fog">
        <span className="text-parchment">Your V1 character was carried over to V2.</span>{' '}
        {parts.length ? <span style={{ color }}>{parts.join(' · ')}.</span> : 'Everything came across cleanly.'}
      </p>
      <Link to={pagePath('v2', 'migration')} className="inline-flex items-center gap-1 font-display text-xs text-gold hover:text-gold-bright whitespace-nowrap">
        Migration guide <ArrowRight size={12} />
      </Link>
      <button
        onClick={() => { writeMigrationSource({ ...source, dismissed: true }); setHidden(true); }}
        className="text-mist hover:text-parchment" aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default MigrationBanner;
