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

### Lightning Lure

```yaml
id: v2_lightning_lightning_lure
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (TCE)
```

A lash of lightning pulls a nearby creature toward you and shocks it if it comes close.

Source reference: [D&D 5e TCE on 5e.tools](https://5e.tools/spells.html#lightning%20lure_tce).

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

https://5e.tools/spells.html#gust_xphb

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

https://5e.tools/spells.html#control%20winds_xphb

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
