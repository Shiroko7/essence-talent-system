/**
 * Link-preview cards (1200x630 PNG) for each cultivation path, drawn as SVG and
 * rendered at build time, so every path, including ones added later, gets its own card.
 * Fonts are the site's own (Cinzel, Crimson Pro, SIL OFL; see fonts/OFL.txt).
 */
import { Resvg } from '@resvg/resvg-js'
import { resolve } from 'node:path'
import type { CultivationPath } from '../../src/types/cultivation'

const FONTS = ['Cinzel.ttf', 'CrimsonPro.ttf', 'CrimsonPro-Italic.ttf'].map(f => resolve(__dirname, 'fonts', f))

export interface PathCardInfo {
  path: CultivationPath
  facets: string[]
  techniques: number
  spells: number
  cantrips: number
}

const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Greedy word wrap by an estimated character budget; the last line gets an ellipsis if text is cut. */
const wrap = (text: string, maxChars: number, maxLines: number) => {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    if (line && (line + ' ' + word).length > maxChars) {
      lines.push(line)
      line = word
    } else line = line ? `${line} ${word}` : word
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[\s,.;:]*\S*$/, '') + '…'
  }
  return lines
}

/** The line above the name: family, the god or teacher behind it, and whether it's sealed. */
export const pathKicker = (path: CultivationPath) => {
  const family = `${path.locked ? 'Sealed ' : ''}${path.traditionLabel} path`
  if (!path.thematicFoundation) return family
  return `${family} · ${path.tradition === 'divine' ? `Portfolio of ${path.thematicFoundation}` : path.thematicFoundation}`
}

export const pathCardSvg = ({ path, facets, techniques, spells, cantrips }: PathCardInfo) => {
  const accent = path.accentColor
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`
  const counts = [
    techniques && plural(techniques, 'technique'),
    spells && plural(spells, 'spell'),
    cantrips && plural(cantrips, 'cantrip')
  ].filter(Boolean).join('  ·  ')
  const description = wrap(path.description, 76, 3)
  const rule = 484

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="0.12" cy="0.05" r="0.75">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.95" cy="1" r="0.6">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0a0f"/>
  <rect x="18" y="18" width="1164" height="594" rx="14" fill="#0d0d13" stroke="#2a2a36" stroke-width="2"/>
  <rect x="18" y="18" width="1164" height="594" rx="14" fill="url(#glow)"/>
  <rect x="18" y="18" width="1164" height="594" rx="14" fill="url(#glow2)"/>
  <rect x="18" y="18" width="6" height="594" rx="3" fill="${accent}" opacity="0.7"/>

  <text x="74" y="96" font-family="Cinzel" font-size="24" letter-spacing="4" fill="${accent}">${xml(pathKicker(path).toUpperCase())}</text>

  <text x="68" y="232" font-family="Cinzel" font-size="120" fill="#f5f3eb">${xml(path.name)}</text>
  <text x="74" y="296" font-family="Crimson Pro" font-style="italic" font-size="40" fill="${accent}">${xml(path.concept)}</text>
  ${description.map((line, i) => `<text x="74" y="${360 + i * 44}" font-family="Crimson Pro" font-size="32" fill="#b4b2bd">${xml(line)}</text>`).join('\n  ')}

  <line x1="74" y1="${rule}" x2="1126" y2="${rule}" stroke="${accent}" stroke-opacity="0.25" stroke-width="1.5"/>
  ${facets.length ? `<text x="74" y="${rule + 46}" font-family="Cinzel" font-size="20" letter-spacing="3" fill="${accent}">${xml(facets.join('  ·  ').toUpperCase())}</text>` : ''}
  <text x="74" y="${rule + (facets.length ? 90 : 52)}" font-family="Crimson Pro" font-size="28" fill="#9a9aa8">${xml(counts)}</text>
  <text x="1126" y="${rule + (facets.length ? 90 : 52)}" text-anchor="end" font-family="Cinzel" font-size="18" letter-spacing="4" fill="#8b7355">ESSENCE TALENT SYSTEM</text>
</svg>`
}

export const renderPathCard = (info: PathCardInfo) =>
  new Resvg(pathCardSvg(info), {
    font: { fontFiles: FONTS, loadSystemFonts: false, defaultFontFamily: 'Crimson Pro' }
  }).render().asPng()
