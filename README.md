# Himanshu Bisht — Portfolio

A responsive, editorial-style portfolio built with **Next.js App Router, React, TypeScript, Tailwind CSS, Three.js, and Lucide icons**. The hero contains a procedural interactive WebGL scene built from original geometry—no stock 3D assets or external model downloads.

## What changed in the 3D redesign

- Original Three.js “systems observatory” scene with an animated data core, orbit lines, telemetry/inventory panels, connected data paths, and sensor-like devices.
- Cursor-parallax interaction, responsive camera framing, capped device pixel ratio, hidden-tab pause, and reduced-motion support.
- Warm editorial palette, oversized serif/sans typography, float-labels, scrolling type band, and more tactile project cards.
- The 3D scene is procedural, so there are no GLB/GLTF files or remote model URLs to break at deployment.

## Start locally

Use Node.js 20.9+ (Node 22 is a good default).

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Before you publish

1. Open `src/data/site.ts` and add your real email and LinkedIn profile URL. These links are intentionally hidden until you fill them in.
2. Add your resume PDF to `public/` and set `resumePath` to its path, for example `/Himanshu-Bisht-Resume.pdf`.
3. Set `NEXT_PUBLIC_SITE_URL` to your production origin (for example, `https://your-domain.com`) in your deployment environment. Metadata, sitemap, and robots output use this value.
4. Review project descriptions and status labels so they accurately reflect what is complete at the time you publish. EnviroTrack is explicitly marked as in progress.
5. Add screenshots or project demo URLs once you have stable public deployments. The project illustration panels are CSS-built mockups, not screenshots of live products.

## Edit content

- Site details and project/skill data: `src/data/site.ts`
- Main page content and sections: `src/app/page.tsx`
- Header and mobile navigation: `src/components/site-header.tsx`
- Project cards and CSS-built illustrations: `src/components/project-card.tsx`
- The interactive Three.js model: `src/components/hero-scene.tsx`. The geometry, lighting, motion, and pointer interaction are defined here.
- Theme, layout, responsive behaviour, hover effects, and reduced-motion handling: `src/app/globals.css` (Tailwind CSS v4 is wired through PostCSS; custom CSS controls the visual system).

## Deploy to Vercel

1. Push the project to a new GitHub repository.
2. Import that repository in Vercel.
3. Keep the default Next.js build settings (`npm run build`).
4. Add your production domain and update the metadata/sitemap origins above.
5. Check the live site at mobile and desktop widths, validate external links, and confirm the contact/resume links before sharing it with recruiters.

## Notes

- The contact links and resume download are driven by `src/data/site.ts` and stay hidden while empty.
- Project metrics have not been fabricated. The environmental monitoring card describes the design scope and labels the work as in progress.
- The telemetry and inventory visual panels are illustrative UI concepts, not claims of live data. The small inventory counts are decorative mockup data.
- No backend or third-party analytics are required for this static portfolio.

## Validation status

TypeScript and TSX syntax parsing passed in the authoring environment. A complete dependency install and production Next.js build could not be run here because the npm registry request timed out. After downloading the project, run `npm install`, `npm run typecheck`, `npm run lint`, and `npm run build` before deploying.
