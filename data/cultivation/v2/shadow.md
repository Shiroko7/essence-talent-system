# Shadow Cultivation Path

Tradition: Divine
Concept: Shar’s darkness, concealment, absence, and the Shadow Weave.

### Shadowflame Dream

```yaml
id: fire_master_essence_shadowflame_dream
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Shadow Sect
location: Sirius
```

As an action, you hurl a swirling torrent of flames laced with negative energy at one creature within 60 feet. The target must make a Charisma saving throw against your essence ability save DC:
- **On a failed save:** The creature takes 5d10 fire damage and 5d10 necrotic damage, and falls unconscious until the start of your next turn.
- **On a successful save:** The target takes only the fire damage and is not affected by the unconscious condition.

---

### Netherdark Fist II: Voidstride

```yaml
id: void_adept_netherdark_fist_ii
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
```

*Prerequisite: Netherdark Fist*

When you use Netherdark Fist, you can spend **2 essences** instead of 1:

- Your movement before the strike does not provoke opportunity attacks.
- The damage increases to **4d10 force damage**.
- On a failed save, the target's speed is reduced by 10 feet until the start of your next turn as shadowy tendrils latch onto them.

## Master Tier

---

### Netherdark Fist III: Gravitic Collapse

```yaml
id: void_master_netherdark_fist_iii
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
```

*Prerequisite: Netherdark Fist II*

When you use Netherdark Fist, you can spend **3 essences**:

- You can move up to your full speed without provoking opportunity attacks before the strike.
- The damage increases to **6d10 force damage**.
- On a failed save, the target is knocked prone and cannot take reactions until the start of your next turn.

## Grandmaster Tier

---

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

### Shadow Veil

```yaml
id: void_initiate_shadow_veil
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Shar's Shadow Disciple
location: Leatrux
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
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
```

**Action | Range:** Half your maximum speed

You can move up to half your maximum speed before making this strike. You channel the crushing emptiness of the void into a strike against a single creature within range. The target must make a Charisma saving throw against your essence ability save DC.

- **Failed Save:** The creature takes 2d10 force damage.
- **Successful Save:** The creature takes half damage.

## Adept Tier

---

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
location: Leatrux
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
location: Leatrux
```

**Casting Time:** 1 action
**Range:** 120 feet
**Components:** S
**Duration:** Concentration, up to 1 minute
**Portfolio:** Murder

You create a 4-inch beam of darkness that streaks toward a creature within range. Make a ranged spell attack. On a hit, the target takes **5d8 force damage** and must make a Constitution saving throw. On a failed save, the target is **silenced for the duration of the spell** and cannot speak or cast spells with verbal components. The target can repeat the saving throw at the end of each of its turns, ending the silence on a success.

---

### Netherdark Fist IV: Reality Rend

```yaml
id: void_grandmaster_netherdark_fist_iv
tier: grandmaster
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
```

*Prerequisite: Netherdark Fist III*

When you use Netherdark Fist, you can spend **4 essences**:

- The damage increases to **8d10 force damage**.
- On a failed save, the target cannot regain hit points until the end of your next turn and subtracts 1d4 from the next saving throw it makes within 1 minute.

## Greatgrandmaster Tier

---

### Netherdark Fist V: Absolute Oblivion

```yaml
id: void_greatgrandmaster_netherdark_fist_v
tier: greatgrandmaster
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Netherdark Emperor "Yuji" (Shadow Sect)
location: Leatrux
```

*Prerequisite: Netherdark Fist IV*

When you use Netherdark Fist, you can spend **5 essences** to unleash the full devastating potential of the void:

- The damage increases to **10d10 force damage**.
- On a failed save, the target gains 1 level of exhaustion as reality itself buckles around them and the void tears at their very essence.

## Cantrips

---

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

---

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

https://5e.tools/spells.html#shadow%20of%20moil_xge

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

https://5e.tools/spells.html#maddening%20darkness_xge

---

### Mirror Image

```yaml
id: v2_moon_mirror_image
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

Several illusory reflections surround you, confusing attacks aimed at your true form.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#mirror%20image_phb).

---

### Blur

```yaml
id: v2_moon_blur
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

Your outline shifts and shimmers, making your position difficult to read.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#blur_phb).

---

### Echoing Footsteps

```yaml
id: wind_adept_echoing_footsteps
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

You can move with such speed and silence that your footsteps echo faintly. You gain advantage on Stealth checks, and creatures within 100 feet of you have disadvantage on Wisdom (Perception) checks to hear you. This effect lasts for 10 minutes.

---

## Spells restored from V1

---

### Unseen Servant

```yaml
id: wood_1st_level_unseen_servant
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

An invisible, mindless force performs simple tasks at your command.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#unseen%20servant_xphb).

---

### Elminster's Elusion

```yaml
id: acid_2nd_level_elminsters_elusion
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Heroes of Faerûn)
```

Arcane wards give you advantage on saves against magic and let you shrug off damage entirely on a successful save.

Source reference: [D&D 5e (Heroes of Faerûn) on 5e.tools](https://5e.tools/spells.html#elminster's%20elusion_frhof).

---

### Swallow Magic

```yaml
id: poison_2nd_level_swallow_magic
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
```

When a spell fails to affect you, you swallow its leftover magic to heal, gain speed, or bolster a roll.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#swallow%20magic_obojimatallgrass).

---

### Phantom Steed

```yaml
id: wood_3rd_level_phantom_steed
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A quasi-real horse appears to carry you swiftly across the land.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#phantom%20steed_xphb).

---

### Creation

```yaml
id: wood_5th_level_creation
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

You pull shadow material from the Shadowfell to shape a temporary object of vegetable or mineral matter.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#creation_xphb).

---

### Sequester

```yaml
id: v2_shadow_sequester
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

An object or willing creature becomes invisible and hidden from all divination; a creature falls into suspended animation until a set condition ends it.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#sequester_xphb).

---

### Dark Star

```yaml
id: v2_shadow_dark_star
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (EGW)
```

A sphere of magical darkness and crushing gravity up to 40 feet across deafens those within, hinders movement, and deals force damage.

Source reference: [D&D 5e (EGW) on 5e.tools](https://5e.tools/spells.html#dark%20star_egw).

---

### Ravenous Void

```yaml
id: v2_shadow_ravenous_void
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (EGW)
```

A 20-foot sphere of destructive gravity drags creatures inward, restrains them, and deals heavy force damage; anything reduced to 0 hit points is annihilated.

Source reference: [D&D 5e (EGW) on 5e.tools](https://5e.tools/spells.html#ravenous%20void_egw).

---

### Vision of Elapsing Eons

```yaml
id: v2_shadow_vision_of_elapsing_eons
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
```

A creature believes it watches itself and its surroundings crumble through the eons, taking 10d12 psychic damage and becoming paralyzed on a failed save.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#vision%20of%20elapsing%20eons_au).

---

### Conjure Shadow Titan

```yaml
id: v2_shadow_conjure_shadow_titan
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Tales from the Shadows
```

You summon a titan of shadow that obeys your commands, hiding in darkness and hurling boulders of cold shadow-stuff.

Source reference: [Kobold Press Tales from the Shadows on 5e.tools](https://5e.tools/spells.html#conjure%20shadow%20titan_talesfromtheshadows).

---

### Dying of the Light

```yaml
id: v2_shadow_dying_of_the_light
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Tales from the Shadows
```

Withering darkness fills a 120-foot sphere, snuffing light and draining chosen creatures with necrotic damage and exhaustion.

Source reference: [Kobold Press Tales from the Shadows on 5e.tools](https://5e.tools/spells.html#dying%20of%20the%20light_talesfromtheshadows).

---

### Void Star

```yaml
id: v2_shadow_void_star
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D Beyond Drops
```

A fragment of a dark star deals 6d12 necrotic damage, then more a turn later, and you regain hit points equal to that second burst.

Source reference: [D&D Beyond Drops on 5e.tools](https://5e.tools/spells.html#void%20star_dndbeyonddrops).

---

### Creeping Darkness

```yaml
id: v2_shadow_creeping_darkness
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Tales from the Shadows
```

A crawling mass of shadows drags and restrains the living, dealing necrotic damage to those caught in its tendrils.

Source reference: [Kobold Press Tales from the Shadows on 5e.tools](https://5e.tools/spells.html#creeping%20darkness_talesfromtheshadows).

---

### Umbral Storm

```yaml
id: v2_shadow_umbral_storm
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Tales from the Shadows
```

A storm of raging shadow entropy deals necrotic damage and exhaustion to creatures within; you can move it each turn.

Source reference: [Kobold Press Tales from the Shadows on 5e.tools](https://5e.tools/spells.html#umbral%20storm_talesfromtheshadows).

---

### Shadow Form

```yaml
id: v2_shadow_shadow_form
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Elminster's Guide to Magic
```

You wrap a creature in Shadowfell essence: it gains advantage and doubled proficiency on Stealth checks and can squeeze through any gap wider than an inch.

Source reference: [Elminster's Guide to Magic on 5e.tools](https://5e.tools/spells.html#shadow%20form_elminsters%20guide%20to%20magic).

---

### Devouring Darkness

```yaml
id: v2_shadow_devouring_darkness
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kibbles' Compendium of Legends and Legacies
```

Dark tendrils burst from you, dealing 6d8 necrotic damage to chosen creatures within 20 feet and dragging them to your side; you regain hit points from the damage dealt.

Source reference: [Kibbles' Compendium of Legends and Legacies on 5e.tools](https://5e.tools/spells.html#devouring%20darkness_kt-cll).

---

### Grace of Shar

```yaml
id: v2_shadow_grace_of_shar
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grimlore's Grimoire
```

A creature you touch receives a sliver of Shar’s umbral omniscience, gaining blindsight out to 30 feet.

Source reference: [Grimlore's Grimoire on 5e.tools](https://5e.tools/spells.html#grace%20of%20shar_grimloresgrimoire).

---

### Investiture of Shadow

```yaml
id: v2_shadow_investiture_of_shadow
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Dark Arts Player's Companion
```

Shadows swirl around you: you turn invisible at the start of each turn, see through magical darkness to 120 feet, and can conjure spheres of magical darkness.

Source reference: [Dark Arts Player's Companion on 5e.tools](https://5e.tools/spells.html#investiture%20of%20shadow_dapc).
