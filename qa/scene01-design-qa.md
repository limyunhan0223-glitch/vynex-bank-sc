# Vynex Bank — locked master visual QA

**final result: passed**

This is a visual refinement of the existing real-time homepage, not a pixel-identical ray-traced reproduction. Remaining rendering differences and the unverified 60 FPS target are explicit below.

## Source and comparison setup

- Final master: `C:/Users/limyu/.codex/codex-remote-attachments/01a0c2f5-bc24-7de1-8dba-37b2344555fe/2A872DDA-B1EA-450F-9D04-7D94304D34BB/1-Photo-1.jpg` (1280x853).
- Live implementation: http://localhost:4173/, TRUST scene at scroll zero.
- Showcase CSS viewport: 1920x1080. Browser screenshot `qa/master-1920.png` is 1905x1072; the capture service excludes the scrollbar and scales its output. Geometry and layout measurements use CSS pixels, not capture pixels.
- Equal-aspect check: CSS viewport 1280x853; screenshot `qa/master-1280.png` is 1265x843. Compared at equal relative frame size, accounting for the capture scaling. The 1920x1080 adaptation preserves content proportions rather than stretching the 3:2 source into 16:9.
- Reference plus current full-view and focused card/ring capture were opened in the same comparison call. Focused evidence: `qa/master-detail.png`.
- Additional responsive captures: `qa/master-mobile.png` (390x844 viewport), `qa/master-tablet.png` (1024x768 viewport).

## Comparison history and fixes

1. Before (`qa/master-before.png`): ring was narrow with widely spaced fragmented names; controls were grey; pedestal upper tiers were tall; feature icons lacked the source's filled appearance. These were P1/P2 visual mismatches.
2. First pass (`qa/master-pass1.png`): widened band, proportional glyph advances and cobalt controls. The enlarged physical rim briefly covered the card artwork; moved the face forward, then visually confirmed it in `qa/master-pass2.png`.
3. Second comparison: improved the band width again, added pale-blue letter extrusion sides, localized optical highlights, thinner pedestal layers, and balanced hero/statistics spacing.
4. Responsive comparison found the finance panel touching the card logo on smaller layouts; adjusted scene scale and panel offsets. Verified updated tablet/mobile captures.
5. Final combined full-view/detail comparison: card remains dominant, ring below it with complete readable names, four features below, and all existing interactions intact. No remaining blocking layout or interaction findings. Material realism differences are documented performance tradeoffs.

## Required fidelity surfaces

- **Typography:** white/ice-blue two-line hero, geometric bold 3D names, crisp white letter fronts with blue extrusion sides, filled feature icons, legible titles/copy and restrained labels. Local system sans-serif remains; the exact reference typeface is unavailable.
- **Layout:** left copy/CTA/statistics, larger center-right physical card, wider below-card band, layered pedestal, three floating panels, four bottom cards, lower-right brand message, centered scroll indicator. At 1920px the statistics and feature grid have approximately 43px clearance. Navigation remains integrated without a container.
- **Colors:** deeper navy background, cobalt/ice optical controls, white typography and neutral chrome. Removed grey CTA emphasis. No purple/cyan-heavy palette, bloom or bright warning colors.
- **Assets/materials:** existing local card artwork, logo and atrium retained. Card size, tilt, thickness, reflective face and edge separation refined. Ring letters remain actual beveled TextGeometry. Pedestal remains actual layered 3D geometry. Band highlights use a small fragment-shader addition to the existing material pass.
- **Content:** all requested homepage wording preserved. Floating-panel supporting copy now matches the master. Added small diagonal arrow icons to the existing navbar controls.

## Runtime and interaction QA

- Clean reload at 1920x1080 followed by an explicit 15-second idle wait: one canvas, hero opacity 1, scroll zero, no loading/error fallback; homepage stayed visible. Subsequent clean reloads also remained visible.
- No new browser console errors. Existing non-fatal `THREE.Clock` deprecation remains from the rendering stack.
- Ring phase advanced continuously across observations; card and panels retained restrained idle movement. No reset was observed. This is browser observation, not a full frame-time trace.
- Pointer test changed damped rotation from 0 to approximately 0.029 radians.
- Scroll to approximately 470px changed hero opacity to about 0.39 and moved it upward. Returning to top restored opacity 1. The GSAP context, paused initialization, cleanup, pinning and scrub 1.3 are unchanged.
- Get Started opened its existing dialog; close restored the homepage. Its pointer-reflection CSS variables changed during the interaction.
- Mobile menu opened and closed. Mobile had one canvas, four features and no horizontal overflow.
- TypeScript, Vite build, production packaging and five tests passed. The deferred Three.js bundle still has Vite's size advisory (about 981 KB / 269 KB gzip).

## Performance

- Observed browser samples ranged approximately 52-57 FPS; no sustained freeze/disappearance was observed. A stable 60 FPS target has NOT been certified on presentation hardware.
- Final renderer: 32 draw calls, 14,940 triangles (previous refinement: 29 / 12,194). Added geometric detail remains small, but this is not a claim of lower total render cost.
- Letter front/side colors are vertex attributes in the same merged geometry, avoiding an additional draw per letter/material. Templates are reused and temporary geometries disposed.
- Optical highlights run in the existing ring glass shader with no extra render target, bloom or frame-by-frame uniform uploads.
- Desktop DPR cap lowered from 1.5 to 1.25; compact remains 1.15. At the maximum cap, this reduces canvas pixels by about 31% relative to 1.5.
- Shared pedestal materials, single captured 128px reflection environment, local preloaded assets, visibility pause and reduced-motion paths preserved. No new textures, packages, real-time shadows or post-processing.

## Remaining differences / follow-up polish

- The reference has richer ray-traced internal glass reflections, caustics and reflected lettering. The live version approximates them with transparent physical materials, one captured environment and localized highlights. It does not reproduce exact optical refraction or dynamic text reflections on the pedestal.
- Existing generated architectural artwork and card ribbon differ in exact silhouette/detail from the master; palette, placement and material treatment were refined without replacing those assets.
- The ring uses repeated bank names and separators rather than the reference's large standalone V emblems. Its frame-specific letter placement changes continuously with rotation.
- Reference aspect ratio is 3:2; the priority showcase is 16:9. Relative zones are preserved with responsive spacing rather than distorted artwork.
- Verify frame pacing on the actual presentation laptop/projector before certifying 60 FPS.

## Exact files changed in this pass

| File | Change |
| --- | --- |
| `src/three/BankCard.tsx` | Larger physical rim, adjusted tilt, face depth, optical edge and restrained reflections. |
| `src/three/TypographyRing.tsx` | Wider band; proportional spacing; white fronts/blue extrusion; optical highlight shader; shared merged geometry. |
| `src/three/GlassPedestal.tsx` | Wider/thinner architectural tiers, shallower depth, revised chrome/glass materials. |
| `src/three/VynexScene.tsx` | Card scale and placement, responsive scene scale, cooler lighting/reflections, DPR cap. |
| `src/three/FloatingPanels.tsx` | Reference supporting copy. |
| `src/components/Navbar.tsx` | Arrow icons in existing glass controls; actions unchanged. |
| `src/components/FeatureCards.tsx` | Filled icon treatment to match the reference. |
| `src/styles/refinements.css` | Master composition, blue glass controls/hover, feature materials, background temperature, responsive offsets. |
| `AGENTS.md` | Locked master and durable constraints recorded. |
| `README.md` | Current verification/performance and master-reference notes. |
| `design-qa.md` | This comparison and verification report. |
| `qa/master-*.png` | Before, iteration and final browser evidence. |

Generated production `dist/` was refreshed. No architecture, scroll timeline, hooks, page sections, dependencies or future scenes were added or replaced.
