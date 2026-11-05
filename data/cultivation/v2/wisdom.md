# Wisdom Cultivation Path

Tradition: Immortal
Concept: Memory, names, knowledge, thoughts, and deduction: knowing what has happened, what a thing is, and what will happen next.
Facets: Memory, Names, Knowledge, Thoughts & Deduction

### Call by Name

```yaml
id: wisdom_initiate_call_by_name
tier: initiate
facets: names
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
domain: expansion
domainText: Its damage dice are d12s.
activation: action
```

As an action, you call a creature by its name. Choose a creature within 60 feet whose name you know, even if you can't see it. If you know it only by a false name or a nickname, it has advantage on the saving throw. It makes a Wisdom saving throw against your essence ability save DC. On a failure, it takes 2d10 psychic damage, and until the end of your next turn it can't hide from you and gains no benefit from being invisible against you. On a success, it takes half as much damage only.

---

### Gleaned Knowledge

```yaml
id: wisdom_initiate_gleaned_knowledge
tier: initiate
facets: knowledge
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
```

When you finish a long rest, choose one skill or tool. You have proficiency in it until you finish your next long rest.

---

### Lost Thought

```yaml
id: wisdom_initiate_lost_thought
tier: initiate
facets: memory
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
domain: expansion
domainText: The target has disadvantage on the saving throw.
activation: action
```

As an action, you pull a thought out of the mind of a creature you can see within 60 feet before it can finish it. It makes an Intelligence saving throw against your essence ability save DC. On a failure, it takes 2d8 psychic damage and forgets what it was doing, losing concentration. On a success, it takes half as much damage only.

---

### Remember Yourself

```yaml
id: wisdom_initiate_remember_yourself
tier: initiate
facets: memory
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
domain: expansion
domainText: You can target one more ally.
activation: bonus action
```

As a bonus action, you remind an ally within 30 feet of you that can hear you who it is. It ends the Charmed and Frightened conditions on itself.

---

## Adept Tier

### Foreseen Retreat

```yaml
id: wisdom_adept_foreseen_retreat
tier: adept
facets: thoughts-deduction
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
domain: expansion
domainText: You can read one more creature.
activation: bonus action
```

As a bonus action, you read where a creature you can see within 60 feet will go next. Until the start of your next turn, taking the Disengage action doesn't stop it from provoking opportunity attacks from you and your allies.

---

### Name the Habit

```yaml
id: wisdom_adept_name_the_habit
tier: adept
facets: names
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
domain: expansion
domainText: It lasts up to 1 minute instead, and the target repeats the saving throw at the end of each of its turns, ending the effect on a success.
activation: bonus action
```

As a bonus action, you name one action, spell, or special ability you have seen a creature you can see within 60 feet use during this fight. It makes a Wisdom saving throw against your essence ability save DC. On a failure, it can't use what you named until the end of its next turn.

---

### Sworn Oath

```yaml
id: wisdom_adept_sworn_oath
tier: adept
facets: names
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
domain: expansion
domainText: A creature that breaks it takes 6d12 force damage instead.
```

Over 1 minute, up to eight willing creatures who can hear you swear an oath you speak aloud: a contract, truce, or alliance of up to 25 words that lasts up to 1 year. You can be one of them. A creature that knowingly breaks the oath takes 6d10 force damage, and everyone else bound by it knows at once who broke it.

---

### Drowned in Memory

```yaml
id: wisdom_adept_drowned_in_memory
tier: adept
facets: memory
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
domain: expansion
domainText: Its damage dice are d12s.
activation: action
```

As an action, you flood the mind of a creature you can see within 60 feet with every memory it has ever made, all at once. It makes a Wisdom saving throw against your essence ability save DC. On a failure, it takes 4d8 psychic damage and can't take reactions until the start of its next turn. On a success, it takes half as much damage only.

---

## Master Tier

### Litany of Names

```yaml
id: wisdom_master_litany_of_names
tier: master
facets: memory, names
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
activation: action
```

As an action, you recite the names of the dead. Each enemy of your choice within 30 feet of you relives the memory of everyone who died with a grievance against it, and makes a Wisdom saving throw against your essence ability save DC. It takes 6d8 force damage on a failure, or half as much on a success. If you speak the name of someone it killed or gravely wronged, it takes 6d12 instead. A creature that has wronged no one who died is unaffected.

---

### Locked Archive

```yaml
id: wisdom_master_locked_archive
tier: master
facets: thoughts-deduction
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
```

Your mind is an archive with locked doors. You have resistance to psychic damage.

---

### Imposed Oath

```yaml
id: wisdom_master_imposed_oath
tier: master
facets: names
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
domain: expansion
domainText: The target has disadvantage on the saving throw.
activation: action
```

As an action, you bind a creature you can see within 60 feet that can hear you to a prohibition of up to ten words, such as "Do not harm the child" or "Do not leave this hall." It makes a Charisma saving throw against your essence ability save DC. On a failure, it is bound for 1 minute, and each time it knowingly breaks the prohibition it takes 4d10 force damage. A prohibition that leaves it no choice but to break it, or that would kill it, has no effect.

---

### Learned at a Glance

```yaml
id: wisdom_master_learned_at_a_glance
tier: master
facets: knowledge
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
```

Once you have seen a spell cast, you understand it. Within 1 minute after you see a creature cast a spell of 4th level or lower, you can cast a lesser copy of it once, at the level it was cast, using its normal casting time and your essence ability as your spellcasting ability. You need no spell slot, and no material components unless they have a cost. The copy deals half damage, restores half as many hit points, and lasts half as long. You don't learn the spell, and you can't copy it into a spellbook.

---

### Never Twice

```yaml
id: wisdom_adept_never_twice
tier: master
facets: memory
isActive: false
isPassive: true
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
```

No trick works on you twice. When a creature's spell, technique, or special action forces you to make a saving throw, you remember it. Until you finish a long rest, when the same creature uses the same ability on you again, you take half damage from it, or none if you succeed on the save.

---

## Grandmaster Tier

### Bestow Title

```yaml
id: wisdom_grandmaster_bestow_title
tier: grandmaster
facets: names
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
activation: action
```

As an action, you give a creature you can see within 60 feet a title, and for 1 minute it becomes true. A willing creature accepts it. An unwilling one makes a Charisma saving throw against your essence ability save DC and is unaffected on a success. Choose the title:
- **Of Another Kind:** It counts as a creature type you name instead of its own, as a fiend titled "the Mortal" counts as a Humanoid.
- **Warded:** It has resistance to one damage type you name.
- **Unwarded:** It loses its resistance to one damage type you name.
- **Steadfast:** It is immune to the Charmed or Frightened condition (your choice).
- **Unguarded:** It loses its immunity to the Charmed or Frightened condition (your choice).
- **Swift:** Its speed increases by 10 feet.
- **Fettered:** Its speed is halved.
- **Grounded:** It can't fly or hover; if it is in the air, it descends 60 feet at the start of each of its turns until it lands.

---

### Ten Thousand Lives Unlived

```yaml
id: wisdom_grandmaster_ten_thousand_lives_unlived
tier: grandmaster
facets: thoughts-deduction
isActive: true
isPassive: false
isSpell: false
isCantrip: false
author: Harphonia "Harpy"
location: Sirius
activation: action
```

As an action, you show a creature you can see within 60 feet every life it could have lived and every path it did not take. It makes an Intelligence saving throw against your essence ability save DC. On a failure, it takes 10d10 psychic damage and is incapacitated with regret until the end of its next turn. On a success, it takes half as much damage only.

---

## Cantrips

### Encode Thoughts

```yaml
id: v2_wisdom_encode_thoughts
tier: cantrip
facets: memory, thoughts-deduction
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: D&D 5e (GGR)
activation: action
```

You pull a memory, idea, or message from your mind into a glowing thought strand that others can read with magic.

Source reference: [D&D 5e (GGR) on 5e.tools](https://5e.tools/spells.html#encode%20thoughts_ggr).

---

### Transfer Lore

```yaml
id: v2_wisdom_transfer_lore
tier: cantrip
facets: knowledge
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Orana's Expanded Spellbook
```

You draw a page of writing into your mind, leaving the page blank, and can write it out again onto another page.

Source reference: [Orana's Expanded Spellbook on 5e.tools](https://5e.tools/spells.html#transfer%20lore_oranasexpandedspellbook).

---

### Psychic Shock

```yaml
id: v2_wisdom_psychic_shock
tier: cantrip
facets: memory
isActive: false
isPassive: false
isSpell: false
isCantrip: true
author: Blackstaff's Book of 1000 Spells
activation: action
```

A creature you can see or hear relives a stressful memory, taking 1d6 psychic damage and disadvantage on its next Wisdom check on a failed Intelligence save.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#psychic%20shock_bb1000s).

---

## Spells

### Identify

```yaml
id: v2_wisdom_identify
tier: 1st
facets: knowledge
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
ritual: true
```

You learn a magic item's properties and how to use it, or which spells are affecting a creature or object.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#identify_xphb).

---

### Comprehend Languages

```yaml
id: v2_wisdom_comprehend_languages
tier: 1st
facets: knowledge
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
ritual: true
```

For 1 hour, you understand any language you hear, see signed, or see written.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#comprehend%20languages_xphb).

---

### Faultfinder

```yaml
id: v2_wisdom_faultfinder
tier: 1st
facets: knowledge
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Fragments of the Forbidden Tome
activation: action
ritual: true
```

You learn a creature's or object's exact hit points, AC, damage resistances, immunities, and vulnerabilities.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#faultfinder_fftforbiddentome).

---

### Perfect Recollection

```yaml
id: v2_wisdom_perfect_recollection
tier: 1st
facets: memory
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Fragments of the Forbidden Tome
activation: action
ritual: true
```

You recall everything you perceived in the last 24 hours exactly as you perceived it.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#perfect%20recollection_fftforbiddentome).

---

### Borrowed Knowledge

```yaml
id: v2_wisdom_borrowed_knowledge
tier: 2nd
facets: knowledge
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (SCC)
activation: action
```

Spirits of the past lend you proficiency in one skill for 1 hour.

Source reference: [D&D 5e (SCC) on 5e.tools](https://5e.tools/spells.html#borrowed%20knowledge_scc).

---

### Detect Thoughts

```yaml
id: v2_wisdom_detect_thoughts
tier: 2nd
facets: thoughts-deduction
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

You sense nearby minds and read a creature's surface thoughts, or probe deeper on a failed Wisdom save.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#detect%20thoughts_xphb).

---

### Read Object

```yaml
id: v2_wisdom_read_object
tier: 2nd
facets: knowledge
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
concentration: true
ritual: true
```

By handling an object, you learn pieces of its history: who owned it and what was done with it.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#read%20object_kpdm).

---

### Tongues

```yaml
id: v2_wisdom_tongues
tier: 3rd
facets: knowledge
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

For 1 hour, a creature you touch understands every spoken or signed language, and everyone understands it.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#tongues_xphb).

---

### Intellect Fortress

```yaml
id: v2_wisdom_intellect_fortress
tier: 3rd
facets: thoughts-deduction
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (TCE)
activation: action
concentration: true
```

A creature resists psychic damage and has advantage on Intelligence, Wisdom, and Charisma saving throws.

Source reference: [D&D 5e (TCE) on 5e.tools](https://5e.tools/spells.html#intellect%20fortress_tce).

---

### Raulothim's Psychic Lance

```yaml
id: v2_wisdom_raulothims_psychic_lance
tier: 4th
facets: names
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (FTD)
activation: action
```

A creature takes 7d6 psychic damage and is incapacitated on a failed Intelligence save; speak its name, and you can target it without seeing it.

Source reference: [D&D 5e (FTD) on 5e.tools](https://5e.tools/spells.html#raulothim's%20psychic%20lance_ftd).

---

### Know Vulnerabilities

```yaml
id: v2_wisdom_know_vulnerabilities
tier: 4th
facets: knowledge
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
```

On a failed Wisdom save, you learn a creature's specific weaknesses, such as a vampire's dread of sunlight.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#know%20vulnerabilities_bb1000s).

---

### Legend Lore

```yaml
id: v2_wisdom_legend_lore
tier: 5th
facets: knowledge
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
```

You learn the significant lore of a famous person, place, or object you name or describe.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#legend%20lore_xphb).

---

### Modify Memory

```yaml
id: v2_wisdom_modify_memory
tier: 5th
facets: memory
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
concentration: true
```

On a failed Wisdom save, you erase or rewrite up to 10 minutes of a creature's memories from the last 24 hours.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#modify%20memory_xphb).

---

### Eidetic Memory

```yaml
id: v2_wisdom_eidetic_memory
tier: 5th
facets: memory
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Kobold Press Deep Magic
activation: action
concentration: true
```

You recall anything you have ever read or heard, with a +10 bonus to Intelligence checks while the spell lasts.

Source reference: [Kobold Press Deep Magic on 5e.tools](https://5e.tools/spells.html#eidetic%20memory_kpdm).

---

### Probe Thoughts

```yaml
id: v2_wisdom_probe_thoughts
tier: 6th
facets: thoughts-deduction
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Blackstaff's Book of 1000 Spells
activation: action
concentration: true
ritual: true
```

On a failed Wisdom save, a creature's memories open to you, and you learn the answer to one question each round.

Source reference: [Blackstaff's Book of 1000 Spells on 5e.tools](https://5e.tools/spells.html#probe%20thoughts_bb1000s).

---

### Echoes of the Departed

```yaml
id: v2_wisdom_echoes_of_the_departed
tier: 7th
facets: memory
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Fragments of the Forbidden Tome
ritual: true
```

The memory of a creature dead within the last century takes shape and answers your questions. It is not the creature's soul.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#echoes%20of%20the%20departed_fftforbiddentome).

---

### Name the Unseen

```yaml
id: v2_wisdom_name_the_unseen
tier: 7th
facets: names
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Fragments of the Forbidden Tome
ritual: true
```

For the duration, you can see through false names, disguises, transformations, and possession to a creature's true identity.

Source reference: [Fragments of the Forbidden Tome on 5e.tools](https://5e.tools/spells.html#name%20the%20unseen_fftforbiddentome).

---

### Mind Blank

```yaml
id: v2_wisdom_mind_blank
tier: 8th
facets: thoughts-deduction
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

For 24 hours, a creature you touch is immune to psychic damage and the Charmed condition, and its thoughts can't be read or divined.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#mind%20blank_xphb).

---

### Befuddlement

```yaml
id: v2_pestilence_befuddlement
tier: 8th
facets: thoughts-deduction
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (PHB 2024)
activation: action
```

A creature within 150 feet takes 10d12 psychic damage and can't cast spells on a failed Intelligence save, or half damage on a success.

Source reference: [D&D 5e (PHB 2024) on 5e.tools](https://5e.tools/spells.html#befuddlement_xphb).

---

### Hindsight

```yaml
id: v2_wisdom_hindsight
tier: 9th
facets: memory
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: D&D 5e (Arcana Unleashed)
concentration: true
```

You watch the events of the past 10 years around you, and can slow, pause, or rewind them as you go.

Source reference: [D&D 5e (Arcana Unleashed) on 5e.tools](https://5e.tools/spells.html#hindsight_au).

---

### Mass Modify Memory

```yaml
id: v2_wisdom_mass_modify_memory
tier: 9th
facets: memory
isActive: false
isPassive: false
isSpell: true
isCantrip: false
author: Orana's Expanded Spellbook
activation: action
```

Creatures you choose within range sink into their memories, charmed and incapacitated on a failed Wisdom save, while you rewrite what they remember.

Source reference: [Orana's Expanded Spellbook on 5e.tools](https://5e.tools/spells.html#mass%20modify%20memory_oranasexpandedspellbook).
