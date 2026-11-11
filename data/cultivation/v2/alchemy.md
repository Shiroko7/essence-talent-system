# Alchemy Cultivation Path

Tradition: Immortal
Concept: The transformation, refinement, and recombination of substances.
Facets: Acid, Medicine, Poison, Explosives, Transmutation

### Caustic Bomb

```yaml
id: acid_initiate_caustic_bomb
tier: initiate
facets: explosives, acid
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: action
domain: expansion
domainText: You choose which creatures in the area it affects.
```

As an action, you can create a powerful, improvised explosive from available materials. Each creature in a 10-foot radius must make a Dexterity saving throw, taking 4d6 acid damage on a failed save, or half as much on a successful save.

---

### Acidic Insight

```yaml
id: acid_initiate_acidic_insight
tier: initiate
facets: acid
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You have developed a keen understanding of acidic substances and their effects. You gain advantage on Intelligence (Arcana) and Wisdom (Nature) checks related to acids, alchemical reactions, and chemical processes. This knowledge allows you to identify and analyse unknown substances or toxins with ease.

---

### Alchemy Proficiency

```yaml
id: acid_initiate_alchemy_proficiency
tier: initiate
facets: acid, medicine
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

Gain proficiency in Alchemist’s Supplies. You can craft basic alchemical substances, such as acid flasks, potions of healing, and other simple concoctions.

---

### Explosive Savant

```yaml
id: acid_adept_explosive_savant
tier: master
facets: explosives
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

When you use an explosive device or alchemical flask, its damage increases by an additional damage dice. Additionally, you can use such devices as a bonus action instead of an action.

---

### Expanded Explosion

```yaml
id: acid_adept_expanded_explosion
tier: adept
facets: explosives
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

Your expertise in crafting explosives has improved the effectiveness of your bombs. When you create or use an explosive device, you increase its radius by 10 feet. For example, a bomb that normally affects a 10-foot radius now affects a 20-foot radius. This increased radius applies to all explosive effects you create, including those from your Improvised Explosives and any similar abilities.

---

### Miasmic Cloud

```yaml
id: acid_adept_miasmic_cloud
tier: adept
facets: acid
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: action
domain: expansion
domainText: Its radius is 20 feet.
```

You can create a cloud of acidic mist in a 10-foot radius around you. Any creature that starts its turn within the cloud must make a Constitution saving throw or take 6d6 acid damage and be blinded until the end of its next turn.

---

### Acidic Embrace

```yaml
id: acid_adept_acidic_embrace
tier: adept
facets: acid
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
domain: expansion
domainText: If you're wielding two weapons, it coats both.
```

You can magically coat a weapon or object in a layer of corrosive acid. The weapon deals an additional 2d4 acid damage on a successful hit, and the object corrodes any non-magical material it touches. This effect lasts for 1 minute.

---

### Mutagen Formula (Strength)

```yaml
id: poison_adept_enhanced_mutagen
tier: adept
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, when you drink a mutagen, you gain a +2 bonus to Strength for 10 minutes, and you take a –2 penalty to Intelligence for the same duration.

---

### Mutagen Formula (Dexterity)

```yaml
id: poison_adept_enhanced_mutagen_dexterity
tier: adept
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, when you drink a mutagen, you gain a +2 bonus to Dexterity for 10 minutes, and you take a –2 penalty to Wisdom for the same duration.

---

### Mutagen Formula (Constitution)

```yaml
id: poison_adept_enhanced_mutagen_constitution
tier: adept
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, when you drink a mutagen, you gain a +2 bonus to Constitution for 10 minutes, and you take a –2 penalty to Charisma for the same duration.

---

### Mutagen Formula (Intelligence)

```yaml
id: poison_adept_enhanced_mutagen_intelligence
tier: adept
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, when you drink a mutagen, you gain a +2 bonus to Intelligence for 10 minutes, and you take a –2 penalty to Strength for the same duration.

---

### Mutagen Formula (Wisdom)

```yaml
id: poison_adept_enhanced_mutagen_wisdom
tier: adept
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, when you drink a mutagen, you gain a +2 bonus to Wisdom for 10 minutes, and you take a –2 penalty to Dexterity for the same duration.

---

### Mutagen Formula (Charisma)

```yaml
id: poison_adept_enhanced_mutagen_charisma
tier: adept
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, when you drink a mutagen, you gain a +2 bonus to Charisma for 10 minutes, and you take a –2 penalty to Constitution for the same duration.

---

### Chemical Expertise

```yaml
id: acid_adept_chemical_expertise
tier: master
facets: acid, explosives
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You can create more advanced alchemical mixtures, such as potent acid flasks or alchemical fire. You add 1d4 to checks involving Alchemist’s Supplies and can create these mixtures in half the usual time.

## Master Tier

---

### Acid Splash

```yaml
id: acid_cantrip_acid_splash
tier: cantrip
facets: acid
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

An acid bubble bursts in a 5-foot-radius sphere within 60 feet: each creature there takes 1d6 acid damage on a failed Dexterity save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#acid%20splash_xphb).

## Spells

---

### Otiluke's Acid Cloud

```yaml
id: v2_alchemy_otilukes_acid_cloud
tier: 3rd
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
concentration: true
```

A glass orb of acid gas appears in your hand. Thrown up to 90 feet, it bursts into a 15-foot cloud that heavily obscures the area for 1 minute and deals 5d6 acid damage on a failed Dexterity save, or half on a success.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#otiluke's%20acid%20cloud_bb1000s).

---

### True Polymorph

```yaml
id: pestilence_9th_true_polymorph
tier: 9th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Transmutation / Viral Metamorphosis
activation: action
concentration: true
```

You turn a creature or nonmagical object within 30 feet into another creature or object (Wisdom save for an unwilling creature). After a full hour of concentration, the change is permanent.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#true%20polymorph_xphb).

---

### Fabricate

```yaml
id: metal_4th_level_fabricate
tier: 4th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

You turn raw materials within 120 feet into finished products of the same material, such as a bridge from trees or clothes from wool.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#fabricate_xphb).

---

### Grease

```yaml
id: water_1st_level_grease
tier: 1st
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

Grease covers a 10-foot square within 60 feet as difficult terrain for 1 minute. Creatures there fall prone on a failed Dexterity save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#grease_xphb).

---

### Primal Savagery

```yaml
id: acid_cantrip_primal_savagery
tier: cantrip
facets: transmutation, acid
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

Your teeth or nails sharpen for a melee spell attack against a creature within 5 feet, dealing 1d10 acid damage.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#primal%20savagery_xge).

## Spells

---

### Mending

```yaml
id: v2_alchemy_mending
tier: cantrip
facets: transmutation
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (PHB)
```

You repair a single break or tear up to 1 foot across in an object you touch.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#mending_phb).

---

### Tasha’s Caustic Brew

```yaml
id: v2_alchemy_tasha_s_caustic_brew
tier: 1st
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (TCE)
activation: action
concentration: true
```

A 30-foot line of acid coats creatures that fail a Dexterity save. They take 2d4 acid damage at the start of each turn until one of them scrapes it off.

Source reference: [D&D 5e TCE on 5e.tools](https://5e.tools/spells.html#tasha's%20caustic%20brew_tce).

---

### Acid Arrow

```yaml
id: v2_alchemy_acid_arrow
tier: 2nd
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
activation: action
```

A ranged spell attack within 90 feet deals 4d4 acid damage, plus 2d4 more at the end of the target's next turn. A miss deals half the first hit only.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#melf's%20acid%20arrow_phb).

---

### Vitriolic Sphere

```yaml
id: v2_alchemy_vitriolic_sphere
tier: 4th
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

A ball of acid explodes in a 20-foot-radius sphere within 150 feet: 10d4 acid damage and 5d4 more at the end of the next turn on a failed Dexterity save, or half on a success.

Source reference: [D&D 5e XGE on 5e.tools](https://5e.tools/spells.html#vitriolic%20sphere_xge).

---

### Quickening Draught

```yaml
id: poison_initiate_quickening_draught
tier: initiate
facets: medicine
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
domain: expansion
domainText: Your speed increases by 20 feet instead.
```

As a bonus action, by drinking a specially prepared potion, you gain an additional 10 feet of movement speed for 10 minutes.

---

### Vital Essence Sublimation I (Nilo)

```yaml
id: poison_initiate_vital_essence_sublimation_i
tier: initiate
series: vital_essence_sublimation
stages: add
facets: transmutation
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Phudara's unknown inheritance
location: Phudara / Isle of Whispers
```

When you harvest the blood of a fallen creature, you can distill its essence into a single potion. You may either extract one of its abilities (action, bonus action, or reaction) and bottle it as a potion, or create a potion whose rarity depends on the creature’s level.

Roll a d100 to determine if the distillation succeeds; on a failure, the attempt is wasted.

| Creature Cultivation Tier | Potion Rarity | Failure Rate |
|---|---|---|
| Initiate | Common | 0% (No failure) |
| Adept | Uncommon | 20% |
| Master | Rare | 40% |
| Grandmaster | Very Rare | 80% |
| Great Grandmaster | Legendary | 100% |

You can hold only one distilled essence at a time. Distilled potions do not expire.

---

### Herbalist’s Knowledge

```yaml
id: poison_initiate_herbalists_knowledge
tier: initiate
facets: medicine, poison
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You gain proficiency with the Medicine skill and advantage on checks to identify or use medicinal herbs and poisons.

## Adept Tier

---

### Vital Essence Sublimation II (Nilo)

```yaml
id: poison_adept_vital_essence_sublimation_ii
tier: adept
series: vital_essence_sublimation
stages: add
facets: transmutation
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Phudara's unknown inheritance
location: Phudara / Isle of Whispers
```

Your distillation technique improves, reducing failure rates and expanding capacity:
- You can now hold up to two distilled essences at a time.

| Creature Cultivation Tier | Potion Rarity | Failure Rate |
|---|---|---|
| Initiate | Common | 0% |
| Adept | Uncommon | 0% |
| Master | Rare | 20% |
| Grandmaster | Very Rare | 60% |
| Great Grandmaster | Legendary | 80% |

---

### Vital Essence Sublimation III (Nilo)

```yaml
id: poison_master_vital_essence_sublimation_iii
tier: master
series: vital_essence_sublimation
stages: add
facets: transmutation
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Phudara's unknown inheritance
location: Phudara / Isle of Whispers
```

Your mastery over distillation reaches its zenith:
- You can now hold up to three distilled essences at a time.

| Creature Cultivation Tier | Potion Rarity | Failure Rate |
|---|---|---|
| Initiate | Common | 0% |
| Adept | Uncommon | 0% |
| Master | Rare | 0% |
| Grandmaster | Very Rare | 40% |
| Great Grandmaster | Legendary | 60% |

**Instant Sublimation:**
When you deal poison damage to a living creature, you can immediately distill one of its abilities into a potion. The essence cost depends on the creature's cultivation tier:

| Creature Tier | Essence Cost |
|---|---|
| Initiate | 1 |
| Adept | 2 |
| Master | 3 |
| Grandmaster | 4 |
| Great Grandmaster | 5 |

If the creature dies from the triggering damage, the extraction costs no essence points.

## Grandmaster Tier

---

### Vital Essence Sublimation IV (Nilo)

```yaml
id: poison_grandmaster_vital_essence_sublimation_iv
tier: grandmaster
series: vital_essence_sublimation
stages: add
facets: transmutation
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Phudara's unknown inheritance
location: Phudara / Isle of Whispers
```

Your distillation becomes nearly flawless:
- You can now hold up to four distilled essences at a time.

| Creature Cultivation Tier | Potion Rarity | Failure Rate |
|---|---|---|
| Initiate | Common | 0% |
| Adept | Uncommon | 0% |
| Master | Rare | 0% |
| Grandmaster | Very Rare | 0% |
| Great Grandmaster | Legendary | 50% |

**Essence Seal:**
When you deal poison damage to a living creature, you can seal one of its abilities that you have seen it use (an action, bonus action, or reaction). The creature makes a Constitution saving throw against your essence ability save DC. On a failure, it can't use that ability until it finishes a short or long rest. You can end the seal early (no action required). You can keep only one ability sealed at a time. The Essence cost depends on the creature's cultivation tier:

| Creature Tier | Essence Cost |
|---|---|
| Initiate | 1 |
| Adept | 2 |
| Master | 3 |
| Grandmaster | 4 |
| Great Grandmaster | 5 |

---

### Suicide Fuse

```yaml
id: alchemy_grandmaster_suicide_fuse
tier: grandmaster
facets: explosives
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nilo
location: Phudara / Isle of Whispers
activation: action
```

As an action, you flick a burning fuse into a creature within 120 feet. Make a ranged spell attack. On a hit, it takes 8d10 force damage.
- **Detonation:** If this reduces it to 0 hit points, it makes a Constitution saving throw against your essence ability save DC. On a failure, it dies and bursts apart.
- **Blast:** Each creature within the radius below, you included, makes a Dexterity saving throw, taking X d10 + X force damage on a failure or half as much on a success. X is the dead creature's level or CR (minimum 1).

| Creature Cultivation Tier | CR (no tier) | Blast Radius |
|---|---|---|
| Initiate | 1–4 | 10 feet |
| Adept | 5–8 | 30 feet |
| Master | 9–12 | 60 feet |
| Grandmaster | 13–16 | 90 feet |
| Great Grandmaster | 17+ | At least 120 feet |

---

### Eight Trigrams Furnace

```yaml
id: alchemy_grandmaster_eight_trigrams_furnace
tier: grandmaster
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nilo
location: Phudara / Isle of Whispers
domain: bound
activation: action
```

As an action, you seal a furnace around a creature you can see within 60 feet. It makes a Strength saving throw against your essence ability save DC. On a failure, it's sealed inside for up to 1 minute.
- **Sealed:** It's incapacitated, and nothing outside can see or affect it.
- **Refining Fire:** At the start of each of its turns, it takes 6d10 fire damage, then repeats the save, breaking out into the nearest unoccupied space on a success.
- **Golden Elixir:** If it dies inside, its body is refined into an elixir that keeps until it's swallowed. A creature that swallows it or is fed it regains X d10 + X hit points, where X is the dead creature's level or CR (minimum 1). Any reduction to its hit point maximum ends, as do these conditions: blinded, charmed, deafened, exhaustion, frightened, incapacitated, paralyzed, petrified, poisoned, and stunned.

---

### Myriad Poison Sanctum

```yaml
id: alchemy_grandmaster_myriad_poison_sanctum
tier: grandmaster
facets: poison
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nilo
location: Phudara / Isle of Whispers
domain: bound
activation: bonus action
```

As a bonus action, you poison your Sanctum for 1 minute. Any number of creatures you choose there make a Constitution saving throw against your essence ability save DC, becoming poisoned for the duration on a failure. A creature poisoned this way repeats the save at the start of each of its turns, with disadvantage, ending the effect on a success.

---

## Cantrips

---

### Erosion of Being

```yaml
id: acid_master_erosion_of_being
tier: master
facets: acid
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
activation: action
domain: expansion
domainText: It deals 8d8 acid damage instead of 6d8.
```

As an action, target a creature within 60 feet to make a Constitution saving throw, taking 6d8 acid damage on a failed save or half as much on a success.

On a failed save, the creature begins dissolving into nothingness and is banished to a harmless demiplane for 1 minute. If reduced to 0 hit points by this damage, it dissolves completely and is permanently destroyed (no resurrection except by *Wish*).

At the end of each turn while banished, the creature takes 2d8 acid damage and can repeat the save, returning on a success.

---

### Acidic Precision

```yaml
id: acid_initiate_acidic_precision
tier: adept
facets: acid
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

Your expertise with corrosive substances has honed your skill in turning everyday objects into deadly weapons. You gain proficiency with all thrown weapons and improvised thrown weapons.

---
## Adept Tier

---

### Extended Reach

```yaml
id: acid_adept_extended_reach
tier: initiate
facets: explosives
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

Your skill with explosive devices allows you to strike from farther away. When you create or use an explosive, its range to the target point is doubled. For example, a bomb that can normally be thrown or placed within 30 feet can now target a point up to 60 feet away.

---
## Master Tier

---

### Seven-Color Elixir

```yaml
id: acid_seven_color_elixir
tier: master
facets: medicine
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Fendral
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you drink one of your seven elixirs and roll 1d8 to determine the effect. On a 1–7, you gain the corresponding elixir’s effect. On an 8, you may choose any of the seven:

1. **Crimson Veil** — *Greater Invisibility* for 1 minute.
2. **Azure Sight** — *True Seeing* for 10 minutes.
3. **Golden Mirage** — Four illusory duplicates (*Mirror Image*).
4. **Emerald Phantasm** — *Hallucinatory Terrain* in a 150-foot radius.
5. **Violet Confusion** — *Confusion* affecting all creatures within 30 feet.
6. **Silver Displacement** — *Mislead* effect.
7. **Obsidian Terror** — *Fear* in a 30-foot cone.

---

### Strength Booster

```yaml
id: poison_initiate_strength_booster
tier: initiate
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
domain: expansion
domainText: The bonus is a d6 instead.
```

As a bonus action, you can drink a mutagen to gain a 1d4 bonus to strength based ability checks for 10 minutes.

---

### Enchanting Perfume

```yaml
id: poison_initiate_enchanting_perfume
tier: initiate
facets: medicine
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: action
domain: expansion
domainText: One ally within 30 feet also gains the benefit.
```

As an action, you can apply a specially crafted perfume that enhances your charm and charisma. For the next hour, you gain a 1d4 bonus to Charisma (Persuasion) and Charisma (Deception) checks.

---

### Pill of Focus

```yaml
id: poison_adept_pill_of_focus
tier: adept
facets: medicine
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you can consume a pill to gain advantage on concentration checks for the next hour.

---

### Lethargy Draught

```yaml
id: alchemy_adept_lethargy_draught
tier: adept
facets: poison
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nilo
location: Phudara / Isle of Whispers
domain: expansion
domainText: It falls unconscious for 10 minutes instead.
activation: action
```

As an action, you throw a needle tipped with a lethargy draught at a creature you can see within 30 feet. It makes a Constitution saving throw against your essence ability save DC. On a failure, its speed is halved and it can't take reactions until the end of its next turn, when it repeats the saving throw. If it fails again, it falls unconscious for 1 minute, until it takes damage, or until another creature uses an action to shake it awake. A creature immune to poison is unaffected.

---

### Mindfog

```yaml
id: alchemy_master_mindfog
tier: master
facets: poison
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nilo
location: Phudara / Isle of Whispers
activation: action
```

As an action, you break a vial of mindfog into a 15-foot-radius cloud centered on a point you can see within 60 feet. Each creature there that breathes makes a Constitution saving throw against your essence ability save DC. On a failure, it loses concentration and can't concentrate until the end of its next turn. A creature immune to poison is unaffected.

---

### Purple Worm Extract

```yaml
id: alchemy_master_purple_worm_extract
tier: master
facets: poison
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nilo
location: Phudara / Isle of Whispers
activation: action
```

As an action, you make a melee spell attack against a creature within your reach with a stinger dipped in purple worm extract. On a hit, it takes 3d6 piercing damage and makes a Constitution saving throw against your essence ability save DC. On a failure, it takes 6d6 poison damage and is poisoned for 1 minute. On a success, it takes half as much poison damage only.

---

### Claw Graft

```yaml
id: alchemy_initiate_claw_graft
tier: initiate
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nilo
location: Phudara / Isle of Whispers
activation: bonus action
domain: expansion
domainText: Its damage dice are d10s.
```

As a bonus action, you rewrite the flesh of your hands, and they split into hooked claws. For 1 minute, your unarmed strikes deal 1d8 slashing damage, and you can climb at your full speed.

---

### Wing Graft

```yaml
id: alchemy_master_wing_graft
tier: master
facets: transmutation
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nilo
location: Phudara / Isle of Whispers
domain: expansion
domainText: It lasts 1 hour instead.
activation: bonus action
```

As a bonus action, you rewrite your shoulders, and a pair of leathery wings tears free of your back. For 1 minute, you have a flying speed equal to your walking speed.

---

### Healing Bomb

```yaml
id: alchemy_adept_healing_bomb
tier: adept
facets: medicine
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nilo
location: Phudara / Isle of Whispers
domain: expansion
domainText: It restores 4d8 + your essence ability modifier instead.
activation: action
```

As an action, you throw a vial of healing elixir that bursts at a point you can see within 60 feet. Each creature you choose within 10 feet of that point regains hit points equal to 2d8 + your essence ability modifier.

---

### Apex Toxinator

```yaml
id: poison_master_essence_snake_horror
tier: master
facets: poison
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lord Kai (Shadow Sect)
location: Sirius
activation: action
```

As an Action, through concentrated biochemical reagents and alchemical cultivation, you conjure a monstrous, hissing Snake Horror homunculus in an unoccupied space you can see within 30 feet. The creature is friendly to you and your companions, acts immediately after you in the initiative order, and remains for 1 hour, until it drops to 0 hit points, or until you dismiss it as an action.

---
## Cantrips

---

## Spells restored from V1

---

### Chaos Bolt

```yaml
id: acid_1st_level_chaos_bolt
tier: 1st
facets: explosives
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

A ranged spell attack within 120 feet deals 2d8 + 1d6 damage of a random type. If both d8s match, it leaps to another creature within 30 feet.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#chaos%20bolt_xge).

---

### Chromatic Orb

```yaml
id: acid_1st_level_chromatic_orb
tier: 1st
facets: acid, poison
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A ranged spell attack within 90 feet deals 3d8 damage of a type you choose: acid, cold, fire, lightning, poison or thunder.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#chromatic%20orb_xphb).

---

### Enlarge/Reduce

```yaml
id: poison_2nd_level_enlarge_reduce
tier: 2nd
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A creature or object within 30 feet grows or shrinks one size for 1 minute (Constitution save if unwilling), with advantage or disadvantage on Strength rolls and +1d4 or -1d4 weapon damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#enlarge%2Freduce_xphb).

---

### Disintegrate

```yaml
id: acid_6th_level_disintegrate
tier: 6th
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A green ray hits a target within 60 feet for 10d6 + 40 force damage on a failed Dexterity save. A creature reduced to 0 hit points turns to dust.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#disintegrate_xphb).

---

### Animal Shapes

```yaml
id: wood_8th_level_animal_shapes
tier: 8th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

Any number of willing creatures within 30 feet turn into Large or smaller Beasts of CR 4 or lower for up to 24 hours.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#animal%20shapes_xphb).

---

### Lesser Restoration

```yaml
id: providence_2nd_lesser_restoration
tier: 2nd
facets: medicine
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
activation: bonus action
```

You touch a creature and end one condition on it: blinded, deafened, paralyzed or poisoned.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#lesser%20restoration_xphb).

---

### Greater Restoration

```yaml
id: providence_5th_greater_restoration
tier: 5th
facets: medicine
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Abjuration
activation: action
```

You touch a creature and remove one level of exhaustion, charm or petrification, a curse, or a reduction to an ability score or hit point maximum.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#greater%20restoration_xphb).

---

### Create Magen

```yaml
id: v2_alchemy_create_magen
tier: 7th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (IDRotF)
```

You turn a prepared doll into a magen, a construct servant that obeys your commands.

Source reference: [D&D 5e (IDRotF) on 5e.tools](https://5e.tools/spells.html#create%20magen_idrotf).

---

### Clone

```yaml
id: v2_alchemy_clone
tier: 8th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

You grow an inert duplicate of a creature over 120 days. If the original dies, its soul moves into the clone.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#clone_xphb).

---

### Detonate

```yaml
id: v2_alchemy_detonate
tier: 9th
facets: explosives
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
activation: action
```

An explosive seed inside a creature within 500 feet deals 10d10 fire damage on a failed Constitution save, then blasts a 60-foot emanation around it.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#detonate_au).

---

### Mass Polymorph

```yaml
id: v2_alchemy_mass_polymorph
tier: 9th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

Up to ten creatures within 120 feet turn into Beasts for up to 1 hour (Wisdom save if unwilling).

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#mass%20polymorph_xge).

---

### Steal Immortality

```yaml
id: v2_alchemy_steal_immortality
tier: 9th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: reaction
```

You spend nine Hit Point Dice to gain temporary hit points and steal a creature's type, gaining immunity to poison and no need to eat, drink or breathe.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#steal%20immortality_grimhollowpg24).

---

### Alter Self

```yaml
id: v2_alchemy_alter_self
tier: 2nd
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

You reshape your body for up to 1 hour: gills and a swim speed, a new appearance, or natural weapons. You can switch between them as an action.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#alter%20self_xphb).

---

### Polymorph

```yaml
id: v2_alchemy_polymorph
tier: 4th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A creature within 60 feet turns into a Beast of your choice, with a CR no higher than its own, for up to 1 hour on a failed Wisdom save. It gains the Beast's hit points as temporary hit points, and the spell ends when they run out.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#polymorph_xphb).

---

### Water to Poison

```yaml
id: v2_alchemy_water_to_poison
tier: 5th
facets: poison
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: reaction
```

As a creature within 30 feet drinks, you turn the liquid to poison. On a failed Constitution save, it takes 8d8 poison damage and is poisoned until the start of your next turn. On a success, nothing happens.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#water%20to%20poison_bb1000s).

---

### Dust of Death

```yaml
id: v2_alchemy_dust_of_death
tier: 6th
facets: poison
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
```

You turn a pinch of dust into a poison that nonmagical means can't detect. A creature that ingests it takes 10d8 poison damage on a failed Constitution save, or half on a success, and dies if this reduces it to 0 hit points. It leaves dust around the victim's mouth.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#dust%20of%20death_bb1000s).

---

### Alchemical Form

```yaml
id: v2_alchemy_alchemical_form
tier: 6th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

For 1 minute, you become a jelly of acid and poison: immune to acid and poison damage and to the poisoned and stunned conditions, resistant to nonmagical fire, piercing, and slashing damage, and able to squeeze through gaps. You can't speak, cast spells, or use objects, but your strike deals 4d6 acid or poison damage and can poison.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#alchemical%20form_kpdm).

---

### Create Homunculus

```yaml
id: v2_alchemy_create_homunculus
tier: 6th
facets: transmutation
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

Over 1 hour, you bleed onto prepared components and turn them into a homunculus, a construct companion that dies if you die. After a long rest, you can give it some of your Hit Dice as hit points.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#create%20homunculus_xge).

---

### Unstable Reaction

```yaml
id: v2_alchemy_unstable_reaction
tier: 7th
facets: acid, explosives
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond: Spell Variants
activation: action
concentration: true
```

You plant a glowing bead at a point within 150 feet. When the spell ends, it explodes in a 20-foot radius: 12d6 acid damage, plus 1d6 for each of your turns it waited, on a failed Dexterity save, or half on a success. A creature that touches it can set it off early.

Source reference: [The Elements and Beyond: Spell Variants on 5e.tools](https://5e.tools/spells.html#unstable%20reaction_teb:sv).

---

### Corrosive Plume

```yaml
id: v2_alchemy_corrosive_plume
tier: 8th
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond
activation: action
```

Acidic gas erupts from your hands in a line 100 feet long and 15 feet wide: 13d6 acid damage on a failed Dexterity save, which also destroys nonmagical armor that isn't adamantine, or half damage on a success.

Source reference: [The Elements and Beyond on 5e.tools](https://5e.tools/spells.html#corrosive%20plume_teb).

---

### Voracious Armor

```yaml
id: v2_alchemy_voracious_armor
tier: 1st
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond: Spell Variants
activation: action
```

Salivating spectral mouths cover you and your gear for 1 hour, granting 5 temporary hit points. While you have them, a creature that hits you with a melee attack takes 5 acid damage. Both increase by 5 for each slot level above 1st.

Source reference: [The Elements and Beyond: Spell Variants on 5e.tools](https://5e.tools/spells.html#voracious%20armor_teb:sv).

---

### Wine Bomb

```yaml
id: v2_alchemy_wine_bomb
tier: 2nd
facets: poison, explosives
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Yorviing's Arcane Grimoire
activation: action
```

You hurl a bottle of alcohol at a point within 30 feet, and it explodes into a 10-foot radius of alcoholic fog that spreads around corners and lasts 1 minute or until a strong wind disperses it. A creature that enters it for the first time on a turn or starts its turn there makes a Constitution saving throw, becoming incapacitated with drunkenness on a failure, even if it holds its breath. It repeats the save at the start of each of its turns, ending the effect on a success.

Source reference: [Yorviing's Arcane Grimoire on 5e.tools](https://5e.tools/spells.html#wine%20bomb_yag).

---

### Bolstering Brew

```yaml
id: v2_alchemy_bolstering_brew
tier: 3rd
facets: medicine
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

You consume a silver tankard worth 100 gp and bring forth a small keg of magical ale. Up to six other creatures within 30 feet can drink with you, and each that downs a mug gains Heroic Inspiration, which it can use once in the next 8 hours to reroll one d20 it just rolled, taking the new roll. Adapted from the source, which grants other benefits.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#bolstering%20brew_kpdm).

---

### Sustaining Meditation

```yaml
id: v2_alchemy_sustaining_meditation
tier: 3rd
facets: medicine
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
concentration: true
```

For up to 24 hours, you control your body's natural processes. You gain a pool of 20 hit points (5 more per slot level above 3rd) and can spend any amount of it as a bonus action to heal yourself; it doesn't refill. With at least 5 left, you can instead use a bonus action to end one poison, disease, or the blinded, deafened, paralyzed, or poisoned condition on yourself, ending the spell. Meanwhile you don't need to eat or sleep, hold your breath five times as long, and, while the pool has at least 1 hit point, have advantage on saves against poison and resistance to poison damage.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#sustaining%20meditation_bb1000s).

---

### Cloak of Serpents

```yaml
id: v2_alchemy_cloak_of_serpents
tier: 4th
facets: poison
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

Translucent snakes drape your body for 10 minutes, giving you resistance to poison damage and immunity to the poisoned condition. Whenever a creature within 5 feet hits you with a melee attack, a serpent strikes it for 2d8 poison damage, and it's poisoned for 1 minute on a failed Constitution save (half damage and no poisoning on a success).

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#cloak%20of%20serpents_kpdm).

---

### Doom of Serpent Coils

```yaml
id: v2_alchemy_doom_of_serpent_coils
tier: 4th
facets: poison
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

You drink a dose of poison, automatically failing any save against it, and spread it to every other living creature within 10 feet. Each makes a Constitution saving throw against the spell instead of the poison's own: on a failure it takes 4d6 poison damage and is poisoned, repeating the save at the end of each of its turns (4d6 poison damage on each failure); on a success it's unaffected, or no longer poisoned, and immune to this spell for 24 hours.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#doom%20of%20serpent%20coils_kpdm).

---

### Needle Shower

```yaml
id: v2_alchemy_needle_shower
tier: 4th
facets: poison
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond: Spell Variants
activation: action
```

Poisonous plant thorns rain down in a 20-foot-radius, 50-foot-high cylinder within 300 feet: 2d8 piercing and 4d6 poison damage on a failed Dexterity save, or half on a success. The area is difficult terrain until the end of your next turn.

Source reference: [The Elements and Beyond: Spell Variants on 5e.tools](https://5e.tools/spells.html#needle%20shower_teb:sv).

---

### Sulfurous Squall

```yaml
id: v2_alchemy_sulfurous_squall
tier: 5th
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
```

Sulfuric rain sweeps up to ten connected 10-foot cubes within 150 feet: 4d8 acid damage on a failed Dexterity save, or half on a success. For 10 minutes the area is coated in caustic sulfur, and a creature moving in it takes 1d8 acid damage per 5 feet. If fire touches it, the whole area bursts into flames for 1 round, dealing 4d8 fire damage to each creature that starts its turn there, and the spell ends.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#sulfurous%20squall_belzormm).

---

### Immunity to Poison and Disease

```yaml
id: v2_alchemy_immunity_to_poison_and_disease
tier: 5th
facets: medicine
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Elminster's Guide to Magic
activation: action
```

A creature you touch is immune to poison damage, the poisoned condition, and all poisons and diseases, even magical ones, for 24 hours. Any poison or disease already in it is held in stasis until the spell ends.

Source reference: [Elminster's Guide to Magic on 5e.tools](https://5e.tools/spells.html#immunity%20to%20poison%20and%20disease_elminsters%20guide%20to%20magic).

---

### Perfect Toxin

```yaml
id: v2_alchemy_perfect_toxin
tier: 6th
facets: poison
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Compendium of Forgotten Secrets: Awakening
activation: action
```

You coat an object you touch, such as a blade, a tankard, or a door handle, in a poison of elemental chaos for 1 hour. Each time a creature touches it, the creature is poisoned for 1 minute, repeating a Constitution saving throw at the start of each of its turns to end the effect.

Source reference: [The Compendium of Forgotten Secrets: Awakening on 5e.tools](https://5e.tools/spells.html#perfect%20toxin_cofsa).

---

### Toxic Pollen Storm

```yaml
id: v2_alchemy_toxic_pollen_storm
tier: 7th
facets: poison
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond: Spell Revisions
activation: action
```

A storm of poisonous pollen fills up to ten connected 10-foot cubes within 150 feet: 7d10 poison damage on a failed Dexterity save, or half on a success. The area is heavily obscured until the start of your next turn, and you can leave plant life in it unharmed.

Source reference: [The Elements and Beyond: Spell Revisions on 5e.tools](https://5e.tools/spells.html#toxic%20pollen%20storm%20(revised)_teb:sr).

---

### Bite of the King

```yaml
id: v2_alchemy_bite_of_the_king
tier: 8th
facets: acid
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Elminster's Guide to Magic
activation: action
concentration: true
```

Make a melee spell attack against a Medium or smaller creature within 5 feet. On a hit, you appear to devour it, and it's held in a demiplane like a beast's belly for up to 1 minute, taking 3d6 acid and 3d6 bludgeoning damage at the start of each of its turns on a failed Constitution save (half on a success). It can attack the walls (AC 10 + your spellcasting modifier, resistant to acid, vulnerable to poison) and escapes once they take 60 damage. When the spell ends, it emerges in the nearest unoccupied space to you.

Source reference: [Elminster's Guide to Magic on 5e.tools](https://5e.tools/spells.html#bite%20of%20the%20king_elminsters%20guide%20to%20magic).

---
