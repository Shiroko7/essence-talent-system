import type { SystemVersion, TalentSystem } from '../model';
import { costOf } from '../model';
import type { CharacterBuild, BuildEssenceSummary } from './characterTypes';

export const ROSTER_STORAGE_KEY_V2 = 'cultivation-characters-v2-roster';
export const ACTIVE_ID_STORAGE_KEY_V2 = 'cultivation-characters-v2-active-id';

export const ROSTER_STORAGE_KEY_V1 = 'essence-characters-v1-roster';
export const ACTIVE_ID_STORAGE_KEY_V1 = 'essence-characters-v1-active-id';

export const LEGACY_STORAGE_KEY_V2 = 'cultivation-paths-character-v2-seven-plus-seven';
export const LEGACY_FALLBACK_V2 = 'cultivation-paths-character-v2';
export const LEGACY_STORAGE_KEY_V1 = 'essence-talent-system-character';

export const getRosterStorageKey = (version: SystemVersion): string =>
  version === 'v2' ? ROSTER_STORAGE_KEY_V2 : ROSTER_STORAGE_KEY_V1;

export const getActiveIdStorageKey = (version: SystemVersion): string =>
  version === 'v2' ? ACTIVE_ID_STORAGE_KEY_V2 : ACTIVE_ID_STORAGE_KEY_V1;

export const generateBuildId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `build-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

/** Load the full roster for the given system version. Seeds from legacy storage if empty. */
export const loadCharacterRoster = (version: SystemVersion): CharacterBuild[] => {
  const rosterKey = getRosterStorageKey(version);
  try {
    const raw = localStorage.getItem(rosterKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as CharacterBuild[];
      }
    }
  } catch (error) {
    console.error(`Error loading ${version} character roster:`, error);
  }

  // Seed from legacy storage if available
  const seeded = seedFromLegacy(version);
  saveCharacterRoster(version, seeded);
  return seeded;
};

/** Seed a roster from legacy single-character save files. */
const seedFromLegacy = (version: SystemVersion): CharacterBuild[] => {
  try {
    if (version === 'v2') {
      const savedRaw = localStorage.getItem(LEGACY_STORAGE_KEY_V2) ?? localStorage.getItem(LEGACY_FALLBACK_V2);
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        if (parsed && typeof parsed.level === 'number') {
          const initial: CharacterBuild = {
            id: generateBuildId(),
            name: 'Character 1',
            version: 'v2',
            level: parsed.level || 11,
            selectedAbilities: Array.isArray(parsed.selectedAbilities) ? parsed.selectedAbilities : [],
            activeEssenceByPath: parsed.activeEssenceByPath || {},
            createdAt: Date.now(),
            updatedAt: Date.now()
          };
          return [initial];
        }
      }
    } else {
      const savedRaw = localStorage.getItem(LEGACY_STORAGE_KEY_V1);
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        if (parsed && typeof parsed.level === 'number') {
          const initial: CharacterBuild = {
            id: generateBuildId(),
            name: 'Character 1',
            version: 'v1',
            level: parsed.level || 11,
            selectedAbilities: Array.isArray(parsed.selectedAbilities) ? parsed.selectedAbilities : [],
            activeEssenceByPath: parsed.activeEssenceByPath || {},
            createdAt: Date.now(),
            updatedAt: Date.now()
          };
          return [initial];
        }
      }
    }
  } catch (error) {
    console.error(`Error reading legacy ${version} character:`, error);
  }

  // Default fresh build
  const defaultBuild: CharacterBuild = {
    id: generateBuildId(),
    name: 'Character 1',
    version,
    level: 11,
    selectedAbilities: [],
    activeEssenceByPath: {},
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  return [defaultBuild];
};

/** Save the full roster to localStorage. */
export const saveCharacterRoster = (version: SystemVersion, roster: CharacterBuild[]): void => {
  try {
    localStorage.setItem(getRosterStorageKey(version), JSON.stringify(roster));
    // Dispatch storage event so other components or tabs can react
    window.dispatchEvent(new CustomEvent('talent-roster-updated', { detail: { version } }));
  } catch (error) {
    console.error(`Error saving ${version} character roster:`, error);
  }
};

/** Get the active character ID for a system version. */
export const getActiveCharacterId = (version: SystemVersion, roster?: CharacterBuild[]): string => {
  const currentRoster = roster || loadCharacterRoster(version);
  const activeKey = getActiveIdStorageKey(version);
  try {
    const activeId = localStorage.getItem(activeKey);
    if (activeId && currentRoster.some(c => c.id === activeId)) {
      return activeId;
    }
  } catch (error) {
    console.error(`Error getting active ${version} character ID:`, error);
  }

  const fallbackId = currentRoster[0]?.id || generateBuildId();
  setActiveCharacterId(version, fallbackId);
  return fallbackId;
};

/** Set the active character ID in localStorage. */
export const setActiveCharacterId = (version: SystemVersion, id: string): void => {
  try {
    localStorage.setItem(getActiveIdStorageKey(version), id);
    window.dispatchEvent(new CustomEvent('talent-active-character-changed', { detail: { version, id } }));
  } catch (error) {
    console.error(`Error setting active ${version} character ID:`, error);
  }
};

/** Keep the legacy storage key updated for backwards compatibility with existing tools and migration guides. */
export const syncLegacyStorage = (version: SystemVersion, build: CharacterBuild): void => {
  try {
    if (version === 'v2') {
      localStorage.setItem(LEGACY_STORAGE_KEY_V2, JSON.stringify({
        level: build.level,
        selectedAbilities: build.selectedAbilities,
        activeEssenceByPath: build.activeEssenceByPath,
        version: 'v2'
      }));
    } else {
      localStorage.setItem(LEGACY_STORAGE_KEY_V1, JSON.stringify({
        level: build.level,
        selectedAbilities: build.selectedAbilities,
        activeEssenceByPath: build.activeEssenceByPath
      }));
    }
  } catch (error) {
    console.error(`Error syncing legacy storage for ${version}:`, error);
  }
};

/** Calculate essence statistics (usable current, usable max, reserved) for any build. */
export const calculateBuildEssenceSummary = (
  build: CharacterBuild,
  system: TalentSystem
): BuildEssenceSummary => {
  const selectedSet = new Set(build.selectedAbilities);
  const learnedPaths = system.paths.filter(path =>
    (system.abilitiesByPath[path.id] || []).some(a => selectedSet.has(a.id))
  );

  let current = 0;
  let max = 0;
  let reserved = 0;

  for (const path of learnedPaths) {
    const abilities = system.abilitiesByPath[path.id] || [];

    const passiveReduction = build.selectedAbilities.reduce((tot, id) => {
      const a = abilities.find(ab => ab.id === id);
      if (!a) return tot;
      if (a.isPassive || a.isCantrip) return tot + costOf(a);
      return tot;
    }, 0);

    const activeAbilities = abilities.filter(a =>
      selectedSet.has(a.id) && (a.isActive || a.isSpell)
    );
    const available = activeAbilities.reduce((tot, a) => tot + costOf(a), 0);
    const pathMax = available;
    const spentVal = build.activeEssenceByPath[path.id] || 0;
    const pathCurrent = Math.min(spentVal, available);

    current += pathCurrent;
    max += pathMax;
    reserved += passiveReduction;
  }

  return {
    current,
    max,
    reserved,
    learnedPathCount: learnedPaths.length,
    learnedPathNames: learnedPaths.map(p => p.name)
  };
};
