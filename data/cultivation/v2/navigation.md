# Navigation Cultivation Path

Tradition: Divine
Concept: Reading Selûne's stars: constellations, charts, sea roads and land roads, and always finding the way home.

### True Bearing

```yaml
id: navigation_initiate_true_bearing
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
```

You always know which way is north, and you can't become lost except by magic. You also know the direction to any place you've been in the last 7 days.

---

### Wanderer's Road

```yaml
id: navigation_initiate_wanderers_road
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: expansion
domainText: Difficult terrain doesn't slow you in combat either.
```

While you travel overland or by sea, difficult terrain doesn't slow you or the creatures traveling with you, and a ship or vehicle you steer travels 1 mile per hour faster.

---

### Storm Navigator

```yaml
id: lightning_initiate_storm_navigator
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
domain: expansion
domainText: The advantage applies in any weather.
```

Your understanding of storms helps you predict their patterns and avoid hazards. You gain proficiency in Navigator’s Tools and have advantage on Wisdom (Survival) checks made to navigate or map out sea routes in stormy weather.

---

### Zenith Mark

```yaml
id: navigation_initiate_zenith_mark
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: expansion
domainText: You can target one more creature.
activation: action
```

As an action, you set a tiny star circling a creature you can see within 60 feet. It makes a Constitution saving throw against your essence ability save DC. On a failure, it sheds dim light in a 5-foot radius and can't benefit from the Invisible condition until the end of its next turn. The star then rises into the sky and marks the creature for 24 hours: while you're on the same plane, you know the direction and distance to it. Using this again ends any earlier mark.

---

## Adept Tier

### Meteor Trail

```yaml
id: navigation_adept_meteor_trail
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: expansion
domainText: If the attack misses, the target still takes half damage.
activation: attack
oncePerTurn: true
```

When you take the Attack action, you can replace one attack with a shooting star: make a ranged spell attack against a creature within 120 feet, ignoring half and three-quarters cover. On a hit, it takes 4d6 radiant damage, and the star's trail hangs in the air until the start of your next turn. While it does, attack rolls against the target ignore half and three-quarters cover, and the target can't benefit from the Invisible condition.

---

### Safest Course

```yaml
id: navigation_adept_safest_course
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
activation: bonus action
```

As a bonus action, you read the safest course and move up to your speed. This movement doesn't provoke opportunity attacks, and difficult terrain doesn't slow it. If your route would enter a trap or hazard you don't know about, the DM tells you before you reach it, and you can choose another route.

---

### Hold the Course

```yaml
id: navigation_adept_hold_the_course
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
```

You can't become lost, even by magic. You have advantage on saving throws against being pushed, pulled, teleported, or forced to move in a direction you didn't choose.

---

## Master Tier

### Asterism

```yaml
id: navigation_master_asterism
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: expansion
domainText: You choose which creatures the lines ignore.
activation: action
concentration: true
```

As an action, you trace a constellation: five 30-foot lines of burning starlight, each starting at you or at the end of an earlier line, all within 150 feet of you. They last for up to 1 minute and don't harm you. A creature that starts its turn on a line or crosses one on its turn makes a Dexterity saving throw against your essence ability save DC, taking 5d8 radiant damage on a failure or half as much on a success. A creature makes this save only once per turn, however many lines it touches.

---

### Star Road

```yaml
id: navigation_master_star_road
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
activation: action
```

As an action, you lay a 10-foot-wide road of starlight from a point within 30 feet, running up to 120 feet in a straight line, level or sloping up to 45 degrees. It lasts 10 minutes. You and your allies can walk on it, and it bears any weight, so a ship can sail it and a wagon can roll along it. Other creatures and objects pass through it.

---

## Grandmaster Tier

### Tears of Selûne

```yaml
id: navigation_grandmaster_tears_of_selune
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
domain: bound
activation: bonus action
```

Named for the trail of glittering shards that follows Selûne's moon across the sky. As a bonus action on your Consecrated Ground, you bare the night sky for 1 minute, whatever the hour and even through stone.
- **Falling Tears:** When you bare it, and at initiative count 20 each round after, up to three tears strike points you can see within 300 feet. Each creature you choose within 10 feet of a point makes a Dexterity saving throw against your essence ability save DC, taking 5d8 radiant damage on a failure or half as much on a success. A creature can be struck by only one tear each round.
- **Every Course Clear:** While the sky is bared, difficult terrain there doesn't slow you or your allies, and your movement there doesn't provoke opportunity attacks.

---

### Voyage Among the Stars

```yaml
id: navigation_grandmaster_voyage_among_the_stars
tier: grandmaster
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Selûne
location: Leatrux
ritual: true
```

As a 10-minute ritual under the open sky, you touch a ship, wagon or other vehicle. For 8 hours it flies at twice its normal speed on whatever course you set, needing no wind or team to draw it. Creatures aboard can breathe normally and can't fall from it. When the ritual ends, it settles gently to the ground or the water.

---

## Cantrips

### Internal Compass

```yaml
id: v2_navigation_internal_compass
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Blackstaff's Book of 1000 Spells
activation: bonus action
concentration: true
```

For up to 1 hour you know which way is north and can't become lost except by magic. You can end the spell to add 1d6 to a check to navigate natural terrain.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#internal%20compass_bb1000s).

---

### Starry Wisp

```yaml
id: v2_navigation_starry_wisp
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (PHB 2024)
activation: action
```

A ranged spell attack within 60 feet deals 1d8 radiant damage. Until the end of your next turn, the target glows and can't benefit from the Invisible condition.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#starry%20wisp_xphb).

---

## Spells

### Guiding Star

```yaml
id: v2_navigation_guiding_star
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
ritual: true
```

Reading the stars or the sun, you know the cardinal directions and the direction and distance to a named destination for 8 hours, though not the best route.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#guiding%20star_kpdm).

---

### Longstrider

```yaml
id: v2_navigation_longstrider
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

For 1 hour a creature you touch gains 10 feet of speed.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#longstrider_xphb).

---

### Guiding Bolt

```yaml
id: v2_navigation_guiding_bolt
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A ranged spell attack within 120 feet deals 4d6 radiant damage, and the next attack roll against the target before the end of your next turn has advantage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#guiding%20bolt_xphb).

---

### Easy Trail

```yaml
id: v2_navigation_easy_trail
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Elminster's Guide to Magic
activation: action
```

For 8 hours undergrowth parts for you and creatures within 40 feet of you, and anyone tracking you has disadvantage on Survival checks to follow your trail.

Source reference: [Elminster's Guide to Magic on 5e.tools](https://5e.tools/spells.html#easy%20trail_elminsters%20guide%20to%20magic).

---

### Star Scry

```yaml
id: v2_navigation_star_scry
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
```

The midnight sky above a place, person or object you describe appears over you, and a Navigator's Tools check reveals its general region.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#star%20scry_belzormm).

---

### Sagittarius's Bow

```yaml
id: v2_navigation_sagittariuss_bow
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Yorviing's Arcane Grimoire
activation: bonus action
concentration: true
```

A longbow of starlight deals 2d8 radiant damage for up to 1 minute. Arrows striking targets in dim light or darkness also burst for 1d4 radiant damage on a failed Dexterity save.

Source reference: [Yorviing's Arcane Grimoire on 5e.tools](https://5e.tools/spells.html#sagittarius's%20bow_yag).

---

### Billowing Sails

```yaml
id: v2_navigation_billowing_sails
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Northlands Worldbook
concentration: true
ritual: true
```

For up to 8 hours a strong breeze fills the sails of a ship you touch, and it travels 1 mile per hour faster.

Source reference: [Kobold Press Northlands Worldbook on 5e.tools](https://5e.tools/spells.html#billowing%20sails_northlandsworldbook).

---

### Sailor's Shanty

```yaml
id: v2_navigation_sailors_shanty
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Northlands Worldbook
activation: action
concentration: true
```

For up to 4 hours the crew of a vehicle you touch has advantage on D20 Tests to control or operate it.

Source reference: [Kobold Press Northlands Worldbook on 5e.tools](https://5e.tools/spells.html#sailor's%20shanty_northlandsworldbook).

---

### Guiding Light

```yaml
id: v2_navigation_guiding_light
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
ritual: true
```

At night, a star appears for 8 hours above a creature or place you name on your plane. Your familiarity with the target sets how close to it the star lands.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#guiding%20light_belzormm).

---

### Compelling Fate

```yaml
id: v2_navigation_compelling_fate
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
```

You read a creature within 50 feet in the stars. On a failed Charisma save you have advantage on attacks against it, can move when it moves, and can warn allies of its attacks.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#compelling%20fate_kpdm).

---

### Lucky Stars

```yaml
id: v2_navigation_lucky_stars
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
concentration: true
```

Three stars circle your head for up to 1 minute. Spend one to roll another d20 on your attack, check or save, or on an attack against you, and choose which die counts.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#lucky%20stars_belzormm).

---

### Locate Creature

```yaml
id: wood_4th_level_locate_creature
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

For up to 1 hour you sense the direction of a creature you know within 1,000 feet.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#locate%20creature_xphb).

---

### Ghostly Crew

```yaml
id: v2_navigation_ghostly_crew
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Northlands Worldbook
activation: action
concentration: true
```

For up to 8 hours spirits crew a vessel you touch, as long as you stay within 30 feet of it.

Source reference: [Kobold Press Northlands Worldbook on 5e.tools](https://5e.tools/spells.html#ghostly%20crew_northlandsworldbook).

---

### Celestial Pyre

```yaml
id: v2_navigation_celestial_pyre
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
```

At night, you turn a creature dead for no more than a day into a constellation. Its time limit for being raised stops, and spells that need its body can target the stars instead.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#celestial%20pyre_belzormm).

---

### Bless Vessel

```yaml
id: v2_navigation_bless_vessel
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
ritual: true
```

For 24 hours a ship or airship you're aboard moves half again as fast and ignores difficult terrain. Once, someone aboard can gain advantage on a check or save that keeps it from harm.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#bless%20vessel_belzormm).

---

### Find the Path

```yaml
id: v2_navigation_find_the_path
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
concentration: true
```

For up to 1 day you know the distance and direction to a familiar place on your plane, and which path is most direct at every fork.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#find%20the%20path_xphb).

---

### Star Step

```yaml
id: v2_navigation_star_step
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: The Elements and Beyond
activation: action
```

You teleport up to 150 feet with one willing creature. The blast deals 3d8 force and 3d8 radiant damage within 30 feet of you, knocking prone and blinding on a failed Constitution save, or half on a success.

Source reference: [The Elements and Beyond on 5e.tools](https://5e.tools/spells.html#star%20step_teb).

---

### Cosmic Canvas

```yaml
id: v2_navigation_cosmic_canvas
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Orana's Expanded Spellbook
concentration: true
```

For up to 8 hours you repaint the sky within 10 miles: guide or mislead those who navigate by it, incapacitate a 100-foot radius on a failed Wisdom save, or trigger effects tied to a time or celestial event.

Source reference: [Orana's Expanded Spellbook on 5e.tools](https://5e.tools/spells.html#cosmic%20canvas_oranasexpandedspellbook).

---

### Starry Vision

```yaml
id: v2_navigation_starry_vision
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: reaction
concentration: true
```

As a reaction when an enemy starts its turn, you read a creature within 100 feet in the stars for up to 1 minute. On a failed Charisma save you have advantage against it, can move when it moves, and can warn allies.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#starry%20vision_kpdm).

---

### Awaken Ship Guardian

```yaml
id: v2_navigation_awaken_ship_guardian
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Northlands Worldbook
activation: action
```

For 24 hours a spirit guards a Large or larger ship within 30 feet. The ship is immune to fire, large attackers take 5d6 psychic damage on a failed Wisdom save, and you can spend slots to repair it.

Source reference: [Kobold Press Northlands Worldbook on 5e.tools](https://5e.tools/spells.html#awaken%20ship%20guardian_northlandsworldbook).

---

### Night Sky

```yaml
id: v2_navigation_night_sky
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Belzor's Magical Manifesto
activation: action
```

The sky turns to night within 1 mile for 1 hour. Each turn you can reshape the land's appearance, raise a corpse, put a creature to sleep, grant temporary hit points or call down falling stars.

Source reference: [Belzor's Magical Manifesto on 5e.tools](https://5e.tools/spells.html#night%20sky_belzormm).

