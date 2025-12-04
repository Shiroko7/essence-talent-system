#!/usr/bin/env python3

import re
import os
from pathlib import Path

def parse_tsx_abilities(content):
    """Parse abilities from TypeScript const array"""
    abilities = []

    # Find all object blocks within the array
    pattern = r'\{([^}]+)\}'
    matches = re.finditer(pattern, content, re.DOTALL)

    for match in matches:
        obj_content = match.group(1)
        ability = {}

        # Parse each property
        for line in obj_content.split('\n'):
            line = line.strip().rstrip(',')
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip().strip("'").strip('"')

                if key in ['isActive', 'isPassive', 'isSpell', 'isCantrip']:
                    ability[key] = value
                elif key in ['id', 'name', 'tier']:
                    ability[key] = value
                elif key == 'description':
                    ability[key] = value

        if 'id' in ability and 'name' in ability:
            abilities.append(ability)

    return abilities

def ability_to_markdown(ability):
    """Convert ability dict to markdown format"""
    name = ability.get('name', 'Unknown')
    id_val = ability.get('id', '')
    tier = ability.get('tier', 'initiate')
    desc = ability.get('description', '')
    is_active = ability.get('isActive', 'false')
    is_passive = ability.get('isPassive', 'false')
    is_spell = ability.get('isSpell', 'false')
    is_cantrip = ability.get('isCantrip', 'false')

    return f"""### {name}
```yaml
id: {id_val}
tier: {tier}
isActive: {is_active}
isPassive: {is_passive}
isSpell: {is_spell}
isCantrip: {is_cantrip}
```

{desc}

---
"""

def convert_essence_file(essence_name):
    """Convert a single essence TypeScript file to markdown"""

    # Read the TypeScript file
    tsx_path = Path(f'src/components/essences/consts/{essence_name}.tsx')
    if not tsx_path.exists():
        print(f"[ERROR] File not found: {tsx_path}")
        return

    content = tsx_path.read_text(encoding='utf-8')

    # Split into abilities, cantrips, and spells sections
    abilities_match = re.search(r'export const ' + essence_name + r'Abilities = \[(.*?)\];', content, re.DOTALL)
    cantrips_match = re.search(r'export const ' + essence_name + r'Cantrips = \[(.*?)\];', content, re.DOTALL)
    spells_match = re.search(r'export const ' + essence_name + r'Spells = \[(.*?)\];', content, re.DOTALL)

    abilities = []
    cantrips = []
    spells = []

    if abilities_match:
        abilities = parse_tsx_abilities(abilities_match.group(1))
    if cantrips_match:
        cantrips = parse_tsx_abilities(cantrips_match.group(1))
    if spells_match:
        spells = parse_tsx_abilities(spells_match.group(1))

    # Group abilities by tier
    tiers = {
        'initiate': [],
        'adept': [],
        'master': [],
        'grandmaster': [],
        'greatgrandmaster': [],
        'active': [],
    }

    for ability in abilities:
        tier = ability.get('tier', 'initiate')
        if tier in tiers:
            tiers[tier].append(ability)
        else:
            tiers['initiate'].append(ability)

    # Build markdown
    md = f"# {essence_name.capitalize()} Essence Abilities\n\n"

    # Write each tier
    tier_names = {
        'initiate': 'Initiate Tier',
        'adept': 'Adept Tier',
        'master': 'Master Tier',
        'grandmaster': 'Grandmaster Tier',
        'greatgrandmaster': 'Great Grandmaster Tier',
        'active': 'Active Tier',
    }

    for tier_key, tier_name in tier_names.items():
        if tiers[tier_key]:
            md += f"## {tier_name}\n\n"
            for ability in tiers[tier_key]:
                md += ability_to_markdown(ability) + "\n"

    # Write cantrips
    if cantrips:
        md += "## Cantrips\n\n"
        for cantrip in cantrips:
            md += ability_to_markdown(cantrip) + "\n"

    # Write spells
    if spells:
        md += "## Spells\n\n"
        for spell in spells:
            md += ability_to_markdown(spell) + "\n"

    # Write to file
    output_path = Path(f'data/essences/{essence_name}.md')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(md, encoding='utf-8')

    print(f"[OK] Created {essence_name}.md ({len(abilities)} abilities, {len(cantrips)} cantrips, {len(spells)} spells)")

# Convert all essences
essences = ['earth', 'metal', 'wood', 'poison', 'acid', 'lightning', 'air']

print("Converting TypeScript essence files to Markdown...\n")

for essence in essences:
    convert_essence_file(essence)

print("\n[SUCCESS] Conversion complete!")
