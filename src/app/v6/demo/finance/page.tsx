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
  { label: "Invoice Received" },
  { label: "AI Extraction" },
  { label: "Three-Way Match" },
  { label: "Approval Routed" },
  { label: "Budget Posted" },
  { label: "Payment Scheduled" },
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

/* ── Step 0: Invoice arrives via email ── */
function InvoiceStep({ active }: { active: boolean }) {
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Accounts Payable</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="flex min-h-[360px]" style={{ background: T.bg }}>
        {/* Email preview */}
        <div className="flex-1 p-6" style={{ borderRight: `1px solid ${T.border}` }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: T.muted }}>Incoming Email</div>
          <div
            className="p-5 transition-all duration-500"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 1 ? 1 : 0.4,
            }}
          >
            <div className="flex items-center justify-between mb-3 pb-3" style={{ borderBottom: `1px solid ${T.border}` }}>
              <div>
                <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>From</div>
                <div className="text-xs" style={{ color: T.fg }}>accounts@tricountybuilding.com</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>Date</div>
                <div className="text-xs" style={{ color: T.fg }}>Mar 3, 2026</div>
              </div>
            </div>
            <div className="text-sm mb-3" style={{ color: T.fg }}>Invoice #TBS-2026-0847 — Road Maintenance Supplies</div>
            <div className="text-xs leading-relaxed mb-4" style={{ color: T.muted }}>
              Please find attached invoice for materials delivered on 2/28/2026 per PO #2026-03182. Net 30 terms, 2% discount if paid within 10 days.
            </div>

            {/* PDF attachment */}
            <div
              className="flex items-center gap-3 transition-all duration-500"
              style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(6px)" }}
            >
              <div className="flex items-center gap-2 px-3 py-2" style={{ background: T.surface2, border: `1px solid ${T.border}` }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={T.accent} strokeWidth="1.2">
                  <path d="M3 1h5l3 3v9H3V1z" />
                  <path d="M8 1v3h3" />
                  <text x="4" y="11" fill={T.accent} fontSize="4" fontFamily="monospace" stroke="none">PDF</text>
                </svg>
                <span className="text-xs" style={{ color: T.fg }}>INV-TBS-2026-0847.pdf</span>
              </div>
            </div>
          </div>

          {/* Queued confirmation */}
          <div
            className="mt-4 flex items-center gap-2 transition-all duration-500"
            style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? "translateY(0)" : "translateY(6px)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
            <span className="text-xs" style={{ color: T.accent }}>Queued for AI extraction</span>
          </div>
        </div>

        {/* Invoice preview */}
        <div className="w-72 p-6 hidden md:block">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: T.muted }}>Invoice Preview</div>
          <div
            className="p-4 transition-all duration-600"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: T.fg }}>Tri-County Building Supply</span>
              <span className="text-[10px]" style={{ color: T.muted }}>TBS-2026-0847</span>
            </div>
            <div className="space-y-2 mb-3" style={{ borderTop: `1px solid ${T.border}`, paddingTop: 8 }}>
              <div className="flex justify-between text-[10px]">
                <span style={{ color: T.muted }}>Portland Cement (240 bags)</span>
                <span style={{ color: T.fg }}>$3,060.00</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span style={{ color: T.muted }}>3/4&quot; Plywood (50 sheets)</span>
                <span style={{ color: T.fg }}>$1,125.00</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span style={{ color: T.muted }}>Delivery charge</span>
                <span style={{ color: T.fg }}>$102.50</span>
              </div>
            </div>
            <div className="flex justify-between pt-2" style={{ borderTop: `1px solid ${T.border}` }}>
              <span className="text-xs font-bold" style={{ color: T.fg }}>Total</span>
              <span className="text-xs font-bold" style={{ color: T.accent }}>$4,287.50</span>
            </div>
            <div className="mt-3 text-[10px]" style={{ color: T.muted }}>
              Terms: 2/10 Net 30
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: AI extracts data and suggests GL coding ── */
function ExtractionStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => setPhase(4), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [active]);

  const fields = [
    { label: "Vendor", value: "Tri-County Building Supply", sub: "V-1847" },
    { label: "Invoice #", value: "TBS-2026-0847" },
    { label: "Amount", value: "$4,287.50" },
    { label: "Date", value: "03/03/2026" },
    { label: "PO Match", value: "PO #2026-03182", color: "#5B9A6F" },
    { label: "GL Code", value: "101-40-54250", sub: "Road Maint. Supplies" },
    { label: "Fund", value: "101 — General Fund" },
    { label: "Department", value: "40 — Public Works" },
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — AI Extraction Engine</span>
        </div>
        <div className="flex items-center gap-3">
          {phase >= 1 && phase < 4 && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
              <span className="text-xs" style={{ color: T.accent }}>Extracting...</span>
            </div>
          )}
          {phase >= 4 && (
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
                <path d="M2.5 6l2.5 2.5 4.5-5" />
              </svg>
              <span className="text-xs" style={{ color: "#5B9A6F" }}>Extracted</span>
            </div>
          )}
          <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
        </div>
      </div>
      <div className="flex min-h-[360px]" style={{ background: T.bg }}>
        {/* Left — scanning animation */}
        <div className="flex-1 p-6" style={{ borderRight: `1px solid ${T.border}` }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: T.muted }}>Document Scan</div>
          <div
            className="p-5 relative overflow-hidden transition-all duration-500"
            style={{
              background: T.surface,
              border: `1px solid ${phase >= 2 ? T.accent + "40" : T.border}`,
              opacity: phase >= 1 ? 1 : 0.4,
            }}
          >
            {/* Scan line */}
            {phase >= 1 && phase < 3 && (
              <div className="absolute left-0 right-0 h-0.5 animate-scan-line" style={{ background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)` }} />
            )}

            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: T.fg }}>Tri-County Building Supply</span>
              <span className="text-[10px]" style={{ color: T.muted }}>INVOICE</span>
            </div>
            <div className="space-y-1.5 text-[10px]" style={{ color: T.muted }}>
              <div>Invoice: TBS-2026-0847</div>
              <div>Date: March 3, 2026</div>
              <div>PO Reference: 2026-03182</div>
              <div className="pt-2" style={{ borderTop: `1px solid ${T.border}` }}>
                <div className="flex justify-between"><span>Portland Cement x240</span><span style={{ color: phase >= 2 ? T.accent : T.muted }}>$3,060.00</span></div>
                <div className="flex justify-between mt-1"><span>3/4&quot; Plywood x50</span><span style={{ color: phase >= 2 ? T.accent : T.muted }}>$1,125.00</span></div>
                <div className="flex justify-between mt-1"><span>Delivery</span><span style={{ color: phase >= 2 ? T.accent : T.muted }}>$102.50</span></div>
              </div>
              <div className="flex justify-between pt-2 font-bold" style={{ borderTop: `1px solid ${T.border}`, color: phase >= 2 ? T.accent : T.fg }}>
                <span>Total Due</span><span>$4,287.50</span>
              </div>
            </div>

            {/* Highlight boxes appearing over extracted data */}
            {phase >= 2 && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-3 right-3 w-12 h-4 border border-dashed animate-pulse" style={{ borderColor: T.accent + "60" }} />
              </div>
            )}
          </div>

          {/* AI status */}
          {phase >= 1 && phase < 3 && (
            <div className="mt-4 flex items-center gap-3 px-4 py-3" style={{ background: `${T.accent}08`, border: `1px solid ${T.accent}20` }}>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1 h-4 animate-pulse" style={{ background: T.accent, animationDelay: `${i * 200}ms`, opacity: 0.4 + i * 0.2 }} />
                ))}
              </div>
              <span className="text-xs" style={{ color: T.accent }}>
                {phase === 1 ? "Reading invoice fields..." : "Matching vendor & PO records..."}
              </span>
            </div>
          )}

          {phase >= 4 && (
            <div className="mt-4 flex items-center gap-3 px-4 py-3" style={{ background: "#5B9A6F10", border: `1px solid #5B9A6F30` }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#5B9A6F" strokeWidth="1.2">
                <path d="M7 1l2.5 3.5H13L9.5 7.5l1 4L7 9l-3.5 2.5 1-4L1 4.5h3.5L7 1z" />
              </svg>
              <span className="text-xs" style={{ color: "#5B9A6F" }}>8 fields extracted — 97% confidence</span>
            </div>
          )}
        </div>

        {/* Right — extracted fields */}
        <div className="w-72 p-6 hidden md:block">
          <div className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: T.muted }}>Extracted Fields</div>
          {fields.map((f, i) => (
            <div
              key={f.label}
              className="flex items-center justify-between py-2.5 transition-all duration-500"
              style={{
                borderBottom: `1px solid ${T.border}`,
                opacity: phase >= 3 ? 1 : 0,
                transform: phase >= 3 ? "translateX(0)" : "translateX(8px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <span className="text-[11px]" style={{ color: T.muted }}>{f.label}</span>
              <div className="text-right">
                <span className="text-xs" style={{ color: f.color || T.fg }}>{f.value}</span>
                {f.sub && <div className="text-[9px]" style={{ color: T.muted }}>{f.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Three-way match ── */
function MatchStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  const docs = [
    {
      title: "Purchase Order",
      id: "PO #2026-03182",
      date: "Feb 15, 2026",
      details: [
        { label: "Authorized", value: "$4,500.00" },
        { label: "Dept", value: "Public Works" },
        { label: "Approver", value: "J. Morrison" },
      ],
    },
    {
      title: "Receiving Report",
      id: "RR-2026-0291",
      date: "Feb 28, 2026",
      details: [
        { label: "Received by", value: "M. Torres" },
        { label: "Items", value: "All received" },
        { label: "Condition", value: "Good" },
      ],
    },
    {
      title: "Invoice",
      id: "TBS-2026-0847",
      date: "Mar 3, 2026",
      details: [
        { label: "Amount", value: "$4,287.50" },
        { label: "Vendor", value: "Tri-County" },
        { label: "Terms", value: "2/10 Net 30" },
      ],
    },
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Verification Engine</span>
        </div>
        <div className="flex items-center gap-3">
          {phase >= 3 && (
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
                <path d="M2.5 6l2.5 2.5 4.5-5" />
              </svg>
              <span className="text-xs" style={{ color: "#5B9A6F" }}>Match Verified</span>
            </div>
          )}
          <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
        </div>
      </div>
      <div className="min-h-[360px] p-6" style={{ background: T.bg }}>
        <div className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: T.muted }}>Three-Way Match</div>

        {/* Three document cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {docs.map((doc, i) => (
            <div
              key={doc.title}
              className="p-4 transition-all duration-600"
              style={{
                background: T.surface,
                border: `1px solid ${phase >= 2 ? "#5B9A6F30" : T.border}`,
                opacity: phase >= 1 ? 1 : 0.3,
                transform: phase >= 1 ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 200}ms`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={phase >= 2 ? "#5B9A6F" : T.muted} strokeWidth="1.2">
                  <path d="M3 1h5l3 3v9H3V1z" />
                  <path d="M8 1v3h3" />
                </svg>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: T.fg }}>{doc.title}</span>
              </div>
              <div className="text-xs mb-1" style={{ color: T.accent }}>{doc.id}</div>
              <div className="text-[10px] mb-3" style={{ color: T.muted }}>{doc.date}</div>
              {doc.details.map((d) => (
                <div key={d.label} className="flex justify-between py-1.5" style={{ borderTop: `1px solid ${T.border}` }}>
                  <span className="text-[10px]" style={{ color: T.muted }}>{d.label}</span>
                  <span className="text-[10px]" style={{ color: T.fg }}>{d.value}</span>
                </div>
              ))}
              {/* Checkmark overlay */}
              {phase >= 2 && (
                <div className="flex items-center justify-center mt-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M5 8l2 2 4-4" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Match result */}
        <div
          className="p-4 transition-all duration-600"
          style={{
            background: phase >= 3 ? "#5B9A6F08" : T.surface,
            border: `1px solid ${phase >= 3 ? "#5B9A6F30" : T.border}`,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>PO Amount</div>
              <div className="text-xs" style={{ color: T.fg }}>$4,500.00</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>Invoice Amount</div>
              <div className="text-xs" style={{ color: T.fg }}>$4,287.50</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>Variance</div>
              <div className="text-xs" style={{ color: "#5B9A6F" }}>-$212.50 (under PO)</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>Status</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: phase >= 3 ? "#5B9A6F" : T.accent }}>
                {phase >= 3 ? "Match Verified" : "Checking..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3: Smart routing for approval ── */
function ApprovalStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setPhase(4), 3000);
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Approval Workflow</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="min-h-[360px] p-6" style={{ background: T.bg }}>
        {/* Routing logic */}
        <div className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: T.muted }}>Smart Routing</div>

        <div
          className="p-4 mb-5 transition-all duration-500"
          style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            opacity: phase >= 1 ? 1 : 0.3,
          }}
        >
          <div className="text-[10px] uppercase tracking-wider mb-3" style={{ color: T.muted }}>AI determined approval path</div>
          <div className="space-y-2">
            {[
              { rule: "Amount $4,287.50 < $5,000 threshold", result: "Department Head only" },
              { rule: "Vendor Tri-County — approved vendor list", result: "No additional review" },
              { rule: "Budget 101-40-54250 has available funds", result: "No budget exception" },
            ].map((r, i) => (
              <div
                key={r.rule}
                className="flex items-center gap-3 transition-all duration-500"
                style={{
                  opacity: phase >= 2 ? 1 : 0,
                  transform: phase >= 2 ? "translateX(0)" : "translateX(8px)",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
                  <path d="M2.5 6l2.5 2.5 4.5-5" />
                </svg>
                <span className="text-[11px]" style={{ color: T.fg }}>{r.rule}</span>
                <span className="text-[10px] ml-auto" style={{ color: T.muted }}>{r.result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Approval chain */}
        <div className="flex items-center gap-4 mb-5">
          {/* Step 1: AP Clerk */}
          <div
            className="flex-1 p-3 text-center transition-all duration-500"
            style={{
              background: phase >= 2 ? "#5B9A6F08" : T.surface,
              border: `1px solid ${phase >= 2 ? "#5B9A6F30" : T.border}`,
              opacity: phase >= 1 ? 1 : 0.3,
            }}
          >
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>AP Clerk</div>
            <div className="text-xs" style={{ color: T.fg }}>S. Patel</div>
            {phase >= 2 && (
              <div className="text-[10px] mt-1" style={{ color: "#5B9A6F" }}>Auto-verified</div>
            )}
          </div>

          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke={phase >= 2 ? "#5B9A6F" : T.border} strokeWidth="1">
            <path d="M0 6h12M9 3l3 3-3 3" />
          </svg>

          {/* Step 2: Department Head */}
          <div
            className="flex-1 p-3 text-center transition-all duration-500"
            style={{
              background: phase >= 4 ? "#5B9A6F08" : phase >= 3 ? `${T.accent}08` : T.surface,
              border: `1px solid ${phase >= 4 ? "#5B9A6F30" : phase >= 3 ? T.accent + "30" : T.border}`,
              opacity: phase >= 2 ? 1 : 0.3,
            }}
          >
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>Dept. Head</div>
            <div className="text-xs" style={{ color: T.fg }}>J. Morrison</div>
            {phase >= 3 && phase < 4 && (
              <div className="flex items-center gap-1 justify-center mt-1">
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: T.accent }} />
                <span className="text-[10px]" style={{ color: T.accent }}>Reviewing...</span>
              </div>
            )}
            {phase >= 4 && (
              <div className="text-[10px] mt-1" style={{ color: "#5B9A6F" }}>Approved</div>
            )}
          </div>

          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke={phase >= 4 ? "#5B9A6F" : T.border} strokeWidth="1">
            <path d="M0 6h12M9 3l3 3-3 3" />
          </svg>

          {/* Step 3: Post */}
          <div
            className="flex-1 p-3 text-center transition-all duration-500"
            style={{
              background: T.surface,
              border: `1px solid ${phase >= 4 ? T.accent + "30" : T.border}`,
              opacity: phase >= 4 ? 1 : 0.3,
            }}
          >
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: T.muted }}>Finance</div>
            <div className="text-xs" style={{ color: T.fg }}>Post to GL</div>
            {phase >= 4 && (
              <div className="text-[10px] mt-1" style={{ color: T.accent }}>Ready</div>
            )}
          </div>
        </div>

        {/* Approval action */}
        <div
          className="p-4 transition-all duration-600"
          style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs mb-1" style={{ color: T.fg }}>Janet Morrison — Public Works Director</div>
              <div className="text-[10px]" style={{ color: T.muted }}>
                Invoice $4,287.50 from Tri-County Building Supply • PO matched • Budget available
              </div>
            </div>
            <div
              className="px-4 py-2 text-[10px] uppercase tracking-wider transition-all duration-500"
              style={{
                background: phase >= 4 ? "#5B9A6F" : T.accent,
                color: T.bg,
              }}
            >
              {phase >= 4 ? "Approved" : "Approve"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4: Budget impact & GL posting ── */
function PostingStep({ active }: { active: boolean }) {
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — General Ledger</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="min-h-[360px] p-6" style={{ background: T.bg }}>
        <div className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: T.muted }}>Journal Entry — Auto-Posted</div>

        {/* Journal entry */}
        <div
          className="mb-5 transition-all duration-500"
          style={{
            border: `1px solid ${T.border}`,
            opacity: phase >= 1 ? 1 : 0.3,
          }}
        >
          <div className="grid grid-cols-4 gap-0 text-[10px] uppercase tracking-wider px-4 py-2" style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, color: T.muted }}>
            <span>Account</span>
            <span>Description</span>
            <span className="text-right">Debit</span>
            <span className="text-right">Credit</span>
          </div>
          {[
            { acct: "101-40-54250", desc: "Road Maint. Supplies", debit: "$4,287.50", credit: "" },
            { acct: "101-00-20100", desc: "Accounts Payable", debit: "", credit: "$4,287.50" },
          ].map((row, i) => (
            <div
              key={row.acct}
              className="grid grid-cols-4 gap-0 px-4 py-3 transition-all duration-500"
              style={{
                borderBottom: `1px solid ${T.border}`,
                opacity: phase >= 2 ? 1 : 0,
                transform: phase >= 2 ? "translateX(0)" : "translateX(8px)",
                transitionDelay: `${i * 200}ms`,
              }}
            >
              <span className="text-xs" style={{ color: T.accent }}>{row.acct}</span>
              <span className="text-xs" style={{ color: T.fg }}>{row.desc}</span>
              <span className="text-xs text-right" style={{ color: row.debit ? T.fg : T.muted }}>{row.debit || "—"}</span>
              <span className="text-xs text-right" style={{ color: row.credit ? T.fg : T.muted }}>{row.credit || "—"}</span>
            </div>
          ))}
        </div>

        {/* Budget impact */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="p-4 transition-all duration-600"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="text-[10px] uppercase tracking-wider mb-3" style={{ color: T.muted }}>Budget Impact — Public Works Supplies</div>
            <div className="flex justify-between mb-2">
              <span className="text-[10px]" style={{ color: T.muted }}>FY26 Appropriation</span>
              <span className="text-xs" style={{ color: T.fg }}>$67,500.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[10px]" style={{ color: T.muted }}>Spent to date</span>
              <span className="text-xs" style={{ color: T.fg }}>$24,475.00</span>
            </div>
            <div className="flex justify-between pt-2" style={{ borderTop: `1px solid ${T.border}` }}>
              <span className="text-[10px]" style={{ color: T.muted }}>Remaining</span>
              <span className="text-xs" style={{ color: "#5B9A6F" }}>$43,025.00</span>
            </div>
            {/* Budget bar */}
            <div className="h-1.5 w-full mt-3" style={{ background: T.surface2 }}>
              <div
                className="h-full transition-all duration-1000"
                style={{ width: phase >= 2 ? "43%" : "36%", background: "#5B9A6F" }}
              />
            </div>
            <div className="text-[9px] mt-1" style={{ color: T.muted }}>43% spent — 75% through fiscal year</div>
          </div>

          <div
            className="p-4 transition-all duration-600"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="text-[10px] uppercase tracking-wider mb-3" style={{ color: T.muted }}>Encumbrance Release</div>
            <div className="flex justify-between mb-2">
              <span className="text-[10px]" style={{ color: T.muted }}>PO #2026-03182</span>
              <span className="text-xs" style={{ color: T.fg }}>$4,500.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[10px]" style={{ color: T.muted }}>Invoice paid</span>
              <span className="text-xs" style={{ color: T.fg }}>-$4,287.50</span>
            </div>
            <div className="flex justify-between pt-2" style={{ borderTop: `1px solid ${T.border}` }}>
              <span className="text-[10px]" style={{ color: T.muted }}>Remaining on PO</span>
              <span className="text-xs" style={{ color: T.accent }}>$212.50</span>
            </div>

            {/* AI insight */}
            <div className="mt-4 p-2" style={{ background: `${T.accent}08`, border: `1px solid ${T.accent}15` }}>
              <div className="flex items-start gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={T.accent} strokeWidth="1.2" className="shrink-0 mt-0.5">
                  <circle cx="6" cy="6" r="5" />
                  <path d="M6 4v3M6 8.5v0" />
                </svg>
                <span className="text-[10px] leading-relaxed" style={{ color: T.accent }}>
                  On track — spending pace below budget trajectory
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 5: Payment scheduled ── */
function PaymentStep({ active }: { active: boolean }) {
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
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Treasury</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="min-h-[360px] p-6" style={{ background: T.bg }}>
        <div className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: T.muted }}>Payment Scheduling</div>

        {/* Discount alert */}
        <div
          className="p-4 mb-5 transition-all duration-500"
          style={{
            background: `${T.accent}08`,
            border: `1px solid ${T.accent}20`,
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={T.accent} strokeWidth="1.2" className="shrink-0 mt-0.5">
              <circle cx="8" cy="8" r="6.5" />
              <path d="M6 6.5L8 4.5l2 2M6 9.5L8 11.5l2-2M5.5 8h5" />
            </svg>
            <div>
              <div className="text-xs mb-1" style={{ color: T.accent }}>Early Payment Discount Available</div>
              <div className="text-[11px]" style={{ color: T.muted }}>
                2/10 Net 30 — Pay by Mar 13 to save <span style={{ color: T.accent }}>$85.75</span> (2% discount)
              </div>
            </div>
          </div>
        </div>

        {/* Check run schedule */}
        <div
          className="mb-5 transition-all duration-500"
          style={{
            border: `1px solid ${T.border}`,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="px-4 py-2 text-[10px] uppercase tracking-wider" style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, color: T.muted }}>
            Next Check Run — Thursday, Mar 6
          </div>
          {[
            { vendor: "Tri-County Building Supply", inv: "TBS-2026-0847", amount: "$4,201.75", note: "2% disc applied", highlight: true },
            { vendor: "Northeast Office Solutions", inv: "NOS-9912", amount: "$347.82", note: "" },
            { vendor: "Cintas Corporation", inv: "CN-441209", amount: "$892.00", note: "" },
            { vendor: "HD Supply Waterworks", inv: "HD-2026-5541", amount: "$6,315.75", note: "" },
          ].map((item, i) => (
            <div
              key={item.inv}
              className="flex items-center justify-between px-4 py-3 transition-all duration-500"
              style={{
                borderBottom: `1px solid ${T.border}`,
                background: item.highlight ? `${T.accent}06` : "transparent",
                opacity: phase >= 2 ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-xs shrink-0" style={{ color: T.muted }}>{item.inv}</span>
                <span className="text-xs truncate" style={{ color: item.highlight ? T.fg : T.muted }}>{item.vendor}</span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {item.note && <span className="text-[10px]" style={{ color: "#5B9A6F" }}>{item.note}</span>}
                <span className="text-xs" style={{ color: item.highlight ? T.accent : T.fg }}>{item.amount}</span>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-2" style={{ background: T.surface }}>
            <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>Total Check Run</span>
            <span className="text-xs" style={{ color: T.accent }}>$11,757.32</span>
          </div>
        </div>

        {/* Vendor notification + metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="p-4 transition-all duration-600"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#5B9A6F" strokeWidth="1.2">
                <path d="M2 7l4 4 6-7" />
              </svg>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "#5B9A6F" }}>Vendor Portal Updated</span>
            </div>
            <div className="text-[11px]" style={{ color: T.muted }}>
              Tri-County can view payment status: <span style={{ color: T.fg }}>Scheduled — Mar 6</span>
            </div>
          </div>

          <div
            className="p-4 transition-all duration-600"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: T.muted }}>This Week</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg" style={{ color: T.accent }}>47</div>
                <div className="text-[10px]" style={{ color: T.muted }}>invoices processed</div>
              </div>
              <div className="text-right">
                <div className="text-lg" style={{ color: "#5B9A6F" }}>1.2d</div>
                <div className="text-[10px]" style={{ color: T.muted }}>avg. cycle time</div>
              </div>
            </div>
            <div className="text-[9px] mt-2" style={{ color: T.muted }}>Down from 8.4 days before Exodia</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinanceWorkflowDemo() {
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
      <style>{`
        @keyframes scan-line {
          0% { transform: translateY(0); }
          100% { transform: translateY(200px); }
        }
        .animate-scan-line { animation: scan-line 1.5s ease-in-out infinite; }
      `}</style>
      <div className={`max-w-5xl mx-auto px-6 sm:px-10 ${embed ? "py-6" : "py-16"}`}>
        <div className={`text-center ${embed ? "mb-3" : "mb-4"}`}>
          <h1 className={`${embed ? "text-xl" : "text-2xl sm:text-3xl"} font-normal mb-3`} style={{ letterSpacing: "-0.02em" }}>
            From invoice to payment — in days, not weeks.
          </h1>
          <p className={`text-sm ${embed ? "mb-4" : "mb-8"}`} style={{ color: T.muted }}>
            Watch an invoice flow through Exodia from receipt to check run.
          </p>
        </div>

        <ProgressBar step={step} compact={embed} />

        {/* Step content */}
        <div className="relative">
          <div style={{ display: step === 0 ? "block" : "none" }}><InvoiceStep active={step === 0} /></div>
          <div style={{ display: step === 1 ? "block" : "none" }}><ExtractionStep active={step === 1} /></div>
          <div style={{ display: step === 2 ? "block" : "none" }}><MatchStep active={step === 2} /></div>
          <div style={{ display: step === 3 ? "block" : "none" }}><ApprovalStep active={step === 3} /></div>
          <div style={{ display: step === 4 ? "block" : "none" }}><PostingStep active={step === 4} /></div>
          <div style={{ display: step === 5 ? "block" : "none" }}><PaymentStep active={step === 5} /></div>
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
