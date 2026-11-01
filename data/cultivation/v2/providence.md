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
activation: action
```

A creature within 15 feet at 0 hit points becomes stable.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#spare%20the%20dying_xphb).

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
activation: action
```

As an action, you touch a willing creature, granting it immediate relief from minor physical burdens. The target gains **1d4 temporary hit points** and can immediately repeat a saving throw against one condition affecting it: **poisoned** or **one level of exhaustion**. If the target succeeds, the condition or exhaustion level ends.

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
activation: action
concentration: true
```

As an action, choose one creature you can see within 60 feet. For up to 1 minute, the target gains **advantage on saving throws against the frightened and charmed conditions**.

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
activation: action
```

As an action, you touch a living, willing creature. The target instantly regains **10d10 hit points**. You take **necrotic damage equal to half the number of hit points restored**. If this damage reduces you to 0 hit points, you immediately stabilize, but you gain **one level of exhaustion**.

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
activation: action
concentration: true
```

As an action, you touch a willing creature, which gains **40 temporary hit points** for up to 1 minute. While the target has these temporary hit points, it has **advantage on Strength and Constitution saving throws**, and **advantage on death saving throws**.

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
concentration: true
activation: action
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
activation: action
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
activation: action
concentration: true
```

A willing creature you touch adds 1d4 to ability checks with one skill you choose, for up to 1 minute.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#guidance_xphb).

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
activation: action
concentration: true
```

A willing creature you touch reduces damage of one type you choose by 1d4, once per turn, for up to 1 minute.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#resistance_xphb).

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
activation: action
concentration: true
```

Any number of creatures within 30 feet have advantage on Wisdom and death saves, and regain maximum hit points from healing, for up to 1 minute.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#beacon%20of%20hope_xphb).

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
activation: action
```

The first time a creature you touch would drop to 0 hit points within 8 hours, it drops to 1 instead.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#death%20ward_xphb).

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
activation: action
```

Up to three creatures within 30 feet gain 5 to their hit point maximum and current hit points for 8 hours.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#aid_xphb).

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
activation: action
```

A willing creature you touch gains +1 AC and saves and resistance to all damage for 1 hour, and you take the same damage it does.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#warding%20bond_xphb).

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
activation: action
```

For 1 hour a willing creature you touch ignores difficult terrain and can't be paralyzed, restrained or slowed by magic.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#freedom%20of%20movement_xphb).

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
activation: action
concentration: true
```

As an action, you strike one creature you can see within 120 feet with a beam of gray energy. The target makes a **Wisdom saving throw with disadvantage**. On a failed save, the target takes **4d10 necrotic damage** and is **stunned by blinding pain** until the start of your next turn. On a successful save, the target takes half damage and is not stunned, and the effect ends.

At the start of each of your subsequent turns for up to 4 rounds, the target must repeat the Wisdom saving throw, this time **without disadvantage**. On a failure, the target takes **4d10 necrotic damage** and remains stunned until the start of your next turn. On a success, the target takes half damage, and the effect ends.

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
activation: action
concentration: true
```

Up to three creatures within 30 feet add 1d4 to attack rolls and saving throws for up to 1 minute.

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
activation: action
concentration: true
```

A willing creature you touch is immune to fear and gains temporary hit points equal to your spellcasting modifier each turn for up to 1 minute.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#heroism_xphb).

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
activation: reaction
```

As a reaction to elemental damage, you gain resistance to it, and your next melee hit deals an extra 1d6 of that type.

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

You inscribe a glyph that triggers an explosion of 5d8 elemental damage or a stored spell when its condition is met.

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
ritual: true
```

A 10-foot dome forms around you for 8 hours, keeping out creatures, spells and weather.

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
activation: action
concentration: true
```

Spirits fill a 15-foot emanation around you for up to 10 minutes. Enemies there have half speed and take 3d8 radiant or necrotic damage on a failed Wisdom save.

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
activation: action
```

A spectral guardian within 30 feet deals 20 radiant damage to enemies that come within 10 feet of it on a failed Dexterity save, up to 60 in total.

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

A god or other great power sends a Celestial, Elemental or Fiend to help you, for a price you negotiate.

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
activation: action
concentration: true
```

Allies in a 30-foot aura have advantage on saves against magic and take no damage on a successful save for up to 10 minutes.

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
activation: bonus action
concentration: true
```

A weapon you touch deals an extra 2d8 radiant damage for up to 1 hour. You can end it to blind nearby enemies.

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

A feast for up to twelve creatures cures disease and poison, grants immunity to poison and fear, and adds 2d10 hit points for 24 hours.

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
activation: action
```

Up to six creatures within 60 feet share 120 temporary hit points as you divide them.

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
activation: action
concentration: true
```

Creatures of your choice in a 30-foot aura have advantage on all saves, and attacks against them have disadvantage, for up to 1 minute.

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
activation: action
```

A creature within 60 feet is healed to full, cured of poison, has its low ability scores raised to 18, and gains an archangel's blessing.

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
activation: action
```

You burn yourself to death. Creatures in a 30-foot emanation take 30d6 radiant damage and gain exhaustion on a failed Constitution save, and you can return to life.

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
activation: reaction
```

A creature within 60 feet is immune to all damage except psychic and has advantage on saves until the end of its next turn.

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
activation: action
concentration: true
```

A pillar of celestial light within 90 feet heals your allies or deals radiant damage to your foes in a 10-foot-radius cylinder for up to 10 minutes.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#conjure%20celestial_xphb).


