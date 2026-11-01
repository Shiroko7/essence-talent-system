# Fire Cultivation Path

Tradition: Primordial
Concept: Flame, heat, combustion, and the release of energy.

### Flame Ward

```yaml
id: fire_initiate_flame_ward
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

You have advantage on saving throws against being frightened or charmed while within 10 feet of a source of fire or heat.

---

### Flame Kinship

```yaml
id: fire_initiate_flame_kinship
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

You gain the ability to communicate with creatures of fire, such as Fire Elementals and Magmin, as if you shared a common language. This does not grant you the ability to control or command them but allows for basic communication and understanding.

---

### Ember Strike

```yaml
id: fire_initiate_ember_strike
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

When you hit a creature with a weapon attack, you can expend a spell slot to deal an additional 1d12 fire damage per level of the spell slot expended. Additionally, the target must succeed on a Wisdom saving throw against your spell save DC or become frightened of you until the end of its next turn.

---

### Flame Lash

```yaml
id: fire_initiate_flame_lash
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: action
```

You can use your action to create a whip-like tendril of fire that extends up to 15 feet. Make a melee spell attack against a creature within range. On a hit, the target takes fire damage equal to 4d6 + your spellcasting ability modifier. The intense heat also causes the target to become dazzled, giving them disadvantage on their next attack roll.

---

### Inferno Disengage

```yaml
id: fire_initiate_inferno_disengage
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: free
```

When you use the Disengage action, you create a burst of fire around you. Each creature within 5 feet of you takes 2d6 fire damage.

---

### Ember's Resilience

```yaml
id: fire_adept_embers_resilience
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: reaction
```

As a reaction when you fail a saving throw, you can reroll the saving throw die. If you do so, you take 2d6 fire damage.

---

### Blazing Trail

```yaml
id: fire_adept_blazing_trail
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: free
```

When you take the Dash action, you can leave a trail of fire in your wake. For the duration of your movement, any creature that enters or ends its turn within the 10-foot-wide line of fire you create takes fire damage equal to your total fire essences. The creature must make a Dexterity saving throw, taking half damage on a success. This trail lasts for 1 minute or until you choose to end it.

---

### Scorched Ground

```yaml
id: fire_adept_scorched_ground
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: action
```

As an action, you can cause a 20-foot radius area on the ground to become superheated within 120 feet of you for 1 minute. Creatures that start their turn in this area take fire damage equal to 4d6 + your spellcasting ability modifier. The area is difficult terrain, and the fire persists even if you move away from it.

---

### Burning Fury

```yaml
id: fire_adept_burning_fury
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Immediately after you take fire damage, you gain advantage on attack rolls made before the end of your next turn.

---

### Control Flames

```yaml
id: fire_cantrip_control_flames
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

You expand, extinguish, brighten or shape nonmagical flame in a 5-foot cube within 60 feet.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#control%20flames_xge).

---

### Create Bonfire

```yaml
id: fire_cantrip_create_bonfire
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
concentration: true
```

A bonfire fills a 5-foot cube within 60 feet and deals 1d8 fire damage to creatures in or entering it on a failed Dexterity save.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#create%20bonfire_xge).

---

### Fire Bolt

```yaml
id: fire_cantrip_fire_bolt
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

A ranged spell attack within 120 feet deals 1d10 fire damage and ignites flammable objects.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#fire%20bolt_xphb).

---

### Green-Flame Blade

```yaml
id: fire_cantrip_green_flame_blade
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

You make a melee weapon attack. On a hit, green fire leaps to a second creature within 5 feet for fire damage equal to your spellcasting modifier.

Source reference: [D&D 5e (TCE) on 5e.tools](https://5e.tools/spells.html#green-flame%20blade_tce).

---

### Meteor Swarm

```yaml
id: fire_9th_level_meteor_swarm
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

Four meteors strike points within 1 mile. Each hits a 40-foot-radius sphere for 20d6 fire and 20d6 bludgeoning damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#meteor%20swarm_xphb).

---

### Burning Hands

```yaml
id: fire_1st_level_burning_hands
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

A 15-foot cone of flame deals 3d6 fire damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#burning%20hands_xphb).

---

### Aganazzar's Scorcher

```yaml
id: fire_2nd_level_aganazzars_scorcher
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

A 30-foot line of flame deals 3d8 fire damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#aganazzar's%20scorcher_xge).

---

### Flame Blade

```yaml
id: fire_2nd_level_flame_blade
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: bonus action
concentration: true
```

A fiery scimitar forms in your hand for up to 10 minutes. You make melee spell attacks with it for 3d6 fire damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#flame%20blade_xphb).

---

### Fireball

```yaml
id: fire_3rd_level_fireball
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

A 20-foot-radius explosion within 150 feet deals 8d6 fire damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#fireball_xphb).

---

### Wall of Fire

```yaml
id: fire_4th_level_wall_of_fire
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A wall of fire up to 60 feet long rises within 120 feet. It deals 5d8 fire damage to creatures on one side or inside it.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#wall%20of%20fire_xphb).

---

### Immolation

```yaml
id: fire_5th_level_immolation
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

Flames engulf a creature within 90 feet for 8d6 fire damage on a failed Dexterity save, then 4d6 each turn until it succeeds.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#immolation_xge).

---

### Fire Storm

```yaml
id: fire_7th_level_fire_storm
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

Up to ten 10-foot cubes of fire within 150 feet deal 7d10 fire damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#fire%20storm_xphb).

---

### Flame Strike

```yaml
id: fire_5th_level_flame_strike
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

A 10-foot-radius column of fire within 60 feet deals 5d6 fire and 5d6 radiant damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#flame%20strike_xphb).

---

## Spells restored from V1

---

### Produce Flame

```yaml
id: fire_cantrip_produce_flame
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (PHB 2024)
activation: bonus action
```

A flame in your hand sheds light, and you can hurl it as a ranged spell attack within 60 feet for 1d8 fire damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#produce%20flame_xphb).

---

### Spellfire Flare

```yaml
id: fire_1st_level_spellfire_flare
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Heroes of Faerûn)
activation: action
```

A ranged spell attack within 60 feet that ignores cover deals 2d10 radiant damage.

Source reference: [D&D 5e (Heroes of Faerûn) on 5e.tools](https://5e.tools/spells.html#spellfire%20flare_frhof).

---

### Continual Flame

```yaml
id: fire_2nd_level_continual_flame
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A flame that gives no heat burns on an object you touch, shedding bright light, until dispelled.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#continual%20flame_xphb).

---

### Flaming Sphere

```yaml
id: fire_2nd_level_flaming_sphere
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A 5-foot sphere of fire within 60 feet deals 2d6 fire damage to nearby creatures on a failed Dexterity save, and you can ram it into them.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#flaming%20sphere_xphb).

---

### Scorching Ray

```yaml
id: fire_2nd_level_scorching_ray
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

Three rays of fire, each a ranged spell attack within 120 feet, deal 2d6 fire damage on a hit.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#scorching%20ray_xphb).

---

### Ashardalon's Stride

```yaml
id: fire_3rd_level_ashardalons_stride
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (FTD)
activation: bonus action
concentration: true
```

For up to 1 minute your speed increases by 20 feet, you don't provoke opportunity attacks, and you deal 1d6 fire damage to creatures you pass.

Source reference: [D&D 5e (FTD) on 5e.tools](https://5e.tools/spells.html#ashardalon's%20stride_ftd).

---

### Flame Arrows

```yaml
id: fire_3rd_level_flame_arrows
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

Up to twelve arrows or bolts from a quiver you touch deal an extra 1d6 fire damage on a hit.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#flame%20arrows_xge).

---

### Fire Shield

```yaml
id: fire_4th_level_fire_shield
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

Flames wreathe you for 10 minutes, granting resistance to cold or fire, and deal 2d8 damage to creatures that hit you in melee.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#fire%20shield_xphb).

---

### Spellfire Storm

```yaml
id: fire_4th_level_spellfire_storm
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Heroes of Faerûn)
activation: action
concentration: true
```

A 20-foot-radius pillar of spellfire within 60 feet deals 4d10 radiant damage to creatures inside or entering it on a failed Constitution save.

Source reference: [D&D 5e (Heroes of Faerûn) on 5e.tools](https://5e.tools/spells.html#spellfire%20storm_frhof).

---

### Investiture of Flame

```yaml
id: fire_6th_level_investiture_of_flame
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

Flames cover you for up to 10 minutes: immunity to fire, resistance to cold, a burning aura, and a 15-foot line of fire as an action.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#investiture%20of%20flame_xge).

---

### Delayed Blast Fireball

```yaml
id: fire_7th_level_delayed_blast_fireball
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A bead of fire within 150 feet grows by 1d6 each turn, then explodes in a 20-foot radius for 12d6 fire damage or more.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#delayed%20blast%20fireball_xphb).

---

### Incendiary Cloud

```yaml
id: fire_8th_level_incendiary_cloud
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A 20-foot-radius cloud of embers within 150 feet drifts each turn and deals 10d8 fire damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#incendiary%20cloud_xphb).


