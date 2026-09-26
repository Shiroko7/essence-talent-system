import React, { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightLeft, Gauge, Network, ScrollText } from 'lucide-react';
import type { TalentController } from '../model';
import { TalentPageId, pagePath } from '../routes';
import { BudgetMeter, CharacterMenu, LevelStepper } from '../ui';
import { DESIGNS, useDesignContext } from '../design';
import { ESSENCE_VARIANTS, useEssenceVariantControl } from '../essence/variant';
import MigrationBanner from './MigrationBanner';
import { moveV1ToV2 } from '../migration';

const TABS: { id: TalentPageId; label: string; short: string; icon: typeof Network }[] = [
  { id: 'talents', label: 'Talents', short: 'Talents', icon: Network },
  { id: 'essence', label: 'Essence', short: 'Essence', icon: Gauge },
  { id: 'sheet', label: 'Summary', short: 'Summary', icon: ScrollText }
];

/** The three pages of a character as an underlined tab strip. */
const PageTabs: React.FC<{ ctl: TalentController; page: TalentPageId }> = ({ ctl, page }) => (
  <nav className="flex -mb-px overflow-x-auto" aria-label="Character pages">
    {TABS.map(({ id, label, short, icon: Icon }) => (
      <Link
        key={id}
        to={pagePath(ctl.system.version, id)}
        aria-current={page === id ? 'page' : undefined}
        className={`flex items-center gap-2 px-3 py-2.5 border-b-2 font-display text-sm tracking-wide whitespace-nowrap transition-colors ${
          page === id ? 'border-gold text-gold-bright' : 'border-transparent text-fog hover:text-parchment hover:border-gold/30'
        }`}
      >
        <Icon size={15} /> <span className="sm:hidden">{short}</span><span className="hidden sm:inline">{label}</span>
      </Link>
    ))}
  </nav>
);

interface ToggleOption<T extends string> {
  id: T;
  label: string;
  blurb: string;
  icon: typeof Network;
}

/** A quiet icon toggle between views of the same page. Alt+0, Alt+1… switch too. */
const ViewToggle = <T extends string>({ options, value, onChange, label }: {
  options: readonly ToggleOption<T>[]; value: T; onChange: (id: T) => void; label: string;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const index = Number(e.key);
      if (e.altKey && Number.isInteger(index) && options[index]) {
        e.preventDefault();
        onChange(options[index].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [options, onChange]);

  return (
    <div className="inline-flex items-center gap-0.5 rounded-md p-0.5" role="group" aria-label={label}>
      {options.map(({ id, label: name, icon: Icon, blurb }, i) => {
        const active = value === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            aria-pressed={active}
            title={`${name}: ${blurb} (Alt+${i})`}
            className={`p-1.5 rounded transition-colors ${active ? 'text-gold bg-gold/10' : 'text-mist/70 hover:text-parchment'}`}
          >
            <Icon size={15} />
            <span className="sr-only">{name}</span>
          </button>
        );
      })}
    </div>
  );
};

/** Classic or Constellation, on the Talents page. */
const DesignToggle: React.FC = () => {
  const ctx = useDesignContext();
  if (!ctx) return null;
  return <ViewToggle label="Talent layout" options={DESIGNS} value={ctx.design as typeof DESIGNS[number]['id']} onChange={ctx.setDesign} />;
};

/** Cast or Rings, on the Essence page. */
const EssenceToggle: React.FC = () => {
  const ctx = useEssenceVariantControl();
  if (!ctx) return null;
  return <ViewToggle label="Essence tracker" options={ESSENCE_VARIANTS} value={ctx.variant} onChange={ctx.setVariant} />;
};

/** V1 only: carry this character into V2, overwriting the V2 build, and open it there. */
const MoveToV2Button: React.FC<{ ctl: TalentController }> = ({ ctl }) => {
  const navigate = useNavigate();
  const move = () => {
    if (!window.confirm('Move this character to V2? Your current V2 build will be overwritten (a backup is kept).')) return;
    try {
      moveV1ToV2({ level: ctl.level, selectedAbilities: ctl.selectedIds });
      navigate(pagePath('v2', 'talents'));
    } catch (error) {
      console.error('Error moving the V1 character to V2:', error);
      window.alert('Could not save to V2 in this browser.');
    }
  };
  return (
    <button onClick={move} disabled={!ctl.selectedIds.length}
      className="arcane-btn arcane-btn-primary !px-3 !py-1.5 text-xs flex items-center gap-1.5 disabled:opacity-40">
      <ArrowRightLeft size={13} /> Move to V2
    </button>
  );
};

/** Level, points and the Character menu pinned to the bottom of the screen. */
const CharacterDock: React.FC<{ ctl: TalentController; actions?: ReactNode }> = ({ ctl, actions }) => (
  <div className={`fixed bottom-0 inset-x-0 z-40 border-t border-gold-subtle bg-obsidian/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.4)]`}>
    <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center gap-4 sm:gap-6">
      <LevelStepper ctl={ctl} />
      <BudgetMeter ctl={ctl} className="hidden sm:block w-72" />
      <span className="sm:hidden font-display text-sm text-gold tabular-nums whitespace-nowrap">{ctl.pointsLeft}<span className="text-mist text-xs"> pts left</span></span>
      <div className="ml-auto flex items-center gap-2">
        {actions}
        {ctl.system.version === 'v1' && <MoveToV2Button ctl={ctl} />}
        <CharacterMenu ctl={ctl} direction="up" />
      </div>
    </div>
  </div>
);

/**
 * The page header: the system name and page tabs, with level, points and the
 * Character menu docked to the bottom of the screen. The Talents and Essence
 * pages also get a view toggle at the end of the row.
 */
export const PageHeader: React.FC<{ ctl: TalentController; page: TalentPageId; actions?: ReactNode }> = ({ ctl, page, actions }) => (
  <>
    <header className="flex flex-wrap items-end gap-x-4 border-b border-gold-subtle">
      <h1 className="font-display text-xl text-ivory tracking-wide pb-2.5 mr-2">{ctl.system.name}</h1>
      <PageTabs ctl={ctl} page={page} />
      {page === 'talents' && <div className="ml-auto pb-1.5"><DesignToggle /></div>}
      {page === 'essence' && <div className="ml-auto pb-1.5"><EssenceToggle /></div>}
    </header>
    {ctl.system.version === 'v2' && page !== 'migration' && <MigrationBanner ctl={ctl} />}
    <CharacterDock ctl={ctl} actions={actions} />
  </>
);
