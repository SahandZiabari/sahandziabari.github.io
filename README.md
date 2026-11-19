# Academic website for Sahand Ziabari

A complete static website (no framework, build tools, database or subscription required).

## Files

- `index.html`: Homepage with academic bio, research areas, selected papers, experience and contact.
- `research.html`: Searchable/filterable research publications, grouped by year.
- `teaching.html`: Course portfolio and teaching background.
- `assets/publications.js`: Manually maintained publication records and DOI links.
- `assets/site.js`: Search/filtering, mobile navigation and dark-mode behavior.
- `assets/styles.css`: Styling and responsive layouts.
- `assets/favicon.svg`: Simple initial-based favicon, not a personal portrait.
- `files/Sahand_Ziabari_CV.pdf`: Original CV supplied for the project.

## Preview locally

Open `index.html` in your browser. The site does not require a development server.
You can optionally run `python3 -m http.server 8000` inside this folder, then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a PUBLIC GitHub repository named `<your-github-username>.github.io` if you want a personal root website, or any repository name if you prefer a project URL.
2. Upload **all the files and directories in this folder** to the repository's top level. Keep their relative locations unchanged.
3. Go to the repository **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch** and select `main` / `/(root)`.
4. The site should appear at `https://<your-github-username>.github.io/` for a matching root repository. For other repository names, the URL is typically `https://<your-github-username>.github.io/<repo-name>/`.
5. Edit the content directly on GitHub and commit changes. A site update is deployed when GitHub Pages finishes processing the commit.

## Important edits before publishing

- Review affiliations, dates, academic title and preferred public name, as your CV and public profiles may be updated on different schedules.
- Remove `files/Sahand_Ziabari_CV.pdf` and the CV buttons if you do **not** want your complete, detailed CV posted publicly. The website currently makes your supplied CV downloadable.
- The contact email is the one in your uploaded CV. Edit it in the HTML files if you prefer a university address or a different public email.
- Update publications in `assets/publications.js` to add newly accepted papers; Google Scholar does not automatically sync to this static website.
- To replace the monogram with a real headshot, add an image you own and update the homepage markup and styling.

## Verification and curation

Publications and publication years use the University of Amsterdam institutional profile (https://www.uva.nl/en/profile/m/o/s.s.mohammadi-ziabari/s.s.mohammadi-ziabari.html), DBLP (https://dblp.org/pid/243/4503.html) and your CV, checked on 19 November 2026. The UvA record uses final publication years even when papers appeared online earlier or conferences were held in an earlier year. Google Scholar occasionally blocks automated retrieval; therefore no citation totals, h-index or automated import is claimed.

## Licensing

This code was written as a custom implementation inspired by the clean, year-grouped academic-publishing presentation at https://fp-santos.github.io/research/. It is not a copy of that site's source code or branding.
