import React from "react";
import { colors as c } from "../theme/colors";
import { illustration as v } from "../theme/illustration";

export type ObjectKind =
  | "email"
  | "chat"
  | "telephone"
  | "headset"
  | "laptop"
  | "ticket"
  | "document"
  | "manual"
  | "knowledge"
  | "search"
  | "ai"
  | "database"
  | "api"
  | "shield"
  | "workflow"
  | "checkmark"
  | "warning"
  | "customer"
  | "support-agent"
  | "l2-engineer"
  | "sme-reviewer";

export const PersonGlyph = ({
  role = "customer",
  color = c.blue,
}: {
  role?: "customer" | "support-agent" | "l2-engineer" | "sme-reviewer";
  color?: string;
}) => (
  <>
    <path d="M12 57v-7c0-11 40-11 40 0v7" fill={color + "28"} />
    <path d="m23 39 9 8 9-8M32 47v10" />
    <path
      d="M23 18c0-12 18-12 18 0v10c0 13-18 13-18 0Z"
      fill={v.skin}
      stroke={v.skin}
    />
    <path d="M22 22V17c0-13 21-13 21 1l-5-5-16 7" fill={v.surface} />
    {role === "support-agent" && (
      <path d="M19 24v-4a13 13 0 0 1 26 0v12h-8M19 23v9M45 24v8" />
    )}
    {role === "l2-engineer" && (
      <>
        <rect x="41" y="41" width="18" height="18" rx="5" fill={v.surface} />
        <path d="m45 51 3 3 7-7" />
      </>
    )}
    {role === "sme-reviewer" && (
      <>
        <rect x="40" y="39" width="17" height="21" rx="3" fill={v.surface} />
        <path d="m44 50 3 3 6-7" />
      </>
    )}
  </>
);

export const ObjectGlyph = ({
  kind,
  size = 56,
  color = c.cyan,
  style,
}: {
  kind: ObjectKind;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) => {
  let art: React.ReactNode;
  switch (kind) {
    case "email":
      art = (
        <>
          <rect
            x="7"
            y="15"
            width="50"
            height="36"
            rx="7"
            fill={color + "12"}
          />
          <path d="m8 18 24 19 24-19M8 49l16-15M56 49 40 34" />
        </>
      );
      break;
    case "chat":
      art = (
        <>
          <path
            d="M13 10h38a7 7 0 0 1 7 7v25a7 7 0 0 1-7 7H28L13 58v-9a7 7 0 0 1-7-7V17a7 7 0 0 1 7-7Z"
            fill={color + "12"}
          />
          <path d="M17 24h29M17 33h20" />
        </>
      );
      break;
    case "telephone":
      art = (
        <>
          <path
            d="m16 8 9 12-7 7c4 8 9 13 17 17l7-7 12 9c-2 9-8 12-16 8C22 47 16 41 9 25 5 17 8 11 16 8Z"
            fill={color + "12"}
          />
          <path d="M38 10c9 0 16 7 16 16M39 18c4 0 7 3 7 7" />
        </>
      );
      break;
    case "headset":
      art = (
        <>
          <path d="M10 36v-9a22 22 0 0 1 44 0v20c0 6-10 8-20 8" />
          <rect x="7" y="28" width="9" height="18" rx="4" fill={color + "28"} />
          <rect
            x="48"
            y="28"
            width="9"
            height="18"
            rx="4"
            fill={color + "28"}
          />
          <path d="M28 55h8" />
        </>
      );
      break;
    case "laptop":
      art = (
        <>
          <rect
            x="12"
            y="10"
            width="40"
            height="33"
            rx="5"
            fill={color + "12"}
          />
          <path d="M12 43 5 54h54l-7-11M25 49h14" />
          <path d="M20 20h24M20 27h15" />
        </>
      );
      break;
    case "ticket":
      art = (
        <>
          <path
            d="M8 12h48v14a6 6 0 0 0 0 12v14H8V38a6 6 0 0 0 0-12Z"
            fill={color + "12"}
          />
          <path d="M22 19v26" strokeDasharray="3 5" />
          <path d="M30 23h17M30 31h12M30 39h17" />
        </>
      );
      break;
    case "manual":
      art = (
        <>
          <path
            d="M7 12c9-3 17-1 25 4 8-5 16-7 25-4v40c-9-3-17-1-25 3-8-4-16-6-25-3Z"
            fill={color + "12"}
          />
          <path d="M32 16v39M14 22l10 2M14 30l10 2M40 24l10-2M40 32l10-2" />
        </>
      );
      break;
    case "knowledge":
      art = (
        <>
          <path
            d="m32 6 24 13-24 13L8 19ZM8 31l24 13 24-13M8 43l24 13 24-13"
            fill={color + "12"}
          />
        </>
      );
      break;
    case "search":
      art = (
        <>
          <circle cx="27" cy="27" r="18" fill={color + "12"} />
          <path d="m41 41 16 16M18 24h17M18 31h10" />
        </>
      );
      break;
    case "ai":
      art = (
        <>
          <rect
            x="16"
            y="16"
            width="32"
            height="32"
            rx="10"
            fill={color + "12"}
          />
          <path d="M25 6v10M39 6v10M25 48v10M39 48v10M6 25h10M6 39h10M48 25h10M48 39h10M25 36l7-12 7 12M28 32h8" />
        </>
      );
      break;
    case "database":
      art = (
        <>
          <path d="M10 17v30c0 12 44 12 44 0V17" fill={color + "12"} />
          <ellipse cx="32" cy="17" rx="22" ry="9" />
          <path d="M10 31c0 12 44 12 44 0M10 45c0 12 44 12 44 0" />
        </>
      );
      break;
    case "api":
      art = (
        <>
          <rect
            x="6"
            y="10"
            width="52"
            height="44"
            rx="8"
            fill={color + "12"}
          />
          <path d="m23 23-9 9 9 9M41 23l9 9-9 9M36 20l-8 24" />
        </>
      );
      break;
    case "shield":
      art = (
        <>
          <path
            d="m32 5 23 10v16c0 13-12 23-23 29C21 54 9 44 9 31V15Z"
            fill={color + "12"}
          />
          <path d="m21 31 8 8 15-16" />
        </>
      );
      break;
    case "workflow":
      art = (
        <>
          <rect x="22" y="5" width="20" height="15" rx="4" />
          <rect x="5" y="44" width="20" height="15" rx="4" />
          <rect x="39" y="44" width="20" height="15" rx="4" />
          <path d="M32 20v12M15 44V32h34v12" />
        </>
      );
      break;
    case "checkmark":
      art = (
        <>
          <circle cx="32" cy="32" r="25" fill={color + "12"} />
          <path d="m19 32 9 9 18-20" />
        </>
      );
      break;
    case "warning":
      art = (
        <>
          <path d="m32 7 26 47H6Z" fill={color + "12"} />
          <path d="M32 23v14M32 44v1" />
        </>
      );
      break;
    case "customer":
    case "support-agent":
    case "l2-engineer":
    case "sme-reviewer":
      art = <PersonGlyph role={kind} color={color} />;
      break;
    default:
      art = (
        <>
          <path d="M14 6h25l11 11v41H14Z" fill={color + "12"} />
          <path d="M39 6v12h11M22 28h20M22 37h20M22 46h12" />
        </>
      );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth={v.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
    >
      {art}
    </svg>
  );
};
