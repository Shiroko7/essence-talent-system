import { useEffect, useState } from 'react';
import { TIER_IDS, TalentController, tierOf } from '../model';

/**
 * The Dao Tree: cultivation as a metaphysical tree grown inside the body.
 * Each tier reached grows the next part of it.
 */
export interface DaoStage {
  /** 1 = Initiate … 5 = Great Grandmaster. */
  level: number;
  tier: string;
  name: string;
  summary: string;
}

export const DAO_STAGES: DaoStage[] = [
  { level: 1, tier: 'Initiate', name: 'Dao Seed', summary: 'A seed of essence condenses in the lower dantian.' },
  { level: 2, tier: 'Adept', name: 'Roots', summary: 'Roots open through the meridians and anchor you to the world.' },
  { level: 3, tier: 'Master', name: 'Trunk & Leaves', summary: 'The trunk rises along the spine and leaves unfurl through the limbs.' },
  { level: 4, tier: 'Grandmaster', name: 'Fruits', summary: 'Your branches bear fruit: power ripened into mastery.' },
  { level: 5, tier: 'Great Grandmaster', name: 'World Tree', summary: 'The Tree is whole; its crown breaks past the body.' }
];

export const stageInfo = (level: number) => DAO_STAGES[Math.max(1, Math.min(5, level)) - 1];

/** Highest tier learned in a path, as a stage level (0 when nothing is learned). */
export const pathStage = (ctl: TalentController, pathId: string) =>
  (ctl.system.abilitiesByPath[pathId] || [])
    .filter(a => ctl.isLearned(a.id))
    .reduce((best, a) => Math.max(best, TIER_IDS.indexOf(tierOf(a)) + 1), 0);

/** How many learned abilities in a path sit at Grandmaster or above: the tree's fruits. */
export const fruitCount = (ctl: TalentController, pathId: string) =>
  (ctl.system.abilitiesByPath[pathId] || [])
    .filter(a => ctl.isLearned(a.id) && TIER_IDS.indexOf(tierOf(a)) >= 3).length;

export const bodyStage = (ctl: TalentController) =>
  ctl.learnedPaths.reduce((best, p) => Math.max(best, pathStage(ctl, p.id)), 0);

/* -------------------------------------------------------------- figure */

export type Figure = 'masculine' | 'feminine';

const FIGURE_KEY = 'talent-dao-figure';

export const useFigure = () => {
  const [figure, setFigure] = useState<Figure>(() => {
    try { return localStorage.getItem(FIGURE_KEY) === 'feminine' ? 'feminine' : 'masculine'; } catch { return 'masculine'; }
  });
  useEffect(() => {
    try { localStorage.setItem(FIGURE_KEY, figure); } catch { /* storage unavailable */ }
  }, [figure]);
  return [figure, setFigure] as const;
};
