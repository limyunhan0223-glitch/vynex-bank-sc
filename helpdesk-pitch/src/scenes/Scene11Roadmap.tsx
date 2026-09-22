import { useCurrentFrame } from "remotion";
import { Scene10Governance } from "./Scene10Governance";
import { SceneChrome, progress, mix } from "../components/JourneyPrimitives";
import {
  Continuity,
  At,
  Label,
  cue,
  layer,
} from "../components/ProductionPrimitives";
import { ObjectGlyph, ObjectKind } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";

const milestones: [string, ObjectKind, number][] = [
  ["DISCOVERY", "search", 284.46],
  ["SOLUTION DESIGN", "workflow", 285.3],
  ["KNOWLEDGE ENGINEERING", "document", 286.76],
  ["KNOWLEDGE VALIDATION", "sme-reviewer", 288.02],
  ["AI DEVELOPMENT", "ai", 289.16],
  ["TICKETING INTEGRATION", "api", 290.44],
  ["INTEGRATION TESTING", "ticket", 291.65],
  ["END-TO-END TESTING", "workflow", 292.52],
  ["UAT", "customer", 293.82],
  ["OPTIMISATION & HANDOVER", "l2-engineer", 295.42],
];
export const Scene11Roadmap = () => {
  const f = useCurrentFrame();
  const pull = progress(f, cue(11, 296.6), 70);
  const gate = cue(11, 305.5);
  const depart = progress(f, 1642, 60);
  const active = milestones.reduce(
    (n, m, i) => (f >= cue(11, m[2]) ? i : n),
    0,
  );
  let camera = 0;
  for (let i = 1; i < milestones.length; i++)
    camera += 340 * progress(f, cue(11, milestones[i][2]) - 10, 35);
  const zoom = mix(1, 0.49, pull);
  const left = mix(650 - camera, 135, pull);
  return (
    <Continuity previous={Scene10Governance} previousFrame={1788}>
      <SceneChrome
        number="11"
        label="IMPLEMENTATION JOURNEY"
        title="10-week MVP."
        subtitle="A focused implementation path, with evidence before deployment."
      >
        <svg width="1920" height="1080" style={layer}>
          <path
            d={`M160 ${720 + 40 * progress(f, 150, 75) * (1 - pull)}H1760`}
            stroke={c.teal}
            strokeWidth="2"
            opacity={0.7}
          />
        </svg>
        <div style={{ ...layer, opacity: 1 - depart, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              left,
              top: mix(395, 395, pull),
              width: 3400,
              height: 445,
              scale: zoom,
              transformOrigin: "top left",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 365,
                height: 2,
                background: c.line,
              }}
            />
            {milestones.map(([name, kind, t], i) => (
              <div
                key={name}
                style={{
                  position: "absolute",
                  left: i * 340,
                  width: 300,
                  height: 445,
                  opacity:
                    progress(f, cue(11, t) - 35, 25) *
                    mix(i === active ? 1 : 0.22, 1, pull),
                }}
              >
                <div
                  style={{
                    fontSize: 80,
                    color: i === active ? c.cyan : c.muted,
                    fontWeight: 600,
                    letterSpacing: -3,
                  }}
                >
                  W{i + 1}
                </div>
                <ObjectGlyph
                  kind={kind}
                  size={120}
                  color={i === active ? c.cyan : c.muted}
                  style={{ marginTop: 12 }}
                />
                <div
                  style={{
                    fontSize: 32,
                    lineHeight: 1.14,
                    color: c.text,
                    marginTop: 23,
                    width: 280,
                    fontWeight: 600,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 351,
                    left: 1,
                    width: 28,
                    height: 28,
                    borderRadius: 20,
                    background: i <= active ? c.blue : "#153047",
                    border: `2px solid ${c.blue}`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 405,
                    color: c.muted,
                    fontSize: 24,
                  }}
                >
                  PLANNED MILESTONE
                </div>
              </div>
            ))}
          </div>
          <At at={cue(11, 280.1)} end={cue(11, 284.46) - 30}>
            <Label x={645} y={465} color={c.cyan} size={65}>
              10 weeks.
              <br />
              One practical journey.
            </Label>
          </At>
          <At at={cue(11, 297.36)}>
            <Label x={150} y={664} color={c.muted} size={18}>
              DEPLOYMENT ASSESSMENT / NOT YET PASSED
            </Label>
          </At>
          {[
            ["AI QUALITY", 301.32, "ai"],
            ["CONTROL & INTEGRATION", 302.3, "shield"],
            ["BUSINESS READINESS", 304.26, "customer"],
          ].map(([s, t, kind], i) => (
            <At key={s} at={cue(11, Number(t))}>
              <div
                style={{
                  position: "absolute",
                  left: 160 + i * 550,
                  top: 744,
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <ObjectGlyph
                  kind={kind as ObjectKind}
                  color={c.purple}
                  size={53}
                />
                <div>
                  <div style={{ fontSize: 25 }}>{s}</div>
                  <div style={{ fontSize: 18, color: c.muted, marginTop: 7 }}>
                    Evidence to be assessed
                  </div>
                </div>
              </div>
            </At>
          ))}
          <At at={gate}>
            <div
              style={{
                position: "absolute",
                left: 650,
                top: 868,
                width: 620,
                height: 74,
                border: `1px solid ${c.orange}88`,
                borderRadius: 12,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 35,
                color: c.orange,
                fontSize: 30,
              }}
            >
              <span>GO</span>
              <span style={{ color: c.muted }}>/</span>
              <span>NO-GO</span>
              <span style={{ fontSize: 19, color: c.muted }}>
                DECISION REQUIRED
              </span>
            </div>
          </At>
        </div>
      </SceneChrome>
    </Continuity>
  );
};
