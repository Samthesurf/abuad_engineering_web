# ABUAD College of Engineering OBE Portal

**A searchable, navigable home for the college's engineering and Outcomes-Based Education material.**

A lot of academic information is technically available but practically difficult to use. It sits in handbooks, course compact documents, departmental notes, and photo folders. This project turns that material into an interface that a student, lecturer, administrator, or visitor can actually move through.

The portal is built around the College of Engineering at Afe Babalola University. It presents general college information, departmental profiles, programme history, educational objectives, course learning outcomes, course outlines, lecture plans, handbooks, OBE mappings, and a media gallery.

## What a visitor can explore

- The college mission, vision, history, and quality benchmarks.
- The Provost's desk and general college information.
- Department profiles for the engineering programmes represented in the data.
- Programme Educational Objectives and COREN-aligned Programme Outcomes.
- Course-level information, including CLOs, overviews, references, and prerequisites.
- Weekly course outlines and lecture-plan compacts.
- Course-to-Programme-Outcome mapping.
- Student and departmental handbooks.
- A media gallery grouped around OBE meetings, training, student projects, site visits, and college activities.

The navigation uses hash routes, so a selected department, subsection, and course can be linked and revisited without turning the site into a large bundle of separate pages.

## The codebase has two halves

### The interface

`src/App.jsx` owns the route state and decides which view to render. Components under `src/components/` handle the welcome page, general information, gallery, Provost's desk, and the OBE sections.

### The data assembly

The large `src/collegeData.js` file is the browser's consolidated data source. The repository also contains parsing and assembly scripts used while turning course and college source material into structured data.

That distinction matters. The UI is not just a set of cards with text pasted into JSX. It is a data-driven portal where the same department and course model powers the profile, outcomes, outlines, lecture plans, and mapping views.

## Stack

- React 19
- Vite 8
- JavaScript and JSX
- Plain CSS with component-level styles
- Static image and document assets
- Cloudflare Pages deployment configuration

## Project map

```text
src/
├── components/             Navigation, gallery, general pages, and OBE views
├── components/obe/         Department, course, handbook, and mapping screens
├── hooks/                  Hash-route and course selection helpers
├── assets/                 College photography, logos, and visual material
├── collegeData.js          Consolidated college and course content
├── App.jsx                 Route state and page composition
└── main.jsx                Application entry point

assemble_college_data.py    Data assembly helper
parse_*.py                  Source parsing helpers
public/                     Static public assets
```

## Run it locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

Before building a deployable version:

```bash
npm run lint
npm run build
```

Cloudflare Pages commands are included for preview and production deployments:

```bash
npm run cf:deploy:preview
npm run cf:deploy:prod
```

## Why this project matters

The interesting work here is not a complicated backend. It is the translation from institutional material into a structure that is easier to understand, browse, and maintain.

A student should be able to move from a department profile to a course, from that course to its CLOs, and then to the outcomes it supports. An administrator should be able to see the logic behind the OBE material instead of searching through unrelated files. The README is now describing that journey because the application itself is built around it.