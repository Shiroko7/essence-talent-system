import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { LATEST_PATCH, PATCHES, type PatchMeta } from './src/data/patchNotes'
import { RULES_PREVIEW } from './src/data/attunementRules'

interface Preview {
  /** Route, served from `${route}.html` by a rule the build adds to _redirects. */
  route: string
  title: string
  tabTitle: string
  description: string
  image: string
  type: 'article' | 'website'
}

const patchPreview = (route: string, patch: PatchMeta): Preview => ({
  route,
  title: patch.title,
  tabTitle: `${patch.title} · Patch ${patch.version}`,
  description: patch.summary,
  image: patch.image,
  type: 'article'
})

const PREVIEWS: Preview[] = [
  // The bare route previews the latest patch; each version keeps its own URL and preview for good.
  patchPreview('patch-notes', LATEST_PATCH),
  ...PATCHES.map(patch => patchPreview(`patch-notes/${patch.slug}`, patch)),
  { route: 'rules', title: RULES_PREVIEW.title, tabTitle: RULES_PREVIEW.title, description: RULES_PREVIEW.summary, image: RULES_PREVIEW.image, type: 'website' }
]

/** The beta site is a Netlify branch deploy; netlify.toml sets VITE_BETA there. */
const isBeta = process.env.VITE_BETA === 'true'

/** Keeps the beta site out of search results; the per-route preview pages copy index.html, so they get it too. */
const betaNoindex = (): Plugin => ({
  name: 'beta-noindex',
  apply: 'build',
  transformIndexHtml: html =>
    isBeta ? html.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>') : html
})

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Link previews (Discord, WhatsApp, Twitter...) read meta tags from the served HTML
 * and never run the app, so shareable pages get their own copy of index.html with
 * their tags, and a rule in _redirects serves `${route}.html` at /route.
 */
const linkPreviews = (): Plugin => {
  let outDir = 'dist'
  return {
    name: 'link-previews',
    apply: 'build',
    configResolved(config) { outDir = resolve(config.root, config.build.outDir) },
    writeBundle() {
      // Netlify sets URL to the public site and DEPLOY_PRIME_URL to this branch's address (the beta site);
      // crawlers need absolute links.
      const site = ((isBeta ? process.env.DEPLOY_PRIME_URL : process.env.URL) || '').replace(/\/$/, '')
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
        const file = resolve(outDir, `${page.route}.html`)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, html)
      }

      // Netlify uses the first rule that matches, so these go before the SPA catch-all.
      const redirects = resolve(outDir, '_redirects')
      const rules = PREVIEWS.map(page => `/${page.route}    /${page.route}.html   200`).join('\n')
      writeFileSync(redirects, `${rules}\n${readFileSync(redirects, 'utf-8')}`)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), betaNoindex(), linkPreviews()],
})
