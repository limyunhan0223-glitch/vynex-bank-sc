# Homepage disappearance fix — 2026-09-21

## Reproduction and cause

Reproduced the nearly black page twice at `http://localhost:4173/`. The browser reported `Failed to fetch dynamically imported module: /src/three/VynexScene.tsx`. At failure, `scrollY` was 0, the React root was empty, and there were no canvas elements. This rules out an opaque canvas overlay or scroll-driven opacity as the immediate cause.

The scene module returned 200, but its optimized `@react-three/drei` dependency returned **504 Outdated Optimize Dep**. Vite metadata named a cached Drei JavaScript file that was absent on disk (its source map was present). Re-optimizing the aggregate entry reproduced the missing-artifact failure. The precise reason that aggregate cached file was absent was not established; no browser/WebGL issue was inferred from it.

The scene error boundary was declared inside that failing lazy module, so it never mounted. Suspense handles pending loads, not rejected imports. The rejection therefore unmounted the whole React root. A secondary `removeChild` exception occurred because ScrollTrigger had wrapped/reparented the main node and its passive-effect cleanup ran too late for React deletion.

## Changes

- `vite.config.mjs`: pre-bundle the exact scene dependencies, including direct Environment, Lightformer and RoundedBox modules.
- `src/three/VynexScene.tsx`: direct imports of existing Drei components; remove the too-late internal boundary.
- `src/three/BankCard.tsx`: import the same RoundedBox component directly.
- `src/components/SceneErrorBoundary.tsx`: catch rejected scene imports outside Suspense and preserve the surrounding HTML page, with a scoped retry fallback.
- `src/sections/TrustScene.tsx`: mount that boundary; use layout-effect GSAP cleanup with `gsap.context().revert()`; build a paused timeline before binding ScrollTrigger.
- `src/styles/index.css`: explicit visible initial states and canvas layer/pointer-event rules. No layout, colors, materials, geometry or typography redesigned.
- `tests/scene-dependencies.test.mjs`: test actual HTTP module URLs. Failed with the observed Drei 504 before the fix; passed afterward.
- `README.md`: update rendering verification status.

## Verification

- TypeScript check: passed.
- Entire existing test suite plus regression: 5 passed, 0 failed.
- Production build and packaging: passed. Existing large-3D-chunk advisory remains.
- Browser render verified at the default ~910×742 view and 1920×1080.
- Four fresh loads after the fix. Explicit 11-second no-scroll waits on the first and final two checks; desktop remained idle longer than 11 seconds during the build check as well.
- Initial state: scrollY 0; hero, panels, features, navbar and scroll indicator opacity 1 and visibility visible; one canvas; one pin spacer; no loading or error fallback.
- Scroll progression: at Y 352 hero opacity 0.7167 / Y transform -12.7473; at Y 704 opacity 0.0115 / transform -44.4818. Returning to the top restored hero/features opacity 1. No automatic fade at rest.
- Screenshots showed the card, ring, panels, HTML controls and feature cards after idle waits. Canvas does not cover the HTML interface.
- Post-fix console errors: none. Non-fatal warnings: Three.Clock deprecation within the rendering dependency and driver shader floating-point precision warnings. Neither prevented rendering. They were not suppressed.
- Browser viewport override reset and preview left open. No claim of complete original-design fidelity or 60 FPS benchmarking is made by this scoped bug verification.
