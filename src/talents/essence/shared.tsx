import { Ability } from '../../types/essence';
import { PoolStatus, SystemGroup, SystemPath, TalentController, pathsByGroup, reservesEssence, sortAbilities } from '../model';

export interface TrackerProps {
  ctl: TalentController;
  /** Jump to a path's talent tree, when the host layout supports it. */
  onOpenPath?: (pathId: string) => void;
  /** Open an ability's full details. */
  onInfo?: (ability: Ability) => void;
}

export interface TrackedPath {
  path: SystemPath;
  pool: PoolStatus;
  /** Learned actives and spells: these spend from the pool. */
  actions: Ability[];
  /** Learned passives and cantrips: these hold essence permanently. */
  constant: Ability[];
}

export interface TrackedGroup {
  group: SystemGroup;
  paths: TrackedPath[];
  current: number;
  max: number;
}

/** Every learned path with its pool and abilities, grouped by tradition. */
export const trackerGroups = (ctl: TalentController): TrackedGroup[] =>
  pathsByGroup(ctl.system, ctl.learnedPaths).map(({ group, paths }) => {
    const tracked = paths.map(path => {
      const learned = sortAbilities((ctl.system.abilitiesByPath[path.id] || []).filter(a => ctl.isLearned(a.id)));
      return {
        path,
        pool: ctl.pool(path.id),
        actions: learned.filter(a => !reservesEssence(a)),
        constant: learned.filter(a => reservesEssence(a))
      };
    });
    return {
      group,
      paths: tracked,
      current: tracked.reduce((n, t) => n + t.pool.current, 0),
      max: tracked.reduce((n, t) => n + t.pool.max, 0)
    };
  });

export const refillPath = (ctl: TalentController, pathId: string) => {
  const { current, max } = ctl.pool(pathId);
  ctl.adjustPool(pathId, max - current);
};
