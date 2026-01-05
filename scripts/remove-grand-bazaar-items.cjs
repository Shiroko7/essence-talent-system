const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/items/grand-bazaar-seoul.json');

// Items to remove (specified by user)
const itemsToRemove = [
  'Blod Stone',
  'Chromatic Rose',
  'Cube of Summoning',
  'Deathloop Watch',
  'Egg of Primal Water',
  'Eversmoking Bottle',
  'Evoker\'s Exchange',
  'Gruul Keyrune',
  'Helm of the Platinum Dragon',
  'Homeroot',
  'Lady Phantasma\'s Material Anchor',
  'Mirror of Reflected Pasts',
  'Netherese Ring of Protection',
  'Night Caller'
];

// Read the file
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

console.log(`Total items before removal: ${data.items.length}`);

// Remove specified items
let removedCount = 0;
data.items = data.items.filter(item => {
  const shouldRemove = itemsToRemove.includes(item.name);
  if (shouldRemove) {
    console.log(`Removing: ${item.name}`);
    removedCount++;
  }
  return !shouldRemove;
});

console.log(`Removed ${removedCount} specified items`);
console.log(`Items remaining: ${data.items.length}`);

// Get 10 random items to remove (excluding the ones we already removed)
const remainingItems = [...data.items];
const randomItemsToRemove = [];

for (let i = 0; i < 10 && remainingItems.length > 0; i++) {
  const randomIndex = Math.floor(Math.random() * remainingItems.length);
  const randomItem = remainingItems.splice(randomIndex, 1)[0];
  randomItemsToRemove.push(randomItem.name);
}

console.log('\nRemoving 10 random items:');
randomItemsToRemove.forEach(name => console.log(`  - ${name}`));

// Remove the random items
data.items = data.items.filter(item => !randomItemsToRemove.includes(item.name));

console.log(`\nTotal items after all removals: ${data.items.length}`);

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

console.log('\nSuccessfully updated grand-bazaar-seoul.json');
