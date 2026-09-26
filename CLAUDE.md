# CLAUDE.md

## After changing abilities

Whenever you change an ability (anything under `data/essences/` or `data/cultivation/v2/`), run:

```bash
bun run generate:all
```

This regenerates the TypeScript consts and the changelog from the markdown and validates the V2 roster. Never edit the generated files in `src/components/essences/consts/` or `src/components/cultivation/consts/v2/` by hand.
