# Wood Cultivation Path

Tradition: Primordial
Concept: Plant life, roots, forests, and resilient growth.

### Goodberry

```yaml
id: wood_1st_level_goodberry
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

Ten magic berries appear in your hand for 24 hours. Each restores 1 hit point and feeds a creature for a day.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#goodberry_xphb).

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
activation: action
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
activation: reaction
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
activation: bonus action
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
activation: action
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
activation: action
```

You can use your action to transform into a treelike creature for 1 minute or until you use your action to revert to your normal form (usable once per long rest).

While in this form, you gain the following benefits:
- **Armor Class:** Your AC becomes 17 as your skin becomes as tough as bark.
- **Hit Points:** You gain temporary hit points equal to twice your character level.
- **Slam Attack:** You can make a slam melee attack with a +6 bonus to hit, dealing 2d6 + 4 bludgeoning damage.
- **Rooted Stance:** You can root yourself to the ground. While rooted, you cannot move, but you have advantage on Strength and Constitution saving throws, and any creature that starts its turn within 5 feet of you takes 1d6 bludgeoning damage.

## Master Tier

---

### Thorn Whip

```yaml
id: wood_cantrip_thorn_whip
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: action
```

A thorny vine makes a melee spell attack within 30 feet for 1d6 piercing damage and pulls a Large or smaller target 10 feet toward you.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#thorn%20whip_xphb).

---

### Shillelagh

```yaml
id: wood_cantrip_shillelagh
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: bonus action
```

For 1 minute your club or quarterstaff uses your spellcasting ability for attacks and deals a d8 force or normal damage.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#shillelagh_xphb).

---

### Root Grab

```yaml
id: wood_cantrip_root_grab
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
activation: reaction
```

As a reaction to a creature provoking your opportunity attack, roots reduce its speed by 10 feet until your next turn.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#root%20grab_obojimatallgrass).

---

### Spike Growth

```yaml
id: wood_2nd_level_spike_growth
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A 20-foot-radius area within 150 feet becomes hidden spikes for up to 10 minutes. Creatures take 2d4 piercing damage for every 5 feet they move there.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#spike%20growth_xphb).

---

### Entangle

```yaml
id: wood_1st_level_entangle
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

Plants fill a 20-foot square within 90 feet as difficult terrain, restraining creatures that fail a Strength save for up to 1 minute.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#entangle_xphb).

---

### Plant Growth

```yaml
id: wood_3rd_level_plant_growth
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

Plants in a 100-foot radius become overgrown, so creatures move at a quarter speed, or over 8 hours the land within half a mile becomes twice as fertile.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#plant%20growth_xphb).

---

### Speak with Plants

```yaml
id: wood_3rd_level_speak_with_plants
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

For 10 minutes plants in a 30-foot area around you can talk with you, answer questions about the past day, and move aside or entangle at your command.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#speak%20with%20plants_xphb).

---

### Grasping Vine

```yaml
id: wood_4th_level_grasping_vine
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: bonus action
concentration: true
```

A vine within 60 feet makes a melee spell attack for 4d8 bludgeoning damage and pulls the target 30 feet, again as a bonus action each turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#grasping%20vine_xphb).

---

### Tree Stride

```yaml
id: wood_5th_level_tree_stride
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

For up to 1 minute you can step into a tree and out of another of the same kind within 500 feet.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#tree%20stride_xphb).

---

### Wall of Thorns

```yaml
id: wood_6th_level_wall_of_thorns
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
concentration: true
```

A wall of thorns up to 60 feet long rises within 120 feet. Creatures in it or passing through take 7d8 piercing damage on a failed Dexterity save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#wall%20of%20thorns_xphb).

---

### Transport via Plants

```yaml
id: wood_6th_level_transport_via_plants
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
activation: action
```

A Large plant within 10 feet links to another plant you've seen on the same plane, and creatures can step between them for 1 round.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#transport%20via%20plants_xphb).

---

### Druidcraft

```yaml
id: v2_wood_druidcraft
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (PHB)
activation: action
```

You create a minor nature effect within 30 feet: a weather sign, a blooming flower, a harmless sensory effect, or lighting a small flame.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#druidcraft_phb).

---

## Spells restored from V1

---

### Ensnaring Strike

```yaml
id: wood_1st_level_ensnaring_strike
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: bonus action
concentration: true
```

When you hit with a weapon, vines restrain the target on a failed Strength save and deal 1d6 piercing damage each turn.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#ensnaring%20strike_xphb).

---

### Find Familiar

```yaml
id: wood_1st_level_find_familiar
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
ritual: true
```

You gain a spirit familiar in the form of a small animal. It shares its senses with you and can deliver your touch spells.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#find%20familiar_xphb).

---

### Forest Guard

```yaml
id: wood_1st_level_forest_guard
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
activation: action
```

An animated shrub within 60 feet lashes hostile creatures that come within 10 feet of it.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#forest%20guard_obojimatallgrass).

---

### Sprout Foliage

```yaml
id: wood_1st_level_sprout_foliage
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Obojima: Tales from the Tall Grass
activation: action
```

Leaves cover your body so that while prone and still you look like a bush.

Source reference: [Obojima: Tales from the Tall Grass on 5e.tools](https://5e.tools/spells.html#sprout%20foliage_obojimatallgrass).

---

### Barkskin

```yaml
id: wood_2nd_level_barkskin
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: bonus action
```

A willing creature you touch has an AC of at least 17 for 1 hour.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#barkskin_xphb).

---

### Locate Animals or Plants

```yaml
id: wood_2nd_level_locate_animals_or_plants
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
ritual: true
```

You learn the direction and distance to the nearest Beast or plant of a kind you name within 5 miles.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#locate%20animals%20or%20plants_xphb).

---

### Thorn Armor

```yaml
id: wood_3rd_level_thorn_armor
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
```

A thorny shell gives a willing creature 3d6 temporary hit points. Creatures that hit it in melee take piercing damage equal to the temporary hit points lost.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#thorn%20armor_grimhollowpg24).

---

### Conjure Woodland Beings

```yaml
id: wood_4th_level_conjure_woodland_beings
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

Nature spirits fill a 10-foot emanation around you for up to 10 minutes, dealing 5d8 force damage to creatures in it on a failed Wisdom save, or half on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#conjure%20woodland%20beings_xphb).

---

### Summon Plant

```yaml
id: wood_4th_level_summon_plant
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
concentration: true
```

A plant spirit appears within 90 feet and fights for you for up to 1 hour.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#summon%20plant_grimhollowpg24).

---

### Awaken

```yaml
id: wood_5th_level_awaken
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A Beast or plant you touch gains Intelligence 10, the ability to speak, and is charmed by you for 30 days.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#awaken_xphb).

---

### Commune with Nature

```yaml
id: wood_5th_level_commune_with_nature
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
ritual: true
```

You learn up to three facts about the land within 3 miles, such as terrain, water, creatures or settlements.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#commune%20with%20nature_xphb).

---

### Wrath of Nature

```yaml
id: v2_wood_wrath_of_nature
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
activation: action
concentration: true
```

Trees, rocks and grass in a 60-foot cube within 120 feet attack your enemies for up to 1 minute: difficult terrain, slashing branches and grasping roots.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#wrath%20of%20nature_xge).

---

### Druid Grove

```yaml
id: v2_wood_druid_grove
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (XGE)
```

You ward an outdoor area up to a 90-foot cube for 24 hours with fog, grasping undergrowth, guardian trees and other protections.

Source reference: [D&D 5e (XGE) on 5e.tools](https://5e.tools/spells.html#druid%20grove_xge).

---

### Summon Dinosaur

```yaml
id: v2_wood_summon_dinosaur
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
activation: action
concentration: true
```

A dinosaur spirit appears within 90 feet and fights for you for up to 1 hour.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#summon%20dinosaur_au).

---

### Regenerate

```yaml
id: v2_wood_regenerate
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

A creature you touch regains 4d8 + 15 hit points, then 1 hit point each turn for 1 hour, and regrows lost body parts.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#regenerate_xphb).

---

### Forest Sanctuary

```yaml
id: v2_wood_forest_sanctuary
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
```

In a forest, a 200-foot cube within 300 feet is shielded from storms, floods and blight, and plants there grow and heal.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#forest%20sanctuary_kpdm).

---

### World Tree

```yaml
id: v2_wood_world_tree
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Fragments of the Forbidden Tome
ritual: true
```

You grow a colossal living tree up to 5 miles tall that becomes part of the world.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#world%20tree_fftforbiddentome).

---

### Primordial Rainforest

```yaml
id: v2_wood_primordial_rainforest
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Orana's Expanded Spellbook
activation: action
```

A rainforest fills a 150-foot cube within 150 feet for up to 10 minutes, overgrowing structures and fighting your enemies. Planted over time, it becomes permanent.

Source reference: [Orana's Expanded Spellbook on 5e.tools](https://5e.tools/spells.html#primordial%20rainforest_oranasexpandedspellbook).

---

### Arboreal Curse

```yaml
id: v2_wood_arboreal_curse
tier: 7th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Grim Hollow Player's Guide
activation: action
```

A creature within 60 feet is restrained as it hardens into wood on a failed Constitution save, and becomes a tree after three failed saves.

Source reference: [Grim Hollow Player's Guide on 5e.tools](https://5e.tools/spells.html#arboreal%20curse_grimhollowpg24).

---

### Bloom

```yaml
id: v2_wood_bloom
tier: 8th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
ritual: true
```

As a ritual, you plant a silver acorn and make the land within 1 mile extremely fertile for a year.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#bloom_kpdm).

---

### Shapechange

```yaml
id: v2_moon_shapechange
tier: 9th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
activation: action
concentration: true
```

For up to 1 hour you take the form of any creature you've seen with a CR up to your level, and can change form again as an action.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#shapechange_phb).


