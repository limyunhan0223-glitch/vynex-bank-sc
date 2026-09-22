import "./index.css";
import { Composition } from "remotion";
import {
  PitchFilm,
  Scene01Preview,
  Scene02Preview,
  Scene03Preview,
} from "./compositions/PitchFilm";
import { timeline } from "./timeline";
import {
  FullFilm,
  ProductionPreview,
  ClosingTransition,
  IndividualScene,
  productionIds,
} from "./compositions/ProductionFilm";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FullFilm-Scenes01-12"
        component={FullFilm}
        durationInFrames={20012}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scenes04-12-Review"
        component={ProductionPreview}
        durationInFrames={13833}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene11-to-12-Transition"
        component={ClosingTransition}
        durationInFrames={720}
        fps={60}
        width={1920}
        height={1080}
      />
      {productionIds.map((id, i) => (
        <Composition
          key={id}
          id={id}
          component={IndividualScene}
          defaultProps={{ index: i + 3 }}
          durationInFrames={timeline[i + 3].durationInFrames}
          fps={60}
          width={1920}
          height={1080}
        />
      ))}
      <Composition
        id="Scene01-Challenge"
        component={Scene01Preview}
        durationInFrames={2165}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scenes01-03-Review"
        component={PitchFilm}
        durationInFrames={timeline[2].endFrame}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene02-Solution"
        component={Scene02Preview}
        durationInFrames={timeline[1].durationInFrames}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene03-CustomerJourney"
        component={Scene03Preview}
        durationInFrames={timeline[2].durationInFrames}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
