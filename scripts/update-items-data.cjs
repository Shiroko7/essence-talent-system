const fs = require('fs');
const path = require('path');

// Load 5etools data (downloaded to scripts/5etools-data/items.json)
const toolsDataPath = path.join(__dirname, '5etools-data/items.json');
if (!fs.existsSync(toolsDataPath)) {
  console.error('Please download 5etools data first!');
  console.error('Run: curl -o scripts/5etools-data/items.json https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/master/data/items.json');
  process.exit(1);
}

const toolsData = JSON.parse(fs.readFileSync(toolsDataPath, 'utf8'));
let allToolsItems = toolsData.item;

// Load additional item sources
const additionalSources = [
  { path: '5etools-data/items-base.json', name: 'Base Items' },
  { path: '5etools-data/griffon-items.json', name: 'Griffon\'s Saddlebag' },
  { path: '5etools-data/griffon-book2.json', name: 'Griffon\'s Saddlebag Book 2' },
];

additionalSources.forEach(source => {
  const sourcePath = path.join(__dirname, source.path);
  if (fs.existsSync(sourcePath)) {
    const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    if (sourceData.item) {
      allToolsItems = allToolsItems.concat(sourceData.item);
      console.log(`Added ${sourceData.item.length} items from ${source.name}`);
    } else if (sourceData.baseitem) {
      allToolsItems = allToolsItems.concat(sourceData.baseitem);
      console.log(`Added ${sourceData.baseitem.length} items from ${source.name}`);
    }
  }
});

// Load manual overrides for items not in 5etools
const manualOverridesPath = path.join(__dirname, 'manual-item-overrides.json');
const manualOverrides = fs.existsSync(manualOverridesPath)
  ? JSON.parse(fs.readFileSync(manualOverridesPath, 'utf8'))
  : {};

console.log(`Loaded ${allToolsItems.length} items from 5etools`);

// Get all merchant inventory files
const itemsDir = path.join(__dirname, '../src/data/items');
const inventoryFiles = fs.readdirSync(itemsDir).filter(f => f.endsWith('.json'));

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

// Type mapping
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
  'SCF': 'wondrous item', // Spellcasting focus
  'G': 'adventuring gear',
  'SHP': 'ship',
  'VEH': 'vehicle',
  '$': 'other'
};

// Helper to normalize names for matching
function normalizeName(name) {
  return name.toLowerCase()
    .replace(/'/g, "'")
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Process each merchant inventory file
inventoryFiles.forEach(fileName => {
  console.log(`\nProcessing ${fileName}...`);

  const filePath = path.join(itemsDir, fileName);
  const merchantData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let matched = 0;
  let removed = [];

  // Update each item (and filter out unmatched items without overrides)
  merchantData.items = merchantData.items.map(item => {
  const normalizedName = normalizeName(item.name);

  // Helper to check if item is magical (not a base weapon/armor)
  const isMagical = (t) => {
    return t.rarity && t.rarity !== 'none' && t.rarity !== 'unknown';
  };

  // Try to find exact match first (magical items only)
  let toolsItem = allToolsItems.find(t => normalizeName(t.name) === normalizedName && isMagical(t));

  // If not found, try variant matching (e.g., "Moon-Touched Longsword" -> "Moon-Touched Sword")
  if (!toolsItem) {
    // Extract base name by removing weapon/armor type suffixes
    const weaponTypes = ['longsword', 'shortsword', 'greatsword', 'scimitar', 'rapier', 'longbow', 'shortbow',
                         'hand crossbow', 'heavy crossbow', 'light crossbow', 'light repeating crossbow',
                         'double-bladed scimitar', 'half plate armor', 'plate armor', 'leather armor',
                         'padded armor', 'studded leather armor'];

    for (const weaponType of weaponTypes) {
      if (normalizedName.endsWith(weaponType)) {
        const baseName = normalizedName.replace(new RegExp(`\\s*${weaponType}$`), '').trim();
        // Try matching with just the base name (magical items only)
        toolsItem = allToolsItems.find(t => {
          if (!isMagical(t)) return false;
          const toolName = normalizeName(t.name);
          return toolName === baseName || toolName === `${baseName} sword` || toolName === `${baseName} weapon`;
        });
        if (toolsItem) break;
      }
    }
  }

  // If still not found, try partial match (only if it's a strong match - magical items only)
  if (!toolsItem) {
    // Only do partial match if the names share significant content
    toolsItem = allToolsItems.find(t => {
      if (!isMagical(t)) return false;
      const toolName = normalizeName(t.name);
      // Check if one name contains the other and they share at least 70% of the shorter name
      const shorter = normalizedName.length < toolName.length ? normalizedName : toolName;
      const longer = normalizedName.length < toolName.length ? toolName : normalizedName;
      if (longer.includes(shorter) && shorter.length >= 5) {
        return true;
      }
      return false;
    });
  }

  if (toolsItem) {
    matched++;
    console.log(`✓ Matched: ${item.name} -> ${toolsItem.name} (${toolsItem.rarity}, ${typeMap[toolsItem.type] || toolsItem.type})`);

    // Extract detailed data
    const detailedData = {
      entries: toolsItem.entries || [],
    };

    // Add optional fields if they exist
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

    return {
      ...item,
      rarity: rarityMap[toolsItem.rarity] || item.rarity,
      type: typeMap[toolsItem.type] || item.type,
      requiresAttunement: !!toolsItem.reqAttune,
      source: toolsItem.source || item.source,
      detailedData
    };
  } else {
    // Check if there's a manual override for this item
    const override = manualOverrides[item.name];
    if (override) {
      console.log(`📝 Manual override: ${item.name}`);
      return {
        ...item,
        ...override,
        source: override.source, // Don't preserve old source
        detailedData: override.detailedData || { entries: [] }
      };
    } else {
      removed.push(item.name);
      console.log(`🗑️  REMOVED: ${item.name} (not found in 5etools)`);
      return null; // Mark for removal
    }
  }
  }).filter(item => item !== null); // Remove items marked as null

  const totalProcessed = matched + removed.length;

  console.log(`\n=== Summary ===`);
  console.log(`Matched: ${matched}/${totalProcessed}`);
  console.log(`Removed (not found): ${removed.length}/${totalProcessed}`);

  if (removed.length > 0) {
    console.log('\n🗑️  Removed items (not found in 5etools):');
    removed.forEach(name => console.log(`  - ${name}`));
  }

  // Remove items without descriptions
  const itemsBeforeFilter = merchantData.items.length;
  merchantData.items = merchantData.items.filter(item => {
    const hasDescription = item.detailedData &&
                          item.detailedData.entries &&
                          item.detailedData.entries.length > 0;
    if (!hasDescription) {
      console.log(`🗑️  REMOVED (no description): ${item.name}`);
      removed.push(item.name);
    }
    return hasDescription;
  });

  const removedNoDesc = itemsBeforeFilter - merchantData.items.length;
  if (removedNoDesc > 0) {
    console.log(`\nRemoved ${removedNoDesc} items with no descriptions`);
  }

  console.log(`\n📦 Final item count: ${merchantData.items.length}`);

  // Save updated file
  fs.writeFileSync(filePath, JSON.stringify(merchantData, null, 2));
  console.log(`✓ Updated file saved to: ${filePath}`);
});
