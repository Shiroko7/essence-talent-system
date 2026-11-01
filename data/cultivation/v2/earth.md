# Earth Cultivation Path

Tradition: Primordial
Concept: Stone, soil, mass, terrain, and grounded endurance.

### Stonecunning

```yaml
id: earth_initiate_stonecunning
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Gain proficiency in History. If already proficient, you gain expertise.

---

### Miner's Touch

```yaml
id: earth_initiate_miners_touch
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Gain proficiency with mason’s tools and miner’s tools.

---

### Rock Whisperer

```yaml
id: earth_initiate_rock_whisperer
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

You can communicate simple ideas with earth elementals and creatures of stone.

---

### Earth Sense

```yaml
id: earth_initiate_earth_sense
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

You have advantage on Survival and Perception checks to navigate underground or in rocky terrain.

---

---

### Pebble Barrage

```yaml
id: earth_initiate_pebble_barrage
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: action
```

As an action, you hurl a barrage of pebbles at a creature within 30 feet. The target must make a Dexterity saving throw. On a failed save, the creature takes 4d4 bludgeoning damage and is knocked prone.

## Adept Tier

---

### Earthen Resilience

```yaml
id: earth_adept_earthen_resilience
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Gain proficiency in Constitution saving throws.

---

### Terramancer

```yaml
id: earth_adept_terramancer
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Gain expertise in Athletics when performing tasks involving lifting, pushing, or pulling heavy objects made of stone or earth.

---

### Stone Camouflage

```yaml
id: earth_adept_stone_camouflage
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

You have expertise on Stealth checks to hide in rocky terrain or against stone surfaces.

---

### Earthen Grasp

```yaml
id: earth_adept_earthen_grasp
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you cause hands of compacted earth to grasp a creature within 30 feet, restraining it for 1 minute. The restrained creature can make a Strength saving throw at the end of each of its turns, ending the effect on a success.

---

### Stone Armor

```yaml
id: earth_adept_stone_armor
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you can encase yourself in a layer of stone, granting you resistance to bludgeoning, piercing, and slashing damage for 1 minute.

---

---

### Sandstorm

```yaml
id: earth_adept_sandstorm
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: action
```

As an action, you create a swirling storm of sand in a 20-foot radius centered on you that lasts for 1 minute.

Each creature in the area must make a Constitution saving throw, taking 3d6 slashing damage and becoming blinded until the end of its next turn on a failed save, or half as much damage on a successful one.

The area is difficult terrain, and any creature that starts its turn within the storm takes 1d6 slashing damage.

## Master Tier

---

### Immovable Mountain

```yaml
id: earth_essence_immovable_mountain
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
activation: action
```

For 1 minute, you become an unyielding force:
- You cannot be knocked prone, grappled, restrained, paralyzed, stunned, or moved against your will.
- Whenever you hit a creature with a melee attack, you may push it 10 feet or knock it prone.
- The ground cracks beneath your steady steps.

---

---

### Foolish Old Man Moves Mountains

```yaml
id: earth_master_essence_moves_mountains
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
```

Each time you fail a saving throw against a hostile creature’s effect, your essence ability save DC increases by 1 until you complete a long rest. This increase can stack up to a maximum of +3.

## Special Abilities

---

### Earthen Ward

```yaml
id: earth_active_earthen_ward
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: reaction
```

As a reaction, a surge of earth magic momentarily hardens your form. You gain temporary hit points equal to 1d10 + your Constitution modifier.

## Cantrips

---

### Magic Stone

```yaml
id: earth_cantrip_magic_stone
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: bonus action
```

Up to three pebbles you touch become weapons for ranged spell attacks, each dealing 1d6 + your spellcasting modifier bludgeoning damage.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#magic%20stone_xge).

---

### Mold Earth

```yaml
id: earth_cantrip_mold_earth
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

You dig, move or shape loose earth in a 5-foot cube within 30 feet, or make it difficult terrain.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#mold%20earth_xge).

## Spells

---

### Earth Tremor

```yaml
id: earth_1st_level_earth_tremor
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

A tremor around you deals 1d6 bludgeoning damage and knocks creatures within 10 feet prone on a failed Dexterity save.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#earth%20tremor_xge).

---

### Erupting Earth

```yaml
id: earth_3rd_level_erupting_earth
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

Earth erupts in a 20-foot cube within 120 feet for 3d12 bludgeoning damage on a failed Dexterity save, or half on a success, leaving difficult terrain.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#erupting%20earth_xge).

---

### Stone Shape

```yaml
id: earth_4th_level_stone_shape
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

You reshape a piece of stone you touch, up to 5 feet in any dimension, into any form you like.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#stone%20shape_xphb).

---

### Stoneskin

```yaml
id: earth_4th_level_stoneskin
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A willing creature you touch has resistance to bludgeoning, piercing and slashing damage for up to 1 hour.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#stoneskin_xphb).

---

### Wall of Stone

```yaml
id: earth_5th_level_wall_of_stone
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A wall of stone made of ten 10-by-10-foot panels rises within 120 feet. It can trap creatures, and it becomes permanent if you hold it for 10 minutes.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#wall%20of%20stone_xphb).

---

### Move Earth

```yaml
id: earth_6th_level_move_earth
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

You reshape dirt, sand or clay in an area up to 40 feet on a side within 120 feet, over up to 2 hours.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#move%20earth_xphb).

---

### Living Burial

```yaml
id: v2_earth_living_burial
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond
activation: action
concentration: true
```

The ground swallows a creature within 30 feet: 7d8 bludgeoning damage and buried 10 feet down on a failed Strength save, or half damage on a success. A buried creature takes 4d8 each turn until it digs free.

Source reference: [The Elements and Beyond on 5e.tools](https://5e.tools/spells.html#living%20burial_teb).

---

### Earthquake

```yaml
id: earth_8th_level_earthquake
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A 100-foot-radius earthquake within 500 feet knocks creatures prone, breaks concentration, opens fissures and damages structures.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#earthquake_xphb).

---

### Gemsight

```yaml
id: metal_adept_gemsight
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

You gain expertise in Perception checks to locate hidden gemstones or precious minerals. When you find such items, you can appraise their value with a successful Intelligence (Investigation) check.

---

## Spells restored from V1

---

### Tremor

```yaml
id: earth_1st_level_tremor
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
concentration: true
```

The ground in a 15-foot emanation around you becomes difficult terrain. Creatures there take 1d6 bludgeoning damage and fall prone on a failed Dexterity save.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#tremor_grimhollowpg24).

---

### Earthbind

```yaml
id: earth_2nd_level_earthbind
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

A creature within 300 feet that fails a Strength save has its flying speed reduced to 0 and descends safely.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#earthbind_xge).

---

### Maximilian's Earthen Grasp

```yaml
id: earth_2nd_level_maximilians_earthen_grasp
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

An earthen hand rises within 30 feet. It deals 2d6 bludgeoning damage and restrains a creature on a failed Strength save, and you can crush it again.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#maximilian's%20earthen%20grasp_xge).

---

### Meld into Stone

```yaml
id: earth_3rd_level_meld_into_stone
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
ritual: true
```

You merge with a stone surface for up to 8 hours, hidden from nonmagical senses.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#meld%20into%20stone_xphb).

---

### Wall of Sand

```yaml
id: earth_3rd_level_wall_of_sand
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

A wall of swirling sand, up to 30 feet long and 10 feet high, blocks sight and slows movement through it.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#wall%20of%20sand_xge).

---

### Conjure Elemental

```yaml
id: wood_5th_level_conjure_elemental
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A Large elemental spirit appears within 60 feet. It restrains creatures that enter or start their turn near it and deals 8d8 damage of its element.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#conjure%20elemental_xphb).

---

### Transmute Rock

```yaml
id: earth_5th_level_transmute_rock
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

Stone or mud in a 40-foot cube within 120 feet turns to mud or rock, miring or encasing creatures there.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#transmute%20rock_xge).

---

### Bones of the Earth

```yaml
id: earth_6th_level_bones_of_the_earth
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

Up to six stone pillars burst from the ground within 120 feet, lifting creatures or crushing them against the ceiling for 6d6 bludgeoning damage.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#bones%20of%20the%20earth_xge).

---

### Earth Worm

```yaml
id: earth_6th_level_earth_worm
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
concentration: true
```

An earthen maw within 60 feet bites as a bonus action for 3d8 + your spellcasting modifier piercing damage and can swallow Large or smaller creatures.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#earth%20worm_grimhollowpg24).

---

### Flesh to Stone

```yaml
id: earth_6th_level_flesh_to_stone
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A creature within 60 feet is restrained on a failed Constitution save and turns to stone after three failed saves.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#flesh%20to%20stone_xphb).

---

### Investiture of Stone

```yaml
id: earth_6th_level_investiture_of_stone
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

Rock covers you for up to 10 minutes: resistance to nonmagical weapon damage, an earthquake action, and movement through earth and stone.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#investiture%20of%20stone_xge).

---

### Mighty Fortress

```yaml
id: v2_earth_mighty_fortress
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

A stone fortress 120 feet on a side rises within 1 mile, complete with towers and servants. It becomes permanent if cast every 7 days for a year.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#mighty%20fortress_xge).

---

### Invulnerability

```yaml
id: v2_earth_invulnerability
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

You are immune to all damage for up to 10 minutes.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#invulnerability_xge).

---

### Rocks Fall

```yaml
id: v2_earth_rocks_fall
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Valda's Spire of Secrets: Player Pack 2
activation: action
```

Boulders fall in a 60-foot-radius cylinder within 120 feet for 10d8 bludgeoning damage, burying creatures that fail a Dexterity save, or half on a success.

Source reference: [Valda's Spire of Secrets: Player Pack 2 on 5e.tools](https://5e.tools/spells.html#rocks%20fall_valdaplayerpack2).

---

### Jotun Form

```yaml
id: v2_earth_jotun_form
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Northlands Worldbook
activation: action
concentration: true
```

You shape-shift into a Giant of your level or lower, gaining its statistics and its hit points as temporary hit points.

Source reference: [Kobold Press Northlands Worldbook on 5e.tools](https://5e.tools/spells.html#jotun%20form_northlandsworldbook).


