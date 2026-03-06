"use client";

import { useState, useEffect, useCallback } from "react";

const T = {
  bg: "#F7F5F0",
  fg: "#111111",
  muted: "#807B73",
  accent: "#1B4332",
  border: "#DDD8CE",
  surface: "#EDEAE3",
  surface2: "#E3DFD6",
};

const STEPS = [
  { label: "Request Submitted" },
  { label: "AI Classification" },
  { label: "Work Order" },
  { label: "Crew Dispatched" },
  { label: "Work Completed" },
  { label: "Citizen Notified" },
];

function ProgressBar({ step, compact }: { step: number; compact?: boolean }) {
  return (
    <div className={`flex items-center w-full max-w-3xl mx-auto ${compact ? "mb-6" : "mb-12"}`}>
      {STEPS.map((s, i) => (
        <div key={s.label} className="flex items-center" style={{ flex: i < STEPS.length - 1 ? 1 : undefined }}>
          <div className="flex flex-col items-center" style={{ width: 68 }}>
            <div
              className="w-2 h-2 rounded-full transition-all duration-500 mb-2"
              style={{
                background: i <= step ? T.accent : T.border,
                boxShadow: i === step ? `0 0 8px ${T.accent}60` : "none",
                transform: i === step ? "scale(1.3)" : "scale(1)",
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.12em] transition-colors duration-500 text-center leading-relaxed"
              style={{ color: i <= step ? T.accent : T.muted }}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="h-px flex-1 mb-5 transition-all duration-700" style={{ background: i < step ? T.accent : T.border }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Step 0: Citizen submits request via portal ── */
function RequestStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  return (
    <div className="overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Westfield — Citizen Portal</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>requests.westfield.gov</span>
      </div>
      <div className="p-6 min-h-[360px]" style={{ background: T.bg }}>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: T.muted }}>Report an Issue</div>
            <div className="text-lg" style={{ color: T.fg }}>Citizen Service Request</div>
          </div>

          {/* Form fields typing in */}
          <div className="space-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: T.muted }}>Description</div>
              <div
                className="px-4 py-2.5 text-sm transition-all duration-500 min-h-[72px]"
                style={{
                  border: `1px solid ${phase >= 2 ? T.accent + "60" : T.border}`,
                  background: T.surface,
                  color: phase >= 2 ? T.fg : T.muted,
                }}
              >
                {phase >= 2 ? (
                  <>
                    Large pothole on Elm Street near the intersection with Broad St. About 2 feet wide, several inches deep. Hazardous for vehicles.
                    {phase === 2 && <span className="w-0.5 h-3.5 animate-pulse ml-0.5 inline-block align-middle" style={{ background: T.accent }} />}
                  </>
                ) : "Describe the issue..."}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: T.muted }}>Location</div>
              <div
                className="px-4 py-2.5 text-sm transition-all duration-500"
                style={{
                  border: `1px solid ${phase >= 2 ? T.accent + "60" : T.border}`,
                  background: T.surface,
                  color: phase >= 2 ? T.fg : T.muted,
                }}
              >
                {phase >= 2 ? "247 Elm Street, Westfield, NJ 07090" : "Enter address..."}
              </div>
            </div>

            {/* Photo attachment */}
            <div
              className="flex items-center gap-3 transition-all duration-500"
              style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(6px)" }}
            >
              <div className="flex items-center gap-2 px-3 py-2" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={T.muted} strokeWidth="1.2">
                  <rect x="1" y="2.5" width="12" height="9" rx="1" />
                  <circle cx="4.5" cy="5.5" r="1" />
                  <path d="M1 9.5l3-3 2.5 2.5L9 6.5l4 4" />
                </svg>
                <span className="text-xs" style={{ color: T.muted }}>pothole_elm_st.jpg</span>
              </div>
            </div>

            {/* Submit button */}
            <div
              className="transition-all duration-600"
              style={{
                opacity: phase >= 3 ? 1 : 0,
                transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <div
                className="w-full py-3 text-center text-xs uppercase tracking-[0.15em]"
                style={{ background: T.accent, color: T.bg }}
              >
                Submit Request
              </div>
              <div className="flex items-center gap-2 mt-3 justify-center">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5B9A6F" }} />
                <span className="text-[11px]" style={{ color: "#5B9A6F" }}>Request #SR-2026-0412 submitted successfully</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: AI classifies, prioritizes, routes ── */
function ClassificationStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => setPhase(4), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [active]);

  const classifications = [
    { label: "Category", value: "Pothole Repair", icon: "road" },
    { label: "Priority", value: "High", color: "#C0392B" },
    { label: "Department", value: "Public Works — Roads Division" },
    { label: "Est. Response", value: "24-48 hours" },
    { label: "Similar Requests", value: "2 within 500ft (last 30 days)" },
  ];

  return (
    <div className="overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Exodia — AI Triage Engine</span>
        </div>
        <div className="flex items-center gap-3">
          {phase >= 1 && phase < 4 && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
              <span className="text-xs" style={{ color: T.accent }}>Analyzing...</span>
            </div>
          )}
          {phase >= 4 && (
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
                <path d="M2.5 6l2.5 2.5 4.5-5" />
              </svg>
              <span className="text-xs" style={{ color: "#5B9A6F" }}>Classified</span>
            </div>
          )}
          <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
        </div>
      </div>
      <div className="flex min-h-[360px]" style={{ background: T.bg }}>
        {/* Left — request summary */}
        <div className="flex-1 p-6" style={{ borderRight: `1px solid ${T.border}` }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: T.muted }}>Incoming Request</div>
          <div
            className="p-5 mb-5 transition-all duration-500"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 1 ? 1 : 0.4,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs" style={{ color: T.accent }}>SR-2026-0412</span>
              <span className="text-[10px]" style={{ color: T.muted }}>Just now</span>
            </div>
            <div className="text-sm mb-2" style={{ color: T.fg }}>Pothole — 247 Elm Street</div>
            <div className="text-xs leading-relaxed mb-3" style={{ color: T.muted }}>
              Large pothole on Elm Street near the intersection with Broad St. About 2 feet wide, several inches deep. Hazardous for vehicles.
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 flex items-center gap-1.5" style={{ background: T.surface2, border: `1px solid ${T.border}` }}>
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke={T.muted} strokeWidth="1.2">
                  <rect x="1" y="2.5" width="12" height="9" rx="1" />
                  <circle cx="4.5" cy="5.5" r="1" />
                  <path d="M1 9.5l3-3 2.5 2.5L9 6.5l4 4" />
                </svg>
                <span className="text-[10px]" style={{ color: T.muted }}>1 photo</span>
              </div>
              <div className="px-2 py-1 flex items-center gap-1.5" style={{ background: T.surface2, border: `1px solid ${T.border}` }}>
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke={T.muted} strokeWidth="1.2">
                  <path d="M7 1v12M1 7h12" />
                </svg>
                <span className="text-[10px]" style={{ color: T.muted }}>GPS tagged</span>
              </div>
            </div>
          </div>

          {/* Scanning animation */}
          {phase >= 1 && phase < 3 && (
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: `${T.accent}08`, border: `1px solid ${T.accent}20` }}>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1 h-4 animate-pulse"
                    style={{
                      background: T.accent,
                      animationDelay: `${i * 200}ms`,
                      opacity: 0.4 + i * 0.2,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs" style={{ color: T.accent }}>
                {phase === 1 ? "Extracting keywords & location data..." : "Cross-referencing similar reports..."}
              </span>
            </div>
          )}

          {/* Routed confirmation */}
          {phase >= 4 && (
            <div
              className="flex items-center gap-3 px-4 py-3 transition-all duration-500"
              style={{ background: "#5B9A6F10", border: `1px solid #5B9A6F30` }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#5B9A6F" strokeWidth="1.2">
                <path d="M7 1l2.5 3.5H13L9.5 7.5l1 4L7 9l-3.5 2.5 1-4L1 4.5h3.5L7 1z" />
              </svg>
              <span className="text-xs" style={{ color: "#5B9A6F" }}>Routed to Public Works — Roads Division</span>
            </div>
          )}
        </div>

        {/* Right — classification results */}
        <div className="w-72 p-6 hidden md:block">
          <div className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: T.muted }}>AI Classification</div>
          {classifications.map((c, i) => (
            <div
              key={c.label}
              className="flex items-center justify-between py-3 transition-all duration-500"
              style={{
                borderBottom: `1px solid ${T.border}`,
                opacity: phase >= 3 ? 1 : 0,
                transform: phase >= 3 ? "translateX(0)" : "translateX(8px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <span className="text-[11px]" style={{ color: T.muted }}>{c.label}</span>
              <span className="text-xs text-right" style={{ color: c.color || (c.label === "Priority" ? "#C0392B" : T.fg) }}>{c.value}</span>
            </div>
          ))}

          {/* Confidence score */}
          <div
            className="mt-5 p-3 transition-all duration-600"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: T.muted }}>Classification Confidence</span>
              <span className="text-xs" style={{ color: T.accent }}>96%</span>
            </div>
            <div className="h-1 w-full" style={{ background: T.surface2 }}>
              <div className="h-full transition-all duration-700" style={{ width: "96%", background: T.accent }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Work order auto-generated ── */
function WorkOrderStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  return (
    <div className="overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Work Orders</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="min-h-[360px]" style={{ background: T.bg }}>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.muted }}>Work Order</div>
              <div className="text-lg" style={{ color: T.fg }}>WO-2026-0318 — Pothole Repair</div>
            </div>
            <div
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all duration-500"
              style={{
                background: phase >= 3 ? "#5B9A6F15" : `${T.accent}15`,
                color: phase >= 3 ? "#5B9A6F" : T.accent,
                border: `1px solid ${phase >= 3 ? "#5B9A6F30" : T.accent + "30"}`,
              }}
            >
              {phase >= 3 ? "Ready to Dispatch" : "Generating..."}
            </div>
          </div>

          {/* Work order fields populating */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-0">
            {[
              { label: "Source", value: "Citizen Request SR-2026-0412", delay: 0 },
              { label: "Priority", value: "High — Safety Hazard", delay: 100, color: "#C0392B" },
              { label: "Location", value: "247 Elm Street", delay: 200 },
              { label: "Asset", value: "Road Segment ELM-003", delay: 300 },
              { label: "Type", value: "Pothole Repair — Cold Patch", delay: 400 },
              { label: "Est. Materials", value: "2 bags cold patch asphalt", delay: 500 },
              { label: "Est. Duration", value: "1.5 hours", delay: 600 },
              { label: "Cost Center", value: "PW-Roads-2026-Maint", delay: 700 },
            ].map((field) => (
              <div
                key={field.label}
                className="flex items-center justify-between py-3 transition-all duration-500"
                style={{
                  borderBottom: `1px solid ${T.border}`,
                  opacity: phase >= 2 ? 1 : 0,
                  transform: phase >= 2 ? "translateY(0)" : "translateY(4px)",
                  transitionDelay: `${field.delay}ms`,
                }}
              >
                <span className="text-[11px]" style={{ color: T.muted }}>{field.label}</span>
                <span className="text-xs text-right" style={{ color: field.color || T.fg }}>{field.value}</span>
              </div>
            ))}
          </div>

          {/* Auto-linked info */}
          <div
            className="mt-5 flex items-center gap-4 transition-all duration-600"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke={T.accent} strokeWidth="1.2">
                <path d="M6 8l-2 2M8 6l2-2M5.5 8.5l-2 2a1.5 1.5 0 01-2-2l2-2M8.5 5.5l2-2a1.5 1.5 0 012 2l-2 2" />
              </svg>
              <span className="text-[11px]" style={{ color: T.fg }}>2 related requests linked</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke={T.accent} strokeWidth="1.2">
                <rect x="2" y="2" width="10" height="10" rx="1" />
                <path d="M5 7h4M7 5v4" />
              </svg>
              <span className="text-[11px]" style={{ color: T.fg }}>Inventory reserved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3: Crew dispatched with map ── */
function DispatchStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  return (
    <div className="overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Dispatch Center</span>
        </div>
        <div className="flex items-center gap-3">
          {phase >= 2 && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5B9A6F" }} />
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "#5B9A6F" }}>En Route</span>
            </div>
          )}
          <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
        </div>
      </div>
      <div className="min-h-[360px]" style={{ background: T.bg }}>
        <div className="p-6 relative">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: T.muted }}>Dispatch Map</div>
          {/* Faux map grid */}
          <div
            className="relative overflow-hidden"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              height: 280,
            }}
          >
            {/* Grid lines */}
            <svg width="100%" height="100%" className="absolute inset-0">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`} stroke={T.border} strokeWidth="0.5" />
              ))}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <line key={`v${i}`} x1={`${(i + 1) * 12.5}%`} y1="0" x2={`${(i + 1) * 12.5}%`} y2="100%" stroke={T.border} strokeWidth="0.5" />
              ))}
              {/* Street labels */}
              <text x="20%" y="38%" fill={T.muted} fontSize="9" opacity="0.5">Elm St</text>
              <text x="55%" y="55%" fill={T.muted} fontSize="9" opacity="0.5" transform="rotate(-90, 280, 155)">Broad St</text>
              <text x="20%" y="63%" fill={T.muted} fontSize="9" opacity="0.5">Prospect St</text>
            </svg>

            {/* Request pin */}
            <div
              className="absolute transition-all duration-500"
              style={{
                left: "35%",
                top: "32%",
                opacity: phase >= 1 ? 1 : 0,
                transform: phase >= 1 ? "scale(1)" : "scale(0)",
              }}
            >
              <div className="relative">
                <div className="w-4 h-4 rounded-full" style={{ background: "#C0392B", border: `2px solid ${T.fg}` }} />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 text-[9px]" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.fg }}>
                  SR-0412
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "#C0392B30" }} />
              </div>
            </div>

            {/* Crew marker - moves toward request */}
            <div
              className="absolute transition-all duration-[2000ms] ease-in-out"
              style={{
                left: phase >= 2 ? "30%" : "70%",
                top: phase >= 2 ? "36%" : "70%",
                opacity: phase >= 1 ? 1 : 0,
              }}
            >
              <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: T.accent, border: `2px solid ${T.fg}` }}>
                <div className="w-1 h-1 rounded-full" style={{ background: T.bg }} />
              </div>
            </div>

            {/* Other existing pins (greyed out) */}
            {[
              { left: "60%", top: "25%" },
              { left: "75%", top: "45%" },
              { left: "15%", top: "70%" },
            ].map((pos, i) => (
              <div key={i} className="absolute" style={{ ...pos }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.muted, opacity: 0.3 }} />
              </div>
            ))}

            {/* Route line */}
            {phase >= 2 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="72%" y1="72%" x2="37%" y2="36%"
                  stroke={T.accent}
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  opacity="0.5"
                />
              </svg>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Step 4: Work completed ── */
function CompletedStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  return (
    <div className="overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Field Report</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="min-h-[360px]" style={{ background: T.bg }}>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.muted }}>Field Report</div>
              <div className="text-lg" style={{ color: T.fg }}>WO-2026-0318 — Completed</div>
            </div>
            <div
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all duration-500"
              style={{
                background: phase >= 3 ? "#5B9A6F15" : `${T.accent}15`,
                color: phase >= 3 ? "#5B9A6F" : T.accent,
                border: `1px solid ${phase >= 3 ? "#5B9A6F30" : T.accent + "30"}`,
              }}
            >
              {phase >= 3 ? "Verified" : "In Review"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Before / After photos */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] mb-3" style={{ color: T.muted }}>Before</div>
              <div
                className="relative h-32 flex items-center justify-center transition-all duration-500"
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  opacity: phase >= 1 ? 1 : 0.3,
                }}
              >
                <div className="text-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={T.muted} strokeWidth="1" className="mx-auto mb-2" opacity="0.5">
                    <rect x="2" y="5" width="24" height="18" rx="2" />
                    <circle cx="9" cy="12" r="2.5" />
                    <path d="M2 19l6-6 5 5L18 13l8 8" />
                  </svg>
                  <div className="text-[10px]" style={{ color: T.muted }}>pothole_before.jpg</div>
                  <div className="text-[9px] mt-0.5" style={{ color: T.border }}>9:12 AM — T. Rodriguez</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] mb-3" style={{ color: T.muted }}>After</div>
              <div
                className="relative h-32 flex items-center justify-center transition-all duration-500"
                style={{
                  background: T.surface,
                  border: `1px solid ${phase >= 2 ? "#5B9A6F30" : T.border}`,
                  opacity: phase >= 2 ? 1 : 0.3,
                }}
              >
                <div className="text-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={phase >= 2 ? "#5B9A6F" : T.muted} strokeWidth="1" className="mx-auto mb-2" opacity="0.5">
                    <rect x="2" y="5" width="24" height="18" rx="2" />
                    <circle cx="9" cy="12" r="2.5" />
                    <path d="M2 19l6-6 5 5L18 13l8 8" />
                  </svg>
                  <div className="text-[10px]" style={{ color: phase >= 2 ? T.fg : T.muted }}>pothole_after.jpg</div>
                  <div className="text-[9px] mt-0.5" style={{ color: T.border }}>11:47 AM — T. Rodriguez</div>
                </div>
              </div>
            </div>
          </div>

          {/* Completion details */}
          <div className="mt-5">
            {[
              { label: "Time on Site", value: "1h 22m", delay: 0 },
              { label: "Materials Used", value: "1.5 bags cold patch, primer", delay: 100 },
              { label: "Crew Notes", value: "Repaired pothole. Sub-base intact, no further action needed.", delay: 200 },
              { label: "Quality Check", value: "Passed — surface level, no drainage issue", delay: 300 },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2.5 transition-all duration-500"
                style={{
                  borderBottom: `1px solid ${T.border}`,
                  opacity: phase >= 2 ? 1 : 0,
                  transform: phase >= 2 ? "translateY(0)" : "translateY(4px)",
                  transitionDelay: `${item.delay}ms`,
                }}
              >
                <span className="text-[11px]" style={{ color: T.muted }}>{item.label}</span>
                <span className="text-xs text-right max-w-[60%]" style={{ color: T.fg }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Cost summary */}
          <div
            className="mt-4 p-3 flex items-center justify-between transition-all duration-600"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>Total Cost</div>
                <div className="text-sm" style={{ color: T.accent }}>$187.50</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>Labor</div>
                <div className="text-xs" style={{ color: T.fg }}>$142.50</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>Materials</div>
                <div className="text-xs" style={{ color: T.fg }}>$45.00</div>
              </div>
            </div>
            <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider" style={{ background: "#5B9A6F15", color: "#5B9A6F", border: "1px solid #5B9A6F30" }}>
              Under Budget
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 5: Citizen notified ── */
function NotifyStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setPhase(4), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [active]);

  return (
    <div className="overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Notifications</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="min-h-[360px]" style={{ background: T.bg }}>
        <div className="p-6">
          <div className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: T.muted }}>Auto-Generated Notification</div>

          {/* Email preview */}
          <div
            className="p-5 transition-all duration-600"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: `1px solid ${T.border}` }}>
              <div>
                <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>To</div>
                <div className="text-xs" style={{ color: T.fg }}>citizen_reporter@email.com</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>From</div>
                <div className="text-xs" style={{ color: T.fg }}>noreply@westfield.gov</div>
              </div>
            </div>

            <div className="text-sm font-medium mb-3" style={{ color: T.fg }}>
              Your Request #SR-2026-0412 Has Been Resolved
            </div>

            <div
              className="space-y-3 transition-all duration-500"
              style={{ opacity: phase >= 2 ? 1 : 0 }}
            >
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                Dear Resident,
              </div>
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                We&apos;re writing to let you know that your service request regarding a <span style={{ color: T.fg }}>pothole at 247 Elm Street</span> has been resolved by our Public Works team.
              </div>
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <span style={{ color: T.fg }}>Work completed:</span> Pothole filled using cold patch asphalt. The repair has passed our quality inspection.
              </div>
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                If you have any concerns about this repair, you can reply to this email or submit a follow-up at <span style={{ color: T.accent }}>requests.westfield.gov</span>.
              </div>
              <div className="text-xs mt-4" style={{ color: T.muted }}>
                — Borough of Westfield Public Works
              </div>
            </div>
          </div>

          {/* SMS notification */}
          <div
            className="mt-4 p-4 flex items-start gap-3 transition-all duration-600"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={T.accent} strokeWidth="1.2" className="shrink-0 mt-0.5">
              <rect x="4" y="1" width="8" height="14" rx="1.5" />
              <line x1="6" y1="13" x2="10" y2="13" />
            </svg>
            <div>
              <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>SMS Notification Sent</div>
              <div className="text-xs leading-relaxed" style={{ color: T.fg }}>
                &quot;Westfield: Your pothole report (#SR-2026-0412) at 247 Elm St has been repaired. Thank you for helping us maintain our roads.&quot;
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function CitizenWorkflowDemo() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [embed, setEmbed] = useState(true);
  useEffect(() => {
    try { if (window.self === window.top) setEmbed(false); } catch {}
  }, []);

  const advance = useCallback(() => {
    if (paused) return;
    setStep((s) => (s + 1) % STEPS.length);
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    const delays = [3200, 3500, 3500, 3800, 3600, 4200];
    const timer = setTimeout(advance, delays[step]);
    return () => clearTimeout(timer);
  }, [step, paused, advance]);

  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: embed ? undefined : "100vh", fontFamily: '"Berkeley Mono", ui-monospace, monospace' }}>
      <div className={`max-w-5xl mx-auto px-6 sm:px-10 ${embed ? "py-6" : "py-16"}`}>
        <div className={`text-center ${embed ? "mb-3" : "mb-4"}`}>
          <h1 className={`${embed ? "text-xl" : "text-2xl sm:text-3xl"} font-normal mb-3`} style={{ letterSpacing: "-0.02em" }}>
            From citizen report to resolved — in hours, not weeks.
          </h1>
          <p className={`text-sm ${embed ? "mb-4" : "mb-8"}`} style={{ color: T.muted }}>
            Watch a pothole repair flow through Exodia from submission to completion.
          </p>
        </div>

        <ProgressBar step={step} compact={embed} />

        {/* Step content */}
        <div className="relative">
          <div style={{ display: step === 0 ? "block" : "none" }}><RequestStep active={step === 0} /></div>
          <div style={{ display: step === 1 ? "block" : "none" }}><ClassificationStep active={step === 1} /></div>
          <div style={{ display: step === 2 ? "block" : "none" }}><WorkOrderStep active={step === 2} /></div>
          <div style={{ display: step === 3 ? "block" : "none" }}><DispatchStep active={step === 3} /></div>
          <div style={{ display: step === 4 ? "block" : "none" }}><CompletedStep active={step === 4} /></div>
          <div style={{ display: step === 5 ? "block" : "none" }}><NotifyStep active={step === 5} /></div>
        </div>

        {/* Controls */}
        {!embed && (
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => setPaused(!paused)}
              className="text-xs uppercase tracking-[0.15em] px-6 py-3 transition-opacity hover:opacity-70 cursor-pointer"
              style={{ border: `1px solid ${T.border}`, color: T.muted }}
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <div className="flex gap-2">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setStep(i); setPaused(true); }}
                  className="w-8 h-8 text-xs transition-all duration-300 cursor-pointer"
                  style={{
                    background: i === step ? T.surface2 : "transparent",
                    border: `1px solid ${i === step ? T.accent : T.border}`,
                    color: i === step ? T.accent : T.muted,
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
