# AI-Powered Level 1 Helpdesk — Full film production

Editable Remotion 4.0.526 project. Approved Scenes 01–03 are locked. Scenes 04–12 continue their established visual and motion system. See [PRODUCTION-REVIEW.md](PRODUCTION-REVIEW.md) for current outputs, modular scene files, validation and timing notes. The earlier [SCENES02-03-REVIEW.md](SCENES02-03-REVIEW.md) remains as production history.

## Run

Use Node.js and pnpm (or npm).

```sh
pnpm install
pnpm exec remotion studio --no-open
pnpm exec remotion render Scene01-Challenge out/Scene01-Challenge.mp4 --codec=h264 --crf=17
```

Composition: 1920 × 1080, native 60 fps, 2,165 frames (36.0833 seconds). The preview uses the opening of the supplied master mix, at original speed and volume. Its ending is a review cut, not a remixed soundtrack.

The delivered MP4 was finalized with `../analysis/finalize-preview.py` to remove a 55 ms encoder tail from the initial Remotion audio export. This copies the H.264 video and encodes the original master opening as 320 kbps AAC at 44.1 kHz, cutting at sample 1,591,275. It applies no gain, fade, remix or speed change. `../analysis/verify-export.py` validates the export and decodes all frames.

## Project map

- `src/timeline.ts`: all 12 detected narration sections; exclusive end frames; hero and transition cues.
- `src/theme/`: palette, type, spacing and motion constants.
- `src/components/Primitives.tsx`: cards, icons, reveals, background and connectors.
- `src/scenes/Scene01Storytelling.tsx`: active revised first scene with custom vector storytelling.
- `src/scenes/Scene01Challenge.tsx`: retained original scene for comparison; not used in the active composition.
- `src/components/VectorObjects.tsx`: shared enterprise object and character library.
- `src/components/SupportWorkstation.tsx`: agent illustration and narration-driven manual work sequence.
- `STORYTELLING.md`: revised visual direction and future-scene guidance.
- `src/compositions/PitchFilm.tsx`: Scene 01 with original audio.
- `public/master.mp3`: byte-for-byte source mix copy.
- `out/`: review exports.
- `../analysis/`: asset/audio report, word transcript, metadata and analysis scripts.

All twelve scenes are implemented and individually accessible in Studio. The full-film composition is `FullFilm-Scenes01-12`; the new-sequence composition is `Scenes04-12-Review`. Earlier review exports remain available for comparison.

The new preview is `out/Scene01-Challenge-v2.mp4`. The original MP4 remains available for comparison. Render the active composition to the v2 filename, then use `../analysis/finalize-preview.py Scene01-Challenge-v2.mp4` and `../analysis/verify-export.py Scene01-Challenge-v2.mp4` to reproduce its exact review cut and technical validation. Revised screenshots use the `v2-` prefix.

## Timing precision

The decoded audio is 14,708,340 samples at 44,100 Hz = 333.52244898 seconds. A full 60 fps composition needs 20,012 frames = 333.533333 seconds, 10.884 ms longer. Preserve the complete audio; do not change its speed to fit frames. Exact identical audio/video end times are impossible on this fixed frame grid without a partial final frame or a container-duration adjustment. The full-film export is included; see PRODUCTION-REVIEW.md for the delivered files.

Speech cues come from local Whisper base.en word timestamps, not a supplied transcript or sample-accurate forced alignment. Future scene hero timings are editorial anchors and should be refined when those scenes are built. Scene 01 action labels CLASSIFY / ROUTE / ESCALATE support the narrated “deciding where each case should go”; they are not individually spoken. FAQs, resolved tickets and troubleshooting guides expand the narrated source categories using the proposal.

## Design

Deep navy, restrained translucent panels and thin curves; Segoe UI available on Windows; cyan for channels, amber for manual work and lavender for distributed knowledge. No company identity or third-party logos invented. Frame-derived motion only; no CSS keyframes or timers.

The source proposal distinguishes email captured in ticketing from manually handled WhatsApp and telephone. The opening preserves this distinction.

