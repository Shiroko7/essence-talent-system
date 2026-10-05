import type { SystemVersion } from '../model';

export interface CharacterBuild {
  id: string;
  name: string;
  version: SystemVersion;
  level: number;
  selectedAbilities: string[];
  activeEssenceByPath: Record<string, number>;
  createdAt: number;
  updatedAt: number;
}

export interface BuildEssenceSummary {
  current: number;
  max: number;
  reserved: number;
  learnedPathCount: number;
  learnedPathNames: string[];
}
