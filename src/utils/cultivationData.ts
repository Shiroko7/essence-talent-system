import { alchemyAbilities as v2_alchemyAbilities, alchemyCantrips as v2_alchemyCantrips, alchemySpells as v2_alchemySpells } from '../components/cultivation/consts/v2/alchemy';
import { earthAbilities as v2_earthAbilities, earthCantrips as v2_earthCantrips, earthSpells as v2_earthSpells } from '../components/cultivation/consts/v2/earth';
import { fireAbilities as v2_fireAbilities, fireCantrips as v2_fireCantrips, fireSpells as v2_fireSpells } from '../components/cultivation/consts/v2/fire';
import { loveAbilities as v2_loveAbilities, loveCantrips as v2_loveCantrips, loveSpells as v2_loveSpells } from '../components/cultivation/consts/v2/love';
import { lunarAbilities as v2_lunarAbilities, lunarCantrips as v2_lunarCantrips, lunarSpells as v2_lunarSpells } from '../components/cultivation/consts/v2/lunar';
import { metalAbilities as v2_metalAbilities, metalCantrips as v2_metalCantrips, metalSpells as v2_metalSpells } from '../components/cultivation/consts/v2/metal';
import { pestilenceAbilities as v2_pestilenceAbilities, pestilenceCantrips as v2_pestilenceCantrips, pestilenceSpells as v2_pestilenceSpells } from '../components/cultivation/consts/v2/pestilence';
import { providenceAbilities as v2_providenceAbilities, providenceCantrips as v2_providenceCantrips, providenceSpells as v2_providenceSpells } from '../components/cultivation/consts/v2/providence';
import { ruinAbilities as v2_ruinAbilities, ruinCantrips as v2_ruinCantrips, ruinSpells as v2_ruinSpells } from '../components/cultivation/consts/v2/ruin';
import { shadowAbilities as v2_shadowAbilities, shadowCantrips as v2_shadowCantrips, shadowSpells as v2_shadowSpells } from '../components/cultivation/consts/v2/shadow';
import { skyAbilities as v2_skyAbilities, skyCantrips as v2_skyCantrips, skySpells as v2_skySpells } from '../components/cultivation/consts/v2/sky';
import { tempestAbilities as v2_tempestAbilities, tempestCantrips as v2_tempestCantrips, tempestSpells as v2_tempestSpells } from '../components/cultivation/consts/v2/tempest';
import { waterAbilities as v2_waterAbilities, waterCantrips as v2_waterCantrips, waterSpells as v2_waterSpells } from '../components/cultivation/consts/v2/water';
import { woodAbilities as v2_woodAbilities, woodCantrips as v2_woodCantrips, woodSpells as v2_woodSpells } from '../components/cultivation/consts/v2/wood';

import { Ability } from '../types/essence';
import { CultivationCatalog, CultivationPathId, CultivationVersion, getCultivationCatalog } from '../types/cultivation';

interface PathData { abilities: Ability[]; cantrips: Ability[]; spells: Ability[] }
export interface CultivationData {
  paths: CultivationCatalog['paths'];
  groups: CultivationCatalog['groups'];
  catalog: CultivationCatalog;
  abilities: Record<CultivationPathId, Ability[]>;
  cantrips: Record<CultivationPathId, Ability[]>;
  spells: Record<CultivationPathId, Ability[]>;
}

const dataByVersion: Record<CultivationVersion, Record<string, PathData>> = {
  v2: {
    "alchemy": { abilities: v2_alchemyAbilities as Ability[], cantrips: v2_alchemyCantrips as Ability[], spells: v2_alchemySpells as Ability[] },
    "earth": { abilities: v2_earthAbilities as Ability[], cantrips: v2_earthCantrips as Ability[], spells: v2_earthSpells as Ability[] },
    "fire": { abilities: v2_fireAbilities as Ability[], cantrips: v2_fireCantrips as Ability[], spells: v2_fireSpells as Ability[] },
    "love": { abilities: v2_loveAbilities as Ability[], cantrips: v2_loveCantrips as Ability[], spells: v2_loveSpells as Ability[] },
    "lunar": { abilities: v2_lunarAbilities as Ability[], cantrips: v2_lunarCantrips as Ability[], spells: v2_lunarSpells as Ability[] },
    "metal": { abilities: v2_metalAbilities as Ability[], cantrips: v2_metalCantrips as Ability[], spells: v2_metalSpells as Ability[] },
    "pestilence": { abilities: v2_pestilenceAbilities as Ability[], cantrips: v2_pestilenceCantrips as Ability[], spells: v2_pestilenceSpells as Ability[] },
    "providence": { abilities: v2_providenceAbilities as Ability[], cantrips: v2_providenceCantrips as Ability[], spells: v2_providenceSpells as Ability[] },
    "ruin": { abilities: v2_ruinAbilities as Ability[], cantrips: v2_ruinCantrips as Ability[], spells: v2_ruinSpells as Ability[] },
    "shadow": { abilities: v2_shadowAbilities as Ability[], cantrips: v2_shadowCantrips as Ability[], spells: v2_shadowSpells as Ability[] },
    "sky": { abilities: v2_skyAbilities as Ability[], cantrips: v2_skyCantrips as Ability[], spells: v2_skySpells as Ability[] },
    "tempest": { abilities: v2_tempestAbilities as Ability[], cantrips: v2_tempestCantrips as Ability[], spells: v2_tempestSpells as Ability[] },
    "water": { abilities: v2_waterAbilities as Ability[], cantrips: v2_waterCantrips as Ability[], spells: v2_waterSpells as Ability[] },
    "wood": { abilities: v2_woodAbilities as Ability[], cantrips: v2_woodCantrips as Ability[], spells: v2_woodSpells as Ability[] }
  }
};

export function importCultivationData(version: CultivationVersion): CultivationData {
  const catalog = getCultivationCatalog(version);
  const source = dataByVersion[version];
  const abilities: Record<CultivationPathId, Ability[]> = {};
  const cantrips: Record<CultivationPathId, Ability[]> = {};
  const spells: Record<CultivationPathId, Ability[]> = {};
  for (const path of catalog.paths) {
    const pathData = source[path.id];
    abilities[path.id] = pathData.abilities;
    cantrips[path.id] = pathData.cantrips;
    spells[path.id] = pathData.spells;
  }
  return { catalog, paths: catalog.paths, groups: catalog.groups, abilities, cantrips, spells };
}
