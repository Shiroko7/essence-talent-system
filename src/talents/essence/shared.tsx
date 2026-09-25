import { Ability } from '../../types/essence';
import { PoolStatus, SystemGroup, SystemPath, TalentController, pathsByGroup, reservesEssence, sortAbilities } from '../model';

export interface TrackerProps {
  ctl: TalentController;
  /** Jump to a path's talent tree, when the host layout supports it. */
  onOpenPath?: (pathId: string) => void;
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

/** Set a pool to an exact value (the controller clamps it to 0..max). */
export const setPool = (ctl: TalentController, pathId: string, value: number) =>
  ctl.adjustPool(pathId, value - ctl.pool(pathId).current);

export const refillPath = (ctl: TalentController, pathId: string) => {
  const { current, max } = ctl.pool(pathId);
  ctl.adjustPool(pathId, max - current);
};

export const refillGroup = (ctl: TalentController, group: TrackedGroup) =>
  group.paths.forEach(t => refillPath(ctl, t.path.id));
