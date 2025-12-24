#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { parseMarkdownFile, parseTypeScriptFile } from './shared/markdown-parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

/**
 * Execute a git command and return output
 */
function git(command) {
  try {
    return execSync(command, {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    }).trim();
  } catch (error) {
    return '';
  }
}

/**
 * Get file content at a specific commit
 */
function getFileAtCommit(commitHash, filePath) {
  try {
    return git(`git show ${commitHash}:${filePath}`);
  } catch (error) {
    return null;
  }
}

/**
 * Extract essence name from file path
 */
function getEssenceName(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  return basename;
}

/**
 * Get commit history for a specific file pattern
 */
function getCommitHistory(filePattern) {
  const output = git(`git log --reverse --format="%H|%ai|%s" -- ${filePattern}`);
  if (!output) return [];

  const commits = output.split('\n').filter(line => line.trim());
  return commits.map(line => {
    const [hash, date, ...messageParts] = line.split('|');
    return {
      hash: hash.trim(),
      date: date.trim(),
      message: messageParts.join('|').trim()
    };
  });
}

/**
 * Get list of files affected in a commit
 */
function getAffectedFiles(commitHash, filePattern) {
  const output = git(`git diff-tree --no-commit-id --name-only -r ${commitHash} -- ${filePattern}`);
  if (!output) return [];
  return output.split('\n').filter(f => f.trim());
}

/**
 * Compare two ability objects and return list of changes
 */
function compareAbilities(oldAbility, newAbility) {
  const changes = [];

  if (oldAbility.name !== newAbility.name) {
    changes.push({ field: 'name', oldValue: oldAbility.name, newValue: newAbility.name });
  }

  if (oldAbility.description !== newAbility.description) {
    changes.push({ field: 'description', oldValue: oldAbility.description, newValue: newAbility.description });
  }

  if (oldAbility.tier !== newAbility.tier) {
    changes.push({ field: 'tier', oldValue: oldAbility.tier, newValue: newAbility.tier });
  }

  // Check metadata changes
  ['isActive', 'isPassive', 'isSpell', 'isCantrip'].forEach(field => {
    if (oldAbility[field] !== newAbility[field]) {
      changes.push({ field, oldValue: oldAbility[field], newValue: newAbility[field] });
    }
  });

  return changes;
}

/**
 * Detect changes between two sets of abilities
 */
function detectChanges(oldAbilities, newAbilities, commit, essenceName) {
  const changes = [];

  // Build ID maps
  const oldMap = new Map(oldAbilities.map(a => [a.id, a]));
  const newMap = new Map(newAbilities.map(a => [a.id, a]));

  // Detect additions
  for (const [id, ability] of newMap) {
    if (!oldMap.has(id)) {
      changes.push({
        id: `${commit.hash}-${id}`,
        date: commit.date,
        commitHash: commit.hash,
        commitMessage: commit.message,
        essenceType: essenceName,
        changeType: 'added',
        ability: {
          id: ability.id,
          name: ability.name,
          tier: ability.tier,
          description: ability.description,
          isActive: ability.isActive,
          isPassive: ability.isPassive,
          isSpell: ability.isSpell,
          isCantrip: ability.isCantrip
        }
      });
    }
  }

  // Detect removals
  for (const [id, ability] of oldMap) {
    if (!newMap.has(id)) {
      changes.push({
        id: `${commit.hash}-${id}`,
        date: commit.date,
        commitHash: commit.hash,
        commitMessage: commit.message,
        essenceType: essenceName,
        changeType: 'removed',
        ability: {
          id: ability.id,
          name: ability.name,
          tier: ability.tier,
          description: ability.description,
          isActive: ability.isActive,
          isPassive: ability.isPassive,
          isSpell: ability.isSpell,
          isCantrip: ability.isCantrip
        }
      });
    }
  }

  // Detect modifications
  for (const [id, newAbility] of newMap) {
    const oldAbility = oldMap.get(id);
    if (oldAbility) {
      const fieldChanges = compareAbilities(oldAbility, newAbility);
      if (fieldChanges.length > 0) {
        changes.push({
          id: `${commit.hash}-${id}`,
          date: commit.date,
          commitHash: commit.hash,
          commitMessage: commit.message,
          essenceType: essenceName,
          changeType: 'modified',
          ability: {
            id: newAbility.id,
            name: newAbility.name,
            tier: newAbility.tier
          },
          changes: fieldChanges
        });
      }
    }
  }

  return changes;
}

/**
 * Process markdown file history
 */
function processMarkdownHistory() {
  console.log('📝 Processing markdown file history...');

  const commits = getCommitHistory('data/essences/*.md');
  const allEntries = [];

  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const prevCommit = i > 0 ? commits[i - 1] : null;

    const affectedFiles = getAffectedFiles(commit.hash, 'data/essences/*.md');

    for (const file of affectedFiles) {
      if (file.endsWith('.md') && !file.includes('README')) {
        const essenceName = getEssenceName(file);

        const currentContent = getFileAtCommit(commit.hash, file);
        if (!currentContent) continue;

        const currentData = parseMarkdownFile(currentContent, essenceName);
        const currentAbilities = [
          ...currentData.abilities,
          ...currentData.cantrips,
          ...currentData.spells
        ];

        // Get previous state
        let prevAbilities = [];
        if (prevCommit) {
          const prevContent = getFileAtCommit(prevCommit.hash, file);
          if (prevContent) {
            const prevData = parseMarkdownFile(prevContent, essenceName);
            prevAbilities = [
              ...prevData.abilities,
              ...prevData.cantrips,
              ...prevData.spells
            ];
          }
        }

        const changes = detectChanges(prevAbilities, currentAbilities, commit, essenceName);
        allEntries.push(...changes);

        if (changes.length > 0) {
          console.log(`   ✅ ${essenceName}: ${changes.length} changes in commit ${commit.hash.substring(0, 7)}`);
        }
      }
    }
  }

  return allEntries;
}

/**
 * Process TypeScript file history (legacy)
 */
function processTypeScriptHistory() {
  console.log('📝 Processing TypeScript file history (legacy)...');

  const commits = getCommitHistory('src/components/essences/consts/*.tsx');
  const allEntries = [];

  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const prevCommit = i > 0 ? commits[i - 1] : null;

    const affectedFiles = getAffectedFiles(commit.hash, 'src/components/essences/consts/*.tsx');

    for (const file of affectedFiles) {
      if (file.endsWith('.tsx')) {
        const essenceName = getEssenceName(file);

        const currentContent = getFileAtCommit(commit.hash, file);
        if (!currentContent) continue;

        const currentData = parseTypeScriptFile(currentContent);
        const currentAbilities = [
          ...currentData.abilities,
          ...currentData.cantrips,
          ...currentData.spells
        ];

        // Get previous state
        let prevAbilities = [];
        if (prevCommit) {
          const prevContent = getFileAtCommit(prevCommit.hash, file);
          if (prevContent) {
            const prevData = parseTypeScriptFile(prevContent);
            prevAbilities = [
              ...prevData.abilities,
              ...prevData.cantrips,
              ...prevData.spells
            ];
          }
        }

        const changes = detectChanges(prevAbilities, currentAbilities, commit, essenceName);
        allEntries.push(...changes);

        if (changes.length > 0) {
          console.log(`   ✅ ${essenceName}: ${changes.length} changes in commit ${commit.hash.substring(0, 7)}`);
        }
      }
    }
  }

  return allEntries;
}

/**
 * Main function
 */
function main() {
  console.log('🔥 Generating changelog from git history...\n');

  const allEntries = [];

  // Process markdown history (current approach)
  const markdownEntries = processMarkdownHistory();
  allEntries.push(...markdownEntries);

  // Process TypeScript history (legacy approach)
  const tsxEntries = processTypeScriptHistory();
  allEntries.push(...tsxEntries);

  // Sort by date descending (newest first)
  allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Create changelog data
  const changelog = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    entries: allEntries
  };

  // Ensure output directory exists
  const outputDir = path.join(PROJECT_ROOT, 'src', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write changelog JSON
  const outputPath = path.join(outputDir, 'changelog.json');
  fs.writeFileSync(outputPath, JSON.stringify(changelog, null, 2), 'utf-8');

  console.log(`\n✨ Generated ${allEntries.length} changelog entries!`);
  console.log(`📄 Output: ${outputPath}`);
}

main();
