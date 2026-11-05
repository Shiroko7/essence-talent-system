# Ruin Cultivation Path

Tradition: Divine
Concept: Murder, pain, and strife: the deliberate undoing of a foe.
Facets: Murder, Pain, Strife

### Decay

```yaml
id: ruin_adept_decay
tier: adept
facets: murder
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
activation: action
```

As an action, you touch nonliving material up to 1 cubic foot per character level and accelerate its aging process. For every hour that passes, the affected material ages 1 day. Additionally, any stress or strain on the material is magnified twentyfold.

After sufficient time, most objects break, rust, corrode, decay into powder, or otherwise become useless. A _dispel magic_ spell halts the accelerated decay but cannot reverse aging that has already occurred.

Normal items receive no saving throw. Magic items must make a Constitution saving throw against your spell DC with disadvantage or be affected. Artifacts and legendary items are immune to this effect.

To affect an item being worn or carried by an unwilling creature, you must make a melee spell attack against the creature.

---

### Blood Scent

```yaml
id: ruin_initiate_blood_scent
tier: initiate
facets: murder
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Cult of the Lord of Murder
location: Leatrux
domain: expansion
domainText: Its extra damage die is a d6.
```

You instinctively track the scent of open wounds. You have advantage on Wisdom (Perception) and Wisdom (Survival) checks to detect or track any creature that is below its hit point maximum. In addition, your weapon attacks deal an extra 1d4 damage against targets below half their maximum hit points.

---

### Bhaal's Tribute

```yaml
id: ruin_initiate_bhaal_s_tribute
tier: initiate
facets: murder
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
ritual: true
```

Over 10 minutes, you perform a dark ritual on a corpse that died within the last 24 hours to erase all evidence of a murder. The ritual affects a 30-foot radius centered on the corpse.

All of the following evidence within the area is completely destroyed:
- Blood stains, tracks, and other physical traces of violence
- Scent trails that could be followed by creatures or magic
- Divination magic targeting events that occurred in the area becomes unable to detect anything related to the murder
- The corpse itself dissolves into ash that scatters on an unfelt wind

Any creature that witnessed the events and is within the area when the ritual ends must make a Wisdom saving throw. On a failed save, their memories of the murder become hazy and unclear, as if viewed through fog (they remember something happened but cannot recall specific details).

## Adept Tier

---

### Mark for Death

```yaml
id: ruin_adept_mark_for_death
tier: adept
facets: murder
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
activation: bonus action
concentration: true
domain: restore
domainText: It doesn't require concentration.
```

As a bonus action, you mark one creature you can see within 60 feet for assassination. The target must make a Wisdom saving throw. On a success, nothing happens. On a failure, the target is doomed to die and gains the following effects for up to 1 minute (concentration):

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
facets: murder
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
activation: action
```

As an action, you release a wave of necrotic energy from a point you can see within 60 feet. Choose up to six creatures within 30 feet of that point. Each must make a Constitution saving throw against your essence ability save DC, taking 5d10 necrotic damage on a failed save, or half as much on a successful one.

---

## Grandmaster Tier

---

### Mark of Doom

```yaml
id: ruin_grandmaster_mark_of_doom
tier: grandmaster
facets: murder
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bhaal / Portfolio (Murder)
location: Leatrux
activation: bonus action
domain: bound
```

As a bonus action, you mark a single creature on the same plane for death, at any distance, while holding an object that belongs to it or blood from one of its relatives. The target must make a Wisdom saving throw. On a success, nothing happens and the object or blood is consumed.

On a failed save, the target is marked for death and suffers the following effects for 24 hours:

- The target automatically fails all saving throws against divination spells and effects that would locate or track them
- The target automatically fails all death saving throws
- You have advantage on all attack rolls against the target

The marked creature feels a sense of impending doom but doesn't know the source. Only one creature can bear your mark at a time. If you use this again while a creature is already marked, the previous mark ends.

## Cantrips

---

## Spells

---

### Murderous Twin

```yaml
id: v2_ruin_murderous_twin
tier: 2nd
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
concentration: true
```

A shadowy double of a creature within 60 feet appears beside it for up to 1 minute and attacks it, dealing 2d6 psychic damage and disadvantage on its next attack.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#murderous%20twin_bb1000s).

---

### Vampiric Touch

```yaml
id: ruin_3rd_vampiric_touch
tier: 3rd
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Death Domain) / Necromancy
activation: action
concentration: true
```

For up to 1 minute, each turn you can make a melee spell attack for 3d6 necrotic damage and regain half the damage dealt.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#vampiric%20touch_xphb).

---

### Assassin's Promise

```yaml
id: v2_ruin_assassins_promise
tier: 4th
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Compendium of Forgotten Secrets: Awakening
activation: action
```

You promise a humanoid within 30 feet its death for 24 hours. Each time you damage it you can add a curse layer: you heal for each layer if it dies, and it takes 1d6 psychic damage per layer if it survives.

Source reference: [The Compendium of Forgotten Secrets: Awakening on 5e.tools](https://5e.tools/spells.html#assassin's%20promise_cofsa).

---

### Hunter's Mark

```yaml
id: ruin_1st_hunters_mark
tier: 1st
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Paladin (Oath of Vengeance)
activation: bonus action
concentration: true
```

You mark a creature within 90 feet for up to 1 hour and deal an extra 1d6 force damage whenever you hit it with an attack.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#hunter's%20mark_xphb).

---

### Power Word Kill

```yaml
id: ruin_9th_power_word_kill
tier: 9th
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Enchantment / Death
activation: action
```

A creature within 60 feet with 100 hit points or fewer dies. Otherwise it takes 12d12 psychic damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#power%20word%20kill_xphb).

---

### Whip's Kiss

```yaml
id: torment_initiate_whips_kiss
tier: initiate
facets: pain
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Maiden of Pain (Loviatar)
location: Leatrux
activation: on hit
oncePerTurn: true
domain: expansion
domainText: It deals extra damage equal to your PB.
```

You channel vitality through inflicting suffering. Once per turn, when you hit a creature with an attack, you can invoke barbed ethereal lashes to lacerate the foe, dealing an additional 1d6 piercing damage. The target must succeed on a Wisdom saving throw or have disadvantage on its next attack roll.

## Adept Tier

---

### Inflict Wounds

```yaml
id: torment_1st_inflict_wounds
tier: 1st
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Necromancy
activation: action
```

A creature you touch takes 2d10 necrotic damage on a failed Constitution save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#inflict%20wounds_xphb).

---

### Harm

```yaml
id: torment_6th_harm
tier: 6th
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Necromancy
activation: action
```

A creature within 60 feet takes 14d6 necrotic damage and loses that much hit point maximum on a failed Constitution save, or half damage on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#harm_xphb).

---

### Heart Crusher Grip (Nilo)

```yaml
id: fire_initiate_heart_crusher_grip
tier: initiate
facets: murder
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Xu Ning (Lime's ancestor)
location: Phudara / Isle of Whispers
activation: action
domain: expansion
domainText: Its range is 60 feet.
```

As an action, you can target one bloodied creature you can see within 15 feet of you. The target must make a Constitution saving throw, taking 6d6 fire damage on a failed save, or half as much damage on a successful one. If this damage reduces the target to 0 hit points, its heart is crushed and it dies instantly.

---

### Frightful Pursuit

```yaml
id: fire_adept_frightful_pursuit
tier: adept
facets: strife
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
facets: pain
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Maiden of Pain (Loviatar)
location: Leatrux
domain: restore
domainText: You gain temporary hit points equal to your character level instead.
```

Whenever a creature within 30 feet takes damage from your attacks or spells, you convert their agony into physical resilience, gaining temporary hit points equal to your proficiency bonus.

## Master Tier

---

### Mislead

```yaml
id: v2_moon_mislead
tier: 5th
facets: strife
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
activation: action
concentration: true
```

You turn invisible while an illusory double appears in your place for up to 1 hour. You can move it and see and hear through it.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#mislead_phb).

---

### Seeming

```yaml
id: v2_moon_seeming
tier: 5th
facets: strife
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
activation: action
```

Any number of creatures within 30 feet take on an illusory appearance you choose for 8 hours. Unwilling ones make a Charisma save.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#seeming_phb).

---

### Crown of Agony

```yaml
id: torment_master_crown_of_agony
tier: master
facets: pain
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Maiden of Pain (Loviatar)
location: Leatrux
activation: bonus action
```

As a bonus action, you wreathe yourself in a mantle of barbed needles and psychic torment for 1 minute. Any creature that hits you with a melee attack takes psychic damage equal to the damage dealt or 3d8 (whichever is lower), and cannot take reactions until the start of its next turn.

---

### Mind Sliver

```yaml
id: torment_cantrip_mind_sliver
tier: cantrip
facets: strife
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Enchantment / Psionic
activation: action
```

A creature within 60 feet takes 1d6 psychic damage on a failed Intelligence save and subtracts 1d4 from its next saving throw.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#mind%20sliver_xphb).

## Spells

---

### Power Word Pain

```yaml
id: torment_7th_power_word_pain
tier: 7th
facets: pain
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Enchantment / Pure Agony
activation: action
```

A creature within 60 feet with 100 hit points or fewer is wracked with pain: its speed drops to 10 feet and it has disadvantage on attacks, checks and most saves.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#power%20word%20pain_xge).

---

### Assassin's Shroud

```yaml
id: ruin_adept_assassins_shroud
tier: adept
facets: murder
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Cult of Cyric
location: Leatrux
activation: bonus action
domain: expansion
domainText: The extra damage is 3d6 instead of 2d6.
```

As a bonus action, you cloak yourself in deceptive shadows for 1 minute. While cloaked, you make no sound when moving and leave behind neither physical footprints nor forensic trace. The first attack you hit while cloaked deals an extra 2d6 necrotic damage and ends the cloak.

---

### Searing Gaze

```yaml
id: fire_initiate_searing_gaze
tier: initiate
facets: strife
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: bonus action
domain: expansion
domainText: You have advantage on the Intimidation check.
```

As a bonus action, you can attempt an Intimidation check. If successful, the creature is unsettled and has disadvantage on saving throws against being frightened or charmed by you for 1 minute.

---

### Blazing Presence

```yaml
id: fire_adept_blazing_presence
tier: adept
facets: strife
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
activation: action
domain: expansion
domainText: Its save DC is 2 higher.
```

Your fiery aura gives you a commanding presence. You can use your action to create a burst of heat and light, giving you advantage on Intimidation checks and causing those who fail a Wisdom saving throw to be frightened until the end of your next turn.

---

## Spells restored from V1

---

### Hellish Rebuke

```yaml
id: fire_1st_level_hellish_rebuke
tier: 1st
facets: pain
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: reaction
```

As a reaction to being damaged, the creature that hurt you takes 2d10 fire damage on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#hellish%20rebuke_xphb).

---

### Antilife Shell

```yaml
id: wood_5th_level_antilife_shell
tier: 5th
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A 10-foot aura keeps living creatures other than Constructs and Undead from reaching you for up to 1 hour.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#antilife%20shell_xphb).

---

### Synaptic Static

```yaml
id: acid_5th_level_synaptic_static
tier: 5th
facets: strife
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

Psychic energy bursts in a 20-foot-radius sphere within 120 feet for 8d6 psychic damage on a failed Intelligence save, or half on a success. Those who fail subtract 1d6 from attacks and checks.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#synaptic%20static_xphb).

---

### Power Word Stun

```yaml
id: v2_ruin_power_word_stun
tier: 8th
facets: strife
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A creature within 60 feet with 150 hit points or fewer is stunned until it succeeds on a Constitution save. Otherwise its speed is 0 for a turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#power%20word%20stun_xphb).

---

### Glibness

```yaml
id: v2_ruin_glibness
tier: 8th
facets: strife
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

For 1 hour you can treat any Charisma check roll as a 15, and magic that detects lies reads you as truthful.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#glibness_xphb).

---

### Psychic Scream

```yaml
id: v2_ruin_psychic_scream
tier: 9th
facets: strife
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

Up to ten creatures within 90 feet take 14d6 psychic damage and are stunned on a failed Intelligence save, or half damage on a success. A creature it kills has its head explode.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#psychic%20scream_xge).

---

### Power Word Maim

```yaml
id: v2_ruin_power_word_maim
tier: 7th
facets: pain
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
```

A creature within 60 feet with 125 hit points or fewer takes 8d10 necrotic damage and falls prone. Otherwise its speed is 0 for a turn.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#power%20word%20maim_grimhollowpg24).

---

### Dread Curse of Azathoth

```yaml
id: v2_ruin_dread_curse_of_azathoth
tier: 7th
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cthulhu by Torchlight
activation: bonus action
concentration: true
```

A creature within 120 feet gains a curse point at the end of each of its turns and dies on the third, unless the spell is broken.

Source reference: [Cthulhu by Torchlight on 5e.tools](https://5e.tools/spells.html#dread%20curse%20of%20azathoth_cthulhutorchlight).

---

### Doom of False Friends

```yaml
id: v2_ruin_doom_of_false_friends
tier: 8th
facets: strife
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Book of Ebon Tides
activation: action
concentration: true
```

Two creatures within 60 feet that fail a Charisma save must move toward and attack each other for up to 1 minute.

Source reference: [Kobold Press Book of Ebon Tides on 5e.tools](https://5e.tools/spells.html#doom%20of%20false%20friends_bookofebontides).

---

### Wipe Face

```yaml
id: v2_ruin_wipe_face
tier: 9th
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
concentration: true
```

A creature within 60 feet has its face sealed over: it's blinded, incapacitated and suffocating until it succeeds on a Constitution save.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#wipe%20face_grimhollowpg24).

---

### Wave of Oblivion

```yaml
id: v2_ruin_wave_of_oblivion
tier: 9th
facets: murder
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cthulhu by Torchlight
activation: action
```

Each bloodied creature in a 30-foot cone that fails a Constitution save dies and turns to dust.

Source reference: [Cthulhu by Torchlight on 5e.tools](https://5e.tools/spells.html#wave%20of%20oblivion_cthulhutorchlight).

