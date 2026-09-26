# Sky Cultivation Path

Tradition: Primordial
Concept: Air, pressure, flight, sound carried through air, and lightning.

### Thunderous Roar

```yaml
id: wind_initiate_thunderous_roar
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

You can let out a powerful roar that creates a shockwave, forcing all creatures within 10 feet to make a Constitution saving throw or be pushed 10 feet away from you and become deafened for 1 minute.

---

### Static Reflexes

```yaml
id: lightning_initiate_static_reflexes
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
```

You gain advantage on Dexterity saving throws against effects that deal lightning damage or require quick reflexes, such as traps or spells.

### Mistbound Step

```yaml
id: wind_initiate_mistbound_step
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

The Misty Step spell does not consume a spell slot if you begin or end your movement in a heavily obscured area.

---

## Adept Tier

---

### Lightning Javelin

```yaml
id: lightning_adept_lightning_javelin
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
```

You hurl a javelin of pure lightning at a target within 60 feet. Make a ranged spell attack:
- **On a hit:** The target takes 5d12 lightning damage and cannot take reactions until the start of its next turn.

---

### Arc Chain

```yaml
id: lightning_essence_arc_chain
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nethan (Nilo's Father)
location: Leatrux
```

Choose a creature within 120 feet. The target must make a Dexterity saving throw, taking 3d8 lightning damage on a failed save, or half as much on a successful one.

If the target fails its saving throw, the arc leaps to another creature within 30 feet of it that hasn’t been struck yet, forcing the same saving throw. The chain continues jumping to new creatures until a target succeeds on its save or no valid targets remain within range.

## Master Tier

---

### Lightning Bolt

```yaml
id: tempest_3rd_lightning_bolt
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Evocation / Lightning
```

A 100-foot-long, 5-foot-wide stroke of lightning deals 8d6 lightning damage to all creatures in the line.

https://5e.tools/spells.html#lightning%20bolt_xphb

---

### Conductive Touch

```yaml
id: lightning_adept_conductive_touch
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
```

When you hit a creature with a melee attack, you can choose to deal an extra 2d12 lightning damage.

## Master Tier

---

### Shocking Grasp

```yaml
id: tempest_cantrip_shocking_grasp
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Evocation / Tempest
```

Lightning springs from your hand to deliver a shock, dealing 1d8 lightning damage and preventing reactions.

https://5e.tools/spells.html#shocking%20grasp_xphb

## Spells

---

### Lightning Step

```yaml
id: lightning_initiate_lightning_step
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
```

As a bonus action, you can harness the power of lightning to enhance your movement. Your jump distance is tripled, and your movement does not provoke opportunity attacks until the end of your turn.

---

### Lightning Sense

```yaml
id: lightning_adept_lightning_sense
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
```

You have developed a heightened sense of awareness in stormy or electrically charged environments. You gain advantage on Wisdom (Perception) checks to notice hidden details or track creatures in such conditions.

---

### Lightning Cage

```yaml
id: lightning_essence_lightning_cage
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nethan (Nilo's Father)
location: Leatrux
```

You conjure a crackling triangular cage of lightning in a 30-foot area centered on a point within 90 feet, lasting for 1 minute:
- Creatures inside have their speed halved and cannot take reactions.
- Any creature that touches or attempts to pass through the cage's perimeter takes 4d10 lightning damage.
- A creature trapped inside can use an action to make a Strength saving throw to break through: on a failed save, it remains trapped and takes 4d10 lightning damage; on a successful save, it escapes and takes half damage.

## Spells

---

### Witch Bolt

```yaml
id: v2_lightning_witch_bolt
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

A crackling arc links you to one target, dealing lightning damage while you sustain the connection.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#witch%20bolt_phb).

---

### Chain Lightning

```yaml
id: v2_lightning_chain_lightning
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

A powerful bolt leaps from one target to additional creatures within reach.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#chain%20lightning_phb).

---

### Calm Breeze

```yaml
id: wind_adept_calm_breeze
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

You can use a bonus action to create a soothing breeze that relaxes and calms creatures within a 30-foot radius, providing them with advantage on saving throws against being frightened or charmed. This effect lasts for 10 minutes.

## Master Tier

---

### Thunderstep

```yaml
id: wind_adept_thunderstep
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

You can use an action to make a sudden, loud noise, creating a brief but intense thunderclap that can be heard up to 300 feet away. Creatures within 30 feet of you must make a Constitution saving throw or be stunned until the end of your next turn.

---

### Wind Barrier

```yaml
id: wind_adept_wind_barrier
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

As a reaction to being targeted by an attack or harmful spell, you can summon a barrier of wind around you. You gain a +2 bonus to AC and saving throws until the start of your next turn. Additionally, attacks against you have disadvantage.

---

### Whispering Winds

```yaml
id: wind_adept_whispering_winds
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

You can use your action to send a message carried by the wind to any creature within 1 mile of you. The message is heard as a whisper by the intended recipient. This ability allows for secret communications or covert information exchange.

---

### Sound Analysis

```yaml
id: wind_adept_sound_analysis
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

You can accurately determine the source and direction of any sound within 300 feet of you. This ability can be used to track creatures or detect hidden enemies. It provides you advantage on Wisdom (Perception) checks related to sound.

---

### Gust

```yaml
id: tempest_cantrip_gust
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Transmutation / Wind
```

Seize air to push creatures 5 feet away or blow objects violently.

https://5e.tools/spells.html#gust_xge

## Spells

---

### Control Winds

```yaml
id: tempest_5th_control_winds
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Transmutation
```

Take command of the wind in a 100-foot cube: gusts, downdrafts, or updrafts that redirect missiles and topple fliers.

https://5e.tools/spells.html#control%20winds_xge

---

### Feather Fall

```yaml
id: wind_1st_level_feather_fall
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#feather%20fall_xphb

---

### Fly

```yaml
id: wind_3rd_level_fly
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#fly_xphb

---

### Wind Wall

```yaml
id: wind_3rd_level_wind_wall
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#wind%20wall_xphb

---

### Wind Walk

```yaml
id: wind_6th_level_wind_walk
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#wind%20walk_xphb

---

### Message

```yaml
id: v2_sky_message
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (PHB)
```

You whisper a short message that travels to a creature at a distance.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#message_phb).

---

### Shatter

```yaml
id: v2_metal_shatter
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

A sudden resonant burst damages creatures and objects in an area.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#shatter_phb).

---

### Thunderclap

```yaml
id: tempest_cantrip_thunderclap
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Evocation
```

Create a burst of thunderous sound heard up to 100 feet away, dealing 1d6 thunder damage to all adjacent creatures.

https://5e.tools/spells.html#thunderclap_xphb

---

### Thunderwave

```yaml
id: tempest_1st_thunderwave
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Tempest Domain) / Evocation
```

A wave of thunderous force deals 2d8 thunder damage and pushes creatures 10 feet away.

https://5e.tools/spells.html#thunderwave_xphb

---

### Whispers of the Gale (Laura)

```yaml
id: wind_initiate_whispers_of_the_gale
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Faelara Rest of the Lluvia Tribe
location: Phudara / Isle of Whispers
```

When you miss with a ranged attack roll (including spell attacks), you can use your reaction and expend a spell slot of 1st level or higher to reroll the attack. You must use the new roll, and the spell slot is expended regardless of the outcome.

---
## Adept Tier

---

### Wind Sprint

```yaml
id: wind_adept_wind_sprint
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

You can double your movement speed for a number of rounds equal to your proficiency bonus.

---

### Just Passing By

```yaml
id: wind_master_essence_just_passing_by
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Wang Tianbao (Shadow Sect)
location: Sirius
```

As a reaction, you dissolve into wind until the start of your next turn, passing through solid objects, becoming immune to nonmagical slashing, piercing, and bludgeoning damage and resistant to magical slashing, piercing, and bludgeoning damage.

---

## Spells restored from V1

---

### Jump

```yaml
id: wind_1st_level_jump
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A touched creature can jump up to 30 feet by spending 10 feet of movement.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#jump_xphb).

---

### Warding Wind

```yaml
id: wind_1st_level_warding_wind
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

A 10-foot wall of strong wind surrounds you, deafening, snuffing small flames, and giving ranged attacks disadvantage.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#warding%20wind_xge).

---

### Air Bubble

```yaml
id: wind_2nd_level_air_bubble
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (AAG)
```

A globe of fresh air surrounds a creature's head so it can breathe underwater or in a vacuum.

Source reference: [D&D 5e (AAG) on 5e.tools](https://5e.tools/spells.html#air%20bubble_aag).

---

### Dust Devil

```yaml
id: wind_2nd_level_dust_devil
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

A small whirlwind batters and pushes nearby creatures; you can move it and let it pick up debris to obscure the area.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#dust%20devil_xge).

---

### Gust of Wind

```yaml
id: wind_2nd_level_gust_of_wind
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A 60-foot line of strong wind pushes creatures back, halves movement toward you, and disperses gas.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#gust%20of%20wind_xphb).

---

### Misty Step

```yaml
id: wind_2nd_level_misty_step
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space you can see.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#misty%20step_xphb).

---

### Cacophonic Shield

```yaml
id: wind_3rd_level_cacophonic_shield
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Heroes of Faerûn)
```

A 10-foot aura of thunder deals 3d6 thunder damage and deafens creatures that enter it or end their turn there.

Source reference: [D&D 5e (Heroes of Faerûn) on 5e.tools](https://5e.tools/spells.html#cacophonic%20shield_frhof).

---

### Freedom of the Winds

```yaml
id: wind_3rd_level_freedom_of_the_winds
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Tal'Dorei Campaign Setting Reborn
```

Wind lifts you to a 60-foot flying speed, helps you slip grapples and restraints, and lets you teleport away from attacks.

Source reference: [Tal'Dorei Campaign Setting Reborn on 5e.tools](https://5e.tools/spells.html#freedom%20of%20the%20winds_taldoreicampaignsettingreborn).

---

### Gaseous Form

```yaml
id: wind_3rd_level_gaseous_form
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A willing creature becomes a slow-flying misty cloud that can slip through small openings and resists damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#gaseous%20form_xphb).

---

### Mass Levitate

```yaml
id: wind_5th_level_mass_levitate
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
```

Up to six creatures or objects rise 20 feet and hang suspended, able to move only by pushing off surfaces.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#mass%20levitate_obojimatallgrass).

---

### Investiture of Wind

```yaml
id: wind_6th_level_investiture_of_wind
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

Wind whirls around you: ranged attacks against you have disadvantage, you fly at 60 feet, and you can hurl cubes of wind.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#investiture%20of%20wind_xge).

---

### Aura of Evasion

```yaml
id: v2_sky_aura_of_evasion
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
```

A 30-foot aura of alacrity gives you and your allies advantage on Dexterity saves and lets them take no damage on a successful save.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#aura%20of%20evasion_au).

---

### Lightning Ring

```yaml
id: v2_sky_lightning_ring
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
```

A 10-foot ring of crackling electricity moves with you, shocking creatures it touches with lightning and thunder damage.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#lightning%20ring_au).

---

### Heavenstorm

```yaml
id: v2_sky_heavenstorm
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Fragments of the Forbidden Tome
```

A primordial bolt of lightning strikes a foe for massive lightning and thunder damage, then chains through up to nine more creatures.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#heavenstorm_fftforbiddentome).

---

### Wind Wake

```yaml
id: v2_sky_wind_wake
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond
```

A hurricane-force wind follows you in a 200-foot cube, grounding fliers, deflecting ranged attacks, and pushing everything away from you.

Source reference: [The Elements and Beyond on 5e.tools](https://5e.tools/spells.html#wind%20wake_teb).

---

### Hurricane

```yaml
id: v2_sky_hurricane
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Harbinger
```

A hurricane lifts you into its flying eye, pulling nearby creatures up into the storm and hurling them away.

Source reference: [The Harbinger on 5e.tools](https://5e.tools/spells.html#hurricane_theharbinger).

---

### Arcanomagnetic Storm

```yaml
id: v2_sky_arcanomagnetic_storm
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Heliana's Guide to Monster Hunting
```

A reshapeable storm of lightning and magnetic winds shocks creatures inside and knocks them prone, dragging hardest at those wearing iron.

Source reference: [Heliana's Guide to Monster Hunting on 5e.tools](https://5e.tools/spells.html#arcanomagnetic%20storm_helianasguidetomonsterhunting).

---

### Roaring Winds of Limbo

```yaml
id: v2_sky_roaring_winds_of_limbo
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
```

A breach to the planes of chaos unleashes a windstorm that deafens, blinds with debris, and hurls creatures in random directions.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#roaring%20winds%20of%20limbo_kpdm).
