# Mysteries Cultivation Path

Tradition: Immortal
Concept: Space, time, and the illusory made real; what cannot be put into words, made to obey anyway.

### Mouth of the Well

```yaml
id: mysteries_initiate_mouth_of_the_well
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
activation: bonus action
```

As a bonus action, you open the mouth of a well beneath a creature you can see within 30 feet. For a moment the ground becomes still, dark water that holds the creature's reflection, and space folds inward around it. The target must make a Dexterity saving throw against your essence ability save DC:
- **On a failed save:** Its speed becomes 0 until the end of its next turn, and it has disadvantage on the next saving throw it makes against one of your Mysteries abilities before the end of your next turn.
- **On a successful save:** Its speed is halved until the end of its next turn.

---

## Adept Tier

---

### Illusory and Real

```yaml
id: mysteries_adept_illusory_and_real
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
activation: reaction
```

As a reaction when an attack roll is made against you, you trade places with your own reflection. The attack targets the reflection instead and misses, and you teleport up to 15 feet to an unoccupied space you can see. For an instant, no one watching can tell which of the two was ever real.

---

## Master Tier

---

### Unshaken Conviction

```yaml
id: mysteries_master_unshaken_conviction
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
```

You believe in what you see so completely that what you see must agree with you.
- You have advantage on saving throws against being charmed or frightened, and against illusions.
- You always know whether a creature or object you can see is an illusion, a reflection, or displaced in space or time, though not what it truly is.
- Once per long rest, when you fail a saving throw, you can choose to succeed instead.

---

## Grandmaster Tier

---

### Fishing the Moon from the Well

```yaml
id: mysteries_grandmaster_fishing_the_moon_from_the_well
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Sirius
activation: action
```

A monkey sees the moon in a well and reaches for it, and every child knows the moon is not there. You reach anyway, and the moon comes up in your hand.

As an action, choose a creature you can see within 120 feet. The ground beneath it becomes the mouth of a bottomless well, and dark, still water holds its reflection: the moon in the well. A vast hand, neither illusory nor real, reaches down into the reflection. The target must make a Charisma saving throw against your essence ability save DC. A creature without a soul, such as most constructs, has no moon in the well and is unaffected.

**On a failed save,** you fish its soul out of the reflection. Choose one:
- **Pluck:** The target takes 8d10 psychic damage. If this reduces it to 0 hit points, it dies and you hold its soul as a pale, moon-like light for up to 24 hours. While you hold it, the creature can be restored to life only by *true resurrection* or *wish*, and you can ask the soul up to five questions as if you had cast *speak with dead*. You can hold one soul at a time, and you can release it whenever you choose.
- **Hold:** The soul hangs in your hand while its body stands empty. For up to 1 minute (concentration), the target is paralyzed. As a bonus action on each of your turns, you can move the body up to its speed and have it make one weapon attack against a creature you choose. The target repeats the saving throw at the end of each of its turns, ending the effect on a success.
- **Drown:** The target falls into the well and is trapped in its reflection: an empty, silent copy of the surroundings where no one else exists. For up to 1 minute (concentration), it can't be seen, targeted, or affected from the outside world. At the end of each of its turns, it repeats the saving throw, climbing out on a success. When the effect ends, it reappears in the space it left, or the nearest unoccupied space.

**On a successful save,** the hand closes on water: the target takes 4d10 psychic damage and nothing more.

**Beyond your realm:** A creature whose challenge rating or level is higher than your level has advantage on the saving throw.

---

## Cantrips

---

### Prestidigitation

```yaml
id: v2_mysteries_prestidigitation
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (PHB 2024)
activation: action
```

You make a minor magical trick within 10 feet: a sensory effect, a small flame, cleaning or soiling, a mark, or a trinket.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#prestidigitation_xphb).

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
activation: action
```

A spectral hand within 30 feet manipulates objects up to 10 pounds for 1 minute.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#mage%20hand_phb).

---

## Spells

---

### Gift of Alacrity

```yaml
id: v2_mysteries_gift_of_alacrity
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (EGW)
```

A willing creature you touch adds 1d8 to its initiative rolls for 8 hours.

Source reference: [D&D 5e (EGW) on 5e.tools](https://5e.tools/spells.html#gift%20of%20alacrity_egw).

---

### Rope Trick

```yaml
id: v2_mysteries_rope_trick
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A rope you touch rises to an invisible extradimensional space where up to eight Medium creatures can hide for 1 hour.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#rope%20trick_xphb).

---

### Fortune's Favor

```yaml
id: v2_mysteries_fortunes_favor
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (EGW)
```

A willing creature within 60 feet can, once within 1 hour, roll an extra d20 for an attack, check or save, or against an attack on it.

Source reference: [D&D 5e (EGW) on 5e.tools](https://5e.tools/spells.html#fortune's%20favor_egw).

---

### Wristpocket

```yaml
id: v2_mysteries_wristpocket
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (EGW)
activation: action
concentration: true
ritual: true
```

An object of up to 5 pounds in your hand vanishes into an extradimensional pocket, and you can summon it back or send it away again for up to 1 hour.

Source reference: [D&D 5e (EGW) on 5e.tools](https://5e.tools/spells.html#wristpocket_egw).

---

### Blink

```yaml
id: v2_mysteries_blink
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

For 1 minute, at the end of each of your turns you have a 50% chance to vanish into the Ethereal Plane until your next turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#blink_xphb).

---

### Haste

```yaml
id: wind_3rd_level_haste
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A willing creature within 30 feet has doubled speed, +2 AC, advantage on Dexterity saves and an extra action each turn for up to 1 minute. It's stunned for a turn when the spell ends.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#haste_xphb).

---

### Slow

```yaml
id: v2_mysteries_slow
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

Up to six creatures in a 40-foot cube within 120 feet that fail a Wisdom save have halved speed, -2 AC and Dexterity saves, and only an action or a bonus action each turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#slow_xphb).

---

### Dimension Door

```yaml
id: v2_mysteries_dimension_door
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

You teleport up to 500 feet to a spot you can see or describe, and can bring one willing creature with you.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#dimension%20door_xphb).

---

### Far Step

```yaml
id: v2_mysteries_far_step
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: bonus action
concentration: true
```

You teleport up to 60 feet, and can teleport again as a bonus action on each turn for up to 1 minute.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#far%20step_xge).

---

### Temporal Shunt

```yaml
id: v2_mysteries_temporal_shunt
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (EGW)
activation: reaction
```

As a reaction to a creature's attack or spell, it vanishes into the next round on a failed Wisdom save, wasting the attack or spell.

Source reference: [D&D 5e (EGW) on 5e.tools](https://5e.tools/spells.html#temporal%20shunt_egw).

---

### Teleportation Circle

```yaml
id: v2_mysteries_teleportation_circle
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

You draw a circle that opens a portal to a permanent teleportation circle you know, for one round.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#teleportation%20circle_xphb).

---

### Arcane Gate

```yaml
id: v2_mysteries_arcane_gate
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

Two linked portals open, one within 500 feet and one within 10 feet of you, for up to 10 minutes.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#arcane%20gate_xphb).

---

### Scatter

```yaml
id: v2_mysteries_scatter
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
```

You teleport up to five creatures within 30 feet to spaces within 120 feet. Unwilling ones make a Wisdom save.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#scatter_xge).

---

### Teleport

```yaml
id: lightning_7th_level_teleport
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

You and up to eight willing creatures, or one object, teleport to a destination on the same plane. Familiarity sets the chance of arriving on target.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#teleport_xphb).

---

### Reverse Gravity

```yaml
id: wind_7th_level_reverse_gravity
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

Gravity reverses in a 50-foot-radius cylinder within 100 feet for up to 1 minute, flinging unanchored creatures and objects upward.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#reverse%20gravity_xphb).

---

### Plane Shift

```yaml
id: v2_mysteries_plane_shift
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

You and up to eight willing creatures travel to another plane, or you banish a creature there on a failed melee spell attack and Charisma save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#plane%20shift_xphb).

---

### Mordenkainen's Magnificent Mansion

```yaml
id: v2_mysteries_mordenkainens_magnificent_mansion
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A door within 300 feet opens into an extradimensional mansion with servants and a feast for 24 hours.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#mordenkainen's%20magnificent%20mansion_xphb).

---

### Demiplane

```yaml
id: v2_mysteries_demiplane
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A door within 60 feet opens onto a 30-foot empty room on its own demiplane for 1 hour.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#demiplane_xphb).

---

### Reality Break

```yaml
id: v2_mysteries_reality_break
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (EGW)
activation: action
concentration: true
```

A creature within 60 feet that fails a Wisdom save can't take reactions and suffers a random effect each turn, from psychic damage to being thrown elsewhere, for up to 1 minute.

Source reference: [D&D 5e (EGW) on 5e.tools](https://5e.tools/spells.html#reality%20break_egw).

---

### Gate

```yaml
id: v2_mysteries_gate
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

A portal opens to a precise location on another plane for up to 1 minute. Speaking a creature's name pulls it through.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#gate_xphb).

---

### Time Stop

```yaml
id: water_9th_level_time_stop
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

Time stops for everyone else while you take 1d4 + 1 turns in a row. It ends if you affect another creature.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#time%20stop_xphb).

---

### Paradox

```yaml
id: v2_lunar_paradox
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Valda's Spire of Secrets: Player Pack 1
activation: action
```

You undo one action taken within 60 feet in the last round. Its direct effects are reversed and the creature that took it takes 10d8 force damage.

Source reference: [Valda's Spire of Secrets: Player Pack 1 on 5e.tools](https://5e.tools/spells.html#paradox_valdaplayerpack).

---

### Time Ravage

```yaml
id: v2_pestilence_time_ravage
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (EGW)
activation: action
```

A creature within 90 feet takes 10d12 necrotic damage on a failed Constitution save, or half on a success. On a failure it also ages to 30 days from death.

Source reference: [D&D 5e (EGW) on 5e.tools](https://5e.tools/spells.html#time%20ravage_egw).


