# Cultivation paths

The active catalog is **seven Primordial paths plus seven Divine portfolios**. Markdown under `v2/` is the source of truth; `bun run generate:cultivation` builds the TypeScript modules and checks the roster. The pre-redesign sixteen-path source is retained in [`archive/v2.2/`](archive/v2.2/) for reference.

Each named spell or cantrip belongs to exactly one path. The generator rejects duplicate spell and cantrip titles, duplicate ability IDs, and any path without at least one cantrip and one leveled spell.

The catalog contains 152 custom talents (94 active and 58 passive), 39 cantrips, and 137 leveled spells, for 328 entries. Path totals range from 14 to 28 entries. These counts measure available choices; they do not rate mechanical power.

| Family | Path | Active / passive | Cantrips | Spells | Total |
| --- | --- | ---: | ---: | ---: | ---: |
| Primordial | Wood | 5 / 7 | 4 | 9 | 25 |
| Primordial | Fire | 7 / 4 | 4 | 9 | 24 |
| Primordial | Earth | 6 / 11 | 2 | 7 | 26 |
| Primordial | Metal | 11 / 2 | 3 | 8 | 24 |
| Primordial | Water | 8 / 7 | 3 | 8 | 26 |
| Primordial | Sky | 10 / 3 | 4 | 8 | 25 |
| Primordial | Alchemy | 6 / 9 | 3 | 6 | 24 |
| Divine | Lunar | 5 / 0 | 2 | 13 | 20 |
| Divine | Love | 2 / 0 | 1 | 11 | 14 |
| Divine | Ruin | 10 / 3 | 5 | 10 | 28 |
| Divine | Pestilence | 9 / 3 | 2 | 11 | 25 |
| Divine | Shadow | 5 / 6 | 1 | 11 | 23 |
| Divine | Tempest | 2 / 1 | 1 | 14 | 18 |
| Divine | Providence | 8 / 2 | 4 | 12 | 26 |

## Path boundaries

- **Sky and Tempest:** Sky governs local air, pressure, flight, sound carried through air, and direct lightning. Tempest governs weather systems, storm fronts, rain, thunder, and dangerous seas.
- **Alchemy and Pestilence:** Alchemy transforms and refines substances, including acids and medicines. Pestilence governs biological toxins, disease, contagion, curses, and resistance to them.
- **Lunar and Shadow:** Lunar covers Selûne’s moon, stars, navigation, dreams, reflection, and celestial foresight. Shadow covers Shar’s darkness, concealment, absence, and the Shadow Weave. Neither path absorbs the other.
- **Love and Providence:** Love concerns affection, attraction, beauty, devotion, and emotional bonds. Providence concerns healing, protection, endurance, hope, sacrifice, and freedom from restraint.
- **Ruin:** Murder, assassination, pain, deception, and thievery share one portfolio. There is no separate Pain path; Loviatar’s suffering-based talents are assigned here.
- **Wood:** Wood focuses on plants and growth. Animal-shaping and broadly druidic spells were pruned so Wood would not become a catch-all nature path.

Sun is not a separate path in this model. Explicitly solar spells were left out instead of being placed under Lunar. The retained Flame Strike belongs to Fire, while Crown of Stars belongs to Lunar. General occult-knowledge spells without a clear fit were also pruned rather than gathered under a catch-all path.

The former Void label is now **Shadow**, matching Shar’s darkness and shadow portfolio. The former Moon label is now **Lunar**, broad enough to include Selûne’s stars, navigation, cycles, dreams, and prophecy.

## Sources and saved builds

The 5e spell entries link to 5e.tools and include concise effect summaries with their source. Existing campaign abilities retain their authors and locations. The current cultivation build uses the shared Essence budget. It reconciles saved V2.3 configurations by surviving ability IDs, resets path-specific active Essence trackers, and shows a notice for retired selections.

Run `bun run generate:cultivation` to validate and regenerate the catalog. `bun run build` runs the complete project generation and production build.
