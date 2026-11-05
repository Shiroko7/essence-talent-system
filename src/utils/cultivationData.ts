import { alchemyAbilities as v2_alchemyAbilities, alchemyCantrips as v2_alchemyCantrips, alchemySpells as v2_alchemySpells, alchemyFacets as v2_alchemyFacets } from '../components/cultivation/consts/v2/alchemy';
import { cryptAbilities as v2_cryptAbilities, cryptCantrips as v2_cryptCantrips, cryptSpells as v2_cryptSpells, cryptFacets as v2_cryptFacets } from '../components/cultivation/consts/v2/crypt';
import { earthAbilities as v2_earthAbilities, earthCantrips as v2_earthCantrips, earthSpells as v2_earthSpells, earthFacets as v2_earthFacets } from '../components/cultivation/consts/v2/earth';
import { fireAbilities as v2_fireAbilities, fireCantrips as v2_fireCantrips, fireSpells as v2_fireSpells, fireFacets as v2_fireFacets } from '../components/cultivation/consts/v2/fire';
import { heartAbilities as v2_heartAbilities, heartCantrips as v2_heartCantrips, heartSpells as v2_heartSpells, heartFacets as v2_heartFacets } from '../components/cultivation/consts/v2/heart';
import { loveAbilities as v2_loveAbilities, loveCantrips as v2_loveCantrips, loveSpells as v2_loveSpells, loveFacets as v2_loveFacets } from '../components/cultivation/consts/v2/love';
import { lunarAbilities as v2_lunarAbilities, lunarCantrips as v2_lunarCantrips, lunarSpells as v2_lunarSpells, lunarFacets as v2_lunarFacets } from '../components/cultivation/consts/v2/lunar';
import { metalAbilities as v2_metalAbilities, metalCantrips as v2_metalCantrips, metalSpells as v2_metalSpells, metalFacets as v2_metalFacets } from '../components/cultivation/consts/v2/metal';
import { mysteriesAbilities as v2_mysteriesAbilities, mysteriesCantrips as v2_mysteriesCantrips, mysteriesSpells as v2_mysteriesSpells, mysteriesFacets as v2_mysteriesFacets } from '../components/cultivation/consts/v2/mysteries';
import { navigationAbilities as v2_navigationAbilities, navigationCantrips as v2_navigationCantrips, navigationSpells as v2_navigationSpells, navigationFacets as v2_navigationFacets } from '../components/cultivation/consts/v2/navigation';
import { pestilenceAbilities as v2_pestilenceAbilities, pestilenceCantrips as v2_pestilenceCantrips, pestilenceSpells as v2_pestilenceSpells, pestilenceFacets as v2_pestilenceFacets } from '../components/cultivation/consts/v2/pestilence';
import { providenceAbilities as v2_providenceAbilities, providenceCantrips as v2_providenceCantrips, providenceSpells as v2_providenceSpells, providenceFacets as v2_providenceFacets } from '../components/cultivation/consts/v2/providence';
import { ruinAbilities as v2_ruinAbilities, ruinCantrips as v2_ruinCantrips, ruinSpells as v2_ruinSpells, ruinFacets as v2_ruinFacets } from '../components/cultivation/consts/v2/ruin';
import { shadowAbilities as v2_shadowAbilities, shadowCantrips as v2_shadowCantrips, shadowSpells as v2_shadowSpells, shadowFacets as v2_shadowFacets } from '../components/cultivation/consts/v2/shadow';
import { skyAbilities as v2_skyAbilities, skyCantrips as v2_skyCantrips, skySpells as v2_skySpells, skyFacets as v2_skyFacets } from '../components/cultivation/consts/v2/sky';
import { tempestAbilities as v2_tempestAbilities, tempestCantrips as v2_tempestCantrips, tempestSpells as v2_tempestSpells, tempestFacets as v2_tempestFacets } from '../components/cultivation/consts/v2/tempest';
import { tyrannyAbilities as v2_tyrannyAbilities, tyrannyCantrips as v2_tyrannyCantrips, tyrannySpells as v2_tyrannySpells, tyrannyFacets as v2_tyrannyFacets } from '../components/cultivation/consts/v2/tyranny';
import { undertowAbilities as v2_undertowAbilities, undertowCantrips as v2_undertowCantrips, undertowSpells as v2_undertowSpells, undertowFacets as v2_undertowFacets } from '../components/cultivation/consts/v2/undertow';
import { waterAbilities as v2_waterAbilities, waterCantrips as v2_waterCantrips, waterSpells as v2_waterSpells, waterFacets as v2_waterFacets } from '../components/cultivation/consts/v2/water';
import { wisdomAbilities as v2_wisdomAbilities, wisdomCantrips as v2_wisdomCantrips, wisdomSpells as v2_wisdomSpells, wisdomFacets as v2_wisdomFacets } from '../components/cultivation/consts/v2/wisdom';
import { woodAbilities as v2_woodAbilities, woodCantrips as v2_woodCantrips, woodSpells as v2_woodSpells, woodFacets as v2_woodFacets } from '../components/cultivation/consts/v2/wood';

import { Ability, PathFacet } from '../types/essence';
import { CultivationCatalog, CultivationPathId, CultivationVersion, getCultivationCatalog } from '../types/cultivation';

interface PathData { abilities: Ability[]; cantrips: Ability[]; spells: Ability[]; facets: PathFacet[] }
export interface CultivationData {
  paths: CultivationCatalog['paths'];
  groups: CultivationCatalog['groups'];
  catalog: CultivationCatalog;
  abilities: Record<CultivationPathId, Ability[]>;
  cantrips: Record<CultivationPathId, Ability[]>;
  spells: Record<CultivationPathId, Ability[]>;
  /** Each path's optional sub-themes, for filtering. Empty for most paths. */
  facets: Record<CultivationPathId, PathFacet[]>;
}

const dataByVersion: Record<CultivationVersion, Record<string, PathData>> = {
  v2: {
    "alchemy": { abilities: v2_alchemyAbilities as Ability[], cantrips: v2_alchemyCantrips as Ability[], spells: v2_alchemySpells as Ability[], facets: v2_alchemyFacets as PathFacet[] },
    "crypt": { abilities: v2_cryptAbilities as Ability[], cantrips: v2_cryptCantrips as Ability[], spells: v2_cryptSpells as Ability[], facets: v2_cryptFacets as PathFacet[] },
    "earth": { abilities: v2_earthAbilities as Ability[], cantrips: v2_earthCantrips as Ability[], spells: v2_earthSpells as Ability[], facets: v2_earthFacets as PathFacet[] },
    "fire": { abilities: v2_fireAbilities as Ability[], cantrips: v2_fireCantrips as Ability[], spells: v2_fireSpells as Ability[], facets: v2_fireFacets as PathFacet[] },
    "heart": { abilities: v2_heartAbilities as Ability[], cantrips: v2_heartCantrips as Ability[], spells: v2_heartSpells as Ability[], facets: v2_heartFacets as PathFacet[] },
    "love": { abilities: v2_loveAbilities as Ability[], cantrips: v2_loveCantrips as Ability[], spells: v2_loveSpells as Ability[], facets: v2_loveFacets as PathFacet[] },
    "lunar": { abilities: v2_lunarAbilities as Ability[], cantrips: v2_lunarCantrips as Ability[], spells: v2_lunarSpells as Ability[], facets: v2_lunarFacets as PathFacet[] },
    "metal": { abilities: v2_metalAbilities as Ability[], cantrips: v2_metalCantrips as Ability[], spells: v2_metalSpells as Ability[], facets: v2_metalFacets as PathFacet[] },
    "mysteries": { abilities: v2_mysteriesAbilities as Ability[], cantrips: v2_mysteriesCantrips as Ability[], spells: v2_mysteriesSpells as Ability[], facets: v2_mysteriesFacets as PathFacet[] },
    "navigation": { abilities: v2_navigationAbilities as Ability[], cantrips: v2_navigationCantrips as Ability[], spells: v2_navigationSpells as Ability[], facets: v2_navigationFacets as PathFacet[] },
    "pestilence": { abilities: v2_pestilenceAbilities as Ability[], cantrips: v2_pestilenceCantrips as Ability[], spells: v2_pestilenceSpells as Ability[], facets: v2_pestilenceFacets as PathFacet[] },
    "providence": { abilities: v2_providenceAbilities as Ability[], cantrips: v2_providenceCantrips as Ability[], spells: v2_providenceSpells as Ability[], facets: v2_providenceFacets as PathFacet[] },
    "ruin": { abilities: v2_ruinAbilities as Ability[], cantrips: v2_ruinCantrips as Ability[], spells: v2_ruinSpells as Ability[], facets: v2_ruinFacets as PathFacet[] },
    "shadow": { abilities: v2_shadowAbilities as Ability[], cantrips: v2_shadowCantrips as Ability[], spells: v2_shadowSpells as Ability[], facets: v2_shadowFacets as PathFacet[] },
    "sky": { abilities: v2_skyAbilities as Ability[], cantrips: v2_skyCantrips as Ability[], spells: v2_skySpells as Ability[], facets: v2_skyFacets as PathFacet[] },
    "tempest": { abilities: v2_tempestAbilities as Ability[], cantrips: v2_tempestCantrips as Ability[], spells: v2_tempestSpells as Ability[], facets: v2_tempestFacets as PathFacet[] },
    "tyranny": { abilities: v2_tyrannyAbilities as Ability[], cantrips: v2_tyrannyCantrips as Ability[], spells: v2_tyrannySpells as Ability[], facets: v2_tyrannyFacets as PathFacet[] },
    "undertow": { abilities: v2_undertowAbilities as Ability[], cantrips: v2_undertowCantrips as Ability[], spells: v2_undertowSpells as Ability[], facets: v2_undertowFacets as PathFacet[] },
    "water": { abilities: v2_waterAbilities as Ability[], cantrips: v2_waterCantrips as Ability[], spells: v2_waterSpells as Ability[], facets: v2_waterFacets as PathFacet[] },
    "wisdom": { abilities: v2_wisdomAbilities as Ability[], cantrips: v2_wisdomCantrips as Ability[], spells: v2_wisdomSpells as Ability[], facets: v2_wisdomFacets as PathFacet[] },
    "wood": { abilities: v2_woodAbilities as Ability[], cantrips: v2_woodCantrips as Ability[], spells: v2_woodSpells as Ability[], facets: v2_woodFacets as PathFacet[] }
  }
};

export function importCultivationData(version: CultivationVersion): CultivationData {
  const catalog = getCultivationCatalog(version);
  const source = dataByVersion[version];
  const abilities: Record<CultivationPathId, Ability[]> = {};
  const cantrips: Record<CultivationPathId, Ability[]> = {};
  const spells: Record<CultivationPathId, Ability[]> = {};
  const facets: Record<CultivationPathId, PathFacet[]> = {};
  for (const path of catalog.paths) {
    const pathData = source[path.id];
    abilities[path.id] = pathData.abilities;
    cantrips[path.id] = pathData.cantrips;
    spells[path.id] = pathData.spells;
    facets[path.id] = pathData.facets;
  }
  return { catalog, paths: catalog.paths, groups: catalog.groups, abilities, cantrips, spells, facets };
}
