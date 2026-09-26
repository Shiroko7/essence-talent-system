# Providence Cultivation Path

Tradition: Divine
Concept: Ilmater’s endurance, hope, protection, healing, and freedom from bonds.

### Spare the Dying

```yaml
id: providence_cantrip_spare_the_dying
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Necromancy
```

You touch a living creature that has 0 hit points. The creature becomes stable immediately.

https://5e.tools/spells.html#spare%20the%20dying_xphb

---

### Unbroken Spirit

```yaml
id: providence_initiate_unbroken_spirit
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Order of the Broken Arrow (Ilmater)
location: Leatrux
```

Your resolve remains steadfast under trial. When you or an ally within 15 feet makes a saving throw against being frightened or charmed, or rolls a death saving throw, the creature adds a d4 to the result. Additionally, when you are below half your maximum hit points, your movement speed cannot be reduced by difficult terrain.

---

### Touch of Respite

```yaml
id: providence_initiate_touch_of_respite
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
location: Leatrux
```

**Casting Time:** 1 action 
**Range:** Touch 
**Components:** V, S 
**Duration:** Instantaneous 
**Portfolio:** Endurance

You touch a willing creature, granting it immediate relief from minor physical burdens. The target gains **1d4 temporary hit points** and can immediately repeat a saving throw against one condition affecting it: **poisoned** or **one level of exhaustion**. If the target succeeds, the condition or exhaustion level ends.

---

### Boon of Fortitude

```yaml
id: providence_initiate_boon_of_fortitude
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
location: Leatrux
```

**Casting Time:** 1 action 
**Range:** 60 feet 
**Components:** V, S 
**Duration:** Concentration, up to 1 minute **Portfolio:** Endurance

You choose one creature you can see within range. For the duration, the target gains **advantage on saving throws against the frightened and charmed conditions**.

Additionally, the target becomes **immune to the stunned and incapacitated conditions** if the effect is caused by pain, torture, or physical trauma (such as damage that causes shock, not magical effects). The target is considered to be acting normally despite grievous physical wounds.

## Adept Tier

---

### Gift of Enduring Faith

```yaml
id: providence_adept_gift_of_enduring_faith
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
location: Leatrux
```

**Casting Time:** 1 action 
**Range:** Touch 
**Components:** V, S 
**Duration:** Instantaneous 
**Portfolio:** Endurance

You touch a living, willing creature. The target instantly regains **10d10 hit points**. You take **necrotic damage equal to half the number of hit points restored**. If this damage reduces you to 0 hit points, you immediately stabilize, but you gain **one level of exhaustion**.

---

### Endurance of Ilmater

```yaml
id: providence_adept_endurance_of_ilmater
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
location: Leatrux
```

**Casting Time:** 1 action 
**Range:** Touch 
**Components:** V, S 
**Duration:** Concentration, up to 1 minute **Portfolio:** Endurance

One willing creature you touch gains **40 temporary hit points**. While the target has these temporary hit points, it has **advantage on Strength and Constitution saving throws**, and **advantage on death saving throws**.

Additionally, the target **cannot be knocked prone, moved, or grappled** against its will by any nonmagical means.

---

### Martyr’s Flame Aura

```yaml
id: fire_essence_martyrs_flame_aura
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Mario (Ilmater's Chosen)
location: Leatrux
```

You wreathe yourself in holy fire for up to 1 minute (requires concentration), creating a 30-foot protective aura centered on you:
- Friendly creatures within the aura gain resistance to fire damage.
- When an ally enters the aura or starts its turn inside it, it gains temporary hit points equal to 2d6 + your Charisma modifier.

The flames warm and protect, never harming your allies.

---

### Liberation’s Gale

```yaml
id: wind_master_essence_liberations_gale
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Mario (Ilmater's Chosen)
location: Leatrux
```

A cleansing wind sweeps from you to creatures within 60 feet. Choose up to six targets:
- Each target immediately ends one of the following conditions affecting it: **Blinded**, **Charmed**, **Deafened**, **Frightened**, **Grappled**, **Paralyzed**, **Petrified**, **Poisoned**, **Restrained**, or **Stunned**.
- For 1 minute, those creatures also have advantage on saving throws against those same conditions.

In addition, for 1 minute, you become an unyielding force:
- You cannot be knocked prone, grappled, restrained, paralyzed, stunned, or moved against your will.
- Whenever you hit a creature with a melee attack, you may push it 10 feet or knock it prone.

## Cantrips

---

### Guidance

```yaml
id: providence_cantrip_guidance
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Divination
```

You touch one willing creature. The target can add 1d4 to one ability check of its choice.

https://5e.tools/spells.html#guidance_xphb

---

### Resistance

```yaml
id: providence_cantrip_resistance
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Abjuration
```

You touch one willing creature, granting perseverance. Once before the spell ends, the target can roll a d4 and add it to one saving throw.

https://5e.tools/spells.html#resistance_xphb

## Spells

---

### Beacon of Hope

```yaml
id: providence_3rd_beacon_of_hope
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Life & Peace)
```

Targets have advantage on Wisdom saves and death saves, and receive the maximum possible healing from any source.

https://5e.tools/spells.html#beacon%20of%20hope_xphb

---

### Death Ward

```yaml
id: providence_4th_death_ward
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
```

The first time the target would drop to 0 hit points as a result of taking damage, it instead drops to 1 hit point.

https://5e.tools/spells.html#death%20ward_xphb

---

### Aid

```yaml
id: providence_2nd_aid
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
```

Bolster up to three creatures with resolve. Each target's current and maximum hit points increase by 5 for 8 hours.

https://5e.tools/spells.html#aid_xphb

---

### Warding Bond

```yaml
id: providence_2nd_warding_bond
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Peace Domain
```

You ward an ally: +1 AC, +1 to saves, resistance to all damage. Whenever the ally takes damage, you take an equal amount of damage.

https://5e.tools/spells.html#warding%20bond_xphb

---

### Freedom of Movement

```yaml
id: providence_4th_freedom_of_movement
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
```

Target's movement is unaffected by difficult terrain, and spells cannot reduce speed or paralyze/restrain it.

https://5e.tools/spells.html#freedom%20of%20movement_xphb

---

### Agony of the Martyr

```yaml
id: providence_master_agony_of_the_martyr
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
location: Leatrux
```

**Casting Time:** 1 action 
**Range:** 120 feet 
**Components:** V, S 
**Duration:** Concentration, up to 4 rounds **Portfolio:** Endurance

A beam of gray energy strikes one creature you can see. The target makes a **Wisdom saving throw with disadvantage**. On a failed save, the target takes **4d10 necrotic damage** and is **stunned by blinding pain** until the start of your next turn. On a successful save, the target takes half damage and is not stunned, and the spell ends.

At the start of each of your subsequent turns for the duration, the target must repeat the Wisdom saving throw, this time **without disadvantage**. On a failure, the target takes **4d10 necrotic damage** and remains stunned until the start of your next turn. On a success, the target takes half damage, and the spell ends.

## Cantrips

---

### Bless

```yaml
id: v2_providence_bless
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

Several creatures gain a small measure of divine aid on attacks and saving throws.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#bless_phb).

---

### Heroism

```yaml
id: providence_1st_heroism
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Paladin / Cleric (Peace Domain)
```

A willing creature is imbued with bravery: immune to being frightened, and gains temporary HP at the start of each turn.

https://5e.tools/spells.html#heroism_xphb

---

### Fortune Favors the Swift

```yaml
id: wind_adept_fortune_favors_the_swift
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Wang Dabao
location: Phudara / Isle of Whispers
```

Whenever you expend a spell slot, you gain a d6 “wind die”. You can add it to one d20 roll before the end of your next turn.

---

## Spells restored from V1

---

### Absorb Elements

```yaml
id: acid_1st_level_absorb_elements
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

As a reaction you gain resistance to incoming elemental damage and add it to your next melee hit.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#absorb%20elements_xge).

---

### Glyph of Warding

```yaml
id: acid_3rd_level_glyph_of_warding
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

You inscribe a hidden glyph that releases an explosion or a stored spell when triggered.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#glyph%20of%20warding_xphb).

---

### Leomund's Tiny Hut

```yaml
id: wood_3rd_level_leomunds_tiny_hut
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A dome of force shelters you and your companions and keeps others and outside magic out.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#leomund's%20tiny%20hut_xphb).

---

### Spirit Guardians

```yaml
id: wood_3rd_level_spirit_guardians
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

Protective spirits circle you, slowing enemies and dealing radiant or necrotic damage to them.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#spirit%20guardians_xphb).

---

### Guardian of Faith

```yaml
id: wood_4th_level_guardian_of_faith
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A spectral guardian of your deity damages each enemy that comes near it, until it has dealt 60 damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#guardian%20of%20faith_xphb).

---

### Planar Ally

```yaml
id: wood_6th_level_planar_ally
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

You beseech a powerful being, who sends a celestial, elemental, or fiend to aid you in exchange for payment.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#planar%20ally_xphb).

---

### Circle of Power

```yaml
id: v2_providence_circle_of_power
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A 30-foot aura gives you and your allies advantage on saves against magic, and successful saves against half-damage effects deal no damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#circle%20of%20power_xphb).

---

### Holy Weapon

```yaml
id: v2_providence_holy_weapon
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

A weapon you touch shines with holy light and deals an extra 2d8 radiant damage; you can dismiss it in a radiant burst that blinds foes.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#holy%20weapon_xge).

---

### Heroes' Feast

```yaml
id: v2_providence_heroes_feast
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

Up to twelve creatures share a feast that cures poison and disease and grants poison immunity, fear immunity, advantage on Wisdom saves, and extra hit points for 24 hours.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#heroes'%20feast_xphb).

---

### Power Word Fortify

```yaml
id: v2_providence_power_word_fortify
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

Up to six creatures you can see share 120 temporary hit points.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#power%20word%20fortify_xphb).

---

### Holy Aura

```yaml
id: v2_providence_holy_aura
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A 30-foot aura gives allies advantage on all saves and imposes disadvantage on attacks against them; fiends and undead that strike them are blinded.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#holy%20aura_xphb).

---

### Perfection

```yaml
id: v2_providence_perfection
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
```

A holy word remakes a creature in an Arch Seraph’s image: fully healed, curses suppressed, ability scores below 18 raised to 18, and a seraph’s blessing.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#perfection_grimhollowpg24).

---

### Phoenix Flames

```yaml
id: v2_providence_phoenix_flames
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
```

You die in a burst of holy fire that deals 30d6 radiant damage around you, then rise from the ashes 10 minutes later.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#phoenix%20flames_grimhollowpg24).

---

### Power Word Shield

```yaml
id: v2_providence_power_word_shield
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Heliana's Guide to Monster Hunting
```

A word shields a creature: until the end of its next turn it is immune to all but psychic damage and has advantage on saves.

Source reference: [Heliana's Guide to Monster Hunting on 5e.tools](https://5e.tools/spells.html#power%20word%20shield_helianasguidetomonsterhunting).

---

### Conjure Celestial

```yaml
id: wood_7th_level_conjure_celestial
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A pillar of celestial light heals allies and sears enemies within it; you can move it each turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#conjure%20celestial_xphb).
