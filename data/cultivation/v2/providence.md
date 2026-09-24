# Providence Cultivation Path

Tradition: Divine
Concept: Ilmater’s endurance, hope, protection, healing, and freedom from bonds.

### Draconic Regeneration of the Emerald Moon

```yaml
id: water_master_draconic_regeneration_emerald_moon
tier: master
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Lesbian Dragons
location: Leatrux
```

While under direct moonlight, you regain 1 hit point at the start of each of your turns. You can extend this regeneration to any creature within 60 feet by spending 1 essence point per creature at the start of your turn.

---

### Spare the Dying

```yaml
id: providence_cantrip_spare_the_dying
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Necromancy
```

You touch a living creature that has 0 hit points. The creature becomes stable immediately.

https://5e.tools/spells.html#spare%20the%20dying_xphb

---

### Lesser Restoration

```yaml
id: providence_2nd_lesser_restoration
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
```

You end one disease or condition: blinded, deafened, paralyzed, or poisoned.

https://5e.tools/spells.html#lesser%20restoration_xphb

---

### Greater Restoration

```yaml
id: providence_5th_greater_restoration
tier: 5th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Abjuration
```

You end one debilitating effect: exhaustion levels, charmed/petrified, cursed, or ability reductions.

https://5e.tools/spells.html#greater%20restoration_xphb

---

### Heal

```yaml
id: providence_6th_heal
tier: 6th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Life Domain)
```

A surge of positive energy washes through a creature you touch, restoring 70 hit points and ending all blindness, deafness, and diseases.

https://5e.tools/spells.html#heal_xphb

---

### Cure Wounds

```yaml
id: providence_1st_cure_wounds
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
```

A creature you touch regains hit points equal to 1d8 + your spellcasting ability modifier.

https://5e.tools/spells.html#cure%20wounds_xphb

---

### Revivify

```yaml
id: providence_3rd_revivify
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
```

You touch a creature that has died within the last minute, returning it to life with 1 hit point.

https://5e.tools/spells.html#revivify_xphb

---

### Restorative Rain

```yaml
id: water_initiate_restorative_rain
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Lluvia Tribe
location: Phudara / Isle of Whispers
```

As an action, you create a 20-foot radius of gentle rain centered on you that lasts for a number of rounds equal to your maximum Water essences. At the start of each of their turns while in the rain, they regain 1 hit point.

---

### Healing Word

```yaml
id: v2_life_healing_word
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

A spoken prayer restores a small amount of vitality to a creature within range.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#healing%20word_phb).

---

### Unbroken Spirit

```yaml
id: providence_initiate_unbroken_spirit
tier: initiate
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Order of the Broken Arrow (Ilmater)
```

Your resolve remains steadfast under trial. When you or an ally within 15 feet makes a saving throw against being frightened or charmed, or rolls a death saving throw, the creature adds a d4 to the result. Additionally, when you are below half your maximum hit points, your movement speed cannot be reduced by difficult terrain.

---

### Touch of Respite

```yaml
id: providence_initiate_touch_of_respite
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
```

**Casting Time:** 1 action 
**Range:** Touch 
**Components:** V, S 
**Duration:** Instantaneous 
**Portfolio:** Endurance

You touch a willing creature, granting it immediate relief from minor physical burdens. The target gains **1d4 temporary hit points** and can immediately repeat a saving throw against one condition affecting it: **poisoned** or **one level of exhaustion**. If the target succeeds, the condition or exhaustion level ends.

---

### Boon of Fortitude

```yaml
id: providence_initiate_boon_of_fortitude
tier: initiate
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
```

**Casting Time:** 1 action 
**Range:** 60 feet 
**Components:** V, S 
**Duration:** Concentration, up to 1 minute **Portfolio:** Endurance

You choose one creature you can see within range. For the duration, the target gains **advantage on saving throws against the frightened and charmed conditions**.

Additionally, the target becomes **immune to the stunned and incapacitated conditions** if the effect is caused by pain, torture, or physical trauma (such as damage that causes shock, not magical effects). The target is considered to be acting normally despite grievous physical wounds.

## Adept Tier

---

### Gift of Enduring Faith

```yaml
id: providence_adept_gift_of_enduring_faith
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
```

**Casting Time:** 1 action 
**Range:** Touch 
**Components:** V, S 
**Duration:** Instantaneous 
**Portfolio:** Endurance

You touch a living, willing creature. The target instantly regains **10d10 hit points**. You take **necrotic damage equal to half the number of hit points restored**. If this damage reduces you to 0 hit points, you immediately stabilize, but you gain **one level of exhaustion**.

---

### Endurance of Ilmater

```yaml
id: providence_adept_endurance_of_ilmater
tier: adept
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
```

**Casting Time:** 1 action 
**Range:** Touch 
**Components:** V, S 
**Duration:** Concentration, up to 1 minute **Portfolio:** Endurance

One willing creature you touch gains **40 temporary hit points**. While the target has these temporary hit points, it has **advantage on Strength and Constitution saving throws**, and **advantage on death saving throws**.

Additionally, the target **cannot be knocked prone, moved, or grappled** against its will by any nonmagical means.

---

### Martyr’s Flame Aura

```yaml
id: fire_essence_martyrs_flame_aura
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Mario (Ilmater's Chosen)
location: Leatrux
```

You wreathe yourself in holy fire for up to 1 minute (requires concentration), creating a 30-foot protective aura centered on you:
- Friendly creatures within the aura gain resistance to fire damage.
- When an ally enters the aura or starts its turn inside it, it gains temporary hit points equal to 2d6 + your Charisma modifier.

The flames warm and protect, never harming your allies.

---

### Liberation’s Gale

```yaml
id: wind_master_essence_liberations_gale
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Mario (Ilmater's Chosen)
location: Leatrux
```

A cleansing wind sweeps from you to creatures within 60 feet. Choose up to six targets:
- Each target immediately ends one of the following conditions affecting it: **Blinded**, **Charmed**, **Deafened**, **Frightened**, **Grappled**, **Paralyzed**, **Petrified**, **Poisoned**, **Restrained**, or **Stunned**.
- For 1 minute, those creatures also have advantage on saving throws against those same conditions.

In addition, for 1 minute, you become an unyielding force:
- You cannot be knocked prone, grappled, restrained, paralyzed, stunned, or moved against your will.
- Whenever you hit a creature with a melee attack, you may push it 10 feet or knock it prone.

## Cantrips

---

### Guidance

```yaml
id: providence_cantrip_guidance
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Divination
```

You touch one willing creature. The target can add 1d4 to one ability check of its choice.

https://5e.tools/spells.html#guidance_xphb

---

### Resistance

```yaml
id: providence_cantrip_resistance
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Abjuration
```

You touch one willing creature, granting perseverance. Once before the spell ends, the target can roll a d4 and add it to one saving throw.

https://5e.tools/spells.html#resistance_xphb

## Spells

---

### Beacon of Hope

```yaml
id: providence_3rd_beacon_of_hope
tier: 3rd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric (Life & Peace)
```

Targets have advantage on Wisdom saves and death saves, and receive the maximum possible healing from any source.

https://5e.tools/spells.html#beacon%20of%20hope_xphb

---

### Death Ward

```yaml
id: providence_4th_death_ward
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
```

The first time the target would drop to 0 hit points as a result of taking damage, it instead drops to 1 hit point.

https://5e.tools/spells.html#death%20ward_xphb

---

### Aid

```yaml
id: providence_2nd_aid
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
```

Bolster up to three creatures with resolve. Each target's current and maximum hit points increase by 5 for 8 hours.

https://5e.tools/spells.html#aid_xphb

---

### Warding Bond

```yaml
id: providence_2nd_warding_bond
tier: 2nd
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Peace Domain
```

You ward an ally: +1 AC, +1 to saves, resistance to all damage. Whenever the ally takes damage, you take an equal amount of damage.

https://5e.tools/spells.html#warding%20bond_xphb

---

### Freedom of Movement

```yaml
id: providence_4th_freedom_of_movement
tier: 4th
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Cleric / Paladin
```

Target's movement is unaffected by difficult terrain, and spells cannot reduce speed or paralyze/restrain it.

https://5e.tools/spells.html#freedom%20of%20movement_xphb

---

### Agony of the Martyr

```yaml
id: providence_master_agony_of_the_martyr
tier: master
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Ilmater / Portfolio (Endurance)
```

**Casting Time:** 1 action 
**Range:** 120 feet 
**Components:** V, S 
**Duration:** Concentration, up to 4 rounds **Portfolio:** Endurance

A beam of gray energy strikes one creature you can see. The target makes a **Wisdom saving throw with disadvantage**. On a failed save, the target takes **4d10 necrotic damage** and is **stunned by blinding pain** until the start of your next turn. On a successful save, the target takes half damage and is not stunned, and the spell ends.

At the start of each of your subsequent turns for the duration, the target must repeat the Wisdom saving throw, this time **without disadvantage**. On a failure, the target takes **4d10 necrotic damage** and remains stunned until the start of your next turn. On a success, the target takes half damage, and the spell ends.

## Cantrips

---

### Bless

```yaml
id: v2_providence_bless
tier: 1st
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB)
```

Several creatures gain a small measure of divine aid on attacks and saving throws.

Source reference: [D&D 5e PHB on 5e.tools](https://5e.tools/spells.html#bless_phb).

---

### Sacred Flame

```yaml
id: moon_cantrip_sacred_flame
tier: cantrip
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Cleric / Evocation
```

Flame-like solar radiance descends on a creature you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage with no benefit from cover.

https://5e.tools/spells.html#sacred%20flame_xphb

---
