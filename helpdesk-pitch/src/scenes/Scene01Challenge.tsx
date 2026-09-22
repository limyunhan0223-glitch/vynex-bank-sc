import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  BackgroundGrid,
  ChannelCard,
  GlassCard,
  GlowConnector,
  HeroStatement,
  Icon,
  Reveal,
  SceneTitle,
  clamp,
} from "../components/Primitives";
import { colors as c } from "../theme/colors";
import { typography } from "../theme/typography";
import { scene01Cues as cues } from "../timeline";
const knowledge = [
  { text: "FAQs", x: 1260, y: 386, at: 1356 },
  { text: "Product information", x: 1520, y: 386, at: 1374 },
  { text: "Historical cases", x: 1260, y: 506, at: 1421 },
  { text: "Resolved tickets", x: 1520, y: 506, at: 1451 },
  { text: "Emails", x: 1260, y: 626, at: 1513 },
  { text: "Troubleshooting guides", x: 1520, y: 626, at: 1537 },
  { text: "Individual experience", x: 1390, y: 746, at: 1580 },
];
const actions = [
  ["UNDERSTAND", cues.understand],
  ["SEARCH", cues.search],
  ["TROUBLESHOOT", cues.troubleshoot],
  ["UPDATE", cues.update],
  ["CLASSIFY", cues.classify],
  ["ROUTE", cues.route],
  ["ESCALATE", cues.escalate],
] as const;
const packetX = (t: number) =>
  Math.pow(1 - t, 3) * 422 +
  3 * Math.pow(1 - t, 2) * t * 535 +
  3 * (1 - t) * t * t * 531 +
  t * t * t * 650;
const packetY = (t: number, y: number) =>
  (Math.pow(1 - t, 3) + 3 * Math.pow(1 - t, 2) * t) * y +
  (3 * (1 - t) * t * t + t * t * t) * 558;
export const Scene01Challenge = () => {
  const f = useCurrentFrame();
  const hero = interpolate(f, [1966, 2026], [0, 1], clamp);
  const align = interpolate(f, [2129, 2164], [0, 1], clamp);
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
      <div style={{ position: "absolute", inset: 0, opacity: 1 - hero * 0.48 }}>
        <svg
          width="1920"
          height="1080"
          style={{ position: "absolute", inset: 0 }}
        >
          {[442, 590, 738].map((y, i) => (
            <React.Fragment key={y}>
              <GlowConnector
                d={`M422 ${y} C535 ${y} 531 558 650 558`}
                at={[cues.email, cues.whatsapp, cues.telephone][i] + 18}
                color={[c.blue, c.teal, c.purple][i]}
              />
              {f > [cues.email, cues.whatsapp, cues.telephone][i] + 18 &&
                f < 640 && (
                  <circle
                    r="5"
                    fill={[c.blue, c.teal, c.purple][i]}
                    cx={packetX(
                      ((f -
                        [cues.email, cues.whatsapp, cues.telephone][i] -
                        18) %
                        150) /
                        150,
                    )}
                    cy={packetY(
                      ((f -
                        [cues.email, cues.whatsapp, cues.telephone][i] -
                        18) %
                        150) /
                        150,
                      y,
                    )}
                  />
                )}
            </React.Fragment>
          ))}
          {knowledge.map((k, i) => (
            <GlowConnector
              key={k.text}
              d={`M1040 558 C${1140 - align * 40} ${558 + (i - 3) * 18 * (1 - align)} ${k.x - 90} ${k.y + 46} ${k.x} ${k.y + 46}`}
              at={k.at + 20}
              color={c.purple}
            />
          ))}
          {knowledge.slice(0, 5).map((k, i) => (
            <GlowConnector
              key={i}
              d={`M${k.x + 120} ${k.y + 92} C${1130 + align * 80} ${860 - i * 35} ${650 + align * 420} ${820 - i * 18} ${800 + align * 240} 558`}
              at={cues.burden + i * 28}
              color={c.purple}
              extra
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
        {[
          {
            name: "Email",
            kind: "email",
            note: "Captured in ticketing",
            color: c.blue,
            at: cues.email,
          },
          {
            name: "WhatsApp",
            kind: "chat",
            note: "Manual handling",
            color: c.teal,
            at: cues.whatsapp,
          },
          {
            name: "Telephone",
            kind: "phone",
            note: "Manual handling",
            color: c.purple,
            at: cues.telephone,
          },
        ].map((ch, i) => (
          <Reveal
            key={ch.name}
            at={ch.at}
            style={{ position: "absolute", left: 112, top: 386 + i * 148 }}
          >
            <ChannelCard {...ch} />
          </Reveal>
        ))}
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
        <Reveal at={400} style={{ position: "absolute", left: 650, top: 420 }}>
          <GlassCard
            style={{
              width: 390,
              height: 378,
              padding: 30,
              borderColor: "#6f665a",
            }}
          >
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <div
                style={{
                  padding: 15,
                  background: "#edb2790d",
                  border: "1px solid #edb27940",
                  borderRadius: 16,
                }}
              >
                <Icon kind="person" size={62} color={c.orange} />
              </div>
              <div>
                <div style={{ fontSize: 30, fontWeight: 600 }}>
                  Support team
                </div>
                <div style={{ fontSize: 20, color: c.muted, marginTop: 6 }}>
                  Every enquiry
                </div>
              </div>
            </div>
            <div style={{ height: 1, background: c.line, margin: "25px 0" }} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {actions.map(([label, at]) => (
                <Reveal key={label} at={at}>
                  <div
                    style={{
                      border: "1px solid #50617a",
                      borderRadius: 7,
                      padding: "10px 12px",
                      fontSize: 17,
                      letterSpacing: 0.8,
                      color: c.orange,
                      background: "#edb27908",
                    }}
                  >
                    {label}
                  </div>
                </Reveal>
              ))}
            </div>
          </GlassCard>
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
        {knowledge.map((k) => (
          <Reveal
            key={k.text}
            at={k.at}
            style={{ position: "absolute", left: k.x, top: k.y }}
          >
            <GlassCard
              style={{
                width: 240,
                height: 94,
                padding: "18px",
                display: "flex",
                alignItems: "center",
                gap: 13,
              }}
            >
              <Icon kind="doc" size={30} color={c.purple} />
              <div style={{ fontSize: 23, lineHeight: 1.15 }}>{k.text}</div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
      <div style={{ opacity: 1 - hero }}>
        <Reveal at={1696} style={{ position: "absolute", left: 650, top: 871 }}>
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
