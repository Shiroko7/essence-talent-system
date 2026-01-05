const fs = require('fs');
const path = require('path');

const forgeDataPath = path.join(__dirname, '../src/data/items/forge-of-seoul.json');
const forgeData = JSON.parse(fs.readFileSync(forgeDataPath, 'utf8'));

const noDesc = forgeData.items.filter(item =>
  !item.detailedData ||
  !item.detailedData.entries ||
  item.detailedData.entries.length === 0
);

console.log(`Items with no description (${noDesc.length}):`);
noDesc.forEach(item => console.log(`  - ${item.name}`));
