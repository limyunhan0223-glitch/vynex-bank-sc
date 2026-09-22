import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors as c } from "../theme/colors";
import { typography } from "../theme/typography";
import { illustration as v } from "../theme/illustration";
import { BackgroundGrid, GlassCard, clamp } from "./Primitives";
import { ObjectGlyph, ObjectKind } from "./VectorObjects";
import { motion } from "../theme/motion";

export const progress = (f: number, at: number, length = 36) =>
  interpolate(f, [at, at + length], [0, 1], { ...clamp, easing: motion.ease });
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const SceneChrome = ({
  number,
  label,
  title,
  subtitle,
  children,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) => (
  <AbsoluteFill style={{ fontFamily: typography.font, color: c.text }}>
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
        <span style={{ color: c.cyan }}>{number}</span> / {label}
      </span>
      <span style={{ letterSpacing: 2 }}>AI-POWERED LEVEL 1 HELPDESK</span>
    </div>
    <div
      style={{
        position: "absolute",
        left: 112,
        top: 142,
        fontSize: 88,
        fontWeight: 600,
        lineHeight: 1.12,
        letterSpacing: -3,
      }}
    >
      {title}
    </div>
    {subtitle && (
      <div
        style={{
          position: "absolute",
          left: 112,
          top: 268,
          fontSize: 32,
          color: c.muted,
        }}
      >
        {subtitle}
      </div>
    )}
    {children}
    <div
      style={{
        position: "absolute",
        left: 112,
        right: 112,
        top: 970,
        height: 1,
        background: c.line,
      }}
    />
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
      <span>{label}</span>
      <span>{number} / 12</span>
    </div>
  </AbsoluteFill>
);
export const Status = ({
  text,
  color = c.teal,
}: {
  text: string;
  color?: string;
}) => (
  <div
    style={{
      display: "inline-flex",
      gap: 10,
      alignItems: "center",
      border: `1px solid ${color}66`,
      background: color + "12",
      color,
      borderRadius: 9,
      padding: "10px 15px",
      fontSize: 21,
    }}
  >
    <ObjectGlyph kind="checkmark" size={25} color={color} />
    {text}
  </div>
);
export const Capability = ({
  name,
  kind,
  detail,
  color = c.blue,
  style,
}: {
  name: string;
  kind: ObjectKind;
  detail: string;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <GlassCard
    style={{
      width: 310,
      minHeight: 110,
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: 24,
      ...style,
    }}
  >
    <ObjectGlyph kind={kind} size={50} color={color} />
    <div>
      <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.1 }}>
        {name}
      </div>
      <div style={{ fontSize: 18, color: c.muted, marginTop: 10 }}>
        {detail}
      </div>
    </div>
  </GlassCard>
);
export const AIHub = ({
  style,
  compact = false,
}: {
  style?: React.CSSProperties;
  compact?: boolean;
}) => {
  const f = useCurrentFrame();
  return (
    <GlassCard
      style={{
        borderColor: c.cyan + "88",
        width: 350,
        height: 210,
        padding: 25,
        textAlign: "center",
        ...style,
      }}
    >
      <ObjectGlyph kind="ai" size={compact ? 48 : 64} color={c.cyan} />
      <div
        style={{ fontSize: compact ? 26 : 35, fontWeight: 600, marginTop: 8 }}
      >
        AI HELPDESK
      </div>
      {!compact && (
        <div
          style={{
            fontSize: 18,
            letterSpacing: 1.2,
            color: c.purple,
            marginTop: 10,
          }}
        >
          AI ORCHESTRATION
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: 25,
          right: 25,
          bottom: 0,
          height: 2,
          background: `linear-gradient(90deg,transparent,${c.cyan},transparent)`,
          opacity: 0.45 + 0.1 * Math.sin(Math.min(f, 840) / 45),
        }}
      />
    </GlassCard>
  );
};

// Shared enquiry survives the Scene 02 → 03 cut at exactly the same coordinates.
export const CustomerEnquiry = ({
  message = false,
  highlight = "",
  style,
}: {
  message?: boolean;
  highlight?: string;
  style?: React.CSSProperties;
}) => {
  const textStyle = (id: string): React.CSSProperties => ({
    color: highlight === id ? c.cyan : c.text,
    background: highlight === id ? c.cyan + "20" : "transparent",
    borderBottom:
      highlight === id ? `2px solid ${c.cyan}` : "2px solid transparent",
    borderRadius: 3,
  });
  return (
    <GlassCard
      style={{
        position: "absolute",
        left: 170,
        top: 385,
        width: 610,
        height: 190,
        padding: "25px 28px",
        borderColor: c.blue + "88",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 13,
          alignItems: "center",
          fontSize: 18,
          letterSpacing: 1.7,
          color: c.blue,
          marginBottom: 18,
        }}
      >
        <ObjectGlyph kind="chat" size={28} color={c.blue} />
        CUSTOMER ENQUIRY
      </div>
      {message ? (
        <div style={{ fontSize: 30, lineHeight: 1.35 }}>
          “My <span style={textStyle("product")}>MX-500</span> cannot connect
          <br />
          to the <span style={textStyle("issue")}>network</span>. Error{" "}
          <span style={textStyle("error")}>E102</span>.”
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 24,
          }}
        >
          {[235, 92, 40].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 12,
                borderRadius: 6,
                background: i === 0 ? c.blue + "88" : c.line,
              }}
            />
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export const CustomerFigure = ({ style }: { style?: React.CSSProperties }) => {
  const f = useCurrentFrame();
  const hand = Math.sin(Math.min(f, 2340) / 52) * 1.5;
  return (
    <div
      style={{
        position: "absolute",
        left: 175,
        top: 596,
        width: 300,
        height: 295,
        ...style,
      }}
    >
      <svg
        width="300"
        height="295"
        viewBox="0 0 300 295"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse
          cx="146"
          cy="280"
          rx="110"
          ry="11"
          fill="#020b16"
          opacity=".5"
        />
        <path
          d="M82 272v-63c0-55 30-77 68-77 41 0 68 27 70 79v61Z"
          fill={v.jacket}
          stroke="#66879c"
          strokeWidth="1.5"
        />
        <path d="M132 108v40l18 19 20-20v-40" fill={v.skinShade} />
        <path d="m125 147 25 21 25-21-13 62h-25Z" fill="#b8cad3" />
        <path
          d="m114 146 13 32-8 12 25 36m41-80-10 32 8 12-22 36"
          stroke="#7a9aac"
          strokeWidth="2"
        />
        <path d="M115 51c1-32 65-32 66 0v49c0 34-60 36-64 1Z" fill={v.skin} />
        <path
          d="M113 86c-17-32-6-69 28-71 33-2 47 18 41 44l-21-14-29 13-7 32Z"
          fill="#203245"
          stroke="#52677a"
          strokeWidth="1.5"
        />
        <path d="M164 82h3m-7 19h9" stroke="#725849" strokeWidth="2" />
        <path
          d="M110 182c-11 48 0 65 30 64l65-11-3-17-59 5-5-34"
          fill={v.jacketLight}
          stroke="#7192a6"
        />
        <g transform={`translate(0 ${hand})`}>
          <path d="m199 218 20-10 13 3-3 20-27 5Z" fill={v.skin} />
          <rect
            x="213"
            y="159"
            width="35"
            height="64"
            rx="7"
            fill="#0e2237"
            stroke={c.blue}
            strokeWidth="2"
          />
          <path d="M220 172h19m-19 8h15m-15 8h19" stroke={c.blue} />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: -22,
          left: 40,
          fontSize: 20,
          color: c.muted,
          letterSpacing: 1,
        }}
      >
        ABC MANUFACTURING
      </div>
    </div>
  );
};
export const StagePanel = ({
  step,
  title,
  children,
  color = c.blue,
  style,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <GlassCard
    style={{
      position: "absolute",
      left: 890,
      top: 385,
      width: 860,
      height: 418,
      padding: 32,
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 26,
      }}
    >
      <span style={{ color, fontSize: 18, letterSpacing: 2 }}>{step}</span>
      <div style={{ fontSize: 32, fontWeight: 600 }}>{title}</div>
    </div>
    {children}
  </GlassCard>
);
