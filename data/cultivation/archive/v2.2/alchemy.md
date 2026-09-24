# Alchemy Cultivation Path

Tradition: Primordial / Immortal
Concept: The primordial Dao of refining, extracting, combining, and transforming substances and cultivated essence.

## Initiate Tier

### Caustic Bomb

```yaml
id: acid_initiate_caustic_bomb
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

As an action, you can create a powerful, improvised explosive from available materials. Each creature in a 10-foot radius must make a Dexterity saving throw, taking 4d6 acid damage on a failed save, or half as much on a successful save.

---

### Acidic Insight

```yaml
id: acid_initiate_acidic_insight
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You have developed a keen understanding of acidic substances and their effects. You gain advantage on Intelligence (Arcana) and Wisdom (Nature) checks related to acids, alchemical reactions, and chemical processes. This knowledge allows you to identify and analyse unknown substances or toxins with ease.

---

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

### Quickening Draught

```yaml
id: poison_initiate_quickening_draught
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

As a bonus action, by drinking a specially prepared potion, you gain an additional 10 feet of movement speed for 10 minutes.

---

### Vital Essence Sublimation I (Nilo)

```yaml
id: poison_initiate_vital_essence_sublimation_i
tier: initiate
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

### Alchemy Proficiency

```yaml
id: acid_initiate_alchemy_proficiency
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

Gain proficiency in Alchemist’s Supplies. You can craft basic alchemical substances, such as acid flasks, potions of healing, and other simple concoctions.

---

### Herbalist’s Knowledge

```yaml
id: poison_initiate_herbalists_knowledge
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You gain proficiency with the Medicine skill and advantage on checks to identify or use medicinal herbs and poisons.

## Adept Tier

### Explosive Savant

```yaml
id: acid_adept_explosive_savant
tier: adept
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
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You can create a cloud of acidic mist in a 10-foot radius around you. Any creature that starts its turn within the cloud must make a Constitution saving throw or take 6d6 acid damage and be blinded until the end of its next turn.

---

### Acidic Embrace

```yaml
id: acid_adept_acidic_embrace
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You can magically coat a weapon or object in a layer of corrosive acid. The weapon deals an additional 2d4 acid damage on a successful hit, and the object corrodes any non-magical material it touches. This effect lasts for 1 minute.

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

### Mutagen Formula

```yaml
id: alchemy_adept_mutagen_formula
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
location: Sirius
```

When you learn this talent, choose one mutagen formula: Strength (+2 Strength, −2 Intelligence), Dexterity (+2 Dexterity, −2 Wisdom), Constitution (+2 Constitution, −2 Charisma), Intelligence (+2 Intelligence, −2 Strength), Wisdom (+2 Wisdom, −2 Dexterity), or Charisma (+2 Charisma, −2 Constitution). As a bonus action, when you drink a mutagen, you gain the chosen +2 ability score bonus and its paired −2 penalty for 10 minutes.

---

### Vital Essence Sublimation II (Nilo)

```yaml
id: poison_adept_vital_essence_sublimation_ii
tier: adept
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

### Chemical Expertise

```yaml
id: acid_adept_chemical_expertise
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You can create more advanced alchemical mixtures, such as potent acid flasks or alchemical fire. You gain a +2 bonus to checks involving Alchemist’s Supplies and can create these mixtures in half the usual time.

## Master Tier

### Vital Essence Sublimation III (Nilo)

```yaml
id: poison_master_vital_essence_sublimation_iii
tier: master
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

## Cantrips

### Acid Splash

```yaml
id: acid_cantrip_acid_splash
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
```

https://5e.tools/spells.html#acid%20splash_xphb

## Spells

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

### True Polymorph

```yaml
id: pestilence_9th_true_polymorph
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Transmutation / Viral Metamorphosis
```

Permamently warp the biological flesh of a creature or object into any plague beast or form.

https://5e.tools/spells.html#true%20polymorph_xphb

---

### Transmute Rock

```yaml
id: earth_5th_level_transmute_rock
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#transmute%20rock_xge

---

### Fabricate

```yaml
id: metal_4th_level_fabricate
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#fabricate_xphb

---

### Grease

```yaml
id: water_1st_level_grease
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#grease_xphb
