import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors as c } from "../theme/colors";
import { motion } from "../theme/motion";
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
export const Reveal: React.FC<
  React.PropsWithChildren<{ at: number; style?: React.CSSProperties }>
> = ({ at, style, children }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        ...style,
        opacity: interpolate(f, [at, at + 36], [0, 1], clamp),
        translate: interpolate(f, [at, at + 48], ["0px 16px", "0px 0px"], {
          ...clamp,
          easing: motion.ease,
        }),
      }}
    >
      {children}
    </div>
  );
};
export const GlassCard: React.FC<
  React.PropsWithChildren<{ style?: React.CSSProperties }>
> = ({ children, style }) => (
  <div
    style={{
      background:
        "linear-gradient(145deg,rgba(29,53,80,.8),rgba(13,31,51,.88))",
      border: "1px solid #34516c",
      borderRadius: 20,
      boxShadow: "0 14px 36px #020a1428",
      ...style,
    }}
  >
    {children}
  </div>
);
export const BackgroundGrid = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at 52% 48%,#142d47 0%,#091929 48%,#061120 100%)",
    }}
  >
    <AbsoluteFill
      style={{
        opacity: 0.15,
        backgroundImage:
          "linear-gradient(#45617b33 1px,transparent 1px),linear-gradient(90deg,#45617b33 1px,transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "linear-gradient(transparent,black,transparent)",
      }}
    />
  </AbsoluteFill>
);
export const Icon = ({
  kind,
  size = 40,
  color = c.cyan,
}: {
  kind: string;
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    {kind === "email" ? (
      <>
        <rect x="5" y="10" width="38" height="28" rx="5" />
        <path d="m6 13 18 14 18-14" />
      </>
    ) : kind === "chat" ? (
      <>
        <path d="M10 8h28a5 5 0 0 1 5 5v19a5 5 0 0 1-5 5H20L8 43V36a5 5 0 0 1-4-5V13a5 5 0 0 1 6-5Z" />
        <path d="M13 19h22M13 26h16" />
      </>
    ) : kind === "phone" ? (
      <path d="m13 5 7 10-6 6c4 7 7 10 14 14l6-6 10 7c-1 7-6 9-12 7C17 38 10 31 5 16 3 10 6 6 13 5Z" />
    ) : kind === "person" ? (
      <>
        <circle cx="24" cy="14" r="8" />
        <path d="M7 43v-8c0-9 34-9 34 0v8M12 12v10M36 12v10M36 21v5h-7" />
      </>
    ) : (
      <>
        <path d="M11 5h18l9 9v29H11ZM29 5v10h9M18 23h13M18 30h13M18 37h8" />
      </>
    )}
  </svg>
);
export const ChannelCard = ({
  name,
  kind,
  note,
  color,
}: {
  name: string;
  kind: string;
  note: string;
  color: string;
}) => (
  <GlassCard
    style={{
      width: 310,
      height: 112,
      padding: "24px 26px",
      display: "flex",
      alignItems: "center",
      gap: 22,
    }}
  >
    <Icon kind={kind} color={color} />
    <div>
      <div style={{ fontSize: 28, fontWeight: 600 }}>{name}</div>
      <div style={{ fontSize: 18, color: c.muted, marginTop: 6 }}>{note}</div>
    </div>
  </GlassCard>
);
export const GlowConnector = ({
  d,
  at,
  color = c.blue,
  extra = false,
}: {
  d: string;
  at: number;
  color?: string;
  extra?: boolean;
}) => {
  const f = useCurrentFrame();
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={color}
      strokeWidth={extra ? 1.4 : 2}
      strokeOpacity={extra ? 0.28 : 0.65}
      strokeDasharray={1}
      strokeDashoffset={1 - interpolate(f, [at, at + 60], [0, 1], clamp)}
    />
  );
};
export const SceneTitle = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 88,
      fontWeight: 600,
      letterSpacing: -3,
      lineHeight: 1.12,
    }}
  >
    {children}
  </div>
);
export const HeroStatement = () => (
  <div
    style={{
      fontSize: 90,
      fontWeight: 600,
      letterSpacing: -3,
      lineHeight: 1.05,
    }}
  >
    People have become
    <br />
    <span style={{ color: c.orange }}>the integration layer.</span>
  </div>
);
