# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Production hosting is Vercel (superseding the earlier Sites requirement). Run `npm run build`: Vite emits `dist/index.html` and `dist/assets/*`, then the read-only production verifier checks the generated entry and assets. Do not reintroduce Sites worker packaging or copy source index.html into dist. The app-level vercel.json uses npm run build and dist; the repository-root vercel.json delegates to vynex-bank for deployments using the parent directory.

## Current visual direction (2026-09-21)

The latest Photo 1 (attachment folder 24BD9B89-3E72-4FAF-B168-4E196B7E8FA2) supersedes the initial reference. Refine this implementation in place: preserve the single R3F canvas, React components, GSAP context/cleanup and ScrollTrigger system. Keep the typography ring below the dominant dark physical bank card. Preserve frosted optical-glass Get Started, luminous crystal Open an Account, and dark-glass Log In with damped pointer reflections. Avoid solid blue pills, excessive glow, and future phishing scenes. Preserve the existing scene error boundary and paused scroll timeline initialization.

## Locked final master (2026-09-21)

Photo 1 in attachment folder `2A872DDA-B1EA-450F-9D04-7D94304D34BB` is now the FINAL MASTER VISUAL REFERENCE, superseding prior references. Prioritize 1920x1080. Match its three-zone composition and cold midnight/cobalt temperature. Controls retain the optical capsule construction but now use blue glass: dark navy Log In, stronger luminous crystal Open an Account and Get Started. Hero CTA hover scales 1.012, arrow travels 4px, with 400ms easing and a pointer reflection. Keep a wide glass typography band below the physical card; preserve opaque legible letter cores. Preserve all working scene/scroll architecture. No future scenes.

## Scene 02 master and Scene 01 lock (2026-09-21)

Scene 01 is approved and visually LOCKED. Do not alter its layout, material assets, typography, buttons or lighting. The latest explicit request authorizes Scene 02 THE BAIT only, overriding the earlier prohibition on all future scenes. Its master reference is Photo 1 in attachment folder `16C01498-195D-4A52-BB35-40596438A75A`.

Use the existing persistent canvas and scroll experience: original card/ring recede and remain visible; phone enters from below/right, settles, then reveals the notification. Keep blue/navy optical glass. Clicking the notification expands it and pushes toward the phone, then stops. No red, warnings, phishing reveal, real URL navigation, credential collection or Scene 03. The displayed URL is `vynex-secure.example/verify`. Preserve gsap.context cleanup and the paused initial timeline; all Scene 01 initial states stay visible.

## Feature-card restoration (2026-09-22)

The user rejected the most recent smoked-glass feature-card refinement. Restore and preserve the exact prior FeatureCards.tsx and its existing index.css/refinements.css treatment. Do not reapply feature-cards.css, icon tiles, changed wrapping or pointer reflections. All other Scene 01 and Scene 02 work remains locked.


## Phone UI refinement scope (2026-09-22)

Only the Scene 02 lock-screen clock/date/lock icon and notification UI are authorized for refinement. Use thin near-white system numerals, a smaller colon, and quiet date typography. Notification is predominantly dark navy glass with one subtle upper-edge reflection, a 30px logo tile, readable soft-white copy and restrained ice-blue URL. Hover scales 1.008 with damped reflection only. Preserve phone geometry/pose, wallpaper, entrance, click-focus behavior, all scene lighting/camera/scroll, and all of Scene 01.


## Phone transplant reference scope (2026-09-22)
Reference 1 (802A24FE attachment) locks the existing scene. Reference 2 applies only to phone hardware, wallpaper and screen UI: dark titanium rim, Dynamic Island, MY MAXIS/5G status row, soft charcoal curved wallpaper, thin 9:41 and smoked-glass notification. Keep the exact existing outer device dimensions, group pose, projection, camera and all animation code. No other scene changes.


## Scene 03 DECEPTION (2026-09-22)
Scenes 01 and 02 are approved and locked. Scene 03 is authorized only after the notification click, using reference 4B483D0E attachment. Continue the same phone into a close-up, front-facing login view with simulated .example browser bar, smoked-glass form and shield. Keep prior scroll/entrance states unchanged. Demo values stay in React memory, clear immediately on submission, pause 450ms, then set simulationSubmitted=true. No transmission, persistence, logging, real domain, red reveal or Scene 04. A quiet demo-only safety note is intentional.


## Motion polish lock (2026-09-22)
Scenes 01/02/03 visuals are approved. Subsequent work must preserve models, materials, typography, colors, lighting and settled poses. Motion uses one scroll timeline (scrub 1.3), one click focus target, frame-independent damping and explicit camera-before-phone-before-HTML ordering. Prepare viewport/reflection resources before the click, keep the reflection environment stable, and avoid full-scene inherited CSS-variable updates. Retain reduced motion and temporary demo-only form state.

## Scene 03 phone UI refinement (2026-09-22)
Master reference 00B5F4D4 scopes only the inside-phone browser/header/login UI. Dedicated deception-screen styles and useGlassReflection retain all scene, shield, phone geometry and motion locks. Keep the demo safety line and memory-only form behavior. Reflection moves internal overlays only and stops when settled. This refinement has been implemented and verified; user approval is not yet recorded.

## Scene 03 Image 1 correction (2026-09-22)
A1A9D646 Image 1 supersedes the rejected current UI in Image 2. Scene 03 framing, panel spacing/material and shield scale are authorized for correction. Scenes 01/02 and transition architecture, camera controller and timings remain locked. Destination pose constants may differ for approved reference framing. Keep all controls live and demo values memory-only.
## Scene 04 authorization and locks (2026-09-22)
Scenes 01, 02 and 03 are approved and locked. Scene 04 starts only after simulationSubmitted becomes true, following the 450ms blue Verifying pause. Preserve the existing panel, phone, camera, environment and earlier motion. Scene 04 adds a ruby glass transformation, nine instanced extruded warning objects, and three concise forensic clues. Never restore entered values. Continue to Protection records a handoff request only; do not implement Scene 05. This implementation is silent; audio is optional and omitted.

## Scene 04 timing lock (2026-09-22)
The latest storyboard supersedes the earlier 450ms/silent sequence. Scene 04 visuals are approved. Only timing/audio/entrances/reveal are refined: full 1.5s blue Please wait; deterministic irregular triangles; finite synthesized alarm; exactly three separate headline backlight pulses; 180ms audio release; 350ms silence; supporting information; primary and secondary actions staggered 220ms. One GSAP timeline and breachTimeline.ts own all cues. No Scene 01–03 visual changes, no credentials retained, no Scene 05.

## Scene 04 final production refinement (2026-09-22)
Latest request supersedes the prior backlight/long sequence. Keep the 1.5s blue wait, then a 2.65s event. Use only public/assets/premium-cybersecurity-warning.mp3 (the supplied recording). Offline measured final tonal peaks: 0.530/0.750/0.969 seconds. Audio currentTime disciplines the single GSAP clock. Glyphs, not a radial background, pulse exactly three times. Eight asymmetric objects: two large foreground, three midground, three distant. Spatial exits clear the panel; three distant low-opacity echoes remain. Foreground glass is rendered once with the existing renderer into a cached plate and projected above the phone HTML; no second WebGL canvas. Scene 01–03 visuals and all earlier transition code remain locked. Demo values still clear immediately; no Scene 05.

## Scene 05 authorization (2026-09-22)
Scene 05 is now authorized after all three forensic clues have been viewed and Learn How Vynex Protects You is clicked. Previous no-Scene-05 restrictions are superseded. Keep Scenes 01–04.5 visual designs unchanged. ProtectionScene, ProtectionSystem, protectionState and protectionLayers own the new chapter; use the same canvas. Preserve all 16 controls in three named categories. Exploration is confirmed per layer before final alignment. Continue records a handoff only; no subsequent chapter is specified.

## Shared CTA and restart loop (2026-09-22)
Use VynexGlassCTA for Continue to Protection and final Continue (crystal) and Learn How Vynex Protects You (highlighted, restrained lavender refraction). Preserve surrounding layouts. Final Continue now restarts Scene 01 through a covered dark bridge; the earlier handoff-only instruction is superseded. Unmount scene lifecycle before resetting stores/audio and silently repositioning scroll. No reload or credential persistence. Preserve native bidirectional scrolling.

## Scene 04.5 to 05 continuity (2026-09-22)
Preserve both approved designs. Pre-mount protection UI/geometry and prepare shaders during forensic analysis. One reversible GSAP handoff owns release, cooling, camera, core, rings and content. No click-time DPR or canvas resize, pin refresh, wheel cancellation or body locks. Keep native reverse scrolling and the covered restart.
