# Scripts Documentation

## Item Data Management

### Updating 5e.tools Item Data

The merchant catalog uses data from 5e.tools. To update item data:

#### 1. Download 5e.tools Reference Data (One-time setup)

```bash
# Create directory for 5etools data (gitignored)
mkdir -p scripts/5etools-data

# Download official D&D items
curl -o scripts/5etools-data/items.json https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/master/data/items.json

# Download base weapons/armor
curl -o scripts/5etools-data/items-base.json https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/master/data/items-base.json

# Download Griffon's Saddlebag homebrew items
curl -o scripts/5etools-data/griffon-items.json "https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/item/griff-mac%3B%20The%20Griffon's%20Saddlebag.json"
curl -o scripts/5etools-data/griffon-book2.json "https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/collection/Griffin%20Macaulay%3B%20The%20Griffon's%20Saddlebag%2C%20Book%202.json"
```

#### 2. Match Items with 5e.tools Data

```bash
bun scripts/update-items-data.cjs
```

This script will:
- Match items by name with 5e.tools database
- Extract rarities, descriptions, and stats
- Apply manual overrides for items not in 5e.tools
- Show summary of matched/unmatched items

### Manual Overrides

For items that don't exist in 5e.tools, add them to `scripts/manual-item-overrides.json`:

```json
{
  "Item Name": {
    "rarity": "rare",
    "type": "weapon",
    "requiresAttunement": true,
    "detailedData": {
      "entries": [
        "Item description here."
      ],
      "dmg1": "1d8",
      "dmgType": "S"
    }
  }
}
```

### File Structure

```
scripts/
├── 5etools-data/          # Gitignored - 5e.tools reference data
│   ├── items.json         # Official D&D items
│   ├── items-base.json    # Base weapons/armor
│   ├── griffon-items.json # Griffon's Saddlebag items
│   └── griffon-book2.json # Griffon's Saddlebag Book 2
├── manual-item-overrides.json  # Manual data for items not in 5e.tools
└── update-items-data.cjs       # Script to match items with 5e.tools
```

### Troubleshooting

**Items not matching?**
- Verify the item exists in 5e.tools
- Check the URL provided in the item data
- Add manual override if it's a custom/homebrew item

**Wrong rarity/type?**
- Update the manual override in `manual-item-overrides.json`
- Re-run the update script

**Missing descriptions?**
- Item might be a variant not in 5e.tools
- Add description in manual override file
