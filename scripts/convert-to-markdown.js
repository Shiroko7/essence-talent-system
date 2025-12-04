#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');

// Import all the essence data
import { waterAbilities, waterCantrips, waterSpells } from '../src/components/essences/consts/water.tsx';
import { earthAbilities, earthCantrips, earthSpells } from '../src/components/essences/consts/earth.tsx';
import { metalAbilities, metalCantrips, metalSpells } from '../src/components/essences/consts/metal.tsx';
import { woodAbilities, woodCantrips, woodSpells } from '../src/components/essences/consts/wood.tsx';
import { poisonAbilities, poisonCantrips, poisonSpells } from '../src/components/essences/consts/poison.tsx';
import { acidAbilities, acidCantrips, acidSpells } from '../src/components/essences/consts/acid.tsx';
import { lightningAbilities, lightningCantrips, lightningSpells } from '../src/components/essences/consts/lightning.tsx';
import { airAbilities, airCantrips, airSpells } from '../src/components/essences/consts/air.tsx';

function abilityToMarkdown(ability) {
  return `### ${ability.name}
\`\`\`yaml
id: ${ability.id}
tier: ${ability.tier}
isActive: ${ability.isActive}
isPassive: ${ability.isPassive}
isSpell: ${ability.isSpell}
isCantrip: ${ability.isCantrip}
\`\`\`

${ability.description}

---`;
}

function essenceToMarkdown(essenceName, abilities, cantrips, spells) {
  let markdown = `# ${essenceName.charAt(0).toUpperCase() + essenceName.slice(1)} Essence Abilities\n\n`;

  // Group abilities by tier
  const tiers = {
    initiate: [],
    adept: [],
    master: [],
    grandmaster: [],
    greatgrandmaster: [],
    active: [], // For any miscategorized
  };

  abilities.forEach(ability => {
    if (tiers[ability.tier]) {
      tiers[ability.tier].push(ability);
    } else {
      // Put in initiate if tier is unknown
      tiers.initiate.push(ability);
    }
  });

  // Write initiate tier
  if (tiers.initiate.length > 0) {
    markdown += `## Initiate Tier\n\n`;
    tiers.initiate.forEach(ability => {
      markdown += abilityToMarkdown(ability) + '\n\n';
    });
  }

  // Write adept tier
  if (tiers.adept.length > 0) {
    markdown += `## Adept Tier\n\n`;
    tiers.adept.forEach(ability => {
      markdown += abilityToMarkdown(ability) + '\n\n';
    });
  }

  // Write master tier
  if (tiers.master.length > 0) {
    markdown += `## Master Tier\n\n`;
    tiers.master.forEach(ability => {
      markdown += abilityToMarkdown(ability) + '\n\n';
    });
  }

  // Write grandmaster tier
  if (tiers.grandmaster.length > 0) {
    markdown += `## Grandmaster Tier\n\n`;
    tiers.grandmaster.forEach(ability => {
      markdown += abilityToMarkdown(ability) + '\n\n';
    });
  }

  // Write greatgrandmaster tier
  if (tiers.greatgrandmaster.length > 0) {
    markdown += `## Great Grandmaster Tier\n\n`;
    tiers.greatgrandmaster.forEach(ability => {
      markdown += abilityToMarkdown(ability) + '\n\n';
    });
  }

  // Write active tier (for miscategorized)
  if (tiers.active.length > 0) {
    markdown += `## Active Tier\n\n`;
    tiers.active.forEach(ability => {
      markdown += abilityToMarkdown(ability) + '\n\n';
    });
  }

  // Write cantrips
  if (cantrips.length > 0) {
    markdown += `## Cantrips\n\n`;
    cantrips.forEach(cantrip => {
      markdown += abilityToMarkdown(cantrip) + '\n\n';
    });
  }

  // Write spells
  if (spells.length > 0) {
    markdown += `## Spells\n\n`;
    spells.forEach(spell => {
      markdown += abilityToMarkdown(spell) + '\n\n';
    });
  }

  return markdown;
}

const essences = [
  { name: 'water', abilities: waterAbilities, cantrips: waterCantrips, spells: waterSpells },
  { name: 'earth', abilities: earthAbilities, cantrips: earthCantrips, spells: earthSpells },
  { name: 'metal', abilities: metalAbilities, cantrips: metalCantrips, spells: metalSpells },
  { name: 'wood', abilities: woodAbilities, cantrips: woodCantrips, spells: woodSpells },
  { name: 'poison', abilities: poisonAbilities, cantrips: poisonCantrips, spells: poisonSpells },
  { name: 'acid', abilities: acidAbilities, cantrips: acidCantrips, spells: acidSpells },
  { name: 'lightning', abilities: lightningAbilities, cantrips: lightningCantrips, spells: lightningSpells },
  { name: 'air', abilities: airAbilities, cantrips: airCantrips, spells: airSpells },
];

console.log('Converting TypeScript essence files to Markdown...\n');

essences.forEach(essence => {
  const markdown = essenceToMarkdown(essence.name, essence.abilities, essence.cantrips, essence.spells);
  const outputPath = path.join(PROJECT_ROOT, 'data', 'essences', `${essence.name}.md`);
  fs.writeFileSync(outputPath, markdown, 'utf-8');
  console.log(`✅ Created ${essence.name}.md`);
});

console.log('\n✨ Conversion complete!');
