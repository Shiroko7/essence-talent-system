# Tempest Cultivation Path

Tradition: Divine / Godhood
Concept: Umberlee’s divine command over storms, violent seas, thunder, and maritime peril.

## Initiate Tier

### Stormborn Presence

```yaml
id: lightning_initiate_stormborn_presence
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
```

When you make a Charisma (Persuasion) or Charisma (Intimidation) check to influence a group of people, you can invoke your stormy presence to gain advantage on the roll.

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
```

Your understanding of storms helps you predict their patterns and avoid hazards. You gain proficiency in Navigator’s Tools and have advantage on Wisdom (Survival) checks made to navigate or map out sea routes in stormy weather.

---

### Lightning Insight

```yaml
id: lightning_initiate_lightning_insight
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
```

When on or near water, you can use your connection to lightning to sense changes in weather. You can use a bonus action to gain advantage on Wisdom (Perception) checks to spot distant ships, landmarks, or other navigation hazards.

## Adept Tier

### Thunderous Strike

```yaml
id: lightning_adept_thunderous_strike
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
```

When you hit a creature with a melee weapon attack, you can channel the force of a thunderstorm into your strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn. This ability can only be used once per turn, and once a creature is stunned by this ability, it cannot be stunned again by it for 1 minute.

## Master Tier

### Lightning Cage

```yaml
id: lightning_essence_lightning_cage
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Nethan (Nilo's Father)
location: Leatrux
```

You conjure a crackling triangular cage of lightning in a 30-foot area centered on a point within 90 feet, lasting for 1 minute:
- Creatures inside have their speed halved and cannot take reactions.
- Any creature that touches or attempts to pass through the cage's perimeter takes 4d10 lightning damage.
- A creature trapped inside can use an action to make a Strength saving throw to break through: on a failed save, it remains trapped and takes 4d10 lightning damage; on a successful save, it escapes and takes half damage.

## Spells

### Destructive Wave

```yaml
id: tempest_5th_destructive_wave
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Tempest Domain) / Paladin
```

Strike the ground to unleash thunder and radiant/necrotic storm energy: 5d6 thunder + 5d6 damage, knocking enemies prone.

https://5e.tools/spells.html#destructive%20wave_xphb

---

### Storm of Vengeance

```yaml
id: tempest_9th_storm_of_vengeance
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Tempest Domain) / Conjuration
```

A churning storm cloud forms in a 360-foot radius, unleashing lightning bolts, acidic rain, hail, and howling hurricane winds.

https://5e.tools/spells.html#storm%20of%20vengeance_xphb

---

### Thunderwave

```yaml
id: tempest_1st_thunderwave
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Tempest Domain) / Evocation
```

A wave of thunderous force deals 2d8 thunder damage and pushes creatures 10 feet away.

https://5e.tools/spells.html#thunderwave_xphb

---

### Call Lightning

```yaml
id: tempest_3rd_call_lightning
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Tempest Domain) / Conjuration
```

Storm cloud forms overhead; each round call down lightning bolts dealing 3d10 (or 4d10 in stormy weather) lightning damage.

https://5e.tools/spells.html#call%20lightning_xphb

---

### Sleet Storm

```yaml
id: tempest_3rd_sleet_storm
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Tempest Domain) / Conjuration
```

Freezing rain and sleet create a 40-foot-radius squall: difficult terrain, extinguishes fires, and forces Dexterity saves to avoid falling prone.

https://5e.tools/spells.html#sleet%20storm_xphb

---

### Tidal Wave

```yaml
id: tempest_3rd_tidal_wave
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Conjuration
```

A crashing wave of seawater 30 ft long and 10 ft wide knocks creatures prone and deals 4d8 bludgeoning damage.

https://5e.tools/spells.html#tidal%20wave_xphb

---

### Storm Sphere

```yaml
id: tempest_4th_storm_sphere
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Evocation / Tempest
```

A 20-foot-radius sphere of gale winds hampers movement, and as a bonus action each round zap a target for 4d6 lightning damage.

https://5e.tools/spells.html#storm%20sphere_xphb

---

### Maelstrom

```yaml
id: tempest_5th_maelstrom
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Evocation / Umberlee
```

A 30-foot-radius swirling vortex of water drags creatures toward its center and deals 6d6 bludgeoning damage.

https://5e.tools/spells.html#maelstrom_xphb

---

### Control Weather

```yaml
id: tempest_8th_control_weather
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Tempest Domain) / Transmutation
```

Seize command of precipitation, temperature, and wind across a 5-mile radius, summoning hurricanes or calm skies.

https://5e.tools/spells.html#control%20weather_xphb

---

### Tsunami

```yaml
id: tempest_8th_tsunami
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Conjuration
```

A colossal wall of water up to 300 feet long, 300 feet high, and 50 feet thick crashes across the landscape, crushing everything in its path.

https://5e.tools/spells.html#tsunami_xphb
