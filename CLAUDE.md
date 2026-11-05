# CLAUDE.md

## After changing abilities

Whenever you change an ability (anything under `data/essences/` or `data/cultivation/v2/`), run:

```bash
bun run generate:all
```

This regenerates the TypeScript consts and the changelog from the markdown and validates the V2 roster. Never edit the generated files in `src/components/essences/consts/` or `src/components/cultivation/consts/v2/` by hand.

## Design references

Before designing or changing cultivation abilities, read:

- [`docs/cultivation-paths-design.md`](docs/cultivation-paths-design.md): technique design rules, path boundaries, and facets.
- [`docs/domain-expansion-design.md`](docs/domain-expansion-design.md): Domain Expansions, restores, and domain-bound techniques.
- [`data/cultivation/README.md`](data/cultivation/README.md): the markdown format, tags, facets, and how saved builds migrate when an ability moves path or tier.

When an ability moves to another path or tier, keep its ID and add it to `MOVED_TALENT_IDS` or `RETIERED_TALENT_IDS` in `src/utils/cultivationUtils.ts`, so saved builds are re-checked automatically. Record player-facing changes in the current patch notes under `src/data/patchNotes/`.
