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
activation: action
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
activation: action
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
activation: action
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
activation: action
```

A 100-foot line of lightning deals 8d6 lightning damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#lightning%20bolt_xphb).

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
activation: on hit
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
activation: action
```

A melee spell attack deals 1d8 lightning damage, and the target can't make opportunity attacks until its next turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#shocking%20grasp_xphb).

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
activation: bonus action
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
activation: action
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
activation: action
concentration: true
```

A ranged spell attack within 30 feet deals 1d12 lightning damage. While you concentrate, you can deal 1d12 more each turn as a bonus action.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#witch%20bolt_phb).

---

### Mordenkainen's Electric Arc

```yaml
id: v2_sky_mordenkainens_electric_arc
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
```

An arc of lightning hits a creature you can see for 6d10 lightning damage on a failed Dexterity save, or half on a success. A creature in metal armor has disadvantage on the save.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#mordenkainen's%20electric%20arc_bb1000s).

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
activation: action
```

Lightning strikes a creature within 150 feet and leaps to three more within 30 feet of it, each taking 10d8 lightning damage on a failed Dexterity save, or half on a success.

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
activation: bonus action
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
activation: action
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
activation: reaction
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
activation: action
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
activation: action
```

You push a Medium or smaller creature 5 feet on a failed Strength save, push a small object 10 feet, or make a harmless gust within 30 feet.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#gust_xge).

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
activation: action
concentration: true
```

You command the air in a 100-foot cube within 300 feet for up to 1 hour: gusts, a downdraft or an updraft.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#control%20winds_xge).

---

### Feather Fall

```yaml
id: wind_1st_level_feather_fall
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: reaction
```

As a reaction, up to five falling creatures within 60 feet descend slowly and take no falling damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#feather%20fall_xphb).

---

### Fly

```yaml
id: wind_3rd_level_fly
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A willing creature you touch gains a 60-foot fly speed and can hover for up to 10 minutes.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#fly_xphb).

---

### Wind Wall

```yaml
id: wind_3rd_level_wind_wall
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A wall of wind up to 50 feet long rises within 120 feet. It deals 4d8 bludgeoning damage on a failed Strength save and blocks arrows, gas and small flyers.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#wind%20wall_xphb).

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

You and up to ten willing creatures within 30 feet become clouds with a 300-foot fly speed for 8 hours.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#wind%20walk_xphb).

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
activation: action
```

You whisper a message to a creature within 120 feet, and only it hears you and can whisper back.

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
activation: action
```

A painful ringing erupts in a 10-foot-radius sphere within 60 feet for 3d8 thunder damage on a failed Constitution save, or half on a success.

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
activation: action
```

Each creature within 5 feet of you takes 1d6 thunder damage on a failed Constitution save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#thunderclap_xphb).

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
activation: action
```

A 15-foot cube of thunder deals 2d8 thunder damage and pushes creatures 10 feet on a failed Constitution save, or half damage on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#thunderwave_xphb).

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
activation: free
oncePerTurn: true
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
activation: reaction
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
activation: bonus action
```

A willing creature you touch can jump up to 30 feet once per turn by spending 10 feet of movement, for 1 minute.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#jump_xphb).

---

### Warding Wind

```yaml
id: wind_1st_level_warding_wind
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

A 10-foot wind around you deafens, blows out flames, hedges out gas, and imposes disadvantage on ranged attacks through it for up to 10 minutes.

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
activation: action
```

A globe of fresh air surrounds a willing creature's head within 60 feet for 24 hours, so it can't suffocate.

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
activation: action
concentration: true
```

A dust devil within 60 feet deals 1d8 bludgeoning damage and pushes nearby creatures 10 feet on a failed Strength save. You can move it each turn.

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
activation: action
concentration: true
```

A 60-foot line of wind pushes creatures 15 feet on a failed Strength save, and costs extra movement to walk into, for up to 1 minute.

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
activation: bonus action
```

You teleport up to 30 feet to a space you can see.

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
activation: action
concentration: true
```

A 10-foot aura of thunder deals 3d6 thunder damage and deafens creatures that enter it or end their turn there on a failed Constitution save, or half on a success.

Source reference: [D&D 5e (Heroes of Faerûn) on 5e.tools](https://5e.tools/spells.html#cacophonic%20shield_frhof).

---

### Freedom of the Winds

```yaml
id: wind_3rd_level_freedom_of_the_winds
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Tal'Dorei Campaign Setting Reborn
activation: action
concentration: true
```

You gain a 60-foot fly speed and can teleport 60 feet as a reaction when you're targeted, for up to 10 minutes.

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
activation: action
concentration: true
```

A willing creature you touch becomes a slow-flying cloud for up to 1 hour. It can slip through small gaps and resists nonmagical damage.

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
activation: action
concentration: true
```

Up to six creatures or objects within 60 feet, each up to 500 pounds, rise 20 feet and hang there. Unwilling ones make a Constitution save.

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
activation: action
concentration: true
```

For up to 10 minutes you fly at 60 feet, ranged attacks against you have disadvantage, and you can hurl a 15-foot cube of wind for 2d10 bludgeoning damage.

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
activation: action
concentration: true
```

You and allies in a 30-foot aura have advantage on Dexterity saves and take no damage on a success, half on a failure.

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
activation: bonus action
concentration: true
```

A 10-foot ring of electricity around you deals 3d6 lightning and 3d6 thunder damage and deafens creatures on a failed Constitution save, or half on a success.

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
activation: action
```

A primordial bolt hits a creature within 1,000 feet for 30d12 lightning and 10d12 thunder damage on a failed Dexterity save, then chains to up to nine more. It ignores resistance.

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
activation: action
concentration: true
```

A hurricane wind fills a 200-foot cube around you and follows you. It makes ranged attacks through it miss and pushes creatures in the direction you chose.

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
activation: action
concentration: true
```

A hurricane lifts you and pulls creatures within 40 feet into it on a failed Dexterity save, dealing 10d6 bludgeoning damage and restraining them.

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
activation: action
concentration: true
```

A storm of up to ten 10-foot cubes within 150 feet deals lightning damage to creatures inside. You can move one cube each turn.

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
activation: action
concentration: true
```

A chaotic windstorm of twelve 10-foot cubes within 150 feet deafens creatures inside and batters them with damage.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#roaring%20winds%20of%20limbo_kpdm).


