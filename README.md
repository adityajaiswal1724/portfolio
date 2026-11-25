# Aditya Jaiswal · Developer Portfolio

A frontend-only portfolio built with Next.js 16, React 19, TypeScript, and custom CSS. It exports to static HTML, CSS, and JavaScript and is ready for Vercel. No database, API key, runtime backend, or paid service is required.

## Local development

Use Node.js 20.9 or later (Node 22 or 24 recommended).

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The preview updates as files change.

## Production

```bash
npm run typecheck
npm run build
npm start
```

The build generates `out/`. `npm start` serves that folder locally; it is a preview utility, not a deployment backend. To preview alongside development, use `PORT=3001 npm start`.

## Deploy to Vercel

1. Push this folder to your GitHub repository and import it in Vercel.
2. Vercel reads `vercel.json`: Next.js, `npm run build`, output directory `out`.
3. Deploy. There are no required environment variables.
4. For a custom domain, set `NEXT_PUBLIC_SITE_URL` to the full HTTPS URL and rebuild. Without it, metadata uses Vercel's production hostname when available. Local builds intentionally do not invent a canonical production URL.

This project has not been deployed by this development task.

## Editing content

- `src/data/portfolio.ts`: identity, email, GitHub, LinkedIn, CV URL, projects, technology groups, and experience.
- `src/app/page.tsx`: biography, research, education, section order, and page composition.
- `src/components/agent-lab.tsx`: verified AI project descriptions and explicitly fictional explanatory transcripts.
- `public/Aditya-Jaiswal-CV.pdf`: the supplied CV, served unchanged with open and download links.
- `public/projects/`: optimized WebP screenshots sourced from the user's GitHub profile.
- `src/app/globals.css`: theme tokens, responsive layout, and component styles.
- `src/app/fonts/`: self-hosted variable WOFF2 fonts and their SIL Open Font License files.

Add social handles to `profile.socials`; only real, supplied URLs should be used. To support another brand icon, update the icon mapping in the contact section. Project source links are optional and omitted when unavailable.

## Interactions and accessibility

- Responsive navigation with active section states and a mobile menu.
- Searchable Command/Ctrl+K menu with keyboard navigation and focus restoration.
- Project categories and native-dialog technical details; Escape closes dialogs.
- Three AI workflow simulations with cancel/reset/replay and keyboard-operable tabs.
- CV open/download, email link, copy email, LinkedIn, and GitHub.
- Scroll reveals and an SVG wireframe sculpture using lightweight transforms.
- OS reduced-motion support and a persistent manual motion toggle. Decorative hero motion pauses outside the viewport.
- Content remains readable before JavaScript loads; no loading screen or scroll interception.

The AI explorer is an illustration, not a live agent: it makes no calls, requests no microphone permission, and sends no data. The finance and operations projects are accurately described as frontend demos in their detail views. Contact uses the visitor's email app.

## Content sources

Reviewed on 25 November 2026:

- GitHub: https://github.com/adityajaiswal1724
- The four public project repository READMEs and manifests linked from the profile.
- The supplied `cv.pdf`.
- LinkedIn URL supplied directly in the chat; it takes precedence over the older link inside the CV.

The CV itself is preserved, including its older profile handles. No project links, roles, or achievements were fabricated. Update the PDF separately when those handles change.

## Asset generation

`src/app/opengraph-image.png` is the included social sharing card. If you change the design, regenerate with `node scripts/generate-social-image.mjs` (uses Sharp, included by Next.js), then rebuild. The favicon is `src/app/icon.svg`.

## Verification completed

- TypeScript validation and production static export passed.
- Chrome checks at 320px, 390px, 768px, and 1440px widths: no horizontal overflow.
- Verified project categories, details dialogs, Escape/focus restoration, command search, mobile menu, keyboard tabs, simulations, cancellation, motion pause, and reduced motion.
- All five screenshot assets load; the CV returns a valid 161,356-byte PDF. Email copy works.
- Five live demos and GitHub returned HTTP 200. LinkedIn blocks automated checks; the supplied profile URL is retained.
- Production Chrome console: no warnings or errors.
- Local Chrome lab traces: desktop LCP 593ms / CLS 0; mobile viewport with Fast 4G and 4× CPU slowdown LCP 812ms / CLS 0. These are local measurements, not a guarantee of deployed field performance.
