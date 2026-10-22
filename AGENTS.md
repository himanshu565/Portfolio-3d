# AGENTS.md

## Setup
- Use Node.js 20.9+ (Node 22 is recommended)
- Run `npm install` before `npm run dev`

## Essential Commands
- `npm run dev`: Start dev server (http://localhost:3000)
- `npm run typecheck` / `npm run lint`: Linting and typechecking
- `npm run build`: Production build

## Deployment
- Vercel: Import GitHub repo, use default Next.js build settings
- Set `NEXT_PUBLIC_SITE_URL` in deployment env
- Add resume PDF to `public/` and set `resumePath`

## Key Files
- `src/data/site.ts`: Site metadata and contact info
- `src/components/hero-scene.tsx`: Procedural Three.js 3D scene (no external models)
- `src/app/globals.css`: Tailwind CSS configuration

## Notes
- Contact/resume links stay hidden until populated
- Environmental monitoring card is design scope only
- No backend or analytics required

## Validation
- Run `npm install`, `npm run typecheck`, `npm run lint`, and `npm run build` before deploying

