import React, { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Network, ScrollText } from 'lucide-react';
import type { TalentController } from '../model';
import { TalentPageId, pagePath } from '../routes';
import { BudgetMeter, CharacterMenu, LevelStepper } from '../ui';
import { DESIGNS, useDesignContext } from '../design';

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

/**
 * A quiet icon toggle between the Classic and Constellation talent designs.
 * Alt+0 / Alt+1 switch too.
 */
const DesignToggle: React.FC = () => {
  const ctx = useDesignContext();
  const setDesign = ctx?.setDesign;

  useEffect(() => {
    if (!setDesign) return;
    const onKey = (e: KeyboardEvent) => {
      const index = Number(e.key);
      if (e.altKey && Number.isInteger(index) && DESIGNS[index]) {
        e.preventDefault();
        setDesign(DESIGNS[index].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setDesign]);

  if (!ctx) return null;
  return (
    <div className="inline-flex items-center gap-0.5 rounded-md p-0.5" role="group" aria-label="Talent layout">
      {DESIGNS.map(({ id, label, icon: Icon, blurb }, i) => {
        const active = ctx.design === id;
        return (
          <button
            key={id}
            onClick={() => ctx.setDesign(id)}
            aria-pressed={active}
            title={`${label}: ${blurb} (Alt+${i})`}
            className={`p-1.5 rounded transition-colors ${active ? 'text-gold bg-gold/10' : 'text-mist/70 hover:text-parchment'}`}
          >
            <Icon size={15} />
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

/** Level, points and the Character menu pinned to the bottom of the screen. */
const CharacterDock: React.FC<{ ctl: TalentController; actions?: ReactNode; aboveSwitcher: boolean }> = ({ ctl, actions, aboveSwitcher }) => (
  <div className={`fixed ${aboveSwitcher ? 'bottom-11' : 'bottom-0'} inset-x-0 z-40 border-t border-gold-subtle bg-obsidian/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.4)]`}>
    <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center gap-4 sm:gap-6">
      <LevelStepper ctl={ctl} />
      <BudgetMeter ctl={ctl} className="hidden sm:block w-72" />
      <span className="sm:hidden font-display text-sm text-gold tabular-nums whitespace-nowrap">{ctl.pointsLeft}<span className="text-mist text-xs"> pts left</span></span>
      <div className="ml-auto flex items-center gap-2">
        {actions}
        <CharacterMenu ctl={ctl} direction="up" />
      </div>
    </div>
  </div>
);

/**
 * The page header: the system name and page tabs, with level, points and the
 * Character menu docked to the bottom of the screen. The Talents page also
 * gets the layout toggle at the end of the row.
 */
export const PageHeader: React.FC<{
  ctl: TalentController; page: TalentPageId; actions?: ReactNode;
  /** The Essence page keeps the tracker switcher bar at the very bottom. */
  aboveSwitcher?: boolean;
}> = ({ ctl, page, actions, aboveSwitcher = false }) => (
  <>
    <header className="flex flex-wrap items-end gap-x-4 border-b border-gold-subtle">
      <h1 className="font-display text-xl text-ivory tracking-wide pb-2.5 mr-2">{ctl.system.name}</h1>
      <PageTabs ctl={ctl} page={page} />
      {page === 'talents' && <div className="ml-auto pb-1.5"><DesignToggle /></div>}
    </header>
    <CharacterDock ctl={ctl} actions={actions} aboveSwitcher={aboveSwitcher} />
  </>
);
