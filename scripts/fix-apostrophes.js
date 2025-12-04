#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data', 'essences');

const files = fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.md'));

console.log(`Fixing escaped apostrophes in ${files.length} markdown files...\n`);

let totalReplacements = 0;

for (const file of files) {
  const filePath = path.join(DATA_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Count replacements
  const matches = content.match(/\\'/g);
  const count = matches ? matches.length : 0;

  if (count > 0) {
    // Replace \' with '
    const fixed = content.replace(/\\'/g, "'");
    fs.writeFileSync(filePath, fixed, 'utf-8');
    console.log(`✅ ${file}: Fixed ${count} escaped apostrophe(s)`);
    totalReplacements += count;
  }
}

console.log(`\n✨ Total: Fixed ${totalReplacements} escaped apostrophe(s) across ${files.length} file(s)`);
