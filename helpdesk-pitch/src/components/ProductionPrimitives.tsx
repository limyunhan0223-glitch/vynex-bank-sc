import React from "react";
import { AbsoluteFill, Freeze, Sequence, useCurrentFrame } from "remotion";
import { GlassCard } from "./Primitives";
import { mix, progress, Status } from "./JourneyPrimitives";
import { ObjectGlyph, ObjectKind } from "./VectorObjects";
import { colors as c } from "../theme/colors";
import { timeline } from "../timeline";

export const cue = (scene: number, seconds: number) =>
  Math.round(seconds * 60) - timeline[scene - 1].startFrame;
export const layer: React.CSSProperties = { position: "absolute", inset: 0 };
export const Continuity = ({
  previous: Previous,
  previousFrame,
  children,
}: React.PropsWithChildren<{
  previous: React.ComponentType;
  previousFrame: number;
}>) => {
  const f = useCurrentFrame();
  const p = progress(f, 0, 45);
  return (
    <AbsoluteFill>
      <div style={{ ...layer, opacity: p }}>{children}</div>
      {f < 45 && (
        <div style={{ ...layer, opacity: 1 - p, pointerEvents: "none" }}>
          <Freeze frame={0}>
            <Sequence from={-previousFrame} layout="none">
              <Previous />
            </Sequence>
          </Freeze>
        </div>
      )}
    </AbsoluteFill>
  );
};
export const At = ({
  at = 0,
  end = 99999,
  children,
  style,
}: React.PropsWithChildren<{
  at?: number;
  end?: number;
  style?: React.CSSProperties;
}>) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        ...layer,
        ...style,
        opacity: progress(f, at, 24) * (1 - progress(f, end, 24)),
      }}
    >
      {children}
    </div>
  );
};
export const Hero = ({
  at,
  first,
  second,
  color = c.cyan,
}: {
  at: number;
  first: string;
  second: string;
  color?: string;
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 112,
        top: 137,
        fontSize: 90,
        fontWeight: 600,
        letterSpacing: -3,
        lineHeight: 1.05,
        opacity: progress(f, at, 32),
      }}
    >
      {first}
      <br />
      <span style={{ color }}>{second}</span>
    </div>
  );
};
export const Label = ({
  children,
  x,
  y,
  color = c.muted,
  size = 21,
}: React.PropsWithChildren<{
  x: number;
  y: number;
  color?: string;
  size?: number;
}>) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      color,
      fontSize: size,
      letterSpacing: size < 23 ? 1.4 : 0,
      lineHeight: 1.25,
    }}
  >
    {children}
  </div>
);
export const Paper = ({
  title = "Approved knowledge",
  subtitle = "Company knowledge",
  kind = "document",
  approved = false,
  style,
  children,
}: React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
  kind?: ObjectKind;
  approved?: boolean;
  style?: React.CSSProperties;
}>) => (
  <GlassCard
    style={{
      position: "absolute",
      width: 300,
      height: 220,
      padding: 25,
      ...style,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
      <ObjectGlyph kind={kind} size={44} color={approved ? c.teal : c.purple} />
      <div style={{ fontSize: 25, fontWeight: 600, lineHeight: 1.2 }}>
        {title}
      </div>
    </div>
    <div style={{ fontSize: 18, color: c.muted, marginTop: 18 }}>
      {subtitle}
    </div>
    {children || (
      <div style={{ marginTop: 19 }}>
        {[90, 72, 82].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w}%`,
              height: 5,
              borderRadius: 3,
              marginTop: 9,
              background: i === 0 ? c.purple + "66" : c.line,
            }}
          />
        ))}
      </div>
    )}
    {approved && (
      <div
        style={{
          position: "absolute",
          right: 18,
          bottom: 14,
          color: c.teal,
          fontSize: 17,
        }}
      >
        APPROVED ✓
      </div>
    )}
  </GlassCard>
);
export const Vault = ({
  x = 1370,
  y = 445,
  scale = 1,
}: {
  x?: number;
  y?: number;
  scale?: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 310,
      height: 310,
      scale,
      transformOrigin: "top left",
    }}
  >
    <svg width="310" height="310" viewBox="0 0 310 310" fill="none">
      <path
        d="M28 45 155 12 282 45v202l-127 42L28 247Z"
        fill="#10283b"
        stroke={c.teal + "77"}
        strokeWidth="2"
      />
      <path
        d="M28 45 155 83 282 45M155 83v206"
        stroke={c.teal + "22"}
        strokeWidth="2"
      />
    </svg>
    <ObjectGlyph
      kind="database"
      color={c.teal}
      size={88}
      style={{ position: "absolute", left: 111, top: 55 }}
    />
    <div
      style={{
        position: "absolute",
        top: 160,
        left: 20,
        right: 20,
        textAlign: "center",
        fontSize: 25,
        fontWeight: 600,
        lineHeight: 1.25,
      }}
    >
      APPROVED AI
      <br />
      KNOWLEDGE BASE
    </div>
  </div>
);
export const Wire = ({
  x1,
  y1,
  x2,
  y2,
  at = 0,
  color = c.blue,
  bend = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  at?: number;
  color?: string;
  bend?: number;
}) => {
  const f = useCurrentFrame();
  return (
    <svg width="1920" height="1080" style={{ ...layer, pointerEvents: "none" }}>
      <path
        d={`M${x1} ${y1} C${mix(x1, x2, 0.4)} ${y1 + bend} ${mix(x1, x2, 0.6)} ${y2 + bend} ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity=".55"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - progress(f, at, 40)}
      />
    </svg>
  );
};
export const Travel = ({
  at,
  duration = 65,
  x1,
  y1,
  x2,
  y2,
  kind = "document",
  color = c.cyan,
  size = 50,
}: {
  at: number;
  duration?: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  kind?: ObjectKind;
  color?: string;
  size?: number;
}) => {
  const f = useCurrentFrame();
  const p = progress(f, at, duration);
  return (
    <div
      style={{
        position: "absolute",
        left: mix(x1, x2, p) - size / 2,
        top: mix(y1, y2, p) - size / 2,
        opacity:
          progress(f, at, 12) * (1 - progress(f, at + duration - 12, 12)),
        background: "#10283b",
        borderRadius: 10,
        padding: 5,
      }}
    >
      <ObjectGlyph kind={kind} color={color} size={size} />
    </div>
  );
};
export const Expert = ({
  role = "sme-reviewer",
  x = 210,
  y = 570,
  scale = 1,
  active = true,
}: {
  role?: "sme-reviewer" | "l2-engineer" | "support-agent";
  x?: number;
  y?: number;
  scale?: number;
  active?: boolean;
}) => {
  const f = useCurrentFrame();
  const hand = active ? Math.sin(f / 38) * 2 : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 300,
        height: 320,
        scale,
        transformOrigin: "top left",
      }}
    >
      <svg
        width="300"
        height="310"
        viewBox="0 0 300 310"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse
          cx="149"
          cy="293"
          rx="130"
          ry="11"
          fill="#020b16"
          opacity=".55"
        />
        <path
          d="M75 275v-69c0-57 35-77 72-77s74 22 74 77v69Z"
          fill="#33556e"
          stroke="#66879c"
          strokeWidth="1.5"
        />
        <path d="M128 105v42l20 21 21-21v-42" fill="#b78b72" />
        <path d="m122 146 26 22 28-22-15 69h-27Z" fill="#b8cad3" />
        <path
          d="m110 147 13 30-10 12 32 42m44-84-13 30 10 12-30 42"
          stroke="#7a9aac"
          strokeWidth="2"
        />
        <path d="M111 57c0-46 78-46 78 0v40c0 52-78 52-78 0Z" fill="#c9a48c" />
        <path
          d="M109 79c-15-9-14-48 5-59 38-23 86 5 75 49l-27-23-45 21-5 23Z"
          fill="#203649"
          stroke="#627c90"
          strokeWidth="1.5"
        />
        <path d="M166 94h4m-4 17h9" stroke="#725747" strokeWidth="2" />
        {role === "sme-reviewer" && (
          <path
            d="M141 84h20v13h-20Zm23 0h20v13h-20Zm-3 4h3"
            stroke={c.purple}
            strokeWidth="2"
          />
        )}
        {role !== "sme-reviewer" && (
          <path
            d="M104 87V58c0-44 86-44 86 0v46h-21M104 84v22"
            stroke={c.orange}
            strokeWidth="4"
          />
        )}
        <g transform={`translate(0 ${hand})`}>
          <path
            d="M85 178c-10 48-2 69 25 69l70-10-7-27-61 6 3-29"
            fill="#3c637c"
            stroke="#66879c"
            strokeWidth="1.5"
          />
          <path d="m171 210 34-9 13 14-12 12-31 10" fill="#c9a48c" />
          <rect
            x="198"
            y="164"
            width="66"
            height="96"
            rx="8"
            fill="#10263a"
            stroke={role === "sme-reviewer" ? c.purple : c.teal}
            strokeWidth="2"
          />
          <path
            d="M212 185h35M212 196h29m0 22 8 8 17-19"
            stroke={c.teal}
            strokeWidth="2"
          />
        </g>
      </svg>
      <div
        style={{
          fontSize: 19,
          color: c.muted,
          textAlign: "center",
          letterSpacing: 1.2,
        }}
      >
        {role === "sme-reviewer"
          ? "SME / KNOWLEDGE REVIEWER"
          : role === "l2-engineer"
            ? "LEVEL 2 ENGINEER"
            : "SUPPORT AGENT"}
      </div>
    </div>
  );
};
export const Packet = ({
  x,
  y,
  label = "CASE #10284",
  detail = "Structured case update",
  style,
}: {
  x: number;
  y: number;
  label?: string;
  detail?: string;
  style?: React.CSSProperties;
}) => (
  <GlassCard
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 300,
      height: 160,
      padding: 24,
      ...style,
    }}
  >
    <ObjectGlyph kind="ticket" size={47} color={c.blue} />
    <div
      style={{
        position: "absolute",
        left: 87,
        top: 29,
        fontSize: 25,
        fontWeight: 600,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 19, color: c.muted, marginTop: 16 }}>{detail}</div>
  </GlassCard>
);
export const StepRail = ({
  labels,
  active,
  y = 870,
}: {
  labels: string[];
  active: number;
  y?: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: 112,
      right: 112,
      top: y,
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 35,
        right: 35,
        top: 15,
        height: 2,
        background: c.line,
      }}
    />
    {labels.map((s, i) => (
      <div
        key={s}
        style={{
          position: "relative",
          width: 165,
          textAlign: "center",
          color: i <= active ? c.teal : c.muted,
          opacity: i <= active ? 1 : 0.55,
        }}
      >
        <div
          style={{
            margin: "0 auto 12px",
            width: 32,
            height: 32,
            borderRadius: 18,
            background: "#112a3b",
            border: `1px solid ${i <= active ? c.teal : c.line}`,
            fontSize: 17,
            lineHeight: "30px",
          }}
        >
          {i < active ? "✓" : i + 1}
        </div>
        <div style={{ fontSize: 18, letterSpacing: 0.5 }}>{s}</div>
      </div>
    ))}
  </div>
);
export const Checkpoint = ({
  x,
  y,
  label,
  passed = false,
}: {
  x: number;
  y: number;
  label: string;
  passed?: boolean;
}) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <Status text={label} color={passed ? c.teal : c.orange} />
  </div>
);
