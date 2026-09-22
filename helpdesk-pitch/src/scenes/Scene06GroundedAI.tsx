import { useCurrentFrame } from "remotion";
import { Scene05ControlledLearning } from "./Scene05ControlledLearning";
import { SceneChrome, progress } from "../components/JourneyPrimitives";
import {
  Continuity,
  Hero,
  Paper,
  Vault,
  At,
  Label,
  Wire,
  Travel,
  cue,
  layer,
} from "../components/ProductionPrimitives";
import { GlassCard } from "../components/Primitives";
import { ObjectGlyph } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";

export const Scene06GroundedAI = () => {
  const f = useCurrentFrame();
  const search = cue(6, 150.9),
    retrieve = cue(6, 154.42),
    response = cue(6, 156.02),
    second = cue(6, 158.0),
    missing = cue(6, 159.6),
    stop = cue(6, 161.36),
    clarify = cue(6, 163.38),
    escalate = cue(6, 165.02),
    hero = cue(6, 169.7);
  return (
    <Continuity previous={Scene05ControlledLearning} previousFrame={1117}>
      <SceneChrome
        number="06"
        label="GROUNDED AI"
        title={
          <span style={{ opacity: 1 - progress(f, hero, 24) }}>
            Evidence before answers.
          </span>
        }
      >
        <Hero
          at={hero}
          first="Escalate."
          second="Don’t guess."
          color={c.orange}
        />
        <Vault x={765} y={430} />
        <At at={50}>
          <GlassCard
            style={{
              position: "absolute",
              left: 150,
              top: 435,
              width: 490,
              height: 180,
              padding: 28,
            }}
          >
            <ObjectGlyph kind="chat" size={35} color={c.blue} />
            <div style={{ fontSize: 29, marginTop: 15 }}>
              {f < second
                ? "How should I check error E102?"
                : "What if this model has no guidance?"}
            </div>
          </GlassCard>
        </At>
        <Wire x1={640} y1={525} x2={765} y2={540} at={search} />
        <Travel at={search} x1={630} y1={525} x2={835} y2={535} kind="search" />
        <At at={search} end={retrieve + 20}>
          <ObjectGlyph
            kind="search"
            size={72}
            color={c.orange}
            style={{
              position: "absolute",
              left: 815 + Math.sin(f / 28) * 60,
              top: 530,
            }}
          />
        </At>
        <At at={retrieve} end={second}>
          <Paper
            title="Evidence 01"
            subtitle="Approved cable guidance"
            approved
            style={{ left: 1210, top: 380, width: 470, height: 180 }}
          />
          <Paper
            title="Evidence 02"
            subtitle="Approved IP settings check"
            approved
            style={{ left: 1210, top: 590, width: 470, height: 180 }}
          />
        </At>
        <Wire
          x1={1075}
          y1={535}
          x2={1210}
          y2={475}
          at={retrieve}
          color={c.teal}
        />
        <Travel
          at={retrieve}
          x1={980}
          y1={500}
          x2={1280}
          y2={470}
          color={c.teal}
        />
        <Travel
          at={retrieve + 38}
          x1={980}
          y1={570}
          x2={1280}
          y2={680}
          color={c.teal}
        />
        <Travel
          at={response - 20}
          duration={70}
          x1={1210}
          y1={470}
          x2={570}
          y2={738}
          color={c.teal}
        />
        <Travel
          at={response + 12}
          duration={60}
          x1={1210}
          y1={680}
          x2={615}
          y2={775}
          color={c.teal}
        />
        <At at={response} end={second}>
          <GlassCard
            style={{
              position: "absolute",
              left: 150,
              top: 705,
              width: 550,
              height: 135,
              padding: 25,
              borderColor: c.teal,
            }}
          >
            <div style={{ fontSize: 23, color: c.teal }}>GROUNDED RESPONSE</div>
            <div style={{ fontSize: 25, marginTop: 12 }}>
              Check the cable, then verify IP settings.
            </div>
          </GlassCard>
        </At>
        <At at={second} end={missing + 30}>
          <ObjectGlyph
            kind="search"
            size={72}
            color={c.orange}
            style={{
              position: "absolute",
              left: 820 + Math.sin(f / 20) * 60,
              top: 535,
            }}
          />
        </At>
        <At at={missing}>
          <div
            style={{
              position: "absolute",
              left: 1190,
              top: 435,
              width: 530,
              height: 340,
              border: `1px solid ${c.orange}77`,
              borderRadius: 20,
              padding: 30,
              background: "#12263a",
            }}
          >
            <div style={{ fontSize: 32, color: c.orange, fontWeight: 600 }}>
              NO SUFFICIENT
              <br />
              APPROVED EVIDENCE
            </div>
            <div
              style={{
                height: 75,
                marginTop: 30,
                border: `1px dashed ${c.line}`,
                borderRadius: 13,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  margin: 20,
                  width: 175 * progress(f, stop - 35, 55),
                  height: 8,
                  background: c.muted,
                  opacity: 0.45,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#12263ae8",
                  opacity: progress(f, stop, 16),
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  paddingLeft: 17,
                }}
              >
                <ObjectGlyph kind="shield" size={40} color={c.orange} />
                <span style={{ fontSize: 21 }}>
                  Unsupported response stopped
                </span>
              </div>
            </div>
          </div>
        </At>
        <At at={clarify}>
          <div
            style={{
              position: "absolute",
              left: 180,
              top: 725,
              width: 225,
              height: 90,
              padding: 24,
              border: `1px solid ${c.blue}`,
              background: "#153247",
              borderRadius: 15,
              color: c.blue,
              fontSize: 28,
            }}
          >
            CLARIFY
          </div>
        </At>
        <At at={escalate}>
          <Label x={445} y={755}>
            or
          </Label>
          <div
            style={{
              position: "absolute",
              left: 510,
              top: 725,
              width: 225,
              height: 90,
              padding: 24,
              border: `1px solid ${c.teal}`,
              background: "#13313b",
              borderRadius: 15,
              color: c.teal,
              fontSize: 28,
            }}
          >
            ESCALATE
          </div>
        </At>
        <At at={hero}>
          <Label x={155} y={865} size={23}>
            Safe paths keep the customer journey moving.
          </Label>
        </At>
        <div style={{ ...layer, opacity: progress(f, 1440, 45) }}>
          <Travel
            at={1440}
            duration={50}
            x1={290}
            y1={770}
            x2={300}
            y2={495}
            kind="chat"
          />
        </div>
      </SceneChrome>
    </Continuity>
  );
};
