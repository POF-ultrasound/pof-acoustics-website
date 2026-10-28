# POF Acoustics website — specification

Agreed design for the public website of the acoustics/ultrasound team of the Physics of Fluids (POF) group, University of Twente.

- Repo: https://github.com/POF-ultrasound/pof-acoustics-website (public)
- Domain: `pof-acoustics.utwente.nl` (requested)
- Language: English only

## Purpose

A general, sober, scientific site that:

- distributes the team's software and datasets
- reports brief news
- presents the research themes, people and publications
- doubles as an internal launchpad to the team's tools

Rule of thumb: **concise and long-lived**. Everything except News, Publications and open positions should rarely need editing. The site does no more than this.

## Stack and workflow

- **Astro** static site. All content lives in Markdown/YAML files, so editors never touch layout code.
- Design tokens (colours, fonts, spacing, radii) live in one `theme.css`.
- `main` is protected: every change goes through a PR with at least one approval.
- PR previews come from GitHub Actions (`pr-preview-action`), published under `…github.io/pof-acoustics-website/pr-<n>/` with the link posted on the PR.
- Production deploys automatically on merge:
  - If UT ICT agrees to a CNAME, the site is served from GitHub Pages.
  - Otherwise, each merge produces an upload-ready build that one of the 2–3 portal holders uploads to the UT portal.
  - The site itself works the same either way.
- Only free, open-source tools the team controls.
- `CONTRIBUTING.md` holds copy-paste templates (news post, person, publication, tool, position) and a short PR checklist. No other tooling: no issue templates, no bots.

## Privacy and sovereignty

- The site makes no third-party requests: fonts are self-hosted, there are no embeds, no analytics, no cookies and no search.
- The map is a plain outbound link.
- All personal links (email, ORCID, Scholar, GitHub, LinkedIn) are optional per person.

## Identity

- **Title**: POF Acoustics. **Tagline**: *Ultrasound & acoustics research in the Physics of Fluids group, University of Twente*.
- **Logos**: UT and POF only, in the header and footer, plus a team logo in the future. Funder logos appear only on project cards.
  - Temporary logo files come from the POF site; official files will follow.
- **Fonts**: the UT font appears only through the UT logo file. Open, self-hosted fonts are used everywhere else.
- **Palette**: neutral greys plus one accent. Three options will be previewed and the team picks one. It can be changed later by editing `theme.css` only.
- **Dark mode**: not in v1. Tokens are structured from day one so it can be added straight after the content stabilises (first post-launch task).

## Sitemap

### Home

1. A one-sentence mission line over a team image (e.g. a super-resolution vascular map).
2. Research theme tiles in a single horizontally scrolling row.
3. Featured tools (PROTEUS at launch).
4. The latest 3 news items.
5. Hiring banner at the bottom, shown only while a non-expired position exists.

### Research

Theme blocks: **microbubble dynamics**, **ultrasound super-resolution**, **contrast-enhanced ultrasound** and **cavitation**.

- These are provisional and will be refined with the team. Their text is lorem ipsum until then; no invented content.
- Each block has 2–3 sentences, one figure, and links to its filtered publications, related tools and people.

**Projects** are cards, each a Markdown file tagged to a theme. A card has the title, one line of description, the funder logo, the dates, and links.

- The first card is ERC **SuperFALCON** (lorem ipsum description).

### Software & Data

- **Software**: cards, each opening one short page. The page has a summary, one figure, links (repo, docs, DOI) and a "how to cite" block.
  - At launch: **PROTEUS** only.
  - Other tools are added once they have a tagged GitHub release.
  - Documentation stays with each project, not on the site.
- **Datasets**: same card + short page format.
- **Lab tools**: a compact list (name, one line, GitHub link) of post-processing and internal repos. Private repos are tagged 🔒 *org access*.

### Publications

- Source: a curated `publications.bib`, seeded from 2022 onward (roughly the start of SuperFALCON) and kept to papers within the team's research themes.
- Shown grouped by year, with a filter by theme (not by tool).
- Team members' names in bold.
- Each entry links to its DOI, an open-access PDF, and its code/data where available.
- Curation is done by editing the `.bib` directly; an `exclude` key hides an entry without deleting it. Untagged entries are flagged visibly in previews.
- No citation metrics.

### News

- One Markdown file per post, in year folders (`news/2026/2026-10-28-slug.md`).
- A post has a title, date, tags, 1–3 sentences, and an optional outbound `link:`. Examples: a new paper, a conference, a summer school, a position opening.
- 10 posts per page, plus an RSS feed.

### People

Uniform cards grouped as:

1. PIs / staff
2. Postdocs
3. PhD candidates
4. Support staff
5. MSc / interns

Then a collapsed **Alumni** list (name, plus subject if known).

- **Card**: photo, name, role, one-line topic, optional links. There are no individual profile pages.
- **Photos**: POF website photos by default. Where POF has none, a team-styled initials avatar. Anyone who objects is switched to their own picture or the avatar. The build crops and resizes all photos to a uniform square WebP.
- **Data**: one YAML entry per person. Moving someone to alumni means changing one field.
- **Initial roster**:
  - PIs: Guillaume Lajoinie, Michel Versluis.
  - Hermen de Roo, Rienk Zorgdrager, Fleur Vialle, Annemarie Linnenbank, Annas Hameddine, Nynke Nell, Jelle Plomp, Elke Putman, Theodore Michel.
  - Roles are taken from the POF pages; any not found are marked `role: TBD` and flagged.
  - Others are added later by PR.

### About

Long-lived content only:

- A short team paragraph (lorem ipsum for now).
- A link to the main POF group site.
- **Teaching**: courses taught by team members.
- **Events**: recurring summer schools and conferences organised or chaired by the PIs.

One-off events go to News.

### Contact

- **Open positions**: shown only when one exists. Each has a title, a short paragraph and a link to the project page or description file. It disappears automatically after its `expires` date.
- Email: g.p.r.lajoinie@utwente.nl (for now).
- POF postal address and a map link. No contact form.

## Licences

- Code: MIT.
- Text content: CC BY 4.0.
- Photos, logos and personal data: excluded, all rights reserved / used with permission.

## Out of scope for v1

Dark mode (first follow-up), search, analytics, a CMS, per-person pages, a contact form, multilingual support.

## Open items (content, not design)

- Answer from UT ICT on CNAME vs. portal upload.
- Official UT and POF logo files.
- Theme texts and figures, plus the mission line.
- Remaining roster and alumni list.
- Links and DOIs for further tools and datasets.
- A functional team mailbox, if one becomes available.
