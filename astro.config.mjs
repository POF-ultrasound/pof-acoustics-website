// @ts-check
import { defineConfig } from 'astro/config';

// SITE and BASE_PATH are overridden in CI for PR previews
// (served from https://<org>.github.io/<repo>/pr-<n>/).
export default defineConfig({
  site: process.env.SITE ?? 'https://pof-acoustics.utwente.nl',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  image: {
    // Photos are processed at build time; no remote images are fetched.
    remotePatterns: [],
  },
  devToolbar: { enabled: false },
});
