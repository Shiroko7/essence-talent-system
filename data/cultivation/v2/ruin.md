# Ruin Cultivation Path

Tradition: Divine
Concept: Murder, pain, deception, thievery, and the deliberate undoing of a foe.

### Decay

```yaml
id: ruin_adept_decay
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
```

**Casting Time:** 1 action  
**Range:** Touch  
**Components:** V, S, M (a holy symbol)  
**Duration:** Permanent  
**Portfolio:** Murder

You touch nonliving material up to 1 cubic foot per caster level and accelerate its aging process. For every hour that passes, the affected material ages 1 day. Additionally, any stress or strain on the material is magnified twentyfold.

After sufficient time, most objects break, rust, corrode, decay into powder, or otherwise become useless. A _dispel magic_ spell halts the accelerated decay but cannot reverse aging that has already occurred.

Normal items receive no saving throw. Magic items must make a Constitution saving throw against your spell DC with disadvantage or be affected. Artifacts and legendary items are immune to this effect.

To affect an item being worn or carried by an unwilling creature, you must make a melee spell attack against the creature.

---

### Blood Scent

```yaml
id: ruin_initiate_blood_scent
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Cult of the Lord of Murder
location: Leatrux
```

You instinctively track the scent of open wounds. You have advantage on Wisdom (Perception) and Wisdom (Survival) checks to detect or track any creature that is below its hit point maximum. In addition, your weapon attacks deal an extra 1d4 damage against targets below half their maximum hit points.

---

### Bhaal's Tribute

```yaml
id: ruin_initiate_bhaal_s_tribute
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
```

**Casting Time:** 10 minutes  
**Range:** Touch  
**Components:** V, S, M (a corpse that died within the last 24 hours)  
**Duration:** Instantaneous  
**Portfolio:**  Murder

You perform a dark ritual using a recently deceased body to erase all evidence of a murder. When you cast this spell, you must touch a corpse that has died within the last 24 hours. The spell affects a 30-foot radius centered on the corpse.

All of the following evidence within the area is completely destroyed:
- Blood stains, tracks, and other physical traces of violence
- Scent trails that could be followed by creatures or magic
- Divination magic targeting events that occurred in the area becomes unable to detect anything related to the murder
- The corpse itself dissolves into ash that scatters on an unfelt wind

Any creature that witnessed the events and is within the area when the spell is cast must make a Wisdom saving throw. On a failed save, their memories of the murder become hazy and unclear, as if viewed through fog (they remember something happened but cannot recall specific details).

## Adept Tier

---

### Mark for Death

```yaml
id: ruin_adept_mark_for_death
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
```

**Casting Time:** 1 bonus action  
**Range:** 60 feet  
**Components:** V, S, M (a black arrow or dagger)  
**Duration:** 1 minute  
**Portfolio:** Murder

You mark one creature you can see within range for assassination. The target must make a Wisdom saving throw. On a successful save, the spell fails. On a failed save, the target is doomed to die and gains the following effects for the duration:

- You have advantage on attack rolls against the marked creature
- When you hit the marked creature with an attack, it takes an additional 1d8 necrotic damage
- The marked creature cannot benefit from temporary hit points or healing of any kind
- The marked creature has disadvantage on death saving throws

The marked creature feels an overwhelming sense of impending doom.

## Master Tier

---

### Mass Inflict Wounds

```yaml
id: ruin_master_mass_inflict_wounds
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
```

As an action, you release a wave of necrotic energy from a point you can see within 60 feet. Choose up to six creatures within 30 feet of that point. Each must make a Constitution saving throw against your essence ability save DC, taking 5d10 necrotic damage on a failed save, or half as much on a successful one.

---

## Grandmaster Tier

---

### Mark of Doom

```yaml
id: ruin_grandmaster_mark_of_doom
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
```

**Casting Time:** 1 bonus action  
**Range:** Any distance (on same plane)  
**Components:** V, S, M (an object belonging to the target or blood from a relative of the target)  
**Duration:** 24 hours  
**Portfolio:** Murder

You mark a single creature for death, targeting them through a personal connection. The target must make a Wisdom saving throw. On a successful save, the spell fails and the material component is consumed.

On a failed save, the target is marked for death and suffers the following effects for the duration:

- The target automatically fails all saving throws against divination spells and effects that would locate or track them
- The target automatically fails all death saving throws
- You have advantage on all attack rolls against the target

The marked creature feels a sense of impending doom but doesn't know the source. This spell can only affect one creature at a time per caster. If you cast this spell again while a creature is already marked, the previous mark ends.

## Cantrips

---

### Toll the Dead

```yaml
id: ruin_cantrip_toll_the_dead
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Necromancy
```

You point at one creature. The sound of a dolorous death bell tolls, dealing 1d8 necrotic damage (or 1d12 if the target is injured).

https://5e.tools/spells.html#toll%20the%20dead_xphb

---

### Chill Touch

```yaml
id: ruin_cantrip_chill_touch
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric (Death Domain) / Necromancy
```

Assail a foe with deadly chill, dealing 1d8 necrotic damage and stopping it from regaining hit points.

https://5e.tools/spells.html#chill%20touch_xphb

## Spells

---

### Vampiric Touch

```yaml
id: ruin_3rd_vampiric_touch
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Death Domain) / Necromancy
```

Siphon life from your victim. Melee spell attack deals 3d6 necrotic damage and heals you for half.

https://5e.tools/spells.html#vampiric%20touch_xphb

---

### Circle of Death

```yaml
id: ruin_6th_circle_of_death
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Death Domain) / Necromancy
```

A 60-foot-radius slaughter sphere deals 8d6 necrotic damage to all creatures caught within.

https://5e.tools/spells.html#circle%20of%20death_xphb

---

### Finger of Death

```yaml
id: ruin_7th_finger_of_death
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Death Domain) / Necromancy
```

Devastating murder decree deals 7d8 + 30 necrotic damage and rises humanoid slain as a permanent zombie servant.

https://5e.tools/spells.html#finger%20of%20death_xphb

---

### Hunter's Mark

```yaml
id: ruin_1st_hunters_mark
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Paladin (Oath of Vengeance)
```

You mark a creature as your quarry. Deal an extra 1d6 damage whenever you hit it with a weapon attack.

https://5e.tools/spells.html#hunter's%20mark_xphb

---

### Power Word Kill

```yaml
id: ruin_9th_power_word_kill
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Enchantment / Death
```

Utter a word of lethal demise to kill a creature instantly if it has 100 hit points or fewer.

https://5e.tools/spells.html#power%20word%20kill_xphb

---

### Whip's Kiss

```yaml
id: torment_initiate_whips_kiss
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Maiden of Pain (Loviatar)
location: Leatrux
```

You channel vitality through inflicting suffering. When you hit a creature with an attack, you can invoke barbed ethereal lashes to lacerate the foe, dealing an additional 1d6 piercing damage. The target must succeed on a Wisdom saving throw or have disadvantage on its next attack roll.

## Adept Tier

---

### Inflict Wounds

```yaml
id: torment_1st_inflict_wounds
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Necromancy
```

Deliver searing necrotizing pain through touch, dealing 3d10 necrotic damage on a melee spell attack.

https://5e.tools/spells.html#inflict%20wounds_xphb

---

### Harm

```yaml
id: torment_6th_harm
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Necromancy
```

The pinnacle of agonizing biological ruin: inflicts 14d6 necrotic damage and reduces hit point maximum.

https://5e.tools/spells.html#harm_xphb

---

### Heart Crusher Grip (Nilo)

```yaml
id: fire_initiate_heart_crusher_grip
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Xu Ning (Lime's ancestor)
location: Phudara / Isle of Whispers
```

As an action, you can target one bloodied creature you can see within 15 feet of you. The target must make a Constitution saving throw, taking 6d6 fire damage on a failed save, or half as much damage on a successful one. If this damage reduces the target to 0 hit points, its heart is crushed and it dies instantly.

---

### Frightful Pursuit

```yaml
id: fire_adept_frightful_pursuit
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Cyric
location: Leatrux
```

You have advantage on attack rolls against any creature that is currently frightened.

---

### Blood Tithe

```yaml
id: torment_adept_blood_tithe
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Maiden of Pain (Loviatar)
location: Leatrux
```

Whenever a creature within 30 feet takes damage from your attacks or spells, you convert their agony into physical resilience, gaining temporary hit points equal to your character level.

## Master Tier

---

### Mislead

```yaml
id: v2_moon_mislead
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

You become invisible while leaving a convincing illusory double behind.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#mislead_phb).

---

### Seeming

```yaml
id: v2_moon_seeming
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

You reshape the apparent appearance of a group of creatures for a long duration.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#seeming_phb).

---

### Crown of Agony

```yaml
id: torment_master_crown_of_agony
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Maiden of Pain (Loviatar)
location: Leatrux
```

You wreath yourself in a mantle of barbed needles and psychic torment for 1 minute. Any creature that hits you with a melee attack takes psychic damage equal to the damage dealt or 3d8 (whichever is lower), and cannot take reactions until the start of its next turn.

---

### Mind Sliver

```yaml
id: torment_cantrip_mind_sliver
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Enchantment / Psionic
```

Drive a disorienting spike of psychic pain into a creature's mind: 1d6 psychic damage and -1d4 on its next saving throw.

https://5e.tools/spells.html#mind%20sliver_xphb

## Spells

---

### Power Word Pain

```yaml
id: torment_7th_power_word_pain
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Enchantment / Pure Agony
```

Utter a word of power that causes overwhelming physical suffering, reducing speed to 10 ft and giving disadvantage on attacks and checks.

https://5e.tools/spells.html#power%20word%20pain_xge

---

### Mage Hand

```yaml
id: v2_mystery_mage_hand
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (PHB)
```

You create a small floating hand that can manipulate or carry light objects at a distance.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#mage%20hand_phb).

---

### Assassin's Shroud

```yaml
id: ruin_adept_assassins_shroud
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Cult of Cyric
location: Leatrux
```

As a bonus action, you cloak yourself in deceptive shadows for 1 minute. While cloaked, you make no sound when moving and leave behind neither physical footprints nor forensic trace. The first attack you hit while cloaked deals an extra 2d6 necrotic damage and ends the cloak.

---

### Searing Gaze

```yaml
id: fire_initiate_searing_gaze
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

As a bonus action, you can attempt an Intimidation check. If successful, the creature is unsettled and has disadvantage on saving throws against being frightened or charmed by you for 1 minute.

---

### Blazing Presence

```yaml
id: fire_adept_blazing_presence
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Your fiery aura gives you a commanding presence. You can use your action to create a burst of heat and light, giving you advantage on Intimidation checks and causing those who fail a Wisdom saving throw to be frightened until the end of your next turn.

---

## Spells restored from V1

---

### Hellish Rebuke

```yaml
id: fire_1st_level_hellish_rebuke
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

As a reaction to being damaged, you engulf the attacker in green flames for 2d10 fire damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#hellish%20rebuke_xphb).

---

### Speak with Dead

```yaml
id: wood_3rd_level_speak_with_dead
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A corpse answers up to five questions with what it knew in life.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#speak%20with%20dead_xphb).

---

### Antilife Shell

```yaml
id: wood_5th_level_antilife_shell
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A 10-foot aura keeps living creatures, except constructs and undead, from reaching you.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#antilife%20shell_xphb).

---

### Synaptic Static

```yaml
id: acid_5th_level_synaptic_static
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A burst of psychic energy deals 8d6 psychic damage and muddles the thoughts of those who fail their save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#synaptic%20static_xphb).

---

### Power Word Stun

```yaml
id: v2_ruin_power_word_stun
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A creature with 150 hit points or fewer is stunned until it succeeds on a Constitution save; a stronger one is rooted in place.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#power%20word%20stun_xphb).

---

### Glibness

```yaml
id: v2_ruin_glibness
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

For an hour you can treat any Charisma check roll as a 15, and magic that detects lies always reports you as truthful.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#glibness_xphb).

---

### Psychic Scream

```yaml
id: v2_ruin_psychic_scream
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

Up to ten creatures take 14d6 psychic damage and are stunned; a creature slain by it has its head explode.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#psychic%20scream_xge).

---

### Wail of the Banshee

```yaml
id: v2_ruin_wail_of_the_banshee
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
```

Your terrible scream kills up to ten creatures with 50 hit points or fewer; stronger targets take heavy psychic damage.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#wail%20of%20the%20banshee_au).

---

### Power Word Maim

```yaml
id: v2_ruin_power_word_maim
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
```

A creature with 125 hit points or fewer is twisted for 8d10 necrotic damage and knocked prone; stronger creatures are rooted in place.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#power%20word%20maim_grimhollowpg24).

---

### Dread Curse of Azathoth

```yaml
id: v2_ruin_dread_curse_of_azathoth
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cthulhu by Torchlight
```

You speak Azathoth’s secret name, dooming a creature to die at the end of its third turn unless the spell is broken.

Source reference: [Cthulhu by Torchlight on 5e.tools](https://5e.tools/spells.html#dread%20curse%20of%20azathoth_cthulhutorchlight).

---

### Doom of False Friends

```yaml
id: v2_ruin_doom_of_false_friends
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Book of Ebon Tides
```

You sever the bond between two creatures, compelling each to hunt and attack the other.

Source reference: [Kobold Press Book of Ebon Tides on 5e.tools](https://5e.tools/spells.html#doom%20of%20false%20friends_bookofebontides).

---

### Wipe Face

```yaml
id: v2_ruin_wipe_face
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
```

A creature’s face seals over into smooth skin, blinding and incapacitating it as it begins to suffocate.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#wipe%20face_grimhollowpg24).

---

### Wave of Oblivion

```yaml
id: v2_ruin_wave_of_oblivion
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cthulhu by Torchlight
```

A cone of oblivion kills bloodied creatures that fail a save, reducing them to dust.

Source reference: [Cthulhu by Torchlight on 5e.tools](https://5e.tools/spells.html#wave%20of%20oblivion_cthulhutorchlight).
