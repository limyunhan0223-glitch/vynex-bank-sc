# Scene 01 — visual storytelling revision

## Delivered scope

Scene 01 only, 2,165 frames at 60 fps, 1920 × 1080. The audio mix and detected scene boundaries remain unchanged. The first preview is retained at `helpdesk-pitch/out/Scene01-Challenge.mp4`; the revised preview is `helpdesk-pitch/out/Scene01-Challenge-v2.mp4`.

## What changed

- Replaced the central support card with a custom SVG agent, headset, workstation, keyboard, mouse and desk. Body/hand motion suggests active work without distracting facial animation.
- Added distinct inbound channel situations: email notification, chat arrival, and a ringing telephone with restrained pulses. Illustrated enquiries follow the connector curves into the agent's workspace and populate the inbox.
- Replaced text-only manual-work reveals with a message interpretation, document search, diagnostic checks, ticket-field updates, category assignment, queue routing and L2 handoff.
- Added differentiated knowledge objects with page-opening motion, ticket stacking, recorded-resolution status and an employee illustration. Objects enter from the right and feed information back toward the operator.
- Built additional information flows as the narration describes growing volume. Secondary movement settles before the hero; travelling objects clear away instead of freezing across the final connector transition.
- Preserved the executive headline, main typography, navy environment and functional accent palette. Connector endpoints begin converging on one central cyan point in the last 36 frames.

## Reusable foundation

`VectorObjects.tsx` contains all 21 requested object/role variants, using a shared stroke, corner and fill treatment. `StoryMotion.tsx` owns curve travel and notification pulses. `SupportWorkstation.tsx` owns the illustrated operator and changing console. `KnowledgeObject.tsx` owns source-object entrances, stacking and statuses. `theme/illustration.ts` centralizes the illustration palette.

Future-scene guidance is saved in `helpdesk-pitch/STORYTELLING.md`. No future scenes are implemented.

## Validation

TypeScript and ESLint pass. Full-resolution stills were inspected at inbound channels, message interpretation, document search, diagnostics, ticket update, classification, routing, escalation, developed knowledge network, hero and transition beats. Final export properties and full-frame decode are recorded in `Scene01-Challenge-v2-verification.json`.

The sample workstation content illustrates manual operations using the proposal's connectivity example. It does not introduce a new product capability. Classification, routing and escalation remain compact because the supplied narration groups them into one sentence. The original detected word timing retains its ASR precision limitation.
