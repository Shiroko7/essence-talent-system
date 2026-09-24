# Void Cultivation Path

Tradition: Divine / Godhood
Concept: Darkness, erasure, concealment, and the suppression or subversion of magic.

## Initiate Tier

### Shadow Veil

```yaml
id: void_initiate_shadow_veil
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Shar's Shadow Disciple
```

You wrap yourself in the silence and obscurity of the Void. You gain darkvision out to 60 feet (or increase existing darkvision by 30 feet). While you are in dim light or darkness, you have advantage on Dexterity (Stealth) checks and can take the Hide action as a bonus action.

---

### Netherdark Fist

```yaml
id: void_initiate_netherdark_fist
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yuji
location: Leatrux
```

**Action | Range:** Half your maximum speed

You can move up to half your maximum speed before making this strike. You channel the crushing emptiness of the void into a strike against a single creature within range. The target must make a Charisma saving throw against your essence ability save DC.

- **Failed Save:** The creature takes 2d10 force damage.
- **Successful Save:** The creature takes half damage.

## Adept Tier

### Umbral Form

```yaml
id: wind_adept_umbral_form
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Kwon Jae-Hwan
location: Sirius
```

As a bonus action, you flatten and dissolve your physical form into a living shadow for up to 10 minutes. You can dismiss this effect at any time at will (no action required). The effect ends immediately if you make an attack roll or cast a spell.

While in this form, you gain the following benefits:
- **Shadow Invisibility:** While you are in dim light, darkness, or within the shadow cast by an object or creature of your size or larger, you are invisible. If you step into bright light (outside of a shadow), you are exposed and visible until you enter shadow again.
- **Shadow Leap:** While in a shadow, you can use a bonus action to teleport up to 30 feet to an unoccupied space you can see that is also in dim light, darkness, or within the shadow of an object or creature of your size or larger. This teleport allows you to cross illuminated areas without being exposed.
- **Fluid Silhouette:** You can move through spaces as narrow as 1 inch wide without squeezing, and you can move through the spaces of other creatures.

---

### Armor of Darkness

```yaml
id: void_adept_armor_of_darkness
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Portfolio (Darkness / Shar)
```

**Casting Time:** 1 action
**Range:** Self 
**Components:** V, S, M (a shard of polished obsidian) 
**Duration:** 1 hour
**Portfolio:**  Darkness

You summon a suit of armor woven from solidified shadow that wreathes your form. This armor provides a shadowy veil that grants you a **+2 bonus to your Armor Class** and resistance to **necrotic and radiant damage**.

While you are in dim light or darkness, you gain partial concealment from the shadows. Attack rolls against you have disadvantage, and you have advantage on Dexterity (Stealth) checks.

Additionally, the first time you hit a creature with an attack while you are in dim light or darkness, the target takes an extra **2d6 necrotic damage**.

---

### Darkbolt

```yaml
id: void_adept_darkbolt
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Portfolio (Darkness / Shar)
```

**Casting Time:** 1 action
**Range:** 120 feet
**Components:** S
**Duration:** Concentration, up to 1 minute
**Portfolio:** Murder

You create a 4-inch beam of darkness that streaks toward a creature within range. Make a ranged spell attack. On a hit, the target takes **5d8 force damage** and must make a Constitution saving throw. On a failed save, the target is **silenced for the duration of the spell** and cannot speak or cast spells with verbal components. The target can repeat the saving throw at the end of each of its turns, ending the silence on a success.

---

### Netherdark Fist II: Voidstride

```yaml
id: void_adept_netherdark_fist_ii
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Yuji
location: Leatrux
```

*Prerequisite: Netherdark Fist*

When you use Netherdark Fist, you can spend **2 essences** instead of 1:

- Your movement before the strike does not provoke opportunity attacks.
- The damage increases to **4d10 force damage**.
- On a failed save, the target's speed is reduced by 10 feet until the start of your next turn as shadowy tendrils latch onto them.

## Master Tier

### Netherdark Fist III: Gravitic Collapse

```yaml
id: void_master_netherdark_fist_iii
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Yuji
location: Leatrux
```

*Prerequisite: Netherdark Fist II*

When you use Netherdark Fist, you can spend **3 essences**:

- You can move up to your full speed without provoking opportunity attacks before the strike.
- The damage increases to **6d10 force damage**.
- On a failed save, the target is knocked prone and cannot take reactions until the start of your next turn.

## Grandmaster Tier

### Ethereal Phase Barrier

```yaml
id: acid_grandmaster_ethereal_phase_barrier
tier: grandmaster
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Malzareth (Dryad Cyric Cultist)
location: Sirius
```

When you cast wall of force, the wall manifests on the Ethereal Plane rather than the Material Plane, appearing as a shimmering, translucent membrane of acidic essence. The spell no longer requires concentration.

The wall cannot be destroyed or dispelled by any attack, spell, or magical effect unless that effect originates from the Ethereal Plane or is capable of transcending planar boundaries.

**Essence Refinement.** When you cast wall of force with this feature, you may imbue it with additional essences. For each essence spent, choose one of the following benefits:

- Extend the wall's duration by 1 hour.
- Increase the wall's size by an additional 10-foot radius (or equivalent panel area).

---

### Netherdark Fist IV: Reality Rend

```yaml
id: void_grandmaster_netherdark_fist_iv
tier: grandmaster
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Yuji
location: Leatrux
```

*Prerequisite: Netherdark Fist III*

When you use Netherdark Fist, you can spend **4 essences**:

- The damage increases to **8d10 force damage**.
- On a failed save, the target cannot regain hit points until the end of your next turn and subtracts 1d4 from the next saving throw it makes within 1 minute.

## Greatgrandmaster Tier

### Netherdark Fist V: Absolute Oblivion

```yaml
id: void_greatgrandmaster_netherdark_fist_v
tier: greatgrandmaster
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Yuji
location: Leatrux
```

*Prerequisite: Netherdark Fist IV*

When you use Netherdark Fist, you can spend **5 essences** to unleash the full devastating potential of the void:

- The damage increases to **10d10 force damage**.
- On a failed save, the target gains 1 level of exhaustion as reality itself buckles around them and the void tears at their very essence.

## Cantrips

### Minor Illusion

```yaml
id: void_cantrip_minor_illusion
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric (Trickery) / Illusion
```

You create a sound or an image of an object within range that lasts for the duration to deceive observers.

https://5e.tools/spells.html#minor%20illusion_xphb

## Spells

### Blindness/Deafness

```yaml
id: void_2nd_blindness_deafness
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Necromancy
```

You can blind or deafen a foe. Choose one creature that you can see within range to make a Constitution saving throw or be blinded or deafened for the duration.

https://5e.tools/spells.html#blindness%2Fdeafness_xphb

---

### Antimagic Field

```yaml
id: void_8th_antimagic_field
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Abjuration (Severance)
```

A 10-foot-radius invisible sphere of antimagic surrounds you. Spells cannot be cast and magical effects are utterly suppressed.

https://5e.tools/spells.html#antimagic%20field_xphb

---

### Pass without Trace

```yaml
id: void_2nd_pass_without_trace
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Trickery Domain) / Abjuration
```

A veil of shadows and silence radiates from you, giving each chosen creature within 30 feet a +10 bonus to Dexterity (Stealth) checks.

https://5e.tools/spells.html#pass%20without%20trace_xphb

---

### Darkness

```yaml
id: void_2nd_darkness
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Trickery Domain) / Evocation
```

Magical darkness fills a 15-foot-radius sphere. Creatures with normal darkvision cannot see through it, and nonmagical light cannot illuminate it.

https://5e.tools/spells.html#darkness_xphb

---

### Silence

```yaml
id: void_2nd_silence
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Illusion
```

No sound can be created within or pass through a 20-foot-radius sphere. Casting a spell with a verbal component is impossible there.

https://5e.tools/spells.html#silence_xphb

---

### Hunger of Hadar

```yaml
id: void_3rd_hunger_of_hadar
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Void / Conjuration
```

You open a gateway to the dark between the stars. A 20-foot-radius sphere of blackness and bitter cold appears, dealing cold and acid damage.

https://5e.tools/spells.html#hunger%20of%20hadar_xphb

---

### Nondetection

```yaml
id: void_3rd_nondetection
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Trickery Domain) / Abjuration
```

For the duration, you hide a target from divination magic and scrying sensors.

https://5e.tools/spells.html#nondetection_xphb

---

### Greater Invisibility

```yaml
id: void_4th_greater_invisibility
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Twilight/Trickery) / Illusion
```

You or a creature you touch becomes invisible for 1 minute, even when attacking or casting spells.

https://5e.tools/spells.html#greater%20invisibility_xphb

---

### Shadow of Moil

```yaml
id: void_4th_shadow_of_moil
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Shadow Weave / Necromancy
```

Flame-like shadows wreathe your body, heavily obscuring you and dealing 2d8 necrotic damage to any creature within 10 feet that hits you.

https://5e.tools/spells.html#shadow%20of%20moil_xphb

---

### Etherealness

```yaml
id: void_7th_etherealness
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Transmutation
```

You step into the border regions of the Ethereal Plane, moving through objects and creatures on the Material Plane as a ghost.

https://5e.tools/spells.html#etherealness_xphb

---

### Maddening Darkness

```yaml
id: void_8th_maddening_darkness
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Shadow Weave / Evocation
```

Darkness and screaming horrors fill a 60-foot-radius sphere. Creatures in the area take 8d8 psychic damage on a failed Wisdom save.

https://5e.tools/spells.html#maddening%20darkness_xphb
