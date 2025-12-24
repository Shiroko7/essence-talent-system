#!/usr/bin/env node

/**
 * Shared markdown parsing utilities for essence abilities
 */

/**
 * Extract the name from a section (from the heading)
 */
export function extractNameFromSection(section) {
  const headingMatch = section.match(/###\s+(.+)/);
  return headingMatch ? headingMatch[1].trim() : '';
}

/**
 * Parse a markdown file and extract abilities with their metadata
 */
export function parseMarkdownFile(content, essenceName) {
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
 * Parse a TypeScript file and extract abilities with their metadata (for legacy files)
 */
export function parseTypeScriptFile(content) {
  const abilities = [];
  const cantrips = [];
  const spells = [];

  // Match ability/cantrip/spell const exports
  const abilityMatch = content.match(/export const \w+Abilities = \[([\s\S]*?)\];/);
  const cantripMatch = content.match(/export const \w+Cantrips = \[([\s\S]*?)\];/);
  const spellMatch = content.match(/export const \w+Spells = \[([\s\S]*?)\];/);

  // Parse abilities
  if (abilityMatch) {
    abilities.push(...parseTypeScriptArray(abilityMatch[1]));
  }

  // Parse cantrips
  if (cantripMatch) {
    cantrips.push(...parseTypeScriptArray(cantripMatch[1]));
  }

  // Parse spells
  if (spellMatch) {
    spells.push(...parseTypeScriptArray(spellMatch[1]));
  }

  return { abilities, cantrips, spells };
}

/**
 * Parse a TypeScript array of ability objects
 */
function parseTypeScriptArray(arrayContent) {
  const abilities = [];

  // Match individual object blocks
  const objectPattern = /\{([^}]+)\}/g;
  let match;

  while ((match = objectPattern.exec(arrayContent)) !== null) {
    const objContent = match[1];
    const ability = {};

    // Parse each property
    const lines = objContent.split('\n');
    for (const line of lines) {
      const trimmed = line.trim().replace(/,$/, '');
      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':');
        const key = trimmed.substring(0, colonIndex).trim();
        let value = trimmed.substring(colonIndex + 1).trim();

        // Remove quotes
        value = value.replace(/^["']|["']$/g, '');

        // Convert booleans
        if (value === 'true') value = true;
        else if (value === 'false') value = false;

        ability[key] = value;
      }
    }

    if (ability.id && ability.name) {
      abilities.push(ability);
    }
  }

  return abilities;
}
