# Cultivation paths

The canonical catalog intended for V2 groups campaign-relevant paths into **Primordial**, **Divine**, and **Human** families. Markdown under `v2/` is the source of truth; `bun run generate:cultivation` builds the TypeScript modules and checks the roster. Family sizes are intentionally uneven. The pre-redesign sixteen-path source is retained in [`archive/v2.2/`](archive/v2.2/) for reference.

Each named spell or cantrip belongs to exactly one path. The generator rejects duplicate spell and cantrip titles and duplicate ability IDs. Spellcasting paths need at least one cantrip and one leveled spell; Heart is explicitly marked as a custom-talent path without a spell list.

The catalog contains 198 custom talents (133 active and 65 passive), 39 cantrips, and 137 leveled spells, for 374 entries. Path totals range from 15 to 37 entries. These counts measure available choices; they do not rate mechanical power.

| Family | Path | Active / passive | Cantrips | Spells | Total |
| --- | --- | ---: | ---: | ---: | ---: |
| Primordial | Wood | 5 / 5 | 4 | 9 | 23 |
| Primordial | Fire | 5 / 4 | 4 | 9 | 22 |
| Primordial | Earth | 6 / 9 | 2 | 7 | 24 |
| Primordial | Metal | 11 / 1 | 2 | 6 | 20 |
| Primordial | Water | 7 / 5 | 3 | 8 | 23 |
| Primordial | Sky | 12 / 4 | 4 | 10 | 30 |
| Divine | Lunar | 6 / 1 | 1 | 10 | 18 |
| Divine | Love | 3 / 0 | 2 | 10 | 15 |
| Divine | Ruin | 11 / 3 | 4 | 10 | 28 |
| Divine | Pestilence | 9 / 4 | 2 | 11 | 26 |
| Divine | Shadow | 6 / 6 | 1 | 13 | 26 |
| Divine | Tempest | 5 / 2 | 1 | 13 | 21 |
| Divine | Providence | 8 / 2 | 5 | 14 | 29 |
| Human | Alchemy | 16 / 11 | 3 | 7 | 37 |
| Human | Heart | 23 / 8 | 1 | 0 | 32 |

## Path boundaries

- **Sky and Tempest:** Sky governs local air, pressure, flight, sound carried through air, and direct lightning. Tempest governs weather systems, storm fronts, rain, thunder, and dangerous seas.
- **Alchemy and Pestilence:** Alchemy transforms and refines substances, including acids and medicines. Pestilence governs biological toxins, disease, contagion, curses, and resistance to them.
- **Lunar and Shadow:** Lunar covers Selûne’s moon, stars, navigation, dreams, reflection, and celestial foresight. Shadow covers Shar’s darkness, concealment, absence, and the Shadow Weave. Neither path absorbs the other.
- **Love and Providence:** Love concerns affection, attraction, beauty, devotion, and emotional bonds. Providence concerns healing, protection, endurance, hope, sacrifice, and freedom from restraint.
- **Love and Heart:** Love is about bonds between people. Heart is personal discipline made physical through martial arts, unarmed practice, weapon technique, and trained movement. Techniques may channel Essence without becoming spells.
- **Human paths:** Alchemy is a learned craft of formulas and material transformation, so it stays distinct from the Primordial and Divine families. Its alchemical spells remain with Alchemy. Heart contains Stone Fist I–V (d4 through d12), the three sequential Radiant Vein Blade forms, and other martial talents, along with True Strike as an exceptional strike cantrip; it has no leveled spells.
- **Heart and Shadow:** Netherdark Fist stays in Shadow because its defining theme is void and darkness, despite its martial form. Heart holds techniques whose defining identity is embodied martial discipline.
- **Ruin:** Murder, assassination, pain, deception, and thievery share one portfolio. There is no separate Pain path; Loviatar’s suffering-based talents are assigned here.
- **Wood:** Wood focuses on plants and growth. Animal-shaping and broadly druidic spells were pruned so Wood would not become a catch-all nature path.

Sun is not a separate path in this model. Explicitly solar spells were left out instead of being placed under Lunar. The retained Flame Strike belongs to Fire, while Crown of Stars belongs to Lunar. General occult-knowledge spells without a clear fit were also pruned rather than gathered under a catch-all path.

The former Void label is now **Shadow**, matching Shar’s darkness and shadow portfolio. The former Moon label is now **Lunar**, broad enough to include Selûne’s stars, navigation, cycles, dreams, and prophecy.

## Sources and saved builds

The 5e spell entries link to 5e.tools and include concise effect summaries with their source. Existing campaign abilities retain their authors and locations. The current cultivation build uses the shared Essence budget. It reconciles saved V2.3 configurations by surviving ability IDs, resets path-specific active Essence trackers, and shows a notice for retired selections.

Run `bun run generate:cultivation` to validate and regenerate the catalog. `bun run build` runs the complete project generation and production build.
