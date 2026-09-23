# Production repair verification — 23 September 2026

## Repairs

- Scene 05 control panels exceeded short desktop viewports. Keyboard/click focus could scroll the hidden-overflow camera stage and displace the brand and architecture. The stage now uses non-scrollable clipping; the information area has bounded native scrolling with scroll chaining. Layer changes smoothly return that local scroll position to the heading.
- Inactive information panes contributed invisible overflow. Their overflow is now clipped within the persistent shell.
- Short-screen protection selectors crowded the outer ring label. Their short-height spacing is adjusted without changing the master desktop composition.
- The homepage scroll hint extended below 720px viewports. Its short-height layout now fits below the feature cards.
- Protection camera view offsets were stale after viewport changes because R3F had already updated camera.aspect before the invalidation check. The check now tracks actual renderer dimensions.
- Mobile ScrollTrigger used a scoped selector for a sibling outside its GSAP context. It now receives the actual transition-anchor ref.

## Production configuration

The app-level Vercel configuration runs npm run build and publishes dist. The repository-root configuration delegates to vynex-bank and publishes vynex-bank/dist when the Vercel project root is the parent directory. Removed obsolete Sites worker packaging, hosting marker and worker-specific tests. The replacement verifier is read-only and checks the hashed entry and byte-identical public assets.

No scene content, glass materials, asset artwork, alarm recording or educational controls were removed or redesigned.

## Verification

- Actual npm build passed (TypeScript, Vite, production verifier).
- Final dist/index.html references /assets/index-BW66XPFx.js; no /src/main.tsx or main.tsx entry.
- All nine public assets match their source bytes and return HTTP 200 from the production preview. Checked WebP/PNG textures, both typeface JSON files and supplied MP3; MIME types are correct.
- 26 existing Node tests passed, including credential disposal, reduced-motion timeline, finite audio, three reset cycles and reverse-navigation state handling.
- Browser walkthroughs covered notification, login, reveal, all forensic clues, all protection categories, detail expansion, final alignment and keyboard restart. Two development walkthroughs and one production walkthrough reached the final state. Native upward return to forensic mode and downward protection re-entry worked.
- Desktop/tablet layouts inspected at 1920x1080, 1440x900, 1366x768, 1280x720 and 1024x768. Mobile flow inspected at 390x844. These are browser viewport checks, not physical-device touch tests.
- Production login demo username/password were confirmed empty after submission. Source audit found no credential transmission or persistence. The development resource observer counts requests only; it never reads field contents.
- Numbered screenshots in this directory show the actual production build at 1920x1080.

## Limits / remaining non-blocking observations

- The lazy Three.js bundle still produces Vite's size advisory (approximately 1.08 MB uncompressed). It remains split from the initial application; no effects were removed to suppress this warning.
- Development console includes Three.Clock deprecation and driver shader-precision warnings. No rendering failure was associated with these. The mobile missing-anchor warning was repaired.
- No cross-hardware 60fps guarantee or physical trackpad/touch certification is claimed. No new animation loop, rendering surface or per-frame React state was introduced.
- Remote production verification requires the existing repository/Vercel connection. No Git remote, upstream branch or local Vercel project link is configured in this checkout.

## Changed application/deployment files

- ../vercel.json (repository root)
- vercel.json
- package.json
- scripts/verify-production-build.mjs
- scripts/prepare-sites-build.mjs (removed)
- .openai/hosting.json (removed)
- worker/index.js (removed)
- tests/sites-worker.test.mjs (removed obsolete worker tests)
- README.md
- AGENTS.md
- src/sections/TrustScene.tsx
- src/components/ProtectionScene.tsx
- src/three/ProtectionSystem.tsx
- src/styles/protection.css
- src/styles/refinements.css
- qa/production-2026-09-23/* (verification evidence)
