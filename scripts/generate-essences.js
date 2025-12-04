#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data', 'essences');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src', 'components', 'essences', 'consts');

/**
 * Parse a markdown file and extract abilities with their metadata
 */
function parseMarkdownFile(content, essenceName) {
  const abilities = [];
  const cantrips = [];
  const spells = [];

  // Normalize line endings to \n
  content = content.replace(/\r\n/g, '\n');

  // Split by horizontal rules (---) which separate abilities
  const sections = content.split(/\n---\n/);

  for (const section of sections) {
    // Skip empty sections or sections without YAML
    if (!section.trim()) continue;

    // Extract YAML block
    const yamlMatch = section.match(/```yaml\s*\n([\s\S]*?)\n```/);
    if (!yamlMatch) continue;

    const yamlContent = yamlMatch[1];

    // Parse YAML manually (simple key: value format)
    const metadata = {};
    const yamlLines = yamlContent.split('\n');
    for (const line of yamlLines) {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        const key = match[1];
        let value = match[2].trim();

        // Convert boolean strings to actual booleans
        if (value === 'true') value = true;
        else if (value === 'false') value = false;

        metadata[key] = value;
      }
    }

    // Extract description (everything after the YAML block)
    const descriptionMatch = section.match(/```yaml[\s\S]*?```\s*\n\s*\n([\s\S]+)/);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';

    // Create ability object
    const ability = {
      id: metadata.id || '',
      name: extractNameFromSection(section),
      description: description,
      tier: metadata.tier || 'initiate',
      isActive: metadata.isActive || false,
      isPassive: metadata.isPassive || false,
      isSpell: metadata.isSpell || false,
      isCantrip: metadata.isCantrip || false,
    };

    // Categorize the ability
    if (ability.isCantrip) {
      cantrips.push(ability);
    } else if (ability.isSpell) {
      spells.push(ability);
    } else {
      abilities.push(ability);
    }
  }

  return { abilities, cantrips, spells };
}

/**
 * Extract the name from a section (from the heading)
 */
function extractNameFromSection(section) {
  const headingMatch = section.match(/###\s+(.+)/);
  return headingMatch ? headingMatch[1].trim() : '';
}

/**
 * Escape string for use in double-quoted JavaScript/TypeScript strings
 */
function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\')   // Escape backslashes first
    .replace(/"/g, '\\"')      // Escape double quotes
    .replace(/\n/g, '\\n')     // Escape newlines
    .replace(/\r/g, '\\r');    // Escape carriage returns
}

/**
 * Generate TypeScript file content
 */
function generateTypeScriptFile(abilities, cantrips, spells, essenceName) {
  const formatAbility = (ability) => {
    return `  {
    id: "${escapeString(ability.id)}",
    name: "${escapeString(ability.name)}",
    description: "${escapeString(ability.description)}",
    tier: "${ability.tier}",
    isActive: ${ability.isActive},
    isPassive: ${ability.isPassive},
    isSpell: ${ability.isSpell},
    isCantrip: ${ability.isCantrip},
  }`;
  };

  let content = `export const ${essenceName}Abilities = [\n`;
  content += abilities.map(formatAbility).join(',\n');
  content += '\n];\n\n';

  content += `export const ${essenceName}Cantrips = [\n`;
  content += cantrips.map(formatAbility).join(',\n');
  content += '\n];\n\n';

  content += `export const ${essenceName}Spells = [\n`;
  content += spells.map(formatAbility).join(',\n');
  content += '\n];\n';

  return content;
}

/**
 * Main function
 */
function main() {
  console.log('🔥 Generating essence TypeScript files from markdown...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read all markdown files in the data directory
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`❌ Data directory not found: ${DATA_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.md'));

  if (files.length === 0) {
    console.error(`❌ No markdown files found in ${DATA_DIR}`);
    process.exit(1);
  }

  let processedCount = 0;

  for (const file of files) {
    const essenceName = path.basename(file, '.md');
    const inputPath = path.join(DATA_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, `${essenceName}.tsx`);

    console.log(`📝 Processing ${essenceName}...`);

    try {
      // Read and parse markdown
      const content = fs.readFileSync(inputPath, 'utf-8');
      const { abilities, cantrips, spells } = parseMarkdownFile(content, essenceName);

      // Generate TypeScript
      const tsContent = generateTypeScriptFile(abilities, cantrips, spells, essenceName);

      // Write output file
      fs.writeFileSync(outputPath, tsContent, 'utf-8');

      console.log(`   ✅ Generated ${abilities.length} abilities, ${cantrips.length} cantrips, ${spells.length} spells`);
      processedCount++;
    } catch (error) {
      console.error(`   ❌ Error processing ${essenceName}:`, error.message);
    }
  }

  console.log(`\n✨ Successfully generated ${processedCount} essence file(s)!`);
}

main();
