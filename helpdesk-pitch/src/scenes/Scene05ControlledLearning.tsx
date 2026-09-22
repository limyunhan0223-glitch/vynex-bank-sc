import { useCurrentFrame } from "remotion";
import { Scene04Knowledge } from "./Scene04Knowledge";
import {
  SceneChrome,
  progress,
  mix,
  Status,
} from "../components/JourneyPrimitives";
import {
  Continuity,
  Hero,
  Paper,
  Vault,
  Expert,
  At,
  Label,
  Wire,
  Travel,
  cue,
  layer,
} from "../components/ProductionPrimitives";
import { ObjectGlyph } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";

export const Scene05ControlledLearning = () => {
  const f = useCurrentFrame();
  const blocked = cue(5, 132.5),
    candidate = cue(5, 137.92),
    review = cue(5, 142.26),
    valid = cue(5, 142.98),
    approve = cue(5, 143.88),
    hero = cue(5, 144.7);
  const arrive = progress(f, 55, 130);
  const inspect = progress(f, candidate, 70);
  const publish = progress(f, approve + 25, 75);
  return (
    <Continuity previous={Scene04Knowledge} previousFrame={1568}>
      <SceneChrome
        number="05"
        label="CONTROLLED LEARNING"
        title={
          <span style={{ opacity: 1 - progress(f, hero, 24) }}>
            Learning earns trust.
          </span>
        }
      >
        <Hero
          at={hero}
          first="Human expertise"
          second="stays in control."
          color={c.teal}
        />
        <Vault />
        <Paper
          title="Trusted knowledge"
          approved
          style={{ left: 1030, top: 475, opacity: 1 - progress(f, 50, 55) }}
        />
        <Wire x1={420} y1={580} x2={1370} y2={580} at={50} color={c.teal} />
        <div
          style={{
            position: "absolute",
            left: mix(mix(190, 895, arrive), mix(610, 1030, publish), inspect),
            top: mix(465, 430, inspect),
            opacity: progress(f, 35, 30),
          }}
        >
          <Paper
            title={
              f < candidate
                ? "Resolved case"
                : f < approve
                  ? "Candidate knowledge"
                  : "Approved knowledge"
            }
            subtitle={
              f < candidate
                ? "Successful resolution ✓"
                : f < approve
                  ? "Awaiting expert validation"
                  : "Ready to publish"
            }
            kind={f < candidate ? "ticket" : "document"}
            approved={f >= approve}
            style={{ left: 0, top: 0, width: 300, height: 235 }}
          />
        </div>
        <div
          style={{
            ...layer,
            opacity: progress(f, blocked, 24) * (1 - progress(f, approve, 30)),
          }}
        >
          <svg width="1920" height="1080">
            <path d="M1255 375v425" stroke={c.orange} strokeWidth="3" />
            <path
              d="M1242 375h26M1242 800h26"
              stroke={c.orange}
              strokeWidth="3"
            />
          </svg>
          <ObjectGlyph
            kind="shield"
            color={c.orange}
            size={68}
            style={{
              position: "absolute",
              left: 1221,
              top: 545,
              background: "#102438",
            }}
          />
          <At at={blocked} end={candidate}>
            <Label x={180} y={740} color={c.orange} size={42}>
              NOT AUTOMATICALLY
              <br />
              TRUSTED
            </Label>
          </At>
        </div>
        <At at={candidate - 30}>
          <Expert x={195} y={560} active={f < approve} />
          <Label x={605} y={375} color={c.purple}>
            SME REVIEW
          </Label>
        </At>
        <At at={review - 20} end={approve}>
          <ObjectGlyph
            kind="search"
            size={78}
            color={c.orange}
            style={{
              position: "absolute",
              left: 790 + Math.sin(f / 18) * 15,
              top: 490,
            }}
          />
          <Paper
            title="Compare sources"
            subtitle="Check technical guidance"
            style={{ left: 940, top: 425, width: 260, height: 220 }}
          />
        </At>
        <At at={candidate}>
          <div
            style={{
              position: "absolute",
              left: 600,
              top: 750,
              display: "flex",
              gap: 24,
            }}
          >
            {[
              ["REVIEW", review],
              ["VALIDATE", valid],
              ["APPROVE", approve],
              ["PUBLISH", approve + 75],
            ].map(([s, t]) => (
              <div
                key={s}
                style={{
                  fontSize: 22,
                  color: f >= Number(t) ? c.teal : c.muted,
                  opacity: f >= Number(t) ? 1 : 0.45,
                }}
              >
                {s}
                {f >= Number(t) ? " ✓" : ""}
              </div>
            ))}
          </div>
        </At>
        <At at={approve + 90}>
          <div style={{ position: "absolute", left: 1365, top: 795 }}>
            <Status text="Published after approval" />
          </div>
        </At>
        <Travel
          at={approve + 70}
          duration={70}
          x1={1180}
          y1={590}
          x2={1518}
          y2={565}
          kind="knowledge"
          color={c.teal}
        />
      </SceneChrome>
    </Continuity>
  );
};
