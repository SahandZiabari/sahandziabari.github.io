# Sahand Ziabari | Academic website — v3

GitHub Pages ready, using plain HTML/CSS/JavaScript. Designed for https://sahandziabari.github.io/

## Pages

- `index.html`: homepage, portrait, featured papers, research funding highlights.
- `research.html`: curated publication list, filters, verified publication/PDF links, code where available.
- `grants.html`: **awarded** SUNY Empire AI Fellowship vs. **submitted/in preparation** proposals, with statuses shown.
- `teaching.html`: teaching and supervision.
- `service.html`: reviewing, technical program committees, institutional service.
- `training.html`: professional qualifications, certificates, SUNY training, awards.

## Upload to GitHub Pages

1. Make a backup of your existing GitHub repository.
2. Upload the contents of this ZIP to the **root** of `SahandZiabari/sahandziabari.github.io` on the `main` branch.
3. Preserve the folder structure: `assets/` is a folder, and `files/` is a folder.
4. Replace existing HTML and asset files when asked.
5. GitHub Pages: Settings > Pages > Deploy from branch `main`, `/(root)`.
6. Check all pages, PDF links, and mobile view after deploy.

## Source and verification notes

- All grant amounts and statuses come from the user-provided `CV2025.pdf`; **only the $30,000 AI Fellowship is described as awarded.** The Sloan submission and NSF preparation are not presented as awarded grants.
- Public PDFs use the University of Amsterdam repository, the journal publisher, arXiv, or Research Square as appropriate. No copyrighted publisher PDF was rehosted.
- A task-adaptive debiasing GitHub fork was visible in the user's GitHub screenshot; the repository URL is provided as a link, but its current status has not been independently verified. Other publications do not have made-up code links.
- The new photo was uploaded by the site owner as `IMG_4995.jpeg`; optimized, naturally cropped, no face retouching.
- The `files/Sahand_Ziabari_CV.pdf` copy contains the original supplied academic CV; review contact details and references before sharing a public copy.
- Publication list is curated manually, not live-synced with Google Scholar.

## Maintaining the site

Update publication metadata and PDF/code URLs in `assets/publications.js`. Only add a `code` URL when it matches the paper. Update funding status only when confirmed.


## Public GitHub fork ↔ publication matching (v4)

This release adds `code.html` and `assets/github-repos.js`. They query the public GitHub REST API from the visitor's browser (`GET /users/SahandZiabari/repos`), classify forks, and attempt to link them to the curated 25 publications.

**High-confidence paper links** require a unique DOI or complete title appearing in public repo metadata or README, or an unambiguous exact publication-title/repo-name match. A distinctive title fragment in a repository name alone is shown as a *candidate*, not automatically credited as a paper's implementation. The site does not suggest a fork was authored by Sahand Ziabari merely because it appears under the account.

API calls are anonymous, rate limited by GitHub, and cached client-side for twelve hours. When unavailable, the site retains all paper/PDF links and offers the GitHub repositories page as fallback. No token is embedded. Repository visibility must be Public.

**Do not assume code–paper matches are verified manually:** the public account was not retrievable from the assistant's browsing environment on 19 Nov 2026. Validate the live links and README contents yourself, particularly forks with generic names or forks containing upstream code that does not reproduce paper results. `assets/github-repos.js` has deliberately conservative matching thresholds.

To add a manually verified link to a paper, edit its `code` and `codeLabel` fields in `assets/publications.js`; distinguish your own implementation from a fork in the label.


## Version 5 (research projects, AATOM, visual publication cards)

- `code.html` presents six grouped research-project areas. AATOM source is linked explicitly and attributed to Stef Janssen and collaborators; it is the underlying simulator for the 2023 surrogate-model study, not an assertion that AATOM itself is Sahand's code.
- `research.html` contains six hand-curated featured papers plus a **static fallback** of all 25 research references, so the archive stays visible if JavaScript fails. The site's browser-side search remains available when scripts load.
- Only verified figures from co-authored papers are shown in the research gallery. For documentation, see `FIGURE_SOURCES.md`.
- Paper-to-fork matching is conservative. `owner:@me` GitHub search is an authenticated UI filter and does not expose a machine-readable complete list here. The visitor's browser uses GitHub's public API and tries exact title/DOI matches.
- A paper-titled fork was visible in the account screenshot prior to the account rename: Task-Adaptive-Debiasing-with-SCM-for-Sentiment-Analysis. Its migrated URL is included; **verify the destination**. We do not claim ownership of fork upstream code.
- Selected publications are chosen by recency, research significance and topic diversity, **not** unverified impact factors or unverified citation ranks.

To deploy: upload `assets/` as a nested folder and all HTML pages to the repository root. Verify `assets/styles.css` remains nested under `assets/`. Enable GitHub Pages on branch `main`, folder `/(root)`.

To obtain an auditable input list for manual matching, open the live **Projects & code** tab and use **Export public repository list (.json)** after GitHub API discovery succeeds. Upload that JSON into ChatGPT; it includes only public metadata, no credentials.


### Version 6 figure provenance

The former `assets/thumbs/` concept artwork has been removed. The HTML and JavaScript now only show genuine co-authored publication figures for individually verified papers. Images are served directly from the publisher; see `FIGURE_SOURCES.md` for URLs and attribution.
