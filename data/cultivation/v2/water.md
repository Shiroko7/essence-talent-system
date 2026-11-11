# Water Cultivation Path

Tradition: Primordial
Concept: Water, ice, mist, tides, and fluid adaptation.
Facets: Water, Ice

### Tidespeech

```yaml
id: water_initiate_echoes_of_the_deep
tier: initiate
facets: water
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
facets: ice
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you can turn your body into ice for 1 minute. You gain resistance to cold and fire damage and your movement speed is reduced by 10 feet.

---

### Tide's Reflection Art I (Thalassios)

```yaml
id: water_adept_tides_reflection_art_i
tier: initiate
series: tides_reflection_art
stages: add
facets: water
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Phudara / Isle of Whispers
activation: bonus action
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
facets: water
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
activation: action
```

As an action, you create a 20-foot radius of gentle rain centered on you that lasts for a number of rounds equal to your maximum Water essences. At the start of each of their turns while in the rain, they regain 1 hit point.


---

## Adept Tier

---

### Aqua Agility

```yaml
id: water_adept_aqua_agility
tier: adept
facets: water
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
facets: water
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
activation: action
```

You can summon a powerful wave of water that heals and revitalizes. As an action, you create a wave that washes over allies in a 30-foot radius, restoring hit points equal to 3d8 + your spellcasting ability modifier.

---

### Glacial Shield

```yaml
id: water_adept_glacial_shield
tier: adept
facets: ice
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
activation: reaction
```

As a reaction, you can spend one spell slot and encase yourself in a barrier of ice, granting you temporary hit points equal to ten times the spell level used plus your spell casting modifier. This lasts for 1 hour.

---

### Hydroportation

```yaml
id: water_adept_hydroportation
tier: adept
facets: water
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you can teleport up to 60 feet to a space you can see within a body of water or mist. You must be in contact with the water or mist to use this ability.

---

### Misty Escape

```yaml
id: wind_adept_misty_escape
tier: adept
facets: water
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
series: tides_reflection_art
stages: add
facets: water
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Phudara / Isle of Whispers
activation: reaction
```

As a reaction, you can cause one of your Water Clones to detonate in a 10-foot radius burst of frigid water. Each creature in range must make a Dexterity saving throw, taking cold damage equal to half the clone's maximum hit points on a failed save, or half as much on a successful one.

In addition, you can now summon up to two Water Clones simultaneously. When they attack together, their attack damage increases by one damage die.

## Master Tier

---

### Aura of the Deep Bulwark

```yaml
id: water_master_aura_of_the_deep_bulwark
tier: master
facets: water
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Kwon Jae-Hwan
location: Sirius
activation: action
```

As an action, you radiate a massive, pressurized sphere of dampening aqueous vapor extending from you in a 120-foot radius for 1 minute.

While inside this aura, you and friendly creatures gain resistance to fire damage and force damage. In addition, affected creatures have advantage on saving throws against spells, traps, munitions, and hazards that produce an explosion or concussive blast (such as *Fireball*, *Shatter*, explosive barrels, or demolition charges).

---

### Tide's Reflection Art III (Thalassios)

```yaml
id: water_adept_tides_reflection_art_iii
tier: master
series: tides_reflection_art
stages: add
facets: water
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
facets: ice
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

A creature within 60 feet takes 1d6 cold damage on a failed Constitution save and has disadvantage on its next weapon attack.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#frostbite_xge).

---

### Ray of Frost

```yaml
id: water_cantrip_ray_of_frost
tier: cantrip
facets: ice
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

A ranged spell attack within 60 feet deals 1d8 cold damage and reduces the target's speed by 10 feet until your next turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#ray%20of%20frost_xphb).

---

### Shape Water

```yaml
id: water_cantrip_shape_water
tier: cantrip
facets: water, ice
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

You move, shape, color or freeze water in a 5-foot cube within 30 feet.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#shape%20water_xge).

## Spells

---

### Create or Destroy Water

```yaml
id: water_1st_level_create_or_destroy_water
tier: 1st
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

You create up to 10 gallons of water or rain in a 30-foot cube within 30 feet, or destroy as much water or fog.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#create%20or%20destroy%20water_xphb).

---

### Rime's Binding Ice

```yaml
id: water_2nd_level_rimes_binding_ice
tier: 2nd
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

A 30-foot cone of cold deals 3d8 cold damage and freezes creatures in place (speed 0) on a failed Constitution save, or half damage on a success.

Source reference: [D&D 5e (FTD) on 5e.tools](https://5e.tools/spells.html#rime's%20binding%20ice_ftd).

---

### Water Walk

```yaml
id: water_3rd_level_water_walk
tier: 3rd
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
ritual: true
```

Up to ten willing creatures within 30 feet can walk on water, mud, snow and lava as if it were solid ground for 1 hour.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#water%20walk_xphb).

---

### Control Water

```yaml
id: water_4th_level_control_water
tier: 4th
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

You control water in a cube up to 100 feet on a side within 300 feet for up to 10 minutes: flood, part, redirect or whirlpool.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#control%20water_xphb).

---

### Cone of Cold

```yaml
id: tempest_5th_cone_of_cold
tier: 5th
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Evocation / Glacial Squall
activation: action
```

A 60-foot cone of cold deals 8d8 cold damage on a failed Constitution save, or half on a success. A creature it kills becomes a frozen statue.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#cone%20of%20cold_xphb).

---

### Wall of Water

```yaml
id: water_3rd_level_wall_of_water
tier: 3rd
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A wall of water up to 30 feet long within 60 feet blocks fire, hinders ranged attacks and is difficult terrain to cross.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#wall%20of%20water_xge).

---

### Water Breathing

```yaml
id: water_3rd_level_water_breathing
tier: 3rd
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
ritual: true
```

Up to ten willing creatures within 30 feet can breathe underwater for 24 hours.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#water%20breathing_xphb).

---

### Conjure Ocean

```yaml
id: water_3rd_level_conjure_ocean
tier: 3rd
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A 20-foot cube of deep-ocean water appears within 60 feet and holds its shape. When the spell ends it crashes down and carries creatures 30 feet.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#conjure%20ocean_obojimatallgrass).

---

## Spells restored from V1

---

### Bubble Lift

```yaml
id: water_1st_level_bubble_lift
tier: 1st
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
activation: action
```

A bubble lifts an object of up to 500 pounds within 60 feet 4 feet off the ground, so it can be pushed along.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#bubble%20lift_obojimatallgrass).

---

### Frost Fingers

```yaml
id: water_1st_level_frost_fingers
tier: 1st
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (IDRotF)
activation: action
```

A 15-foot cone of cold deals 2d8 cold damage on a failed Constitution save, or half on a success, and freezes liquids.

Source reference: [D&D 5e (IDRotF) on 5e.tools](https://5e.tools/spells.html#frost%20fingers_idrotf).

---

### Ice Knife

```yaml
id: water_1st_level_ice_knife
tier: 1st
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

A ranged spell attack within 60 feet deals 1d10 piercing damage. Hit or miss, the shard explodes for 2d6 cold damage within 5 feet on a failed Dexterity save.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#ice%20knife_xge).

---

### Water Bullet

```yaml
id: water_1st_level_water_bullet
tier: 1st
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
activation: action
```

A ranged spell attack within 90 feet deals 5d6 bludgeoning damage within 10 feet, 4d6 within 60 feet, or 3d6 beyond.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#water%20bullet_obojimatallgrass).

---

### Whelm Weapon

```yaml
id: water_1st_level_whelm_weapon
tier: 1st
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
activation: action
concentration: true
```

Up to three weapons within 60 feet are wrapped in water. Their damage is reduced by 1d4.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#whelm%20weapon_obojimatallgrass).

---

### Snilloc's Snowball Swarm

```yaml
id: water_2nd_level_snillocs_snowball_swarm
tier: 2nd
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

Snowballs burst in a 5-foot-radius sphere within 90 feet for 3d6 cold damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#snilloc's%20snowball%20swarm_xge).

---

### Freedom of the Waves

```yaml
id: water_3rd_level_freedom_of_the_waves
tier: 3rd
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Tal'Dorei Campaign Setting Reborn
activation: action
```

A 15-foot-radius deluge within 120 feet deals 2d8 bludgeoning damage and knocks creatures prone on a failed Strength save.

Source reference: [Tal'Dorei Campaign Setting Reborn on 5e.tools](https://5e.tools/spells.html#freedom%20of%20the%20waves_taldoreicampaignsettingreborn).

---

### Watery Sphere

```yaml
id: water_4th_level_watery_sphere
tier: 4th
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

A 5-foot-radius sphere of water within 90 feet restrains creatures that fail a Strength save, and you can roll it 30 feet each turn.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#watery%20sphere_xge).

---

### Crustacean Form

```yaml
id: water_6th_level_crustacean_form
tier: 6th
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
activation: action
concentration: true
```

An ethereal crustacean shell gives you AC 20, a 40-foot swim speed, blindsight and a claw attack as a bonus action.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#crustacean%20form_obojimatallgrass).

---

### Investiture of Ice

```yaml
id: water_6th_level_investiture_of_ice
tier: 6th
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

For up to 10 minutes you're immune to cold and resist fire, the ground around you freezes, and you can blast a 15-foot cone of cold for 4d6 damage.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#investiture%20of%20ice_xge).

---

### Otiluke's Freezing Sphere

```yaml
id: wind_6th_level_otilukes_freezing_sphere
tier: 6th
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A frigid globe explodes in a 60-foot-radius sphere within 300 feet for 10d6 cold damage on a failed Constitution save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#otiluke's%20freezing%20sphere_xphb).

---

### Wall of Ice

```yaml
id: water_6th_level_wall_of_ice
tier: 6th
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A wall or dome of ice rises within 120 feet. Creatures it appears on take 10d6 cold damage on a failed Dexterity save, and breaking through leaves freezing air.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#wall%20of%20ice_xphb).

---

### Ice Soldiers

```yaml
id: v2_water_ice_soldiers
tier: 7th
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

Two ice soldiers appear within 30 feet and fight a target you name until it dies.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#ice%20soldiers_kpdm).

---

### Triumph of Ice

```yaml
id: v2_water_triumph_of_ice
tier: 7th
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
concentration: true
```

You turn one element within 100 feet into ice or snow, harming creatures of that element and neutralizing related magic.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#triumph%20of%20ice_kpdm).

---

### Glacial Cascade

```yaml
id: v2_water_glacial_cascade
tier: 8th
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

Pure cold fills a 30-foot-radius sphere around you for 10d8 cold damage on a failed Constitution save, or half on a success.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#glacial%20cascade_kpdm).

---

### Great Wave

```yaml
id: v2_water_great_wave
tier: 8th
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Spells That Don't Suck
activation: action
concentration: true
```

A wall of water at least 50 feet long and high crashes down on everything in its path. Taking longer to cast makes it bigger.

Source reference: [Spells That Don't Suck on 5e.tools](https://5e.tools/spells.html#great%20wave_spellsthatdontsuck).

---

### Grand Flood

```yaml
id: v2_water_grand_flood
tier: 9th
facets: water
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond
activation: action
```

Water rises 20 feet a round across a 1-mile area until it equals 20 feet of rainfall, flooding the land.

Source reference: [The Elements and Beyond on 5e.tools](https://5e.tools/spells.html#grand%20flood_teb).

---

### Glacial Tide

```yaml
id: v2_water_glacial_tide
tier: 9th
facets: water, ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond: Spell Variants
activation: action
```

A 500-foot line of ice and water deals 11d10 cold and 11d10 force damage, pushes creatures 50 feet and knocks them prone on a failed Constitution save, or half on a success.

Source reference: [The Elements and Beyond: Spell Variants on 5e.tools](https://5e.tools/spells.html#glacial%20tide_teb:sv).

---

### Deep Freeze

```yaml
id: v2_water_deep_freeze
tier: 9th
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond
activation: action
concentration: true
```

A creature within 60 feet is paralyzed and takes 7d10 + 30 cold damage on a failed Constitution save, or half on a success, repeating the save each turn.

Source reference: [The Elements and Beyond on 5e.tools](https://5e.tools/spells.html#deep%20freeze_teb).

---

### Ice Mountain

```yaml
id: v2_water_ice_mountain
tier: 9th
facets: ice
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elemental Spellbook
activation: action
```

A 200-foot mountain of ice erupts within 1 mile, wrecking structures and burying or hurling creatures where it rises.

Source reference: [The Elemental Spellbook on 5e.tools](https://5e.tools/spells.html#ice%20mountain_theelementalspellbookspellsoficefireandlightning).


