# Cultivation paths

The canonical catalog intended for V2 groups campaign-relevant paths into **Primordial**, **Divine**, and **Immortal** families. Markdown under `v2/` is the source of truth; `bun run generate:cultivation` builds the TypeScript modules and checks the roster. Family sizes are intentionally uneven. Each family shares one Essence pool: every learned path in it adds to the pool, and any learned ability in the family can spend from it. Tier prerequisites still apply per path. The family's internal ID stays `human` for the Immortal family, so saved builds keep loading. The pre-redesign sixteen-path source is retained in [`archive/v2.2/`](archive/v2.2/) for reference.

Each named spell or cantrip belongs to exactly one path. The generator rejects duplicate spell and cantrip titles and duplicate ability IDs. Spellcasting paths need at least one cantrip and one leveled spell; Heart is explicitly marked as a custom-talent path without a spell list.

The catalog contains 228 custom talents (158 active and 70 passive), 41 cantrips, and 388 leveled spells, for 657 entries. Path totals range from 24 to 79 entries. These counts measure available choices; they do not rate mechanical power.

| Family | Path | Active / passive | Cantrips | Spells | Total |
| --- | --- | ---: | ---: | ---: | ---: |
| Primordial | Wood | 5 / 5 | 4 | 30 | 44 |
| Primordial | Fire | 5 / 4 | 5 | 20 | 34 |
| Primordial | Earth | 6 / 9 | 2 | 23 | 40 |
| Primordial | Metal | 11 / 1 | 2 | 17 | 31 |
| Primordial | Water | 8 / 4 | 3 | 28 | 43 |
| Primordial | Sky | 12 / 5 | 4 | 29 | 50 |
| Divine | Lunar | 6 / 1 | 1 | 18 | 26 |
| Divine | Providence | 7 / 2 | 3 | 22 | 34 |
| Divine | Love | 2 / 0 | 2 | 20 | 24 |
| Divine | Tempest | 11 / 2 | 1 | 18 | 32 |
| Divine | Undertow | 7 / 3 | 2 | 20 | 32 |
| Divine | Ruin | 11 / 3 | 3 | 25 | 42 |
| Divine | Pestilence | 9 / 4 | 2 | 25 | 40 |
| Divine | Shadow | 6 / 6 | 1 | 31 | 44 |
| Immortal | Alchemy | 25 / 12 | 3 | 39 | 79 |
| Immortal | Heart | 24 / 8 | 1 | 0 | 33 |
| Immortal | Mysteries | 3 / 1 | 2 | 23 | 29 |

## Path boundaries

- **Sky and Tempest:** Sky governs local air, pressure, flight, mist, sound carried through air, and direct lightning such as Lightning Bolt and Chain Lightning. Tempest governs weather systems, storm fronts, rain, thunder, dangerous seas, and lightning channeled as a storm’s strike, such as Call Lightning, Stormshot, and Ride the Lightning.
- **Tempest, Water, and Undertow:** Tempest is the sea you can see: Umberlee's weather, waves, and wrath at the surface. Undertow is the sea that takes you: Yhal'etsu's lightless deep below the last light, with ink, crushing pressure, tentacles, and drowning. Water is the element that runs through both, so water that is simply conjured or shaped stays in Water (Control Water, Watery Sphere, Wall of Water), and Maelstrom stays in Tempest with the sea in upheaval.
- **Shadow and Undertow:** Shadow's darkness is absence and the Shadow Weave, so Hunger of Hadar stays there. Undertow's darkness is ink: it blinds, stains, and hides a predator.
- **Alchemy and Pestilence:** Alchemy transforms and refines substances, including acids, medicines, crafted poisons, and body grafts; restorative cures such as Lesser and Greater Restoration live here. Pestilence governs venom, disease, contagion, curses, and resistance to them.
- **Poison and venom:** if it grows in a body or spreads like a sickness, it is Pestilence's **venom** (Toxic Skin Secretion, Venomous Touch, contagion). If it was brewed, measured, and delivered by needle, vial, or a dose in food, it is Alchemy's **poison** (Lethargy Draught, Mindfog, Purple Worm Extract).
- **Lunar and Shadow:** Lunar covers Selûne’s moon, stars, navigation, dreams, reflection, and celestial foresight. Shadow covers Shar’s darkness, concealment, absence, and the Shadow Weave. Neither path absorbs the other.
- **Love and Providence:** Love concerns affection, attraction, beauty, devotion, and emotional bonds, including kinship with beasts (Animal Friendship, Speak with Animals, Dominate Beast). Providence concerns endurance, hope, martyrdom, protection, and freedom from restraint.
- **Love and Heart:** Love is about bonds between people, and between people and beasts. Heart is personal discipline made physical through martial arts, unarmed practice, weapon technique, and trained movement. Heart Exchange, taught by Ha Yeon-ae in Sirius, is a Heart technique even though it binds two people. Techniques may channel Essence without becoming spells.
- **Immortal paths:** Alchemy is a learned craft of formulas and material transformation, so it stays distinct from the Primordial and Divine families. Its alchemical spells remain with Alchemy, along with transformation spells such as Enlarge/Reduce, Animal Shapes, True Polymorph, and Mass Polymorph, and volatile reactions such as Chromatic Orb and Chaos Bolt. Heart contains Stone Fist I–V (d4 through d12), Radiant Vein Blade I–III (Kelemvor's three sequential forms), and other martial talents, along with True Strike as an exceptional strike cantrip; it has no leveled spells.
- **Mysteries:** Mysteries is the human grasp of what cannot be put into words: space folded, time pried loose, and the illusory made real. It holds teleportation and planar travel (Dimension Door, Teleport, Plane Shift, Gate), extradimensional spaces (Rope Trick, Magnificent Mansion, Demiplane), gravity turned upside down (Reverse Gravity), and time (Haste, Slow, Temporal Shunt, Time Stop, Paradox, Time Ravage). Its Grandmaster technique, Fishing the Moon from the Well, is inspired by Er Gen's novels, where a hand neither illusory nor real draws a soul out of its reflection. The talents below it each hold one part of that technique, following Xu Qing's breakdown of it: space (Mouth of the Well), illusory reality (Illusory and Real), and conviction (Unshaken Conviction). All four are taught by the Shadow Sect in Sirius.
- **Mysteries and Lunar:** Lunar keeps Selûne's real moon, stars, dreams, and foresight, including Foresight, Moment of Prescience, Wyrd Sight, and Dream of the Blue Veil. Mysteries takes the moon only as a reflection in a well. Teleport, Time Stop, and Paradox moved from Lunar to Mysteries.
- **Mysteries and Sky:** Sky keeps flight and moving through the air, including Misty Step, which carries you on silvery mist. Haste moved to Mysteries, because speeding up time is not about air.
- **Mysteries, Shadow, and Pestilence:** Shadow keeps concealment, illusion made of darkness, and the Ethereal (Etherealness, Sequester, Creation). Pestilence keeps disease and decay, but Time Ravage moved to Mysteries because it ages its target through time. Magic itself (Counterspell, Dispel Magic) is Mystra's Weave and stays out of the catalog.
- **Mysteries and Alchemy:** Alchemy turns something into something else. Mysteries makes something from nothing, moves it elsewhere, or moves it in time.
- **Heart and Shadow:** Netherdark Fist stays in Shadow because its defining theme is void and darkness, despite its martial form. Heart holds techniques whose defining identity is embodied martial discipline.
- **Ruin:** Murder and assassination (Bhaal), pain (Loviatar), and strife (Cyric) share one portfolio. There is no separate Pain path; Loviatar’s suffering-based talents are assigned here. Ruin also holds death and retribution spells such as Speak with Dead, Antilife Shell, and Hellish Rebuke.
- **Mysteries and Ruin:** Mage Hand is Mysteries, as space moved at a distance; Ruin keeps no utility cantrip.
- **Wood:** Wood focuses on plants, growth, and the wild spirits of the land, such as Commune with Nature, Conjure Woodland Beings, and Find Familiar. Spells about bonding with animals belong to Love and animal-shaping to Alchemy, so Wood does not become a catch-all nature path. Shapechange is the one exception: as the druid’s capstone, it stays with Wood, where V1 also placed it.

Sun is not a separate path in this model. Explicitly solar spells were left out instead of being placed under Lunar. The retained Flame Strike belongs to Fire, while Crown of Stars belongs to Lunar. General occult-knowledge spells without a clear fit were also pruned rather than gathered under a catch-all path.

The former Void label is now **Shadow**, matching Shar’s darkness and shadow portfolio. The former Moon label is now **Lunar**, broad enough to include Selûne’s stars, navigation, cycles, dreams, and prophecy.

## Sources and saved builds

The 5e spell entries link to 5e.tools and include concise effect summaries with their source. Spells from partnered and community books, such as Grim Hollow, Kobold Press, or The Elements and Beyond, only open on 5e.tools once that homebrew is loaded in its Homebrew manager. Every custom talent names an author and a location, so players know who taught it and where: a sect, tribe, person, or deity, and Sirius, Leatrux, or Phudara / Isle of Whispers. Deity and portfolio techniques (Bhaal, Cyric, Loviatar, Ilmater, Talona, Shar, and Kelemvor) are learned in Leatrux. Undertow's techniques come from Yhal'etsu, a god candidate beneath the Forbidden Sea in Sirius. Spells and cantrips instead name their sourcebook as the author and have no location. The current cultivation build uses the shared Essence budget. It reconciles saved V2.3 configurations by surviving ability IDs and shows a notice for retired selections. Abilities that changed tier or moved path keep their IDs; `RETIERED_TALENT_IDS` and `MOVED_TALENT_IDS` in `src/utils/cultivationUtils.ts` list them, and a saved build holding one is re-checked on load. Anything whose tier no longer opens is removed with a notice and its Essence refunded. The moved abilities are Haste, Teleport, Time Stop, Paradox, Time Ravage, and Mage Hand (now Mysteries), and Heart Exchange (now Heart). Water's Echoes of the Deep talent was renamed Tidespeech and kept its ID, since Echoes of the Deep is now an Undertow spell.

Spells restored from the V1 essences keep their V1 IDs so V1 characters carry them over. When V2 knows a V1 ability under a different ID (a spell that moved path, or one V1 listed under two essences), `RENAMED_V1_IDS` in `src/utils/cultivationUtils.ts` maps the old ID to the new one. Eight V1 spells are retired in V2: Dragon’s Breath, Ember Belly, Elemental Exhalation, Songal’s Elemental Suffusion, Conjure Minor Elementals, Draconic Transformation, Primordial Power, and Lightning Arrow. Reverse Gravity, which V1 listed under Air and Earth, returns in Mysteries.

Run `bun run generate:cultivation` to validate and regenerate the catalog. `bun run build` runs the complete project generation and production build.

## Tags

Optional YAML fields show as tags beside an ability's kind:

```yaml
activation: action     # bonus action, reaction; techniques also: free, attack, on hit
concentration: true
ritual: true
oncePerTurn: true      # techniques only, never on a reaction
```

A spell's tags and summary come from its 5etools entry, linked in its `Source reference` line. The generator rejects spell-style stat blocks (Casting Time, Range, Components…) in a technique's text.

## Facets

A path can declare facets, its sub-themes, in its header. The talent tree then shows a filter chip for each:

```markdown
Tradition: Immortal
Concept: The transformation, refinement, and recombination of substances.
Facets: Acid, Medicine, Poison, Explosives, Transmutation
```

Every entry in that file, spells and cantrips included, then names one or more of them in its YAML:

```yaml
facets: acid, explosives
```

Tags are the facet labels in lowercase with spaces and symbols as hyphens: "Body & Mind" is `body-mind`. The generator rejects an untagged entry in a faceted path, a tag that isn't in the path's list, and tags in a path without a Facets line. There is no "Other" chip. The facets of each path and the rules for choosing them are in [`docs/cultivation-paths-design.md`](../../docs/cultivation-paths-design.md#facets).

## Staged techniques

A technique learned in stages (Stone Fist I to V) names its series and how its stages relate, in every stage's YAML:

```yaml
series: stone_fist
stages: replace        # or add
```

Stages number themselves in tier order, one per tier with no gaps. Each stage needs the one before it: a later stage stays locked until the earlier one is learned, and unlearning a stage also removes every stage after it. A series is one technique, so only its highest learned stage costs points: Stone Fist I, II and III cost 3 together, not 6, and so do Radiant Vein Blade I, II and III. Every active stage still adds its own cost to the Essence pool, because each is still used, so Radiant Vein Blade I to III adds 6. Only the highest stage holds Essence, and only if it is a passive. With `stages: replace`, each stage is a stronger copy of the one before (Stone Fist, Toxic Skin Secretion), so the character sheet shows only the highest learned stage. With `stages: add`, each stage is its own ability (Netherdark Fist, Radiant Vein Blade, Tide's Reflection Art, Vital Essence Sublimation I–IV), and the sheet shows them all. On the talent tree, each series gets its own row, so its stages line up across the tier columns. The generator rejects a series with one stage, a gap between tiers, a series id used in two paths, and stages that mix `replace` and `add`. A saved build holding a stage without the ones before it gets them added if it can afford them; otherwise the later stages are removed with a notice.

## Domain lines

At least 40% of each path's techniques below Grandmaster answer its domain (Favored Domain, Consecrated Ground, or Sanctum). Two optional fields in an entry's YAML block mark them:

```yaml
domain: expansion      # or: restore, bound
domainText: Its damage dice are d10s.
```

A **Domain Expansion** works everywhere and adds its `domainText` line on the domain; a **restore** is a nerfed technique whose `domainText` gives back its full strength there; the app prints it under the ability with the family's domain label. A **bound** technique works only on the domain. Spells and cantrips never get a domain line. The generator rejects a domain line on a spell or cantrip, a Domain Expansion or restore without text, text without a kind, and anything domain-bound below Grandmaster. Undertow is the first path with domain lines; the design and its modifier catalogue are in [`docs/domain-expansion-design.md`](../../docs/domain-expansion-design.md). Essence left is still stored per path, and each family pool shows the sum, so older saves need no conversion.
