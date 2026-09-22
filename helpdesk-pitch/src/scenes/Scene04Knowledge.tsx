import { useCurrentFrame } from "remotion";
import { Scene03CustomerJourney } from "./Scene03CustomerJourney";
import { SceneChrome, progress, mix } from "../components/JourneyPrimitives";
import {
  Continuity,
  Hero,
  Paper,
  Vault,
  At,
  Label,
  StepRail,
  Travel,
  cue,
  layer,
} from "../components/ProductionPrimitives";
import { ObjectGlyph, ObjectKind } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";

const steps = [
  "COLLECT",
  "REVIEW",
  "CLEAN",
  "DEDUPLICATE",
  "STRUCTURE",
  "CLASSIFY",
  "VALIDATE",
  "APPROVE",
];
const times = [
  116.0, 119.42, 120.18, 120.5, 120.78, 121.62, 123.08, 123.64,
].map((t) => cue(4, t));
const sources: [string, ObjectKind, number, number, number][] = [
  ["FAQ", "document", 160, 390, 110.42],
  ["Historical ticket", "ticket", 185, 650, 111.22],
  ["Product manual", "manual", 600, 410, 112.54],
  ["Troubleshooting guide", "manual", 1060, 390, 113.7],
  ["Known issue", "warning", 1390, 650, 115.06],
  ["Product information", "document", 1420, 410, 114.45],
];
export const Scene04Knowledge = () => {
  const f = useCurrentFrame();
  const phase = times.reduce((n, t, i) => (f >= t ? i : n), -1);
  const output = progress(f, cue(4, 124.8), 105);
  const prep = progress(f, times[0], 90);
  const clean = progress(f, times[2], 18);
  const dedup = progress(f, times[3], 18);
  const structured = progress(f, times[4], 36);
  const hero = cue(4, 125.1);
  return (
    <Continuity previous={Scene03CustomerJourney} previousFrame={2780}>
      <SceneChrome
        number="04"
        label="TRUSTED KNOWLEDGE"
        title={
          <span style={{ opacity: 1 - progress(f, hero, 24) }}>
            Reliable AI starts with knowledge.
          </span>
        }
      >
        <Hero
          at={hero}
          first="Approved AI"
          second="knowledge base."
          color={c.teal}
        />
        <At at={60} end={times[0] - 30}>
          <Label x={112} y={290} size={29}>
            Prepare company knowledge before AI can use it.
          </Label>
        </At>
        {sources.map(([title, kind, x, y, t], i) => {
          const p = progress(f, times[0] + i * 10, 105);
          return (
            <Paper
              key={title}
              title={title}
              kind={kind}
              subtitle="Company source"
              style={{
                left: mix(x, 790, p),
                top: mix(y, 440, p),
                width: 290,
                height: 205,
                opacity: progress(f, cue(4, t) - 25, 30) * (1 - p),
                rotate: `${mix(i % 2 ? 3 : -3, 0, p)}deg`,
              }}
            />
          );
        })}
        <At at={times[0]}>
          <div
            style={{
              position: "absolute",
              left: 112,
              top: 345,
              color: c.purple,
              fontSize: 20,
              letterSpacing: 2,
            }}
          >
            THE KNOWLEDGE REFINERY
          </div>
        </At>
        <div style={{ ...layer, opacity: prep }}>
          <svg width="1920" height="1080" style={layer}>
            <path d="M210 740H1660" stroke={c.line} strokeWidth="2" />
            <path
              d="M380 740h880"
              stroke={c.teal}
              opacity={output}
              strokeWidth="3"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              left: mix(655, 1030, output),
              top: mix(409, 475, output),
              width: mix(540, 300, output),
              height: mix(355, 220, output),
              background: "linear-gradient(145deg,#1c354e,#102438)",
              border: `1px solid ${phase >= 6 ? c.teal : c.purple}88`,
              borderRadius: 20,
              padding: 28,
            }}
          >
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <ObjectGlyph
                kind={phase >= 7 ? "knowledge" : "document"}
                size={48}
                color={phase >= 7 ? c.teal : c.purple}
              />
              <div style={{ fontSize: mix(32, 25, output), fontWeight: 600 }}>
                {phase >= 7 ? "Trusted knowledge" : "E102 / network guidance"}
              </div>
            </div>
            <svg
              width="470"
              height="215"
              viewBox="0 0 470 215"
              style={{
                position: "absolute",
                left: 28,
                top: 105,
                scale: mix(1, 0.35, output),
                transformOrigin: "top left",
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <g
                  key={i}
                  transform={`translate(${mix(i % 2 ? 30 : 0, 0, structured)} ${i * 34})`}
                >
                  <rect
                    width={mix([370, 280, 410, 210, 350][i], 430, structured)}
                    height={mix(8, 25, structured)}
                    rx="4"
                    fill={i === 0 ? c.teal + "55" : c.line}
                  />
                  <rect
                    x="18"
                    y="9"
                    width={90}
                    height="5"
                    fill={c.teal}
                    opacity={structured}
                  />
                  <rect
                    x="150"
                    y="9"
                    width={180 - i * 20}
                    height="5"
                    fill={c.muted}
                    opacity={structured}
                  />
                </g>
              ))}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect
                  key={i}
                  x={40 + i * 64}
                  y={20 + (i % 3) * 34}
                  width="29"
                  height="4"
                  fill={c.orange}
                  opacity={(1 - clean) * 0.8}
                />
              ))}
              <g
                opacity={1 - dedup}
                transform={`translate(${mix(28, 0, dedup)} ${mix(24, 0, dedup)})`}
              >
                <rect
                  x="240"
                  y="135"
                  width="190"
                  height="50"
                  rx="6"
                  fill="#294258"
                  stroke={c.purple}
                />
                <text x="255" y="165" fill={c.muted} fontSize="18">
                  Duplicate content
                </text>
              </g>
            </svg>
            {phase >= 5 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 22,
                  left: 28,
                  color: c.teal,
                  fontSize: 18,
                  opacity: progress(f, times[5], 22),
                }}
              >
                NETWORK CONNECTIVITY
              </div>
            )}
            {phase >= 6 && (
              <ObjectGlyph
                kind={phase >= 7 ? "checkmark" : "search"}
                size={55}
                color={c.teal}
                style={{ position: "absolute", right: 20, bottom: 15 }}
              />
            )}
          </div>
          <At at={times[1]} end={times[7] + 25}>
            <ObjectGlyph
              kind="search"
              color={c.orange}
              size={95}
              style={{
                position: "absolute",
                left: 1040 + Math.sin(f / 25) * 15,
                top: 490,
              }}
            />
          </At>
        </div>
        <div style={{ opacity: output }}>
          <Vault />
          <Label x={150} y={540} color={c.teal} size={36}>
            Reviewed. Structured.
            <br />
            Validated. Approved.
          </Label>
        </div>
        <Travel
          at={cue(4, 126.3)}
          duration={80}
          x1={1180}
          y1={590}
          x2={1518}
          y2={565}
          color={c.teal}
          kind="knowledge"
        />
        <At at={times[0]}>
          <StepRail labels={steps} active={phase} />
        </At>
      </SceneChrome>
    </Continuity>
  );
};
