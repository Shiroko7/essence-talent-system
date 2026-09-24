# Torment Cultivation Path

Tradition: Divine / Godhood
Concept: Pain, punishment, coercion, debilitation, and the manipulation of suffering.

## Initiate Tier

### Whip's Kiss

```yaml
id: torment_initiate_whips_kiss
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Maiden of Pain (Loviatar)
```

You channel vitality through inflicting suffering. When you hit a creature with an attack, you can invoke barbed ethereal lashes to lacerate the foe, dealing an additional 1d6 piercing damage. The target must succeed on a Wisdom saving throw or have disadvantage on its next attack roll.

## Adept Tier

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

### Blood Tithe

```yaml
id: torment_adept_blood_tithe
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Maiden of Pain (Loviatar)
```

Whenever a creature within 30 feet takes damage from your attacks or spells, you convert their agony into physical resilience, gaining temporary hit points equal to your character level.

## Master Tier

### Crown of Agony

```yaml
id: torment_master_crown_of_agony
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Maiden of Pain (Loviatar)
```

You wreath yourself in a mantle of barbed needles and psychic torment for 1 minute. Any creature that hits you with a melee attack takes psychic damage equal to the damage dealt or 3d8 (whichever is lower), and cannot take reactions until the start of its next turn.

---

### Agony of the Martyr

```yaml
id: providence_master_agony_of_the_martyr
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
```

**Casting Time:** 1 action 
**Range:** 120 feet 
**Components:** V, S 
**Duration:** Concentration, up to 4 rounds **Portfolio:** Endurance

A beam of gray energy strikes one creature you can see. The target makes a **Wisdom saving throw with disadvantage**. On a failed save, the target takes **4d10 necrotic damage** and is **stunned by blinding pain** until the start of your next turn. On a successful save, the target takes half damage and is not stunned, and the spell ends.

At the start of each of your subsequent turns for the duration, the target must repeat the Wisdom saving throw, this time **without disadvantage**. On a failure, the target takes **4d10 necrotic damage** and remains stunned until the start of your next turn. On a success, the target takes half damage, and the spell ends.

## Cantrips

### Vicious Mockery

```yaml
id: torment_cantrip_vicious_mockery
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Enchantment / Torment
```

Unleash strings of barbed insults and psychic cruelty, dealing 1d4 psychic damage and giving disadvantage on its next attack.

https://5e.tools/spells.html#vicious%20mockery_xphb

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

### Symbol

```yaml
id: torment_7th_symbol
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Abjuration (Pain Glyph)
```

Inscribe an agonizing glyph of Pain or Discord that wracks intruders with incapacitating pain for 1 minute.

https://5e.tools/spells.html#symbol_xphb

---

### Hold Person

```yaml
id: torment_2nd_hold_person
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin (Conquest)
```

Paralyze a humanoid in rigid agony on a failed Wisdom saving throw.

https://5e.tools/spells.html#hold%20person_xphb

---

### Hold Monster

```yaml
id: torment_5th_hold_monster
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Paladin (Oath of Vengeance)
```

Bind any creature in paralyzed agony, opening it to guaranteed critical hits in melee.

https://5e.tools/spells.html#hold%20monster_xphb

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

### Fear

```yaml
id: torment_3rd_fear
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Paladin (Oath of Conquest)
```

Project phantasmal suffering in a 30-foot cone, forcing creatures to drop items and flee in terror.

https://5e.tools/spells.html#fear_xphb

---

### Phantasmal Killer

```yaml
id: torment_4th_phantasmal_killer
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Illusion / Torment
```

Tap into a nightmare illusion of excruciating suffering, dealing 4d10 psychic damage and frightening the target.

https://5e.tools/spells.html#phantasmal%20killer_xphb

---

### Eyebite

```yaml
id: torment_6th_eyebite
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Necromancy / Torment
```

Assail foes with your terrible gaze to inflict panicking dread, sickening pain, or unconscious slumber.

https://5e.tools/spells.html#eyebite_xphb

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

https://5e.tools/spells.html#power%20word%20pain_xphb

---

### Feeblemind

```yaml
id: torment_8th_feeblemind
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Enchantment / Torment
```

Blast a target's intellect into shattered delirium: deals 4d6 psychic damage and sets Intelligence and Charisma to 1.

https://5e.tools/spells.html#feeblemind_xphb
