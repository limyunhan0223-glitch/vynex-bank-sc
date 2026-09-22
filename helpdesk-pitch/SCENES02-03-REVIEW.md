# Scenes 02–03 review

Scene 01 Version 2 is the approved visual and motion benchmark. Its scene, shared vectors, workstation, cards, typography, palette, knowledge objects and motion primitives are locked by SHA-256 in `scene01-approved-lock.json`. No source listed in that lock is edited for this extension.

## Preview compositions

| Composition | Frames | Duration |
|---|---:|---:|
| Scene01-Challenge | 2165 | 36.083333 s |
| Scene02-Solution | 1233 | 20.550000 s |
| Scene03-CustomerJourney | 2781 | 46.350000 s |
| Scenes01-03-Review | 6179 | 102.983333 s |

The film review uses one master soundtrack from time zero. Individual previews use the corresponding master section. All boundaries remain those in `src/timeline.ts`, with 60 fps frame rounding; ASR timing retains its existing precision limitation. `src/data/reviewCues.ts` derives local cues from the original word timestamps and global start frames.

## Scene 02

The first frame is the exact frozen ending of approved Scene 01. Existing knowledge curves collapse and straighten; the existing cyan point becomes the AI Helpdesk. Channels consolidate into an organised stack, capabilities appear with the narration, and data objects travel between them. The executive message holds before one enquiry grows into the shared Scene 03 message card.

Seven capability areas are visible: channels, AI orchestration, identity/context, approved knowledge, L1 troubleshooting, ticketing and L2 escalation. This is an integrated support architecture, preserving the existing ticketing system.

## Scene 03

The same enquiry card crosses the cut. A professional customer remains in view while one active story panel changes:

1. Identify MX-500, Network Connectivity and E102 directly from the enquiry.
2. Verify the illustrative ABC Manufacturing identity, serial 879312 and active entitlement through approved systems.
3. Open INC-10234, prominently retain the completed restart, and route around a repeated restart to the next relevant check.
4. Retrieve the approved KB001 E102 troubleshooting guidance.
5. Ask about the LAN cable, capture the answer, and follow the approved next step to verify IP settings.
6. Retain questions, actions, results and diagnostics in persistent case context.
7. Reach the approved L1 boundary and assemble an initial handover; finish with the complete journey sequence.

The identity, serial, case and knowledge identifiers come from the proposal's illustrative examples. The scene is labelled as an illustrative customer case. The master narration does not explicitly speak the unresolved/escalation outcome here: this user-requested visual branch is staged during the final outcome/context narration, without inserting or changing audio. Detailed L2 explanation remains reserved for Scene 09.

## Source and verification

New scenes: `src/scenes/Scene02Solution.tsx`, `src/scenes/Scene03CustomerJourney.tsx`.
New shared story elements: `src/components/JourneyPrimitives.tsx`.

Render the continuous review with:

```sh
pnpm exec remotion render Scenes01-03-Review out/Scenes01-03-Review.mp4 --codec=h264 --crf=17 --concurrency=4
```

Then run `../analysis/render-review-exports.py` with the configured Python runtime and locally installed analysis dependencies. It preserves rendered video, aligns the original master mix to the frame boundary, derives standalone previews, and validates H.264/1080p/60 fps, stereo audio, duration and full video decoding.

Scenes 04–12 remain unimplemented. Stop at this review gate.
