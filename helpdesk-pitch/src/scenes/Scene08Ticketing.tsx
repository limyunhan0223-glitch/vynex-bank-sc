import { useCurrentFrame } from "remotion";
import { Scene07Workflow } from "./Scene07Workflow";
import {
  SceneChrome,
  AIHub,
  progress,
  mix,
  Status,
} from "../components/JourneyPrimitives";
import {
  Continuity,
  Hero,
  At,
  Label,
  Wire,
  Packet,
  cue,
} from "../components/ProductionPrimitives";
import { GlassCard } from "../components/Primitives";
import { ObjectGlyph } from "../components/VectorObjects";
import { colors as c } from "../theme/colors";

export const Scene08Ticketing = () => {
  const f = useCurrentFrame();
  const api = cue(8, 204.48),
    find = cue(8, 207.2),
    update = cue(8, 208.74),
    history = cue(8, 210.14),
    classify = cue(8, 212.04),
    escalation = cue(8, 213.64),
    record = cue(8, 219.14),
    hero = cue(8, 220.0);
  const p = progress(f, api, 130);
  const fields = [
    ["CUSTOMER", "ABC Manufacturing", find],
    ["PRODUCT", "MX-500", find + 22],
    ["ISSUE", "Network Connectivity / E102", update],
    [
      "TROUBLESHOOTING HISTORY",
      "Restart retained; cable and IP checked",
      history,
    ],
    ["CLASSIFICATION", "Connectivity / Level 1", classify],
    ["STATUS", "Escalation required", classify + 35],
    ["ESCALATION INFORMATION", "Full context attached", escalation],
  ] as const;
  return (
    <Continuity previous={Scene07Workflow} previousFrame={1667}>
      <SceneChrome
        number="08"
        label="TICKETING INTEGRATION"
        title={
          <span style={{ opacity: 1 - progress(f, hero, 24) }}>
            Connect to the system of record.
          </span>
        }
      >
        <Hero at={hero} first="Integrate." second="Not replace." />
        <At at={45}>
          <AIHub style={{ position: "absolute", left: 155, top: 490 }} />
          <Label x={1080} y={340} color={c.blue}>
            EXISTING TICKETING SYSTEM
          </Label>
        </At>
        <Wire x1={505} y1={585} x2={1080} y2={585} at={60} />
        <At at={api}>
          <div
            style={{
              position: "absolute",
              left: 695,
              top: 435,
              width: 225,
              height: 290,
              textAlign: "center",
              borderLeft: `2px solid ${c.teal}77`,
              borderRight: `2px solid ${c.teal}77`,
              paddingTop: 20,
            }}
          >
            <ObjectGlyph kind="shield" size={65} color={c.teal} />
            <div style={{ fontSize: 24, color: c.teal, marginTop: 15 }}>
              APPROVED API
            </div>
            <div style={{ fontSize: 18, color: c.muted, marginTop: 85 }}>
              AUTHORISED ✓
            </div>
          </div>
        </At>
        <div
          style={{ opacity: progress(f, 50, 25) * (1 - progress(f, find, 25)) }}
        >
          <Packet
            x={mix(460, 985, p)}
            y={mix(735, 575, p)}
            style={{ scale: mix(1, 0.62, p), transformOrigin: "top left" }}
          />
        </div>
        <At at={65}>
          <GlassCard
            style={{
              position: "absolute",
              left: 1080,
              top: 385,
              width: 650,
              height: 555,
              padding: 27,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: 53,
                borderBottom: `1px solid ${c.line}`,
                marginBottom: 10,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 600 }}>CASE #10284</div>
              <div
                style={{
                  fontSize: 18,
                  color: c.teal,
                  opacity: progress(f, find, 20),
                }}
              >
                EXISTING RECORD FOUND ✓
              </div>
            </div>
            {fields.map(([label, value, t]) => (
              <div
                key={label}
                style={{
                  height: 57,
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  borderBottom: `1px solid ${c.line}`,
                  background:
                    label === "ESCALATION INFORMATION" && f >= escalation
                      ? c.teal + "0b"
                      : "transparent",
                }}
              >
                <div
                  style={{
                    width: 198,
                    fontSize: 15,
                    color: c.muted,
                    letterSpacing: 0.5,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    opacity: progress(f, t, 20),
                    width: 345,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
            <div
              style={{
                fontSize: 21,
                color: c.teal,
                marginTop: 19,
                opacity: progress(f, escalation + 35, 20),
              }}
            >
              ✓ Saved to the existing ticket
            </div>
          </GlassCard>
        </At>
        <At at={record}>
          <div style={{ position: "absolute", left: 170, top: 786 }}>
            <Status text="SYSTEM OF RECORD" />
          </div>
        </At>
        <At at={escalation + 50}>
          <Label x={178} y={840} size={24}>
            Authorised updates.
            <br />
            One persistent support record.
          </Label>
        </At>
      </SceneChrome>
    </Continuity>
  );
};
