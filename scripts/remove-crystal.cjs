const fs = require('fs');
const path = require('path');

const forgeDataPath = path.join(__dirname, '../src/data/items/forge-of-seoul.json');
const forgeData = JSON.parse(fs.readFileSync(forgeDataPath, 'utf8'));

const before = forgeData.items.length;
forgeData.items = forgeData.items.filter(i => i.id !== 'crystal-double-bladed-scimitar');
const after = forgeData.items.length;

fs.writeFileSync(forgeDataPath, JSON.stringify(forgeData, null, 2));
console.log(`Removed Crystal Double-Bladed Scimitar. Count: ${before} -> ${after}`);
