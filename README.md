# Essence Talent System

A browsable reference for a homebrew D&D 5e cultivation system (the Essence
Dao), plus the merchant and potion catalogues that go with the campaign.

The campaign's rules live in an Obsidian vault, published at
[publish.obsidian.md/leatrux](https://publish.obsidian.md/leatrux/). This app is
the interactive half: players plan their build here instead of reading
ability lists page by page.

Later ported into Baldur's Gate 3 as a playable mod:
[essence-dao-bg3](https://github.com/Shiroko7/essence-dao-bg3).

## The system

Essence is a second resource that runs parallel to spell slots rather than
replacing them. Abilities are grouped into paths and laid out across tiers:

```
initiate → adept → master → grandmaster → great grandmaster
```

plus cantrips and levelled spells. Abilities are tagged active / passive /
spell / cantrip, and the app filters and cross-references them so a player can
answer "what can I actually do at adept fire" without scrolling a document.

There are two versions. **V1** (`/`) is the original: nine elemental essences
(**acid, air, earth, fire, lightning, metal, poison, water, wood**), one Essence
pool each. **V2** (`/v2`) replaces them with sixteen cultivation paths, below.

## Cultivation paths

`/v2` contains the canonical campaign-focused catalog for V2: six Primordial
foundations (Wood, Fire, Earth, Metal, Water, and Sky), seven Divine portfolios
(Lunar, Love, Ruin, Pestilence, Shadow, Tempest, and Providence), and three
Immortal paths (Alchemy, Heart, and Mysteries). Each family shares one Essence
pool: every path in it adds to the pool, and any learned ability in the family
spends from it. The older nine-element tree, with one pool per essence, remains
at `/`.

Each spell and cantrip has one path owner. Markdown is the source of truth, and
`bun run generate:cultivation` checks unique spell ownership. Spellcasting paths
have cantrips and leveled spells; Heart is a martial-talent path with True Strike as an exception cantrip and no leveled spells.
The full roster and balance table live in [data/cultivation](data/cultivation/README.md).

## Markdown is the single source of truth

The design decision worth talking about. Every ability lives in a markdown file,
one per path: V1 essences under `data/essences/`, V2 paths under
`data/cultivation/v2/`. Each ability has a YAML block:

~~~~markdown
### Ability Name
```yaml
id: essence_tier_ability_name
tier: adept
isActive: true
isPassive: false
```

Description text, multiple paragraphs if needed.
---
~~~~

`bun run generate:essences` and `bun run generate:cultivation` compile those into
TypeScript consts under `src/components/essences/consts/` and
`src/components/cultivation/consts/v2/`. The consts are committed, but they are
build output: never edit them by hand, since every build regenerates them from
the markdown.

This matters because the content is edited far more often than the code. Game
balance changes constantly; React components do not. Keeping abilities in
markdown means a balance pass is a diff you can actually read in a pull request,
rather than a wall of changed JSX — and it means the data could be retargeted
somewhere else entirely. Which is exactly what happened when it became a BG3
mod.

The changelog is generated the same way, straight from git history
(`scripts/generate-changelog.js`), so "what changed since last session" is
answered by the repo rather than by memory.

## Also in here

- **Merchants** — catalogue pages with per-merchant inventories, built on
  5etools item data with a manual override layer for homebrew items and
  corrections.
- **Potions** — the alchemy reference, including essence-pair combinations.
- **Changelog** — auto-generated, so players can see what was rebalanced.
- **Patch notes** (`/patch-notes`) — the V1 → V2 overhaul, written for players.
- **Rules** (`/rules`) — Attunement: Elemental (Primordial), Portfolio (Divine),
  and Dao (Immortal).
- **Migration guide** (`/v2/migration`) — what happened to each ability of a
  player's V1 character when it was carried into V2.

## Running it

```bash
bun install
bun run dev
```

```bash
bun run generate:essences    # V1 markdown → TS consts
bun run generate:cultivation # V2 markdown → TS consts, validates the roster
bun run generate:changelog   # git history → changelog data
bun run generate:all
bun run build                # runs generate:all, then builds
```

Deploys to Netlify (`netlify.toml`); build is `bun run build`, publish `dist`.

## Stack

Bun, React 19 + TypeScript, Vite, Tailwind. Static site — all data is baked in
at build time, there is no backend and no database.

## Honest limitations

- The generator is a markdown parser held together by conviction. Malformed YAML
  in an ability block fails at build time rather than being validated with a
  schema, and the error message will not be kind to you.
- No tests.
- Merchant item data is a snapshot with a hand-maintained override list. Several
  of the scripts in `scripts/` are one-off data surgery from past migrations
  (`remove-crystal.cjs`, `restore-and-remove-items.cjs`) and are kept only
  because they document what was done to the dataset.
- Balance is playtested by exactly one table, so treat the numbers as a starting
  point.

## See also

- [Cultivation paths design](docs/cultivation-paths-design.md) — the Primordial, Divine, and Immortal families and path boundaries.
- [ADDING_ITEM_DATA.md](ADDING_ITEM_DATA.md) — how to extend the merchant catalogue.
- [data/essences/README.md](data/essences/README.md) — the ability markdown format in full.
