/**
 * Every patch, newest first. To add one: write its data file next to these, its
 * page in src/pages/patchNotes/, and register both here and in PATCH_PAGES.
 * Its /patch-notes/<slug> route and link preview come from this list, so give it
 * its own image: chat apps cache previews per URL.
 */

import { PATCH as V2_0 } from './v2-0';
import { PATCH as V2_1 } from './v2-1';
import { PATCH as V2_1_1 } from './v2-1-1';

export interface PatchMeta {
  /** URL segment: /patch-notes/<slug>. */
  slug: string;
  version: string;
  name: string;
  /** ISO date. */
  date: string;
  title: string;
  /** Link preview text. */
  summary: string;
  /** Link preview image, served from public/. */
  image: string;
}

export const PATCHES: PatchMeta[] = [V2_1_1, V2_1, V2_0];

export const LATEST_PATCH = PATCHES[0];

export const patchDate = (patch: PatchMeta) =>
  new Date(`${patch.date}T12:00:00`).toLocaleDateString('en-US', { dateStyle: 'long' });
