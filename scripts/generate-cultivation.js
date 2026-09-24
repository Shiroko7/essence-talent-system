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
    const description = section.match(/```yaml[\s\S]*?```\s*\n\s*\n([\s\S]+)/)?.[1]
      ?.replace(/\n+---\s*$/, '').trim() ?? '';
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
      location: metadata.location || undefined
    };
    if (ability.isCantrip) cantrips.push(ability);
    else if (ability.isSpell) spells.push(ability);
    else abilities.push(ability);
  }
  return { abilities, cantrips, spells };
}

const escapeString = value => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');

function formatAbility(ability) {
  let out = `  {\n    id: "${escapeString(ability.id)}",\n    name: "${escapeString(ability.name)}",\n    description: "${escapeString(ability.description)}",\n    tier: "${ability.tier}",\n    isActive: ${ability.isActive},\n    isPassive: ${ability.isPassive},\n    isSpell: ${ability.isSpell},\n    isCantrip: ${ability.isCantrip},`;
  if (ability.author) out += `\n    author: "${escapeString(ability.author)}",`;
  if (ability.location) out += `\n    location: "${escapeString(ability.location)}",`;
  return `${out}\n  }`;
}

function generateTypeScriptFile(data, pathName) {
  return [
    `export const ${pathName}Abilities = [\n${data.abilities.map(formatAbility).join(',\n')}\n];`,
    `export const ${pathName}Cantrips = [\n${data.cantrips.map(formatAbility).join(',\n')}\n];`,
    `export const ${pathName}Spells = [\n${data.spells.map(formatAbility).join(',\n')}\n];`,
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
      imports.push(`import { ${pathName}Abilities as ${symbol}Abilities, ${pathName}Cantrips as ${symbol}Cantrips, ${pathName}Spells as ${symbol}Spells } from '${modulePath}';`);
      definitionsForVersion.push(`    ${JSON.stringify(pathName)}: { abilities: ${symbol}Abilities as Ability[], cantrips: ${symbol}Cantrips as Ability[], spells: ${symbol}Spells as Ability[] }`);
    }
    definitions.push(`  ${version}: {\n${definitionsForVersion.join(',\n')}\n  }`);
  }

  return `${imports.join('\n')}\n\nimport { Ability } from '../types/essence';
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
${definitions.join(',\n')}
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
    for (const file of files) {
      const pathName = path.basename(file, '.md');
      const parsed = parseMarkdownFile(fs.readFileSync(path.join(dataDir, file), 'utf8'), pathName);
      if (!parsed.cantrips.length) throw new Error(`No cantrip assigned to ${version}/${pathName}; every path needs at least one.`);
      if (!parsed.spells.length) throw new Error(`No leveled spell assigned to ${version}/${pathName}; every path needs at least one.`);
      for (const ability of [...parsed.abilities, ...parsed.cantrips, ...parsed.spells]) {
        if (!ability.id) throw new Error(`Missing ability id for "${ability.name}" in ${version}/${pathName}.`);
        if (!ability.name) throw new Error(`Missing heading/name in ${version}/${pathName}.`);
        const priorId = abilityIds.get(ability.id);
        if (priorId) throw new Error(`Duplicate ability id "${ability.id}" in ${version}/${priorId} and ${version}/${pathName}.`);
        abilityIds.set(ability.id, pathName);
      }
      for (const ability of [...parsed.cantrips, ...parsed.spells]) {
        const name = normalizeName(ability.name);
        const priorPath = spellOwners.get(name);
        if (priorPath) throw new Error(`Duplicate spell/cantrip "${ability.name}" in ${version}/${priorPath} and ${version}/${pathName}; each version can assign it once.`);
        spellOwners.set(name, pathName);
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
