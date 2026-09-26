import { useSearchParams } from 'react-router-dom';
import { deepestPath } from './model';
import type { SystemVersion, TalentController } from './model';

export type TalentPageId = 'talents' | 'essence' | 'sheet' | 'migration';

/** URL of a character page for a system version. The migration guide exists for V2 only. */
export const pagePath = (version: SystemVersion, page: TalentPageId) => {
  const base = version === 'v1' ? '' : '/v2';
  if (page === 'talents') return base || '/';
  return `${base}/${page === 'sheet' ? 'summary' : page}`;
};

/**
 * The path a talent tree opens on: the one named in `?path=` when another page
 * links in, else the one the character has gone furthest in, else the first.
 */
export const useInitialPath = (ctl: TalentController) => {
  const [params] = useSearchParams();
  const id = params.get('path');
  if (ctl.system.paths.some(p => p.id === id)) return id!;
  return (deepestPath(ctl) ?? ctl.system.paths[0]).id;
};
