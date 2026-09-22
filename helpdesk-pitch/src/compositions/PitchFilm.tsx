import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Scene01Storytelling } from "../scenes/Scene01Storytelling";
import { Scene02Solution } from "../scenes/Scene02Solution";
import { Scene03CustomerJourney } from "../scenes/Scene03CustomerJourney";
import { timeline } from "../timeline";
export const Scene01Preview = () => (
  <AbsoluteFill>
    <Scene01Storytelling />
    <Audio src={staticFile("master.mp3")} />
  </AbsoluteFill>
);
// One continuous, unmodified master soundtrack; scenes use local frame clocks.
export const PitchFilm = () => (
  <AbsoluteFill>
    <Sequence
      durationInFrames={timeline[0].durationInFrames}
      name="01 — Approved challenge"
    >
      <Scene01Storytelling />
    </Sequence>
    <Sequence
      from={timeline[1].startFrame}
      durationInFrames={timeline[1].durationInFrames}
      premountFor={60}
      name="02 — Solution"
    >
      <Scene02Solution />
    </Sequence>
    <Sequence
      from={timeline[2].startFrame}
      durationInFrames={timeline[2].durationInFrames}
      premountFor={60}
      name="03 — Customer journey"
    >
      <Scene03CustomerJourney />
    </Sequence>
    <Audio src={staticFile("master.mp3")} />
  </AbsoluteFill>
);
export const Scene02Preview = () => (
  <AbsoluteFill>
    <Scene02Solution />
    <Audio src={staticFile("master.mp3")} trimBefore={timeline[1].startFrame} />
  </AbsoluteFill>
);
export const Scene03Preview = () => (
  <AbsoluteFill>
    <Scene03CustomerJourney />
    <Audio src={staticFile("master.mp3")} trimBefore={timeline[2].startFrame} />
  </AbsoluteFill>
);
