# Vynex Bank — TRUST

The opening scene for a fictional university banking showcase. Built in React, Vite, TypeScript, Tailwind CSS, GSAP/ScrollTrigger, React Three Fiber, Drei and Three.js. Photo 1 drives the composition; Photo 2 is used only for its opening-homepage context.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm. From this folder:

```sh
npm install
npm run dev -- --host 0.0.0.0 --port 4173 --strictPort
```

Open http://localhost:4173. The development server has already been started in this session.

```sh
npm run typecheck
npm run build
npm run preview -- --port 4174
```

Production frontend output is `dist/client`. The existing starter's Sites packaging is preserved, but this project has not been published.

## Files created or changed

- `src/main.tsx`, `src/vite-env.d.ts`: typed React entry.
- `src/sections/TrustScene.tsx`: homepage composition, pinned GSAP timeline and transition boundary.
- `src/components/Navbar.tsx`, `HeroContent.tsx`, `FeatureCards.tsx`, `ScrollIndicator.tsx`: HTML interface.
- `src/components/ExperienceDialog.tsx`: accessible native dialog, service search and showcase-only interactions. Login/account buttons do not collect information.
- `src/three/VynexScene.tsx`: one persistent canvas, environment lighting, motion, visibility suspension and rendering limits.
- `src/three/BankCard.tsx`: rounded card geometry, reflective rim and locally generated banking artwork texture.
- `src/three/TypographyRing.tsx`: bold extruded lettering merged into one geometry around a physical orbit.
- `src/three/GlassPedestal.tsx`: layered reflective pedestal.
- `src/three/FloatingPanels.tsx`: HTML glass panels.
- `src/hooks/useParallax.ts`, `useReducedMotion.ts`: pointer input and motion preference handling.
- `src/styles/index.css`: responsive layout, glass materials and ambient HTML animation.
- `public/assets/atrium.webp`: generated architectural background (approximately 87 KB).
- `public/assets/vynex-logo.png`: logo cropped from the supplied reference.
- `public/assets/helvetiker_bold.typeface.json`: Three.js example font for actual extruded lettering.
- `index.html`, `package.json`, `package-lock.json`, `vite.config.mjs`, `tsconfig.json`, `.gitignore`: app configuration and dependencies.
- `design-qa.md`: verification status and outstanding browser checks.

Unused starter `App.jsx`, `main.jsx` and `styles.css` were removed. Existing sibling projects were not edited. `../vynex-assets` contains the original generated architectural asset.

## Motion and performance

- FLOAT: 6.4-second card movement; gentle HTML-panel float.
- GLIDE: 24-second orbit and a pinned scroll timeline with `scrub: 1.3`.
- Ring center is at world Y -0.92; card center is at Y +0.78. Scroll lowers the ring while raising the card. Both render in the same depth-tested scene, allowing card occlusion of rear letters.
- Renderer pixel ratio capped at 1.25 desktop / 1.15 mobile. No real-time shadows, post-processing, or transmission-buffer effects. Reflection environment is captured once at 128px.
- Shared letter geometries/material, low curve subdivisions, local assets, WebP background, and separately loaded 3D bundle.
- Canvas stops rendering while hidden or outside the viewport. Reduced-motion mode stops ambient movement, removes scrub lag and click tweening, and uses demand rendering. Desktop pinning remains so the narrative is readable; mobile remains unpinned.
- Mobile uses a stacked composition, lower pixel ratio, two panels, and unpinned normal scrolling. Tablet retains the desktop scene with simplified navigation.
- The canvas exposes `data-fps`, `data-draw-calls`, and `data-triangles`, refreshed once per second, for inspection during presentation-machine profiling. FPS is an observed frame-rate sample, not a GPU timing guarantee.

## Scope and verification

TRUST and Scene 02 THE BAIT are implemented. Existing homepage buttons open lightweight informational panels; Search filters local services. Watch Our Story opens an editorial story panel. Scrolling continuously recedes the card/ring, introduces the phone, and reveals the notification after it settles. Clicking the notification pushes the camera closer and stops. The displayed `.example` URL does not navigate. No Scene 03, warning state or credential flow is included.

TypeScript and Vite production build passed. Vite reports a size advisory for the deferred 3D bundle (about 976 KB / 268 KB gzip); it is primarily the required Three.js/R3F rendering stack. The initial browser verification was blocked. A subsequent rendering-bug investigation reproduced and fixed a missing/outdated Drei development bundle that caused the whole React page to unmount. The corrected homepage was visually checked at the default browser size and 1920×1080, across four fresh loads, idle waits of at least 11 seconds, and scrolling forward/back. No post-fix console errors occurred; non-fatal Three.Clock deprecation and driver precision warnings remain. Five tests pass. See `debug-verification.md` for evidence and changed files. Full visual-fidelity, mobile/tablet and actual-presentation-hardware FPS certification remains outside that scoped bug verification.

Before a live presentation, check 1920×1080, 1440×900, 1024×768 and 390×844, test scroll forward/back, dialogs/menu/Search, reduced motion and tab visibility, then sample frame rate on the actual presentation laptop.

## Latest visual refinement

The latest Photo 1 is the primary reference. The existing architecture and scroll system are preserved. Optical-glass CTA controls, a textured physical card, clearer bold ring lettering, neutral glass/chrome pedestal and readable feature surfaces are implemented. See [design-qa.md](design-qa.md) for the exact refinement file list, screenshots and current verification, which supersedes earlier visual-QA limitations above. Desktop, tablet and mobile views were inspected; a clean load remained visible for 15 seconds. Observed embedded-browser performance was 56-57 FPS with draw calls reduced from 48 to 29. Actual presentation-machine 60 FPS remains to be measured.


## Locked master refinement

The final master is Photo 1 in attachment folder `2A872DDA-B1EA-450F-9D04-7D94304D34BB`. Blue optical-glass controls, a wider ring with proportional text spacing and blue extrusion sides, thinner pedestal tiers, cooler lighting, larger card and responsive panel offsets now follow this reference. The architecture and GSAP timeline are unchanged. Desktop DPR is now capped at 1.25 (compact 1.15). Latest measured samples were 52-57 FPS with 32 draw calls and 14,940 triangles; actual-hardware 60 FPS remains unverified. See [design-qa.md](design-qa.md) for the authoritative current status, exact changed files and remaining visual differences.

## Scene 02: THE BAIT

Scene 01 is visually locked. The latest Scene 02 reference is Photo 1 in attachment folder `16C01498-195D-4A52-BB35-40596438A75A`. Scene 02 shares the existing canvas, environment, card and typography ring. Its screen is accessible HTML projected onto an unbranded physical 3D phone. The phone enters from below/right with damping; the notification waits for the reveal phase and physical settling. Click only advances local focus, with no navigation or future scene.

Run the project with `npm run dev -- --host 127.0.0.1 --port 4173 --strictPort`, then open http://localhost:4173/. The current local preview is already running. Build with `npm run build`; run the added motion checks with `node --test tests/bait-motion.test.mjs` (Node 24 used for TypeScript stripping), and existing packaging checks with `npm run test:sites`.

See `design-qa.md` for the current Scene 02 file list, visual comparison, interaction checks and performance limits. The prior locked Scene 01 report is retained in `qa/scene01-design-qa.md`.
