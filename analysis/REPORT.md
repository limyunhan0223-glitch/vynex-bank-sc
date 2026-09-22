# Asset and audio report

## Inspected assets

- `C:\Users\limyu\Downloads\Business proposal.pdf`: 18 image-based pages, visually inspected in full. Business factual source. Pages 3 and 5 repeat the interaction flow. Page 1 supports the current support problem; pages 9–18 support knowledge, governance, integration, escalation and MVP planning.
- `D:\DXP\AI_Helpdesk_Final_Audio_Mix.mp3`: supplied narration/music master. Copied to the Remotion public folder without modification.
- `C:\Users\limyu\.codex\attachments\f88dcd9a-4cc0-42b9-84ef-cacc785adc6e\Pasted text.txt`: creative brief, including Scene 01 review gate. Treated separately from proposal facts.
- Initial workspace contained only `.git`. No separate narration clips, logos or brand kit found in the workspace or supplied audio directory. No scene clips matching relevant names found in Downloads.

## Measured master

Decoded duration **333.52244898 s (05:33.522)**; stereo; **44,100 Hz**; **14,708,340 samples** per channel. Container duration 333.522449 s. Timing obtained by decoding with PyAV, not file-size estimation.

60 fps coverage: **20,012 frames**, 333.533333 s. The 10.884 ms difference is unavoidable with a fixed 60 fps frame grid. Audio remains unmodified. Scene 01 covers frames 0–2164 inclusive, 36.083333 s.

## Detected scene boundaries

| Scene | Topic | Start s | End s |
|---|---|---:|---:|
| 01 | Challenge | 0.00 | 36.08 |
| 02 | Solution | 36.08 | 56.64 |
| 03 | Customer journey | 56.64 | 102.98 |
| 04 | Knowledge preparation | 102.98 | 129.14 |
| 05 | Controlled learning | 129.14 | 147.76 |
| 06 | Grounded AI | 147.76 | 172.60 |
| 07 | Controlled workflow | 172.60 | 200.40 |
| 08 | Ticketing | 200.40 | 222.92 |
| 09 | Escalation | 222.92 | 249.82 |
| 10 | Governance | 249.82 | 279.64 |
| 11 | MVP | 279.64 | 308.02 |
| 12 | Close | 308.02 | 333.522449 |

Local Whisper base.en transcription with word timestamps, VAD and beam size 5. Boundaries are semantic scene divisions based on detected narration. Music continues through pauses; these are speech pauses, not soundtrack silence. ASR timestamps are not guaranteed sample-accurate and should be reviewed during playback.

## Scene 01 cues

Email 3.62 s / f217; WhatsApp 4.52 s / f271; telephone 5.40 s / f324. Understand 12.44 s / f746; search 14.16 s / f850; troubleshoot 15.90 s / f954; update 16.98 s / f1019. Classification, routing and escalation progressively support the 18.52–20.70 s routing phrase. Knowledge begins 21.42 s / f1285. Documents 22.60 s, historical cases 23.68 s, emails 25.22 s, experience 26.34 s. Burden builds at 28.26 s. Hero phrase is spoken 33.26–35.38 s. Transition preparation occupies the last 36 frames before the solution begins at 36.08 s.

Natural speech gaps include 11.44–12.44 s, 20.70–21.42 s, 27.58–28.26 s and 32.60–33.26 s. Hero holds through the final transition preparation; the network stays visible.

The narrated hero says “People are becoming the integration layer.” On-screen wording follows the brief's “People have become the integration layer.” Both express the proposal's existing manual integration burden. No audio wording is changed. The hero begins its visual reveal during the preceding speech pause and reaches full emphasis as the phrase is spoken.

## Review outputs and checks

Scene 01 MP4 and four full-resolution stills are in `../helpdesk-pitch/out/`. Representative opening, developed network, hero and transition states were visually inspected. The source passes TypeScript and ESLint. The audio copy SHA-256 equals the source: `0868AB018C5FE4CD53873E046AD3AEC6C08DC82D0DE58F5F5D7C6E46FEEFA514`. Export technical verification is recorded separately in `export-verification.json`. This is a creative-review delivery; no claim of human-listened, sample-accurate word alignment is made.

## Source boundaries for future scenes

The proposal presents a conditional resolution/escalation journey. Do not imply every case is escalated. Its roadmap includes overlapping work and AI build beginning in W4; the simplified brief must not imply wholly sequential delivery. No ROI percentages, implementation guarantees or invented branding have been added.
