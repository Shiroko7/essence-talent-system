#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_ROOT = path.join(PROJECT_ROOT, 'data', 'cultivation');
const OUTPUT_ROOT = path.join(PROJECT_ROOT, 'src', 'components', 'cultivation', 'consts');
const DATA_MODULE = path.join(PROJECT_ROOT, 'src', 'utils', 'cultivationData.ts');
const VERSIONS = ['v2'];

function extractName(section) {
  return section.match(/^###\s+(.+)$/m)?.[1]?.trim() ?? '';
}

function parseMarkdownFile(content, pathName) {
  const abilities = [];
  const cantrips = [];
  const spells = [];
  content = content.replace(/\r\n/g, '\n');
  const spellcasting = content.match(/^Spellcasting:\s*(.+)$/mi)?.[1]?.trim().toLowerCase() ?? 'catalog';
  // Facets: a path's optional sub-themes (Alchemy's acid, poison...), used only to filter the UI.
  const facets = splitList(content.match(/^Facets:\s*(.+)$/mi)?.[1]).map(label => ({ id: facetId(label), label }));
  const headings = [...content.matchAll(/^###\s+.+$/gm)];
  const sections = headings.map((heading, index) => content.slice(heading.index, headings[index + 1]?.index ?? content.length));

  for (const section of sections) {
    const yaml = section.match(/```yaml\s*\n([\s\S]*?)\n```/);
    if (!yaml) continue;
    const metadata = {};
    for (const line of yaml[1].split('\n')) {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (!match) continue;
      const [, key, raw] = match;
      metadata[key] = raw === 'true' ? true : raw === 'false' ? false : raw;
    }
    // Section headings (## Master Tier, ## Spells...) belong to the file, not to the ability above them.
    const description = section.match(/```yaml[\s\S]*?```\s*\n\s*\n([\s\S]+)/)?.[1]
      ?.split(/^#{1,2}\s/m)[0].replace(/(\n+---\s*)+$/, '').trim() ?? '';
    const ability = {
      id: metadata.id || '',
      name: extractName(section),
      description,
      tier: metadata.tier || 'initiate',
      isActive: metadata.isActive || false,
      isPassive: metadata.isPassive || false,
      isSpell: metadata.isSpell || false,
      isCantrip: metadata.isCantrip || false,
      author: metadata.author || metadata.source || undefined,
      location: metadata.location || undefined,
      activation: metadata.activation || undefined,
      concentration: metadata.concentration || undefined,
      oncePerTurn: metadata.oncePerTurn || undefined,
      ritual: metadata.ritual || undefined,
      domain: metadata.domain || undefined,
      domainText: metadata.domainText || undefined,
      facets: metadata.facets ? splitList(metadata.facets).map(facetId) : undefined,
      series: metadata.series || undefined,
      stages: metadata.stages || undefined
    };
    if (ability.isCantrip) cantrips.push(ability);
    else if (ability.isSpell) spells.push(ability);
    else abilities.push(ability);
  }
  return { abilities, cantrips, spells, spellcasting, facets };
}

const splitList = value => (value ? value.split(',').map(item => item.trim()).filter(Boolean) : []);
const facetId = label => label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const escapeString = value => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');

function formatAbility(ability) {
  let out = `  {\n    id: "${escapeString(ability.id)}",\n    name: "${escapeString(ability.name)}",\n    description: "${escapeString(ability.description)}",\n    tier: "${ability.tier}",\n    isActive: ${ability.isActive},\n    isPassive: ${ability.isPassive},\n    isSpell: ${ability.isSpell},\n    isCantrip: ${ability.isCantrip},`;
  if (ability.author) out += `\n    author: "${escapeString(ability.author)}",`;
  if (ability.location) out += `\n    location: "${escapeString(ability.location)}",`;
  if (ability.activation) out += `\n    activation: "${ability.activation}",`;
  if (ability.concentration) out += `\n    concentration: true,`;
  if (ability.oncePerTurn) out += `\n    oncePerTurn: true,`;
  if (ability.ritual) out += `\n    ritual: true,`;
  if (ability.domain) out += `\n    domain: "${ability.domain}",`;
  if (ability.domainText) out += `\n    domainText: "${escapeString(ability.domainText)}",`;
  if (ability.facets) out += `\n    facets: ${JSON.stringify(ability.facets)},`;
  if (ability.series) out += `\n    series: "${ability.series}",\n    stage: ${ability.stage},\n    stages: "${ability.stages}",`;
  return `${out}\n  }`;
}

const ACTIVATIONS = ['action', 'bonus action', 'reaction', 'free', 'attack', 'on hit'];
const SPELL_ACTIVATIONS = ['action', 'bonus action', 'reaction'];

/** Activation, concentration, ritual and once-per-turn are tags; a spell's come from its 5etools entry. */
function validateTags(ability, where) {
  const spell = ability.isSpell || ability.isCantrip;
  const allowed = spell ? SPELL_ACTIVATIONS : ACTIVATIONS;
  if (ability.activation && !allowed.includes(ability.activation)) {
    throw new Error(`"${ability.name}" in ${where} has activation "${ability.activation}"; use ${allowed.join(', ')}.`);
  }
  if (ability.oncePerTurn && (spell || ability.activation === 'reaction')) {
    throw new Error(`"${ability.name}" in ${where} can't be once per turn: spells never are, and a reaction already limits it.`);
  }
  if (/^\*\*(Casting Time|Range|Components|Duration|Portfolio|Action)\b/m.test(ability.description)) {
    throw new Error(`"${ability.name}" in ${where} has a spell-style stat block; use activation and concentration tags.`);
  }
}

/**
 * A path with a Facets line tags every ability with at least one of them (there is no "Other"
 * bucket); a facet tag must name one of its path's Facets, and paths without Facets take no tags.
 */
function validateFacets(ability, facets, where) {
  if (!ability.facets) {
    if (facets.length) throw new Error(`"${ability.name}" in ${where} needs a facets tag: ${facets.map(facet => facet.id).join(', ')}.`);
    return;
  }
  if (!facets.length) throw new Error(`"${ability.name}" in ${where} has facets, but the path declares no Facets line.`);
  const known = facets.map(facet => facet.id);
  for (const facet of ability.facets) {
    if (!known.includes(facet)) throw new Error(`"${ability.name}" in ${where} has unknown facet "${facet}"; use ${known.join(', ')}.`);
  }
}

/**
 * Domain lines follow docs/domain-expansion-design.md: a Domain Expansion or restore is one line of text,
 * only Grandmaster or higher techniques can be domain-bound, and spells and cantrips get no domain line at all.
 */
function validateDomain(ability, where) {
  if (!ability.domain) {
    if (ability.domainText) throw new Error(`"${ability.name}" in ${where} has domainText but no domain.`);
    return;
  }
  if (ability.isSpell || ability.isCantrip) throw new Error(`Spell "${ability.name}" in ${where} can't have a domain line; only techniques can.`);
  if (ability.domain === 'expansion' || ability.domain === 'restore') {
    if (!ability.domainText) throw new Error(`Domain line on "${ability.name}" in ${where} needs a domainText line.`);
    return;
  }
  if (ability.domain !== 'bound') throw new Error(`"${ability.name}" in ${where} has unknown domain "${ability.domain}"; use expansion, restore or bound.`);
  if (!['grandmaster', 'greatgrandmaster'].includes(ability.tier)) {
    throw new Error(`"${ability.name}" in ${where} is domain-bound below Grandmaster.`);
  }
}

const TIER_ORDER = ['initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster'];

/**
 * Staged techniques: every stage names its series and whether stages replace or add. Stages number
 * themselves in tier order, one per tier with no gaps, all in one path. Series ids are unique across paths.
 */
function assignStages(abilities, where, seen) {
  const series = new Map();
  for (const ability of abilities) {
    if (!ability.series) {
      if (ability.stages) throw new Error(`"${ability.name}" in ${where} has stages but no series.`);
      continue;
    }
    if (!['replace', 'add'].includes(ability.stages)) {
      throw new Error(`"${ability.name}" in ${where} is in series "${ability.series}" and needs stages: replace or stages: add.`);
    }
    if (!series.has(ability.series)) series.set(ability.series, []);
    series.get(ability.series).push(ability);
  }
  for (const [id, stages] of series) {
    if (seen.has(id)) throw new Error(`Series "${id}" in ${where} is also used in ${seen.get(id)}.`);
    seen.set(id, where);
    if (stages.length < 2) throw new Error(`Series "${id}" in ${where} has only one stage.`);
    if (new Set(stages.map(s => s.stages)).size > 1) throw new Error(`Series "${id}" in ${where} mixes stages: replace and add.`);
    stages.sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier));
    const first = TIER_ORDER.indexOf(stages[0].tier);
    stages.forEach((stage, index) => {
      if (TIER_ORDER.indexOf(stage.tier) !== first + index) {
        throw new Error(`Series "${id}" in ${where} needs one stage per tier with no gaps; "${stage.name}" is ${stage.tier}.`);
      }
      stage.stage = index + 1;
    });
  }
}

function generateTypeScriptFile(data, pathName) {
  return [
    `export const ${pathName}Abilities = [\n${data.abilities.map(formatAbility).join(',\n')}\n];`,
    `export const ${pathName}Cantrips = [\n${data.cantrips.map(formatAbility).join(',\n')}\n];`,
    `export const ${pathName}Spells = [\n${data.spells.map(formatAbility).join(',\n')}\n];`,
    `export const ${pathName}Facets = ${JSON.stringify(data.facets)};`,
    ''
  ].join('\n\n').trimEnd() + '\n';
}

const normalizeName = name => name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().trim().replace(/\s+/g, ' ');

function generateDataModule(filesByVersion) {
  const imports = [];
  const definitions = [];
  for (const version of VERSIONS) {
    const paths = filesByVersion[version];
    const definitionsForVersion = [];
    for (const pathName of paths) {
      const symbol = `${version}_${pathName}`;
      const modulePath = `../components/cultivation/consts/${version}/${pathName}`;
      imports.push(`import { ${pathName}Abilities as ${symbol}Abilities, ${pathName}Cantrips as ${symbol}Cantrips, ${pathName}Spells as ${symbol}Spells, ${pathName}Facets as ${symbol}Facets } from '${modulePath}';`);
      definitionsForVersion.push(`    ${JSON.stringify(pathName)}: { abilities: ${symbol}Abilities as Ability[], cantrips: ${symbol}Cantrips as Ability[], spells: ${symbol}Spells as Ability[], facets: ${symbol}Facets as PathFacet[] }`);
    }
    definitions.push(`  ${version}: {\n${definitionsForVersion.join(',\n')}\n  }`);
  }

  return `${imports.join('\n')}\n\nimport { Ability, PathFacet } from '../types/essence';
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
${definitions.join(',\n')}
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
`;
}

function main() {
  console.log('Generating cultivation catalogs from versioned Markdown...');
  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
  for (const file of fs.readdirSync(OUTPUT_ROOT)) {
    if (file.endsWith('.tsx') && fs.statSync(path.join(OUTPUT_ROOT, file)).isFile()) {
      fs.unlinkSync(path.join(OUTPUT_ROOT, file));
    }
  }
  const allParsed = {};
  const filesByVersion = {};

  for (const version of VERSIONS) {
    const dataDir = path.join(DATA_ROOT, version);
    const outputDir = path.join(OUTPUT_ROOT, version);
    if (!fs.existsSync(dataDir)) throw new Error(`Missing catalog source directory: ${dataDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.md')).sort();
    if (!files.length) throw new Error(`No Markdown path files found in ${dataDir}`);
    filesByVersion[version] = [];
    allParsed[version] = {};

    const expectedModules = new Set(files.map(file => `${path.basename(file, '.md')}.tsx`));
    for (const file of fs.readdirSync(outputDir)) {
      if (file.endsWith('.tsx') && !expectedModules.has(file)) {
        fs.unlinkSync(path.join(outputDir, file));
      }
    }

    const spellOwners = new Map();
    const abilityIds = new Map();
    const seriesOwners = new Map();
    for (const file of files) {
      const pathName = path.basename(file, '.md');
      const parsed = parseMarkdownFile(fs.readFileSync(path.join(dataDir, file), 'utf8'), pathName);
      if (parsed.spellcasting === 'none') {
        if (parsed.spells.length) {
          throw new Error(`${version}/${pathName} declares no spellcasting but contains leveled spells.`);
        }
      } else {
        if (!parsed.cantrips.length) console.warn(`Warning: No cantrip assigned to ${version}/${pathName}; every spellcasting path needs at least one.`);
        if (!parsed.spells.length) console.warn(`Warning: No leveled spell assigned to ${version}/${pathName}; every spellcasting path needs at least one.`);
      }
      for (const ability of [...parsed.abilities, ...parsed.cantrips, ...parsed.spells]) {
        if (!ability.id) throw new Error(`Missing ability id for "${ability.name}" in ${version}/${pathName}.`);
        if (!ability.name) throw new Error(`Missing heading/name in ${version}/${pathName}.`);
        const priorId = abilityIds.get(ability.id);
        if (priorId) throw new Error(`Duplicate ability id "${ability.id}" in ${version}/${priorId} and ${version}/${pathName}.`);
        abilityIds.set(ability.id, pathName);
        validateDomain(ability, `${version}/${pathName}`);
        validateTags(ability, `${version}/${pathName}`);
        validateFacets(ability, parsed.facets, `${version}/${pathName}`);
      }
      assignStages([...parsed.abilities, ...parsed.cantrips, ...parsed.spells], `${version}/${pathName}`, seriesOwners);
      for (const ability of [...parsed.cantrips, ...parsed.spells]) {
        const name = normalizeName(ability.name);
        const priorPath = spellOwners.get(name);
        if (priorPath) throw new Error(`Duplicate spell/cantrip "${ability.name}" in ${version}/${priorPath} and ${version}/${pathName}; each version can assign it once.`);
        spellOwners.set(name, pathName);
        validateTags(ability, `${version}/${pathName}`);
      }
      allParsed[version][pathName] = parsed;
      filesByVersion[version].push(pathName);
    }
  }

  for (const version of VERSIONS) {
    const outputDir = path.join(OUTPUT_ROOT, version);
    for (const pathName of filesByVersion[version]) {
      const parsed = allParsed[version][pathName];
      fs.writeFileSync(path.join(outputDir, `${pathName}.tsx`), generateTypeScriptFile(parsed, pathName), 'utf8');
      const custom = parsed.abilities;
      const active = custom.filter(ability => ability.isActive).length;
      const passive = custom.filter(ability => ability.isPassive).length;
      console.log(`${version.toUpperCase()} ${pathName}: ${active} active / ${passive} passive; ${parsed.cantrips.length} cantrips; ${parsed.spells.length} spells; ${custom.length + parsed.cantrips.length + parsed.spells.length} entries`);
    }
  }

  fs.writeFileSync(DATA_MODULE, generateDataModule(filesByVersion), 'utf8');
  console.log(`Generated ${VERSIONS.length} cultivation catalogs and ${Object.values(filesByVersion).flat().length} path modules.`);
}

main();
