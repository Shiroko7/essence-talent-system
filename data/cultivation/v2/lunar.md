# Lunar Cultivation Path

Tradition: Divine
Concept: Selûne’s moon and stars themselves: moonlight, starfire, cycles, dreams, and celestial foresight.

### Moonlit Verdant Beam

```yaml
id: water_adept_moonlit_verdant_beam
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lesbian Dragons
location: Leatrux
activation: action
```

As an action, you fire a beam of toxic moonlight at a creature within 60 feet. Make a ranged spell attack:
- **On a hit:** The target takes 3d6 radiant damage + 3d6 poison damage and must make a Constitution saving throw against your spell save DC.
- **On a failed save:** The target is blinded and poisoned until the end of your next turn.

## Master Tier

---

### Lunar Tide

```yaml
id: water_master_lunar_tide
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
activation: reaction
```

As a reaction when you or creatures within 30 feet are subjected to a Dexterity saving throw against an ability that deals damage, you summon a protective wave of water guided by lunar force. All affected creatures reduce the damage taken by 2d8 + your spellcasting modifier. The water then dissipates harmlessly.

---

### Moonfall Condemnation

```yaml
id: water_master_moonfall_condemnation
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
domain: bound
activation: action
```

As an action, you target one creature within 120 feet. A pillar of concentrated moonlight descends, requiring a Dexterity saving throw against your essence ability save DC:
- **On a failed save:** The target takes 6d8 radiant damage and 3d8 cold damage, and is restrained until the end of its next turn as lunar energy begins to calcify its limbs.
- **On a successful save:** The target takes half damage and is not restrained.

**Lunar Petrification:**
If this damage reduces the target to 50 hit points or fewer, it must immediately make a Constitution saving throw against your essence ability save DC. On a failed save, the creature is petrified into moonstone.

---

### Lunar Wind Spiral

```yaml
id: wind_master_essence_lunar_wind_spiral
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
activation: action
```

As an action, you target a point within 150 feet. A cylinder of swirling, moonlight-infused winds erupts in a 30-foot radius and 60-foot height for 1 minute.

**Initial Eruption:**
When the spiral appears, each creature in the area must make a Constitution saving throw against your essence ability save DC:
- **On a failed save:** The creature takes 6d8 radiant damage and is lifted 20 feet into the air until the start of its next turn.
- **On a successful save:** The creature takes half damage and is not lifted.

**Ongoing Hazard:**
Any creature that starts its turn in the area or enters it for the first time on a turn must make a Constitution saving throw, taking 3d6 radiant damage on a failed save, or half as much on a successful one (it is not lifted).

**Repositioning:**
You can use a bonus action on a subsequent turn to move the cylinder up to 30 feet.

---

### Waning Moon Sabers

```yaml
id: wind_master_essence_waning_moon_sabers
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
domain: restore
domainText: You can use it as a bonus action instead.
activation: action
```

As an action, launch up to three crescent-shaped energy blades that travel up to 150 feet. The sabers curve around cover, ignoring half and three-quarters cover.

Make a ranged spell attack for each saber:
- **On a hit:** The target takes 1d4 + 1 radiant damage and must make a Constitution saving throw or be blinded until the end of its next turn as moonlight sears its vision.
- **Critical Hit:** The target automatically fails the saving throw.

## Cantrips

## Spells

---

### Faerie Fire

```yaml
id: moon_1st_faerie_fire
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Twilight Domain) / Druid
activation: action
concentration: true
```

Creatures in a 20-foot cube within 60 feet that fail a Dexterity save glow for up to 1 minute. Attacks against them have advantage and they can't be invisible.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#faerie%20fire_xphb).

---

### Moonbeam

```yaml
id: moon_2nd_moonbeam
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Twilight Domain) / Paladin (Ancients)
activation: action
concentration: true
```

A 5-foot-radius beam of moonlight within 120 feet deals 2d10 radiant damage on a failed Constitution save, or half on a success. You can move it each turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#moonbeam_xphb).

---

### See Invisibility

```yaml
id: moon_2nd_see_invisibility
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Twilight Domain) / Divination
activation: action
```

For 1 hour you see invisible creatures and objects, and into the Ethereal Plane.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#see%20invisibility_xphb).

---

### Clairvoyance

```yaml
id: v2_lunar_clairvoyance
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
concentration: true
```

An invisible sensor appears at a place within 1 mile that you know or can see, and you see or hear through it for up to 10 minutes.

Source reference: [D&D 5e (PHB) on 5e.tools](https://5e.tools/spells.html#clairvoyance_phb).

---

### Alustriel's Mooncloak

```yaml
id: moon_5th_alustriels_mooncloak
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Alustriel / Selûne
activation: action
concentration: true
```

Moonlight fills a 20-foot emanation for up to 1 minute. You and allies there have cover and resistance to cold, lightning and radiant damage.

Source reference: [D&D 5e (Heroes of Faerûn) on 5e.tools](https://5e.tools/spells.html#alustriel's%20mooncloak_frhof).

---

### True Seeing

```yaml
id: moon_6th_true_seeing
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Divination
activation: action
```

A willing creature you touch has truesight out to 120 feet for 1 hour.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#true%20seeing_xphb).

---

### Dancing Lights

```yaml
id: v2_moon_dancing_lights
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (PHB)
activation: action
concentration: true
```

You create up to four hovering lights within 120 feet and move them each turn.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#dancing%20lights_phb).

---

### Foresight

```yaml
id: moon_9th_foresight
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Divination
```

For 8 hours a willing creature you touch has advantage on D20 Tests, and attacks against it have disadvantage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#foresight_xphb).

---

### Divination

```yaml
id: moon_4th_divination
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Divination
activation: action
ritual: true
```

You ask a god one question about an event within the next 7 days and receive a truthful, possibly cryptic answer.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#divination_xphb).

---

### Dream

```yaml
id: moon_5th_dream
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Twilight Domain) / Illusion
```

You enter a creature's dreams to speak with it, or to give it a nightmare that deals 3d6 psychic damage and denies it rest.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#dream_xphb).

---


### Arcane Aegis

```yaml
id: metal_1st_level_arcane_aegis
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

You gain 2d10 temporary hit points. A creature that hits you in melee takes force damage equal to the temporary hit points lost.

Source reference: [Grim Hollow: Player's Guide (2024) on 5e.tools](https://5e.tools/spells.html#arcane%20aegis_grimhollowpg24).

---

### Draconic Regeneration of the Emerald Moon

```yaml
id: water_master_draconic_regeneration_emerald_moon
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lesbian Dragons
location: Leatrux
```

While under direct moonlight, you regain 1 hit point at the start of each of your turns. You can extend this regeneration to any creature within 60 feet by spending 1 essence point per creature at the start of your turn.

---

### Rain of Revelation

```yaml
id: water_adept_rain_of_revelation
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
activation: action
```

You can summon a gentle, magical rain that grants clarity and insight to those who stand in it. Allies within a 20-foot radius can ask one question about their future or destiny, and you provide a vague but helpful answer based on your understanding of the world.

---

## Spells restored from V1

---


### Magic Mirror

```yaml
id: acid_5th_level_magic_mirror
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: reaction
```

When you're targeted by a spell, you redirect it to another creature within 60 feet. A spell of 6th level or higher needs a spellcasting check.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#magic%20mirror_grimhollowpg24).

---

### Prismatic Spray

```yaml
id: acid_7th_level_prismatic_spray
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
activation: action
```

Eight colored rays fill a 60-foot cone. Each creature that fails a Dexterity save takes 12d6 damage of a random type or suffers a random effect.

Source reference: [D&D 5e (PHB) on 5e.tools](https://5e.tools/spells.html#prismatic%20spray_phb).

---

### Prismatic Wall

```yaml
id: acid_9th_level_prismatic_wall
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
activation: action
```

An opaque wall or sphere of seven colored layers rises within 60 feet. Each layer deals damage or a condition to creatures that pass through it.

Source reference: [D&D 5e (PHB) on 5e.tools](https://5e.tools/spells.html#prismatic%20wall_phb).

---

### Dream of the Blue Veil

```yaml
id: v2_lunar_dream_of_the_blue_veil
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (TCE)
```

You and up to eight willing creatures fall asleep and wake on another world of the Material Plane after 6 hours.

Source reference: [D&D 5e (TCE) on 5e.tools](https://5e.tools/spells.html#dream%20of%20the%20blue%20veil_tce).

---

### Moment of Prescience

```yaml
id: v2_lunar_moment_of_prescience
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
activation: reaction
```

As a reaction, you turn your failed D20 Test into a 20, or an attack roll against you into a 1.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#moment%20of%20prescience_au).

---

### Wyrd Sight

```yaml
id: v2_lunar_wyrd_sight
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Northlands Worldbook
activation: action
concentration: true
```

For up to 1 minute, once per turn you add or subtract 1d12 from a d20 roll made by a creature you can see.

Source reference: [Kobold Press Northlands Worldbook on 5e.tools](https://5e.tools/spells.html#wyrd%20sight_northlandsworldbook).

---

## The moon and the stars

---

### Moonsight

```yaml
id: lunar_initiate_moonsight
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: expansion
domainText: Both ranges double.
```

You have darkvision out to 60 feet, or 30 feet farther if you already have it, and you can see through magical darkness out to 10 feet.

---

### Silver Ray

```yaml
id: lunar_initiate_silver_ray
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: expansion
domainText: You have advantage on the attack roll.
activation: action
```

As an action, you shine a ray of silver moonlight at a creature within 120 feet. Make a ranged spell attack. On a hit, it takes 3d8 radiant damage, or 5d8 if it's a fiend or undead.

---

### Shower of Stars

```yaml
id: lunar_initiate_shower_of_stars
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
activation: action
```

As an action, you fling a spray of tiny shooting stars in a 15-foot cone. Each creature there makes a Dexterity saving throw against your essence ability save DC. On a failure, it takes 3d6 radiant damage and has disadvantage on its next attack roll before the end of its next turn. On a success, it takes half as much damage only.

---

### Phases of the Moon

```yaml
id: lunar_master_phases_of_the_moon
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: expansion
domainText: You choose its starting phase.
activation: bonus action
concentration: true
```

As a bonus action, you touch a willing creature and mark it with the moon for up to 1 minute. It starts at New Moon and moves to the next phase at the end of each of its turns, returning to New Moon after Waning Moon.
- **New Moon:** It's invisible until it attacks or casts a spell.
- **Waxing Moon:** Its attacks deal an extra 2d6 radiant damage on a hit.
- **Full Moon:** Its attacks deal an extra 2d6 radiant damage on a hit, it sheds bright light in a 20-foot radius, and it regains hit points equal to twice your PB at the start of each of its turns.
- **Waning Moon:** It has resistance to all damage.

---

### Moonburst

```yaml
id: lunar_master_moonburst
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: expansion
domainText: You choose which creatures in the area it affects.
activation: action
```

As an action, a globe of chilling moonlight explodes in a 20-foot-radius sphere centered on a point within 120 feet. Each creature there makes a Dexterity saving throw against your essence ability save DC, taking 6d8 radiant damage on a failure or half as much on a success. Magical darkness in the area ends.

---

### Full Moon

```yaml
id: lunar_grandmaster_full_moon
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: bound
activation: bonus action
```

As a bonus action on your Consecrated Ground, you raise a full moon overhead for 1 minute, whatever the hour and even through stone.
- **Moon's Mercy:** When it rises, and at initiative count 20 each round after, you and any number of allies you can see there regain 2d8 hit points.
- **Nothing Hidden:** While it's up, no creature there can benefit from the Invisible condition, magical darkness there ends, and hostile shapechangers there return to their true form and can't change shape.

---

### Starburst

```yaml
id: v2_lunar_starburst
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Kobold Press Deep Magic
activation: action
```

A mote of starlight explodes in a 5-foot cube within 60 feet for 1d8 radiant damage on a failed Charisma save.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#starburst_kpdm).

---

### By the Light of the Moon

```yaml
id: v2_lunar_by_the_light_of_the_moon
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
concentration: true
```

Moonlight fills 30 feet around you for up to 1 minute, and Perception and Investigation checks made there have advantage.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#by%20the%20light%20of%20the%20moon_kpdm).

---

### Alter Moon Phase

```yaml
id: v2_lunar_alter_moon_phase
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Expanding Codex
activation: action
concentration: true
```

For up to 1 hour you change the moon's phase within 1 mile, which changes the light at night and affects creatures tied to the moon on a failed Wisdom save.

Source reference: [Kobold Press Expanding Codex on 5e.tools](https://5e.tools/spells.html#alter%20moon%20phase_expccodex).

---

### Moonbeam Form

```yaml
id: v2_lunar_moonbeam_form
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Expanding Codex
activation: reaction
```

As a reaction when you take damage or are restrained, you become a beam of moonlight for 1 round, immune to nonmagical weapons, passing through tiny openings, and flying 90 feet.

Source reference: [Kobold Press Expanding Codex on 5e.tools](https://5e.tools/spells.html#moonbeam%20form_expccodex).

---

### Fount of Moonlight

```yaml
id: v2_lunar_fount_of_moonlight
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

For up to 10 minutes you resist radiant damage and your melee attacks deal an extra 2d6 radiant damage. As a reaction when hurt, you can blind the attacker on a failed Constitution save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#fount%20of%20moonlight_xphb).

---

### Field of Stars

```yaml
id: v2_lunar_field_of_stars
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
```

Four motes of starlight float within 60 feet for 1 minute. A creature moving near one sets it off for 2d6 radiant damage on a failed Dexterity save, or half on a success.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#field%20of%20stars_belzormm).

---

### Starfall

```yaml
id: v2_lunar_starfall
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

Starlight strikes up to five creatures within 60 feet for 6d6 radiant damage, knocking them prone and blinding them on a failed Dexterity save, or half on a success.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#starfall_kpdm).

---

### Crown of Stars

```yaml
id: v2_sun_crown_of_stars
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

Seven motes of light orbit you for 1 hour. As a bonus action you hurl one as a ranged spell attack within 120 feet for 4d12 radiant damage.

Source reference: [D&D 5e XGE on 5e.tools](https://5e.tools/spells.html#crown%20of%20stars_xge).

---

### Summon Star

```yaml
id: v2_lunar_summon_star
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
concentration: true
```

A star in humanoid form, equal to a deva, appears within 90 feet and obeys you for up to 1 minute. Others who see it are charmed on a failed Wisdom save.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#summon%20star_kpdm).

---

### Moonfall

```yaml
id: v2_lunar_moonfall
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
```

A stone moon appears 1,500 feet above a point within 500 feet and falls 500 feet each turn, crushing creatures in its path. Its impact deals 12d12 bludgeoning damage within 100 feet.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#moonfall_belzormm).

---

### Supernova

```yaml
id: v2_lunar_supernova
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
```

A point of light you can see explodes for 30d8 radiant damage in a 60-foot radius, blinding creatures on a failed Constitution save, or half on a success.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#supernova_belzormm).

---

### Moonblood

```yaml
id: lunar_initiate_moonblood
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
```

You have advantage on Wisdom (Perception) checks that rely on hearing or smell. You can't be cursed with lycanthropy against your will, and lycanthropes recognize you as kin.

---

### Moonbound Form

```yaml
id: lunar_adept_moonbound_form
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: expansion
domainText: You're one size larger, and your reach is 5 feet longer.
activation: bonus action
```

As a bonus action, you take the hybrid shape of a wolf, bear, tiger, boar or rat for 1 minute, keeping your mind and your statistics. Your speed increases by 10 feet, and your unarmed strikes become claws and fangs that deal 2d6 slashing or piercing damage and can use your essence ability modifier for their attack and damage rolls. You have resistance to bludgeoning, piercing and slashing damage from weapons that aren't magical or silvered. You can't cast spells in this form, but you can still use techniques.

---

### Selûne's Pack

```yaml
id: lunar_master_selunes_pack
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
activation: action
concentration: true
```

As an action, you share the moon's gift with a number of willing creatures within 30 feet equal to your PB, for up to 1 minute. Each takes a hybrid shape: its speed increases by 10 feet, its unarmed strikes deal 2d6 slashing or piercing damage, and it has resistance to bludgeoning, piercing and slashing damage from weapons that aren't magical or silvered. It can't cast spells. This is a blessing, not a curse: they keep their minds, and it can't spread.

---

### Howl

```yaml
id: v2_lunar_howl
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Heliana's Guide to Monster Hunting
activation: action
```

A howl carries for 1,000 feet. One creature you're familiar with understands your meaning if it hears it, and can answer the same way.

Source reference: [Heliana's Guide to Monster Hunting on 5e.tools](https://5e.tools/spells.html#howl_helianasguidetomonsterhunting).

---

### Aspect of the Wolf

```yaml
id: v2_lunar_aspect_of_the_wolf
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
```

For 1 hour you become a wolf, keeping your mind. You use the wolf's hit points and body, and you can't cast spells until you change back.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#aspect%20of%20the%20wolf_bb1000s).

---

### Potency of the Pack

```yaml
id: v2_lunar_potency_of_the_pack
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

For 1 minute a group of creatures within 25 feet all gain one wolf trait: thick fur (+2 AC), keen hearing and smell, or pack tactics.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#potency%20of%20the%20pack_kpdm).

---

### Labyrinthine Howl

```yaml
id: v2_lunar_labyrinthine_howl
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

Enemies within 60 feet that fail a Wisdom save believe savage beasts are hunting them in a labyrinth. Each either takes 7d8 psychic damage, or falls prone and is stunned until the end of your next turn.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#labyrinthine%20howl_kpdm).
