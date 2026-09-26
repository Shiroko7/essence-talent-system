import React from 'react';
import { costOf, tint } from '../model';
import type { TalentController } from '../model';
import { AbilityIcon, AlwaysOnChips, InfoButton, PathLinkButton, PathSigil, RestButtons } from '../ui';
import { PoolSources, PoolStepper, PoolTitle } from './PoolParts';
import { TrackedPath, TrackedPool, TrackerProps, poolGrid, trackedPools } from './shared';

/** Usable points, then striped points held by passives and cantrips. */
const PoolBar: React.FC<{ tracked: TrackedPool }> = ({ tracked: { pool, status } }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: status.max }).map((_, i) => (
      <span key={i} className="h-2 flex-1 rounded-full transition-colors"
        style={{ background: i < status.current ? pool.accent : 'rgba(106,106,122,0.3)' }} />
    ))}
    {Array.from({ length: status.reserved }).map((_, i) => (
      <span key={`r${i}`} className="h-2 flex-1 rounded-full" title="Held by passives and cantrips"
        style={{ background: 'repeating-linear-gradient(-45deg, rgba(255,107,74,0.15) 0 2px, rgba(255,107,74,0.45) 2px 4px)' }} />
    ))}
  </div>
);

/** One path's learned abilities; every action spends from the pool the path shares. */
const PathActions: React.FC<{ ctl: TalentController; tracked: TrackedPath; current: number; titled: boolean } & Pick<TrackerProps, 'onOpenPath' | 'onInfo'>> = ({
  ctl, tracked: { path, actions, constant }, current, titled, onOpenPath, onInfo
}) => (
  <div className="min-w-0">
    {titled && (
      <div className="flex items-center gap-2 mb-2">
        <PathSigil path={path} size={22} active />
        <span className="flex-1 min-w-0 font-display text-sm truncate" style={{ color: path.accent }}>{path.name}</span>
        <PathLinkButton path={path} onOpenPath={onOpenPath} compact />
      </div>
    )}
    <div className="space-y-1.5">
      {actions.map(a => {
        const cost = costOf(a);
        return (
          <div key={a.id} className="flex items-center gap-1">
            <button
              onClick={() => ctl.spend(a, path.id)}
              disabled={current < cost}
              className="flex-1 min-w-0 flex items-center gap-2.5 rounded-md border px-2 py-1.5 text-left transition-all hover:-translate-y-px disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{ borderColor: tint(path.accent, 0.3), background: 'rgba(10,10,15,0.6)' }}
              title={`Spend ${cost} ${ctl.poolOf(path.id).label} essence`}
            >
              <AbilityIcon ability={a} path={path} status="learned" size={26} />
              <span className="flex-1 text-sm text-parchment truncate">{a.name}</span>
              <span className="font-display text-sm tabular-nums" style={{ color: path.accent }}>−{cost}</span>
            </button>
            <InfoButton ability={a} onInfo={onInfo} />
          </div>
        );
      })}
    </div>
    <AlwaysOnChips abilities={constant} path={path} onInfo={onInfo} className="mt-2" />
  </div>
);

const PoolCard: React.FC<{ ctl: TalentController; tracked: TrackedPool } & Pick<TrackerProps, 'onOpenPath' | 'onInfo'>> = ({
  ctl, tracked, onOpenPath, onInfo
}) => {
  const { pool, status, shared, paths } = tracked;
  const single = paths[0].path;
  return (
    <section
      className="rounded-xl border p-3 md:p-4 min-w-0 flex flex-col md:grid md:grid-rows-subgrid md:row-span-4 md:mb-4"
      style={{
        borderColor: tint(pool.accent, 0.3),
        background: `linear-gradient(180deg, ${tint(pool.accent, 0.07)}, rgba(10,10,15,0.4) 120px)`
      }}
    >
      <header className="flex items-center gap-3 min-h-10">
        {shared ? (
          <div className="flex-1 min-w-0"><PoolTitle pool={pool} resourceName={ctl.system.resourceName} /></div>
        ) : (
          <>
            <PathSigil path={single} size={28} active />
            <span className="flex-1 min-w-0 font-display text-sm truncate" style={{ color: single.accent }}>{single.name}</span>
            <PathLinkButton path={single} onOpenPath={onOpenPath} compact />
          </>
        )}
        <PoolStepper ctl={ctl} tracked={tracked} size="lg" />
      </header>
      <div className="mt-2"><PoolBar tracked={tracked} /></div>
      {/* Always rendered so the rows below stay aligned with the other pools */}
      <div className="mt-1.5 min-h-4"><PoolSources tracked={tracked} /></div>
      <div className="mt-4 grid gap-x-4 gap-y-5 content-start grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {paths.map(t => (
          <PathActions key={t.path.id} ctl={ctl} tracked={t} current={status.current} titled={shared} onOpenPath={onOpenPath} onInfo={onInfo} />
        ))}
      </div>
    </section>
  );
};

/**
 * Cast — action first. One card per essence pool: a family's pool is shared by
 * all its paths, and every learned ability is a button that spends its cost.
 */
const CastTracker: React.FC<TrackerProps> = ({ ctl, onOpenPath, onInfo }) => {
  const pools = trackedPools(ctl);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-mist flex-1 min-w-[240px]">
          Tap an ability to spend its cost · ± adjusts a pool by one · ⓘ reads an ability
          {ctl.system.sharedPools && ' · every path in a family draws on the same pool'}
        </p>
        <RestButtons ctl={ctl} compact />
      </div>
      <div {...poolGrid(pools.length)}>
        {pools.map(t => <PoolCard key={t.pool.id} ctl={ctl} tracked={t} onOpenPath={onOpenPath} onInfo={onInfo} />)}
      </div>
    </div>
  );
};

export default CastTracker;
