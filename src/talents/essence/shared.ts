import type React from 'react';
import { Ability } from '../../types/essence';
import { EssencePool, PoolStatus, SystemPath, TalentController, reservesEssence, sortAbilities } from '../model';

export interface TrackerProps {
  ctl: TalentController;
  /** Jump to a path's talent tree, when the host layout supports it. */
  onOpenPath?: (pathId: string) => void;
  /** Open an ability's full details. */
  onInfo?: (ability: Ability) => void;
}

export interface TrackedPath {
  path: SystemPath;
  /** Learned actives and spells: these spend from the pool. */
  actions: Ability[];
  /** Learned passives and cantrips: these hold essence permanently. */
  constant: Ability[];
}

export interface TrackedPool {
  pool: EssencePool;
  status: PoolStatus;
  /** A family pool spans several paths; a V1 pool is a single path. */
  shared: boolean;
  /** Learned paths drawing on the pool, with their abilities. */
  paths: TrackedPath[];
}

/** Every pool with something learned, each with its learned paths and abilities. */
export const trackedPools = (ctl: TalentController): TrackedPool[] =>
  ctl.pools.map(pool => ({
    pool,
    status: ctl.pool(pool.id),
    shared: pool.paths.length > 1,
    paths: pool.paths
      .filter(path => ctl.learnedPaths.some(p => p.id === path.id))
      .map(path => {
        const learned = sortAbilities((ctl.system.abilitiesByPath[path.id] || []).filter(a => ctl.isLearned(a.id)));
        return {
          path,
          actions: learned.filter(a => !reservesEssence(a)),
          constant: learned.filter(a => reservesEssence(a))
        };
      })
  }));

export const refillPool = (ctl: TalentController, poolId: string) => {
  const { current, max } = ctl.pool(poolId);
  ctl.adjustPool(poolId, max - current);
};

/**
 * Pools sit side by side in equal shares of the width — one pool takes it all,
 * two split it in half, three in thirds — however many paths each holds.
 * Each pool spans `rows` rows of a shared subgrid, so its header, gauge and
 * ability lists line up with its neighbours'.
 */
export const poolGrid = (count: number): { className: string; style: React.CSSProperties } => ({
  className: 'grid gap-4 md:gap-y-0 md:[grid-template-columns:repeat(var(--pools),minmax(0,1fr))]',
  style: { '--pools': Math.min(3, Math.max(1, count)) } as React.CSSProperties
});
