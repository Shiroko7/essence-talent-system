# V2 cultivation path structure

**Status: Canonical path structure intended for V2.** V2 groups paths into three campaign-relevant families: Primordial foundations of the natural world, Divine deity portfolios, and Immortal paths that people master through practice. The families do not need equal numbers of paths; the catalog is organized around what matters in the campaign rather than a target count or symmetry.

| Primordial | Divine | Immortal |
| --- | --- | --- |
| Wood | Lunar (Selûne) | Alchemy |
| Fire | Navigation (Selûne) | Heart |
| Earth | Love (Sune) | Mysteries |
| Metal | Ruin (Bhaal, Cyric, Loviatar) | Wisdom |
| Water | Crypt (Myrkul) | |
| Sky | Tyranny (Bane), sealed | |
| | Pestilence (Talona) | |
| | Shadow (Shar) | |
| | Tempest (Umberlee) | |
| | Providence (Ilmater) | |
| | Undertow (Yhal'etsu) | |

The six Primordial paths cover the five classical elements plus Sky, which houses air and lightning. The eleven Divine portfolios preserve the deity themes most important to the setting; Selûne holds two of them, Lunar for the moon and stars themselves and Navigation for the reading of them; Undertow belongs to Yhal'etsu, a god candidate beneath the Forbidden Sea in Sirius rather than an established deity. Crypt, Tyranny, and Ruin divide the Dead Three: Myrkul, Bane, and Bhaal. Tyranny is sealed: players can see it, but only NPCs use it until it unlocks in the campaign. Immortal holds Alchemy as a learned craft, Heart as martial discipline and embodied mastery, Mysteries as the grasp of space, time, and the illusory made real, and Wisdom as memory, names, and deduction. Pain is part of Ruin; poison, disease, and curses are part of Pestilence. Abilities without a useful campaign home were pruned rather than kept to fill a quota.

## Which family a path belongs to

Primordial is the matter, Divine is a god's reading of it, and Immortal is what a practitioner makes of it. Ask who holds the power:

| Family | Test | In the Realms |
| --- | --- | --- |
| Primordial | It exists whether or not anyone believes in it or understands it | Primordials are worshipped but sit outside the ranks of the gods |
| Divine | A god holds it, and it fails or changes hands when that god falls | Clerical spells failed in the Time of Troubles; portfolios pass to killers or by Ao's grant |
| Immortal | It lives in the practitioner, whoever falls | Azuth, Kelemvor, and Midnight mastered their craft as mortals before they held an office |

The teacher doesn't decide the family. Kelemvor's Radiant Vein Blade is in Heart because it is a practiced form, not something he lends.

## Technique design rules

Every custom technique has to pass these. They come from rejected drafts.

- **No menus.** A technique never says "choose one of the following effects when you use it." It does one thing. Don't attach a second, unrelated effect either.
- **Initiate is a free dip.** Any character can pick up an Initiate technique from any path, so Initiate techniques stay modest. Strong reactions (such as dropping to 1 hit point instead of 0), forced choices like "kneel or take damage", and hard control belong at higher tiers.
- **No improvising for the DM.** A technique shouldn't let players ask the world open questions whenever they like, such as "what happened here". Information comes from what is already at the table: a stat block, or something the party saw.
- **Don't rebuild a spell.** If a technique does what a 5e spell already does, use the spell.
- **No minion gimmick.** A path isn't built around a creature it summons. Specific undead and servants come from spells. A technique must not need a summon or a prepared corpse before it works.
- **Domain lines must change the fight.** If the line wouldn't matter at the table (for example, "its speed is reduced by 10 feet on a success"), choose another. For a single-target technique, an extra target is usually the right fix.
- **Exhaustion is extremely special.** Techniques don't give Exhaustion in normal circumstances. Save it for rare, deliberate exceptions.
- **Don't default to psychic damage.** Force is a fine alternative, especially for higher-tier techniques.
- **A domain-wide technique covers the whole domain.** When a technique works across your domain, as Necropolis, Hadal Domain, and Throne of Dread do, it affects the entire domain, not a radius around you.
- **Absolute protections are Great Grandmaster.** "Magic that alters your memories always fails" or "no one can read your mind" belongs at Great Grandmaster, if anywhere.
- **No flat bonuses.** Don't write "+2 to checks" or similar flat numbers; use dice, advantage, or a rule that changes what the technique does.
- **Leave damage resistance alone.** A buff never grants, removes, or ignores damage resistance. (Wisdom's Bestow Title, which names resistances as titles, is its own Grandmaster design.)
- **Draw on many sources.** Pathfinder 2e (Archives of Nethys, every book) is one of several guides for new actives and passives, not the only one. The novels under [Inspirations](#inspirations) apply to every path, alongside 5e and its third-party books and other games and fiction. Whatever the source, turn it into one 5e effect, and name it when proposing the technique.
- **Actives, not only spells.** Every facet of a path needs active techniques of its own. Wisdom's knowledge facet, for example, had only spells until Gleaned Knowledge and Learned at a Glance.
- **Spread a theme across the tiers.** When a path has several passives on one theme, they climb one per tier instead of bunching at Initiate or Adept. Alchemy's explosive passives are Extended Reach (Initiate), Expanded Explosion (Adept), and Explosive Savant (Master); its acid passives are Acidic Insight (Initiate), Acidic Precision (Adept), and Chemical Expertise (Master).
- **Moving up a tier doesn't write its own buff.** A technique that moves to a higher tier may deserve a buff, but buffs are proposed as options and the designer picks one. Moving down never needs one. The moved technique keeps its ID and goes in `RETIERED_TALENT_IDS` (see the data README).

Magic will be a Divine path for the Weave, Mystra's office, when the campaign needs it. Raw magic stays a story hazard (the Spellplague), and spellcraft is Wisdom applied to magic. Counterspell and Dispel Magic stay out of the catalog until then.

## Inspirations

These novels are general references for every path. Their cultivation systems, techniques, and ideas about the Dao are fair game when designing abilities, boundaries, and domains.

- **Er Gen:** *Tian Ni*, *Renegade Immortal*, *Pursuit of the Truth*, *I Shall Seal the Heavens*, *A Will Eternal*, *A World Worth Protecting*, and *Beyond the Timescape* (also *Outside of Time*).
- **Warmaisach:** *Lightning Is the Only Way*, *Sword God in a World of Magic*, *Kill the Sun*, and *Strongest Hammer God*.
- **Gu Zhen Ren:** *Reverend Insanity* and *Mysteries of Immortal Puppet Master*.
- *A Regressor's Tale of Cultivation*.
- *Lord of the Mysteries* and *Circle of Inevitability* (Cuttlefish That Loves Diving).

## Facets

A path can split into **facets**: sub-themes that stay one path but give the talent tree a filter row (All, then one chip per facet). They are a UI and tagging aid, not a rule: they never change cost, tiers, or Essence.

| Path | Facets |
| --- | --- |
| Alchemy | Acid, Medicine, Poison, Explosives, Mutation |
| Water | Water, Ice |
| Wisdom | Memory, Names, Knowledge, Thoughts & Deduction |
| Lunar | Moonlight, Stars, Visions, Lycanthropy |
| Heart | Unarmed, Blades, Spears, Blunt, Ranged, Body & Mind |
| Pestilence | Disease, Venom, Curses |
| Providence | Endurance, Martyrdom, Wards |
| Ruin | Murder, Pain, Strife |

- **No "Other".** Every ability in a faceted path, spells and cantrips included, has at least one facet. If an ability fits none, it either belongs to another path (Mage Hand left Ruin for Mysteries) or the facet list is wrong.
- **Read the abilities, not the concept line.** Facets come from what the path actually holds. Ruin's old concept line promised deception and thievery, but its abilities sort into its three patrons: Murder (Bhaal), Pain (Loviatar), and Strife (Cyric). Providence's line said healing, but its abilities are endurance, martyrdom, and wards. When the facets and the concept line disagree, fix the concept line too.
- **An ability can carry several facets.** A Heart technique that works with any weapon is tagged under every weapon facet, so a spear user filtering by Spears still sees it.
- **Few enough to scan.** Three to six chips. A path that is mostly one theme or has few entries doesn't need facets.
- **Words that mean different things stay different.** Pestilence's facet is Venom and Alchemy's is Poison (see Boundaries).

## Shared Essence

Essence is shared within a family. Every learned path in a family adds its Essence to one pool, and any learned ability in that family can spend from it: a Fire spell can use Essence that Wood abilities supplied. Families never share with each other. The pool's size uses the same formula as before, summed across the family, and passives and cantrips hold part of it. Tier prerequisites still apply per path. V1 keeps one pool per essence.

## Boundaries

- **Sky and Tempest:** Sky shapes local air, pressure, flight, sound carried through air, and direct lightning. Tempest commands weather systems: rain, storm fronts, thunder, and violent seas. A lightning bolt is Sky; a storm raised over an area is Tempest.
- **Tempest, Water, and Undertow:** Tempest is the sea you can see: weather, waves, and Umberlee's wrath at the surface. Undertow is the sea that takes you: the lightless deep below the last light, with ink, crushing pressure, tentacles, and drowning. Water is the element through both, so conjured or shaped water stays in Water, while Maelstrom stays in Tempest with the sea in upheaval. Undertow's darkness is ink that blinds a predator's prey; Shadow keeps darkness as absence.
- **Earth and Metal:** Earth governs mass, stone, soil, terrain, and stability. Metal governs ore, metal objects, magnetism, weapons, armor, and refinement.
- **Poison and venom:** if it grows in a body or spreads like a sickness, it is Pestilence's **venom** (Toxic Skin Secretion, Venomous Touch, contagion). If it was brewed, measured, and delivered by needle, vial, or a dose in food, it is Alchemy's **poison** (Lethargy Draught, Nightshade Tincture, Mindfog, Purple Worm Extract). Alchemy's poisons have no Grandmaster technique.
- **Alchemy's mutation and medicine:** Mutation means rewriting a body: polymorph, cloning, and grafts of monster parts (Claw Graft, Tentacle Graft, Wing Graft), not drinkable boosts. Medicine is Alchemy's elixirs, pills, and cures, including Healing Bomb and Living Suture, which reattaches a part severed within the last hour when you have both pieces. Regrowing a lost part stays with Regenerate.
- **Alchemy and Pestilence:** Alchemy changes substances through formulas, acids, crafted poisons, medicines, body grafts, and refinement. Pestilence afflicts living bodies through venom, disease, contagion, and curses, and includes resistance or remedies tied directly to those afflictions.
- **Lunar and Navigation:** Both belong to Selûne. Lunar holds the celestial bodies themselves: moonlight, falling stars, tides, dreams, and foresight. Navigation holds the reading of them: constellations, marks, predictions, charts, routes, and travel by land and sea. If the star itself hits something, it's Lunar; if it tells you something, or a pattern of stars works for you, it's Navigation. Locate Creature and Storm Navigator moved to Navigation.
- **Navigation, Tempest, and Water:** Tempest raises the storm and Water is the sea itself; Navigation holds the course through both. Water Walk stays in Water, Wind Walk in Sky, and Phantom Steed in Shadow, and Tempest keeps Lightning Insight, because weather-sense is its own portfolio.
- **Lunar and Shadow:** Lunar is Selûne’s moonlight, starfire, cycles, dreams, reflection, and celestial foresight. Shadow is Shar’s darkness, concealment, absence, and Shadow Weave. They remain separate; the model does not combine Light and Void as a twilight portfolio.
- **Love and Providence:** Love is affection, beauty, attraction, devotion, empathy, and emotional bonds. Providence is endurance, hope, martyrdom, protection, and liberation from debilitating bonds.
- **Love and Heart:** Love concerns relationships and emotional bonds between people. Heart concerns personal discipline expressed through martial forms, unarmed practice, weapon technique, and trained movement. A technique may channel Essence without being a spell.
- **Heart and Shadow:** Netherdark Fist stays in Shadow because void and darkness define it, despite its martial delivery. Heart holds techniques whose defining identity is embodied martial discipline.
- **Immortal paths:** Alchemy is a practice of refining and recombining substances, rather than a natural element or deity portfolio. Its alchemical spells remain with Alchemy. Heart holds Stone Fist I–V, scaling from a d4 to a d12, Radiant Vein Blade I–III, Heart Exchange, and other custom martial talents, along with True Strike as an exceptional strike cantrip; it has no leveled-spell list.
- **Mysteries:** Mysteries covers what cannot be put into words: space folded, time pried loose, and the illusory made real. It holds teleportation and planar travel, extradimensional spaces, and time magic. Its Grandmaster technique, Fishing the Moon from the Well, draws a soul out of its reflection. Alchemy turns something into something else; Mysteries makes something from nothing, or moves it through space or time. Lunar keeps Selûne's real moon, dreams, and foresight, Navigation keeps travel by road and sea, and Sky keeps flight and Misty Step.
- **Ruin:** Murder and assassination (Bhaal), pain (Loviatar), and strife (Cyric) are deliberate forms of destruction and belong together. Loviatar’s pain abilities were moved here; there is no standalone Pain path.
- **Ruin, Crypt, and Tyranny:** The Dead Three won Jergal's power in a game of knucklebones (*Faiths & Avatars*, pp. 36–37). Bane took hatred, strife, and tyranny, Myrkul took rule over the dead, and Bhaal took death itself, later narrowed to murder. Ruin is the kill. Crypt is what comes after: corpses, bones, the dead who serve, decay, old age, and exhaustion. Tyranny is rule by fear and one iron will.
- **Crypt and Wisdom:** Crypt works on the body: Speak with Dead stays in Crypt because it animates the corpse, not the soul. Wisdom works on what a mind holds: Echoes of the Departed gives a dead creature's memory a voice. When a spell does both, its result decides.
- **Wisdom's facets:** memory (what has happened), names (what a thing is, oaths and titles), knowledge (skills, lore, and learned spells, taken from what the cultivator has seen), and thoughts and deduction (reading minds and the next move).
- **Mysteries and Ruin:** Mage Hand is Mysteries, as space moved at a distance; Ruin keeps no utility cantrip.
- **Wisdom and Mysteries:** Mysteries is what cannot be put into words; Wisdom is what has been. Lunar keeps the future and Wisdom the past. Names show what a thing is; they don't grant control over it.
- **Tyranny and Love:** Love keeps its domination spells, because Love binds through desire and Tyranny through fear and will. While Tyranny is sealed, it takes no spells from player paths.
- **Lunar and Alchemy:** Lunar holds lycanthropy as Selûne's gift to good and neutral lycanthropes: wolf-kin hybrid forms such as Moonbound Form and Selûne's Pack, with Aspect of the Wolf and Potency of the Pack. Alchemy keeps general animal shaping by craft, such as Animal Shapes and Polymorph.
- **Wood:** Wood is plants, roots, forests, and growth. It does not collect every animal, weather, or healing spell with a natural flavor; those entries were pruned or assigned to a clearer path.

## Portfolio decisions

The Moon label became **Lunar** because Selûne’s scope includes stars, cycles, dreams, and prophecy alongside moonlight. Reading the stars has its own path, **Navigation**. **Shadow** replaces Void to name Shar’s darkness and concealment directly. **Providence** keeps Ilmater’s endurance, care, freedom, and healing together. The Divine paths intentionally omit a separate Sun portfolio in this version. Solar spells were not assigned to Lunar; a few that fit another path by their actual effect were kept there, such as Flame Strike under Fire.

The archived sixteen-path source remains under [`data/cultivation/archive/v2.2/`](../data/cultivation/archive/v2.2/). Entries from retired Life, Death, Mystery, Sun, Torment, and Void groupings were reassigned only when their effect fit one of the active portfolios. A first Life and Death path was drafted and removed; see [`life-and-death-postmortem.md`](life-and-death-postmortem.md).

## Balance and implementation

The current roster has 292 custom talents (211 active, 81 passive), 51 cantrips, and 462 leveled spells, for 805 total entries. Its path totals range from 24 to 58 entries; the detailed table is in [`data/cultivation/README.md`](../data/cultivation/README.md). The lower totals belong to focused paths such as Love, Lunar, and Tempest, while Sky and Alchemy cover wider sets of effects. Counts help expose where choices concentrate; they do not measure power. Review damage, control, defense, healing, mobility, and action economy in play.

At least 40% of a path's techniques below Grandmaster answer its domain: weaker ones gain a one-line Domain Expansion there. In every family, the strongest one or two Grandmaster or higher techniques work only there, and are strong enough to be worth that limit. Spells and cantrips never get a domain line. Undertow was the first path built this way; the reasoning, rules, and modifier catalogue are in [`domain-expansion-design.md`](domain-expansion-design.md).

Source Markdown lives in `data/cultivation/v2/`; `scripts/generate-cultivation.js` enforces unique IDs and one owner per spell/cantrip. Spellcasting paths require cantrips and leveled spells; Heart is a martial-discipline path with True Strike as its only cantrip and no leveled spells. Path labels, families, colors, and descriptions live in `src/types/cultivation.ts`; the family keeps the internal ID `human` for Immortal so saved builds keep loading. The `/v2` page uses a separate local-save key and reconciles older V2.3 selections by stable ability IDs.
