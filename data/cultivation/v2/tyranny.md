# Tyranny Cultivation Path

Tradition: Divine
Concept: Bane’s rule by fear and one iron will: commands, chains, dread, and the obedience of many.

### Black Hand

```yaml
id: tyranny_initiate_black_hand
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
location: Sirius
```

When you hit a creature that is frightened of you, it takes extra psychic damage equal to your proficiency bonus.

---

### Chains of the Black Lord

```yaml
id: tyranny_initiate_chains_of_the_black_lord
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
location: Sirius
domain: expansion
domainText: It is restrained instead of grappled.
activation: action
```

As an action, black iron chains burst from the ground under a creature you can see within 60 feet. It makes a Strength saving throw against your essence ability save DC. On a failure, it takes 2d8 bludgeoning damage and is grappled by the chains (escape DC equal to your essence ability save DC) for up to 1 minute. On a success, it takes half as much damage only.

---

## Adept Tier

### Dread Gaze

```yaml
id: tyranny_adept_dread_gaze
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
location: Sirius
domain: expansion
domainText: You can target one more creature.
activation: bonus action
```

As a bonus action, you fix a creature you can see within 30 feet with the Black Lord's gaze. It makes a Wisdom saving throw against your essence ability save DC. On a failure, it's frightened of you until the end of its next turn.

---

### Make an Example

```yaml
id: tyranny_adept_make_an_example
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
location: Sirius
domain: expansion
domainText: Enemies within 60 feet of you are affected instead.
activation: reaction
```

When you reduce a creature to 0 hit points, you can use your reaction to make an example of it. Each enemy within 30 feet of you that can see it makes a Wisdom saving throw against your essence ability save DC. On a failure, it is frightened of you until the end of its next turn.

---

### Tribute of Fear

```yaml
id: tyranny_adept_tribute_of_fear
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
location: Sirius
```

When a creature you can see becomes frightened of you, you gain temporary hit points equal to twice your proficiency bonus.

---

## Master Tier

### Iron Command

```yaml
id: tyranny_master_iron_command
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
location: Sirius
domain: expansion
domainText: Its damage dice are d10s.
activation: reaction
```

When a creature within 15 feet of you damages you, you can use your reaction to command it to kneel. It chooses: it falls prone, or it refuses and takes 2d6 psychic damage.

---

### Iron Legion

```yaml
id: tyranny_master_iron_legion
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
location: Sirius
activation: bonus action
```

As a bonus action, you bark an order to up to three allies who can hear you. Each of them can use its reaction to move up to half its speed and make one weapon attack.

---

## Grandmaster Tier

### Throne of Dread

```yaml
id: tyranny_grandmaster_throne_of_dread
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
location: Sirius
domain: bound
activation: bonus action
```

As a bonus action on your Consecrated Ground, you take up the Black Lord's throne for 1 minute.
- **Kneel:** When you take it, and at the start of each of your turns after that, each creature of your choice on your Consecrated Ground that can see you makes a Wisdom saving throw against your essence ability save DC. On a failure, it falls prone and is frightened of you until the start of your next turn.
- **None Rise Against Me:** A creature frightened of you takes 3d8 psychic damage whenever it makes an attack roll against you.

---

## Cantrips

### Eidolic Chains

```yaml
id: v2_tyranny_eidolic_chains
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Grimlore's Grimoire
activation: action
concentration: true
```

Spectral chains grapple a creature you can see unless it succeeds on a Strength (Athletics) or Dexterity (Acrobatics) check against your spell save DC.

Source reference: [Grimlore's Grimoire on 5e.tools](https://5e.tools/spells.html#eidolic%20chains_grimloresgrimoire).

---

### Icon of Fear

```yaml
id: v2_tyranny_icon_of_fear
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Blackstaff's Book of 1000 Spells
activation: action
```

A weapon attack that hits pushes the target 5 feet, and an ally next to you can move 10 feet to take its place in the target's fear.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#icon%20of%20fear_bb1000s).

---

## Spells

### Command

```yaml
id: v2_tyranny_command
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A creature within 60 feet obeys a one-word command (approach, drop, flee, grovel, or halt) on its next turn on a failed Wisdom save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#command_xphb).

---

### Cause Fear

```yaml
id: v2_tyranny_cause_fear
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

A creature within 60 feet is frightened of you for up to 1 minute on a failed Wisdom save.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#cause%20fear_xge).

---

### Wrathful Smite

```yaml
id: v2_tyranny_wrathful_smite
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: bonus action
```

When you hit, the target takes an extra 1d6 necrotic damage and is frightened of you for 1 minute on a failed Wisdom save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#wrathful%20smite_xphb).

---

### Compelled Duel

```yaml
id: v2_tyranny_compelled_duel
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: bonus action
concentration: true
```

On a failed Wisdom save, a creature within 30 feet has disadvantage on attacks against anyone but you and can't willingly move more than 30 feet from you.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#compelled%20duel_xphb).

---

### Hold Person

```yaml
id: v2_tyranny_hold_person
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A Humanoid within 60 feet is paralyzed on a failed Wisdom save, repeating the save at the end of each of its turns.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#hold%20person_xphb).

---

### Crown of Madness

```yaml
id: v2_tyranny_crown_of_madness
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

On a failed Wisdom save, a Humanoid within 120 feet is charmed and attacks a creature you choose on each of its turns.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#crown%20of%20madness_xphb).

---

### Infernal Shackles

```yaml
id: v2_tyranny_infernal_shackles
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
concentration: true
```

Chains of burning black iron deal 3d6 fire damage and hold a creature's speed at 0 on a failed Strength save.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#infernal%20shackles_belzormm).

---

### Power Word Kneel

```yaml
id: v2_tyranny_power_word_kneel
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

Creatures within 20 feet of a point, up to 55 hit points' worth starting with the weakest, kneel facing you and count as prone until they succeed on a Wisdom save.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#power%20word%20kneel_kpdm).

---

### Fear

```yaml
id: v2_tyranny_fear
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

Creatures in a 30-foot cone drop what they hold and flee, frightened, on a failed Wisdom save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#fear_xphb).

---

### Enemies Abound

```yaml
id: v2_tyranny_enemies_abound
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

On a failed Intelligence save, a creature can't tell friend from foe and picks its targets at random.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#enemies%20abound_xge).

---

### Chains of Perdition

```yaml
id: v2_tyranny_chains_of_perdition
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
concentration: true
```

Iron chains restrain a creature on a failed Dexterity save and deal 2d8 bludgeoning and 2d8 psychic damage each round it stays bound.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#chains%20of%20perdition_kpdm).

---

### Phantasmal Killer

```yaml
id: v2_tyranny_phantasmal_killer
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A creature's worst fear deals 4d10 psychic damage on a failed Wisdom save and gives it disadvantage on checks and attacks, repeating each turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#phantasmal%20killer_xphb).

---

### Commandment

```yaml
id: v2_tyranny_commandment
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
concentration: true
```

You give a creature that can understand you an order; each time it knowingly breaks it, it takes 4d6 radiant damage.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#commandment_belzormm).

---

### Hold Monster

```yaml
id: v2_tyranny_hold_monster
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A creature within 90 feet is paralyzed on a failed Wisdom save, repeating the save at the end of each of its turns.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#hold%20monster_xphb).

---

### Planar Binding

```yaml
id: v2_tyranny_planar_binding
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A celestial, elemental, fey, or fiend serves you for 24 hours on a failed Charisma save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#planar%20binding_xphb).

---

### Power Word: Obey

```yaml
id: v2_tyranny_power_word_obey
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Fragments of the Forbidden Tome
activation: bonus action
```

On a failed Wisdom save, a creature you can see must obey your commands for the duration, even without understanding your language.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#power%20word%3a%20obey_fftforbiddentome).

---

### Dark Lord's Mantle

```yaml
id: v2_tyranny_dark_lords_mantle
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
concentration: true
```

Fiendish majesty lends nearby allies a d4 to attacks and saves and frightens enemies that start their turn near you.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#dark%20lord's%20mantle_kpdm).

---

### Bound into Obedience

```yaml
id: v2_tyranny_bound_into_obedience
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grimlore's Grimoire
activation: action
```

Ethereal chains bind an unconscious creature; when it wakes, it is charmed and obeys your commands on a failed Wisdom save made with disadvantage.

Source reference: [Grimlore's Grimoire on 5e.tools](https://5e.tools/spells.html#bound%20into%20obedience_grimloresgrimoire).

---

### Aura of Terror

```yaml
id: v2_tyranny_aura_of_terror
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
concentration: true
```

Creatures that enter or start their turn in a 30-foot aura around you are frightened on a failed Wisdom save.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#aura%20of%20terror_bb1000s).

---

### The Doom of Bane

```yaml
id: v2_tyranny_the_doom_of_bane
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
```

The corpse of an evil humanoid rises in plate armor as a helmed horror that serves you.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#the%20doom%20of%20bane_bb1000s).

---

### Sovereign Edict

```yaml
id: v2_tyranny_sovereign_edict
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Fragments of the Forbidden Tome
activation: action
concentration: true
```

A 30-foot aura carries one edict, such as No Passage; creatures you subject to it must succeed on a Charisma save each time they try to break it.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#sovereign%20edict_fftforbiddentome).

---

### Crown of Glory

```yaml
id: v2_tyranny_crown_of_glory
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
concentration: true
```

Your god's majesty makes allies within 10 feet immune to fear and gives them advantage on attacks, checks, and saves.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#crown%20of%20glory_bb1000s).

---

### Weird

```yaml
id: v2_tyranny_weird
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

Creatures you choose in a 30-foot sphere are frightened and take 10d10 psychic damage on a failed Wisdom save, repeating each turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#weird_xphb).
