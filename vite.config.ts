import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { PATCH } from './src/data/patchNotesV2'

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Link previews (Discord, WhatsApp, Twitter...) read meta tags from the served HTML
 * and never run the app, so the patch notes get their own copy of index.html with
 * their tags. Netlify serves patch-notes.html at /patch-notes before the SPA rewrite.
 */
const patchNotesPreview = (): Plugin => {
  let outDir = 'dist'
  return {
    name: 'patch-notes-preview',
    apply: 'build',
    configResolved(config) { outDir = resolve(config.root, config.build.outDir) },
    writeBundle() {
      // Netlify sets URL to the site's address; crawlers need absolute links.
      const site = (process.env.URL || '').replace(/\/$/, '')
      const title = `${PATCH.title} · Patch ${PATCH.version}`
      const tags = [
        ['name', 'description', PATCH.summary],
        ['property', 'og:site_name', 'Essence Talent System'],
        ['property', 'og:type', 'article'],
        ['property', 'og:title', PATCH.title],
        ['property', 'og:description', PATCH.summary],
        ['property', 'og:url', `${site}/patch-notes`],
        ['property', 'og:image', `${site}${PATCH.image}`],
        ['property', 'og:image:width', '1200'],
        ['property', 'og:image:height', '630'],
        ['name', 'twitter:card', 'summary_large_image'],
        ['name', 'twitter:title', PATCH.title],
        ['name', 'twitter:description', PATCH.summary],
        ['name', 'twitter:image', `${site}${PATCH.image}`],
        ['name', 'theme-color', '#c9a959']
      ].map(([attr, key, value]) => `    <meta ${attr}="${key}" content="${escape(value)}" />`).join('\n')

      const html = readFileSync(resolve(outDir, 'index.html'), 'utf-8')
        .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
        .replace(/<!-- link-preview:start -->[\s\S]*?<!-- link-preview:end -->/, tags.trimStart())
      writeFileSync(resolve(outDir, 'patch-notes.html'), html)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), patchNotesPreview()],
})
