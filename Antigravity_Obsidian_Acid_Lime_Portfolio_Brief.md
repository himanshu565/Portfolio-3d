# Antigravity Implementation Brief — Obsidian / Acid Lime Portfolio Redesign

> **Goal:** Finish the existing portfolio design to a polished, production-ready standard using a cinematic 3D visual direction. Do not create a disconnected demo or replace the project wholesale. Inspect the current repository, understand its structure, then improve the existing implementation in place.

## 1. Mission and quality bar

Redesign the existing Next.js / React / Three.js developer portfolio into a distinctive, cinematic personal website for a full-stack developer focused on MERN, scalable systems, and AI-powered applications.

The site should feel like an immersive digital art direction paired with credible engineering work—not a generic dark developer template.

**Creative direction:** Obsidian black, acid-lime accents, sculptural metallic 3D objects, controlled rim lighting, atmospheric depth, oversized editorial typography, restrained glass surfaces, and precise motion.

**Primary rule:** Make the world dark, the objects dimensional, and the lime unforgettable. Do not cover every component in neon or glow.

**Definition of done:** The design is cohesive across every section and breakpoint; navigation and links work; 3D effects are performant and have fallbacks; there are no broken assets, console errors, TypeScript errors, or lint errors introduced by this work.

---

## 2. Mandatory workflow — inspect before editing

1. Inspect the repository structure, `package.json`, Next.js version, Tailwind version, app entry points, existing components, installed Three.js libraries, assets, and current lint/build scripts.
2. Identify the actual current implementation and keep existing working features, content, routes, metadata, project links, and integrations unless a change is necessary.
3. Check whether the project uses the App Router or Pages Router and whether Tailwind is v3 or v4. Follow the installed versions; do not blindly paste configuration for a different version.
4. Inspect existing 3D implementation and reuse/refactor it where practical. Do not install a second 3D stack if an adequate one is already present.
5. Write a concise checklist of the implementation plan, then implement the full redesign. Do not stop after the audit or only produce a plan.
6. Work in small, coherent changes. After each major stage, run relevant checks and fix regressions before continuing.
7. At the end, report what changed, what was verified, any remaining limitations, and the exact commands/results for lint, typecheck, and production build.

**Important:** Do not claim a check passed unless you actually ran it. Do not hide errors by disabling lint rules, weakening TypeScript, or suppressing warnings globally.

---

## 3. Brand and color system

Use semantic design tokens. Do not scatter raw hex codes through components.

### Core tokens

| Token | Hex / value | Use |
|---|---|---|
| `--color-void` | `#050705` | Main page background |
| `--color-obsidian` | `#0D120D` | Main panels and section surfaces |
| `--color-surface` | `#151D16` | Elevated cards, menus |
| `--color-border` | `#263326` | Subtle borders and separators |
| `--color-acid` | `#C6FF00` | Main CTA, active navigation, selected words |
| `--color-acid-hover` | `#A3E600` | Hover and active button state |
| `--color-glow` | `#7CFF8A` | 3D rim light and restrained glow |
| `--color-mint` | `#56E39F` | Secondary accent and success state |
| `--color-text` | `#F3F6F0` | Headings and primary copy |
| `--color-text-secondary` | `#A7B3A8` | Body copy |
| `--color-text-muted` | `#879587` | Metadata only when contrast is sufficient |
| `--color-error` | `#FF4D4D` | Error feedback |

Use `#687A68` only for nonessential decorative details—not small text on the dark background. Check actual contrast for all text and UI combinations.

### Gradients

- **Accent:** `linear-gradient(115deg, #C6FF00 0%, #7CFF8A 55%, #56E39F 100%)`
- **Atmosphere:** soft radial green light fading to transparent over `#050705`.
- **Glass:** subtle translucent dark fill with a thin low-contrast border; blur only where it adds depth.
- **Avoid:** rainbow gradients, bright green page backgrounds, heavy neon outlines around every card, and excessive drop shadows.

### CSS variables

Add or consolidate tokens in the existing global stylesheet. Adapt syntax to the actual Tailwind version. Keep one source of truth for colors.

```css
:root {
  color-scheme: dark;
  --color-void: #050705;
  --color-obsidian: #0D120D;
  --color-surface: #151D16;
  --color-border: #263326;
  --color-acid: #C6FF00;
  --color-acid-hover: #A3E600;
  --color-glow: #7CFF8A;
  --color-mint: #56E39F;
  --color-text: #F3F6F0;
  --color-text-secondary: #A7B3A8;
  --color-text-muted: #879587;
  --color-error: #FF4D4D;
  --gradient-accent: linear-gradient(
    115deg, #C6FF00 0%, #7CFF8A 55%, #56E39F 100%
  );
  --gradient-atmosphere:
    radial-gradient(ellipse at 72% 35%,
      rgba(124, 255, 138, 0.13), transparent 48%),
    radial-gradient(ellipse at 15% 80%,
      rgba(198, 255, 0, 0.055), transparent 42%);
  --shadow-lime: 0 0 24px rgba(198, 255, 0, 0.16);
  --shadow-card: 0 20px 70px rgba(0, 0, 0, 0.36);
}
```

Use the existing font loading approach if sound. Preferred pairing: **Space Grotesk** for display headings and **Inter** for UI/body text. For Next.js production, use `next/font/google` if fonts are available at build time; otherwise retain the project's existing reliable font setup. Avoid adding a runtime dependency on a remote CSS import unnecessarily.

---

## 4. Typography and layout

Use a bold editorial hierarchy with generous negative space.

- Hero heading: desktop approximately `clamp(2.8rem, 6.6vw, 5.5rem)`, tight line height, negative letter spacing.
- Section headings: `clamp(2rem, 4vw, 3rem)`.
- Project headings: approximately `1.5–1.8rem`.
- Body: `1rem`, line height around `1.65`.
- Eyebrows/metadata: `0.75–0.875rem`, uppercase, moderate tracking.
- Content width: approximately `1200–1360px`, with fluid side padding.
- Use a consistent spacing scale and consistent corner radii.
- Avoid overusing pill shapes, bordered containers, tiny labels, or centered text for every section.
- Keep mobile hero typography readable and prevent overflow.

Use a restrained grid and deliberate asymmetry. The site should look art-directed, not like every section was assembled from the same card component.

---

## 5. Page experience and sections

Preserve existing routes and meaningful content. Adapt section names to the current codebase rather than duplicating existing sections.

### A. Navigation

- Minimal brand mark/name at left and concise navigation at right.
- Transparent or subtly tinted surface over the hero; add a dark translucent background on scroll only if useful.
- Active/hover state uses acid lime, not a large glowing pill.
- Include a prominent but restrained contact CTA.
- Mobile navigation must be keyboard accessible and actually open/close.
- All anchor links and route links must resolve correctly.

### B. Hero — highest priority

Build a cinematic first viewport with a layered composition:

- Eyebrow: `FULL STACK DEVELOPER · AI BUILDER · PROBLEM SOLVER` (adjust to the owner's real positioning).
- Large headline, for example: **“Building intelligent solutions.”** Highlight only one phrase in acid lime.
- Short supporting paragraph emphasizing scalable web applications, AI-powered systems, and thoughtful engineering. Keep it credible and specific.
- Primary CTA: `Explore my work`; secondary CTA: `About me` or `Get in touch`.
- Optional compact proof points only if supported by real experience/project information. Do not invent years of experience, user counts, project counts, employers, or performance metrics.
- Hero 3D scene should occupy the opposite side or sit behind the content with a controlled overlap. Text contrast always takes priority.
- Include a subtle scroll cue only if it does not clutter the viewport.

The hero should have a recognizable signature object—e.g. a fractured dark metallic monolith, floating geometric core, or custom faceted sculpture—with lime rim light and a few orbiting fragments. Avoid a generic spinning primitive as the final design.

### C. About

- Clear personal introduction and engineering philosophy.
- Show full-stack, backend/system thinking, and AI interests as grounded in actual experience.
- Use a strong visual counterpart: monochrome portrait if a real asset exists, or a custom abstract 3D/graphic motif if not.
- Do not invent biography, employers, qualifications, or achievements.
- Keep text concise and scannable.

### D. Skills / capabilities

- Group skills by meaningful categories, e.g. Frontend, Backend & APIs, Data & Infrastructure, AI & Systems.
- Only list technologies supported by existing content or the owner’s actual skills.
- Use restrained text-led treatments or compact rows, not a wall of neon badges.
- Avoid fake proficiency percentages and animated skill meters.

### E. Selected projects

Make real projects the portfolio's strongest proof of ability.

- Inspect the existing project data and links before editing.
- Prioritize the most complete, demonstrable projects. A project under active development must be clearly labelled as in progress.
- Each project should explain the problem, the engineering approach, the relevant stack, and the outcome where verified.
- Use large, high-quality project visuals, deliberate crop ratios, dark framing, and restrained lime interaction states.
- Provide working repository/demo links when they exist. Never invent URLs.
- Avoid generic stock imagery that falsely implies a screenshot of the actual product.
- Add clear hover/focus states and a visible interaction cue.
- Do not bury important project information behind hover-only behavior.

### F. Experience / process

- Present verified experience and relevant work in a clean timeline or editorial layout if the existing content supports it.
- Emphasize ownership, technical decisions, reliability, and delivery.
- Never fabricate employment dates, titles, responsibilities, or outcomes.

### G. Contact / footer

- Memorable closing line and one obvious contact action.
- Preserve verified email, LinkedIn, GitHub, and other profile links from the existing project.
- Do not expose secrets or environment variables.
- Ensure links are keyboard accessible and clearly identifiable.

---

## 6. Three.js art direction

### Lighting

Use a physical studio-lighting approach instead of making every object emissive:

1. **Key light:** acid lime `#C6FF00`, starting intensity around `2–4` for a suitable directional/spot light.
2. **Rim light:** neon mint `#7CFF8A`, starting intensity around `3–5`, positioned behind/side of the sculpture.
3. **Fill light:** forest green `#304B36`, starting intensity around `0.5–1`.
4. Low ambient fill to preserve shadow detail.
5. Optional subtle ground reflection or atmospheric particles.

These are starting values only; tune based on light type, material, renderer exposure, and tone mapping. Do not assume identical intensity values across light types.

### Materials and objects

- Use `MeshStandardMaterial` or `MeshPhysicalMaterial` for metallic objects, with controlled `metalness` and `roughness`.
- Use emissive materials only for select lime seams, rings, or details.
- Create depth with different object sizes, positions, and movement speeds.
- Keep particle count modest and intentional.
- Avoid a scene full of glowing wireframes, random cubes, or spinning objects without visual purpose.
- If a bloom post-processing pass is already installed, configure it selectively with a high threshold. Do not add a heavy post-processing dependency unless it improves the result enough to justify its cost.

### Motion

- Slow idle rotation and gentle float; motion should feel weighted, not frantic.
- Subtle pointer parallax on capable devices.
- Scroll-driven transitions only when they help the narrative and do not interfere with reading.
- Do not make text, nav, or CTAs depend on a canvas animation.
- Honor `prefers-reduced-motion`.
- Pause animation when the document is hidden where practical.
- Do not use continuous high-cost state updates in React; use Three.js/R3F frame-loop patterns appropriately.

### Next.js integration

- Keep browser-only WebGL code in Client Components.
- If the existing setup requires it, dynamically import the 3D scene with SSR disabled from a Client Component.
- Do not import browser-only libraries from a Server Component.
- Provide a static CSS/image fallback while the scene loads and when WebGL is unavailable.
- Set sensible DPR limits, e.g. `[1, 1.5]`, and test on mobile.
- Prevent the canvas from intercepting pointer events unless interaction is intentional.
- Clean up animation loops, event listeners, observers, and GPU resources correctly.
- Avoid hydration mismatch warnings.

---

## 7. Motion design and interaction

Create a coherent motion language, not animation for its own sake.

- Section reveals: short fade/translate with restrained stagger.
- Buttons: subtle background shift and `translateY(-1px or -2px)`.
- Project cards: small image/visual scale change and border tint on hover.
- Navigation: smooth but quick transitions.
- 3D sculpture: slower motion than the UI.
- Keep most UI transitions around `160–280ms`.
- Avoid excessive custom cursors, scroll hijacking, long intro loaders, flashing effects, and animations that delay access to content.
- Support keyboard focus, touch, and reduced motion.

Use CSS transitions first; reuse the animation library already installed. Do not add multiple competing animation libraries.

---

## 8. Accessibility and contrast

- Meet WCAG AA where applicable: at least `4.5:1` contrast for normal text and `3:1` for large text and meaningful UI boundaries.
- Verify actual color pairs; do not assume all muted green text is readable.
- `#F3F6F0` on `#050705` is the default primary text pairing.
- `#A7B3A8` on `#050705` is the default secondary copy pairing.
- `#050705` on `#C6FF00` is the primary CTA pairing.
- Use acid lime on dark surfaces for highlights, but do not use it for every paragraph.
- Focus rings must be visible, at least 2px, with an offset.
- Provide accessible names and labels for icon-only controls.
- Make navigation, mobile menus, dialogs, and forms keyboard accessible.
- Use semantic heading order, landmarks, descriptive alt text, and useful link labels.
- Do not rely on color alone to communicate status.
- Respect `prefers-reduced-motion`.
- Ensure essential text is real HTML, never baked into an image or rendered only in WebGL.

---

## 9. Performance and responsive behavior

Treat performance as part of the design.

- Target a fast first contentful view; show hero copy and CTAs without waiting for the 3D scene.
- Lazy-load below-the-fold sections and expensive 3D content where appropriate.
- Compress and size images properly; prefer modern formats supported by the project.
- Avoid unnecessarily large GLTF models and oversized textures.
- Use `next/image` for local/remote images where appropriate and configure remote hosts correctly if needed.
- Avoid layout shifts: define image and canvas dimensions/aspect ratios.
- On small screens, simplify the 3D scene or use a static fallback. Do not merely shrink the desktop scene.
- Check breakpoints around mobile (`360–430px`), tablet (`768px`), laptop (`1024px`), and desktop (`1440px+`).
- Check reduced-motion mode, keyboard navigation, narrow viewports, and touch interactions.
- Do not add large dependencies without a clear need.

---

## 10. Code quality and repository safety

- Preserve the current package manager and lockfile.
- Do not upgrade Next.js, React, Tailwind, Three.js, or ESLint wholesale as part of a visual redesign unless a real blocker requires it.
- Do not delete existing project functionality to make the design easier.
- Reuse and refactor components where sensible; avoid a giant all-in-one page component.
- Avoid `any`, ignored type errors, blanket lint disables, and unnecessary dependencies.
- Keep content/data separate from presentation where appropriate.
- Use stable React keys.
- Ensure interactive controls perform their advertised actions.
- Avoid fake links (`href="#"`) and dead buttons.
- Ensure mobile nav, project links, contact actions, and scroll anchors work.
- Do not overwrite `.env`, secrets, or deployment settings.
- Do not replace actual project screenshots with misleading generated mockups.

---

## 11. Suggested implementation stages

### Stage 1 — Audit and baseline
- Inspect files, dependencies, current design, routes, and existing features.
- Run the current lint/typecheck/build scripts if available and record baseline errors.
- Identify current design and implementation issues.

### Stage 2 — Design system
- Add semantic color tokens, typography, spacing, gradients, button/card styles, focus styles, and reduced-motion support.
- Ensure the theme is consistent across existing components.

### Stage 3 — Navigation and hero
- Finish responsive navigation and the hero layout.
- Make the headline, CTA hierarchy, and background composition work without WebGL.
- Add loading/fallback states.

### Stage 4 — 3D scene
- Refine the signature sculpture, lighting, materials, depth, animation, and optional bloom.
- Optimize for mobile and reduced motion.

### Stage 5 — All content sections
- Bring About, Skills, Projects, Experience/Process, Contact, and Footer into the same design language.
- Use verified content and preserve working links.

### Stage 6 — Responsive and accessibility pass
- Test desktop, tablet, and mobile.
- Verify contrast, keyboard flow, focus visibility, reduced motion, and WebGL fallback.

### Stage 7 — Verification and cleanup
- Run lint, typecheck if configured, and production build.
- Fix regressions introduced by the redesign.
- Remove unused imports, dead styles, broken links, and avoidable console warnings.
- Review changed files and summarize the result.

---

## 12. Acceptance checklist

Do not mark the task complete until each applicable item has been checked.

- [ ] Existing repository was inspected before changes.
- [ ] Correct Next.js and Tailwind conventions are used.
- [ ] Semantic Obsidian/Acid Lime tokens are centralized.
- [ ] Typography hierarchy and responsive spacing are consistent.
- [ ] Navigation and mobile menu work.
- [ ] Hero is visually striking with readable HTML text and working CTAs.
- [ ] 3D scene has a distinctive focal object, controlled lighting, and purposeful movement.
- [ ] Static fallback/loading state exists for the 3D scene.
- [ ] All existing relevant content, routes, and verified links are preserved.
- [ ] Project cards describe real work and do not invent outcomes.
- [ ] All sections feel art-directed as one portfolio, not isolated templates.
- [ ] Mobile layout has no horizontal overflow or unusable controls.
- [ ] Reduced-motion behavior and keyboard focus work.
- [ ] Contrast has been checked for essential text and controls.
- [ ] No new hydration, runtime, TypeScript, or lint errors.
- [ ] Production build succeeds, or any unrelated baseline blocker is documented with evidence.
- [ ] Final response lists files changed, design choices, checks run, and any remaining work.

## 13. Final instruction to Antigravity

**Implement the redesign in the current repository, not just a mockup.** Make reasonable decisions independently after inspecting the code. Prioritize visual quality, accessibility, performance, and working functionality together. Do not stop after generating a plan, and do not claim completion until you have reviewed the result at desktop and mobile sizes and run the available project checks.
