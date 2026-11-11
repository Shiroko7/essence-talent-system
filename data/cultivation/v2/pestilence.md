# Pestilence Cultivation Path

Tradition: Divine
Concept: Disease, poison, curses, affliction, and resistance to corruption.
Facets: Disease, Venom, Curses

### Venomous Touch

```yaml
id: poison_initiate_venomous_touch
tier: initiate
facets: venom
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: action
```

As an action, you can imbue your touch with a mild poison. A creature you touch must make a Constitution saving throw against your spell save DC or become poisoned for 1 minute. While poisoned this way, the creature takes 1d6 poison damage at the start of each of its turns until it succeeds a saving throw. The poison ends early if the creature receives any kind of healing.

---

### Venomous Strike

```yaml
id: poison_adept_venomous_strike
tier: adept
facets: venom
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you can coat a weapon with a potent poison. The next attack you make with that weapon deals an additional 2d6 poison damage on a hit. The target must also succeed on a Constitution saving throw or be poisoned for 1 minute.

---

### Corrosive Touch

```yaml
id: pestilence_initiate_corrosive_touch
tier: initiate
facets: disease
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
location: Leatrux
activation: action
```

As an action, you wreathe your hand in sickly brown radiance and make a melee spell attack against a creature you can reach. On a hit, the target takes 2d10 poison damage. If the target fails a Constitution saving throw, it is also poisoned until the end of your next turn, and its AC is reduced by 1 as the corrosive magic eats through armor or clothing, leaving raw welts on exposed skin. This AC reduction lasts until the creature finishes a short or long rest or receives magical healing.

---

### Toxic Skin Secretion I

```yaml
id: poison_adept_toxic_skin_secretion_1
tier: initiate
series: toxic_skin_secretion
stages: replace
facets: venom
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Church of Talona
location: Leatrux
oncePerTurn: true
```

Once per turn, when a creature hits you with a melee attack, that creature must succeed on a Constitution saving throw against your spell save DC or become poisoned until the end of its next turn.

---

### Creeping Pestilence

```yaml
id: pestilence_initiate_creeping_pestilence
tier: initiate
facets: disease
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
location: Leatrux
activation: action
concentration: true
```

As an action, you infect a creature you can see within 60 feet with a virulent disease. The target must succeed on a Constitution saving throw or become poisoned for up to 1 minute. While poisoned in this way, the creature is wracked with weakness and vulnerability—it takes an additional 1d6 poison damage whenever it takes poison damage from any source.

At the end of each of its turns, the target can make another Constitution saving throw. On a success, the effect ends on the target. On a failure, the disease spreads: choose one creature within 60 feet of the target. That creature must succeed on a Constitution saving throw or also become poisoned by this ability (with its own separate duration and spreading capability).

## Adept Tier

---

### Toxic Skin Secretion II

```yaml
id: poison_adept_toxic_skin_secretion_2
tier: adept
series: toxic_skin_secretion
stages: replace
facets: venom
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Church of Talona
location: Leatrux
oncePerTurn: true
```

Once per turn, when a creature hits you with a melee attack, that creature must succeed on a Constitution saving throw against your spell save DC or become poisoned for 1 minute. On a failed save, the creature also takes poison damage equal to your proficiency bonus.

---

### Pestilent Cloud

```yaml
id: pestilence_adept_pestilent_cloud
tier: adept
facets: disease
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
location: Leatrux
activation: action
concentration: true
```

As an action, you create a 20-foot-radius sphere of yellowish-green vapors centered on a point you can see within 90 feet. The cloud spreads around corners and is heavily obscured. It lasts for up to 1 minute or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.

When a creature enters the cloud for the first time on a turn or starts its turn there, it must make a Constitution saving throw. On a failed save, the creature takes 3d8 poison damage, becomes poisoned, and has its speed halved until the start of its next turn. On a successful save, the creature takes half as much damage and suffers no additional effects.

Creatures wearing or bearing a holy symbol of Talona are immune to its effects.

---

### Lingering Touch

```yaml
id: pestilence_adept_lingering_touch
tier: adept
facets: disease
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
location: Leatrux
activation: action
```

As an action, you point at a creature within 60 feet, and sickly brown energy lashes out to infect it. The target must make a Constitution saving throw. On a failed save, the target takes 5d10 poison damage and becomes both restrained and poisoned for 1 minute as virulent toxins seize its body. On a successful save, the target takes half as much damage and is not restrained or poisoned.

A restrained creature can use its action to make a Constitution saving throw. On a success, the restrained condition ends, but the creature remains poisoned for the duration. At the end of each of its turns while poisoned by this ability, the creature can make another Constitution saving throw, ending the poisoned condition on a success.

## Master Tier

---

### Toxic Skin Secretion III

```yaml
id: poison_adept_toxic_skin_secretion_3
tier: master
series: toxic_skin_secretion
stages: replace
facets: venom
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Church of Talona
location: Leatrux
oncePerTurn: true
```

Once per turn, when a creature hits you with a melee attack, that creature must succeed on a Constitution saving throw against your spell save DC. On a failed save, the creature becomes poisoned for 1 hour, takes poison damage equal to twice your proficiency bonus, and has its movement speed halved while poisoned this way.

---

### Poison Spray

```yaml
id: pestilence_cantrip_poison_spray
tier: cantrip
facets: venom
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Conjuration
activation: action
```

A ranged spell attack within 30 feet deals 1d12 poison damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#poison%20spray_xphb).

---

### Infestation

```yaml
id: pestilence_cantrip_infestation
tier: cantrip
facets: disease
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Conjuration
activation: action
```

A creature within 30 feet takes 1d6 poison damage and moves 5 feet in a random direction on a failed Constitution save.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#infestation_xge).

## Spells

---

### Ray of Sickness

```yaml
id: pestilence_1st_ray_of_sickness
tier: 1st
facets: disease
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Death Domain) / Necromancy
activation: action
```

A ranged spell attack within 60 feet deals 2d8 poison damage and poisons the target until the end of your next turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#ray%20of%20sickness_xphb).

---

### Detect Poison and Disease

```yaml
id: pestilence_1st_detect_poison_and_disease
tier: 1st
facets: disease, venom
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Divination
activation: action
concentration: true
ritual: true
```

For up to 10 minutes you sense poisons, venomous creatures and diseases within 30 feet, and what kind each is.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#detect%20poison%20and%20disease_xphb).

---

### Blight

```yaml
id: pestilence_4th_blight
tier: 4th
facets: disease
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Death Domain) / Necromancy
activation: action
```

A creature within 30 feet takes 8d8 necrotic damage on a failed Constitution save, or half on a success. Plants fail automatically.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#blight_xphb).

---

### Contagion

```yaml
id: pestilence_5th_contagion
tier: 5th
facets: disease
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Necromancy
activation: action
```

Your touch deals 11d8 necrotic damage and poisons the target on a failed Constitution save, with disadvantage on saves of an ability you choose for 7 days.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#contagion_xphb).

---

### Insect Plague

```yaml
id: pestilence_5th_insect_plague
tier: 5th
facets: disease
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Conjuration
activation: action
concentration: true
```

Locusts fill a 20-foot-radius sphere within 300 feet for up to 10 minutes, dealing 4d10 piercing damage on a failed Constitution save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#insect%20plague_xphb).

---

### Cloudkill

```yaml
id: pestilence_5th_cloudkill
tier: 5th
facets: venom
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Conjuration / Toxic Cloud
activation: action
concentration: true
```

A 20-foot-radius cloud of poison within 120 feet drifts away from you and deals 5d8 poison damage on a failed Constitution save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#cloudkill_xphb).

---

### Purify Food and Drink

```yaml
id: pestilence_1st_purify_food_and_drink
tier: 1st
facets: disease, venom
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Transmutation
activation: action
ritual: true
```

You remove poison and rot from food and drink in a 5-foot-radius sphere within 10 feet.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#purify%20food%20and%20drink_xphb).

---

### Protection from Poison

```yaml
id: pestilence_2nd_protection_from_poison
tier: 2nd
facets: venom
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Abjuration
activation: action
```

You end the poisoned condition on a creature you touch, and for 1 hour it has resistance to poison and advantage on saves against poison.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#protection%20from%20poison_xphb).

---

### Blessed Immunity

```yaml
id: pestilence_master_blessed_immunity
tier: master
facets: disease, venom
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Talona / Portfolio (Poison)
location: Leatrux
activation: action
```

As an action, you touch a willing creature, granting it Talona's protection. For 8 hours, the target gains the following benefits:

- Immunity to poison damage and the poisoned condition
- Immunity to disease, including magical diseases like lycanthropy and mummy rot
- Any existing poisons or diseases affecting the target are suppressed for the duration
- Parasitic infestations (such as rot grubs) are immediately expelled from the target's body, dealing no harm
- Any molds, spores, or fungi on or within the target's body are destroyed

Additionally, if the target would contract a disease during that time, they automatically succeed on any saving throw to resist it.

## Cantrips

---

### Hallucinogenic Trance

```yaml
id: poison_adept_hallucinogenic_trance
tier: adept
facets: venom
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
activation: bonus action
```

As a bonus action, you can target one poisoned creature within 30 feet. The target must succeed on a Wisdom saving throw or be subjected to vivid hallucinations for the duration of its poisoned condition. While affected by these hallucinations, the creature has disadvantage on Intelligence, Wisdom, and Charisma saving throws and ability checks. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.

---

### Vestibular Trance

```yaml
id: poison_adept_vestibular_trance
tier: adept
facets: venom
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
activation: bonus action
```

As a bonus action, you can target one poisoned creature within 30 feet. The target must succeed on a Constitution saving throw or be overwhelmed by distorted bodily sensations (nausea, vertigo, and loss of coordination) for the duration of its poisoned condition. While affected, the creature has disadvantage on Strength, Dexterity, and Constitution saving throws and ability checks. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.

---

### Bestow Curse

```yaml
id: torment_3rd_bestow_curse
tier: 3rd
facets: curses
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Necromancy
activation: action
concentration: true
```

A creature you touch is cursed for up to 1 minute on a failed Wisdom save: disadvantage with one ability, disadvantage against you, wasted turns, or extra necrotic damage from you.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#bestow%20curse_xphb).

---

### Bane

```yaml
id: torment_1st_bane
tier: 1st
facets: curses
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Enchantment
activation: action
concentration: true
```

Up to three creatures within 30 feet that fail a Charisma save subtract 1d4 from attack rolls and saving throws for up to 1 minute.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#bane_xphb).

---

### Remove Curse

```yaml
id: v2_providence_remove_curse
tier: 3rd
facets: curses
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
activation: action
```

All curses on a creature or object you touch end. A cursed item's owner can unattune from it.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#remove%20curse_phb).

---

### Venomous Precision

```yaml
id: poison_adept_venomous_precision
tier: adept
facets: venom
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

When attacking a creature that is poisoned, you have advantage on attack rolls against that creature.

---

## Spells restored from V1

---

### Stinking Cloud

```yaml
id: wind_3rd_level_stinking_cloud
tier: 3rd
facets: venom
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A 20-foot-radius cloud of nauseating gas within 90 feet heavily obscures the area. Creatures in it that fail a Constitution save lose their action.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#stinking%20cloud_xphb).

---

### Syluné's Viper

```yaml
id: poison_3rd_level_sylunes_viper
tier: 3rd
facets: venom
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Heroes of Faerûn)
activation: bonus action
```

A spectral snake coils around you for 1 hour: 15 temporary hit points, a climb speed, and a venomous bite you can launch at creatures within 50 feet.

Source reference: [D&D 5e (Heroes of Faerûn) on 5e.tools](https://5e.tools/spells.html#sylun%C3%A9's%20viper_frhof).

---

### Elemental Bane

```yaml
id: acid_4th_level_elemental_bane
tier: 4th
facets: curses
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

A creature within 90 feet that fails a Constitution save loses resistance to a damage type you choose and takes an extra 2d6 of it once per turn.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#elemental%20bane_xge).

---

### Giant Insect

```yaml
id: wood_4th_level_giant_insect
tier: 4th
facets: venom
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

You summon a giant centipede, spider or wasp within 60 feet that fights for you for up to 10 minutes.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#giant%20insect_xphb).

---

### Investiture of Venom

```yaml
id: poison_6th_level_investiture_of_venom
tier: 5th
facets: venom
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
concentration: true
```

For up to 10 minutes you're immune to poison, see who resists it, and poison a creature within 30 feet as a bonus action.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#investiture%20of%20venom_grimhollowpg24).

---

### Contagious Touch

```yaml
id: v2_pestilence_contagious_touch
tier: 6th
facets: disease
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
```

Like Contagion, but one melee spell attack infects a number of creatures within reach equal to your spellcasting modifier.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#contagious%20touch_bb1000s).

---

### Symbol

```yaml
id: v2_pestilence_symbol
tier: 7th
facets: curses
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

You inscribe a 10-foot glyph that triggers a harmful effect you choose, such as death, fear, sleep or insanity, on creatures nearby.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#symbol_xphb).

---

### Abi-Dalzim's Horrid Wilting

```yaml
id: v2_pestilence_abi_dalzims_horrid_wilting
tier: 8th
facets: disease
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

Moisture is drawn from creatures in a 30-foot cube within 150 feet for 12d8 necrotic damage on a failed Constitution save, or half on a success.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#abi-dalzim's%20horrid%20wilting_xge).

---

### Befuddlement

```yaml
id: v2_pestilence_befuddlement
tier: 8th
facets: curses
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A creature within 150 feet takes 10d12 psychic damage and can't cast spells on a failed Intelligence save, or half damage on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#befuddlement_xphb).

---

### Fleshcrawl

```yaml
id: v2_pestilence_fleshcrawl
tier: 7th
facets: disease
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
concentration: true
```

A creature within 100 feet takes 8d10 necrotic damage on a failed Constitution save, or half on a success, and its flayed skin rises to fight it.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#fleshcrawl_grimhollowpg24).

---

### Flense

```yaml
id: v2_pestilence_flense
tier: 8th
facets: disease
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
concentration: true
```

A ranged spell attack within 60 feet strips flesh for 8d6 necrotic damage, and you can repeat it each turn while you concentrate.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#flense_grimhollowpg24).

---

### Creeping Death

```yaml
id: v2_pestilence_creeping_death
tier: 8th
facets: curses
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
concentration: true
```

You spend eight Hit Point Dice to set a threshold. A creature within 60 feet dies the moment its hit points fall to or below it.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#creeping%20death_grimhollowpg24).

---

### Lifesink

```yaml
id: v2_pestilence_lifesink
tier: 8th
facets: disease
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
concentration: true
```

A 15-foot aura deals 4d6 necrotic damage to creatures that enter or start their turn in it, and heals you each turn.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#lifesink_grimhollowpg24).

---

### Afflict Line

```yaml
id: v2_pestilence_afflict_line
tier: 9th
facets: curses
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Deep Magic (01-20)
ritual: true
```

As a ritual, you curse a creature within 1 mile and its firstborn on a failed Wisdom save, with disadvantage on checks and saves of your spellcasting ability until the curse is dispelled.

Source reference: [Deep Magic (01-20) on 5e.tools](https://5e.tools/spells.html#afflict%20line_kpdm).
