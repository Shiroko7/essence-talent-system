# Cultivation paths

The canonical catalog intended for V2 groups campaign-relevant paths into **Primordial**, **Divine**, and **Immortal** families. Markdown under `v2/` is the source of truth; `bun run generate:cultivation` builds the TypeScript modules and checks the roster. Family sizes are intentionally uneven. Each family shares one Essence pool: every learned path in it adds to the pool, and any learned ability in the family can spend from it. Tier prerequisites still apply per path. The family's internal ID stays `human` for the Immortal family, so saved builds keep loading. The pre-redesign sixteen-path source is retained in [`archive/v2.2/`](archive/v2.2/) for reference.

Each named spell or cantrip belongs to exactly one path. The generator rejects duplicate spell and cantrip titles and duplicate ability IDs. Spellcasting paths need at least one cantrip and one leveled spell; Heart is explicitly marked as a custom-talent path without a spell list.

The catalog contains 292 custom talents (211 active and 81 passive), 51 cantrips, and 462 leveled spells, for 805 entries. Path totals range from 24 to 58 entries. These counts measure available choices; they do not rate mechanical power.

A path can be **sealed**: it shows in the catalog so players can see what exists, but nothing in it can be learned until it unlocks in the campaign. Set `locked: true` on the path in `src/types/cultivation.ts`. Tyranny is sealed, since only NPCs use it for now.

| Family | Path | Active / passive | Cantrips | Spells | Total |
| --- | --- | ---: | ---: | ---: | ---: |
| Primordial | Wood | 5 / 5 | 4 | 30 | 44 |
| Primordial | Fire | 5 / 4 | 5 | 20 | 34 |
| Primordial | Earth | 6 / 9 | 2 | 23 | 40 |
| Primordial | Metal | 11 / 1 | 2 | 17 | 31 |
| Primordial | Water | 13 / 4 | 3 | 28 | 48 |
| Primordial | Sky | 12 / 5 | 4 | 29 | 50 |
| Divine | Lunar | 13 / 3 | 3 | 29 | 48 |
| Divine | Navigation | 7 / 4 | 2 | 21 | 34 |
| Divine | Love | 2 / 0 | 2 | 20 | 24 |
| Divine | Ruin | 11 / 3 | 1 | 21 | 36 |
| Divine | Crypt | 7 / 2 | 3 | 24 | 36 |
| Divine | Tyranny (sealed) | 6 / 2 | 2 | 23 | 33 |
| Divine | Pestilence | 9 / 4 | 2 | 22 | 37 |
| Divine | Shadow | 6 / 6 | 1 | 31 | 44 |
| Divine | Tempest | 5 / 1 | 1 | 19 | 26 |
| Divine | Undertow | 7 / 3 | 2 | 20 | 32 |
| Divine | Providence | 7 / 2 | 3 | 22 | 34 |
| Immortal | Alchemy | 25 / 11 | 3 | 19 | 58 |
| Immortal | Heart | 24 / 8 | 1 | 0 | 33 |
| Immortal | Mysteries | 15 / 1 | 2 | 23 | 41 |
| Immortal | Wisdom | 15 / 3 | 3 | 21 | 42 |

## Path boundaries

- **Sky and Tempest:** Sky governs local air, pressure, flight, mist, sound carried through air, and direct lightning such as Lightning Bolt and Chain Lightning. Tempest governs weather systems, storm fronts, rain, thunder, dangerous seas, and lightning channeled as a storm’s strike, such as Call Lightning, Lightning Arrow, and Ride the Lightning.
- **Tempest, Water, and Undertow:** Tempest is the sea you can see: Umberlee's weather, waves, and wrath at the surface. Undertow is the sea that takes you: Yhal'etsu's lightless deep below the last light, with ink, crushing pressure, tentacles, and drowning. Water is the element that runs through both, so water that is simply conjured or shaped stays in Water (Control Water, Watery Sphere, Wall of Water), and Maelstrom stays in Tempest with the sea in upheaval.
- **Shadow and Undertow:** Shadow's darkness is absence and the Shadow Weave, so Hunger of Hadar stays there. Undertow's darkness is ink: it blinds, stains, and hides a predator.
- **Alchemy and Pestilence:** Alchemy transforms and refines substances, including acids, medicines, and crafted poisons (doses and mists); restorative cures such as Lesser and Greater Restoration live here. Pestilence governs venom, disease, contagion, curses, and resistance to them. The test for poison: if it grows in a body or spreads like sickness, it is Pestilence; if it was brewed, measured, and delivered (a needle, a vial, a dose in food), it is Alchemy.
- **Lunar and Navigation:** Both belong to Selûne. Lunar holds the celestial bodies themselves: moonlight, falling stars, tides, dreams, and foresight. Navigation holds the reading of them: constellations, marks, predictions, charts, routes, and travel by land and sea. If the star itself hits something, it's Lunar; if it tells you something, or a pattern of stars works for you, it's Navigation. Locate Creature moved from Lunar and Storm Navigator from Tempest.
- **Navigation, Tempest, and Water:** Tempest raises the storm and Water is the sea itself; Navigation holds the course through both. Water Walk stays in Water and Wind Walk in Sky, because they are that element at work, and Phantom Steed stays in Shadow. Tempest keeps Lightning Insight, because weather-sense is its own portfolio.
- **Lunar and Shadow:** Lunar covers Selûne’s moon, stars, cycles, dreams, reflection, and celestial foresight. Shadow covers Shar’s darkness, concealment, absence, and the Shadow Weave. Neither path absorbs the other.
- **Love and Providence:** Love concerns affection, attraction, beauty, devotion, and emotional bonds, including kinship with beasts (Animal Friendship, Speak with Animals, Dominate Beast). Providence concerns endurance, hope, martyrdom (bearing pain for others), protection, and freedom from restraint; it heals, but healing is not its theme.
- **Love and Heart:** Love is about bonds between people, and between people and beasts. Heart is personal discipline made physical through martial arts, unarmed practice, weapon technique, and trained movement. Heart Exchange, taught by Ha Yeon-ae in Sirius, is a Heart technique even though it binds two people. Techniques may channel Essence without becoming spells.
- **Immortal paths:** Alchemy is a learned craft of formulas and material transformation, so it stays distinct from the Primordial and Divine families. Its alchemical spells remain with Alchemy, along with transformation spells such as Enlarge/Reduce, Animal Shapes, True Polymorph, and Mass Polymorph, and volatile reactions such as Chromatic Orb and Chaos Bolt. Heart contains Stone Fist I–V (d4 through d12), Radiant Vein Blade I–III (Kelemvor's three sequential forms), and other martial talents, along with True Strike as an exceptional strike cantrip; it has no leveled spells.
- **Mysteries:** Mysteries is the human grasp of what cannot be put into words: space folded, time pried loose, and the illusory made real. It holds teleportation and planar travel (Dimension Door, Teleport, Plane Shift, Gate), extradimensional spaces (Rope Trick, Magnificent Mansion, Demiplane), gravity turned upside down (Reverse Gravity), and time (Haste, Slow, Temporal Shunt, Time Stop, Paradox, Time Ravage). Its Grandmaster technique, Fishing the Moon from the Well, is inspired by Er Gen's novels, where a hand neither illusory nor real draws a soul out of its reflection. The talents below it each hold one part of that technique, following Xu Qing's breakdown of it: space (Mouth of the Well), illusory reality (Illusory and Real), and conviction (Unshaken Conviction). All four are taught by the Shadow Sect in Sirius.
- **Mysteries and Lunar:** Lunar keeps Selûne's real moon, stars, dreams, and foresight, including Foresight, Moment of Prescience, Wyrd Sight, and Dream of the Blue Veil. Mysteries takes the moon only as a reflection in a well. Teleport, Time Stop, and Paradox moved from Lunar to Mysteries.
- **Mysteries and Sky:** Sky keeps flight and moving through the air, including Misty Step, which carries you on silvery mist. Haste moved to Mysteries, because speeding up time is not about air.
- **Mysteries, Shadow, and Pestilence:** Shadow keeps concealment, illusion made of darkness, and the Ethereal (Etherealness, Sequester, Creation). Pestilence keeps disease and decay, but Time Ravage moved to Mysteries because it ages its target through time. Magic itself (Counterspell, Dispel Magic) is Mystra's Weave and stays out of the catalog.
- **Mysteries and Alchemy:** Alchemy turns something into something else. Mysteries makes something from nothing, moves it elsewhere, or moves it in time.
- **Heart and Shadow:** Netherdark Fist stays in Shadow because its defining theme is void and darkness, despite its martial form. Heart holds techniques whose defining identity is embodied martial discipline.
- **Ruin:** Murder and assassination (Bhaal), pain (Loviatar), and strife (Cyric) share one portfolio. There is no separate Pain path; Loviatar’s suffering-based talents are assigned here. Ruin keeps retribution spells such as Antilife Shell and Hellish Rebuke. Its spells about the dead moved to Crypt: Chill Touch, Toll the Dead, Speak with Dead, Circle of Death, Finger of Death, and Wail of the Banshee.
- **The Dead Three:** Bane, Bhaal, and Myrkul won Jergal’s power in a game of knucklebones (*Faiths & Avatars*, pp. 36–37). Bane took hatred, strife, and tyranny; Myrkul took rule over the dead; Bhaal took death itself, later narrowed to murder. Ruin holds Bhaal’s share, Crypt holds Myrkul’s, and Tyranny holds Bane’s.
- **Ruin and Crypt:** Ruin is the kill. Crypt is what comes after it: the corpse, the grave, bones, the dead who serve, decay, old age, and exhaustion. Blight and Abi-Dalzim's Horrid Wilting moved from Pestilence to Crypt, since they wither rather than sicken. Pestilence keeps sickness in the living.
- **Crypt and Wisdom:** Crypt works on the body: Speak with Dead stays in Crypt because it animates the corpse, not the soul. Wisdom works on what a mind holds: Echoes of the Departed gives a dead creature's memory a voice. When a spell does both, its result decides.
- **Wisdom:** Memory, names, history, and deduction. Following Reverend Insanity's wisdom path, deduction needs evidence: Wisdom works from what the cultivator has already seen, never from information the DM has to invent. Mysteries is what cannot be put into words; Wisdom is what has been. Lunar keeps the future (foresight and prophecy), and Wisdom keeps the past. Names define what a thing is: they can strengthen an ally or shackle an enemy, as with the oaths and titles of the Naming Supreme Deity in *A Regressor's Tale of Cultivation*, but they never grant full control. Befuddlement moved from Pestilence to Wisdom, because it wipes out what a mind holds.
- **Tyranny:** Bane’s rule by fear and one iron will: commands, chains, dread, and armies that obey. Love keeps the domination spells it already had (Compulsion, Dominate Person, Dominate Monster, Suggestion, Mass Suggestion, and Geas): Love binds through desire, Tyranny through fear and will. Tyranny is sealed, so it uses only spells no other path holds.
- **Lunar and Alchemy:** Lunar holds lycanthropy as Selûne's gift to good and neutral lycanthropes: wolf-kin hybrid forms such as Moonbound Form and Selûne's Pack, with Aspect of the Wolf and Potency of the Pack. Alchemy keeps general animal shaping by craft, such as Animal Shapes and Polymorph.
- **Wood:** Wood focuses on plants, growth, and the wild spirits of the land, such as Commune with Nature, Conjure Woodland Beings, and Find Familiar. Spells about bonding with animals belong to Love and animal-shaping to Alchemy, so Wood does not become a catch-all nature path. Shapechange is the one exception: as the druid’s capstone, it stays with Wood, where V1 also placed it.

Sun is not a separate path in this model. Explicitly solar spells were left out instead of being placed under Lunar. The retained Flame Strike belongs to Fire, while Crown of Stars belongs to Lunar. General occult-knowledge spells without a clear fit were also pruned rather than gathered under a catch-all path. Wisdom later took only the ones about memory, names, history, and knowledge put to use, such as Identify, Legend Lore, and Modify Memory.

The former Void label is now **Shadow**, matching Shar’s darkness and shadow portfolio. The former Moon label is now **Lunar**, broad enough to include Selûne’s stars, cycles, dreams, and prophecy. Reading the stars has its own path, **Navigation**.

## Sources and saved builds

The 5e spell entries link to 5e.tools and include concise effect summaries with their source. Spells from partnered and community books, such as Grim Hollow, Kobold Press, or The Elements and Beyond, only open on 5e.tools once that homebrew is loaded in its Homebrew manager. Every custom talent names an author and a location, so players know who taught it and where: a sect, tribe, person, or deity, and Sirius, Leatrux, or Phudara / Isle of Whispers. Deity and portfolio techniques (Bhaal, Cyric, Loviatar, Ilmater, Talona, Shar, Selûne, and Kelemvor) are learned in Leatrux. Undertow's techniques come from Yhal'etsu, a god candidate beneath the Forbidden Sea in Sirius. Crypt is taught by Song Tae-un and Wisdom by Harphonia "Harpy", both in Sirius. Tyranny's techniques are found in Sirius. Spells and cantrips instead name their sourcebook as the author and have no location. The current cultivation build uses the shared Essence budget. It reconciles saved V2.3 configurations by surviving ability IDs and shows a notice for retired selections. Abilities that changed tier or moved path keep their IDs; `RETIERED_TALENT_IDS` and `MOVED_TALENT_IDS` in `src/utils/cultivationUtils.ts` list them, and a saved build holding one is re-checked on load. Anything whose tier no longer opens is removed with a notice and its Essence refunded. The moved abilities are Haste, Teleport, Time Stop, Paradox, and Time Ravage (now Mysteries), Heart Exchange (now Heart), Locate Creature and Storm Navigator (now Navigation), Chill Touch, Toll the Dead, Speak with Dead, Circle of Death, Finger of Death, Wail of the Banshee, Blight, and Abi-Dalzim's Horrid Wilting (now Crypt), Befuddlement (now Wisdom), and Mage Hand (back to Mysteries from Ruin). Retiered in V2.2: Alchemy's Extended Reach (Adept to Initiate), Explosive Savant (Adept to Master), Acidic Precision (Initiate to Adept), and Chemical Expertise (Adept to Master). Water's Echoes of the Deep talent was renamed Tidespeech and kept its ID, since Echoes of the Deep is now an Undertow spell.

Spells restored from the V1 essences keep their V1 IDs so V1 characters carry them over. When V2 knows a V1 ability under a different ID (a spell that moved path, or one V1 listed under two essences), `RENAMED_V1_IDS` in `src/utils/cultivationUtils.ts` maps the old ID to the new one. Seven V1 spells stay retired: Dragon’s Breath, Ember Belly, Elemental Exhalation, Songal’s Elemental Suffusion, Conjure Minor Elementals, Draconic Transformation, and Primordial Power. Reverse Gravity, which V1 listed under Air and Earth, returns in Mysteries.

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
Facets: Acid, Medicine, Poison, Explosives, Mutation
```

Every entry in that file, spells and cantrips included, then names one or more of them in its YAML:

```yaml
facets: acid, explosives
```

Tags are the facet labels in lowercase with spaces and symbols as hyphens: "Thoughts & Deduction" is `thoughts-deduction`, "Body & Mind" is `body-mind`. The generator rejects an untagged entry in a faceted path, a tag that isn't in the path's list, and tags in a path without a Facets line. There is no "Other" chip. The facets of each path and the rules for choosing them are in [`docs/cultivation-paths-design.md`](../../docs/cultivation-paths-design.md#facets).

## Staged techniques

A technique learned in stages (Stone Fist I to V) names its series and how its stages relate, in every stage's YAML:

```yaml
series: stone_fist
stages: replace        # or add
```

Stages number themselves in tier order, one per tier with no gaps. Each stage needs the one before it: a later stage stays locked until the earlier one is learned, and unlearning a stage also removes every stage after it. A series is one technique, so only its highest learned stage costs points: Stone Fist I, II and III cost 3 together, not 6, and so do Radiant Vein Blade I, II and III. Every active stage still adds its own cost to the Essence pool, because each is still used, so Radiant Vein Blade I to III adds 6. Only the highest stage holds Essence, and only if it is a passive. With `stages: replace`, each stage is a stronger copy of the one before (Stone Fist, Toxic Skin Secretion), so the character sheet shows only the highest learned stage. With `stages: add`, each stage is its own ability (Netherdark Fist, Radiant Vein Blade, Tide's Reflection Art, Vital Essence Sublimation), and the sheet shows them all. On the talent tree, each series gets its own row, so its stages line up across the tier columns. The generator rejects a series with one stage, a gap between tiers, a series id used in two paths, and stages that mix `replace` and `add`. A saved build holding a stage without the ones before it gets them added if it can afford them; otherwise the later stages are removed with a notice.

## Domain lines

At least 40% of each path's techniques below Grandmaster answer its domain (Favored Domain, Consecrated Ground, or Sanctum). Two optional fields in an entry's YAML block mark them:

```yaml
domain: expansion      # or: restore, bound
domainText: Its damage dice are d10s.
```

A **Domain Expansion** works everywhere and adds its `domainText` line on the domain; a **restore** is a nerfed technique whose `domainText` gives back its full strength there; the app prints it under the ability with the family's domain label. A **bound** technique works only on the domain. Spells and cantrips never get a domain line. The generator rejects a domain line on a spell or cantrip, a Domain Expansion or restore without text, text without a kind, and anything domain-bound below Grandmaster. Every family binds its strongest Grandmaster technique or two, and a bound technique says where it works in its own text ("As an action in your Favored Domain, …"); the design and its modifier catalogue are in [`docs/domain-expansion-design.md`](../../docs/domain-expansion-design.md). Essence left is still stored per path, and each family pool shows the sum, so older saves need no conversion.
