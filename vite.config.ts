import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { PATCH } from './src/data/patchNotesV2'
import { RULES_PREVIEW } from './src/data/attunementRules'

interface Preview {
  /** Route, served from `${route}.html` (see public/_redirects). */
  route: string
  title: string
  tabTitle: string
  description: string
  image: string
  type: 'article' | 'website'
}

const PREVIEWS: Preview[] = [
  { route: 'patch-notes', title: PATCH.title, tabTitle: `${PATCH.title} · Patch ${PATCH.version}`, description: PATCH.summary, image: PATCH.image, type: 'article' },
  { route: 'rules', title: RULES_PREVIEW.title, tabTitle: RULES_PREVIEW.title, description: RULES_PREVIEW.summary, image: RULES_PREVIEW.image, type: 'website' }
]

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Link previews (Discord, WhatsApp, Twitter...) read meta tags from the served HTML
 * and never run the app, so shareable pages get their own copy of index.html with
 * their tags. Netlify serves `${route}.html` at /route before the SPA rewrite.
 */
const linkPreviews = (): Plugin => {
  let outDir = 'dist'
  return {
    name: 'link-previews',
    apply: 'build',
    configResolved(config) { outDir = resolve(config.root, config.build.outDir) },
    writeBundle() {
      // Netlify sets URL to the site's address; crawlers need absolute links.
      const site = (process.env.URL || '').replace(/\/$/, '')
      const index = readFileSync(resolve(outDir, 'index.html'), 'utf-8')
      // Chat apps cache previews by image URL, so a changed image needs a new URL.
      const versioned = (path: string) =>
        `${site}${path}?v=${createHash('sha1').update(readFileSync(resolve(outDir, path.slice(1)))).digest('hex').slice(0, 8)}`
      for (const page of PREVIEWS) {
        const image = versioned(page.image)
        const tags = [
          ['name', 'description', page.description],
          ['property', 'og:site_name', 'Essence Talent System'],
          ['property', 'og:type', page.type],
          ['property', 'og:title', page.title],
          ['property', 'og:description', page.description],
          ['property', 'og:url', `${site}/${page.route}`],
          ['property', 'og:image', image],
          ['property', 'og:image:width', '1200'],
          ['property', 'og:image:height', '630'],
          ['name', 'twitter:card', 'summary_large_image'],
          ['name', 'twitter:title', page.title],
          ['name', 'twitter:description', page.description],
          ['name', 'twitter:image', image],
          ['name', 'theme-color', '#c9a959']
        ].map(([attr, key, value]) => `    <meta ${attr}="${key}" content="${escape(value)}" />`).join('\n')

        const html = index
          .replace(/<title>.*?<\/title>/, `<title>${escape(page.tabTitle)}</title>`)
          .replace(/<!-- link-preview:start -->[\s\S]*?<!-- link-preview:end -->/, tags.trimStart())
        writeFileSync(resolve(outDir, `${page.route}.html`), html)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), linkPreviews()],
})
