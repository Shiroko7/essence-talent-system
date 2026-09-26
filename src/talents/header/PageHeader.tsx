import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Network, ScrollText } from 'lucide-react';
import type { TalentController } from '../model';
import { TalentPageId, pagePath } from '../routes';
import { BudgetMeter, CharacterMenu, LevelStepper, VersionSwitch } from '../ui';
import { useHeaderVariant } from './variant';

const TABS: { id: TalentPageId; label: string; short: string; icon: typeof Network }[] = [
  { id: 'talents', label: 'Talents', short: 'Talents', icon: Network },
  { id: 'essence', label: 'Essence', short: 'Essence', icon: Gauge },
  { id: 'sheet', label: 'Character sheet', short: 'Sheet', icon: ScrollText }
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

const Title: React.FC<{ ctl: TalentController }> = ({ ctl }) => (
  <h1 className="font-display text-xl text-ivory tracking-wide pb-2.5 mr-2">{ctl.system.name}</h1>
);

/** Level, points and the Character menu pinned to the bottom of the screen. */
const CharacterDock: React.FC<{ ctl: TalentController; page: TalentPageId; actions?: ReactNode }> = ({ ctl, page, actions }) => (
  <div className="fixed bottom-11 inset-x-0 z-40 border-t border-gold-subtle bg-obsidian/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
    <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center gap-4 sm:gap-6">
      <LevelStepper ctl={ctl} />
      <BudgetMeter ctl={ctl} className="hidden sm:block w-72" />
      <span className="sm:hidden font-display text-sm text-gold tabular-nums whitespace-nowrap">{ctl.pointsLeft}<span className="text-mist text-xs"> pts left</span></span>
      <div className="ml-auto flex items-center gap-2">
        {actions}
        <span className="hidden md:block"><VersionSwitch current={ctl.system.version} page={page} /></span>
        <CharacterMenu ctl={ctl} direction="up" />
      </div>
    </div>
  </div>
);

/**
 * The page header, in whichever of the three compared shapes is selected:
 * - tiers: navigation on one row, the character bar on a second row
 * - card:  navigation only; the page shows a CharacterCard in its own layout
 * - dock:  navigation only; the character bar is pinned to the bottom
 */
export const PageHeader: React.FC<{ ctl: TalentController; page: TalentPageId; actions?: ReactNode }> = ({ ctl, page, actions }) => {
  const variant = useHeaderVariant();

  if (variant === 'tiers') {
    return (
      <header className="arcane-panel">
        <div className="flex flex-wrap items-end gap-x-4 px-4 pt-3 border-b border-gold-subtle">
          <Title ctl={ctl} />
          <PageTabs ctl={ctl} page={page} />
          <div className="ml-auto pb-2"><VersionSwitch current={ctl.system.version} page={page} /></div>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
          <LevelStepper ctl={ctl} />
          <BudgetMeter ctl={ctl} className="flex-1 max-w-md" />
          <div className="ml-auto flex items-center gap-2">
            {actions}
            <CharacterMenu ctl={ctl} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="flex flex-wrap items-end gap-x-4 border-b border-gold-subtle">
        <Title ctl={ctl} />
        <PageTabs ctl={ctl} page={page} />
        {variant === 'card' && <div className="ml-auto pb-2"><VersionSwitch current={ctl.system.version} page={page} /></div>}
      </header>
      {variant === 'dock' && <CharacterDock ctl={ctl} page={page} actions={actions} />}
    </>
  );
};

/**
 * Level, points and the Character menu as a card inside the page. Only shown
 * with the 'card' header; the other headers carry these themselves.
 */
export const CharacterCard: React.FC<{
  ctl: TalentController; actions?: ReactNode; layout?: 'column' | 'row'; className?: string;
}> = ({ ctl, actions, layout = 'column', className = '' }) => {
  if (useHeaderVariant() !== 'card') return null;
  if (layout === 'row') {
    return (
      <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
        <LevelStepper ctl={ctl} />
        <BudgetMeter ctl={ctl} className="flex-1 max-w-md" />
        <div className="ml-auto flex items-center gap-2">
          {actions}
          <CharacterMenu ctl={ctl} />
        </div>
      </div>
    );
  }
  return (
    <div className={`space-y-3 ${className}`}>
      <LevelStepper ctl={ctl} />
      <BudgetMeter ctl={ctl} className="w-full" />
      <div className="flex flex-wrap gap-2">
        {actions}
        <CharacterMenu ctl={ctl} align="left" />
      </div>
    </div>
  );
};
