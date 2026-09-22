import { AbsoluteFill, Freeze, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Scene01Storytelling } from "./Scene01Storytelling";
import {
  AIHub,
  Capability,
  CustomerEnquiry,
  SceneChrome,
  mix,
  progress,
} from "../components/JourneyPrimitives";
import { ObjectGlyph, ObjectKind } from "../components/VectorObjects";
import {
  MovingObject,
  Point,
  ProgressLine,
  curvePath,
} from "../components/StoryMotion";
import { clamp } from "../components/Primitives";
import { colors as c } from "../theme/colors";
import { scene02Cues as q } from "../data/reviewCues";

const nodes: {
  name: string;
  kind: ObjectKind;
  x: number;
  y: number;
  at: number;
  detail: string;
  color: string;
}[] = [
  {
    name: "Identity & context",
    kind: "customer",
    x: 490,
    y: 370,
    at: 335,
    detail: "Verify. Remember.",
    color: c.purple,
  },
  {
    name: "Approved knowledge",
    kind: "knowledge",
    x: 1290,
    y: 370,
    at: q.knowledge,
    detail: "Retrieve trusted evidence",
    color: c.teal,
  },
  {
    name: "L1 troubleshooting",
    kind: "workflow",
    x: 1360,
    y: 594,
    at: q.troubleshoot,
    detail: "Follow controlled steps",
    color: c.orange,
  },
  {
    name: "Ticketing",
    kind: "ticket",
    x: 1100,
    y: 803,
    at: q.ticketing,
    detail: "Existing system of record",
    color: c.blue,
  },
  {
    name: "L2 escalation",
    kind: "l2-engineer",
    x: 630,
    y: 803,
    at: q.ticketing + 42,
    detail: "Continue with context",
    color: c.teal,
  },
];
const link = (x: number, y: number): Point[] => {
  if (y >= 800) return [
    { x: 997, y: 697 }, { x: 997, y: 760 },
    { x: x + 155, y: 760 }, { x: x + 155, y },
  ];
  if (x < 822) return [
    { x: 822, y: 540 }, { x: 780, y: 540 },
    { x: x + 355, y: y + 70 }, { x: x + 310, y: y + 70 },
  ];
  const startY = y < 500 ? 560 : 635;
  return [
    { x: 1172, y: startY }, { x: 1230, y: startY },
    { x: x - 60, y: y + 70 }, { x, y: y + 70 },
  ];
};
const originals = [
  { x: 1260, y: 445 },
  { x: 1520, y: 445 },
  { x: 1260, y: 581 },
  { x: 1520, y: 581 },
  { x: 1260, y: 717 },
  { x: 1520, y: 717 },
  { x: 1390, y: 853 },
];

export const Scene02Solution = () => {
  const f = useCurrentFrame();
  const reorganise = progress(f, 24, 146);
  const enter = progress(f, 54, 108);
  const hero = progress(f, q.hero, 40);
  const depart = progress(f, 1130, 102);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - enter }}>
        <Freeze frame={0}>
          <Sequence from={-2164} layout="none">
            <Scene01Storytelling />
          </Sequence>
        </Freeze>
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: enter }}>
        <SceneChrome
          number="02"
          label="THE SOLUTION"
          title={
            <span style={{ opacity: (1 - hero) * (1 - depart) }}>
              One governed AI helpdesk.
            </span>
          }
        >
          <div
            style={{
              position: "absolute",
              left: 112,
              top: 137,
              fontSize: 90,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.05,
              opacity: hero * (1 - depart),
            }}
          >
            One governed
            <br />
            <span style={{ color: c.cyan }}>support workflow.</span>
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: 1 - depart }}>
            <svg
              width="1920"
              height="1080"
              style={{ position: "absolute", inset: 0 }}
            >
              {originals.map((p, i) => {
                const target = { x: 1290, y: 426 };
                const start = {
                  x: mix(p.x, target.x, reorganise),
                  y: mix(p.y, target.y, reorganise),
                };
                return (
                  <path
                    key={i}
                    d={curvePath([
                      start,
                      { x: mix(p.x - 95, 1210, reorganise), y: start.y },
                      { x: 1135, y: 592 },
                      { x: 997, y: 592 },
                    ])}
                    stroke={c.purple}
                    strokeWidth="1.6"
                    fill="none"
                    opacity={0.28 * (1 - progress(f, 140, 80))}
                  />
                );
              })}
              {nodes.map((n) => (
                <ProgressLine
                  key={n.name}
                  points={link(n.x, n.y)}
                  at={n.at}
                  color={n.color}
                />
              ))}
              {[455, 523, 591].map((y, i) => (
                <ProgressLine
                  key={y}
                  points={[
                    { x: 422, y },
                    { x: 455, y: 592 },
                    { x: 610, y: 592 },
                    { x: 822, y: 592 },
                  ]}
                  at={130 + i * 25}
                  color={[c.blue, c.teal, c.purple][i]}
                />
              ))}
            </svg>
            {[0, 1, 2].map((i) => {
              const p = progress(f, 72, 145);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 112,
                    top: mix(386 + i * 148, 416 + i * 68, p),
                    width: 310,
                    height: mix(112, 60, p),
                    border: "1px solid #34516c",
                    borderRadius: mix(20, 13, p),
                    background: "linear-gradient(140deg,#20384e,#10243a)",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: "12px 24px",
                  }}
                >
                  <ObjectGlyph
                    kind={(["email", "chat", "telephone"] as ObjectKind[])[i]}
                    size={mix(48, 32, p)}
                    color={[c.blue, c.teal, c.purple][i]}
                  />
                  <span style={{ fontSize: mix(28, 23, p), fontWeight: 600 }}>
                    {["Email", "WhatsApp", "Telephone"][i]}
                  </span>
                </div>
              );
            })}
            <div
              style={{
                position: "absolute",
                left: 112,
                top: 367,
                fontSize: 20,
                letterSpacing: 2,
                color: c.blue,
                opacity: progress(f, 160),
              }}
            >
              CHANNELS
            </div>
            <div
              style={{
                position: "absolute",
                left: 822,
                top: 487,
                opacity: progress(f, q.introduce, 36),
                scale: interpolate(
                  f,
                  [q.introduce, q.introduce + 78],
                  [0.1, 1],
                  clamp,
                ),
                transformOrigin: "175px 105px",
              }}
            >
              <AIHub />
            </div>
            {nodes.map((n) => (
              <div
                key={n.name}
                style={{
                  position: "absolute",
                  left: n.x,
                  top: n.y,
                  opacity: progress(f, n.at),
                  translate: interpolate(
                    f,
                    [n.at, n.at + 48],
                    ["22px 12px", "0px 0px"],
                    clamp,
                  ),
                }}
              >
                <Capability {...n} />
              </div>
            ))}
            {nodes.map((n, i) => (
              <MovingObject
                key={n.name}
                points={
                  i % 2 ? link(n.x, n.y).slice().reverse() : link(n.x, n.y)
                }
                at={n.at + 38}
                duration={95}
                kind={n.kind === "customer" ? "document" : n.kind}
                color={n.color}
                size={37}
                freeze={1120}
              />
            ))}
            {[0, 1, 2].map((i) => (
              <MovingObject
                key={i}
                points={[
                  { x: 422, y: 455 + i * 68 },
                  { x: 455, y: 592 },
                  { x: 610, y: 592 },
                  { x: 822, y: 592 },
                ]}
                at={q.channels + i * 52}
                duration={95}
                kind={(["email", "chat", "telephone"] as ObjectKind[])[i]}
                color={[c.blue, c.teal, c.purple][i]}
                size={38}
                freeze={1120}
              />
            ))}
            <div
              style={{
                position: "absolute",
                left: 1117,
                top: 946,
                fontSize: 16,
                color: c.muted,
                opacity: progress(f, q.ticketing + 55),
              }}
            >
              INTEGRATE WITH EXISTING SYSTEMS
            </div>
            <div
              style={{
                position: "absolute",
                left: 160,
                top: 714,
                opacity: progress(f, q.hero),
                display: "flex",
                alignItems: "center",
                gap: 18,
                color: c.teal,
                fontSize: 23,
              }}
            >
              <ObjectGlyph kind="shield" size={44} color={c.teal} />
              <div>
                Connected.
                <br />
                Controlled.
              </div>
            </div>
          </div>
        </SceneChrome>
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: depart }}>
        <SceneChrome
          number="03"
          label="THE CUSTOMER JOURNEY"
          title="One enquiry. One journey."
          subtitle="Context travels with the customer."
        />
      </div>
      <CustomerEnquiry
        style={{
          left: mix(112, 170, depart),
          top: mix(416, 385, depart),
          width: mix(310, 610, depart),
          height: mix(145, 190, depart),
          opacity: progress(f, q.enquiry, 30),
          scale: mix(0.92, 1, depart),
          fontFamily: "Segoe UI, Arial, sans-serif",
          color: c.text,
        }}
      />
    </AbsoluteFill>
  );
};

