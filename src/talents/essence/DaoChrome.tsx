import React from 'react';
import { Bean, Cherry, Leaf, Mars, Sprout, TreeDeciduous, Venus } from 'lucide-react';
import { Ability } from '../../types/essence';
import { tint } from '../model';
import { AbilityIcon } from '../ui';
import { TrackedPath } from './shared';
import { DAO_STAGES, Figure, stageInfo } from './dao';

/* ---------------------------------------------------------- stage chrome */

const STAGE_ICONS = [Bean, Sprout, Leaf, Cherry, TreeDeciduous];

export const StageIcon: React.FC<{ level: number; size?: number; className?: string; style?: React.CSSProperties }> = ({ level, size = 14, className, style }) => {
  const Icon = STAGE_ICONS[Math.max(1, Math.min(5, level)) - 1];
  return <Icon size={size} className={className} style={style} />;
};

/** A path's growth stage, e.g. "Roots", in its accent colour. */
export const StageBadge: React.FC<{ level: number; accent: string }> = ({ level, accent }) => (
  level > 0 ? (
    <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-display tracking-wide whitespace-nowrap"
      style={{ color: accent, background: tint(accent, 0.1), border: `1px solid ${tint(accent, 0.3)}` }}
      title={`${stageInfo(level).tier}: ${stageInfo(level).summary}`}>
      <StageIcon level={level} size={10} /> {stageInfo(level).name}
    </span>
  ) : null
);

/** The five stages of the Tree, with the reached ones lit. */
export const RealmLadder: React.FC<{ stage: number; compact?: boolean }> = ({ stage, compact }) => (
  <ol className="flex items-center gap-1">
    {DAO_STAGES.map((s, i) => {
      const reached = s.level <= stage;
      const current = s.level === stage;
      return (
        <li key={s.level} className="flex items-center gap-1">
          {i > 0 && <span className={`h-px ${compact ? 'w-2' : 'w-3'} ${reached ? 'bg-gold/70' : 'bg-ash'}`} />}
          <span
            className={`flex items-center justify-center rounded-full border transition-all ${compact ? 'w-6 h-6' : 'w-8 h-8'} ${
              current ? 'border-gold bg-gold/20 text-ivory shadow-[0_0_12px_rgba(201,169,89,0.5)]' : reached ? 'border-gold/50 text-gold' : 'border-ash text-ash'
            }`}
            title={`${s.tier} — ${s.name}: ${s.summary}`}
          >
            <StageIcon level={s.level} size={compact ? 12 : 15} />
          </span>
        </li>
      );
    })}
  </ol>
);

export const FigureToggle: React.FC<{ figure: Figure; onChange: (f: Figure) => void; tone?: 'dark' | 'paper' }> = ({ figure, onChange, tone = 'dark' }) => (
  <div className={`inline-flex flex-shrink-0 rounded border overflow-hidden ${tone === 'paper' ? 'border-[#2b2118]/30' : 'border-gold-subtle'}`} role="group" aria-label="Body shape">
    {([['masculine', Mars], ['feminine', Venus]] as const).map(([id, Icon]) => (
      <button key={id} onClick={() => onChange(id)} aria-pressed={figure === id} title={`${id[0].toUpperCase()}${id.slice(1)} figure`}
        className={`px-2 py-1 transition-colors ${
          tone === 'paper'
            ? figure === id ? 'bg-[#2b2118] text-[#f6eedb]' : 'text-[#2b2118]/60 hover:text-[#2b2118]'
            : figure === id ? 'bg-gold/20 text-gold' : 'text-mist hover:text-parchment'
        }`}>
        <Icon size={13} />
      </button>
    ))}
  </div>
);

/** Realm title for the whole body: tier, stage name and what it means. */
export const RealmTitle: React.FC<{ stage: number }> = ({ stage }) => (
  stage > 0 ? (
    <div>
      <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gold/80">{stageInfo(stage).tier} realm</p>
      <p className="font-display text-lg text-ivory leading-tight">{stageInfo(stage).name}</p>
      <p className="text-xs text-mist leading-snug mt-0.5">{stageInfo(stage).summary}</p>
    </div>
  ) : (
    <p className="font-display text-sm text-fog">No Dao seed yet</p>
  )
);

/** Every always-on ability across paths: what the Tree does to you, all the time. */
export const Manifestations: React.FC<{ paths: TrackedPath[]; onInfo?: (a: Ability) => void; onHover?: (id: string | null) => void }> = ({ paths, onInfo, onHover }) => {
  const all = paths.flatMap(t => t.constant.map(a => ({ a, t })));
  if (!all.length) return null;
  const held = paths.reduce((n, t) => n + t.pool.reserved, 0);
  return (
    <div>
      <p className="flex items-baseline justify-between font-display text-[10px] tracking-[0.2em] uppercase text-mist mb-1.5">
        <span>Manifestations</span>
        <span className="tracking-normal normal-case text-[11px]">holding <span className="text-essence-fire">{held}</span> essence</span>
      </p>
      <ul className="space-y-1">
        {all.map(({ a, t }) => (
          <li key={a.id}>
            <button onClick={() => onInfo?.(a)} onMouseEnter={() => onHover?.(t.path.id)} onMouseLeave={() => onHover?.(null)}
              className="w-full flex items-center gap-2 rounded px-1 py-0.5 text-left hover:bg-charcoal/60" title={`Read ${a.name}`}>
              <AbilityIcon ability={a} path={t.path} status="learned" size={20} />
              <span className="flex-1 min-w-0 text-[13px] text-parchment truncate">{a.name}</span>
              <span className="text-[10px] font-display" style={{ color: t.path.accent }}>{t.path.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
