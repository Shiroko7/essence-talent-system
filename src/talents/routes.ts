import { useSearchParams } from 'react-router-dom';
import type { SystemVersion, TalentSystem } from './model';

export type TalentPageId = 'talents' | 'essence' | 'sheet';

/** URL of one of the three pages for a system version. */
export const pagePath = (version: SystemVersion, page: TalentPageId) => {
  const base = version === 'v1' ? '' : '/v2';
  return page === 'talents' ? base || '/' : `${base}/${page}`;
};

/** The path named in `?path=`, when the Essence or Sheet page links into a tree. */
export const useInitialPath = (system: TalentSystem) => {
  const [params] = useSearchParams();
  const id = params.get('path');
  return system.paths.some(p => p.id === id) ? id : system.paths[0].id;
};
