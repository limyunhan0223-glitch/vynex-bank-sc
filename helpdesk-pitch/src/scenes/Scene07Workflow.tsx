import { useCurrentFrame } from "remotion";
import { Scene06GroundedAI } from "./Scene06GroundedAI";
import {
  SceneChrome,
  CustomerFigure,
  progress,
} from "../components/JourneyPrimitives";
import {
  Continuity,
  Hero,
  At,
  Label,
  Wire,
  Travel,
  Packet,
  cue,
} from "../components/ProductionPrimitives";
import { GlassCard } from "../components/Primitives";
import { ObjectGlyph } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";

export const Scene07Workflow = () => {
  const f = useCurrentFrame();
  const ask = cue(7, 180.14),
    reply = cue(7, 182.32),
    interpret = cue(7, 183.64),
    workflow = cue(7, 188.82),
    next = cue(7, 190.2),
    action = cue(7, 191.12),
    result = cue(7, 192.4),
    stop = cue(7, 194.34),
    hero = cue(7, 196.54);
  const rows = [
    ["NEXT STEP", "Verify IP settings", next],
    ["PERMITTED ACTION", "Approved diagnostic check", action],
    ["EXPECTED RESULT", "Connection verified", result],
    ["STOP CONDITION", "L1 guidance exhausted", stop],
    ["ESCALATION CONDITION", "Issue remains unresolved", stop + 32],
  ] as const;
  return (
    <Continuity previous={Scene06GroundedAI} previousFrame={1489}>
      <SceneChrome
        number="07"
        label="AI + CONTROLLED WORKFLOW"
        title={
          <span style={{ opacity: 1 - progress(f, hero, 24) }}>
            Two roles. One support journey.
          </span>
        }
      >
        <Hero at={hero} first="AI communicates." second="Workflow controls." />
        <At at={60}>
          <Label x={150} y={350} color={c.blue}>
            AI CONVERSATION
          </Label>
          <Label x={1100} y={350} color={c.orange}>
            CONTROLLED WORKFLOW
          </Label>
          <CustomerFigure
            style={{
              left: 125,
              top: 615,
              scale: 0.85,
              transformOrigin: "top left",
            }}
          />
          <GlassCard
            style={{
              position: "absolute",
              left: 185,
              top: 420,
              width: 660,
              height: 148,
              padding: 26,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                color: c.blue,
                fontSize: 19,
              }}
            >
              <ObjectGlyph kind="ai" size={33} />
              AI / CLARIFY
            </div>
            <div style={{ fontSize: 29, marginTop: 15 }}>
              {f < ask
                ? "Let’s check the connection together."
                : "Is the LAN cable securely connected?"}
            </div>
          </GlassCard>
        </At>
        <At at={reply}>
          <GlassCard
            style={{
              position: "absolute",
              left: 420,
              top: 610,
              width: 425,
              height: 100,
              padding: 24,
              borderColor: c.teal + "88",
            }}
          >
            <div style={{ fontSize: 27, color: c.teal }}>
              “Yes. The cable is connected.”
            </div>
          </GlassCard>
        </At>
        <At at={interpret}>
          <div
            style={{
              position: "absolute",
              left: 460,
              top: 754,
              color: c.cyan,
              fontSize: 23,
            }}
          >
            INTERPRETED: CABLE_CONNECTED = YES
          </div>
          <Label x={460} y={798} size={19}>
            Understand → ask → explain → interpret → summarise
          </Label>
        </At>
        <Wire x1={845} y1={662} x2={1070} y2={620} at={interpret} />
        <Travel
          at={workflow - 55}
          x1={845}
          y1={662}
          x2={1080}
          y2={620}
          kind="document"
        />
        <At at={workflow - 45}>
          <GlassCard
            style={{
              position: "absolute",
              left: 1070,
              top: 405,
              width: 650,
              height: 447,
              padding: 28,
              borderColor: c.orange + "77",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 18,
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <ObjectGlyph kind="workflow" size={42} color={c.orange} />
              <span style={{ fontSize: 27, fontWeight: 600 }}>
                Approved process evaluates the answer
              </span>
            </div>
            {rows.map(([label, value, t]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 65,
                  borderTop: `1px solid ${c.line}`,
                  opacity: progress(f, t, 20),
                }}
              >
                <div
                  style={{
                    width: 205,
                    fontSize: 16,
                    color: c.orange,
                    letterSpacing: 0.6,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 23 }}>{value}</div>
              </div>
            ))}
          </GlassCard>
        </At>
        <Wire
          x1={1080}
          y1={872}
          x2={650}
          y2={890}
          at={action}
          color={c.orange}
        />
        <Travel
          at={action + 25}
          duration={80}
          x1={1080}
          y1={870}
          x2={760}
          y2={870}
          kind="workflow"
          color={c.orange}
        />
        <At at={action + 65} end={1600}>
          <div
            style={{
              position: "absolute",
              left: 390,
              top: 856,
              fontSize: 26,
              color: c.teal,
            }}
          >
            NEXT MESSAGE: “Let’s verify the IP settings.”
          </div>
        </At>
        <At at={1610}>
          <Packet x={690} y={710} />
        </At>
      </SceneChrome>
    </Continuity>
  );
};
