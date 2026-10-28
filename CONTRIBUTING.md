# Contributing

All content is plain Markdown or YAML in `src/content/`. You do not need to touch any code.

**Workflow:** edit or add a file on a branch, either on GitHub ("Add file" / ✏️) or locally, then open a pull request. A bot posts a **preview link** on the PR. Check it, then ask one reviewer. Once it is merged into `main`, the site updates automatically.

Copy a template below, fill it in, and delete the optional lines you don't need.

---

## News post

`src/content/news/<year>/<yyyy-mm-dd>-<short-slug>.md`

```markdown
---
title: New paper on microbubble shell buckling in JFM
date: 2026-11-03
tags: [paper]                      # e.g. paper, conference, defense, award, team, position
link: https://doi.org/10.xxxx/xxxx # optional: one outbound link
linkLabel: Read the paper          # optional, defaults to "Read more"
---

One to three sentences. Keep it brief, and point to the link for details.
```

## Person

`src/content/people/<firstname-lastname>.yaml`

```yaml
name: Jane Doe
group: phd            # pi | postdoc | phd | support | student
role: PhD candidate
topic: One-line research topic       # optional
photo: ../../assets/people/jane-doe.jpg   # optional; without it an initials avatar is shown
photoPosition: top    # optional crop: top (default) | center | attention | ...
# All of the following are optional. Add them only if the person agrees.
email: j.doe@utwente.nl
orcid: 0000-0000-0000-0000
scholar: https://scholar.google.com/citations?user=XXXX
github: janedoe
linkedin: https://www.linkedin.com/in/janedoe
website: https://example.org
aliases: [J. Doe]     # optional: name variants used in author lists (for bold names)
```

- **Photo:** any reasonably sized JPG or PNG in `src/assets/people/`. The site crops it to a square and resizes it.
- **Leaving:** set `status: alumni`, optionally add `years: 2021–2025`, and remove the photo and links if the person prefers.

## Publication

Add the BibTeX entry to `src/content/publications.bib`. You can get it with `curl -LH "Accept: application/x-bibtex" https://doi.org/<DOI>`, or from the journal site. Then add:

```bibtex
  themes = {microbubble-dynamics, cavitation},   % ids of files in src/content/themes/
  code = {https://github.com/...},               % optional
  data = {https://doi.org/...},                  % optional
  pdf = {https://...},                           % optional, open-access version
```

- **Fixing an entry:** edit the fields directly.
- **Hiding an entry:** add `exclude = {true}`. This keeps it in the file but hides it from the site.
- **Team names** are bolded automatically. If a name is not bolded, add the variant to that person's `aliases`.

## Software or dataset

`src/content/tools/<slug>.md`. Add a tool only once it has a tagged release.

```markdown
---
name: ToolName
kind: software        # software | dataset
summary: One sentence.
themes: [ultrasound-super-resolution]
repo: https://github.com/POF-ultrasound/toolname
docs: https://...      # optional
doi: 10.5281/zenodo.xxxxxxx   # optional
license: MIT           # optional
image: ../../assets/tools/toolname.png   # optional figure
imageAlt: Short description of the figure
featured: false        # true = shown on the homepage
citation: |
  A. Author, B. Author, "Title," Journal, 2026.
---

Two or three short paragraphs at most. Full documentation belongs in the tool's own repo or docs.
```

**Lab tools** (internal or post-processing repos, shown as a compact list): add an entry to `src/content/lab-tools.yaml`.

## Open position

`src/content/positions/<slug>.md`. It disappears from the site automatically after `expires`.

```markdown
---
title: PhD position in ultrasound super-resolution
summary: One or two sentences.
link: https://utwente.nl/en/organisation/careers/...   # optional: full vacancy
expires: 2026-12-31
---

Optional short paragraph.
```

## Research theme / project

- **Themes:** `src/content/themes/<id>.md` (`title`, `summary`, `order`, optional `image`), with a short body underneath.
- **Projects:** `src/content/projects/<slug>.md` (`title`, `summary`, `themes`, `funder`, optional `funderLogo`, `start`, `end`, `url`).

## Teaching & recurring events

`src/content/teaching.yaml` and `src/content/events.yaml`. Each entry needs `id`, `title`, and optionally `description` and `url`. List long-lived items only: one-off events go in News.

---

## Changing the look

All colours, fonts and spacing live in `src/styles/theme.css`. Site title, email, address, the palette and the background illustration (`palette`, `background`) live in `src/site.config.ts`.

## Running locally (optional)

Requires Node ≥ 22.19.

```bash
npm install
npm run dev     # http://localhost:4321
```
