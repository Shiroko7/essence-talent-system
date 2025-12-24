import { EssencePathId, TierId, SpellLevel } from './essence';

/**
 * Represents a single field change in an ability modification
 */
export interface FieldChange {
  field: 'name' | 'description' | 'tier' | 'isActive' | 'isPassive' | 'isSpell' | 'isCantrip';
  oldValue: any;
  newValue: any;
}

/**
 * Represents a single changelog entry
 */
export interface ChangelogEntry {
  id: string;                    // Unique ID: ${commitHash}-${abilityId}
  date: string;                  // ISO date string
  commitHash: string;            // Git commit hash
  commitMessage: string;         // Commit message
  essenceType: EssencePathId | 'air';    // Which essence (water, fire, earth, etc.) - 'air' is legacy, maps to 'wind'
  changeType: 'added' | 'removed' | 'modified';
  ability: {
    id: string;
    name: string;
    tier: TierId | SpellLevel;
    description?: string;        // Full description (for added/removed)
    isActive?: boolean;
    isPassive?: boolean;
    isSpell?: boolean;
    isCantrip?: boolean;
  };
  changes?: FieldChange[];       // Only for 'modified' type
}

/**
 * Represents the complete changelog data structure
 */
export interface ChangelogData {
  version: string;               // Schema version
  generatedAt: string;           // ISO timestamp
  entries: ChangelogEntry[];     // All changelog entries, sorted by date desc
}

/**
 * Type for change type filter
 */
export type ChangeTypeFilter = 'all' | 'added' | 'removed' | 'modified';

/**
 * Type for essence filter (all essences + "all" option)
 */
export type EssenceFilter = EssencePathId | 'all';
