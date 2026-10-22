# Antigravity Implementation Brief — Inexa-Inspired Portfolio Redesign

## Mission

Redesign my existing Next.js portfolio using **Inexa as the primary visual and interaction reference**:

Reference: https://inexa-html-demos.vercel.app/?storefront=envato-elements

I like Inexa's minimalist but expressive art direction, refined color combination, section-based portfolio structure, and smooth animations/interactions. Use those qualities to build a personal developer portfolio that feels considered, polished, responsive, and individual.

**This brief supersedes all previous visual directions.** Do not continue the Obsidian/Acid Lime theme, the Porcelain/Ink redesign, the wireframe globe, the lime-outline monolith, or the previous sci-fi HUD concept unless an existing part is demonstrably useful and fits the Inexa-inspired direction.

The task is to implement the actual redesign inside the current repository—not only create a plan, static mockup, or isolated demo.

---

## 1. Reference-first workflow

Before editing:

1. Open and visually inspect the Inexa reference in a browser if available. Review the full page, not only the first viewport. Check how its headings, section rhythm, background surfaces, imagery, hover states, transitions, and scroll animations work.
2. Inspect any accessible Inexa page variants or screenshots. Identify which visual traits are consistent and which are specific to an individual demo.
3. Inspect the existing portfolio repository: app structure, `package.json`, Next.js/React/Tailwind versions, styles, assets, animation packages, Three.js/R3F setup, and all existing routes and content.
4. Record baseline lint/typecheck/build issues before changing code if possible.
5. Produce a brief implementation checklist and proceed directly into implementation. Do not stop after the plan.

Use Inexa as a **design reference, not a source to copy verbatim**. Do not copy its source code, brand, identity, placeholder wording, stock imagery, or template assets. Recreate the design principles with our own content and components.

If the reference is not available in a browser, use the supplied URL and the accessible content to infer structure cautiously. Do not pretend to have visually inspected details you could not access.

---

## 2. Core art direction

Target: **minimal creative portfolio + tasteful interaction + clear engineering credibility**.

The website should feel:
- Clean, composed, confident, and creative.
- Minimal without looking empty or unfinished.
- Visually expressive through typography, image composition, whitespace, color, and small motion details.
- Easy to navigate and understand in seconds.
- Consistent from the hero to project case studies and contact.
- Designed by a human with intention, not assembled from a generic AI/SaaS dashboard template.

### Avoid the previous failure mode

Do not:
- Reintroduce black backgrounds with neon lime glow as the dominant brand.
- Use a generic 3D globe, wireframe orb, glowing monolith, random cubes, orbital rings, or arbitrary particles as a shortcut to originality.
- Fill the screen with fake telemetry labels, floating dashboard cards, decorative HUD elements, or scene controls.
- Put glow, blur, glassmorphism, animated gradients, pills, and borders on every component.
- make every section a repeated rounded card grid.
- Add animation just because an animation library is installed.
- Rebuild a template with only colors swapped.
- Turn the portfolio into an elaborate 3D demo that distracts from the actual work.

A 3D scene may remain only if it genuinely complements the new design. If it doesn't fit, simplify or remove it from the main hero. A focused, beautifully composed visual is better than a complex but generic scene.

---

## 3. Color system — derive from Inexa, then formalize

I like the color harmony of the Inexa reference. **Inspect the reference and derive a restrained, consistent token palette from its actual appearance.** Do not carry over the earlier lime/cyber palette or the previous Porcelain/Ink/Cobalt/Vermilion palette by default.

Define semantic CSS variables for:
- Main page/background surface.
- Secondary section surface.
- Main text.
- Muted/secondary text.
- Borders/dividers.
- Primary accent.
- Accent hover/active.
- Optional secondary accent.
- Soft shadows and subtle decorative backgrounds.

Requirements:
- Preserve the overall palette relationship, contrast, and calm visual balance of Inexa.
- Use one dominant accent and, only if present and useful, one secondary accent.
- Apply accents purposefully to buttons, active navigation, section markers, links, and selected visual details.
- Keep text highly readable. Do not use low-contrast gray for important body copy.
- Avoid applying gradients indiscriminately to text and backgrounds.
- Avoid strong neon glows and colored shadows unless the reference visibly uses them in that specific context.
- Check all essential text and controls against WCAG AA contrast targets.
- Centralize tokens; components should not independently invent their own colors.

If the reference has multiple themes/variants, select the variant that best matches the demo the user linked and keep the final website consistent rather than blending every variant.

---

## 4. Typography and composition

Match the **typographic personality and hierarchy** of Inexa rather than arbitrarily choosing a trendy font.

- Inspect heading weight, text scale, line height, letter spacing, and how the template uses empty space.
- Use a clear display style for the hero and section headings, and highly readable body typography.
- Use an intentional maximum content width and responsive side padding.
- Use a coherent spacing scale from hero to footer.
- Make sections visually distinct by layout, background, alignment, media, or typography—not only by wrapping them in cards.
- Avoid too many uppercase labels and microscopic decorative captions.
- Avoid repeated pill shapes as the default button and navigation style.
- Use asymmetry when it serves the composition, not arbitrary offsets that hurt readability.
- Keep heading line breaks intentional across desktop and mobile.

Load fonts through the existing project setup or `next/font` where appropriate. Do not add unnecessary external runtime dependencies.

---

## 5. Site structure adapted to a software developer

Use the Inexa section-based storytelling as inspiration, but build a developer portfolio rather than reproducing a designer/freelancer template.

### A. Navigation and identity

- Personal identity/name and a simple navigation.
- Links to Work, About, Stack/Capabilities, and Contact (adapt labels to the actual website).
- GitHub and LinkedIn links only if verified in the existing content.
- Active/hover states use the reference's accent system.
- Add a mobile menu that is usable with keyboard, touch, and screen readers.
- Keep the navigation visually light and prevent it dominating the page.

### B. Hero

Communicate within a few seconds:
1. Who I am.
2. What I build.
3. What makes my engineering interests distinctive.
4. Where a visitor should go next.

Possible copy direction (edit to fit the existing content, don't use blindly):
- Eyebrow: `FULL-STACK ENGINEER · AI SYSTEMS`
- Heading: `I build thoughtful software for complex problems.`
- Supporting text: a brief introduction to scalable web applications, backend systems, and AI-enabled products.

Hero requirements:
- Strong typography and whitespace.
- One dominant visual, creative image, carefully designed graphic, or restrained 3D element.
- Clear primary action to explore projects.
- Secondary action for About or contact.
- No invented metrics, years of experience, employment claims, or customer outcomes.
- No fake terminal readouts or technical telemetry as filler.
- Ensure the actual HTML headline remains readable regardless of animation or WebGL support.

### C. About

- A concise, human introduction.
- Explain the combination of full-stack engineering, backend/system thinking, and interest in practical AI applications, only where supported by the user's actual profile.
- Use a real portrait or real personal asset if available. If none exists, use a purpose-designed graphic or abstract visual rather than a fabricated identity photo.
- Do not fabricate a biography, employers, degrees, credentials, or achievements.

### D. Skills / Capabilities

- Group technologies and strengths into useful categories supported by the existing profile.
- Make the section visually engaging via typography, layout, interactions, and selected highlights.
- Do not use fake skill percentages, proficiency meters, or animated numbers.
- Do not clutter it with dozens of icons, pills, or badges.
- Make technology labels accessible and legible.

### E. Selected work / Projects

This should be the strongest proof of engineering ability.

- Inspect existing project details and verified repository/live links.
- Feature the most complete and demonstrable work first.
- Give each project a clear title, short problem statement, key technical decisions, stack, and verified outcome where available.
- Use real screenshots when they exist. Do not use generic stock images that pretend to represent the actual product.
- If a project is incomplete, label it as in progress and describe what is implemented honestly.
- Use varied but cohesive project layouts instead of cloning an identical card four times.
- Consider hover image movement, a subtle reveal, or click-through case study interactions if they match the reference's motion style.
- Every link and CTA must work.

### F. Experience / Process

Include a career timeline or selected engineering process only if relevant information exists.
- Preserve the actual career details already in the repository.
- Emphasize real responsibilities and technical decision-making.
- Do not invent awards, testimonials, client logos, dates, metrics, or employers.

### G. Testimonials / awards / logos

Do **not** recreate Inexa's example testimonials, client logos, awards, follower counts, or years as dummy content.
Only include these sections if the existing portfolio has authentic data that the user has permission to publish. Otherwise, replace them with a relevant section such as engineering principles, selected system decisions, or a concise process section.

### H. Contact and footer

- A clear invitation to get in touch.
- Use verified email, GitHub, LinkedIn, and other existing profile links.
- Provide a functional contact form only if the current application supports it and its submission path can be verified.
- Include proper loading/success/error states if a real form exists.
- Do not invent an email, address, social profile, or working backend.
- Keep the footer clean and visually related to the page.

---

## 6. Interactions and animation — subtle, coordinated, meaningful

I specifically like Inexa's animation and interactive presentation. Recreate that general *quality* of motion using the current stack, but do not blindly reproduce every effect.

### Interaction principles

- Motion should guide attention, reveal information, and provide feedback.
- Use short and controlled transitions; avoid long entrance sequences.
- No animation should block reading or make navigation wait.
- Maintain a calm visual rhythm: not every section or element should animate.
- Keep animations coherent with the reference's pace and character.

### Useful effects to consider

Only implement the ones that fit the inspected reference:
- Gentle section reveal as elements enter the viewport.
- Small stagger on groups of headings, metadata, or project items.
- Image reveal or restrained image scale on project hover.
- Navigation state transition and active-section indication.
- Button hover/focus motion with crisp feedback.
- A small parallax or media movement on capable devices, if not distracting.
- Interactive project detail expansion or a genuine project case study link.
- A tasteful carousel only if content naturally benefits from it and keyboard/touch controls are supported.
- A clean mobile menu transition.

Avoid:
- Scroll hijacking.
- Overly elastic transitions, exaggerated spring physics, or constant bouncing.
- Custom cursor gimmicks by default.
- Excessive pointer-following objects.
- Long preloader sequences.
- Animating important text in ways that make it hard to read.
- Multiple animation libraries with overlapping responsibilities.

### Implementation

- Inspect existing packages and reuse the current animation library where reasonable.
- If Framer Motion/Motion, GSAP, or another library is already installed, use it intentionally rather than adding alternatives.
- If no library is present, use CSS transitions and IntersectionObserver where sufficient.
- Ensure all components clean up observers/listeners.
- Respect `prefers-reduced-motion`: remove/reduce nonessential motion, not essential content.
- Interactions must also work on touch devices and with keyboard navigation.
- Don't create animation-dependent content that is invisible if JavaScript fails.

---

## 7. What to do with the existing Three.js scene

Inspect it rather than preserving it by default.

- If the existing 3D visual can be redesigned to complement Inexa's aesthetic, reduce its complexity and make it a deliberate accent.
- Otherwise remove it from the main hero and use a suitable editorial image/graphic or typography-led layout.
- Keep the separate 3D Lab if it offers real value, but make it a dedicated interactive section rather than the first thing every visitor must navigate.
- The 3D Lab should have clear labels, accessible controls, and a default state that is visually polished.
- Do not let Three.js compete with text, project previews, or interaction performance.
- Provide a static fallback and load the scene only when it improves the experience.
- Keep WebGL browser code in Client Components and use the appropriate dynamic loading strategy for the project's Next.js version.
- Do not add heavy 3D/postprocessing packages without justification.

---

## 8. Technical constraints

- Inspect the real repository before modifying files.
- Preserve the existing framework versions, package manager, routes, deployments, and working capabilities.
- Follow the actual Tailwind version conventions (v3 vs v4).
- Do not introduce sweeping upgrades to Next.js, React, Tailwind, Three.js, or ESLint solely for a redesign.
- Refactor components and styles as needed; avoid one giant page component.
- Keep content/data separate from rendering where useful.
- Avoid `any`, broad lint disables, ignored type failures, fake links, and empty click handlers.
- Keep images optimized and layout dimensions reserved to avoid layout shift.
- Do not overwrite `.env`, deployment settings, or secrets.
- Ensure mobile design is intentionally adapted rather than shrinking desktop.
- Check viewport widths around 360px, 390px, 768px, 1024px, and 1440px+.
- Maintain semantic headings, alt text, visible focus, accessible names, and contrast.

---

## 9. Implementation stages

### Stage 1 — Inspect and benchmark
- Review the live Inexa reference, especially the exact variant linked by the user.
- Audit repository structure, current design, dependencies, and current issues.
- Note baseline build/lint errors if present.

### Stage 2 — Extract the visual system
- Define palette, typography, spacing, surface treatments, dividers, button styles, and animation timing based on the reference's appearance.
- Centralize styles and make reusable components.

### Stage 3 — Rebuild hero and navigation
- Implement the visual hierarchy, responsive typography, navigation, and working CTAs.
- Ensure the static first frame is excellent before applying animations.

### Stage 4 — Apply the visual system to all relevant sections
- About, capabilities, projects, experience/process, contact, and footer.
- Preserve verified content and working links; remove template placeholders.

### Stage 5 — Add and tune interactions
- Implement only meaningful animations and hover/focus states.
- Confirm keyboard, touch, and reduced-motion behavior.
- Refine or remove the old 3D scene based on fit.

### Stage 6 — Verify the actual result
- Review the implementation on desktop and mobile.
- Test the links, menu, project interactions, contact paths, and WebGL fallback if applicable.
- Run available lint, typecheck, and production build scripts.
- Fix regressions and report real outcomes.

---

## 10. Acceptance checklist

- [ ] Inexa reference was inspected, and the chosen variant's visual language is reflected in the implementation.
- [ ] The old black-and-acid-lime design and previous sci-fi hero concept are not carried over by inertia.
- [ ] Theme colors are derived from the reference and centralized as semantic tokens.
- [ ] Typography, whitespace, section rhythm, and imagery feel cohesive.
- [ ] Navigation and mobile menu work.
- [ ] Hero explains who I am and what I build, with functional CTAs.
- [ ] Every section is relevant to a software developer and contains authentic content.
- [ ] Project cards/case studies use real information and working links.
- [ ] No fabricated testimonials, metrics, awards, company logos, or customer outcomes.
- [ ] Animations are tasteful, coordinated, and useful.
- [ ] Reduced-motion and keyboard/touch experiences work.
- [ ] The old Three.js scene has been deliberately redesigned, simplified, relocated, or removed—not left unchanged by default.
- [ ] No visible dead buttons, broken links, or horizontal overflow on mobile.
- [ ] Lint, typecheck, and production-build outcomes are reported accurately.
- [ ] No regressions to existing routes, project functionality, or deployment configuration.

## Final instruction

Make the decision and implement it. Do not return another abstract design proposal, checklist-only response, generic generated mockup, or a slightly restyled version of the previous hero.

The result should capture the minimal, interactive, animated feel of the Inexa reference while presenting my real full-stack and AI engineering work with clarity, personality, and production-quality execution.
