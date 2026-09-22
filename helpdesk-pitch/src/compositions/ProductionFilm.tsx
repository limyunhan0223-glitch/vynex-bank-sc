import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Scene01Storytelling } from "../scenes/Scene01Storytelling";
import { Scene02Solution } from "../scenes/Scene02Solution";
import { Scene03CustomerJourney } from "../scenes/Scene03CustomerJourney";
import { Scene04Knowledge } from "../scenes/Scene04Knowledge";
import { Scene05ControlledLearning } from "../scenes/Scene05ControlledLearning";
import { Scene06GroundedAI } from "../scenes/Scene06GroundedAI";
import { Scene07Workflow } from "../scenes/Scene07Workflow";
import { Scene08Ticketing } from "../scenes/Scene08Ticketing";
import { Scene09Escalation } from "../scenes/Scene09Escalation";
import { Scene10Governance } from "../scenes/Scene10Governance";
import { Scene11Roadmap } from "../scenes/Scene11Roadmap";
import { Scene12Outcome } from "../scenes/Scene12Outcome";
import { timeline } from "../timeline";

export const sceneComponents = [
  Scene01Storytelling,
  Scene02Solution,
  Scene03CustomerJourney,
  Scene04Knowledge,
  Scene05ControlledLearning,
  Scene06GroundedAI,
  Scene07Workflow,
  Scene08Ticketing,
  Scene09Escalation,
  Scene10Governance,
  Scene11Roadmap,
  Scene12Outcome,
];
export const productionIds = [
  "Scene04-Knowledge",
  "Scene05-ControlledLearning",
  "Scene06-GroundedAI",
  "Scene07-Workflow",
  "Scene08-Ticketing",
  "Scene09-Escalation",
  "Scene10-Governance",
  "Scene11-Roadmap",
  "Scene12-Outcome",
];
export const ProductionRange = ({
  start = 0,
  end = 20012,
}: {
  start?: number;
  end?: number;
}) => (
  <AbsoluteFill>
    {sceneComponents.map((Scene, i) =>
      timeline[i].endFrame > start && timeline[i].startFrame < end ? (
        <Sequence
          key={timeline[i].id}
          from={timeline[i].startFrame - start}
          durationInFrames={timeline[i].durationInFrames}
          name={`${timeline[i].id} — ${timeline[i].name}`}
        >
          <Scene />
        </Sequence>
      ) : null,
    )}
    <Audio src={staticFile("master.mp3")} trimBefore={start} />
  </AbsoluteFill>
);
export const FullFilm = () => <ProductionRange />;
export const ProductionPreview = () => <ProductionRange start={6179} />;
export const ClosingTransition = () => (
  <ProductionRange start={18181} end={18901} />
);
export const IndividualScene = ({ index = 3 }: { index?: number }) => {
  const Scene = sceneComponents[index];
  return (
    <AbsoluteFill>
      <Scene />
      <Audio
        src={staticFile("master.mp3")}
        trimBefore={timeline[index].startFrame}
      />
    </AbsoluteFill>
  );
};
