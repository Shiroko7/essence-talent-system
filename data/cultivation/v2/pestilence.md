# Pestilence Cultivation Path

Tradition: Divine
Concept: Disease, poison, curses, affliction, and resistance to corruption.

### Venomous Touch

```yaml
id: poison_initiate_venomous_touch
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

As an action, you can imbue your touch with a mild poison. A creature you touch must make a Constitution saving throw against your spell save DC or become poisoned for 1 minute. While poisoned this way, the creature takes 1d6 poison damage at the start of each of its turns until it succeeds a saving throw. The poison ends early if the creature receives any kind of healing.

---

### Venomous Strike

```yaml
id: poison_adept_venomous_strike
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

As a bonus action, you can coat a weapon with a potent poison. The next attack you make with that weapon deals an additional 2d6 poison damage on a hit. The target must also succeed on a Constitution saving throw or be poisoned for 1 minute.

---

### Corrosive Touch

```yaml
id: pestilence_initiate_corrosive_touch
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
```

**Casting Time:** 1 action  
**Range:** Touch  
**Components:** V, S  
**Duration:** Instantaneous  
**Portfolio:** Poison

A sickly brown radiance flickers around your hand. Make a melee spell attack against a creature you can reach. On a hit, the target takes 2d10 poison damage. If the target fails a Constitution saving throw, it is also poisoned until the end of your next turn, and its AC is reduced by 1 as the corrosive magic eats through armor or clothing, leaving raw welts on exposed skin. This AC reduction lasts until the creature finishes a short or long rest or receives magical healing.

---

### Toxic Skin Secretion I

```yaml
id: poison_adept_toxic_skin_secretion_1
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Church of Talona
location: Leatrux
```

Once per turn, when a creature hits you with a melee attack, that creature must succeed on a Constitution saving throw against your spell save DC or become poisoned until the end of its next turn.

---

### Creeping Pestilence

```yaml
id: pestilence_initiate_creeping_pestilence
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
```

**Casting Time:** 1 action  
**Range:** 60 feet  
**Components:** V, S  
**Duration:** Concentration, up to 1 minute  
**Portfolio:** Poison

You infect a creature you can see within range with a virulent disease. The target must succeed on a Constitution saving throw or become poisoned for the duration. While poisoned in this way, the creature is wracked with weakness and vulnerability—it takes an additional 1d6 poison damage whenever it takes poison damage from any source.

At the end of each of its turns, the target can make another Constitution saving throw. On a success, the spell ends on the target. On a failure, the disease spreads: choose one creature within 60 feet of the target. That creature must succeed on a Constitution saving throw or also become poisoned by this spell (with its own separate duration and spreading capability).

## Adept Tier

---

### Toxic Skin Secretion II

```yaml
id: poison_adept_toxic_skin_secretion_2
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Church of Talona
location: Leatrux
```

Once per turn, when a creature hits you with a melee attack, that creature must succeed on a Constitution saving throw against your spell save DC or become poisoned for 1 minute. On a failed save, the creature also takes poison damage equal to your proficiency bonus.

---

### Pestilent Cloud

```yaml
id: pestilence_adept_pestilent_cloud
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
```

**Casting Time:** 1 action  
**Range:** 90 feet  
**Components:** V, S  
**Duration:** Concentration, up to 1 minute  
**Portfolio:** Poison

You create a 20-foot-radius sphere of yellowish-green vapors centered on a point you can see within range. The cloud spreads around corners and is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.

When a creature enters the spell's area for the first time on a turn or starts its turn there, it must make a Constitution saving throw. On a failed save, the creature takes 3d8 poison damage, becomes poisoned, and has its speed halved until the start of its next turn. On a successful save, the creature takes half as much damage and suffers no additional effects.

Creatures wearing or bearing a holy symbol of Talona are immune to this spell's effects.

---

### Lingering Touch

```yaml
id: pestilence_adept_lingering_touch
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
```

**Casting Time:** 1 action  
**Range:** 60 feet  
**Components:** V, S  
**Duration:** 1 minute  
**Portfolio:** Poison

You point at a creature within range, and sickly brown energy lashes out to infect it. The target must make a Constitution saving throw. On a failed save, the target takes 5d10 poison damage and becomes both restrained and poisoned for the duration as virulent toxins seize its body. On a successful save, the target takes half as much damage and is not restrained or poisoned.

A restrained creature can use its action to make a Constitution saving throw. On a success, the restrained condition ends, but the creature remains poisoned for the duration. At the end of each of its turns while poisoned by this spell, the creature can make another Constitution saving throw, ending the poisoned condition on a success.

## Master Tier

---

### Toxic Skin Secretion III

```yaml
id: poison_adept_toxic_skin_secretion_3
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Church of Talona
location: Leatrux
```

Once per turn, when a creature hits you with a melee attack, that creature must succeed on a Constitution saving throw against your spell save DC. On a failed save, the creature becomes poisoned for 1 hour, takes poison damage equal to twice your proficiency bonus, and has its movement speed halved while poisoned this way.

---

### Poison Spray

```yaml
id: pestilence_cantrip_poison_spray
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Conjuration
```

You project a puff of noxious gas from your palm. The creature must succeed on a Constitution save or take 1d12 poison damage.

https://5e.tools/spells.html#poison%20spray_xphb

---

### Infestation

```yaml
id: pestilence_cantrip_infestation
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Conjuration
```

Parasites and biting mites appear on a foe, dealing 1d6 poison damage and compelling random movement.

https://5e.tools/spells.html#infestation_xphb

## Spells

---

### Ray of Sickness

```yaml
id: pestilence_1st_ray_of_sickness
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Death Domain) / Necromancy
```

A ray of greenish energy deals 2d8 poison damage and poisons the target on a failed Constitution save.

https://5e.tools/spells.html#ray%20of%20sickness_xphb

---

### Detect Poison and Disease

```yaml
id: pestilence_1st_detect_poison_and_disease
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Divination
```

Sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet.

https://5e.tools/spells.html#detect%20poison%20and%20disease_xphb

---

### Blight

```yaml
id: pestilence_4th_blight
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Death Domain) / Necromancy
```

Drain fluid and vital energy from a creature, dealing 8d8 necrotic damage (maximum damage against plants).

https://5e.tools/spells.html#blight_xphb

---

### Contagion

```yaml
id: pestilence_5th_contagion
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Necromancy
```

Inflict supernatural disease: Blinding Sickness, Filth Fever, Flesh Rot, Mindfire, Seizure, or Slimy Doom.

https://5e.tools/spells.html#contagion_xphb

---

### Insect Plague

```yaml
id: pestilence_5th_insect_plague
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Conjuration
```

A 20-foot-radius swarm of biting locusts bites and obscures the battlefield, dealing 4d10 piercing damage.

https://5e.tools/spells.html#insect%20plague_xphb

---

### Cloudkill

```yaml
id: pestilence_5th_cloudkill
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Conjuration / Toxic Cloud
```

A rolling 20-foot-radius sphere of poisonous yellow-green fog deals 5d8 poison damage on failed Constitution saves.

https://5e.tools/spells.html#cloudkill_xphb

---

### Purify Food and Drink

```yaml
id: pestilence_1st_purify_food_and_drink
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Transmutation
```

Cleanse or discern corruption in food and drink within a 5-foot-radius sphere.

https://5e.tools/spells.html#purify%20food%20and%20drink_xphb

---

### Protection from Poison

```yaml
id: pestilence_2nd_protection_from_poison
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Abjuration
```

Neutralize poison affecting a creature, granting resistance to poison damage and advantage on poison saves for 1 hour.

https://5e.tools/spells.html#protection%20from%20poison_xphb

---

### Blessed Immunity

```yaml
id: pestilence_master_blessed_immunity
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
```

**Casting Time:** 1 action  
**Range:** Touch  
**Components:** V, S  
**Duration:** 8 hours  
**Portfolio:** Poison

You touch a willing creature, granting it Talona's protection. For the duration, the target gains the following benefits:

- Immunity to poison damage and the poisoned condition
- Immunity to disease, including magical diseases like lycanthropy and mummy rot
- Any existing poisons or diseases affecting the target are suppressed for the duration
- Parasitic infestations (such as rot grubs) are immediately expelled from the target's body, dealing no harm
- Any molds, spores, or fungi on or within the target's body are destroyed

Additionally, if the target would contract a disease during the spell's duration, they automatically succeed on any saving throw to resist it.

## Cantrips

---

### Hallucinogenic Trance

```yaml
id: poison_adept_hallucinogenic_trance
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

As a bonus action, you can target one poisoned creature within 30 feet. The target must succeed on a Wisdom saving throw or be subjected to vivid hallucinations for the duration of its poisoned condition. While affected by these hallucinations, the creature has disadvantage on Intelligence, Wisdom, and Charisma saving throws and ability checks. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.

---

### Vestibular Trance

```yaml
id: poison_adept_vestibular_trance
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
location: Sirius
```

As a bonus action, you can target one poisoned creature within 30 feet. The target must succeed on a Constitution saving throw or be overwhelmed by distorted bodily sensations (nausea, vertigo, and loss of coordination) for the duration of its poisoned condition. While affected, the creature has disadvantage on Strength, Dexterity, and Constitution saving throws and ability checks. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.

---

### Bestow Curse

```yaml
id: torment_3rd_bestow_curse
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Necromancy
```

Curse a target with crippling agony, lost actions, or extra damage whenever struck.

https://5e.tools/spells.html#bestow%20curse_xphb

---

### Bane

```yaml
id: torment_1st_bane
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Enchantment
```

Afflict up to three creatures with agonizing doubt and torment, forcing them to subtract 1d4 from attack rolls and saves.

https://5e.tools/spells.html#bane_xphb

---

### Remove Curse

```yaml
id: v2_providence_remove_curse
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

You break a curse affecting a creature or object.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#remove%20curse_phb).

---
