import { useCurrentFrame } from "remotion";
import { Scene08Ticketing } from "./Scene08Ticketing";
import { SceneChrome, progress, mix } from "../components/JourneyPrimitives";
import {
  Continuity,
  Hero,
  At,
  Label,
  Expert,
  Travel,
  Wire,
  cue,
  layer,
} from "../components/ProductionPrimitives";
import { GlassCard } from "../components/Primitives";
import { ObjectGlyph } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";

export const Scene09Escalation = () => {
  const f = useCurrentFrame();
  const before = cue(9, 228.02),
    after = cue(9, 232.46),
    ready = cue(9, 243.68),
    hero = cue(9, 246.3);
  const send = progress(f, ready + 40, 110);
  const fields = [
    ["CUSTOMER", "ABC Manufacturing", 234.26],
    ["PRODUCT", "MX-500", 235.52],
    ["ISSUE", "Network Connectivity", 237.14],
    ["ERROR", "E102", 237.52],
    ["DIAGNOSTICS", "Cable / IP checks", 238.32],
    ["COMPLETED", "Restart; approved checks", 240.28],
    ["RESULTS", "Issue persists", 242.24],
    ["CASE CONTEXT", "Prior actions retained", 242.65],
    ["ROUTING", "Level 2 support", 243.1],
  ] as const;
  return (
    <Continuity previous={Scene08Ticketing} previousFrame={1350}>
      <SceneChrome
        number="09"
        label="BETTER LEVEL 2 ESCALATION"
        title={
          <span style={{ opacity: 1 - progress(f, hero, 24) }}>
            Escalate with the whole story.
          </span>
        }
      >
        <Hero
          at={hero}
          first="Continue from where"
          second="Level One stopped."
          color={c.teal}
        />
        <Expert role="l2-engineer" x={1440} y={560} active={f >= ready} />
        <At at={60} end={after - 24}>
          <Label x={180} y={360} color={c.orange}>
            BEFORE / LIMITED CONTEXT
          </Label>
          <GlassCard
            style={{
              position: "absolute",
              left: 350,
              top: 455,
              width: 775,
              height: 195,
              padding: 35,
            }}
          >
            <ObjectGlyph kind="ticket" size={47} color={c.orange} />
            <div style={{ fontSize: 34, marginTop: 14 }}>
              “Customer has network problem.”
            </div>
          </GlassCard>
          <div
            style={{
              position: "absolute",
              left: 350,
              top: 710,
              display: "flex",
              gap: 25,
              opacity: progress(f, before, 30),
            }}
          >
            {["Context", "Diagnostics", "History", "Results"].map((s) => (
              <div
                key={s}
                style={{
                  fontSize: 23,
                  color: c.muted,
                  borderBottom: `1px dashed ${c.orange}`,
                  paddingBottom: 15,
                }}
              >
                {s} missing
              </div>
            ))}
          </div>
          <Wire
            x1={1125}
            y1={555}
            x2={1440}
            y2={660}
            at={before}
            color={c.orange}
          />
        </At>
        <At at={after}>
          <Label x={160} y={370} color={c.teal}>
            AFTER / STRUCTURED HANDOVER
          </Label>
          <div
            style={{
              position: "absolute",
              left: mix(550, 780, send),
              top: mix(420, 450, send),
              width: 820,
              height: 450,
              scale: mix(1, 0.84, send),
              transformOrigin: "top left",
            }}
          >
            <GlassCard
              style={{
                position: "absolute",
                inset: 0,
                padding: 28,
                borderColor: c.teal + "88",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 17,
                  alignItems: "center",
                  fontSize: 29,
                  fontWeight: 600,
                  marginBottom: 25,
                }}
              >
                <ObjectGlyph kind="ticket" size={43} color={c.teal} />
                CASE #10284 / LEVEL 2 HANDOVER
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 19,
                }}
              >
                {fields.map(([label, value, t]) => (
                  <div
                    key={label}
                    style={{
                      height: 93,
                      borderTop: `1px solid ${c.line}`,
                      paddingTop: 14,
                      opacity: progress(f, cue(9, t), 25),
                    }}
                  >
                    <div
                      style={{
                        fontSize: 15,
                        color: c.teal,
                        letterSpacing: 0.8,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{ fontSize: 23, marginTop: 10, lineHeight: 1.2 }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </At>
        {fields.map(([label, , t], i) => (
          <Travel
            key={label}
            at={cue(9, t) - 15}
            duration={50}
            x1={180 + (i % 3) * 85}
            y1={475 + (i % 4) * 90}
            x2={640 + (i % 3) * 250}
            y2={530 + Math.floor(i / 3) * 110}
            kind={i < 4 ? "document" : "ticket"}
            color={c.teal}
          />
        ))}
        <At at={ready}>
          <Label x={190} y={630} color={c.teal} size={34}>
            READY FOR
            <br />
            LEVEL 2 ✓
          </Label>
          <div
            style={{
              position: "absolute",
              left: 890,
              top: 872,
              display: "flex",
              gap: 20,
              alignItems: "center",
              fontSize: 23,
              color: c.teal,
            }}
          >
            <span>Final L1 state</span>
            <span>→</span>
            <span>L2 continues</span>
            <ObjectGlyph kind="checkmark" size={32} color={c.teal} />
          </div>
        </At>
        <div style={{ ...layer, opacity: progress(f, 1550, 63) }}>
          <svg width="1920" height="1080">
            <rect
              x="145"
              y="360"
              width="1630"
              height="565"
              rx="30"
              fill="none"
              stroke={c.teal + "66"}
              strokeWidth="2"
            />
          </svg>
        </div>
      </SceneChrome>
    </Continuity>
  );
};
