import { interpolate, useCurrentFrame } from "remotion";
import { colors as c } from "../theme/colors";
import { illustration as v } from "../theme/illustration";
import { clamp } from "./Primitives";
import { ObjectGlyph } from "./VectorObjects";
import { scene01Cues as cues } from "../timeline";

const stages = [
  { name: "UNDERSTAND", at: cues.understand },
  { name: "SEARCH", at: cues.search },
  { name: "TROUBLESHOOT", at: cues.troubleshoot },
  { name: "UPDATE", at: cues.update },
  { name: "CLASSIFY", at: cues.classify },
  { name: "ROUTE", at: cues.route },
  { name: "ESCALATE", at: cues.escalate },
];
const rule = (width: number, at: number, f: number) =>
  interpolate(f, [at, at + 18], [0, width], clamp);

export const WorkConsole = () => {
  const raw = useCurrentFrame();
  const f = Math.min(raw, 1966);
  const index = stages.reduce((n, s, i) => (f >= s.at ? i : n), -1);
  const elapsed = index < 0 ? 0 : f - stages[index].at;
  const stage = index < 0 ? "INCOMING ENQUIRIES" : stages[index].name;
  return (
    <div
      style={{
        position: "absolute",
        left: 283,
        top: 82,
        width: 303,
        height: 191,
        color: c.text,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #35536c",
          paddingBottom: 9,
          fontSize: 17,
          letterSpacing: 1.7,
          color: c.orange,
        }}
      >
        <span>{f >= cues.knowledge ? "MANUAL LOOKUP" : stage}</span>
        <span style={{ fontSize: 14, color: c.muted }}>
          {f >= cues.knowledge
            ? "L1"
            : index < 0
              ? "INBOX"
              : `${index + 1} / 7`}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          height: 145,
          marginTop: 12,
          opacity:
            index < 0 ? 1 : interpolate(elapsed, [0, 8], [0.25, 1], clamp),
        }}
      >
        {f >= cues.knowledge ? (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 13,
                fontSize: 23,
              }}
            >
              <ObjectGlyph kind="search" size={34} color={c.orange} />
              Find the right answer
            </div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  marginTop: 13,
                  width: 270 - i * 30,
                  height: 12,
                  background: "#223e57",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 62,
                    height: 12,
                    left: ((Math.min(f, 1966) - 1285 + i * 38) % 260) - 50,
                    background: c.purple + "77",
                  }}
                />
              </div>
            ))}
          </div>
        ) : index < 0 ? (
          <div style={{ display: "grid", gap: 10 }}>
            {[
              {
                n: "Email received",
                a: cues.email + 75,
                k: "email" as const,
                col: c.blue,
              },
              {
                n: "Message received",
                a: cues.whatsapp + 90,
                k: "chat" as const,
                col: c.teal,
              },
              {
                n: "Incoming call",
                a: cues.telephone + 108,
                k: "telephone" as const,
                col: c.purple,
              },
            ].map((q) => (
              <div
                key={q.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: interpolate(f, [q.a, q.a + 18], [0, 1], clamp),
                  translate: interpolate(
                    f,
                    [q.a, q.a + 24],
                    ["10px 0px", "0px 0px"],
                    clamp,
                  ),
                  fontSize: 22,
                }}
              >
                <ObjectGlyph kind={q.k} size={30} color={q.col} />
                {q.n}
                <span
                  style={{
                    marginLeft: "auto",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: q.col,
                  }}
                />
              </div>
            ))}
          </div>
        ) : index === 0 ? (
          <div>
            <div
              style={{
                padding: "12px 14px",
                borderRadius: 9,
                background: "#1a3a50",
                fontSize: 24,
                opacity: interpolate(elapsed, [0, 16], [0, 1], clamp),
              }}
            >
              “Cannot connect.”
            </div>
            <svg width="280" height="70">
              <path
                d="M30 4v20h25"
                stroke={c.blue}
                strokeWidth="2"
                fill="none"
              />
              <rect
                x="56"
                y="10"
                width={rule(193, 24, elapsed)}
                height="41"
                rx="7"
                fill={c.blue + "20"}
              />
              <text
                x="70"
                y="37"
                fill={c.blue}
                fontSize="21"
                opacity={interpolate(elapsed, [30, 45], [0, 1], clamp)}
              >
                Issue understood
              </text>
            </svg>
          </div>
        ) : index === 1 ? (
          <div style={{ display: "flex", gap: 12, paddingTop: 10 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  width: 82,
                  height: 112,
                  border:
                    "1px solid " + (elapsed > 35 && i === 1 ? c.teal : v.edge),
                  borderRadius: 8,
                  background: "#18354e",
                  translate: interpolate(
                    elapsed,
                    [i * 8, i * 8 + 20],
                    ["0px 12px", "0px 0px"],
                    clamp,
                  ),
                }}
              >
                <ObjectGlyph
                  kind={i === 1 ? "manual" : "document"}
                  size={56}
                  color={i === 1 ? c.teal : c.muted}
                  style={{ margin: 10 }}
                />
                <div
                  style={{
                    margin: "0 10px",
                    height: 5,
                    width: 45,
                    background: v.edge,
                  }}
                />
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                top: 45,
                left: interpolate(elapsed, [0, 35, 70], [5, 180, 95], clamp),
                background: "#0b203be6",
                borderRadius: 35,
              }}
            >
              <ObjectGlyph kind="search" size={58} color={c.orange} />
            </div>
          </div>
        ) : index === 2 ? (
          <div style={{ display: "grid", gap: 15 }}>
            {["Check connection", "Run diagnostics", "Record result"].map(
              (s, i) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    gap: 13,
                    alignItems: "center",
                    opacity: interpolate(
                      elapsed,
                      [i * 12, i * 12 + 10],
                      [0, 1],
                      clamp,
                    ),
                    fontSize: 22,
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      border: "1px solid " + c.teal,
                      background:
                        elapsed > i * 12 + 12 ? c.teal + "22" : "transparent",
                    }}
                  >
                    {elapsed > i * 12 + 12 && (
                      <ObjectGlyph kind="checkmark" size={24} color={c.teal} />
                    )}
                  </div>
                  {s}
                </div>
              ),
            )}
          </div>
        ) : index === 3 ? (
          <div style={{ display: "flex", gap: 16 }}>
            <ObjectGlyph kind="ticket" size={57} color={c.blue} />
            <div style={{ flex: 1 }}>
              {["Issue", "Actions", "Result"].map((s, i) => (
                <div
                  key={s}
                  style={{ fontSize: 18, color: c.muted, marginBottom: 10 }}
                >
                  {s}
                  <div
                    style={{
                      height: 7,
                      width: rule(160 - i * 20, i * 20, elapsed),
                      background: i === 2 ? c.teal : c.blue,
                      marginTop: 5,
                      borderRadius: 3,
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                left: interpolate(elapsed, [0, 70], [265, 210], clamp),
                top: interpolate(elapsed, [0, 70], [16, 104], clamp),
              }}
            >
              <svg width="20" height="25" viewBox="0 0 20 25">
                <path d="M2 1v20l5-6 5 7 4-3-5-7 8-1Z" fill={c.text} />
              </svg>
            </div>
          </div>
        ) : index === 4 ? (
          <div
            style={{
              display: "flex",
              gap: 17,
              alignItems: "center",
              height: 112,
            }}
          >
            <ObjectGlyph kind="ticket" size={70} color={c.blue} />
            <div
              style={{
                translate: interpolate(
                  elapsed,
                  [0, 30],
                  ["42px -22px", "0px 0px"],
                  clamp,
                ),
                opacity: interpolate(elapsed, [0, 15], [0, 1], clamp),
                borderRadius: 8,
                padding: "12px",
                background: c.purple + "22",
                border: "1px solid " + c.purple,
                fontSize: 23,
                color: c.purple,
              }}
            >
              Connectivity
            </div>
          </div>
        ) : index === 5 ? (
          <div style={{ position: "relative", height: 118 }}>
            <div
              style={{
                position: "absolute",
                left: 10,
                top: 50,
                width: 240,
                height: 2,
                background: c.blue + "88",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: interpolate(elapsed, [0, 40], [0, 200], clamp),
                top: 18,
                background: "#0b203b",
              }}
            >
              <ObjectGlyph kind="ticket" size={55} color={c.blue} />
            </div>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 83,
                fontSize: 19,
                color: c.blue,
              }}
            >
              Support queue
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 122,
            }}
          >
            <ObjectGlyph kind="support-agent" size={60} color={c.orange} />
            <div
              style={{
                position: "absolute",
                left: interpolate(elapsed, [0, 45], [66, 170], clamp),
                top: 32,
                opacity: interpolate(
                  elapsed,
                  [0, 8, 48, 65],
                  [0, 1, 1, 0],
                  clamp,
                ),
              }}
            >
              <ObjectGlyph kind="ticket" size={43} color={c.blue} />
            </div>
            <div
              style={{
                textAlign: "center",
                opacity: interpolate(elapsed, [15, 35], [0.35, 1], clamp),
              }}
            >
              <ObjectGlyph kind="l2-engineer" size={67} color={c.teal} />
              <div style={{ fontSize: 19, color: c.teal }}>Level 2</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const SupportWorkstation = () => {
  const f = Math.min(useCurrentFrame(), 1966);
  const work = interpolate(f, [700, 750], [0, 1], clamp);
  const lean = work * Math.sin(f / 65) * 1.4;
  const typing = work * Math.sin(f / 7) * 2;
  return (
    <div
      style={{
        position: "absolute",
        left: 560,
        top: 395,
        width: 650,
        height: 490,
      }}
    >
      <svg
        width="650"
        height="490"
        viewBox="0 0 650 490"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="deskDepth" x1="0" x2="1">
            <stop stopColor="#355571" />
            <stop offset="1" stopColor="#192f46" />
          </linearGradient>
          <linearGradient id="jacketShade">
            <stop stopColor={v.jacket} />
            <stop offset="1" stopColor={v.jacketLight} />
          </linearGradient>
        </defs>
        <ellipse
          cx="336"
          cy="426"
          rx="280"
          ry="23"
          fill="#020b16"
          opacity=".45"
        />
        <path
          d="M125 242h72v129h-91V261q0-19 19-19"
          fill="#173149"
          stroke="#38516a"
          strokeWidth="2"
        />
        <path
          d="M149 372v38m-38 12 38-12 45 12"
          stroke="#355571"
          strokeWidth="9"
        />
        <path
          d="M30 373 576 373l53 17H78Z"
          fill="url(#deskDepth)"
          stroke="#5b7791"
          strokeWidth="1.5"
        />
        <path d="M78 390h551v12H78Z" fill="#173149" />
        <path d="M96 402v57m506-57v57" stroke="#304b64" strokeWidth="9" />
        <g transform={`translate(${lean} 0)`}>
          <path
            d="M135 226c-23 8-27 36-27 70v68h135l-9-70c-2-43-19-66-42-70Z"
            fill="url(#jacketShade)"
            stroke="#66879c"
            strokeWidth="1.5"
          />
          <path d="m151 223 25 31 24-30-10 62h-33Z" fill="#b8cad3" />
          <path
            d="m135 229 17 30-8 12 23 37M202 229l-10 32 12 11-25 36"
            stroke="#7a9aac"
            strokeWidth="2"
          />
          <path d="M159 193v35l17 18 15-21v-32" fill={v.skinShade} />
          <g transform={`rotate(${lean * 0.8} 173 193)`}>
            <path
              d="M142 126c-2-22 57-28 63 0v45c0 40-55 43-61 7Z"
              fill={v.skin}
            />
            <path
              d="M141 161c-20-42 4-67 35-66 28 0 38 17 34 40l-19-14-26 11-6 34Z"
              fill="#203245"
              stroke="#52677a"
              strokeWidth="1.5"
            />
            <path d="M190 154h4M192 175l8-1" stroke="#725849" strokeWidth="2" />
            <path
              d="M135 159v-17c0-36 66-39 70-3"
              stroke={c.orange}
              strokeWidth="5"
            />
            <rect
              x="133"
              y="150"
              width="15"
              height="32"
              rx="7"
              fill="#182d41"
              stroke={c.orange}
              strokeWidth="2"
            />
            <path
              d="M141 178c10 20 29 18 45 14"
              stroke={c.orange}
              strokeWidth="3"
            />
            <rect
              x="180"
              y="188"
              width="12"
              height="6"
              rx="3"
              fill={c.orange}
            />
          </g>
          <path
            d={`M216 256c10 9 6 40 12 51l57 ${37 + typing} -13 17-79-41-8-52`}
            fill={v.jacketLight}
            stroke="#7192a6"
            strokeWidth="1.5"
          />
          <path
            d={`m276 ${343 + typing} 21 0 24 10c7 5 2 10-4 8l-24-4-15 3Z`}
            fill={v.skin}
          />
          <path
            d="M130 271c-5 46 8 65 48 73l69 10 5-18-66-20-6-40"
            fill={v.jacket}
            stroke="#66879c"
            strokeWidth="1.5"
          />
          <path d={`m249 336 30 ${typing} 20 9-1 9-47 0Z`} fill={v.skinShade} />
        </g>
        <path
          d="M412 295v48l-30 14h96l-31-14v-48"
          fill="#3a5670"
          stroke="#698499"
          strokeWidth="2"
        />
        <path
          d="M270 55h324q18 0 18 18v213l-12 13H268q-14 0-14-14V73q0-18 16-18Z"
          fill="#19334b"
          stroke="#607e98"
          strokeWidth="2"
        />
        <rect x="268" y="65" width="330" height="216" rx="9" fill="#0a1e31" />
        <path d="M290 356h172l24 15H282Z" fill="#7890a2" stroke="#a3b7c4" />
        <path d="M304 361h138M299 366h160" stroke="#355570" strokeWidth="2" />
        <path
          d="M532 346c20 0 22 22 4 23-20 1-24-21-4-23Z"
          fill="#4b6b86"
          stroke="#88a1b4"
        />
        <rect
          x="68"
          y="324"
          width="32"
          height="44"
          rx="5"
          fill="#29465e"
          stroke="#64839a"
        />
        <path d="M100 333c21-4 19 24 0 23" stroke="#64839a" strokeWidth="3" />
        <path d="M568 313v55h38v-55Z" fill="#142b42" stroke="#395873" />
        <path d="M580 326h15M580 335h10M580 352h15" stroke="#5a7790" />
      </svg>
      <WorkConsole />
      <div
        style={{
          position: "absolute",
          left: 116,
          top: 412,
          fontSize: 18,
          letterSpacing: 2,
          color: c.muted,
        }}
      >
        SUPPORT AGENT / LEVEL 1
      </div>
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 454,
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        {stages.map((s, i) => (
          <div
            key={s.name}
            style={{
              display: "flex",
              gap: 7,
              alignItems: "center",
              opacity: interpolate(f, [s.at, s.at + 16], [0.15, 1], clamp),
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: 3,
                background: c.orange,
              }}
            />
            <span style={{ fontSize: 13, letterSpacing: 0.4, color: c.orange }}>
              {i === 2 ? "DIAGNOSE" : s.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
