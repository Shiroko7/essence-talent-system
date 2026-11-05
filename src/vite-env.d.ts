/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "true" on the beta site (Netlify branch deploys). */
  readonly VITE_BETA?: string
}
