# Scenes 04–12 production review

The approved Scene 01 Version 2 and Scenes 02–03 remain unchanged. Their scenes, shared illustration and motion components, palette and cue data are SHA-256 locked in `scenes01-03-approved-lock.json`. This phase adds nine independent scene files and reusable production primitives. Existing `timeline.ts` times, frames and narration are preserved; only implementation flags change.

## Review outputs

- `out/Scenes04-12-Review.mp4`: continuous new sequence, 230.55 seconds.
- `out/AI-Helpdesk-FullFilm-Scenes01-12.mp4`: full film, 333.533333 seconds on the 60 fps frame grid.
- `out/Scene11-to-12-Transition.mp4`: 12 seconds across the roadmap-to-close transition.
- `out/production/04-hero.png` through `12-hero.png`: representative hero frames.
- `out/production/12-final.png`: final closing composition.

The full film joins the already-rendered approved opening and the new production video without re-encoding either video segment. It uses the original master soundtrack from time zero. The production preview begins at source audio sample 4,541,565, matching global frame 6,179. No music, narration, gain, fade or speed changes are applied.

## Modular scene implementation

| Scene | Component | Visual event |
|---|---|---|
| 04 | [Scene04Knowledge.tsx](src/scenes/Scene04Knowledge.tsx) | Source documents converge; noise is cleaned, duplicates merge, content becomes fields and approved knowledge enters the base. |
| 05 | [Scene05ControlledLearning.tsx](src/scenes/Scene05ControlledLearning.tsx) | A resolved case stops at a governance boundary, becomes a candidate, receives SME review and is published after approval. |
| 06 | [Scene06GroundedAI.tsx](src/scenes/Scene06GroundedAI.tsx) | Evidence is retrieved and travels into the answer; an unsupported answer is stopped and safe paths appear. |
| 07 | [Scene07Workflow.tsx](src/scenes/Scene07Workflow.tsx) | A customer answer becomes structured input; the approved workflow returns the next conversational step. |
| 08 | [Scene08Ticketing.tsx](src/scenes/Scene08Ticketing.tsx) | A case packet crosses the authorised API bridge and populates the existing ticket. |
| 09 | [Scene09Escalation.tsx](src/scenes/Scene09Escalation.tsx) | Sparse escalation becomes an assembled contextual handover received by L2. |
| 10 | [Scene10Governance.tsx](src/scenes/Scene10Governance.tsx) | A calm operating boundary establishes controls and distinguishes permitted actions from blocked or review-required actions. |
| 11 | [Scene11Roadmap.tsx](src/scenes/Scene11Roadmap.tsx) | A horizontal camera follows planned milestones, pulls back to the roadmap and presents an unselected decision gate. |
| 12 | [Scene12Outcome.tsx](src/scenes/Scene12Outcome.tsx) | Routine work consolidates, trusted knowledge serves multiple journeys and a complete handover moves to L2 before the final lifecycle and title settle. |

Every scene is registered separately in Studio. The full-film, Scenes 04–12 and transition compositions are also registered. Cross-scene continuity uses the previous scene's ending as an opening bridge. It does not shorten or overlap timeline durations.

## Timing and content constraints

1. The supplied master ends at 333.52244898 seconds. The 60 fps composition ends at 333.533333 seconds: a 10.884 ms difference. The complete soundtrack is preserved at its original speed; there is no added ending silence.
2. The final spoken lifecycle occupies approximately 327.08–333 seconds. The closing title begins at “One connected support…” (325.42 seconds) and stays visible while the lifecycle highlights. Secondary information settles during the final second. This provides an approximately eight-second title presence without extending the soundtrack, but a long fully settled post-narration hold is not available in the supplied timing.
3. Clean → deduplicate → structure are closely spaced. “Deduplicate” is a brief supporting visual transformation between the narrated cleaning and structuring beats; it is not separately spoken. Product information is also included visually as requested.
4. Week 7 integration testing is shown between the narrated integration and end-to-end testing stages. The narration groups implementation activities and does not individually name all ten weeks. Milestones and assessment areas are proposed activities, not claimed completed work; GO / NO-GO remains unselected.
5. The requested ticketing/escalation example uses CASE #10284. Approved Scene 03 retains its existing INC-10234 example. The customer and product remain the same illustrative examples; the approved earlier scene was not relabelled.
6. Timing cues use the existing locally generated word timestamps. Scene boundaries are exact on the existing frame grid; speech alignment is editorial and inherits the ASR timestamp precision limitation.

## Validation

TypeScript and ESLint checks cover the integrated source. Story, hero and transition frames are rendered at 1920×1080. `../analysis/production-continuity.json` records source-lock and boundary checks. `../analysis/production-export-verification.json` records codec, dimensions, 60 fps, every decoded video frame, monotonic frame timestamps, stereo 44.1 kHz audio and duration checks.

Run `node scripts/production-stills.cjs` for representative frames, then render `Scenes04-12-Review` with H.264 / CRF 17 / 60 fps. `../analysis/finalize-production.py` finalizes source-audio cuts, produces the full-film and transition exports, and validates them.

The continuous Studio visual pass was also checked under rendering load. Live playback with audio buffered intermittently in the in-app browser, and preview FPS dropped under CPU load. Muted visual playback continued; final MP4 audio is independently checked against the master with waveform correlation and RMS comparisons. This live-preview limitation does not change rendered frame timing.

Final verification: all 13,833 / 20,012 / 720 video frames decoded successfully with uniform 60 fps timestamps. Ten audio spot checks against the master exceeded 0.99998 correlation, with RMS ratios within 0.08% of the source. The encoded MP4 played normally with audio in the local review page. Hero frames are also packaged in `out/Scenes04-12-Hero-Frames.zip`, with `out/Scenes04-12-Hero-Gallery.jpg` as the overview.
