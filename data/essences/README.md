# Essence Data - Single Source of Truth

This directory contains the markdown files that serve as the **single source of truth** for all essence abilities, cantrips, and spells.

## How It Works

1. **Edit markdown files** in this directory (e.g., `fire.md`, `water.md`)
2. **Run the generator**: `npm run generate:essences`
3. TypeScript files are auto-generated in `src/components/essences/consts/`
4. The generated `.tsx` files are ignored by git (they're build artifacts)

## Markdown Format

Each ability follows this structure:

```markdown
### Ability Name
\`\`\`yaml
id: essence_tier_ability_name
tier: initiate | adept | master | grandmaster | greatgrandmaster | cantrip | 1st | 2nd | 3rd | etc.
isActive: true | false
isPassive: true | false
isSpell: true | false
isCantrip: true | false
\`\`\`

Description text goes here. You can write multiple paragraphs if needed.

---
```

The `---` separator is important - it separates abilities from each other.

## File Structure

Each essence has its own markdown file:
- `fire.md`
- `water.md`
- `earth.md`
- `metal.md`
- `wood.md`
- `poison.md`
- `acid.md`
- `lightning.md`
- `air.md` (maps to 'wind' in the app)

## Workflow

### Adding a new ability

1. Open the appropriate essence file (e.g., `fire.md`)
2. Add a new section under the appropriate tier heading
3. Follow the format above
4. Run `npm run generate:essences`
5. Test your changes

### Rebalancing abilities

1. Edit the description or metadata in the markdown file
2. Run `npm run generate:essences`
3. The TypeScript files will be regenerated

### Build Process

The generation script runs automatically during `npm run build`, so you don't need to remember to run it before building. However, you should run it manually during development:

```bash
npm run generate:essences
```

## Benefits

- **Single source of truth**: Edit markdown, everything stays in sync
- **Easy rebalancing**: Just edit text, no code changes needed
- **Version control friendly**: Markdown diffs are easy to read
- **No duplication**: No need to maintain separate notes and code
- **Type safety**: Generated TypeScript still provides type checking in the app

## Tips

- Use your preferred markdown editor or note-taking app
- The markdown files can include additional notes or comments outside of ability sections
- Make sure to keep the YAML format consistent (the parser is simple)
- Run the generator after each edit to verify it parses correctly
