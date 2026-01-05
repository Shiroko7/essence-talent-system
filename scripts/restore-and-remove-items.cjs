const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/items/grand-bazaar-seoul.json');
const toolsDataPath = path.join(__dirname, '5etools-data/items.json');

// Items to restore
const itemsToRestore = [
  'Helm of the Chromatic Dragon',
  'Boots of the Winterlands',
  "Seer's Starlight Cloak"
];

// Items to remove
const itemsToRemove = ['Soul Coin'];

// Type mapping from update script
const typeMap = {
  'W': 'weapon',
  'A': 'armor',
  'WD': 'wondrous item',
  'P': 'potion',
  'SC': 'scroll',
  'R': 'ring',
  'RD': 'rod',
  'S': 'staff',
  'WN': 'wand',
  'SCF': 'wondrous item',
  'G': 'adventuring gear',
  'SHP': 'ship',
  'VEH': 'vehicle',
  '$': 'other'
};

// Rarity mapping
const rarityMap = {
  'none': 'common',
  'common': 'common',
  'uncommon': 'uncommon',
  'rare': 'rare',
  'very rare': 'very rare',
  'legendary': 'legendary',
  'artifact': 'artifact'
};

// Helper to normalize names
function normalizeName(name) {
  return name.toLowerCase()
    .replace(/'/g, "'")
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Read current file
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
console.log(`Current items count: ${data.items.length}`);

// Remove Soul Coin
const beforeRemove = data.items.length;
data.items = data.items.filter(item => {
  if (itemsToRemove.includes(item.name)) {
    console.log(`Removing: ${item.name}`);
    return false;
  }
  return true;
});
console.log(`Removed ${beforeRemove - data.items.length} items`);

// Load 5etools data
if (!fs.existsSync(toolsDataPath)) {
  console.error('5etools data not found. Please run the update script first.');
  process.exit(1);
}

const toolsData = JSON.parse(fs.readFileSync(toolsDataPath, 'utf8'));
let allToolsItems = toolsData.item;

// Load additional sources
const additionalSources = [
  '5etools-data/items-base.json',
  '5etools-data/griffon-items.json',
  '5etools-data/griffon-book2.json',
];

additionalSources.forEach(sourcePath => {
  const fullPath = path.join(__dirname, sourcePath);
  if (fs.existsSync(fullPath)) {
    const sourceData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    if (sourceData.item) {
      allToolsItems = allToolsItems.concat(sourceData.item);
    } else if (sourceData.baseitem) {
      allToolsItems = allToolsItems.concat(sourceData.baseitem);
    }
  }
});

console.log(`\nLoaded ${allToolsItems.length} items from 5etools`);

// Restore items
console.log('\nRestoring items:');
for (const itemName of itemsToRestore) {
  const normalizedName = normalizeName(itemName);
  const toolsItem = allToolsItems.find(t => normalizeName(t.name) === normalizedName && t.rarity && t.rarity !== 'none');

  if (toolsItem) {
    const detailedData = {
      entries: toolsItem.entries || [],
    };

    // Add optional fields
    if (toolsItem.dmg1) detailedData.dmg1 = toolsItem.dmg1;
    if (toolsItem.dmg2) detailedData.dmg2 = toolsItem.dmg2;
    if (toolsItem.dmgType) detailedData.dmgType = toolsItem.dmgType;
    if (toolsItem.range) detailedData.range = toolsItem.range;
    if (toolsItem.ac) detailedData.ac = toolsItem.ac;
    if (toolsItem.bonusWeapon) detailedData.bonusWeapon = toolsItem.bonusWeapon;
    if (toolsItem.bonusAc) detailedData.bonusAc = toolsItem.bonusAc;
    if (toolsItem.bonusSpellAttack) detailedData.bonusSpellAttack = toolsItem.bonusSpellAttack;
    if (toolsItem.bonusSpellSaveDc) detailedData.bonusSavingThrow = toolsItem.bonusSpellSaveDc;
    if (toolsItem.charges) detailedData.charges = toolsItem.charges;
    if (toolsItem.recharge) detailedData.recharge = toolsItem.recharge;
    if (toolsItem.ability) detailedData.ability = toolsItem.ability;
    if (toolsItem.resist) detailedData.resist = toolsItem.resist;
    if (toolsItem.immune) detailedData.immune = toolsItem.immune;
    if (toolsItem.conditionImmune) detailedData.conditionImmune = toolsItem.conditionImmune;
    if (toolsItem.stealth) detailedData.stealth = toolsItem.stealth;

    const newItem = {
      id: toolsItem.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: toolsItem.name,
      type: typeMap[toolsItem.type] || 'wondrous item',
      rarity: rarityMap[toolsItem.rarity] || 'uncommon',
      requiresAttunement: !!toolsItem.reqAttune,
      source: toolsItem.source || 'DMG',
      detailedData
    };

    data.items.push(newItem);
    console.log(`✓ Restored: ${itemName} (${newItem.rarity}, ${newItem.type})`);
  } else {
    console.log(`✗ Could not find: ${itemName}`);
  }
}

console.log(`\nFinal items count: ${data.items.length}`);

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
console.log('\n✓ Successfully updated grand-bazaar-seoul.json');
