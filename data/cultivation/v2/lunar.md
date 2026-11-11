# Lunar Cultivation Path

Tradition: Divine
Concept: Selûne’s moon, stars, cycles, navigation, dreams, and celestial foresight.
Facets: Moonlight, Stars, Visions

### Moonlit Verdant Beam

```yaml
id: water_adept_moonlit_verdant_beam
tier: adept
facets: moonlight
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
facets: moonlight
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
facets: moonlight
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
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
facets: moonlight
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
facets: moonlight
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
activation: bonus action
```

As a bonus action, launch up to three crescent-shaped energy blades that travel up to 150 feet. The sabers curve around cover, ignoring half and three-quarters cover.

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
facets: moonlight
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
facets: moonlight
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
facets: visions
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
facets: visions
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
facets: moonlight
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
facets: visions
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
facets: stars
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
facets: visions
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
facets: visions
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
facets: visions
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Twilight Domain) / Illusion
```

You enter a creature's dreams to speak with it, or to give it a nightmare that deals 3d6 psychic damage and denies it rest.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#dream_xphb).

---

### Crown of Stars

```yaml
id: v2_sun_crown_of_stars
tier: 7th
facets: stars
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

### Arcane Aegis

```yaml
id: metal_1st_level_arcane_aegis
tier: 1st
facets: moonlight
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
facets: moonlight
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
facets: visions
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

### Locate Creature

```yaml
id: wood_4th_level_locate_creature
tier: 4th
facets: visions
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

For up to 1 hour you sense the direction of a creature you know within 1,000 feet.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#locate%20creature_xphb).

---

### Magic Mirror

```yaml
id: acid_5th_level_magic_mirror
tier: 5th
facets: moonlight
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
facets: stars
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
facets: stars
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
facets: visions
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
facets: visions
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
facets: visions
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


