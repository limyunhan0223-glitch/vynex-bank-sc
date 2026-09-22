import { interpolate, useCurrentFrame } from "remotion";
import {
  AIHub,
  CustomerEnquiry,
  CustomerFigure,
  SceneChrome,
  StagePanel,
  Status,
  mix,
  progress,
} from "../components/JourneyPrimitives";
import { ObjectGlyph } from "../components/VectorObjects";
import { MovingObject, ProgressLine } from "../components/StoryMotion";
import { GlassCard, clamp } from "../components/Primitives";
import { colors as c } from "../theme/colors";
import { scene03Cues as q } from "../data/reviewCues";

const stages = [
  { at: q.understand, name: "UNDERSTAND" },
  { at: q.identity, name: "IDENTIFY" },
  { at: q.context, name: "CONTEXT" },
  { at: q.knowledge, name: "APPROVED KNOWLEDGE" },
  { at: q.troubleshoot, name: "TROUBLESHOOT" },
  { at: q.recordQuestion, name: "RECORD" },
  { at: q.unresolved, name: "ESCALATE" },
];
const extraction = [
  { label: "PRODUCT", value: "MX-500", at: q.product, y: 480 },
  { label: "ISSUE", value: "Network Connectivity", at: q.issue, y: 578 },
  { label: "ERROR", value: "E102", at: q.error, y: 676 },
];

const CaseHistory = () => {
  const f = useCurrentFrame();
  const events = [
    { label: "QUESTIONS", value: "Connection confirmed", at: q.recordQuestion },
    { label: "ACTIONS", value: "IP settings checked", at: q.recordAction },
    { label: "RESULTS", value: "Issue persists", at: q.recordResult },
    { label: "DIAGNOSTICS", value: "E102 retained", at: q.recordResult + 16 },
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: 790,
        top: 825,
        width: 960,
        opacity: progress(f, q.context),
      }}
    >
      <div
        style={{
          fontSize: 17,
          letterSpacing: 1.5,
          color: c.muted,
          marginBottom: 12,
        }}
      >
        PERSISTENT CASE CONTEXT / INC-10234
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {events.map((e) => (
          <GlassCard
            key={e.label}
            style={{
              width: 231,
              height: 88,
              padding: "14px 17px",
              borderColor: f >= e.at ? c.teal + "77" : c.line,
            }}
          >
            <div
              style={{
                fontSize: 14,
                letterSpacing: 1.3,
                color: f >= e.at ? c.teal : c.muted,
              }}
            >
              {e.label}
            </div>
            {f >= e.at && <div
              style={{
                fontSize: 18,
                marginTop: 12,
                opacity: progress(f, e.at, 20),
              }}
            >
              {e.value}
            </div>}
            {f < e.at && (
              <div
                style={{
                  height: 4,
                  width: 110,
                  background: c.line,
                  marginTop: 18,
                  borderRadius: 3,
                }}
              />
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const Identify = () => {
  const f = useCurrentFrame();
  return (
    <StagePanel step="02" title="Verify the customer" color={c.purple}>
      <div style={{ display: "flex", gap: 34 }}>
        <div
          style={{
            width: 142,
            height: 180,
            background: c.purple + "0e",
            border: "1px solid " + c.purple + "55",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ObjectGlyph kind="customer" size={123} color={c.purple} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 34, fontWeight: 600, marginBottom: 24 }}>
            ABC Manufacturing
          </div>
          {[
            ["PRODUCT", "MX-500"],
            ["APPROVED IDENTIFIER", "Serial 879312"],
            ["SUPPORT ENTITLEMENT", "Active"],
          ].map(([label, value], i) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid " + c.line,
                opacity: progress(f, q.verify + i * 28),
              }}
            >
              <span
                style={{ fontSize: 17, letterSpacing: 0.7, color: c.muted }}
              >
                {label}
              </span>
              <span style={{ fontSize: 24 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 27,
          left: 32,
          opacity: progress(f, q.verify + 90),
        }}
      >
        <Status text="Verified through approved systems" />
      </div>
    </StagePanel>
  );
};

const Context = () => {
  const f = useCurrentFrame();
  const skipped = progress(f, q.skip, 55);
  return (
    <StagePanel
      step="03"
      title="Continue from the existing case"
      color={c.teal}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          color: c.muted,
          marginBottom: 22,
        }}
      >
        <span>INC-10234 / MX-500</span>
        <span>PREVIOUS ACTION</span>
      </div>
      <div
        style={{
          position: "relative",
          border: "1px solid " + c.teal + "99",
          background: c.teal + "0d",
          borderRadius: 14,
          padding: "20px 25px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: progress(f, q.restart - 35),
        }}
      >
        <ObjectGlyph kind="checkmark" size={51} color={c.teal} />
        <div>
          <div style={{ fontSize: 31, fontWeight: 600 }}>RESTART DEVICE</div>
          <div style={{ fontSize: 20, color: c.teal, marginTop: 8 }}>
            Already completed
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontSize: 18,
            color: c.teal,
            opacity: progress(f, q.recognise),
          }}
        >
          RETAINED ✓
        </div>
      </div>
      <div style={{ position: "relative", height: 98, marginTop: 18 }}>
        <svg width="790" height="95">
          <path d="M20 37H225" stroke={c.line} strokeWidth="2" />
          <path
            d="M20 37C40 83 245 83 272 37H505"
            stroke={c.teal}
            strokeWidth="3"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - skipped}
            fill="none"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 70,
            fontSize: 24,
            color: c.muted,
            opacity: 1 - skipped * 0.65,
            textDecoration: skipped > 0.6 ? "line-through" : "none",
          }}
        >
          Restart again
        </div>
        <div
          style={{ position: "absolute", left: 515, top: 13, opacity: skipped }}
        >
          <Status text="Next relevant check" />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 32,
          bottom: 19,
          fontSize: 19,
          color: c.teal,
          opacity: progress(f, q.recognise),
        }}
      >
        ALREADY COMPLETED — DO NOT REPEAT
      </div>
    </StagePanel>
  );
};

const Evidence = () => {
  const f = useCurrentFrame();
  const p = progress(f, q.evidence, 70);
  return (
    <StagePanel step="04" title="Retrieve approved evidence" color={c.teal}>
      <div
        style={{
          position: "absolute",
          left: 35,
          top: 100,
          width: 210,
          height: 225,
          border: "1px solid " + c.teal + "66",
          borderRadius: 15,
          background: c.teal + "09",
          textAlign: "center",
          paddingTop: 25,
        }}
      >
        <ObjectGlyph kind="database" size={80} color={c.teal} />
        <div
          style={{
            fontSize: 21,
            lineHeight: 1.3,
            marginTop: 16,
            color: c.teal,
          }}
        >
          APPROVED
          <br />
          KNOWLEDGE
        </div>
        <div
          style={{
            position: "absolute",
            left: 105 + Math.sin(Math.min(f - q.search, 110) / 28) * 35,
            top: 80,
            opacity: 1 - p,
          }}
        >
          <ObjectGlyph kind="search" size={55} color={c.orange} />
        </div>
      </div>
      <svg
        width="780"
        height="270"
        style={{ position: "absolute", left: 32, top: 90 }}
      >
        <path d="M210 118h75" stroke={c.teal} strokeWidth="2" />
      </svg>
      <GlassCard
        style={{
          position: "absolute",
          left: mix(85, 320, p),
          top: mix(122, 102, p),
          width: 475,
          height: 234,
          padding: 26,
          opacity: p,
          borderColor: c.teal + "88",
          rotate: interpolate(p, [0, 1], ["-5deg", "0deg"], clamp),
        }}
      >
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <ObjectGlyph kind="manual" size={52} color={c.teal} />
          <div>
            <div style={{ fontSize: 18, color: c.teal }}>KB001 / APPROVED</div>
            <div style={{ fontSize: 28, fontWeight: 600, marginTop: 8 }}>
              E102 troubleshooting
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 21,
            color: c.muted,
            marginTop: 25,
            lineHeight: 1.6,
          }}
        >
          Check cable connection
          <br />
          Verify IP settings
        </div>
        <div
          style={{
            position: "absolute",
            right: 20,
            bottom: 17,
            fontSize: 16,
            color: c.teal,
          }}
        >
          Company knowledge / v1.2
        </div>
      </GlassCard>
      <div
        style={{
          position: "absolute",
          bottom: 23,
          left: 35,
          fontSize: 20,
          color: c.muted,
        }}
      >
        Guidance comes from an approved company source.
      </div>
    </StagePanel>
  );
};

const Troubleshooting = () => {
  const f = useCurrentFrame();
  const unresolved = progress(f, q.unresolved + 12, 18);
  return (
    <StagePanel
      step={f >= q.unresolved ? "07" : "05 / 06"}
      title={
        f >= q.unresolved
          ? "Continue with full context"
          : "Follow the approved workflow"
      }
      color={c.orange}
    >
      <div style={{ opacity: 1 - progress(f, q.unresolved, 12) }}>
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            padding: "15px 18px",
            background: c.blue + "12",
            border: "1px solid " + c.blue + "55",
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <ObjectGlyph kind="ai" size={35} color={c.cyan} />
          <span style={{ fontSize: 25 }}>Is the LAN cable connected?</span>
        </div>
        <div
          style={{
            opacity: progress(f, q.reply, 20),
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              padding: "12px 22px",
              borderRadius: 11,
              background: c.teal + "16",
              color: c.teal,
              fontSize: 24,
            }}
          >
            Yes, it is connected.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 15,
            alignItems: "center",
            opacity: progress(f, q.next, 22),
          }}
        >
          <ObjectGlyph kind="workflow" size={44} color={c.orange} />
          <div style={{ fontSize: 22 }}>
            <span style={{ color: c.orange }}>APPROVED NEXT STEP</span>
            <div style={{ fontSize: 28, marginTop: 7 }}>Verify IP settings</div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              opacity: progress(f, q.recordResult, 18),
              fontSize: 21,
              color: c.orange,
            }}
          >
            Issue persists
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: 32,
            color: c.muted,
            fontSize: 18,
          }}
        >
          Restart skipped. Questions, actions and results retained.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 32,
          right: 32,
          top: 113,
          opacity: unresolved,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 29, color: c.orange, fontWeight: 600 }}>
              UNRESOLVED AT L1
            </div>
            <div style={{ fontSize: 21, color: c.muted, marginTop: 13 }}>
              Approved workflow boundary reached
            </div>
          </div>
          <ObjectGlyph kind="workflow" size={53} color={c.orange} />
          <div style={{ fontSize: 32, color: c.teal, fontWeight: 600 }}>
            ESCALATE
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 22,
            alignItems: "center",
            marginTop: 34,
            opacity: progress(f, q.handover, 24),
          }}
        >
          <div style={{ position: "relative", width: 100, height: 85 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: interpolate(
                    f,
                    [q.handover + i * 9, q.handover + i * 9 + 25],
                    [i * 26, 12 + i * 5],
                    clamp,
                  ),
                  top: i * 5,
                  background: "#14283b",
                  borderRadius: 8,
                }}
              >
                <ObjectGlyph
                  kind={i === 2 ? "ticket" : "document"}
                  size={65}
                  color={i === 2 ? c.teal : c.blue}
                />
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 29, fontWeight: 600 }}>
              Case context travels forward
            </div>
            <div style={{ fontSize: 21, color: c.muted, marginTop: 8 }}>
              Customer • evidence • diagnostics • actions • results
            </div>
          </div>
        </div>
      </div>
    </StagePanel>
  );
};

export const Scene03CustomerJourney = () => {
  const f = useCurrentFrame();
  const done = progress(f, q.summary, 30);
  const current = stages.reduce((n, s, i) => (f >= s.at ? i : n), -1);
  const highlight =
    f >= q.error
      ? "error"
      : f >= q.issue
        ? "issue"
        : f >= q.product
          ? "product"
          : "";
  return (
    <SceneChrome
      number="03"
      label="THE CUSTOMER JOURNEY"
      title="One enquiry. One journey."
      subtitle={
        f >= q.summary
          ? "Context stays intact, through escalation."
          : "Context travels with the customer."
      }
    >
      <CustomerEnquiry
        message={f >= q.customer}
        highlight={f < q.identity ? highlight : ""}
      />
      <div style={{ opacity: progress(f, 20, 70) }}>
        <CustomerFigure
          style={{ scale: mix(1, 0.78, done), transformOrigin: "top left" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 530,
          top: 637,
          opacity: progress(f, 150, 45),
        }}
      >
        <AIHub compact style={{ width: 230, height: 157, padding: 18 }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 353,
          fontSize: 16,
          color: c.muted,
          letterSpacing: 1.2,
          opacity: progress(f, q.customer),
        }}
      >
        ILLUSTRATIVE CUSTOMER CASE
      </div>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <ProgressLine
          points={[
            { x: 780, y: 480 },
            { x: 836, y: 480 },
            { x: 837, y: 593 },
            { x: 890, y: 593 },
          ]}
          at={q.understand - 40}
          color={c.blue}
        />
        <ProgressLine
          points={[
            { x: 760, y: 716 },
            { x: 825, y: 716 },
            { x: 830, y: 755 },
            { x: 890, y: 755 },
          ]}
          at={q.context}
          color={c.teal}
        />
      </svg>
      <MovingObject
        points={[
          { x: 780, y: 480 },
          { x: 836, y: 480 },
          { x: 837, y: 593 },
          { x: 890, y: 593 },
        ]}
        at={q.understand - 25}
        duration={65}
        kind="chat"
        color={c.blue}
        freeze={2770}
      />
      {current < 0 && (
        <div
          style={{
            position: "absolute",
            left: 1070,
            top: 436,
            opacity: progress(f, q.customer, 60),
          }}
        >
          <ObjectGlyph kind="ai" size={160} color={c.cyan} />
          <div style={{ fontSize: 31, marginTop: 24 }}>
            An enquiry becomes a journey.
          </div>
        </div>
      )}
      {current === 0 && (
        <StagePanel step="01" title="Understand the enquiry">
          <div style={{ display: "grid", gap: 19 }}>
            {extraction.map((e) => (
              <div
                key={e.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 78,
                  borderBottom: "1px solid " + c.line,
                  opacity: progress(f, e.at, 24),
                }}
              >
                <div
                  style={{
                    width: 145,
                    color: c.muted,
                    fontSize: 18,
                    letterSpacing: 1.5,
                  }}
                >
                  {e.label}
                </div>
                <div style={{ fontSize: 31, color: c.cyan, fontWeight: 600 }}>
                  {e.value}
                </div>
                <ObjectGlyph
                  kind="checkmark"
                  size={30}
                  color={c.teal}
                  style={{ marginLeft: "auto" }}
                />
              </div>
            ))}
          </div>
        </StagePanel>
      )}
      {current === 0 &&
        extraction.map((e, i) => {
          const p = progress(f, e.at, 32);
          return (
            <div
              key={e.label}
              style={{
                position: "absolute",
                left: mix(325 + i * 65, 1080, p),
                top: mix(461 + i * 12, e.y + 28, p),
                background: "#15374c",
                border: "1px solid " + c.cyan + "88",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 23,
                color: c.cyan,
                opacity: interpolate(p, [0, 0.1, 0.76, 1], [0, 1, 1, 0], clamp),
              }}
            >
              {e.value}
            </div>
          );
        })}
      {current === 1 && <Identify />}
      {current === 2 && <Context />}
      {current === 3 && <Evidence />}
      {current >= 4 && <Troubleshooting />}
      <div style={{ opacity: 1 - done }}>
        <CaseHistory />
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          right: 112,
          top: 864,
          opacity: done,
        }}
      >
        <div
          style={{
            height: 2,
            position: "absolute",
            left: 80,
            right: 80,
            top: 19,
            background: c.teal + "55",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {[
            "CUSTOMER",
            "UNDERSTAND",
            "IDENTIFY",
            "CONTEXT",
            "APPROVED KNOWLEDGE",
            "TROUBLESHOOT",
            "RECORD",
            "ESCALATE",
          ].map((s, i) => (
            <div
              key={s}
              style={{
                width: 195,
                textAlign: "center",
                opacity: progress(f, q.summary + i * 5, 16),
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  margin: "0 auto 13px",
                  borderRadius: 20,
                  background: "#112a3b",
                  border: "1px solid " + c.teal,
                  color: c.teal,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontSize: 17,
                  color: c.teal,
                  lineHeight: 1.2,
                  letterSpacing: 0.4,
                }}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SceneChrome>
  );
};
