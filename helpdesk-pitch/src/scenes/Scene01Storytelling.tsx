import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  BackgroundGrid,
  HeroStatement,
  Reveal,
  SceneTitle,
  clamp,
} from "../components/Primitives";
import { SupportWorkstation } from "../components/SupportWorkstation";
import { KnowledgeObject, KnowledgeItem } from "../components/KnowledgeObject";
import {
  MovingObject,
  NotificationPulse,
  Point,
  ProgressLine,
} from "../components/StoryMotion";
import { ObjectGlyph, ObjectKind } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";
import { typography } from "../theme/typography";
import { scene01Cues as cues } from "../timeline";

const channels: {
  name: string;
  kind: ObjectKind;
  note: string;
  color: string;
  at: number;
  points: Point[];
}[] = [
  {
    name: "Email",
    kind: "email",
    note: "Captured in ticketing",
    color: c.blue,
    at: cues.email,
    points: [
      { x: 422, y: 442 },
      { x: 525, y: 430 },
      { x: 537, y: 553 },
      { x: 716, y: 557 },
    ],
  },
  {
    name: "WhatsApp",
    kind: "chat",
    note: "Manual handling",
    color: c.teal,
    at: cues.whatsapp,
    points: [
      { x: 422, y: 590 },
      { x: 527, y: 590 },
      { x: 555, y: 618 },
      { x: 716, y: 577 },
    ],
  },
  {
    name: "Telephone",
    kind: "telephone",
    note: "Manual handling",
    color: c.purple,
    at: cues.telephone,
    points: [
      { x: 422, y: 738 },
      { x: 514, y: 757 },
      { x: 568, y: 649 },
      { x: 716, y: 596 },
    ],
  },
];
const knowledge: KnowledgeItem[] = [
  {
    label: "FAQ document",
    kind: "document",
    x: 1260,
    y: 390,
    at: 1356,
    detail: "Questions & answers",
  },
  {
    label: "Product information",
    kind: "manual",
    x: 1520,
    y: 390,
    at: 1374,
    detail: "Product reference",
  },
  {
    label: "Historical ticket",
    kind: "ticket",
    x: 1260,
    y: 526,
    at: 1421,
    detail: "Previous issue",
  },
  {
    label: "Resolved case",
    kind: "ticket",
    x: 1520,
    y: 526,
    at: 1451,
    detail: "Resolution recorded",
  },
  {
    label: "Email",
    kind: "email",
    x: 1260,
    y: 662,
    at: 1513,
    detail: "Support discussion",
  },
  {
    label: "Troubleshooting guide",
    kind: "manual",
    x: 1520,
    y: 662,
    at: 1537,
    detail: "Diagnostic steps",
  },
  {
    label: "Employee knowledge",
    kind: "sme-reviewer",
    x: 1390,
    y: 798,
    at: 1580,
    detail: "Individual experience",
  },
];
const knowledgeCurve = (
  k: KnowledgeItem,
  i: number,
  align: number,
): Point[] => [
  { x: k.x, y: k.y + 55 },
  { x: k.x - 95, y: k.y + 55 },
  { x: 1135, y: 490 + i * 44 + (592 - (490 + i * 44)) * align },
  { x: 997, y: 583 + (592 - 583) * align },
];
const networkCurve = (i: number, align: number): Point[] => [
  { x: knowledge[i].x + 110, y: knowledge[i].y + 110 },
  { x: 1160, y: 870 - i * 24 - (150 - i * 12) * align },
  { x: 600 + 335 * align, y: 872 - i * 20 - (260 - i * 20) * align },
  { x: 728 + 269 * align, y: 618 - 26 * align },
];
const ChannelSituation = ({
  channel,
  index,
}: {
  channel: (typeof channels)[number];
  index: number;
}) => {
  const f = Math.min(useCurrentFrame(), 1966);
  const age = f - channel.at;
  const arrival = channel.at + 15;
  const ring =
    index === 2 && age >= 10 && age < 115 ? Math.sin(age / 4) * 2.5 : 0;
  return (
    <Reveal
      at={channel.at}
      style={{ position: "absolute", left: 112, top: 386 + index * 148 }}
    >
      <div
        style={{
          width: 310,
          height: 112,
          border: "1px solid #34516c",
          borderRadius: 20,
          background: "linear-gradient(140deg,#20384e,#10243a)",
          display: "flex",
          alignItems: "center",
          padding: 23,
          gap: 18,
        }}
      >
        <div style={{ position: "relative", rotate: `${ring}deg` }}>
          <NotificationPulse at={arrival} color={channel.color} />
          <ObjectGlyph kind={channel.kind} color={channel.color} size={48} />
        </div>
        <div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>{channel.name}</div>
          <div style={{ fontSize: 17, color: c.muted, marginTop: 7 }}>
            {channel.note}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: -9,
            top: -10,
            width: 31,
            height: 31,
            borderRadius: 16,
            border: "2px solid #132940",
            background: channel.color,
            color: "#082238",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            opacity: interpolate(age, [15, 25, 120, 140], [0, 1, 1, 0], clamp),
            scale: interpolate(age, [15, 30], [0.65, 1], clamp),
          }}
        >
          1
        </div>
      </div>
    </Reveal>
  );
};

export const Scene01Storytelling = () => {
  const f = useCurrentFrame();
  const hero = interpolate(f, [cues.hero - 30, cues.hero + 30], [0, 1], clamp);
  const align = interpolate(f, [cues.transitionStart, 2164], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ color: c.text, fontFamily: typography.font }}>
      <BackgroundGrid />
      <div
        style={{
          position: "absolute",
          left: 112,
          right: 112,
          top: 66,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          letterSpacing: 3,
          color: c.muted,
        }}
      >
        <span>
          <span style={{ color: c.cyan }}>01</span> / THE CHALLENGE
        </span>
        <span style={{ letterSpacing: 2 }}>AI-POWERED LEVEL 1 HELPDESK</span>
      </div>
      <div
        style={{ position: "absolute", left: 112, top: 142, opacity: 1 - hero }}
      >
        <Reveal at={0}>
          <SceneTitle>Support runs on people.</SceneTitle>
        </Reveal>
        <Reveal at={128}>
          <div style={{ fontSize: 34, color: c.muted, marginTop: 24 }}>
            Multiple channels. Manual connections.
          </div>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 112, top: 137, opacity: hero }}>
        <HeroStatement />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - hero * 0.38 }}>
        <svg
          width="1920"
          height="1080"
          style={{ position: "absolute", inset: 0 }}
        >
          {channels.map((ch) => (
            <ProgressLine
              key={ch.name}
              points={ch.points.map((p, i) =>
                i === 3
                  ? {
                      x: p.x + (997 - p.x) * align,
                      y: p.y + (592 - p.y) * align,
                    }
                  : i === 2
                    ? { x: p.x + 300 * align, y: p.y }
                    : p,
              )}
              at={ch.at + 12}
              color={ch.color}
            />
          ))}
          {knowledge.map((k, i) => (
            <ProgressLine
              key={k.label}
              points={knowledgeCurve(k, i, align)}
              at={k.at + 25}
              color={c.purple}
              opacity={0.45}
            />
          ))}
          {knowledge.slice(0, 5).map((k, i) => (
            <ProgressLine
              key={k.label}
              points={networkCurve(i, align)}
              at={cues.burden + i * 32}
              color={i % 2 ? c.blue : c.purple}
              opacity={0.25}
            />
          ))}
        </svg>
        <Reveal
          at={128}
          style={{
            position: "absolute",
            left: 112,
            top: 337,
            fontSize: 18,
            letterSpacing: 3,
            color: c.blue,
          }}
        >
          01 / MULTIPLE CHANNELS
        </Reveal>
        <Reveal
          at={510}
          style={{
            position: "absolute",
            left: 650,
            top: 337,
            fontSize: 18,
            letterSpacing: 3,
            color: c.orange,
          }}
        >
          02 / MANUAL PROCESSES
        </Reveal>
        <Reveal
          at={cues.knowledge}
          style={{
            position: "absolute",
            left: 1260,
            top: 337,
            fontSize: 18,
            letterSpacing: 3,
            color: c.purple,
          }}
        >
          03 / FRAGMENTED KNOWLEDGE
        </Reveal>
        {channels.map((ch, i) => (
          <ChannelSituation key={ch.name} channel={ch} index={i} />
        ))}
        <Reveal at={60}>
          <SupportWorkstation />
        </Reveal>
        {channels.map((ch, i) => (
          <MovingObject
            key={ch.name}
            points={ch.points}
            at={ch.at + 18}
            duration={85 + i * 12}
            kind={ch.kind}
            size={42}
            color={ch.color}
          />
        ))}
        {channels.map((ch, i) => (
          <MovingObject
            key={"repeat" + ch.name}
            points={ch.points}
            at={cues.burden + i * 100}
            duration={100}
            kind={ch.kind}
            size={34}
            color={ch.color}
          />
        ))}
        {knowledge.map((k) => (
          <KnowledgeObject key={k.label} item={k} />
        ))}
        {knowledge.map((k, i) => (
          <MovingObject
            key={k.label}
            points={knowledgeCurve(k, i, 0)}
            at={k.at + 50}
            duration={95}
            kind={k.kind === "sme-reviewer" ? "knowledge" : k.kind}
            color={c.purple}
            size={31}
          />
        ))}
        {knowledge.slice(0, 4).map((k, i) => (
          <MovingObject
            key={"flow" + k.label}
            points={networkCurve(i, 0)}
            at={cues.burden + i * 52}
            duration={110}
            kind={i % 2 ? "ticket" : "document"}
            color={i % 2 ? c.blue : c.purple}
            size={29}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 980,
            top: 575,
            width: 34,
            height: 34,
            borderRadius: 18,
            background: c.cyan,
            boxShadow: "0 0 35px #76deec44",
            opacity: align * 0.8,
            scale: interpolate(align, [0, 1], [0.25, 1], clamp),
          }}
        />
      </div>
      <div style={{ opacity: 1 - hero }}>
        <Reveal at={1696} style={{ position: "absolute", left: 650, top: 917 }}>
          <div style={{ fontSize: 26, color: c.muted }}>
            More enquiries. More manual connections.
          </div>
        </Reveal>
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          right: 112,
          top: 970,
          height: 1,
          background: "#2a466355",
        }}
      >
        <div
          style={{
            height: 1,
            width: `${Math.min(100, (f / 2165) * 100)}%`,
            background: c.orange,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          right: 112,
          top: 993,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          color: c.muted,
        }}
      >
        <span>CURRENT SUPPORT MODEL</span>
        <span>01 / 12</span>
      </div>
    </AbsoluteFill>
  );
};
