# Metal Cultivation Path

Tradition: Primordial
Concept: Metal, ore, magnetism, refined edges, and forged defense.

### Metalcrafting

```yaml
id: metal_initiate_metalcrafting
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

You gain proficiency with smith's tools.

---

### Magnetic Attraction

```yaml
id: metal_initiate_magnetic_attraction
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you can pull or push a metal object weighing up to 10 pounds within 60 feet, moving it up to 10 feet toward or away from you:
- If the object is carried or worn by a creature, that creature must succeed on a Strength saving throw against your spell save DC. On a failed save, you can choose to either move the creature along with the object or detach the object from the creature.
- For objects heavier or larger than 10 pounds, you can attempt to move them by making an Intelligence (Arcana) check against a DC determined by the object’s weight and size. Objects far beyond your power remain immovable.

---

### Metal Sense

```yaml
id: metal_initiate_metal_sense
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: action
```

You can detect the presence of metal within 30 feet of you. You sense the type and general location of metal objects, including hidden compartments or concealed weapons.

---

### Keen Edge

```yaml
id: metal_initiate_keen_edge
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you can temporarily sharpen a weapon or ammunition, granting it a +1 bonus to attack and damage rolls for the next hour.

---

### Magnetic Focus

```yaml
id: metal_initiate_magnetic_focus
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: reaction
```

As a reaction, you can magnetically attract a metal weapon you can see within 30 feet of you to your hand, provided it's not being worn or carried by another creature.

---

### Metallic Echo

```yaml
id: metal_initiate_metallic_echo
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: on hit
```

When you strike a metallic object with a melee weapon, you can create a ringing sound that echoes in a 10-foot radius. Creatures in the area must succeed on a Constitution saving throw or be deafened until the end of their next turn.

## Adept Tier

---

### Enhanced Armor

```yaml
id: metal_adept_enhanced_armor
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: action
```

You can spend 10 minutes to reinforce any armor. For the next hour, you gain resistance to one type of damage (chosen when you use this ability) while wearing armor.

---

### Magnetic Shield

```yaml
id: metal_adept_magnetic_shield
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: reaction
```

As a reaction when you are hit by an attack, you can create a magnetic field that reduces the damage by 1d10 + your Constitution modifier. If the attacker is wielding a metal weapon, they must make a Strength saving throw or be disarmed.

---

### Steel Tornado

```yaml
id: metal_adept_steel_tornado
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: action
```

As an action, you can create a whirlwind of metallic shards in a 30-foot radius around you. Each creature within the area must make a Dexterity saving throw, taking 7d6 slashing damage on a failed save, or half as much damage on a successful one.

---

### Gem Cocoon

```yaml
id: metal_adept_gem_cocoon
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Min Gyu
location: Sirius
activation: action
```

As an action, you lock yourself into an immovable, crystalline gem-like shell, gaining temporary hit points equal to 10 × your proficiency bonus + 10. While you possess any of these temporary hit points, your speed is 0, you cannot move or be moved by external forces, and you cannot take actions or reactions. You can dismiss this ability at will on your turn (no action required), losing any remaining temporary hit points. When this ability ends or when the temporary hit points are reduced to 0, you immediately regain normal movement and actions.

---

### Weight of Lives

```yaml
id: metal_master_weight_of_lives
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
activation: action
```

As an action, target a creature within 60 feet to make a Charisma saving throw. The creature takes 2d8 force damage per karmic debt you discern (up to a maximum of 18d8):
- **On a failed save:** The creature is restrained for a number of rounds equal to the debts discerned.
- **On a successful save:** The creature takes half damage, and its speed is halved for 1 round.

Regardless of the outcome, you gain temporary hit points equal to the total force damage dealt.

---

### Black Tortoise Iron Bulwark

```yaml
id: metal_master_black_tortoise_iron_bulwark
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Min Gyu
location: Sirius
activation: action
```

As an action, you touch a construct, object, structure, or magical wall or barrier (such as a door, vehicle, fortification, or a wall or barrier created by a spell). The target gains temporary hit points equal to 10 × your proficiency bonus + 10. While the target possesses any of these temporary hit points, it gains resistance to all damage.

## Cantrips

---

### Blade Ward

```yaml
id: metal_cantrip_blade_ward
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
concentration: true
```

For up to 1 minute, attackers subtract 1d4 from attack rolls against you.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#blade%20ward_xphb).

---

### Sword Burst

```yaml
id: metal_cantrip_sword_burst
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

Spectral blades sweep around you. Each other creature within 5 feet takes 1d6 force damage on a failed Dexterity save.

Source reference: [D&D 5e (TCE) on 5e.tools](https://5e.tools/spells.html#sword%20burst_tce).

---

### Ring Strike

```yaml
id: v2_metal_ring_strike
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Deep Magic (01-20)
activation: action
```

Two metal rings orbit you. When you hit a creature within 60 feet with an attack, you can launch a ring at it for 1d10 bludgeoning damage, pushing it 5 feet on a failed Strength save.

Source reference: [Deep Magic (01-20) on 5e.tools](https://5e.tools/spells.html#ring%20strike_kpdm).

---

### Cloud of Daggers

```yaml
id: metal_2nd_level_cloud_of_daggers
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

Spinning daggers fill a 5-foot cube within 60 feet, dealing 4d4 slashing damage to creatures in it or entering it.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#cloud%20of%20daggers_xphb).

---

### Heat Metal

```yaml
id: metal_2nd_level_heat_metal
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A metal object within 60 feet glows red-hot, dealing 2d8 fire damage to whoever touches it. You can repeat the damage as a bonus action.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#heat%20metal_xphb).

---

### Iron Garden

```yaml
id: v2_metal_iron_garden
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
```

Iron spikes impale creatures within 20 feet of you for 6d8 piercing damage and stop their movement on a failed Dexterity save, or half damage on a success. The spikes hurt anyone moving through them until your next turn.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#iron%20garden_belzormm).

---

### Animate Objects

```yaml
id: metal_5th_level_animate_objects
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

Up to ten nonmagical objects within 120 feet come to life and fight for you for up to 1 minute.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#animate%20objects_xphb).

---

### Blade Barrier

```yaml
id: metal_6th_level_blade_barrier
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A wall of whirling blades up to 100 feet long rises within 90 feet. Creatures entering it take 6d10 slashing damage on a failed Dexterity save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#blade%20barrier_xphb).

---

### Mordenkainen's Sword

```yaml
id: metal_7th_level_mordenkainens_sword
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A spectral sword within 90 feet attacks for 4d12 + your spellcasting modifier force damage, and again as a bonus action each turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#mordenkainen's%20sword_xphb).

---

### Magic Weapon

```yaml
id: v2_metal_magic_weapon
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
activation: bonus action
concentration: true
```

A nonmagical weapon you touch becomes magic, with +1 to attack and damage rolls for 1 hour.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#magic%20weapon_phb).

---

## Spells restored from V1

---

### Elemental Weapon

```yaml
id: acid_3rd_level_elemental_weapon
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A weapon you touch gains +1 to attack rolls and an extra 1d4 damage of an element you choose for up to 1 hour.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#elemental%20weapon_xphb).

---

### Enspelled Armament

```yaml
id: metal_3rd_level_enspelled_armament
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: bonus action
```

A weapon of energy appears in your hands. You're proficient with it and use your spellcasting modifier for its attacks.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#enspelled%20armament_grimhollowpg24).

---

### Pillar of Force

```yaml
id: metal_5th_level_pillar_of_force
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
activation: action
```

A pillar of stone or wood hits a creature within 30 feet for 2d12 bludgeoning damage on a ranged spell attack and pushes it 10 feet.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#pillar%20of%20force_obojimatallgrass).

---

### Wall of Force

```yaml
id: acid_5th_level_wall_of_force
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

An invisible, indestructible wall of force appears within 120 feet for up to 10 minutes.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#wall%20of%20force_xphb).

---

### Blade of Disaster

```yaml
id: acid_9th_level_blade_of_disaster
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (TCE)
activation: bonus action
concentration: true
```

A rift-blade within 60 feet makes two melee spell attacks a turn for 4d12 force damage each, critting on 18 or higher.

Source reference: [D&D 5e (TCE) on 5e.tools](https://5e.tools/spells.html#blade%20of%20disaster_tce).

---

### Imprisonment

```yaml
id: earth_9th_level_imprisonment
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A creature within 30 feet that fails a Wisdom save is imprisoned by a method you choose, such as burial or sleep, until a condition you name is met.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#imprisonment_xphb).

---

### Pogmo's Pot

```yaml
id: metal_9th_level_pogmos_pot
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
activation: action
```

An iron pot within 60 feet sucks in loose objects up to 10 pounds within 20 feet, then pulls creatures toward it.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#pogmo's%20pot_obojimatallgrass).

---

### Forcecage

```yaml
id: v2_metal_forcecage
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

An invisible cube of force traps creatures within 100 feet for 1 hour. It can't be dispelled.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#forcecage_xphb).

---

### Iron Body

```yaml
id: v2_metal_iron_body
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
activation: action
concentration: true
```

A willing creature you touch turns to living metal: resistance to bludgeoning, fire, piercing and slashing damage and immunity to poison, paralysis and petrification.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#iron%20body_au).


