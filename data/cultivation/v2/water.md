# Water Cultivation Path

Tradition: Primordial
Concept: Water, ice, mist, tides, and fluid adaptation.

### Echoes of the Deep

```yaml
id: water_initiate_echoes_of_the_deep
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

You can communicate with aquatic creatures or spirits of water, allowing you to understand their language and gain information about underwater locations or hidden treasures.

---

### Ice Form

```yaml
id: water_initiate_ice_form
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

As a bonus action, you can turn your body into ice for 1 minute. You gain resistance to cold and fire damage and your movement speed is reduced by 10 feet.

---

### Tide's Reflection Art I (Thalassios)

```yaml
id: water_adept_tides_reflection_art_i
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Phudara / Isle of Whispers
```

As a bonus action, you summon a Water Clone in an unoccupied space you can see within 30 feet. The clone lasts for 1 minute or until destroyed. The clone is linked to your senses, allowing you to cast spells through it as if you were in its space.

**Clone Statistics:**
- **Armor Class:** Your spell save DC (8 + proficiency bonus + spellcasting modifier)
- **Hit Points:** Equal to half your hit point maximum
- **Speed:** Equal to your swimming speed
- **Damage Resistances:** Fire
- **Damage Immunities:** Cold
- **Damage Vulnerabilities:** Lightning

**Commanding the Clone:**
As a bonus action, you can command the clone to move and take one of the following actions:
- **Melee Spell Attack:** Reach 10 ft., dealing 1d8 + your spellcasting modifier cold damage.
- **Ranged Spell Attack:** Range 60 ft., dealing 1d6 + your spellcasting modifier cold damage.
- **Utility:** Take the Dash, Dodge, or Disengage action.

### Restorative Rain

```yaml
id: water_initiate_restorative_rain
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

As an action, you create a 20-foot radius of gentle rain centered on you that lasts for a number of rounds equal to your maximum Water essences. At the start of each of their turns while in the rain, they regain 1 hit point.


---

## Adept Tier

---

### Aqua Agility

```yaml
id: water_adept_aqua_agility
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

Your swimming speed equals your walking speed. Additionally, you gain the ability to breathe underwater and move through water at your normal speed without penalty.

---

### Tidal Surge

```yaml
id: water_adept_tidal_surge
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

You can summon a powerful wave of water that heals and revitalizes. As an action, you create a wave that washes over allies in a 30-foot radius, restoring hit points equal to 3d8 + your spellcasting ability modifier.

---

### Glacial Shield

```yaml
id: water_adept_glacial_shield
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

As a reaction, you can spend one spell slot and encase yourself in a barrier of ice, granting you temporary hit points equal to ten times the spell level used plus your spell casting modifier. This lasts for 1 hour.

---

### Hydroportation

```yaml
id: water_adept_hydroportation
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

As a bonus action, you can teleport up to 60 feet to a space you can see within a body of water or mist. You must be in contact with the water or mist to use this ability.

---

### Misty Escape

```yaml
id: wind_adept_misty_escape
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

When you take damage, you can use your reaction to turn into a cloud of mist, causing the attack to miss. You must spend a spell slot of 1st level or higher to use this ability.

---

### Tide's Reflection Art II (Thalassios)

```yaml
id: water_adept_tides_reflection_art_ii
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Phudara / Isle of Whispers
```

As a reaction, you can spend 2 Essence to cause one of your Water Clones to detonate in a 10-foot radius burst of frigid water. Each creature in range must make a Dexterity saving throw, taking cold damage equal to half the clone's maximum hit points on a failed save, or half as much on a successful one.

In addition, you can now summon up to two Water Clones simultaneously. When they attack together, their attack damage increases by one damage die.

## Master Tier

---

### Aura of the Deep Bulwark

```yaml
id: water_master_aura_of_the_deep_bulwark
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Kwon Jae-Hwan
location: Sirius
```

As an action, you radiate a massive, pressurized sphere of dampening aqueous vapor extending from you in a 120-foot radius for 1 minute.

While inside this aura, you and friendly creatures gain resistance to fire damage and force damage. In addition, affected creatures have advantage on saving throws against spells, traps, munitions, and hazards that produce an explosion or concussive blast (such as *Fireball*, *Shatter*, explosive barrels, or demolition charges).

---

### Tide's Reflection Art III (Thalassios)

```yaml
id: water_adept_tides_reflection_art_iii
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Selûne
location: Phudara / Isle of Whispers
```

As a bonus action, you can instantly swap places with one of your Water Clones without provoking opportunity attacks.

In addition, your mastery deepens:
- You can now summon up to three Water Clones simultaneously.
- Your Water Clones last for 10 minutes.
- Your Water Clones emit dim moonlight in a 60-foot radius around them.

## Cantrips

---

### Frostbite

```yaml
id: water_cantrip_frostbite
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
```

https://5e.tools/spells.html#frostbite_xge

---

### Ray of Frost

```yaml
id: water_cantrip_ray_of_frost
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
```

https://5e.tools/spells.html#ray%20of%20frost_xphb

---

### Shape Water

```yaml
id: water_cantrip_shape_water
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
```

https://5e.tools/spells.html#shape%20water_xge

## Spells

---

### Create or Destroy Water

```yaml
id: water_1st_level_create_or_destroy_water
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#create%20or%20destroy%20water_xphb

---

### Rime's Binding Ice

```yaml
id: water_2nd_level_rimes_binding_ice
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#rime's%20binding%20ice_ftd

---

### Water Walk

```yaml
id: water_3rd_level_water_walk
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#water%20walk_xphb

---

### Control Water

```yaml
id: water_4th_level_control_water
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#control%20water_xphb

---

### Cone of Cold

```yaml
id: tempest_5th_cone_of_cold
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Evocation / Glacial Squall
```

A 60-foot cone of subzero sea squall blasts creatures for 8d8 cold damage, freezing corpses into statues.

https://5e.tools/spells.html#cone%20of%20cold_xphb

---

### Wall of Water

```yaml
id: water_3rd_level_wall_of_water
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#wall%20of%20water_xge

---

### Water Breathing

```yaml
id: water_3rd_level_water_breathing
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#water%20breathing_xphb

---

### Conjure Ocean

```yaml
id: water_3rd_level_conjure_ocean
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#conjure%20ocean_obojimatallgrass

---

## Spells restored from V1

---

### Bubble Lift

```yaml
id: water_1st_level_bubble_lift
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
```

You blow a bubble around an object of up to 500 pounds, making it float 4 feet off the ground and easy to push.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#bubble%20lift_obojimatallgrass).

---

### Frost Fingers

```yaml
id: water_1st_level_frost_fingers
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (IDRotF)
```

Freezing cold sprays from your fingertips in a 15-foot cone, dealing cold damage and freezing water in the area.

Source reference: [D&D 5e (IDRotF) on 5e.tools](https://5e.tools/spells.html#frost%20fingers_idrotf).

---

### Ice Knife

```yaml
id: water_1st_level_ice_knife
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

A shard of ice pierces one target, then explodes, dealing cold damage to creatures around it.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#ice%20knife_xge).

---

### Water Bullet

```yaml
id: water_1st_level_water_bullet
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
```

A spinning sphere of water deals bludgeoning damage that is highest at close range.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#water%20bullet_obojimatallgrass).

---

### Whelm Weapon

```yaml
id: water_1st_level_whelm_weapon
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
```

Water envelops up to three weapons, reducing all damage they deal by a d4 for the duration.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#whelm%20weapon_obojimatallgrass).

---

### Snilloc's Snowball Swarm

```yaml
id: water_2nd_level_snillocs_snowball_swarm
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

A flurry of magic snowballs bursts in a 5-foot radius, dealing 3d6 cold damage.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#snilloc's%20snowball%20swarm_xge).

---

### Freedom of the Waves

```yaml
id: water_3rd_level_freedom_of_the_waves
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Tal'Dorei Campaign Setting Reborn
```

A deluge of seawater batters and knocks creatures prone in a 15-foot cylinder while sparing chosen allies.

Source reference: [Tal'Dorei Campaign Setting Reborn on 5e.tools](https://5e.tools/spells.html#freedom%20of%20the%20waves_taldoreicampaignsettingreborn).

---

### Watery Sphere

```yaml
id: water_4th_level_watery_sphere
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

A hovering sphere of water engulfs and restrains creatures, and you can roll it to sweep up more.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#watery%20sphere_xge).

---

### Crustacean Form

```yaml
id: water_6th_level_crustacean_form
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
```

An ethereal crustacean shell sets your AC to 20 and grants swimming, blindsight, and claw attacks.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#crustacean%20form_obojimatallgrass).

---

### Investiture of Ice

```yaml
id: water_6th_level_investiture_of_ice
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

Ice rimes your body: immunity to cold, icy ground around you, and a freezing cone you can unleash as an action.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#investiture%20of%20ice_xge).

---

### Otiluke's Freezing Sphere

```yaml
id: wind_6th_level_otilukes_freezing_sphere
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A frigid globe explodes in a 60-foot radius for 10d6 cold damage and freezes water; you can hold it as a grenade.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#otiluke's%20freezing%20sphere_xphb).

---

### Wall of Ice

```yaml
id: water_6th_level_wall_of_ice
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

You shape a wall or dome of ice that damages creatures it appears around and leaves a frigid sheet when broken.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#wall%20of%20ice_xphb).

---

### Ice Soldiers

```yaml
id: v2_water_ice_soldiers
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
```

Water poured from a vial forms two ice soldiers that obey your mental commands, each hunting its chosen foe until it dies, then melting away.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#ice%20soldiers_kpdm).

---

### Triumph of Ice

```yaml
id: v2_water_triumph_of_ice
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
```

You turn one element to ice or snow in a 100-foot sphere: air becomes snowfall, earth becomes permafrost, fire becomes ice shards, or water freezes solid.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#triumph%20of%20ice_kpdm).

---

### Glacial Cascade

```yaml
id: v2_water_glacial_cascade
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
```

Pure cold fills a 30-foot sphere around you for 10d8 cold damage; a creature killed by it turns to ice.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#glacial%20cascade_kpdm).

---

### Great Wave

```yaml
id: v2_water_great_wave
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Spells That Don't Suck
```

A wall of water up to 300 feet long and high rolls across the battlefield, battering and carrying away the creatures in its path.

Source reference: [Spells That Don't Suck on 5e.tools](https://5e.tools/spells.html#great%20wave_spellsthatdontsuck).

---

### Grand Flood

```yaml
id: v2_water_grand_flood
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond
```

Water rises from the lowest ground around you, flooding the land 20 feet each round until it has dropped the equivalent of 20 feet of rain.

Source reference: [The Elements and Beyond on 5e.tools](https://5e.tools/spells.html#grand%20flood_teb).

---

### Glacial Tide

```yaml
id: v2_water_glacial_tide
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond: Spell Variants
```

A 500-foot wave of ice and glacial water deals cold and force damage, hurling creatures back and knocking them prone.

Source reference: [The Elements and Beyond: Spell Variants on 5e.tools](https://5e.tools/spells.html#glacial%20tide_teb:sv).

---

### Deep Freeze

```yaml
id: v2_water_deep_freeze
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond
```

You freeze the liquid inside a creature, paralyzing it and dealing 7d10 + 30 cold damage; a creature killed by it turns entirely to ice.

Source reference: [The Elements and Beyond on 5e.tools](https://5e.tools/spells.html#deep%20freeze_teb).

---

### Ice Mountain

```yaml
id: v2_water_ice_mountain
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elemental Spellbook
```

A 200-foot mountain of glacial ice erupts from the ground, tossing creatures into the air and crushing anything flying above it.

Source reference: [The Elemental Spellbook on 5e.tools](https://5e.tools/spells.html#ice%20mountain_theelementalspellbookspellsoficefireandlightning).
