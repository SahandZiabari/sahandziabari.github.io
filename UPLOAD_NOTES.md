# Website update: Version 11 fork matching + doctoral/postdoctoral co-supervision

This ZIP contains only 9 changed files. It merges the **Version 11** fork-to-paper matching update with a new co-supervision section.

## Root (upload to the repository root)
- `index.html` — homepage supervision highlight and unchanged V11 fork-matching features
- `research.html` — supervision cross-link and unchanged V11 research features
- `code.html` — Version 11 code/fork matching page
- `teaching.html` — new detailed **Doctoral & Postdoctoral Co-supervision** section (`#doctoral-supervision`)
- `experience.html` — research mentorship overview and link to the above section

## `assets/` folder (upload into GitHub's existing assets/ folder)
- `styles.css` — supervision cards, responsive layout, dark-mode support
- `site.js` — V11 user-interface logic
- `github-repos.js` — V11 fork matcher
- `publications.js` — V11 archive plus the 2026 Imani and Salarabadi publications

### Documented people
- Aydin Imani — current postdoctoral researcher; related 2026 Chemical Engineering Journal Advances article
- Hassan Salarabadi — current PhD researcher; related 2026 Information review
- Navid Rezaei — current PhD researcher; supplied LinkedIn profile, no paper assumed
- Matthieu Vert — former PhD researcher; related 2025 Aerospace article

**Supervisory roles are provided by the profile owner.** External publisher pages corroborate co-authorship in the related articles, not official supervisor appointments. The article lists **Matthieu** Vert (not Mattew).

### Upload instructions
1. Extract this ZIP.
2. Upload the five root HTML files at `https://github.com/SahandZiabari/sahandziabari.github.io/upload/main`.
3. Open the repository's existing `assets/` folder and upload the four files from the ZIP's `assets/` folder there (not in root).
4. Commit the changes.
5. After deployment reload your homepage and visit `/teaching.html#doctoral-supervision`.

No CV PDF, portrait, certificates, or other site files are replaced.
