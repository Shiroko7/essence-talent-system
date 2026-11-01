# Undertow Cultivation Path

Tradition: Divine
Concept: Yhal'etsu's lightless deep: ink, crushing pressure, tentacles, drowning, and whatever is dragged below.

### Ink Sac

```yaml
id: undertow_initiate_ink_sac
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
activation: bonus action
```

As a bonus action, you expel ink in a 10-foot radius around you. Underwater it billows into a cloud, and the area is heavily obscured until the end of your next turn. Out of water it only splashes and smears, and the area is lightly obscured until then instead. Each other creature in the area makes a Constitution saving throw against your essence ability save DC; on a failure, it is blinded until the end of its next turn. You can see through your own ink.

---

### Siphon Jet

```yaml
id: undertow_initiate_siphon_jet
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
domain: expansion
domainText: It works out of water too.
```

While you're underwater, you can take the Dash action as a bonus action.

---

### Pressure Sense

```yaml
id: undertow_initiate_pressure_sense
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
domain: expansion
domainText: Both ranges double.
```

You feel moving things by the pressure they push ahead of them. You have blindsight out to 10 feet, or 30 feet while you're in water or ink.

---

### Grasping Tentacle

```yaml
id: undertow_initiate_grasping_tentacle
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
domain: expansion
domainText: Its damage dice are d12s.
activation: action
```

As an action, a tentacle rises from water, ink or the ground at a point you can see within 30 feet and seizes a creature within 5 feet of it. The creature makes a Strength or Dexterity saving throw (its choice) against your essence ability save DC. On a failure, it takes 3d8 bludgeoning damage and is grappled, with an escape DC equal to your essence ability save DC. On a success, it takes half as much damage only. The tentacle sinks away when the grapple ends or after 1 minute, and you can have only one at a time.

---

## Adept Tier

### Ink Jet

```yaml
id: undertow_adept_ink_jet
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
domain: expansion
domainText: You move up to your full speed instead.
activation: reaction
```

When a creature within 10 feet of you hits you with an attack roll, you can use your reaction to squirt ink in its face. It makes a Dexterity saving throw against your essence ability save DC; on a failure, it is blinded until the end of its next turn. You then move up to half your speed, and this movement doesn't provoke an opportunity attack from it. Underwater, the space you left fills with a 5-foot-radius cloud of ink, heavily obscured until the end of your next turn.

---

### Drag Below

```yaml
id: undertow_adept_drag_below
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
activation: action
```

As an action, choose a creature within 15 feet that you or your Grasping Tentacle have grappled, or that is restrained. It makes a Strength saving throw against your essence ability save DC. On a failure, it takes 4d10 bludgeoning damage, is pulled up to 20 feet (straight down if it's in water), and can't breathe until the start of your next turn. On a success, it takes half as much damage only.

---

### Angler's Lure

```yaml
id: undertow_adept_anglers_lure
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
domain: expansion
domainText: Creatures that can't be charmed are affected too.
activation: action
```

As an action, you hang a mote of pale, bioluminescent light at a point within 60 feet for 1 minute. A creature that starts its turn within 30 feet of it and can see it makes a Wisdom saving throw against your essence ability save DC. On a failure, it spends its movement drifting toward the light by the safest route. Creatures that can't be charmed are unaffected.

---

## Master Tier

### Kraken's Grasp

```yaml
id: undertow_master_krakens_grasp
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
activation: action
```

As an action, tentacles burst from water, ink or shadow in a 20-foot-radius, 30-foot-high cylinder centered on a point within 120 feet. Each creature you choose there makes a Strength saving throw against your essence ability save DC. On a failure, it takes 6d10 bludgeoning damage, is restrained (escape DC equal to your essence ability save DC), and is pulled 15 feet toward the center, or downward if it's in water. On a success, it takes half as much damage only.

---

### Drowning Grip

```yaml
id: undertow_master_drowning_grip
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
```

When you grapple a creature, and at the start of each of your turns while you keep it grappled, it makes a Constitution saving throw against your essence ability save DC. On a failure, tentacle and seawater fill its mouth: it can't speak or breathe until the start of your next turn.

---

## Grandmaster Tier

### Hadal Domain

```yaml
id: undertow_grandmaster_hadal_domain
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yhal'etsu
location: Sirius / Forbidden Sea
domain: bound
activation: bonus action
```

Named for the hadal zone, the trenches below 6,000 meters. As a bonus action on your Consecrated Ground, you wake the deep for 1 minute.
- **Weight of the Deep:** When you wake it, and at initiative count 20 each round after, any number of creatures you can see there take 3d8 bludgeoning damage from the pressure. No attack roll or saving throw avoids it, and you choose who is spared.
- **Below the Light:** Your ink there is heavily obscuring even out of water, and up to three of your clouds last until a strong wind clears them.

---

## Cantrips

### Ink Splash

```yaml
id: v2_undertow_ink_splash
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Kobold Press Expanding Codex
activation: action
```

A ranged spell attack within 30 feet deals 1d6 poison damage and blinds the target until the end of its next turn on a failed Dexterity save.

Source reference: [Kobold Press Expanding Codex on 5e.tools](https://5e.tools/spells.html#ink%20splash_expccodex).

---

### Water Whip

```yaml
id: v2_undertow_water_whip
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Heliana's Guide to Monster Hunting
activation: action
```

A whip of water from a source within 60 feet makes a melee spell attack for 1d6 slashing damage and pulls the target 10 feet toward the water on a failed Strength save.

Source reference: [Heliana's Guide to Monster Hunting on 5e.tools](https://5e.tools/spells.html#water%20whip_helianasguidetomonsterhunting).

---

## Spells

### Figgly's Exploding Squid

```yaml
id: v2_undertow_figglys_exploding_squid
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: All Beneath the Yonder Seas and Streams
activation: action
```

A ranged spell attack within 60 feet bursts a squid on the target for 1d12 piercing damage, blinding it until the end of your next turn.

Source reference: [All Beneath the Yonder Seas and Streams on 5e.tools](https://5e.tools/spells.html#figgly's%20exploding%20squid_abyss).

---

### Create Mist of R'lyeh

```yaml
id: v2_undertow_create_mist_of_rlyeh
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cthulhu by Torchlight
activation: action
concentration: true
```

A 20-foot-radius sphere of dreadful mist within 120 feet lightly obscures the area and deals 1d4 psychic damage to creatures that end their turn in it.

Source reference: [Cthulhu by Torchlight on 5e.tools](https://5e.tools/spells.html#create%20mist%20of%20r'lyeh_cthulhutorchlight).

---

### Breath of the Deep

```yaml
id: v2_undertow_breath_of_the_deep
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cthulhu by Torchlight
activation: action
concentration: true
```

Trench water crushes a creature within 120 feet for 3d6 bludgeoning damage and stops it speaking or casting verbal spells.

Source reference: [Cthulhu by Torchlight on 5e.tools](https://5e.tools/spells.html#breath%20of%20the%20deep_cthulhutorchlight).

---

### Vomit Tentacles

```yaml
id: v2_undertow_vomit_tentacles
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

Tentacles from your mouth make a melee spell attack within 15 feet for 2d6 + your Strength modifier bludgeoning damage, grappling and restraining the target and crushing it each turn.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#vomit%20tentacles_kpdm).

---

### Watery Grave

```yaml
id: v2_undertow_watery_grave
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Yorviing's Arcane Grimoire
activation: action
concentration: true
```

A 10-foot-radius whirlpool within 120 feet deals 1d6 bludgeoning and 1d6 cold damage to creatures starting their turn in it, grappling them on a failed Dexterity save.

Source reference: [Yorviing's Arcane Grimoire on 5e.tools](https://5e.tools/spells.html#watery%20grave_yag).

---

### Sink

```yaml
id: v2_undertow_sink
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
concentration: true
```

A creature within 120 feet that fails a Constitution save loses its buoyancy, sinking 20 feet each round it ends in liquid, and its swim speed is halved.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#sink_belzormm).

---

### Sleep of the Deep

```yaml
id: v2_undertow_sleep_of_the_deep
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic 17 Mythos Magic
activation: action
ritual: true
```

A sleeping creature within 60 feet that fails a Wisdom save gains no benefit from its rest, wakes with one level of exhaustion, and suffers short-term madness.

Source reference: [Kobold Press Deep Magic 17 Mythos Magic on 5e.tools](https://5e.tools/spells.html#sleep%20of%20the%20deep_dm17).

---

### Evard's Black Tentacles

```yaml
id: v2_undertow_evards_black_tentacles
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

Tentacles fill a 20-foot square within 90 feet as difficult terrain. Creatures there take 3d6 bludgeoning damage and are restrained on a failed Strength save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#evard's%20black%20tentacles_xphb).

---

### Doomtide

```yaml
id: v2_undertow_doomtide
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Heroes of Faerûn)
activation: action
concentration: true
```

A 20-foot-radius sphere of magical darkness within 120 feet drifts each turn. Creatures in it take 5d6 psychic damage and subtract 1d6 from saves on a failed Wisdom save.

Source reference: [D&D 5e (Heroes of Faerûn) on 5e.tools](https://5e.tools/spells.html#doomtide_frhof).

---

### Crushing Depths

```yaml
id: v2_undertow_crushing_depths
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: All Beneath the Yonder Seas and Streams
activation: action
concentration: true
```

Deep-sea pressure fills a 20-foot cube within 30 feet. Creatures there are blinded and restrained on a failed Strength save and take 1d6 bludgeoning damage each turn.

Source reference: [All Beneath the Yonder Seas and Streams on 5e.tools](https://5e.tools/spells.html#crushing%20depths_abyss).

---

### Drown

```yaml
id: v2_undertow_drown
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: All Beneath the Yonder Seas and Streams
activation: action
concentration: true
```

Roll 12d8: a creature within 60 feet with that many hit points or fewer can't breathe or speak and begins suffocating until it succeeds on a Constitution save.

Source reference: [All Beneath the Yonder Seas and Streams on 5e.tools](https://5e.tools/spells.html#drown_abyss).

---

### Tentacle Lash

```yaml
id: v2_undertow_tentacle_lash
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Heliana's Guide to Monster Hunting
activation: action
concentration: true
```

Your arm becomes a 30-foot tentacle. Each turn, a melee spell attack deals 5d8 bludgeoning damage and can knock prone, shove or disarm the target on a failed Strength save.

Source reference: [Heliana's Guide to Monster Hunting on 5e.tools](https://5e.tools/spells.html#tentacle%20lash_helianasguidetomonsterhunting).

---

### Enervation

```yaml
id: v2_undertow_enervation
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

A tendril of darkness drains a creature within 60 feet for 4d8 necrotic damage each turn on a failed Dexterity save, and you regain half the damage dealt.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#enervation_xge).

---

### Portal to the Depths

```yaml
id: v2_undertow_portal_to_the_depths
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: All Beneath the Yonder Seas and Streams
activation: action
concentration: true
```

A 20-foot-radius portal within 30 feet opens onto the deep ocean. Creatures that fall in take 4d6 cold damage, sink 50 feet and are stunned on a failed Constitution save.

Source reference: [All Beneath the Yonder Seas and Streams on 5e.tools](https://5e.tools/spells.html#portal%20to%20the%20depths_abyss).

---

### Eyebite

```yaml
id: v2_undertow_eyebite
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

For up to 1 minute, each turn one creature within 60 feet falls asleep, panics or sickens on a failed Wisdom save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#eyebite_xphb).

---

### Pressure Sphere

```yaml
id: v2_undertow_pressure_sphere
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
concentration: true
```

Crushing water surrounds a creature's head within 120 feet for 6d10 bludgeoning damage, again as a bonus action each turn. It holds its breath until a Dexterity save frees it.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#pressure%20sphere_belzormm).

---

### Summon Leviathan Avatar

```yaml
id: v2_undertow_summon_leviathan_avatar
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Northlands Worldbook
activation: action
concentration: true
```

A leviathan spirit appears in water within 120 feet and fights for you, acting right after your turn.

Source reference: [Kobold Press Northlands Worldbook on 5e.tools](https://5e.tools/spells.html#summon%20leviathan%20avatar_northlandsworldbook).

---

### Undertow

```yaml
id: v2_undertow_undertow
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Compendium of Forgotten Secrets Awakening
activation: action
concentration: true
```

A watery abyss opens under a creature within 120 feet. On a failed Dexterity save it's dragged 60 feet down to drown, gaining exhaustion each turn until it reaches the surface.

Source reference: [The Compendium of Forgotten Secrets Awakening on 5e.tools](https://5e.tools/spells.html#undertow_cofsa).

---

### Leviathan's Maw

```yaml
id: v2_undertow_leviathans_maw
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: All Beneath the Yonder Seas and Streams
activation: action
concentration: true
```

Leviathan jaws erupt in a 20-foot-radius cylinder within 90 feet for 12d6 force damage and banish creatures that fail a Dexterity save, or half damage on a success.

Source reference: [All Beneath the Yonder Seas and Streams on 5e.tools](https://5e.tools/spells.html#leviathan's%20maw_abyss).

---

### Echoes of the Deep

```yaml
id: v2_undertow_echoes_of_the_deep
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: All Beneath the Yonder Seas and Streams
activation: action
concentration: true
```

Up to ten creatures within 60 feet believe they've been dragged into the deepest trench: blinded, deafened, suffocating and taking 6d6 psychic damage each turn until they see through it.

Source reference: [All Beneath the Yonder Seas and Streams on 5e.tools](https://5e.tools/spells.html#echoes%20of%20the%20deep_abyss).


