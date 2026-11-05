# Heart Cultivation Path

Tradition: Immortal
Concept: Martial discipline and embodied mastery.
Facets: Unarmed, Blades, Spears, Blunt, Ranged, Body & Mind
Spellcasting: none

### Stone Fist I

```yaml
id: earth_initiate_stone_fist_1
tier: initiate
series: stone_fist
stages: replace
facets: unarmed
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Your unarmed strikes deal 1d4 bludgeoning damage and count as magical for overcoming resistance and immunity.

---

### Radiant Vein Blade I: Twin Strike of Conviction

```yaml
id: heart_initiate_radiant_vein_blade_form_1
tier: initiate
series: radiant_vein_blade
stages: add
facets: blades, spears, blunt, ranged
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Kelemvor
location: Leatrux
activation: attack
domain: expansion
domainText: A miss doesn't break the flow.
```

**Weapon Requirement:** Any weapon.

**Attack replacement:** Replace one weapon attack you make as part of the Attack action, including an attack granted by Extra Attack. Make that attack with advantage. On a hit, it deals an extra 1d6 damage of a type you choose: radiant, or your weapon's damage type.

**Flow:** You can use only one Radiant Vein Blade form per turn. If this attack misses, or you don't use Radiant Vein Blade II on your next turn, the flow breaks and you must start again with Radiant Vein Blade I.

---

### Stone Fist II

```yaml
id: earth_adept_stone_fist_2
tier: adept
series: stone_fist
stages: replace
facets: unarmed
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Your unarmed strikes deal 1d6 bludgeoning damage and count as magical for overcoming resistance and immunity.

---

### Radiant Vein Blade II: Aegis of the Righteous

```yaml
id: heart_adept_radiant_vein_blade_form_2
tier: adept
series: radiant_vein_blade
stages: add
facets: blades, spears, blunt, ranged
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Kelemvor
location: Leatrux
activation: attack
domain: expansion
domainText: You have advantage on the attack roll.
```

*Prerequisite: Radiant Vein Blade I*

**Weapon Requirement:** Any weapon.

**Attack replacement:** On the turn immediately after a hit with Radiant Vein Blade I, replace one weapon attack you make as part of the Attack action, including an attack granted by Extra Attack. On a hit, the attack deals an extra 2d6 damage of a type you choose (radiant, or your weapon's damage type), and the target's AC is reduced by 2 until the end of your next turn.

**Flow:** You can use only one Radiant Vein Blade form per turn. If this attack misses, or you don't use Radiant Vein Blade III on your next turn, the flow breaks and you must start again with Radiant Vein Blade I.

---

### Stone Fist III

```yaml
id: earth_master_stone_fist_3
tier: master
series: stone_fist
stages: replace
facets: unarmed
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Your unarmed strikes deal 1d8 bludgeoning damage and count as magical for overcoming resistance and immunity.

---

### Radiant Vein Blade III: Cascading Judgment

```yaml
id: heart_master_radiant_vein_blade_form_3
tier: master
series: radiant_vein_blade
stages: add
facets: blades, spears, blunt, ranged
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Kelemvor
location: Leatrux
activation: attack
domain: expansion
domainText: You have advantage on the weapon attack roll.
```

*Prerequisite: Radiant Vein Blade II*

**Weapon Requirement:** Any weapon.

**Attack replacement:** On the turn immediately after a hit with Radiant Vein Blade II, replace one weapon attack you make as part of the Attack action, including an attack granted by Extra Attack. Make one weapon attack against the primary target. Hit or miss, you unleash a 15-foot cone of blade energy from yourself toward that target. The primary target and each creature in the cone must make a Dexterity saving throw against your essence ability save DC, and the primary target makes it with disadvantage:
- **On a failed save:** The creature takes 3d8 damage of a type you choose (radiant, or your weapon's damage type) and is pushed 10 feet away from you.
- **On a successful save:** The creature takes half damage and is not pushed.

**Flow:** You can use only one Radiant Vein Blade form per turn. The sequence ends after this form. If its weapon attack misses, the flow breaks; otherwise, you can begin again with Radiant Vein Blade I on a later turn.

---

### Sky-Piercing Execution

```yaml
id: wind_master_sky_piercing_execution
tier: master
facets: spears
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yoo Tae-yang
location: Sirius
activation: reaction
domain: expansion
domainText: If the attack misses, the target still takes half damage.
```

As a reaction when a creature within 60 feet is airborne or suspended, teleport to an adjacent empty space in the air. Make one piercing melee weapon attack against it. On a hit, the target suffers the attack's normal damage plus an extra 4d10 thunder damage. The target must succeed on a Strength saving throw against your essence ability save DC or fall up to 60 feet, land prone, and take the normal falling damage. On a successful save, it remains airborne.

---

### Stone Fist IV

```yaml
id: heart_grandmaster_stone_fist_4
tier: grandmaster
series: stone_fist
stages: replace
facets: unarmed
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Your unarmed strikes deal 1d10 bludgeoning damage and count as magical for overcoming resistance and immunity.

---

### Stone Fist V

```yaml
id: heart_greatgrandmaster_stone_fist_5
tier: greatgrandmaster
series: stone_fist
stages: replace
facets: unarmed
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Llamarada Tribe
location: Phudara / Isle of Whispers
```

Your unarmed strikes deal 1d12 bludgeoning damage and count as magical for overcoming resistance and immunity.

---

### True Strike

```yaml
id: ruin_cantrip_true_strike
tier: cantrip
facets: blades, spears, blunt, ranged
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Divination / Assassination
activation: action
```

You make one weapon attack using your spellcasting ability for attack and damage, and it can deal radiant damage instead.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#true%20strike_xphb).

---

### Frozen Insight

```yaml
id: water_initiate_frozen_insight
tier: initiate
facets: body-mind
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
activation: action
```

You can temporarily turn your thoughts into ice, allowing you to gain deep insight into a complex problem or puzzle. For 1 hour, you gain advantage on Intelligence checks related to solving mysteries or understanding arcane knowledge.

---

### Entangling Reach

```yaml
id: vine_master_entangling_reach
tier: initiate
facets: unarmed
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: action
```

As an action, you can target up to five creatures you can see within 120 feet, expending 1 point of Essence for each creature targeted. An unwilling target must make a Strength or Dexterity saving throw (your choice, DC determined by your abilities). On a failed save, the creature is grappled. This grapple ignores the creature's weight, unless the creature is one size larger than you.

---

### Coiling Resilience

```yaml
id: vine_master_coiling_resilience
tier: initiate
facets: unarmed
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
```

You gain a +1 bonus to all saving throws for each creature you currently have grappled.

---

### Rush Attack

```yaml
id: heart_initiate_rush_attack
tier: initiate
facets: spears
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: attack
domain: expansion
domainText: You have advantage on the attack roll.
```

**Weapon Requirement:** Any melee weapon that deals piercing damage (such as a spear, pike, rapier, shortsword, trident, or dagger).

**Attack replacement:** When you take the Attack action on your turn, you can replace one of your weapon attacks to move up to 30 feet in a straight line toward a target creature you can see. This movement does not provoke opportunity attacks, and you can pass through spaces occupied by hostile creatures. Upon reaching the target, make one melee weapon attack with your piercing weapon against it, dealing your weapon's normal damage on a hit.

---

### Pommel Strike

```yaml
id: heart_initiate_pommel_strike
tier: initiate
facets: blades
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: bonus action
domain: expansion
domainText: You have advantage on the attack roll.
```

**Weapon Requirement:** Any sword (such as a greatsword, longsword, or shortsword) wielded with two hands or with your other hand empty.

You strike an adjacent creature with the pommel, crossguard, or hilt of your sword. Make a melee weapon attack. On a hit, the target takes 1d4 bludgeoning damage plus your Strength or Dexterity modifier (your choice).

---

### Lacerating Edge

```yaml
id: heart_initiate_lacerating_edge
tier: initiate
facets: blades
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: on hit
```

**Weapon Requirement:** Any melee weapon that deals slashing damage (such as a battleaxe, greataxe, greatsword, scimitar, longsword, sickle, or handaxe).

**Attack replacement:** When you hit a creature with a slashing melee weapon as part of the Attack action, the target must succeed on a Constitution saving throw against your essence ability save DC or begin Bleeding for 1 minute. A bleeding creature takes 1d4 necrotic damage at the start of each of its turns and has disadvantage on Constitution saving throws to maintain concentration. The target can repeat the saving throw at the end of each of its turns, ending the effect on a success.

## Adept Tier

---

### Cyclone Step

```yaml
id: wind_adept_cyclone_step
tier: adept
facets: body-mind
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
activation: free
```

When you use the Dash action, you can create a swirling vortex of wind around you. Creatures within 10 feet of your path must make a Strength saving throw or be knocked prone. The wind dissipates at the end of your movement.

---

### Gale Force Strike

```yaml
id: wind_adept_gale_force_strike
tier: adept
facets: body-mind
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
activation: on hit
```

When you hit a creature of your size or smaller, or any creature one size category larger than you, with an attack or spell, you can create a gust of wind that forces the creature to make a Strength saving throw. On a failed save, the creature is pushed 10 feet in any direction you choose.

---

### Ascending Dragon Gale

```yaml
id: wind_adept_ascending_dragon_gale
tier: adept
facets: spears
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Yoo Tae-yang
location: Sirius
activation: attack
oncePerTurn: true
domain: expansion
domainText: You can then move up to half your speed without provoking opportunity attacks.
```

When taking the Attack action with a piercing melee weapon, you can replace one attack to strike a creature within reach (usable once per turn).

The target must make a Strength saving throw. On a failed save, it takes 3d10 thunder damage, is launched 20 feet into the air, and is restrained and suspended until the end of your next turn. It then falls, taking falling damage and landing prone.

---

### Iron Stance (Brace)

```yaml
id: heart_adept_iron_stance
tier: adept
facets: blades, spears, blunt, ranged
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: bonus action
domain: expansion
domainText: You gain temporary hit points equal to twice your PB.
```

**Weapon Requirement:** A melee weapon with the Heavy or Reach property (such as a pike, glaive, halberd, greatsword, or maul), or a two-handed ranged weapon (such as a heavy crossbow or longbow).

You steady your grip and plant your stance, expending 15 feet of your movement speed for the turn. Until the start of your next turn:
- Whenever you roll damage for an attack made with an eligible weapon, you can reroll all damage dice and take the higher total.
- You have advantage on ability checks and saving throws against effects that would knock you prone, shove you, or move you against your will.

---

### Concussive Smash

```yaml
id: heart_adept_concussive_smash
tier: adept
facets: blunt
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: attack
domain: expansion
domainText: You have advantage on the attack roll.
```

**Weapon Requirement:** Any melee weapon that deals bludgeoning damage (such as a warhammer, maul, mace, flail, club, greatclub, or light hammer).

**Attack replacement:** Replace one weapon attack as part of the Attack action with a jarring strike. Make a melee weapon attack. On a hit, the attack deals an extra 1d8 bludgeoning damage, and the target must make a Constitution saving throw against your essence ability save DC. On a failed save, the target is Dazed for 1 round: it cannot take reactions, its movement speed is halved, and on its next turn it must choose between taking an action or a bonus action—it cannot take both.

---

### Disarming Feint

```yaml
id: heart_adept_disarming_feint
tier: adept
facets: blades, spears
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: attack
domain: expansion
domainText: You have advantage on the attack roll.
```

**Weapon Requirement:** Any melee weapon with the Finesse property (such as a rapier, scimitar, or shortsword) or a weapon with the Reach property (such as a trident, pike, or halberd).

**Attack replacement:** Replace one weapon attack as part of the Attack action. Make a melee weapon attack roll opposed by the target's Strength (Athletics) or Dexterity (Acrobatics) check (target's choice). If you win the contest, the attack deals normal weapon damage, and one weapon or item held by the target is wrenched from its grasp, flying up to 10 feet away in a direction of your choice and landing on the ground.

---

### Skirmisher's Volley (Mobile Shot)

```yaml
id: heart_adept_skirmishers_volley
tier: adept
facets: ranged
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: bonus action
domain: expansion
domainText: You have advantage on the attack roll.
```

**Weapon Requirement:** Any ranged weapon with the Light property (such as a hand crossbow) or a shortbow.

Immediately after taking the Dash or Disengage action on your turn, you can make one ranged weapon attack with an eligible weapon as a bonus action. This attack ignores half and three-quarters cover and does not suffer disadvantage from being within 5 feet of a hostile creature.

## Master Tier

---

### Static Slipstream

```yaml
id: wind_master_static_slipstream
tier: master
facets: body-mind
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Kwon Jae-Hwan
location: Sirius
activation: action
concentration: true
```

As an action, you fold space around yourself to step into a static pocket dimension for up to 1 minute (requires concentration).

When you use this ability, you can enter alone, or attempt to bring one other creature you can see within 60 feet with you (you cannot send another creature without entering yourself). If the target creature is unwilling, it must make a Charisma saving throw against your essence ability save DC:
- **On a failed save:** The creature is pulled into the dimension alongside you.
- **On a successful save:** The creature resists and remains in the physical world. Regardless of the creature's success or failure, you can still choose to enter the dimension or cancel the effect.

**Inside the Static Dimension:**
- The dimension is a quiet, empty reflection of the physical world. Time continues normally in the outside world, but all external environmental hazards (such as avalanches, collapsing terrain, fires, rapids, or suspended projectiles) appear frozen in place and deal no damage.
- Neither you nor any creature inside the dimension can interact with, target, or be targeted by anything on the outside plane.
- You can move freely across the frozen terrain, ignoring difficult terrain and safely traversing terrain that would be hazardous or impassable in the physical world.

**Ending the Effect:**
You can end this effect at any time at will (no action required). The effect also ends early if your concentration is broken, or if either creature inside drops to 0 hit points.

When the dimension collapses, each creature inside immediately reappears in the physical world at the exact coordinates corresponding to its current position inside the dimension (or the nearest unoccupied space).

---

### Tendon Sever (Maiming Strike)

```yaml
id: heart_master_tendon_sever
tier: master
facets: blades, spears
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: attack
domain: expansion
domainText: If the attack misses, the target still takes half damage.
```

**Weapon Requirement:** Any melee weapon that deals slashing or piercing damage (such as a battleaxe, war pick, longsword, rapier, or halberd).

**Attack replacement:** Replace one weapon attack as part of the Attack action. Make a melee weapon attack. On a hit, the attack deals an extra 2d8 damage of your weapon's type, and the target must make a Constitution saving throw against your essence ability save DC:
- **On a failed save:** The creature is Maimed for 1 minute. While maimed, its movement speed is reduced to 0, it cannot take reactions or the Dash action, and it has disadvantage on Dexterity saving throws.
- **On a successful save:** The target takes the extra damage and its movement speed is halved until the end of its next turn.

An affected creature can repeat the Constitution saving throw at the end of each of its turns, ending the condition on a success.

---

### Heart Exchange

```yaml
id: wood_master_heart_exchange
tier: master
facets: body-mind
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ha Yeon-ae
location: Sirius
activation: action
```

As an action, choose a willing creature within 60 feet. You exchange hearts—roots of life intertwining your essences in profound gratitude.

For the next hour, you and the target share an unbreakable bond regardless of distance:
- Whenever one of you takes damage, both take half that damage.
- Whenever one regains hit points, both regain the same amount.
- You both gain advantage on all saving throws.

You can maintain only one heart exchange at a time.

---

## Grandmaster Tier

---

### Heartstopper (Sternum Shatter)

```yaml
id: heart_grandmaster_heartstopper
tier: grandmaster
facets: blunt
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: attack
```

**Weapon Requirement:** A melee weapon that deals bludgeoning damage with the Heavy or Versatile property (such as a maul, warhammer, morningstar, or flail).

**Attack replacement:** Replace one weapon attack as part of the Attack action with a blow aimed directly at the opponent's sternum or cardiac center. Make a melee weapon attack. On a hit, the attack deals an extra 4d10 bludgeoning or force damage, and the target must make a Constitution saving throw against your essence ability save DC:
- **On a failed save:** The target suffers Chest Trauma for 1 minute. The target is immediately Incapacitated and suffocating until the end of its next turn. For the remaining duration, its movement speed is halved, it cannot take reactions, and whenever it attempts to cast a spell with verbal components or take the Multiattack or Attack action, it takes 3d8 necrotic damage and must succeed on a Constitution saving throw against your essence ability save DC or lose that action completely.
- **On a successful save:** The target takes half the extra damage and is Stunned until the end of your current turn.

An affected creature can repeat the Constitution saving throw at the end of each of its turns, ending the condition on a success.

---

### Unwavering Belief

```yaml
id: heart_grandmaster_unwavering_belief
tier: grandmaster
facets: body-mind
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
```

You gain proficiency in all saving throws.

---

### Supreme Heart-Reflection Sword

```yaml
id: heart_grandmaster_supreme_heart_reflection_sword
tier: grandmaster
facets: blades
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: reaction
```

**Weapon Requirement:** Any sword (such as a greatsword, longsword, rapier, or scimitar).

When a spell or ability forces you to make a saving throw while wielding a sword, you can use your reaction to parry with your blade. You gain advantage on that saving throw. If you succeed on the saving throw, you reflect the spell or ability back at the originator: the originator becomes the target, using the original save DC or effect.

---

### Divine Ocean-Splitting Record

```yaml
id: heart_grandmaster_divine_ocean_splitting_record
tier: grandmaster
facets: blades, blunt
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: attack
```

**Weapon Requirement:** Any melee weapon that deals slashing or bludgeoning damage with the Heavy or Versatile property (such as a greatsword, greataxe, maul, halberd, or glaive).

**Attack replacement:** Replace one weapon attack as part of the Attack action. You deliver a downward cleavage of devastating force, releasing a pressurized torrent in a line 60 feet long and 10 feet wide originating from you:
- **Environmental Displacement:** Any liquid, fog, mist, or non-solid water-based surface in the area is parted and pushed aside for 1 minute, creating a dry trench 10 feet deep. Any spell of 6th level or lower creating a barrier or wall in the line (such as *Wall of Force*, *Wall of Water*, or *Wall of Ice*) is instantly shattered and dispelled.
- **Creatures:** Each creature in the area must make a Dexterity saving throw against your essence ability save DC:
  - **On a failed save:** It takes 4d10 magical bludgeoning or slashing damage plus 4d10 cold damage, is pushed 15 feet to the nearest side of the line, and is knocked prone.
  - **On a successful save:** It takes half damage and is neither pushed nor knocked prone.

---

### Azure Dragon Ascending the Waves

```yaml
id: heart_grandmaster_azure_dragon_ascending_the_waves
tier: grandmaster
facets: unarmed
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Bingsan Mun Sect
location: Sirius
activation: bonus action
```

**Prerequisite:** Must currently be in a Draconic Form (such as under a dragon transformation, *Dragon Form*, wild shape, or draconic avatar).

**Weapon Requirement:** Natural weapons (claws, bite, tail) or unarmed strikes while in a Draconic Form.

You erupt upward in a spiraling vortex of churning seawater and storm mist, flying up to your movement speed in a straight line or upward arc without provoking opportunity attacks.
- Each creature within 10 feet of your flight path must make a Strength saving throw against your essence ability save DC:
  - **On a failed save:** It takes 4d10 cold damage and 4d10 bludgeoning damage, is lifted 20 feet into the air by the ascending waves, and falls, taking falling damage and landing prone.
  - **On a successful save:** It takes half damage and is not lifted or knocked prone.
- At any point during or at the end of this ascent, you can make one natural weapon attack (bite, claw, or tail) against a target within reach with advantage. On a hit, the attack deals its normal damage plus an extra 4d8 thunder or cold damage.

---

## Cantrips

---

### Thunderous Speed

```yaml
id: lightning_adept_thunderous_speed
tier: adept
facets: body-mind
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lei Zhen
location: Phudara / Isle of Whispers
```

Your movement speed increases by 10 feet. Additionally, you can take the Dash action as a bonus action.

---

### Venomous Bite (Gio)

```yaml
id: poison_initiate_venomous_bite
tier: initiate
facets: unarmed
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Vajra from the Espora Tribe
location: Phudara / Isle of Whispers
activation: attack
domain: expansion
domainText: You have advantage on the attack roll.
```

When you take the Attack action, you can replace one of your attacks with a bite attack, imbuing it with a potent venom. Make a melee weapon attack against a creature within your reach. On a hit, the target takes 1d12 piercing damage and must succeed on a Constitution saving throw against your essence ability save DC or become poisoned for 1 minute. The bite attack is considered magical for the purposes of overcoming resistance and immunity to nonmagical attacks.
