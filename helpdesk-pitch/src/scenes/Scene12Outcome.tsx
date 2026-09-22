import { useCurrentFrame } from "remotion";
import { Scene11Roadmap } from "./Scene11Roadmap";
import {
  SceneChrome,
  AIHub,
  progress,
  mix,
} from "../components/JourneyPrimitives";
import {
  Continuity,
  At,
  Label,
  Expert,
  Wire,
  Travel,
  Paper,
  cue,
  layer,
} from "../components/ProductionPrimitives";
import { ObjectGlyph, ObjectKind } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";

const life: [string, ObjectKind, number][] = [
  ["UNDERSTAND", "chat", 327.08],
  ["RETRIEVE", "knowledge", 327.96],
  ["TROUBLESHOOT", "workflow", 328.64],
  ["RECORD", "ticket", 329.32],
  ["ROUTE", "api", 330.04],
  ["RESOLVE / ESCALATE", "l2-engineer", 331.1],
];
export const Scene12Outcome = () => {
  const f = useCurrentFrame();
  const manual = cue(12, 313.92),
    reuse = cue(12, 316.3),
    handover = cue(12, 320.72),
    final = cue(12, 325.42);
  const settle = progress(f, cue(12, 332.65), 35);
  return (
    <Continuity previous={Scene11Roadmap} previousFrame={1702}>
      <SceneChrome
        number="12"
        label="CONNECTED SUPPORT JOURNEY"
        title={
          <span style={{ opacity: 1 - progress(f, final, 35) }}>
            A connected support model.
          </span>
        }
      >
        <div style={{ ...layer, opacity: 1 - progress(f, final, 35) }}>
          <svg width="1920" height="1080" style={layer}>
            <path
              d="M160 720H1760"
              stroke={c.teal}
              strokeWidth="2"
              opacity=".55"
            />
          </svg>
          <At at={45} end={manual - 30}>
            <AIHub style={{ position: "absolute", left: 780, top: 460 }} />
            <Expert role="support-agent" x={230} y={555} />
            <Expert role="l2-engineer" x={1410} y={555} />
            <Wire x1={510} y1={695} x2={780} y2={575} color={c.teal} />
            <Wire x1={1130} y1={575} x2={1410} y2={695} color={c.teal} />
            <Label x={630} y={835} color={c.teal} size={30}>
              Human expertise stays connected.
            </Label>
          </At>
          <At at={manual} end={reuse - 24}>
            <Label x={112} y={325} color={c.cyan} size={52}>
              LESS REPETITIVE
              <br />
              L1 WORK
            </Label>
            <Expert role="support-agent" x={285} y={570} />
            <AIHub style={{ position: "absolute", left: 1160, top: 525 }} />
            {(
              [
                "email",
                "chat",
                "telephone",
                "search",
                "ticket",
                "workflow",
              ] as ObjectKind[]
            ).map((k, i) => {
              const p = progress(f, manual + 28 + i * 9, 85);
              return (
                <ObjectGlyph
                  key={k}
                  kind={k}
                  size={58}
                  color={c.blue}
                  style={{
                    position: "absolute",
                    left: mix(220 + (i % 3) * 150, 1220, p),
                    top: mix(490 + Math.floor(i / 3) * 310, 595, p),
                    opacity: 1 - p,
                  }}
                />
              );
            })}
            <Wire x1={620} y1={725} x2={1160} y2={635} at={manual + 20} />
            <Label x={970} y={825} size={29}>
              Routine connections consolidate.
              <br />
              People focus on the support that needs them.
            </Label>
          </At>
          <At at={reuse} end={handover - 24}>
            <Label x={112} y={325} color={c.teal} size={52}>
              BETTER KNOWLEDGE
              <br />
              REUSE
            </Label>
            <Paper
              title="Approved knowledge"
              approved
              style={{ left: 720, top: 500, width: 330, height: 235 }}
            />
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <Wire
                  x1={1050}
                  y1={610}
                  x2={1420}
                  y2={440 + i * 190}
                  at={reuse + i * 18}
                  color={c.teal}
                />
                <Travel
                  at={reuse + 30 + i * 25}
                  x1={1050}
                  y1={610}
                  x2={1420}
                  y2={440 + i * 190}
                  color={c.teal}
                />
                <ObjectGlyph
                  kind="chat"
                  size={75}
                  color={c.blue}
                  style={{
                    position: "absolute",
                    left: 1440,
                    top: 400 + i * 190,
                  }}
                />
              </div>
            ))}
            <Label x={590} y={850} size={28}>
              One trusted source supports multiple journeys.
            </Label>
          </At>
          <At at={handover}>
            <Label x={112} y={325} color={c.teal} size={52}>
              BETTER SUPPORT
              <br />
              HANDOVERS
            </Label>
            <Expert role="l2-engineer" x={1440} y={570} />
            <div
              style={{
                position: "absolute",
                left: mix(600, 1080, progress(f, handover + 45, 100)),
                top: 515,
              }}
            >
              <Paper
                title="Complete case context"
                subtitle="Customer • evidence • diagnostics"
                kind="ticket"
                approved
                style={{ left: 0, top: 0, width: 350, height: 250 }}
              />
            </div>
            <Wire
              x1={630}
              y1={760}
              x2={1430}
              y2={760}
              at={handover}
              color={c.teal}
            />
            <Label x={720} y={858} size={29}>
              L2 continues with the history intact.
            </Label>
          </At>
        </div>
        <div style={{ ...layer, opacity: progress(f, final, 35) }}>
          <div
            style={{
              position: "absolute",
              left: 112,
              right: 112,
              top: mix(665, 685, settle),
              height: 180,
              opacity: mix(1, 0.09, settle),
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 50,
                right: 50,
                top: 59,
                height: 2,
                background: c.teal + "66",
              }}
            />
            {life.map(([s, kind, t], i) => {
              const active = progress(f, cue(12, t), 16);
              return (
                <div
                  key={s}
                  style={{
                    position: "absolute",
                    left: i * 280,
                    width: 280,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      background: "#0c2032",
                      padding: 10,
                      borderRadius: 18,
                      border: `1px solid ${active > 0 ? c.teal : c.line}`,
                    }}
                  >
                    <ObjectGlyph
                      kind={kind}
                      size={78}
                      color={active > 0 ? c.teal : c.muted}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      marginTop: 22,
                      color: active > 0 ? c.teal : c.muted,
                    }}
                  >
                    {s}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              position: "absolute",
              left: 112,
              top: mix(225, 275, settle),
              fontSize: 100,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: -3,
            }}
          >
            AI-POWERED
            <br />
            <span style={{ color: c.cyan }}>LEVEL 1 HELPDESK</span>
          </div>
          <div
            style={{
              position: "absolute",
              left: 116,
              top: mix(463, 516, settle),
              fontSize: 38,
              color: c.muted,
              lineHeight: 1.25,
            }}
          >
            A governed foundation
            <br />
            for scalable customer support.
          </div>
          <div
            style={{
              position: "absolute",
              right: 200,
              top: 340,
              opacity: 0.07,
            }}
          >
            <ObjectGlyph kind="shield" size={220} color={c.teal} />
            <ObjectGlyph
              kind="ai"
              size={80}
              style={{ position: "absolute", left: 70, top: 68 }}
            />
          </div>
        </div>
      </SceneChrome>
    </Continuity>
  );
};
