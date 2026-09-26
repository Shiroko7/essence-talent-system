# Cultivation paths

The canonical catalog intended for V2 groups campaign-relevant paths into **Primordial**, **Divine**, and **Immortal** families. Markdown under `v2/` is the source of truth; `bun run generate:cultivation` builds the TypeScript modules and checks the roster. Family sizes are intentionally uneven. Each family shares one Essence pool: every learned path in it adds to the pool, and any learned ability in the family can spend from it. Tier prerequisites still apply per path. The family's internal ID stays `human` for the Immortal family, so saved builds keep loading. The pre-redesign sixteen-path source is retained in [`archive/v2.2/`](archive/v2.2/) for reference.

Each named spell or cantrip belongs to exactly one path. The generator rejects duplicate spell and cantrip titles and duplicate ability IDs. Spellcasting paths need at least one cantrip and one leveled spell; Heart is explicitly marked as a custom-talent path without a spell list.

The catalog contains 202 custom talents (136 active and 66 passive), 39 cantrips, and 336 leveled spells, for 577 entries. Path totals range from 23 to 49 entries. These counts measure available choices; they do not rate mechanical power.

| Family | Path | Active / passive | Cantrips | Spells | Total |
| --- | --- | ---: | ---: | ---: | ---: |
| Primordial | Wood | 5 / 5 | 4 | 30 | 44 |
| Primordial | Fire | 5 / 4 | 5 | 20 | 34 |
| Primordial | Earth | 6 / 9 | 2 | 22 | 39 |
| Primordial | Metal | 11 / 1 | 2 | 15 | 29 |
| Primordial | Water | 8 / 4 | 3 | 28 | 43 |
| Primordial | Sky | 12 / 5 | 4 | 28 | 49 |
| Divine | Lunar | 6 / 1 | 1 | 17 | 25 |
| Divine | Love | 2 / 0 | 2 | 19 | 23 |
| Divine | Ruin | 11 / 3 | 4 | 23 | 41 |
| Divine | Pestilence | 9 / 4 | 2 | 23 | 38 |
| Divine | Shadow | 6 / 6 | 1 | 31 | 44 |
| Divine | Tempest | 5 / 2 | 1 | 17 | 25 |
| Divine | Providence | 7 / 2 | 3 | 22 | 34 |
| Immortal | Alchemy | 16 / 11 | 3 | 18 | 48 |
| Immortal | Heart | 24 / 8 | 1 | 0 | 33 |
| Immortal | Mysteries | 3 / 1 | 1 | 23 | 28 |

## Path boundaries

- **Sky and Tempest:** Sky governs local air, pressure, flight, mist, sound carried through air, and direct lightning such as Lightning Bolt and Chain Lightning. Tempest governs weather systems, storm fronts, rain, thunder, dangerous seas, and lightning channeled as a storm’s strike, such as Call Lightning, Lightning Arrow, and Ride the Lightning.
- **Alchemy and Pestilence:** Alchemy transforms and refines substances, including acids and medicines; restorative cures such as Lesser and Greater Restoration live here. Pestilence governs biological toxins, disease, contagion, curses, and resistance to them.
- **Lunar and Shadow:** Lunar covers Selûne’s moon, stars, navigation, dreams, reflection, and celestial foresight. Shadow covers Shar’s darkness, concealment, absence, and the Shadow Weave. Neither path absorbs the other.
- **Love and Providence:** Love concerns affection, attraction, beauty, devotion, and emotional bonds, including kinship with beasts (Animal Friendship, Speak with Animals, Dominate Beast). Providence concerns healing, protection, endurance, hope, sacrifice, and freedom from restraint.
- **Love and Heart:** Love is about bonds between people, and between people and beasts. Heart is personal discipline made physical through martial arts, unarmed practice, weapon technique, and trained movement. Heart Exchange, taught by Ha Yeon-ae in Sirius, is a Heart technique even though it binds two people. Techniques may channel Essence without becoming spells.
- **Immortal paths:** Alchemy is a learned craft of formulas and material transformation, so it stays distinct from the Primordial and Divine families. Its alchemical spells remain with Alchemy, along with transformation spells such as Enlarge/Reduce, Animal Shapes, True Polymorph, and Mass Polymorph, and volatile reactions such as Chromatic Orb and Chaos Bolt. Heart contains Stone Fist I–V (d4 through d12), Radiant Vein Blade I–III (Kelemvor's three sequential forms), and other martial talents, along with True Strike as an exceptional strike cantrip; it has no leveled spells.
- **Mysteries:** Mysteries is the human grasp of what cannot be put into words: space folded, time pried loose, and the illusory made real. It holds teleportation and planar travel (Dimension Door, Teleport, Plane Shift, Gate), extradimensional spaces (Rope Trick, Magnificent Mansion, Demiplane), gravity turned upside down (Reverse Gravity), and time (Haste, Slow, Temporal Shunt, Time Stop, Paradox, Time Ravage). Its Grandmaster technique, Fishing the Moon from the Well, is inspired by Er Gen's novels, where a hand neither illusory nor real draws a soul out of its reflection. The talents below it each hold one part of that technique, following Xu Qing's breakdown of it: space (Mouth of the Well), illusory reality (Illusory and Real), and conviction (Unshaken Conviction). All four are taught by the Shadow Sect in Sirius.
- **Mysteries and Lunar:** Lunar keeps Selûne's real moon, stars, dreams, and foresight, including Foresight, Moment of Prescience, Wyrd Sight, and Dream of the Blue Veil. Mysteries takes the moon only as a reflection in a well. Teleport, Time Stop, and Paradox moved from Lunar to Mysteries.
- **Mysteries and Sky:** Sky keeps flight and moving through the air, including Misty Step, which carries you on silvery mist. Haste moved to Mysteries, because speeding up time is not about air.
- **Mysteries, Shadow, and Pestilence:** Shadow keeps concealment, illusion made of darkness, and the Ethereal (Etherealness, Sequester, Creation). Pestilence keeps disease and decay, but Time Ravage moved to Mysteries because it ages its target through time. Magic itself (Counterspell, Dispel Magic) is Mystra's Weave and stays out of the catalog.
- **Mysteries and Alchemy:** Alchemy turns something into something else. Mysteries makes something from nothing, moves it elsewhere, or moves it in time.
- **Heart and Shadow:** Netherdark Fist stays in Shadow because its defining theme is void and darkness, despite its martial form. Heart holds techniques whose defining identity is embodied martial discipline.
- **Ruin:** Murder, assassination, pain, deception, and thievery share one portfolio. There is no separate Pain path; Loviatar’s suffering-based talents are assigned here. Ruin also holds death and retribution spells such as Speak with Dead, Antilife Shell, and Hellish Rebuke.
- **Wood:** Wood focuses on plants, growth, and the wild spirits of the land, such as Commune with Nature, Conjure Woodland Beings, and Find Familiar. Spells about bonding with animals belong to Love and animal-shaping to Alchemy, so Wood does not become a catch-all nature path. Shapechange is the one exception: as the druid’s capstone, it stays with Wood, where V1 also placed it.

Sun is not a separate path in this model. Explicitly solar spells were left out instead of being placed under Lunar. The retained Flame Strike belongs to Fire, while Crown of Stars belongs to Lunar. General occult-knowledge spells without a clear fit were also pruned rather than gathered under a catch-all path.

The former Void label is now **Shadow**, matching Shar’s darkness and shadow portfolio. The former Moon label is now **Lunar**, broad enough to include Selûne’s stars, navigation, cycles, dreams, and prophecy.

## Sources and saved builds

The 5e spell entries link to 5e.tools and include concise effect summaries with their source. Spells from partnered and community books, such as Grim Hollow, Kobold Press, or The Elements and Beyond, only open on 5e.tools once that homebrew is loaded in its Homebrew manager. Every custom talent names an author and a location, so players know who taught it and where: a sect, tribe, person, or deity, and Sirius, Leatrux, or Phudara / Isle of Whispers. Deity and portfolio techniques (Bhaal, Cyric, Loviatar, Ilmater, Talona, Shar, and Kelemvor) are learned in Leatrux. Spells and cantrips instead name their sourcebook as the author and have no location. The current cultivation build uses the shared Essence budget. It reconciles saved V2.3 configurations by surviving ability IDs and shows a notice for retired selections. Abilities that changed tier or moved path keep their IDs; `RETIERED_TALENT_IDS` and `MOVED_TALENT_IDS` in `src/utils/cultivationUtils.ts` list them, and a saved build holding one is re-checked on load. Anything whose tier no longer opens is removed with a notice and its Essence refunded. The moved abilities are Haste, Teleport, Time Stop, Paradox, and Time Ravage (now Mysteries) and Heart Exchange (now Heart). Essence left is still stored per path, and each family pool shows the sum, so older saves need no conversion.

Spells restored from the V1 essences keep their V1 IDs so V1 characters carry them over. When V2 knows a V1 ability under a different ID (a spell that moved path, or one V1 listed under two essences), `RENAMED_V1_IDS` in `src/utils/cultivationUtils.ts` maps the old ID to the new one. Seven V1 spells stay retired: Dragon’s Breath, Ember Belly, Elemental Exhalation, Songal’s Elemental Suffusion, Conjure Minor Elementals, Draconic Transformation, and Primordial Power. Reverse Gravity, which V1 listed under Air and Earth, returns in Mysteries.

Run `bun run generate:cultivation` to validate and regenerate the catalog. `bun run build` runs the complete project generation and production build.
