# Lunar Cultivation Path

Tradition: Divine
Concept: Selûne’s moon, stars, cycles, navigation, dreams, and celestial foresight.

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
```

As an action, you fire a beam of toxic moonlight at a creature within 60 feet. Make a ranged spell attack:
- **On a hit:** The target takes 3d6 radiant damage + 3d6 poison damage and must make a Constitution saving throw against your spell save DC.
- **On a failed save:** The target is blinded and poisoned until the end of your next turn.

## Master Tier

---

### Lunar Tide

```yaml
id: water_master_lunar_tide
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
```

As a reaction when you or creatures within 30 feet are subjected to a Dexterity saving throw against an ability that deals damage, you summon a protective wave of water guided by lunar force. All affected creatures reduce the damage taken by 2d8 + your spellcasting modifier. The water then dissipates harmlessly.

---

### Moonfall Condemnation

```yaml
id: water_master_moonfall_condemnation
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yuji (Shadow Sect)
location: Leatrux
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
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yuji (Shadow Sect)
location: Leatrux
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
author: Yuji (Shadow Sect)
location: Leatrux
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
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Twilight Domain) / Druid
```

Each object in a 20-foot cube is outlined in blue, green, or violet lunar light. Creatures fail a Dexterity save or are illuminated, granting advantage on attack rolls against them.

https://5e.tools/spells.html#faerie%20fire_xphb

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
```

A silvery beam of pale light shines down in a 5-foot-radius cylinder. A creature entering the area or starting its turn there must make a Constitution saving throw or take 2d10 radiant damage.

https://5e.tools/spells.html#moonbeam_xphb

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
```

For the duration, you see invisible creatures and objects as if they were visible, and can perceive into the Ethereal Plane.

https://5e.tools/spells.html#see%20invisibility_xphb

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
```

https://5e.tools/spells.html#alustriel's%20mooncloak_frhof

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
```

You give a willing creature the ability to see things as they actually are out to 120 feet: see in darkness, notice secret doors, see invisible creatures, and see into the Ethereal Plane.

https://5e.tools/spells.html#true%20seeing_xphb

---

### Mirror Image

```yaml
id: v2_moon_mirror_image
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

Several illusory reflections surround you, confusing attacks aimed at your true form.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#mirror%20image_phb).

---

### Blur

```yaml
id: v2_moon_blur
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

Your outline shifts and shimmers, making your position difficult to read.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#blur_phb).

---

### Shapechange

```yaml
id: v2_moon_shapechange
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

You take the form of another creature while retaining your own mind and abilities.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#shapechange_phb).

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
```

You create up to four small lights that hover, move, and change position at your direction.

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

You bestow supreme celestial foresight. The target cannot be surprised and has advantage on attack rolls, ability checks, and saving throws for 8 hours.

https://5e.tools/spells.html#foresight_xphb

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
```

Your magic puts you in direct contact with Selûne or her celestial servants. You ask a single question concerning a specific goal or event within 7 days, receiving a truthful cryptic reply.

https://5e.tools/spells.html#divination_xphb

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

This spell shapes a creature's dreams through the silver veil of Selûne, acting as a celestial messenger across any distance or plane.

https://5e.tools/spells.html#dream_xphb

---

### Light

```yaml
id: moon_cantrip_light
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Evocation
```

You touch one object. Until the spell ends, the object sheds bright sunlight in a 20-foot radius and dim light for an additional 20 feet.

https://5e.tools/spells.html#light_xphb

---

### Guiding Bolt

```yaml
id: moon_1st_guiding_bolt
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Evocation
```

A flash of sunlight streaks toward a creature of your choice within range. On a hit, the target takes 4d6 radiant damage, and the next attack roll against it has advantage.

https://5e.tools/spells.html#guiding%20bolt_xphb

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
```

Seven motes of starlight orbit you and can be hurled as radiant projectiles.

Source reference: [D&D 5e XGE on 5e.tools](https://5e.tools/spells.html#crown%20of%20stars_xge).

---
