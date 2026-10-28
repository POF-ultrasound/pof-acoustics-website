# POF Acoustics website

Source of the public website of the ultrasound & acoustics team in the [Physics of Fluids group](https://pof.tnw.utwente.nl), University of Twente.

- **Live (temporary address):** https://pof-ultrasound.github.io/pof-acoustics-website/
- **Final address:** pof-acoustics.utwente.nl (requested, not live yet)

## I want to…

| Task | Where |
|---|---|
| Add news, a person, a paper, a tool or a position | [CONTRIBUTING.md](CONTRIBUTING.md): copy a template, open a pull request |
| Change colours, fonts or the background | `src/styles/theme.css` and `src/site.config.ts` |
| Change the title, email or address | `src/site.config.ts` |
| Understand the design decisions | [docs/website-spec.md](docs/website-spec.md) |

## How changes go live

1. Make a branch, edit Markdown/YAML in `src/content/`, and open a pull request.
2. A bot comments a **preview link** on the PR (`…/pr-preview/pr-<n>/`). Check your change there.
3. One teammate approves, then you merge. `main` cannot be pushed to directly.
4. The site redeploys automatically within a couple of minutes. It also rebuilds every Monday, so expired positions disappear.

## Viewing the site on your computer

Requires [Node.js](https://nodejs.org) 22.19 or later (macOS: `brew install node`).

```bash
npm install        # once, or after package.json changes
npm run dev        # live preview at http://localhost:4321, refreshes as you edit
```

To check the exact production build instead:

```bash
npm run build && npm run preview
```

## How it works

- Static site built with [Astro](https://astro.build). There are no external requests, cookies or analytics, and fonts are self-hosted.
- `.github/workflows/deploy.yml` builds `main` and publishes it to the `gh-pages` branch, which is served by GitHub Pages. Each run also attaches `site-for-ut-portal`, a build for the domain root that can be uploaded by hand if the UT domain cannot point to GitHub.
- `.github/workflows/preview.yml` publishes each pull request under `pr-preview/pr-<n>/` and removes it when the PR closes.
- `scripts/make-proteus-thumb.mjs` regenerates the PROTEUS card image. Run it with `node`.

## When pof-acoustics.utwente.nl is ready

Ask UT ICT for a CNAME record from `pof-acoustics.utwente.nl` to `pof-ultrasound.github.io`. Then:

1. Add the file `public/CNAME` containing `pof-acoustics.utwente.nl`.
2. In Settings → Secrets and variables → Actions → Variables, set `SITE_URL=https://pof-acoustics.utwente.nl` and `SITE_BASE_PATH=/`.
3. In `.github/workflows/preview.yml`, set `SITE` to `https://pof-acoustics.utwente.nl` and `BASE_PATH` to `/pr-preview/pr-${{ github.event.number }}/`.
4. In Settings → Pages, enter the custom domain and tick "Enforce HTTPS".

## Licence

Code: MIT. Text: CC BY 4.0. Photos and logos: all rights reserved. See [LICENSE-CONTENT.md](LICENSE-CONTENT.md).
