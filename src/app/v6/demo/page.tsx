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
  { label: "Email Received" },
  { label: "Completeness Check" },
  { label: "Live Agenda" },
  { label: "Edit Agenda" },
  { label: "Published" },
  { label: "Minutes" },
];

function ProgressBar({ step, compact }: { step: number; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-1 w-full max-w-2xl mx-auto ${compact ? "mb-6" : "mb-12"}`}>
      {STEPS.map((s, i) => (
        <div key={s.label} className="flex-1 flex items-center gap-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className="w-2 h-2 rounded-full transition-all duration-500 mb-2"
              style={{
                background: i <= step ? T.accent : T.border,
                boxShadow: i === step ? `0 0 8px ${T.accent}60` : "none",
                transform: i === step ? "scale(1.3)" : "scale(1)",
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.12em] transition-colors duration-500 text-center"
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

/* ── Step 0: Email arrives ── */
function EmailStep({ active }: { active: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(t);
    }
    setShow(false);
  }, [active]);

  return (
    <div className="relative overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Inbox</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="p-6 min-h-[360px]" style={{ background: T.bg }}>
        <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: T.muted }}>Municipal Inbox</div>

        {[
          { from: "engineering@township.gov", subject: "Road resurfacing bid results", time: "9:12 AM" },
          { from: "county@nj.gov", subject: "FY2026 grant deadline reminder", time: "8:45 AM" },
          { from: "water@township.gov", subject: "Monthly pump station report", time: "8:20 AM" },
        ].map((email) => (
          <div
            key={email.subject}
            className="flex items-center justify-between py-3 px-4 mb-1"
            style={{ borderBottom: `1px solid ${T.border}`, opacity: 0.5 }}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "transparent" }} />
              <span className="text-xs shrink-0" style={{ color: T.muted }}>{email.from}</span>
              <span className="text-sm truncate" style={{ color: T.muted }}>{email.subject}</span>
            </div>
            <span className="text-xs shrink-0 ml-4" style={{ color: T.muted }}>{email.time}</span>
          </div>
        ))}

        {/* New email animates in */}
        <div
          className="flex items-center justify-between py-3 px-4 mb-1 transition-all duration-700"
          style={{
            borderBottom: `1px solid ${T.border}`,
            background: show ? `${T.accent}08` : "transparent",
            borderLeft: show ? `2px solid ${T.accent}` : "2px solid transparent",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(-12px)",
          }}
        >
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ background: show ? T.accent : "transparent" }}
            />
            <span className="text-xs shrink-0" style={{ color: T.fg }}>finance@borough.gov</span>
            <span className="text-sm truncate font-medium" style={{ color: T.fg }}>
              Resolution: Professional Services — Bond Counsel
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <span
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 transition-all duration-500"
              style={{
                background: show ? `${T.accent}20` : "transparent",
                color: T.accent,
                opacity: show ? 1 : 0,
              }}
            >
              New
            </span>
            <span className="text-xs" style={{ color: T.muted }}>Just now</span>
          </div>
        </div>

        {/* Attachment preview */}
        <div
          className="mt-4 ml-4 flex items-center gap-3 transition-all duration-600"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(8px)",
            transitionDelay: "400ms",
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={T.muted} strokeWidth="1.2">
              <path d="M8 1H3.5A1.5 1.5 0 002 2.5v9A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V5L8 1z" />
              <path d="M8 1v4h4" />
            </svg>
            <span className="text-xs" style={{ color: T.muted }}>Resolution_BondCounsel_2026.pdf</span>
            <span className="text-[10px]" style={{ color: T.muted }}>2 pages</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={T.muted} strokeWidth="1.2">
              <path d="M8 1H3.5A1.5 1.5 0 002 2.5v9A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V5L8 1z" />
              <path d="M8 1v4h4" />
            </svg>
            <span className="text-xs" style={{ color: T.muted }}>CFO_Certification.pdf</span>
            <span className="text-[10px]" style={{ color: T.muted }}>1 page</span>
          </div>
        </div>

        {/* Toast */}
        <div
          className="absolute top-16 right-6 px-4 py-3 flex items-center gap-3 transition-all duration-500"
          style={{
            background: T.surface2,
            border: `1px solid ${T.accent}40`,
            opacity: show ? 1 : 0,
            transform: show ? "translateX(0)" : "translateX(20px)",
          }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: T.accent }} />
          <span className="text-xs" style={{ color: T.fg }}>New submission from Finance</span>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Source Document ── */
function DocumentStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Live Agenda</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="flex min-h-[360px]" style={{ background: T.bg }}>
        {/* Document preview panel */}
        <div className="flex-1 p-6" style={{ borderRight: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: T.muted }}>Live Agenda</div>
            <div className="flex gap-2">
              <div className="px-2.5 py-1 text-[10px] uppercase tracking-wider" style={{ border: `1px solid ${T.border}`, color: T.muted }}>1 / 2</div>
            </div>
          </div>
          {/* Faux document */}
          <div
            className="p-6 transition-all duration-700"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 1 ? 1 : 0.3,
              transform: phase >= 1 ? "scale(1)" : "scale(0.98)",
            }}
          >
            <div className="text-center mb-5">
              <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: T.muted }}>Borough of Westfield</div>
              <div className="text-sm font-medium mb-1" style={{ color: T.fg }}>RESOLUTION R-2026-088</div>
              <div className="w-12 h-px mx-auto" style={{ background: T.accent }} />
            </div>
            <div className="space-y-3">
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <span style={{ color: T.fg }}>WHEREAS,</span> the Borough of Westfield requires the services of a Bond Counsel
                for the issuance of general obligation bonds; and
              </div>
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <span style={{ color: T.fg }}>WHEREAS,</span> the firm of Smith, Johnson & Associates has submitted a proposal
                for said services in an amount not to exceed <span style={{ color: T.accent }}>$45,000.00</span>; and
              </div>
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <span style={{ color: T.fg }}>WHEREAS,</span> the Chief Financial Officer has certified the availability of funds
                in Account No. <span style={{ color: T.accent }}>2-01-20-155-028</span>; and
              </div>
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <span style={{ color: T.fg }}>NOW, THEREFORE, BE IT RESOLVED</span> by the Governing Body of the Borough
                of Westfield that the Mayor and Clerk are authorized to execute a contract...
              </div>
            </div>

            {/* Scanning overlay */}
            {phase === 0 && active && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                  className="h-full animate-scan-line"
                  style={{ background: `linear-gradient(90deg, transparent, ${T.accent}15, transparent)`, width: "40%" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Extracted metadata panel */}
        <div className="w-72 p-6 hidden md:block">
          <div className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: T.muted }}>Extracted Metadata</div>
          {[
            { label: "Type", value: "Resolution" },
            { label: "ID", value: "R-2026-088" },
            { label: "Department", value: "Finance" },
            { label: "Vendor", value: "Smith, Johnson & Assoc." },
            { label: "Amount", value: "$45,000.00" },
            { label: "Fund Account", value: "2-01-20-155-028" },
            { label: "Submitted By", value: "finance@borough.gov" },
          ].map((f, i) => (
            <div
              key={f.label}
              className="flex items-center justify-between py-2.5 transition-all duration-500"
              style={{
                borderBottom: `1px solid ${T.border}`,
                opacity: phase >= 2 ? 1 : 0,
                transform: phase >= 2 ? "translateX(0)" : "translateX(8px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span className="text-[11px]" style={{ color: T.muted }}>{f.label}</span>
              <span className="text-xs text-right" style={{ color: f.label === "Amount" || f.label === "ID" ? T.accent : T.fg }}>{f.value}</span>
            </div>
          ))}

          {/* Attachments */}
          <div
            className="mt-5 transition-all duration-500"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transitionDelay: "800ms",
            }}
          >
            <div className="text-[10px] uppercase tracking-[0.15em] mb-3" style={{ color: T.muted }}>Attachments (2)</div>
            {["Resolution_BondCounsel_2026.pdf", "CFO_Certification.pdf"].map((name) => (
              <div key={name} className="flex items-center gap-2 py-1.5">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke={T.accent} strokeWidth="1.2">
                  <path d="M8 1H3.5A1.5 1.5 0 002 2.5v9A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V5L8 1z" />
                  <path d="M8 1v4h4" />
                </svg>
                <span className="text-[11px]" style={{ color: T.fg }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Completeness Check ── */
function CompletenessStep({ active }: { active: boolean }) {
  const [checks, setChecks] = useState<number[]>([]);
  const [allDone, setAllDone] = useState(false);

  const requirements = [
    { label: "Resolution document", desc: "Signed resolution with proper WHEREAS clauses", status: "pass" },
    { label: "CFO certification", desc: "Chief Financial Officer availability of funds certification", status: "pass" },
    { label: "Vendor proposal / backup", desc: "Supporting proposal or quote from vendor on file", status: "pass" },
    { label: "Insurance certificate", desc: "Vendor certificate of insurance and W-9", status: "pass" },
    { label: "Fair & open process", desc: "Compliant with Local Public Contracts Law (N.J.S.A. 40A:11)", status: "pass" },
    { label: "Account code verified", desc: "Fund account 2-01-20-155-028 exists with sufficient balance", status: "pass" },
  ];

  useEffect(() => {
    if (!active) { setChecks([]); setAllDone(false); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    requirements.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setChecks((prev) => [...prev, i]);
      }, 500 + i * 350));
    });
    timers.push(setTimeout(() => setAllDone(true), 500 + requirements.length * 350 + 400));
    return () => timers.forEach(clearTimeout);
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Completeness Review</span>
        </div>
        <div className="flex items-center gap-2">
          {!allDone && active && checks.length > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
              <span className="text-xs" style={{ color: T.accent }}>Checking...</span>
            </div>
          )}
          {allDone && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: "#5B9A6F" }}>All checks passed</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex min-h-[360px]" style={{ background: T.bg }}>
        <div className="w-44 p-5 hidden md:block" style={{ borderRight: `1px solid ${T.border}`, background: T.surface }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: T.muted }}>Navigation</div>
          {["Dashboard", "Docket", "Meetings", "Ordinances", "Minutes"].map((name) => (
            <div key={name} className="text-sm py-2 px-3 mb-0.5" style={{
              color: name === "Docket" ? T.fg : T.muted,
              background: name === "Docket" ? T.surface2 : "transparent",
              borderLeft: name === "Docket" ? `2px solid ${T.accent}` : "2px solid transparent",
            }}>{name}</div>
          ))}
        </div>
        <div className="flex-1 p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.muted }}>Completeness Review</div>
              <div className="text-lg" style={{ color: T.fg }}>R-2026-088 — Bond Counsel</div>
            </div>
            <div className="text-right">
              <div className="text-xs" style={{ color: T.muted }}>Requirements</div>
              <div className="text-lg transition-colors duration-300" style={{ color: allDone ? "#5B9A6F" : T.fg }}>
                {checks.length} / {requirements.length}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full mb-6 overflow-hidden" style={{ background: T.surface2 }}>
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(checks.length / requirements.length) * 100}%`,
                background: allDone ? "#5B9A6F" : T.accent,
              }}
            />
          </div>

          {/* Checklist */}
          <div>
            {requirements.map((req, i) => {
              const checked = checks.includes(i);
              return (
                <div
                  key={req.label}
                  className="flex items-center gap-4 py-3.5 transition-all duration-400"
                  style={{ borderBottom: `1px solid ${T.border}` }}
                >
                  {/* Checkbox */}
                  <div
                    className="w-5 h-5 flex items-center justify-center shrink-0 transition-all duration-400"
                    style={{
                      border: `1.5px solid ${checked ? "#5B9A6F" : T.border}`,
                      background: checked ? "#5B9A6F15" : "transparent",
                    }}
                  >
                    {checked && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
                        <path d="M2.5 6l2.5 2.5 4.5-5" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm transition-colors duration-300" style={{ color: checked ? T.fg : T.muted }}>
                      {req.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: T.muted }}>{req.desc}</div>
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-wider shrink-0 transition-all duration-400"
                    style={{
                      color: checked ? "#5B9A6F" : T.border,
                      opacity: checked ? 1 : 0.3,
                    }}
                  >
                    {checked ? "Verified" : "Pending"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ready badge */}
          <div
            className="mt-5 flex items-center justify-between transition-all duration-600"
            style={{
              opacity: allDone ? 1 : 0,
              transform: allDone ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "#5B9A6F" }} />
              <span className="text-xs" style={{ color: "#5B9A6F" }}>Ready for agenda placement</span>
            </div>
            <div
              className="px-4 py-2 text-xs uppercase tracking-[0.15em]"
              style={{ background: T.accent, color: T.bg }}
            >
              Accept to Agenda
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3: Live Agenda ── */
function LiveAgendaStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  const sections = [
    { section: "I", title: "Call to Order", items: 0, time: "7:00 PM" },
    { section: "II", title: "Flag Salute & Roll Call", items: 0, time: "7:02 PM" },
    { section: "III", title: "Public Comment", items: 0, time: "7:05 PM" },
    { section: "IV", title: "Consent Agenda", items: 4, time: "7:20 PM" },
    { section: "V", title: "Ordinances — First Reading", items: 2, time: "7:35 PM" },
    { section: "VI", title: "Resolutions", items: 3, time: "7:50 PM", highlight: true },
    { section: "VII", title: "Adjournment", items: 0, time: "8:30 PM" },
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Clerk Docket</span>
        </div>
        <div className="flex items-center gap-3">
          {phase >= 1 && (
            <div
              className="flex items-center gap-1.5 transition-all duration-500"
              style={{ opacity: phase >= 1 ? 1 : 0 }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5B9A6F" }} />
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "#5B9A6F" }}>Live</span>
            </div>
          )}
          <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
        </div>
      </div>
      <div className="flex min-h-[360px]" style={{ background: T.bg }}>
        <div className="w-44 p-5 hidden md:block" style={{ borderRight: `1px solid ${T.border}`, background: T.surface }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: T.muted }}>Navigation</div>
          {["Dashboard", "Docket", "Meetings", "Ordinances", "Minutes"].map((name) => (
            <div key={name} className="text-sm py-2 px-3 mb-0.5" style={{
              color: name === "Meetings" ? T.fg : T.muted,
              background: name === "Meetings" ? T.surface2 : "transparent",
              borderLeft: name === "Meetings" ? `2px solid ${T.accent}` : "2px solid transparent",
            }}>{name}</div>
          ))}
        </div>
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.muted }}>Live Agenda</div>
              <div className="text-lg" style={{ color: T.fg }}>Council Meeting — March 12, 2026</div>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 text-xs uppercase tracking-wider" style={{ border: `1px solid ${T.accent}`, color: T.accent }}>Export PDF</div>
              <div className="px-3 py-1.5 text-xs uppercase tracking-wider" style={{ background: T.accent, color: T.bg }}>Publish</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${T.border}` }}>
            {sections.map((row) => (
              <div key={row.section}>
                <div
                  className="flex items-center justify-between py-3 transition-all duration-500"
                  style={{
                    borderBottom: `1px solid ${T.border}`,
                    background: row.highlight && phase >= 2 ? `${T.accent}06` : "transparent",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs w-6" style={{ color: T.accent }}>{row.section}</span>
                    <span className="text-sm" style={{ color: T.fg }}>{row.title}</span>
                    <span
                      className="text-xs px-2 py-0.5 transition-all duration-500"
                      style={{
                        background: T.surface2,
                        color: row.highlight && phase >= 2 ? T.accent : T.muted,
                        display: (row.highlight ? (phase >= 2 ? row.items + 1 : row.items) : row.items) > 0 ? "block" : "none",
                      }}
                    >
                      {row.highlight && phase >= 2 ? `${row.items + 1} items` : `${row.items} items`}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: T.muted }}>{row.time}</span>
                </div>
                {/* Expanded sub-items for Resolutions */}
                {row.highlight && (
                  <div
                    className="transition-all duration-700 overflow-hidden"
                    style={{
                      maxHeight: phase >= 1 ? 200 : 0,
                      opacity: phase >= 1 ? 1 : 0,
                    }}
                  >
                    {/* Existing items */}
                    {[
                      { id: "R-2026-085", title: "Award Contract — IT Services" },
                      { id: "R-2026-086", title: "Approve Grant Application — FEMA" },
                      { id: "R-2026-087", title: "Award Contract — Road Resurfacing Program" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-2.5 pl-14 pr-4" style={{ borderBottom: `1px solid ${T.border}` }}>
                        <span className="text-xs" style={{ color: T.muted }}>{item.id}</span>
                        <span className="text-sm" style={{ color: T.muted }}>{item.title}</span>
                      </div>
                    ))}
                    {/* New item appears */}
                    <div
                      className="flex items-center gap-4 py-2.5 pl-14 pr-4 transition-all duration-700"
                      style={{
                        borderBottom: `1px solid ${T.border}`,
                        background: phase >= 2 ? `${T.accent}08` : "transparent",
                        borderLeft: phase >= 2 ? `2px solid ${T.accent}` : "2px solid transparent",
                        opacity: phase >= 2 ? 1 : 0,
                        transform: phase >= 2 ? "translateY(0)" : "translateY(-6px)",
                      }}
                    >
                      <span className="text-xs" style={{ color: T.accent }}>R-2026-088</span>
                      <span className="text-sm" style={{ color: T.fg }}>Professional Services — Bond Counsel</span>
                      <span className="text-[10px] uppercase tracking-wider ml-auto px-2 py-0.5" style={{ background: `${T.accent}20`, color: T.accent }}>
                        Just added
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3: Edit Agenda (same document view as step 2, but with live edits) ── */
function EditAgendaStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  // 0 = doc visible, 1 = amount field highlighted, 2 = amount edited + cursor, 3 = saved + history in metadata panel
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2600);
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Live Agenda</span>
        </div>
        <div className="flex items-center gap-3">
          {phase >= 3 && (
            <div className="flex items-center gap-1.5 transition-all duration-500" style={{ opacity: phase >= 3 ? 1 : 0 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
                <path d="M2.5 6l2.5 2.5 4.5-5" />
              </svg>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "#5B9A6F" }}>Saved</span>
            </div>
          )}
          <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
        </div>
      </div>
      <div className="flex min-h-[360px]" style={{ background: T.bg }}>
        {/* Document preview panel */}
        <div className="flex-1 p-6" style={{ borderRight: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: T.muted }}>Live Agenda</div>
            <div className="flex gap-2">
              <div className="px-2.5 py-1 text-[10px] uppercase tracking-wider" style={{ border: `1px solid ${T.border}`, color: T.muted }}>1 / 2</div>
            </div>
          </div>
          {/* Faux document */}
          <div
            className="p-6"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
            }}
          >
            <div className="text-center mb-5">
              <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: T.muted }}>Borough of Westfield</div>
              <div className="text-sm font-medium mb-1" style={{ color: T.fg }}>RESOLUTION R-2026-088</div>
              <div className="w-12 h-px mx-auto" style={{ background: T.accent }} />
            </div>
            <div className="space-y-3">
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <span style={{ color: T.fg }}>WHEREAS,</span> the Borough of Westfield requires the services of a Bond Counsel
                for the issuance of general obligation bonds; and
              </div>
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <span style={{ color: T.fg }}>WHEREAS,</span> the firm of Smith, Johnson & Associates has submitted a proposal
                for said services in an amount not to exceed{" "}
                {/* Editable amount */}
                <span
                  className="relative inline-flex items-center transition-all duration-400"
                  style={{
                    background: phase >= 1 && phase < 3 ? `${T.accent}15` : "transparent",
                    outline: phase >= 1 && phase < 3 ? `1px solid ${T.accent}40` : "none",
                    padding: phase >= 1 ? "1px 3px" : "0",
                    borderRadius: 2,
                  }}
                >
                  <span style={{ color: T.accent }}>
                    {phase < 2 ? "$45,000.00" : "$42,500.00"}
                  </span>
                  {phase === 2 && (
                    <span className="w-0.5 h-3 animate-pulse ml-0.5 inline-block" style={{ background: T.accent }} />
                  )}
                </span>
                ; and
              </div>
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <span style={{ color: T.fg }}>WHEREAS,</span> the Chief Financial Officer has certified the availability of funds
                in Account No. <span style={{ color: T.accent }}>2-01-20-155-028</span>; and
              </div>
              <div className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <span style={{ color: T.fg }}>NOW, THEREFORE, BE IT RESOLVED</span> by the Governing Body of the Borough
                of Westfield that the Mayor and Clerk are authorized to execute a contract...
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — metadata + edit history */}
        <div className="w-72 p-6 hidden md:block">
          {/* Metadata (always visible) */}
          <div className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: T.muted }}>Extracted Metadata</div>
          {[
            { label: "Type", value: "Resolution" },
            { label: "ID", value: "R-2026-088" },
            { label: "Department", value: "Finance" },
            { label: "Vendor", value: "Smith, Johnson & Assoc." },
            { label: "Amount", value: phase < 2 ? "$45,000.00" : "$42,500.00", edited: phase >= 2 },
            { label: "Fund Account", value: "2-01-20-155-028" },
            { label: "Submitted By", value: "finance@borough.gov" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center justify-between py-2.5 transition-all duration-400"
              style={{
                borderBottom: `1px solid ${T.border}`,
                background: f.edited ? `${T.accent}08` : "transparent",
              }}
            >
              <span className="text-[11px]" style={{ color: T.muted }}>{f.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-right" style={{ color: f.label === "Amount" || f.label === "ID" ? T.accent : T.fg }}>{f.value}</span>
                {f.edited && phase >= 3 && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
                    <path d="M2.5 6l2.5 2.5 4.5-5" />
                  </svg>
                )}
              </div>
            </div>
          ))}

          {/* Edit History — fades in after save */}
          <div
            className="mt-5 transition-all duration-600"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: T.muted }}>Edit History</div>
            {[
              { user: "J. Martinez", action: "Amount: $45,000 → $42,500", time: "Just now" },
              { user: "J. Martinez", action: "Accepted to agenda", time: "2 min ago" },
            ].map((entry, i) => (
              <div
                key={i}
                className="mb-3 pb-3 transition-all duration-500"
                style={{
                  borderBottom: `1px solid ${T.border}`,
                  opacity: phase >= 3 ? 1 : 0,
                  transitionDelay: `${200 + i * 200}ms`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={T.accent} strokeWidth="1.2">
                    <path d="M8.5 1.5l2 2-6 6H2.5v-2l6-6z" />
                  </svg>
                  <span className="text-[11px]" style={{ color: T.fg }}>{entry.user}</span>
                  <span className="text-[10px] ml-auto" style={{ color: T.border }}>{entry.time}</span>
                </div>
                <div className="text-[11px]" style={{ color: T.muted }}>{entry.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 5: Minutes Generated ── */
function MinutesStep({ active }: { active: boolean }) {
  const [lines, setLines] = useState(0);
  const [done, setDone] = useState(false);

  type MinuteLine =
    | { type: "header"; text: string }
    | { type: "divider" }
    | { type: "section"; text: string }
    | { type: "body"; text: string }
    | { type: "roll"; entries: { name: string; status: string }[] }
    | { type: "resolution"; id: string; title: string }
    | { type: "vote"; ayes: string; nays: string; absent: string; result: string };

  const minutesContent: MinuteLine[] = [
    { type: "header", text: "MINUTES OF THE REGULAR MEETING" },
    { type: "header", text: "Borough of Westfield — March 12, 2026" },
    { type: "divider" },
    { type: "section", text: "I. CALL TO ORDER" },
    { type: "body", text: "Council President Smith called the meeting to order at 7:00 PM in the Council Chambers." },
    { type: "section", text: "II. FLAG SALUTE & ROLL CALL" },
    { type: "body", text: "Council President Smith led the flag salute. The Municipal Clerk called the roll:" },
    { type: "roll", entries: [
      { name: "Council President Smith", status: "Present" },
      { name: "Councilmember Davis", status: "Present" },
      { name: "Councilmember Chen", status: "Present" },
      { name: "Councilmember Rodriguez", status: "Present" },
      { name: "Councilmember Williams", status: "Absent" },
    ]},
    { type: "body", text: "A quorum was established with 4 of 5 members present." },
    { type: "section", text: "VI. RESOLUTIONS" },
    { type: "resolution", id: "R-2026-088", title: "Professional Services — Bond Counsel FY2026" },
    { type: "body", text: "Councilmember Davis moved to approve Resolution R-2026-088 authorizing a contract with Smith, Johnson & Associates for bond counsel services in an amount not to exceed $42,500.00. Councilmember Chen seconded." },
    { type: "vote", ayes: "Smith, Davis, Chen, Rodriguez", nays: "None", absent: "Williams", result: "ADOPTED" },
  ];

  useEffect(() => {
    if (!active) { setLines(0); setDone(false); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const totalLines = 14;
    for (let i = 0; i < totalLines; i++) {
      timers.push(setTimeout(() => setLines(i + 1), 300 + i * 220));
    }
    timers.push(setTimeout(() => setDone(true), 300 + totalLines * 220 + 300));
    return () => timers.forEach(clearTimeout);
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Minutes Generator</span>
        </div>
        <div className="flex items-center gap-3">
          {!done && active && lines > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
              <span className="text-xs" style={{ color: T.accent }}>Generating...</span>
            </div>
          )}
          {done && (
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
                <path d="M2.5 6l2.5 2.5 4.5-5" />
              </svg>
              <span className="text-xs" style={{ color: "#5B9A6F" }}>Complete</span>
            </div>
          )}
          <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
        </div>
      </div>
      <div className="flex min-h-[360px]" style={{ background: T.bg }}>
        {/* Sidebar */}
        <div className="w-44 p-5 hidden md:block" style={{ borderRight: `1px solid ${T.border}`, background: T.surface }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: T.muted }}>Navigation</div>
          {["Dashboard", "Docket", "Meetings", "Ordinances", "Minutes"].map((name) => (
            <div key={name} className="text-sm py-2 px-3 mb-0.5" style={{
              color: name === "Minutes" ? T.fg : T.muted,
              background: name === "Minutes" ? T.surface2 : "transparent",
              borderLeft: name === "Minutes" ? `2px solid ${T.accent}` : "2px solid transparent",
            }}>{name}</div>
          ))}

          {/* Source info */}
          <div className="mt-8 pt-5" style={{ borderTop: `1px solid ${T.border}` }}>
            <div className="text-[10px] uppercase tracking-[0.15em] mb-3" style={{ color: T.muted }}>Source</div>
            <div className="text-[11px] mb-1" style={{ color: T.fg }}>Council Meeting</div>
            <div className="text-[11px] mb-3" style={{ color: T.muted }}>March 12, 2026</div>
            <div className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: T.muted }}>Generated From</div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1 h-1 rounded-full" style={{ background: T.accent }} />
              <span className="text-[11px]" style={{ color: T.muted }}>Agenda items</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1 h-1 rounded-full" style={{ background: T.accent }} />
              <span className="text-[11px]" style={{ color: T.muted }}>Roll call data</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: T.accent }} />
              <span className="text-[11px]" style={{ color: T.muted }}>Vote records</span>
            </div>
          </div>
        </div>

        {/* Minutes document */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto" style={{ maxHeight: 400 }}>
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: T.muted }}>Draft Minutes</div>
            <div className="flex gap-2">
              {done && (
                <>
                  <div className="px-3 py-1.5 text-xs uppercase tracking-wider" style={{ border: `1px solid ${T.accent}`, color: T.accent }}>Export PDF</div>
                  <div className="px-3 py-1.5 text-xs uppercase tracking-wider" style={{ background: T.accent, color: T.bg }}>Finalize</div>
                </>
              )}
            </div>
          </div>

          <div className="p-6" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            {minutesContent.map((line, i) => {
              const visible = i < lines;
              const fadeStyle = { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(4px)" };
              switch (line.type) {
                case "header":
                  return (
                    <div key={i} className="text-center text-sm font-medium mb-1 transition-all duration-400" style={{ color: T.fg, ...fadeStyle }}>
                      {line.text}
                    </div>
                  );
                case "divider":
                  return <div key={i} className="w-16 h-px mx-auto my-4 transition-all duration-400" style={{ background: visible ? T.accent : "transparent" }} />;
                case "section":
                  return (
                    <div key={i} className="text-xs uppercase tracking-[0.15em] mt-5 mb-2 transition-all duration-400" style={{ color: T.accent, ...fadeStyle }}>
                      {line.text}
                    </div>
                  );
                case "body":
                  return (
                    <div key={i} className="text-xs leading-relaxed mb-2 transition-all duration-400" style={{ color: T.muted, ...fadeStyle }}>
                      {line.text}
                      {visible && i === lines - 1 && !done && (
                        <span className="w-0.5 h-3 animate-pulse ml-0.5 inline-block align-middle" style={{ background: T.accent }} />
                      )}
                    </div>
                  );
                case "roll":
                  return (
                    <div key={i} className="mb-3 ml-4 transition-all duration-400" style={fadeStyle}>
                      {line.entries.map((entry) => (
                        <div key={entry.name} className="flex items-center justify-between py-1" style={{ borderBottom: `1px solid ${T.border}` }}>
                          <span className="text-xs" style={{ color: T.fg }}>{entry.name}</span>
                          <span className="text-[10px] uppercase tracking-wider" style={{ color: entry.status === "Present" ? "#5B9A6F" : "#C0392B" }}>
                            {entry.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                case "resolution":
                  return (
                    <div key={i} className="flex items-center gap-3 mb-2 py-2 px-3 transition-all duration-400" style={{ background: `${T.accent}08`, borderLeft: `2px solid ${T.accent}`, ...fadeStyle }}>
                      <span className="text-xs" style={{ color: T.accent }}>{line.id}</span>
                      <span className="text-xs" style={{ color: T.fg }}>{line.title}</span>
                    </div>
                  );
                case "vote":
                  return (
                    <div key={i} className="ml-4 mb-2 p-3 transition-all duration-400" style={{ background: T.surface, border: `1px solid ${T.border}`, ...fadeStyle }}>
                      <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>Ayes</span>
                          <span className="text-[11px]" style={{ color: "#5B9A6F" }}>{line.ayes}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>Nays</span>
                          <span className="text-[11px]" style={{ color: T.fg }}>{line.nays}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>Absent</span>
                          <span className="text-[11px]" style={{ color: T.muted }}>{line.absent}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>Result</span>
                          <span className="text-[11px] uppercase tracking-wider" style={{ color: "#5B9A6F" }}>{line.result}</span>
                        </div>
                      </div>
                    </div>
                  );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkflowDemo() {
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
    const delays = [3000, 3200, 3800, 3800, 3600, 4500];
    const timer = setTimeout(advance, delays[step]);
    return () => clearTimeout(timer);
  }, [step, paused, advance]);

  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: embed ? undefined : "100vh", fontFamily: '"Berkeley Mono", ui-monospace, monospace' }}>
      <style>{`
        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-scan-line { animation: scan-line 1.2s ease-in-out infinite; }
      `}</style>

      <div className={`max-w-5xl mx-auto px-6 sm:px-10 ${embed ? "py-6" : "py-16"}`}>
        <div className={`text-center ${embed ? "mb-3" : "mb-4"}`}>
          <h1 className={`${embed ? "text-xl" : "text-2xl sm:text-3xl"} font-normal mb-3`} style={{ letterSpacing: "-0.02em" }}>
            From inbox to agenda — automatically.
          </h1>
          <p className={`text-sm ${embed ? "mb-4" : "mb-8"}`} style={{ color: T.muted }}>
            Watch a resolution flow through Exodia in real time.
          </p>
        </div>

        <ProgressBar step={step} compact={embed} />

        {/* Step content */}
        <div className="relative">
          <div style={{ display: step === 0 ? "block" : "none" }}><EmailStep active={step === 0} /></div>
          <div style={{ display: step === 1 ? "block" : "none" }}><CompletenessStep active={step === 1} /></div>
          <div style={{ display: step === 2 ? "block" : "none" }}><DocumentStep active={step === 2} /></div>
          <div style={{ display: step === 3 ? "block" : "none" }}><EditAgendaStep active={step === 3} /></div>
          <div style={{ display: step === 4 ? "block" : "none" }}><LiveAgendaStep active={step === 4} /></div>
          <div style={{ display: step === 5 ? "block" : "none" }}><MinutesStep active={step === 5} /></div>
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
