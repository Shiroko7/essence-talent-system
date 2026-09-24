# Cultivation path structure

The active redesign uses **two families of seven**. Primordial paths describe foundations of the material world; Divine paths describe deity portfolios that shape how people experience that world.

| Primordial | Divine |
| --- | --- |
| Wood | Lunar (Selûne) |
| Fire | Love (Sune) |
| Earth | Ruin (Bhaal, Cyric, Loviatar) |
| Metal | Pestilence (Talona) |
| Water | Shadow (Shar) |
| Sky | Tempest (Umberlee) |
| Alchemy | Providence (Ilmater) |

This structure keeps the five classical elements, gives air and lightning a single Primordial home under Sky, and treats Alchemy as a principle of transformation. The Divine family keeps the portfolios most important to the setting. Pain is part of Ruin; poison, disease, and curses are part of Pestilence. A generic knowledge or magic path was not added, and abilities without a clean home were pruned.

## Boundaries

- **Sky and Tempest:** Sky shapes local air, pressure, flight, sound carried through air, and direct lightning. Tempest commands weather systems: rain, storm fronts, thunder, and violent seas. A lightning bolt is Sky; a storm raised over an area is Tempest.
- **Earth and Metal:** Earth governs mass, stone, soil, terrain, and stability. Metal governs ore, metal objects, magnetism, weapons, armor, and refinement.
- **Alchemy and Pestilence:** Alchemy changes substances through formulas, acids, medicines, and refinement. Pestilence afflicts living bodies through poison, disease, contagion, and curses, and includes resistance or remedies tied directly to those afflictions.
- **Lunar and Shadow:** Lunar is Selûne’s moonlight, stars, cycles, navigation, dreams, reflection, and celestial foresight. Shadow is Shar’s darkness, concealment, absence, and Shadow Weave. They remain separate; the model does not combine Light and Void as a twilight portfolio.
- **Love and Providence:** Love is affection, beauty, attraction, devotion, empathy, and emotional bonds. Providence is protection, healing, endurance, hope, sacrifice, and liberation from debilitating bonds.
- **Ruin:** Murder, assassination, pain, deception, and thievery are deliberate forms of destruction and belong together. Loviatar’s pain abilities were moved here; there is no standalone Pain path.
- **Wood:** Wood is plants, roots, forests, and growth. It does not collect every animal, weather, or healing spell with a natural flavor; those entries were pruned or assigned to a clearer path.

## Portfolio decisions

The Moon label became **Lunar** because Selûne’s scope includes stars, navigation, cycles, dreams, and prophecy alongside moonlight. **Shadow** replaces Void to name Shar’s darkness and concealment directly. **Providence** keeps Ilmater’s endurance, care, freedom, and healing together. The seven Divine paths intentionally omit a separate Sun portfolio in this version. Solar spells were not assigned to Lunar; a few that fit another path by their actual effect were kept there, such as Flame Strike under Fire.

The archived sixteen-path source remains under [`data/cultivation/archive/v2.2/`](../data/cultivation/archive/v2.2/). Entries from retired Life, Death, Mystery, Sun, Torment, and Void groupings were reassigned only when their effect fit one of the active portfolios. Generic divination and magic spells without a clear fit were removed. The catalog intentionally does not preserve every legacy entry.

## Balance and implementation

The current roster has 152 custom talents (94 active, 58 passive), 39 cantrips, and 137 leveled spells. Its path totals range from 14 to 28 entries; the detailed table is in [`data/cultivation/README.md`](../data/cultivation/README.md). The lower totals belong to focused portfolios such as Love and Tempest, while Ruin and Providence cover wider sets of effects. Counts help expose where choices concentrate; they do not measure power. Review damage, control, defense, healing, mobility, and action economy in play.

Source Markdown lives in `data/cultivation/v2/`; `scripts/generate-cultivation.js` enforces unique IDs and one owner per spell/cantrip, and checks that every path has both kinds of spell entry. Path labels, families, colors, and descriptions live in `src/types/cultivation.ts`. The `/v2` page uses a separate seven-plus-seven local-save key and reconciles older V2.3 selections by stable ability IDs.
