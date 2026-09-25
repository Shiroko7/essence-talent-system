import type { LucideIcon } from 'lucide-react';
import {
  Anvil, Biohazard, BookOpen, Bomb, Brain, CloudFog, CloudLightning, CloudRain, Clover, Crosshair, Eye, EyeOff, Feather,
  FlaskConical, FlaskRound, Flame, Footprints, Gem, Grab, HandCoins, HandMetal, Heart, HeartHandshake, HeartPulse, Hexagon,
  Hourglass, Link, Magnet, Moon, MoonStar, Mountain, Music, Orbit, PawPrint, Shield, ShieldCheck, Shuffle, Skull, Snowflake,
  Sparkle, Sparkles, Sprout, Star, Sun, Swords, TestTube, Tornado, TreeDeciduous, VenetianMask, Wand, Waves, Wind, Zap
} from 'lucide-react';
import { Ability } from '../types/essence';
import { kindOf } from './model';

/**
 * There is no per-talent art yet, so each ability gets an icon from keywords in
 * its name (strongest signal) or rules text. Order matters: specific themes come
 * before broad ones. Anything unmatched falls back to an icon for its type.
 */
const RULES: [RegExp, LucideIcon][] = [
  [/bomb|explos|grenade/, Bomb],
  [/alchem|formula|mutagen|potion|elixir|brew|tincture|reagent/, FlaskConical],
  [/acid|corro|caustic|dissolv/, TestTube],
  [/plague|disease|contag|pestilen|blight|rot\b|infect|sickness/, Biohazard],
  [/poison|venom|toxi/, FlaskRound],
  [/storm|thunder|tempest/, CloudLightning],
  [/lightning|shock|spark|electr|volt/, Zap],
  [/tornado|cyclone|whirl|vortex/, Tornado],
  [/rain\b|downpour|drizzle/, CloudRain],
  [/mist|fog|cloud|haze|vapou?r/, CloudFog],
  [/ice\b|icy|frost|freez|snow|cold|glaci|chill/, Snowflake],
  [/fire|flame|ember|burn|blaz|inferno|scorch|heat|magma|lava|pyre|smolder/, Flame],
  [/flight|\bfly|feather|wing|levitat|soar/, Feather],
  [/wind|\bair\b|gust|breeze|gale|sky/, Wind],
  [/water|tide|wave|aqua|\bsea\b|ocean|flood|current|drown|torrent/, Waves],
  [/forge|smith|anvil/, Anvil],
  [/magnet/, Magnet],
  [/tree|forest|wood|bark|timber/, TreeDeciduous],
  [/plant|vine|root|thorn|seed|bloom|flower|grow|verdant|leaf|briar|spore|nature/, Sprout],
  [/earth|stone|rock|mountain|quake|terra|boulder|sand|soil|mud|clay/, Mountain],
  [/crystal|gem|jewel|diamond/, Gem],
  [/shield|ward|barrier|armou?r|bulwark|guard|protect|aegis|sanctuary/, Shield],
  [/resist|endur|unbroken|persever|fortitude|resilien|tough|steadfast|bear/, ShieldCheck],
  [/heal|restor|mend|regenerat|vital|cure|revive|life/, HeartPulse],
  [/love|charm|beauty|devot|affection|kiss|allure|desire/, Heart],
  [/bond|empath|ally|friend|companion|together/, HeartHandshake],
  [/moon|lunar/, Moon],
  [/dream|sleep|slumber/, MoonStar],
  [/star|celestial|constellat|comet|astral/, Star],
  [/sun|radian|dawn|daylight|blind/, Sun],
  [/shadow|dark|void|conceal|invisib|stealth|hide|shroud|night/, EyeOff],
  [/foresight|vision|sight|insight|reveal|detect|scry|perceiv|oracle/, Eye],
  [/decept|trick|illusion|disguise|lie\b|mask|feint/, VenetianMask],
  [/thie|steal|pickpocket|pilfer/, HandCoins],
  [/murder|kill|slay|execut|death|doom|reap|ruin|curse/, Skull],
  [/chain|bind|shackle|fetter|liberat|freedom|unchain/, Link],
  [/luck|fortune|fate|chance|provid/, Clover],
  [/teleport|blink|portal|transport|planar/, Orbit],
  [/song|music|echo|sonic|voice|chant|sound/, Music],
  [/mind|psychic|thought|telepat|mental/, Brain],
  [/time|hourglass|haste|slow\b/, Hourglass],
  [/stride|step|dash|walk|swift|sprint|leap|jump|kick/, Footprints],
  [/fist|punch|palm|unarmed|martial|strike|blow|combo|flurry/, HandMetal],
  [/grapple|grab|grasp|seize|pull/, Grab],
  [/blade|sword|edge|weapon|cleave|slash|parry|duel/, Swords],
  [/bow|arrow|shot|aim|precis|critical|target|mark/, Crosshair],
  [/form\b|shape|transform|morph|mutat/, Shuffle],
  [/beast|animal|wolf|bird|creature|familiar/, PawPrint],
  [/bless|boon|divine|prayer|holy|grace|hope|miracle/, Sparkles]
];

const FALLBACK: Record<ReturnType<typeof kindOf>, LucideIcon> = {
  passive: Hexagon,
  active: Sparkle,
  cantrip: Wand,
  spell: BookOpen
};

const cache = new Map<string, LucideIcon>();

export const iconFor = (ability: Ability): LucideIcon => {
  const cached = cache.get(ability.id);
  if (cached) return cached;
  const name = ability.name.toLowerCase();
  const text = ability.description.startsWith('http') ? '' : ability.description.slice(0, 240).toLowerCase();
  const match = RULES.find(([re]) => re.test(name)) ?? RULES.find(([re]) => re.test(text));
  const icon = match ? match[1] : FALLBACK[kindOf(ability)];
  cache.set(ability.id, icon);
  return icon;
};
