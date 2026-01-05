# Adding 5e.tools Item Data

This guide explains how to add detailed item data from 5e.tools to the merchant catalog.

## Overview

The merchant system supports two levels of item information:
1. **Basic data** (already in place): Name, rarity, type, price, etc.
2. **Detailed data** (optional): Full item descriptions, stats, abilities from 5e.tools

## Getting 5e.tools Data

### Option 1: Download from GitHub (Recommended)

1. Visit the [5e.tools source repository](https://github.com/5etools-mirror-3/5etools-src)
2. Navigate to the `data` folder
3. Download `items.json` and other item files (e.g., `items-base.json`)
4. The items are structured with fields like:
   - `name`: Item name
   - `rarity`: Common, uncommon, rare, etc.
   - `entries`: Array of description text/objects
   - `dmg1`: Damage dice (e.g., "1d8")
   - `dmg2`: Versatile damage
   - `ac`: Armor class
   - `bonusWeapon`: Attack/damage bonus
   - And many more...

### Option 2: Create a Fetch Script

You can create a Node.js script to fetch and match items:

```javascript
// scripts/fetch-5etools-data.js
const fs = require('fs');
const path = require('path');

// Download items.json from 5etools first
const toolsItems = require('./items.json'); // From 5etools repo

// Your merchant items
const forgeItems = require('../src/data/items/forge-of-seoul.json');

// Match and add detailed data
forgeItems.items = forgeItems.items.map(item => {
  // Find matching item in 5etools data by name
  const toolsItem = toolsItems.item.find(t =>
    t.name.toLowerCase() === item.name.toLowerCase()
  );

  if (toolsItem) {
    return {
      ...item,
      detailedData: {
        entries: toolsItem.entries,
        dmg1: toolsItem.dmg1,
        dmg2: toolsItem.dmg2,
        dmgType: toolsItem.dmgType,
        range: toolsItem.range,
        ac: toolsItem.ac,
        bonusWeapon: toolsItem.bonusWeapon,
        bonusAc: toolsItem.bonusAc,
        // Add other fields as needed
      }
    };
  }

  return item;
});

// Save updated file
fs.writeFileSync(
  path.join(__dirname, '../src/data/items/forge-of-seoul.json'),
  JSON.stringify(forgeItems, null, 2)
);
```

## Manual Addition

For individual items, you can manually add the `detailedData` field:

```json
{
  "id": "sun-blade",
  "name": "Sun Blade",
  "rarity": "rare",
  "type": "weapon",
  "requiresAttunement": true,
  "properties": {
    "weaponType": "martial melee",
    "properties": ["finesse", "versatile"]
  },
  "toolsUrl": "https://5e.tools/items.html#sun%20blade_xdmg",
  "source": "DMG",
  "detailedData": {
    "entries": [
      "This item appears to be a longsword hilt. While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear.",
      "While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with the sun blade.",
      "You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage.",
      "When you hit an undead with it, that target takes an extra 1d8 radiant damage.",
      "The sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each."
    ],
    "dmg1": "1d8",
    "dmg2": "1d10",
    "dmgType": "R",
    "bonusWeapon": "+2"
  }
}
```

## Field Reference

Common `detailedData` fields:

- `entries`: Array of description paragraphs (strings or objects)
- `dmg1`: Primary damage dice (e.g., "1d8")
- `dmg2`: Versatile damage dice
- `dmgType`: Damage type code (S=slashing, P=piercing, B=bludgeoning, R=radiant, etc.)
- `range`: Weapon range (e.g., "80/320")
- `ac`: Base armor class
- `bonusWeapon`: Attack/damage bonus (e.g., "+1", "+2")
- `bonusAc`: AC bonus
- `bonusSpellAttack`: Spell attack bonus
- `bonusSavingThrow`: Save DC bonus
- `charges`: Number of charges
- `recharge`: How charges recharge (e.g., "dawn")
- `ability`: Object with ability score bonuses (e.g., `{"str": 2, "con": 1}`)
- `resist`: Array of damage resistances
- `immune`: Array of damage immunities
- `conditionImmune`: Array of condition immunities
- `stealth`: Boolean for stealth disadvantage

## Current Status

Currently, the Forge of Seoul items have basic data only. The detailed data fields are optional - items will display correctly with or without them.

To add full descriptions and stats:
1. Download the 5e.tools data
2. Match items by name
3. Add the `detailedData` field to each item in `forge-of-seoul.json`
