import { interpolate, useCurrentFrame } from "remotion";
import { colors as c } from "../theme/colors";
import { clamp } from "./Primitives";
import { ObjectGlyph, ObjectKind } from "./VectorObjects";
export type KnowledgeItem = {
  label: string;
  kind: ObjectKind;
  x: number;
  y: number;
  at: number;
  detail: string;
};
export const KnowledgeObject = ({ item }: { item: KnowledgeItem }) => {
  const f = Math.min(useCurrentFrame(), 1966);
  const age = f - item.at;
  return (
    <div
      style={{
        position: "absolute",
        left: item.x,
        top: item.y,
        width: 236,
        height: 110,
        opacity: interpolate(age, [0, 28], [0, 1], clamp),
        translate: interpolate(age, [0, 48], ["65px 8px", "0px 0px"], clamp),
      }}
    >
      {(item.kind === "ticket" || item.kind === "manual") && (
        <div
          style={{
            position: "absolute",
            inset: "4px -5px -4px 5px",
            border: "1px solid #354564",
            borderRadius: 13,
            background: "#14263b",
            rotate: interpolate(age, [0, 45], ["6deg", "2deg"], clamp),
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid #465776",
          borderRadius: 13,
          background: "linear-gradient(140deg,#20364f,#12243a)",
          boxShadow: "0 8px 20px #020b1620",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "15px",
        }}
      >
        <div
          style={{
            rotate: interpolate(age, [0, 40], ["-12deg", "0deg"], clamp),
            scale: interpolate(age, [0, 30], [0.85, 1], clamp),
            transform:
              item.kind === "manual" || item.kind === "document"
                ? `perspective(200px) rotateY(${interpolate(age, [0, 40], [-65, 0], clamp)}deg)`
                : undefined,
          }}
        >
          <ObjectGlyph kind={item.kind} size={48} color={c.purple} />
        </div>
        <div>
          <div style={{ fontSize: 21, lineHeight: 1.13, fontWeight: 500 }}>
            {item.label}
          </div>
          <div
            style={{
              fontSize: 14,
              color: c.muted,
              marginTop: 10,
              letterSpacing: 0.4,
            }}
          >
            {item.detail}
          </div>
        </div>
        {item.label === "Resolved case" && (
          <div
            style={{
              position: "absolute",
              right: 6,
              top: -11,
              opacity: interpolate(age, [30, 48], [0, 1], clamp),
              background: "#0b2231",
              borderRadius: 20,
            }}
          >
            <ObjectGlyph kind="checkmark" size={27} color={c.teal} />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            left: 74,
            bottom: 9,
            height: 2,
            background: c.purple + "88",
            width: interpolate(age, [20, 55], [0, 140], clamp),
          }}
        />
      </div>
    </div>
  );
};
