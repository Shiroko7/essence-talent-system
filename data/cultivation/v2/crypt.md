# Crypt Cultivation Path

Tradition: Divine
Concept: Myrkul’s death as an ending: corpses, bones, the dead who serve, decay, and the weariness of the grave.

### Gravekeeper’s Sense

```yaml
id: crypt_initiate_gravekeepers_sense
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Song Tae-un
location: Sirius
domain: expansion
domainText: Its range doubles.
```

You sense death the way others smell smoke. You know the location of every corpse and undead creature within 60 feet of you, even through walls. When you touch a corpse, you learn how long ago it died and what killed it: a blade, a fall, sickness, poison, old age, or magic.

---

### Grave Weariness

```yaml
id: crypt_initiate_grave_weariness
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Song Tae-un
location: Sirius
domain: expansion
domainText: You can target one more creature.
activation: action
```

As an action, you lay the weariness of the grave on a creature you can see within 30 feet. It makes a Constitution saving throw against your essence ability save DC. On a failure, it gains 1 Exhaustion level, which it loses when it finishes a short or long rest. A creature can't have more than one Exhaustion level from this technique at a time. Undead and constructs are immune.

---

### Bone Spear

```yaml
id: crypt_initiate_bone_spear
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Song Tae-un
location: Sirius
domain: expansion
domainText: It deals 4d10 piercing damage instead.
activation: action
```

As an action, a spear of jagged bone tears up out of the ground in a 30-foot line from you in a direction you choose. Each creature in the line makes a Dexterity saving throw against your essence ability save DC, taking 2d10 piercing damage on a failure or half as much on a success.

---

## Adept Tier

### Ossuary Cage

```yaml
id: crypt_adept_ossuary_cage
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Song Tae-un
location: Sirius
domain: expansion
domainText: The cage fills a 10-foot cube instead, and each creature in it makes the saving throw.
activation: action
```

As an action, ribs and long bones burst from the ground around a Large or smaller creature you can see within 60 feet. It makes a Dexterity saving throw against your essence ability save DC. On a failure, it is restrained inside the cage for 1 minute, and the bones grind into it for 2d10 piercing damage at the start of each of its turns while it stays caged.

As an action, a caged creature or a creature next to the cage can make a Strength (Athletics) check against your essence ability save DC, breaking the cage on a success.

---

### Claim the Fallen

```yaml
id: crypt_adept_claim_the_fallen
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Song Tae-un
location: Sirius
activation: reaction
```

When a creature you can see within 60 feet of you dies, you can use your reaction to draw in the last of its life. You gain temporary hit points equal to twice your proficiency bonus plus your essence ability modifier.

---

### Marrow Armor

```yaml
id: crypt_adept_marrow_armor
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Song Tae-un
location: Sirius
activation: bonus action
```

As a bonus action, plates of bone push up beneath your skin for 1 minute. While they last, you have resistance to piercing and slashing damage, and a creature that hits you with a melee attack takes piercing damage equal to your proficiency bonus.

---

## Master Tier

### Charnel Tide

```yaml
id: crypt_master_charnel_tide
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Song Tae-un
location: Sirius
activation: action
```

As an action, the dead claw their way up through the ground in a 20-foot-radius circle centered on a point you can see within 120 feet. Each creature you choose in the area makes a Dexterity saving throw against your essence ability save DC. On a failure, it takes 6d10 piercing damage and is restrained by grasping hands until the end of its next turn. On a success, it takes half as much damage only. The area is difficult terrain for 1 minute.

---

### Body of the Barrow

```yaml
id: crypt_master_body_of_the_barrow
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Song Tae-un
location: Sirius
```

Your body has learned the patience of the grave. You don't need to eat, drink, or breathe, you have resistance to necrotic damage, and your hit point maximum can't be reduced.

---

## Grandmaster Tier

### Necropolis

```yaml
id: crypt_grandmaster_necropolis
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Song Tae-un
location: Sirius
domain: bound
activation: bonus action
```

As a bonus action on your Consecrated Ground, you bring the long night of the grave for 1 minute. Living creatures of your choice anywhere on your Consecrated Ground regain only half the hit points from any healing, and they make death saving throws with disadvantage.

---

## Cantrips

### Chill Touch

```yaml
id: ruin_cantrip_chill_touch
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric (Death Domain) / Necromancy
activation: action
```

A melee spell attack deals 1d10 necrotic damage, and the target can't regain hit points until the end of your next turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#chill%20touch_xphb).

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
activation: action
```

A creature within 60 feet takes 1d8 necrotic damage on a failed Wisdom save, or 1d12 if it's missing any hit points.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#toll%20the%20dead_xphb).

---

### Death Recall

```yaml
id: v2_crypt_death_recall
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Fragments of the Forbidden Tome
activation: action
```

A corpse you can see takes one borrowed turn under your control right after yours, using what it could do in life: a half-speed move and one attack at first, more as you level.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#death%20recall_fftforbiddentome).

---

## Spells

### Bone Storm

```yaml
id: v2_crypt_bone_storm
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grimlore's Grimoire
activation: action
```

Shards of bone in a 15-foot cone deal 5d4 piercing damage on a failed Dexterity save.

Source reference: [Grimlore's Grimoire on 5e.tools](https://5e.tools/spells.html#bone%20storm_grimloresgrimoire).

---

### Cursed with Undeath

```yaml
id: v2_crypt_cursed_with_undeath
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grimlore's Grimoire
activation: bonus action
```

A humanoid you touch is cursed for 1 minute; if it dies before then, it rises as a zombie under your command.

Source reference: [Grimlore's Grimoire on 5e.tools](https://5e.tools/spells.html#cursed%20with%20undeath_grimloresgrimoire).

---

### Necromantic Burst

```yaml
id: v2_crypt_necromantic_burst
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Dark Arts Player's Companion
activation: action
```

A corpse crumbles to black dust and bursts, dealing 3d8 necrotic damage to creatures within 5 feet of it on a failed Dexterity save.

Source reference: [Dark Arts Player's Companion on 5e.tools](https://5e.tools/spells.html#necromantic%20burst_dapc).

---

### Animate Ghoul

```yaml
id: v2_crypt_animate_ghoul
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

A Small or Medium humanoid corpse rises as a ghoul under your control.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#animate%20ghoul_kpdm).

---

### Animate Dead

```yaml
id: v2_crypt_animate_dead
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A pile of bones or a Small or Medium corpse becomes your skeleton or zombie for 24 hours.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#animate%20dead_xphb).

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
activation: action
```

A corpse within 10 feet answers up to five questions with what it knew in life.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#speak%20with%20dead_xphb).

---

### Summon Undead

```yaml
id: v2_crypt_summon_undead
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A ghostly, putrid, or skeletal spirit fights for you for up to 1 hour.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#summon%20undead_xphb).

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
activation: action
```

A creature within 30 feet takes 8d8 necrotic damage on a failed Constitution save, or half on a success. Plants fail automatically.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#blight_xphb).

---

### Wall of Bones

```yaml
id: v2_crypt_wall_of_bones
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Dark Arts Player's Companion
activation: action
concentration: true
```

A wall of writhing bones made of three 10-foot panels deals 1d8 bludgeoning damage and restrains creatures that start their turn next to it on a failed Dexterity save.

Source reference: [Dark Arts Player's Companion on 5e.tools](https://5e.tools/spells.html#wall%20of%20bones_dapc).

---

### Graveburst

```yaml
id: v2_crypt_graveburst
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Fragments of the Forbidden Tome
activation: action
```

Up to three corpses explode in 15-foot spheres, dealing 6d8 necrotic and 2d8 piercing damage to creatures you choose on a failed Dexterity save, or half on a success.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#graveburst_fftforbiddentome).

---

### Danse Macabre

```yaml
id: v2_crypt_danse_macabre
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

Up to five Small or Medium corpses within 60 feet rise as your zombies or skeletons for up to 1 hour.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#danse%20macabre_xge).

---

### Negative Energy Flood

```yaml
id: v2_crypt_negative_energy_flood
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
activation: action
```

A creature within 60 feet takes 3d10 + 25 necrotic damage on a failed Constitution save, or half on a success. A Humanoid it kills rises as your zombie; an undead target gains temporary hit points instead.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#negative%20energy%20flood_au).

---

### Grave Ground

```yaml
id: v2_crypt_grave_ground
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
activation: action
concentration: true
```

Skeletal hands fill up to four 10-foot squares, which are difficult terrain for enemies; an enemy there takes 6d6 necrotic damage and subtracts 1d6 from its damage rolls on a failed Strength save.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#grave%20ground_au).

---

### Waves of Exhaustion

```yaml
id: v2_crypt_waves_of_exhaustion
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
activation: bonus action
concentration: true
```

For the duration, you can send a 60-foot cone of gray light that gives 1 Exhaustion level on a failed Constitution save, up to level 4. The levels fade when the spell ends.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#waves%20of%20exhaustion_au).

---

### Create Undead

```yaml
id: v2_crypt_create_undead
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

At night, up to three Small or Medium corpses rise as your ghouls for 24 hours; higher levels raise ghasts, wights, or mummies.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#create%20undead_xphb).

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
activation: action
```

Negative energy fills a 60-foot-radius sphere within 150 feet, dealing 8d8 necrotic damage on a failed Constitution save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#circle%20of%20death_xphb).

---

### Dirge

```yaml
id: v2_crypt_dirge
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Heroes of Faerûn)
activation: action
concentration: true
```

A 60-foot emanation stops creatures you don't exempt from regaining hit points and deals 3d10 necrotic damage and knocks them prone on a failed Constitution save, or half and halves their speed on a success.

Source reference: [D&D 5e (Heroes of Faerûn) on 5e.tools](https://5e.tools/spells.html#dirge_frhof).

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
activation: action
```

A creature within 60 feet takes 7d8 + 30 necrotic damage on a failed Constitution save, or half on a success. A Humanoid it kills rises as your zombie.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#finger%20of%20death_xphb).

---

### Withering Palm

```yaml
id: v2_crypt_withering_palm
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
```

A melee spell attack deals 10d6 necrotic damage and 2 Exhaustion levels on a failed Constitution save, or 1 on a success.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#withering%20palm_bb1000s).

---

### Inevitability of the Grave

```yaml
id: v2_crypt_inevitability_of_the_grave
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: bonus action
concentration: true
```

A cursed creature takes an extra 1d8 psychic damage from your attacks, and whenever it misses you it takes 1d8 psychic damage and is frightened of you on a failed Wisdom save.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#inevitability%20of%20the%20grave_bb1000s).

---

### Abi-Dalzim's Horrid Wilting

```yaml
id: v2_pestilence_abi_dalzims_horrid_wilting
tier: 8th
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

### Field of Bones

```yaml
id: v2_crypt_field_of_bones
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Heliana's Guide to Monster Hunting
activation: action
concentration: true
```

Bony claws and maws erupt in a 100-foot-radius circle of difficult terrain; a creature that enters or starts its turn there takes 6d6 slashing damage and is grappled on a failed Strength save.

Source reference: [Heliana's Guide to Monster Hunting on 5e.tools](https://5e.tools/spells.html#field%20of%20bones_helianasguidetomonsterhunting).

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
activation: action
```

Up to ten creatures within 60 feet with 50 hit points or fewer die. Stronger ones take 12d10 psychic damage and are deafened on a failed Constitution save, or half on a success.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#wail%20of%20the%20banshee_au).

---

### Plague of Undead

```yaml
id: v2_crypt_plague_of_undead
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
```

The skeletons and corpses within range rise permanently as your skeletons and zombies, up to 24 Medium creatures, with maximum hit points.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#plague%20of%20undead_bb1000s).
