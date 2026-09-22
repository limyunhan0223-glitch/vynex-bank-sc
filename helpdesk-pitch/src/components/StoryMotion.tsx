import { interpolate, useCurrentFrame } from "remotion";
import { clamp } from "./Primitives";
import { ObjectGlyph, ObjectKind } from "./VectorObjects";
import { colors as c } from "../theme/colors";

export type Point = { x: number; y: number };
export const cubic = (
  a: Point,
  b: Point,
  c: Point,
  d: Point,
  t: number,
): Point => ({
  x:
    (1 - t) ** 3 * a.x +
    3 * (1 - t) ** 2 * t * b.x +
    3 * (1 - t) * t * t * c.x +
    t ** 3 * d.x,
  y:
    (1 - t) ** 3 * a.y +
    3 * (1 - t) ** 2 * t * b.y +
    3 * (1 - t) * t * t * c.y +
    t ** 3 * d.y,
});
export const curvePath = (p: Point[]) =>
  `M${p[0].x} ${p[0].y} C${p[1].x} ${p[1].y} ${p[2].x} ${p[2].y} ${p[3].x} ${p[3].y}`;
export const ProgressLine = ({
  points,
  at,
  color = c.blue,
  opacity = 0.5,
}: {
  points: Point[];
  at: number;
  color?: string;
  opacity?: number;
}) => {
  const f = useCurrentFrame();
  return (
    <path
      d={curvePath(points)}
      fill="none"
      stroke={color}
      strokeWidth={2}
      opacity={opacity}
      pathLength={1}
      strokeDasharray="1"
      strokeDashoffset={1 - interpolate(f, [at, at + 48], [0, 1], clamp)}
    />
  );
};
export const MovingObject = ({
  points,
  at,
  duration = 100,
  kind = "ticket",
  color = c.blue,
  size = 34,
  freeze = 1966,
}: {
  points: Point[];
  at: number;
  duration?: number;
  kind?: ObjectKind;
  color?: string;
  size?: number;
  freeze?: number;
}) => {
  const frame = useCurrentFrame();
  const f = Math.min(frame, freeze);
  const t = interpolate(f, [at, at + duration], [0, 1], clamp);
  const p = cubic(points[0], points[1], points[2], points[3], t);
  return (
    <div
      style={{
        position: "absolute",
        left: p.x - size / 2,
        top: p.y - size / 2,
        opacity:
          interpolate(t, [0, 0.12, 0.86, 1], [0, 1, 1, 0], clamp) *
          interpolate(frame, [freeze, freeze + 30], [1, 0], clamp),
        filter: "drop-shadow(0 3px 6px #020d19)",
      }}
    >
      <ObjectGlyph kind={kind} size={size} color={color} />
    </div>
  );
};
export const NotificationPulse = ({
  at,
  color = c.blue,
  size = 66,
}: {
  at: number;
  color?: string;
  size?: number;
}) => {
  const f = Math.min(useCurrentFrame(), 1966);
  return (
    <div
      style={{
        position: "absolute",
        left: -8,
        top: -8,
        width: size,
        height: size,
        pointerEvents: "none",
      }}
    >
      {[0, 24].map((d) => (
        <div
          key={d}
          style={{
            position: "absolute",
            inset: 0,
            border: `1px solid ${color}`,
            borderRadius: 18,
            opacity: interpolate(
              f,
              [at + d, at + d + 12, at + d + 70],
              [0, 0.55, 0],
              clamp,
            ),
            scale: interpolate(f, [at + d, at + d + 70], [0.8, 1.5], clamp),
          }}
        />
      ))}
    </div>
  );
};
