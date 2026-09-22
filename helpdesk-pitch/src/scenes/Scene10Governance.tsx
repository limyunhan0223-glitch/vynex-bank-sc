import { useCurrentFrame } from "remotion";
import { Scene09Escalation } from "./Scene09Escalation";
import { SceneChrome, AIHub, progress } from "../components/JourneyPrimitives";
import {
  Continuity,
  Hero,
  At,
  Label,
  Travel,
  cue,
  layer,
} from "../components/ProductionPrimitives";
import { ObjectGlyph, ObjectKind } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";

const controls: [string, ObjectKind, number, number, number][] = [
  ["APPROVED KNOWLEDGE", "knowledge", 220, 435, 253.44],
  ["ACCESS CONTROL", "shield", 650, 410, 255.04],
  ["LEAST PRIVILEGE", "shield", 1180, 415, 256.76],
  ["AUDITABILITY", "ticket", 1490, 580, 258.18],
  ["DATA PROTECTION", "database", 1120, 790, 259.48],
  ["HUMAN OVERSIGHT", "sme-reviewer", 620, 790, 261.1],
  ["SAFE FAILURE", "workflow", 210, 725, 262.54],
];
export const Scene10Governance = () => {
  const f = useCurrentFrame();
  const demo = cue(10, 264.12),
    hero = cue(10, 276.6),
    depart = progress(f, 1730, 58);
  const stage =
    f < cue(10, 270.16)
      ? 0
      : f < cue(10, 271.84)
        ? 1
        : f < cue(10, 273.74)
          ? 2
          : 3;
  return (
    <Continuity previous={Scene09Escalation} previousFrame={1613}>
      <SceneChrome
        number="10"
        label="GOVERNED BY DESIGN"
        title={
          <span style={{ opacity: 1 - progress(f, hero, 24) }}>
            Clear boundaries. Trusted support.
          </span>
        }
      >
        <Hero at={hero} first="Governed" second="by design." color={c.teal} />
        <div style={{ ...layer, opacity: 1 - depart }}>
          <svg width="1920" height="1080" style={layer}>
            <rect
              x="145"
              y="360"
              width="1630"
              height="565"
              rx="30"
              fill="none"
              stroke={c.teal + "66"}
              strokeWidth="2"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - progress(f, 45, 110)}
            />
          </svg>
          <AIHub
            compact
            style={{
              position: "absolute",
              left: 825,
              top: 580,
              width: 270,
              height: 180,
              padding: 24,
            }}
          />
          <div style={{ opacity: 1 - progress(f, demo, 30) }}>
            {controls.map(([label, kind, x, y, t]) => (
              <At key={label} at={cue(10, t)}>
                <ObjectGlyph
                  kind={kind}
                  size={62}
                  color={c.teal}
                  style={{ position: "absolute", left: x, top: y }}
                />
                <Label x={x - 25} y={y + 77} size={18}>
                  {label}
                </Label>
              </At>
            ))}
          </div>
          <At at={demo}>
            <Label x={190} y={397} color={c.teal} size={28}>
              AI CAN
            </Label>
            <Label x={1160} y={397} color={c.orange} size={28}>
              AI CANNOT
            </Label>
            <div
              style={{ position: "absolute", left: 190, top: 455, width: 575 }}
            >
              {[
                "Use approved knowledge",
                "Perform approved L1 actions",
                "Classify and route",
                "Make authorised ticket updates",
                "Escalate unresolved cases",
              ].map((s, i) => (
                <div
                  key={s}
                  style={{
                    fontSize: 25,
                    padding: "13px 0",
                    borderBottom: `1px solid ${c.line}`,
                    opacity: progress(f, demo + i * 12, 20),
                    display: "flex",
                    gap: 14,
                  }}
                >
                  <ObjectGlyph kind="checkmark" size={26} color={c.teal} />
                  {s}
                </div>
              ))}
            </div>
            <div
              style={{ position: "absolute", left: 1160, top: 455, width: 560 }}
            >
              {[
                "Invent technical procedures",
                "Bypass access controls",
                "Publish unvalidated knowledge",
                "Operate outside authorised boundaries",
                "Fabricate solutions",
              ].map((s, i) => (
                <div
                  key={s}
                  style={{
                    fontSize: 24,
                    padding: "12px 0",
                    borderBottom: `1px solid ${c.line}`,
                    color: c.muted,
                    opacity: progress(f, cue(10, 267.7) + i * 15, 20),
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
            <Label x={190} y={837} color={c.teal} size={23}>
              APPROVED ACTION → ALLOWED ✓
            </Label>
          </At>
          <Travel
            at={demo + 35}
            x1={690}
            y1={700}
            x2={825}
            y2={675}
            kind="ticket"
            color={c.teal}
          />
          <At at={cue(10, 268.2)}>
            <div
              style={{
                position: "absolute",
                left: 1140,
                top: 812,
                width: 570,
                height: 78,
                border: `1px solid ${c.orange}88`,
                borderRadius: 13,
                padding: 18,
                display: "flex",
                gap: 16,
                alignItems: "center",
                background: "#15283b",
              }}
            >
              <ObjectGlyph kind="shield" color={c.orange} size={42} />
              <span style={{ fontSize: 22, color: c.orange }}>
                {
                  [
                    "UNSUPPORTED ANSWER — BLOCKED",
                    "UNAUTHORISED ACTION — BLOCKED",
                    "UNVALIDATED KNOWLEDGE — REVIEW REQUIRED",
                    "OUTSIDE BOUNDARY — BLOCK / ESCALATE",
                  ][stage]
                }
              </span>
            </div>
          </At>
        </div>
        <svg width="1920" height="1080" style={layer}>
          <path
            d="M160 720H1760"
            stroke={c.teal}
            strokeWidth="2"
            opacity={depart}
          />
        </svg>
      </SceneChrome>
    </Continuity>
  );
};
