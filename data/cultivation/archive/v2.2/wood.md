# Wood Cultivation Path

Tradition: Primordial / Immortal
Concept: Growth and living transformation. Plants, roots, forest life, natural resilience, and draconic green lineages.

## Initiate Tier

### Vine Manipulation

```yaml
id: wood_initiate_vine_manipulation
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You gain the ability to manipulate vines and roots within 30 feet of you.

As an action, you can cause vines to emerge from the ground or surrounding vegetation to ensnare a creature or create barriers:
- **Ensnare:** Force a creature to make a Strength saving throw; on a failed save, the creature is grappled or restrained (your choice) by the vines.
- **Barriers:** Create difficult terrain in a 10-foot square area for 1 minute.

---

### Fertile Ground Resilience

```yaml
id: wood_initiate_fertile_ground_resilience
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

When you are standing on or above fertile soil (such as grasslands, forests, or similar natural terrain), you can use your reaction to gain immunity to effects that would knock you prone or push you away. Additionally, while on such terrain, you gain advantage on saving throws against being grappled or restrained.

---

### Thorny Defence

```yaml
id: wood_initiate_thorny_defence
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

When a creature hits you with a melee attack, you can use your reaction to cause thorns to erupt from your skin. The attacker takes 4d4 piercing damage.

---

### Woodcraft

```yaml
id: wood_initiate_woodcraft
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You gain proficiency with woodcarver’s tools and the ability to craft simple wooden items. You can create small wooden objects (e.g., a carved figurine, a simple tool) in 1 hour, provided you have access to suitable materials. You can also use your tools to make minor repairs to wooden objects.

---

### Entangling Reach

```yaml
id: vine_master_entangling_reach
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
location: Sirius
```

As an action, you can target up to five creatures you can see within 120 feet, expending 1 point of Essence for each creature targeted. An unwilling target must make a Strength or Dexterity saving throw (your choice, DC determined by your abilities). On a failed save, the creature is grappled. This grapple ignores the creature's weight, unless the creature is one size larger than you.

---

### Coiling Resilience

```yaml
id: vine_master_coiling_resilience
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
location: Sirius
```

You gain a +1 bonus to all saving throws for each creature you currently have grappled.

## Adept Tier

### Plant Bond

```yaml
id: wood_adept_plant_bond
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You can communicate with plants in a basic way. You understand their emotions and can ask simple questions (e.g., \"Where is the nearest source of water?\"). Plants can also provide you with basic information about their immediate surroundings.

---

### Woodland Stride

```yaml
id: wood_adept_woodland_stride
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

Moving through nonmagical plant life, such as undergrowth or vines, costs you no extra movement. You can also move through difficult terrain caused by plant life without penalty.

---

### Nature’s Insight

```yaml
id: wood_adept_natures_insight
tier: adept
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You gain proficiency in Nature and Survival skills. If you are already proficient in either of these skills, you gain expertise, doubling your proficiency bonus for those skills.

---

### Verdant Armor

```yaml
id: wood_adept_verdant_armor
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

As a bonus action, you encase yourself in a layer of living wood and leaves for 1 minute. At the start of each of your turns while this armor is active, you regain hit points equal to 1d6.

---

### Needle Barrage

```yaml
id: wood_adept_needle_barrage
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You unleash a torrent of wooden needles that streak toward one creature you can see within range. The target must make a Dexterity saving throw:
- **On a failed save:** The target takes 8d4 piercing damage and is riddled with needles, reducing its speed by half until the end of your next turn.
- **On a successful save:** The target takes half damage and suffers no speed reduction.

---

### Tree Form

```yaml
id: wood_adept_tree_form
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Espora Tribe
location: Phudara / Isle of Whispers
```

You can use your action to transform into a treelike creature for 1 minute or until you use your action to revert to your normal form (usable once per long rest).

While in this form, you gain the following benefits:
- **Armor Class:** Your AC becomes 17 as your skin becomes as tough as bark.
- **Hit Points:** You gain temporary hit points equal to twice your character level.
- **Slam Attack:** You can make a slam melee attack with a +6 bonus to hit, dealing 2d6 + 4 bludgeoning damage.
- **Rooted Stance:** You can root yourself to the ground. While rooted, you cannot move, but you have advantage on Strength and Constitution saving throws, and any creature that starts its turn within 5 feet of you takes 1d6 bludgeoning damage.

## Master Tier

### Heart Exchange

```yaml
id: wood_master_heart_exchange
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
location: Sirius
```

As an action, choose a willing creature within 60 feet. You exchange hearts—roots of life intertwining your essences in profound gratitude.

For the next hour, you and the target share an unbreakable bond regardless of distance:
- Whenever one of you takes damage, both take half that damage.
- Whenever one regains hit points, both regain the same amount.
- You both gain advantage on all saving throws.

You can maintain only one heart exchange at a time.

## Cantrips

### Thorn Whip

```yaml
id: wood_cantrip_thorn_whip
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
```

https://5e.tools/spells.html#thorn%20whip_xphb

---

### Shillelagh

```yaml
id: wood_cantrip_shillelagh
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
```

https://5e.tools/spells.html#shillelagh_xphb

---

### Root Grab

```yaml
id: wood_cantrip_root_grab
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
```

https://5e.tools/spells.html#root%20grab_obojimatallgrass

---

### Primal Savagery

```yaml
id: acid_cantrip_primal_savagery
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
```

https://5e.tools/spells.html#primal%20savagery_xge

## Spells

### Spike Growth

```yaml
id: wood_2nd_level_spike_growth
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#spike%20growth_xphb

---

### Entangle

```yaml
id: wood_1st_level_entangle
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#entangle_xphb

---

### Goodberry

```yaml
id: wood_1st_level_goodberry
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#goodberry_xphb

---

### Barkskin

```yaml
id: wood_2nd_level_barkskin
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#barkskin_xphb

---

### Plant Growth

```yaml
id: wood_3rd_level_plant_growth
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#plant%20growth_xphb

---

### Speak with Plants

```yaml
id: wood_3rd_level_speak_with_plants
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#speak%20with%20plants_xphb

---

### Grasping Vine

```yaml
id: wood_4th_level_grasping_vine
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#grasping%20vine_xphb

---

### Awaken

```yaml
id: wood_5th_level_awaken
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#awaken_xphb

---

### Tree Stride

```yaml
id: wood_5th_level_tree_stride
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#tree%20stride_xphb

---

### Wall of Thorns

```yaml
id: wood_6th_level_wall_of_thorns
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#wall%20of%20thorns_xphb

---

### Transport via Plants

```yaml
id: wood_6th_level_transport_via_plants
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
```

https://5e.tools/spells.html#transport%20via%20plants_xphb
