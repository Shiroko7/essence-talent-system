# V2 cultivation path structure

**Status: Canonical path structure intended for V2.** V2 groups paths into three campaign-relevant families: Primordial foundations of the natural world, Divine deity portfolios, and Immortal paths that people master through practice. The families do not need equal numbers of paths; the catalog is organized around what matters in the campaign rather than a target count or symmetry.

| Primordial | Divine | Immortal |
| --- | --- | --- |
| Wood | Lunar (Selûne) | Alchemy |
| Fire | Love (Sune) | Heart |
| Earth | Ruin (Bhaal, Cyric, Loviatar) | Mysteries |
| Metal | Pestilence (Talona) | |
| Water | Shadow (Shar) | |
| Sky | Tempest (Umberlee) | |
| | Providence (Ilmater) | |
| | Undertow (Yhal'etsu) | |

The six Primordial paths cover the five classical elements plus Sky, which houses air and lightning. The eight Divine portfolios preserve the deity themes most important to the setting; Undertow belongs to Yhal'etsu, a god candidate beneath the Forbidden Sea in Sirius rather than an established deity. Immortal holds Alchemy as a learned craft, Heart as martial discipline and embodied mastery, and Mysteries as the grasp of space, time, and the illusory made real. Pain is part of Ruin; poison, disease, and curses are part of Pestilence. Abilities without a useful campaign home were pruned rather than kept to fill a quota.

## Shared Essence

Essence is shared within a family. Every learned path in a family adds its Essence to one pool, and any learned ability in that family can spend from it: a Fire spell can use Essence that Wood abilities supplied. Families never share with each other. The pool's size uses the same formula as before, summed across the family, and passives and cantrips hold part of it. Tier prerequisites still apply per path. V1 keeps one pool per essence.

## Boundaries

- **Sky and Tempest:** Sky shapes local air, pressure, flight, sound carried through air, and direct lightning. Tempest commands weather systems: rain, storm fronts, thunder, and violent seas. A lightning bolt is Sky; a storm raised over an area is Tempest.
- **Tempest, Water, and Undertow:** Tempest is the sea you can see: weather, waves, and Umberlee's wrath at the surface. Undertow is the sea that takes you: the lightless deep below the last light, with ink, crushing pressure, tentacles, and drowning. Water is the element through both, so conjured or shaped water stays in Water, and Maelstrom moved there from Tempest because maelstroms are made by tides, not weather. Undertow's darkness is ink that blinds a predator's prey; Shadow keeps darkness as absence.
- **Earth and Metal:** Earth governs mass, stone, soil, terrain, and stability. Metal governs ore, metal objects, magnetism, weapons, armor, and refinement.
- **Alchemy and Pestilence:** Alchemy changes substances through formulas, acids, medicines, and refinement. Pestilence afflicts living bodies through poison, disease, contagion, and curses, and includes resistance or remedies tied directly to those afflictions.
- **Lunar and Shadow:** Lunar is Selûne’s moonlight, stars, cycles, navigation, dreams, reflection, and celestial foresight. Shadow is Shar’s darkness, concealment, absence, and Shadow Weave. They remain separate; the model does not combine Light and Void as a twilight portfolio.
- **Love and Providence:** Love is affection, beauty, attraction, devotion, empathy, and emotional bonds. Providence is protection, healing, endurance, hope, sacrifice, and liberation from debilitating bonds.
- **Love and Heart:** Love concerns relationships and emotional bonds between people. Heart concerns personal discipline expressed through martial forms, unarmed practice, weapon technique, and trained movement. A technique may channel Essence without being a spell.
- **Heart and Shadow:** Netherdark Fist stays in Shadow because void and darkness define it, despite its martial delivery. Heart holds techniques whose defining identity is embodied martial discipline.
- **Immortal paths:** Alchemy is a practice of refining and recombining substances, rather than a natural element or deity portfolio. Its alchemical spells remain with Alchemy. Heart holds Stone Fist I–V, scaling from a d4 to a d12, Radiant Vein Blade I–III, Heart Exchange, and other custom martial talents, along with True Strike as an exceptional strike cantrip; it has no leveled-spell list.
- **Mysteries:** Mysteries covers what cannot be put into words: space folded, time pried loose, and the illusory made real. It holds teleportation and planar travel, extradimensional spaces, and time magic. Its Grandmaster technique, Fishing the Moon from the Well, draws a soul out of its reflection. Alchemy turns something into something else; Mysteries makes something from nothing, or moves it through space or time. Lunar keeps Selûne's real moon, dreams, and foresight, while Sky keeps flight and Misty Step.
- **Ruin:** Murder, assassination, pain, deception, and thievery are deliberate forms of destruction and belong together. Loviatar’s pain abilities were moved here; there is no standalone Pain path.
- **Wood:** Wood is plants, roots, forests, and growth. It does not collect every animal, weather, or healing spell with a natural flavor; those entries were pruned or assigned to a clearer path.

## Portfolio decisions

The Moon label became **Lunar** because Selûne’s scope includes stars, navigation, cycles, dreams, and prophecy alongside moonlight. **Shadow** replaces Void to name Shar’s darkness and concealment directly. **Providence** keeps Ilmater’s endurance, care, freedom, and healing together. The Divine paths intentionally omit a separate Sun portfolio in this version. Solar spells were not assigned to Lunar; a few that fit another path by their actual effect were kept there, such as Flame Strike under Fire.

The archived sixteen-path source remains under [`data/cultivation/archive/v2.2/`](../data/cultivation/archive/v2.2/). Entries from retired Life, Death, Mystery, Sun, Torment, and Void groupings were reassigned only when their effect fit one of the active portfolios. Generic divination and magic spells without a clear fit were removed. The catalog intentionally does not preserve every legacy entry.

## Balance and implementation

The current roster has 212 custom talents (143 active, 69 passive), 41 cantrips, and 356 leveled spells, for 609 total entries. Its path totals range from 23 to 49 entries; the detailed table is in [`data/cultivation/README.md`](../data/cultivation/README.md). The lower totals belong to focused paths such as Love, Lunar, and Tempest, while Sky and Alchemy cover wider sets of effects. Counts help expose where choices concentrate; they do not measure power. Review damage, control, defense, healing, mobility, and action economy in play.

About half of a path's abilities can answer its domain: weaker ones gain a one-line rider there, and a few Grandmaster or higher techniques work only there. Spells and cantrips are never domain-bound. Undertow is the first path built this way; the reasoning, rules, and modifier catalogue are in [`domain-riders-design.md`](domain-riders-design.md).

Source Markdown lives in `data/cultivation/v2/`; `scripts/generate-cultivation.js` enforces unique IDs and one owner per spell/cantrip. Spellcasting paths require cantrips and leveled spells; Heart is a martial-discipline path with True Strike as its only cantrip and no leveled spells. Path labels, families, colors, and descriptions live in `src/types/cultivation.ts`; the family keeps the internal ID `human` for Immortal so saved builds keep loading. The `/v2` page uses a separate local-save key and reconciles older V2.3 selections by stable ability IDs.
