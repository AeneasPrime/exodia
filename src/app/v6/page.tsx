"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// V6: Light Warm Editorial — Soft white background with deep forest green accents.
// Anduril gravity, Hadrian precision, Paradigm typography, Rogo editorial quality.
const T = {
  bg: "#F7F5F0",
  fg: "#111111",
  muted: "#807B73",
  accent: "#1B4332",
  border: "#DDD8CE",
  surface: "#EDEAE3",
  surface2: "#E3DFD6",
};

function WaitlistForm({ variant = "default" }: { variant?: "default" | "accent" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok || res.status === 409) {
        setStatus("success");
        setMessage("You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    }
  }

  const isAccent = variant === "accent";

  if (status === "success") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
        <span className="text-sm" style={{ color: T.accent }}>{message}</span>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          required
          placeholder="you@municipality.gov"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-5 py-4 text-sm focus:outline-none"
          style={{
            background: isAccent ? `${T.bg}18` : "transparent",
            border: `1px solid ${isAccent ? `${T.bg}40` : T.border}`,
            color: isAccent ? T.bg : T.fg,
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-4 text-xs uppercase tracking-[0.15em] transition-opacity hover:opacity-70 disabled:opacity-50 cursor-pointer shrink-0"
          style={{
            background: "transparent",
            color: isAccent ? T.bg : T.accent,
            border: `1px solid ${isAccent ? T.bg : T.accent}`,
            fontFamily: "inherit",
          }}
        >
          {status === "loading" ? "..." : "Get Access"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs mt-2" style={{ color: "#C0392B" }}>{message}</p>
      )}
    </div>
  );
}

function ProductMockup() {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Docket</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      {/* App */}
      <div className="flex min-h-[360px]" style={{ background: T.bg }}>
        {/* Sidebar */}
        <div className="w-48 p-5 hidden md:block" style={{ borderRight: `1px solid ${T.border}`, background: T.surface }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: T.muted }}>Navigation</div>
          {[
            { name: "Dashboard", active: false },
            { name: "Docket", active: true },
            { name: "Meetings", active: false },
            { name: "Ordinances", active: false },
            { name: "Minutes", active: false },
          ].map((item) => (
            <div
              key={item.name}
              className="text-sm py-2 px-3 mb-0.5"
              style={{
                color: item.active ? T.fg : T.muted,
                background: item.active ? T.surface2 : "transparent",
                borderLeft: item.active ? `2px solid ${T.accent}` : "2px solid transparent",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.muted }}>Council Meeting</div>
              <div className="text-lg" style={{ color: T.fg }}>March 12, 2026</div>
            </div>
            <div className="text-xs" style={{ color: T.muted }}>8 items</div>
          </div>
          <div style={{ borderTop: `1px solid ${T.border}` }}>
            {[
              { id: "R-2026-087", title: "Award Contract — Road Resurfacing Program", dept: "Engineering", status: "Accepted", color: "#5B9A6F" },
              { id: "R-2026-088", title: "Professional Services — Bond Counsel", dept: "Finance", status: "In Review", color: T.accent },
              { id: "O-2026-012", title: "Amend Ch. 23 — Adopt an Area Program", dept: "Law", status: "New", color: "#8BADC4" },
              { id: "R-2026-089", title: "Emergency Water Main Repair Services", dept: "Water/Sewer", status: "Accepted", color: "#5B9A6F" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4" style={{ borderBottom: `1px solid ${T.border}` }}>
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-xs shrink-0" style={{ color: T.muted }}>{item.id}</span>
                  <span className="text-sm truncate" style={{ color: T.fg }}>{item.title}</span>
                </div>
                <div className="flex items-center gap-6 shrink-0 ml-4">
                  <span className="text-xs hidden sm:block" style={{ color: T.muted }}>{item.dept}</span>
                  <span className="text-xs uppercase tracking-wider" style={{ color: item.color }}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgendaMockup() {
  return (
    <div className="overflow-hidden mb-10" style={{ border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Agenda Builder</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="flex min-h-[340px]" style={{ background: T.bg }}>
        <div className="w-48 p-5 hidden md:block" style={{ borderRight: `1px solid ${T.border}`, background: T.surface }}>
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
              <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.muted }}>Agenda Preview</div>
              <div className="text-lg" style={{ color: T.fg }}>Council Meeting — March 12, 2026</div>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 text-xs uppercase tracking-wider" style={{ border: `1px solid ${T.accent}`, color: T.accent }}>Export PDF</div>
              <div className="px-3 py-1.5 text-xs uppercase tracking-wider" style={{ background: T.accent, color: T.bg }}>Publish</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${T.border}` }}>
            {[
              { section: "I", title: "Call to Order", items: 0, time: "7:00 PM" },
              { section: "II", title: "Flag Salute & Roll Call", items: 0, time: "7:02 PM" },
              { section: "III", title: "Public Comment", items: 0, time: "7:05 PM" },
              { section: "IV", title: "Consent Agenda", items: 4, time: "7:20 PM" },
              { section: "V", title: "Ordinances — First Reading", items: 2, time: "7:35 PM" },
              { section: "VI", title: "Resolutions", items: 3, time: "7:50 PM" },
              { section: "VII", title: "Adjournment", items: 0, time: "8:30 PM" },
            ].map((row) => (
              <div key={row.section} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
                <div className="flex items-center gap-4">
                  <span className="text-xs w-6" style={{ color: T.accent }}>{row.section}</span>
                  <span className="text-sm" style={{ color: T.fg }}>{row.title}</span>
                  {row.items > 0 && <span className="text-xs px-2 py-0.5" style={{ background: T.surface2, color: T.muted }}>{row.items} items</span>}
                </div>
                <span className="text-xs" style={{ color: T.muted }}>{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkOrderMockup() {
  return (
    <div className="overflow-hidden mb-10" style={{ border: `1px solid ${T.border}` }}>
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
      <div className="flex min-h-[340px]" style={{ background: T.bg }}>
        <div className="w-48 p-5 hidden md:block" style={{ borderRight: `1px solid ${T.border}`, background: T.surface }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: T.muted }}>Navigation</div>
          {["Dashboard", "Work Orders", "Assets", "Inspections", "Fleet"].map((name) => (
            <div key={name} className="text-sm py-2 px-3 mb-0.5" style={{
              color: name === "Work Orders" ? T.fg : T.muted,
              background: name === "Work Orders" ? T.surface2 : "transparent",
              borderLeft: name === "Work Orders" ? `2px solid ${T.accent}` : "2px solid transparent",
            }}>{name}</div>
          ))}
        </div>
        <div className="flex-1 p-5 sm:p-6">
          {/* Kanban board */}
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: T.muted }}>Active Work Orders — This Week</div>
            <div className="px-3 py-1.5 text-xs uppercase tracking-wider" style={{ border: `1px solid ${T.accent}`, color: T.accent }}>+ New Order</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Open", color: "#8BADC4", items: [
                { id: "WO-4012", title: "Pothole repair — Oak St", priority: "High", crew: "Roads A" },
                { id: "WO-4015", title: "Street light outage — Main Ave", priority: "Medium", crew: "Electric" },
              ]},
              { label: "In Progress", color: T.accent, items: [
                { id: "WO-4008", title: "Water main valve replace", priority: "Urgent", crew: "Water" },
                { id: "WO-4011", title: "Park bench installation", priority: "Low", crew: "Parks" },
              ]},
              { label: "Complete", color: "#5B9A6F", items: [
                { id: "WO-4006", title: "Catch basin clearing — Elm", priority: "Medium", crew: "Storm" },
              ]},
            ].map((col) => (
              <div key={col.label}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
                  <span className="text-xs uppercase tracking-wider" style={{ color: col.color }}>{col.label}</span>
                  <span className="text-xs" style={{ color: T.muted }}>{col.items.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {col.items.map((item) => (
                    <div key={item.id} className="p-3" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
                      <div className="text-xs mb-2" style={{ color: T.muted }}>{item.id}</div>
                      <div className="text-sm mb-2" style={{ color: T.fg }}>{item.title}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: item.priority === "Urgent" ? "#C0392B" : item.priority === "High" ? T.accent : T.muted }}>{item.priority}</span>
                        <span className="text-xs" style={{ color: T.muted }}>{item.crew}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetMockup() {
  return (
    <div className="overflow-hidden mb-10" style={{ border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.border }} />
          </div>
          <span className="text-xs" style={{ color: T.muted }}>Exodia — Finance</span>
        </div>
        <span className="text-xs" style={{ color: T.muted }}>app.exodia.co</span>
      </div>
      <div className="flex min-h-[340px]" style={{ background: T.bg }}>
        <div className="w-48 p-5 hidden md:block" style={{ borderRight: `1px solid ${T.border}`, background: T.surface }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: T.muted }}>Navigation</div>
          {["Dashboard", "Budget", "Payables", "Revenue", "Grants", "Reports"].map((name) => (
            <div key={name} className="text-sm py-2 px-3 mb-0.5" style={{
              color: name === "Budget" ? T.fg : T.muted,
              background: name === "Budget" ? T.surface2 : "transparent",
              borderLeft: name === "Budget" ? `2px solid ${T.accent}` : "2px solid transparent",
            }}>{name}</div>
          ))}
        </div>
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.muted }}>FY 2026 Budget</div>
              <div className="text-lg" style={{ color: T.fg }}>Department Appropriations</div>
            </div>
            <div className="text-right">
              <div className="text-xs" style={{ color: T.muted }}>Total Budget</div>
              <div className="text-lg" style={{ color: T.fg }}>$14,285,000</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${T.border}` }}>
            {[
              { dept: "Police", budgeted: "$4,120,000", spent: "$2,890,400", pct: 70, status: "On Track" },
              { dept: "Public Works", budgeted: "$2,850,000", spent: "$2,422,500", pct: 85, status: "Watch" },
              { dept: "Fire", budgeted: "$3,200,000", spent: "$2,016,000", pct: 63, status: "On Track" },
              { dept: "Administration", budgeted: "$1,680,000", spent: "$1,478,400", pct: 88, status: "Over" },
              { dept: "Parks & Rec", budgeted: "$1,235,000", spent: "$679,250", pct: 55, status: "On Track" },
              { dept: "Library", budgeted: "$1,200,000", spent: "$720,000", pct: 60, status: "On Track" },
            ].map((row) => (
              <div key={row.dept} className="flex items-center justify-between py-3.5" style={{ borderBottom: `1px solid ${T.border}` }}>
                <div className="flex items-center gap-4 w-32">
                  <span className="text-sm" style={{ color: T.fg }}>{row.dept}</span>
                </div>
                <div className="flex-1 mx-6 hidden sm:block">
                  <div className="h-1.5 w-full rounded-full" style={{ background: T.surface2 }}>
                    <div className="h-1.5 rounded-full" style={{
                      width: `${row.pct}%`,
                      background: row.pct > 85 ? "#C0392B" : row.pct > 75 ? T.accent : "#5B9A6F",
                    }} />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs hidden md:block" style={{ color: T.muted }}>{row.spent} / {row.budgeted}</span>
                  <span className="text-xs uppercase tracking-wider w-16 text-right" style={{
                    color: row.status === "Over" ? "#C0392B" : row.status === "Watch" ? T.accent : "#5B9A6F",
                  }}>{row.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroAnimation() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => (t + 1) % 4), 2500);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { id: "R-087", label: "Road Resurfacing Contract", dept: "Engineering", status: "Accepted", color: "#5B9A6F" },
    { id: "INV-847", label: "Tri-County Building Supply", dept: "Finance", status: "Matched", color: T.accent },
    { id: "SR-412", label: "Pothole — 247 Elm Street", dept: "Public Works", status: "Dispatched", color: "#8BADC4" },
    { id: "O-012", label: "Amend Ch. 23 — Zoning", dept: "Law", status: "In Review", color: T.accent },
  ];

  return (
    <div className="relative" style={{ perspective: 1000 }}>
      {/* Abstract dashboard frame */}
      <div
        className="overflow-hidden"
        style={{ border: `1px solid ${T.border}`, background: T.bg, transform: "rotateY(-2deg) rotateX(1deg)" }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${T.border}`, background: T.surface }}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: T.border }} />
              <div className="w-2 h-2 rounded-full" style={{ background: T.border }} />
              <div className="w-2 h-2 rounded-full" style={{ background: T.border }} />
            </div>
            <span className="text-[10px]" style={{ color: T.muted }}>Exodia — Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5B9A6F" }} />
            <span className="text-[10px]" style={{ color: "#5B9A6F" }}>Live</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-0" style={{ borderBottom: `1px solid ${T.border}` }}>
          {[
            { label: "Active Items", value: "23" },
            { label: "Processing", value: "7" },
            { label: "Completed Today", value: "14" },
          ].map((stat, i) => (
            <div key={stat.label} className="px-4 py-3 text-center" style={{ borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <div className="text-lg mb-0.5" style={{ color: T.fg }}>{stat.value}</div>
              <div className="text-[9px] uppercase tracking-wider" style={{ color: T.muted }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Live feed items */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] uppercase tracking-wider" style={{ color: T.muted }}>Live Feed</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: T.accent }} />
              <span className="text-[9px]" style={{ color: T.accent }}>Updating</span>
            </div>
          </div>
          {items.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2.5 transition-all duration-700"
              style={{
                borderTop: `1px solid ${T.border}`,
                opacity: tick === i ? 1 : 0.4,
                transform: tick === i ? "translateX(0)" : "translateX(0)",
                background: tick === i ? `${item.color}06` : "transparent",
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] shrink-0" style={{ color: T.muted }}>{item.id}</span>
                <span className="text-[11px] truncate" style={{ color: tick === i ? T.fg : T.muted }}>{item.label}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-[9px] hidden sm:block" style={{ color: T.muted }}>{item.dept}</span>
                <div className="flex items-center gap-1.5">
                  {tick === i && <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: item.color }} />}
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: item.color }}>{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom progress bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] uppercase tracking-wider" style={{ color: T.muted }}>AI Processing Queue</span>
            <span className="text-[9px]" style={{ color: T.accent }}>3 items</span>
          </div>
          <div className="h-1 w-full overflow-hidden" style={{ background: T.surface2 }}>
            <div
              className="h-full transition-all duration-[2000ms] ease-in-out"
              style={{ width: `${25 + tick * 25}%`, background: `linear-gradient(90deg, ${T.accent}, ${T.accent}80)` }}
            />
          </div>
        </div>
      </div>

      {/* Floating notification card */}
      <div
        className="absolute -top-4 -right-4 p-3 transition-all duration-700"
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          boxShadow: `0 8px 32px ${T.bg}cc`,
          opacity: tick >= 2 ? 1 : 0,
          transform: tick >= 2 ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#5B9A6F" strokeWidth="1.5">
            <path d="M2.5 6l2.5 2.5 4.5-5" />
          </svg>
          <span className="text-[10px]" style={{ color: "#5B9A6F" }}>Invoice auto-matched</span>
        </div>
      </div>

      {/* Floating AI badge */}
      <div
        className="absolute -bottom-3 -left-3 px-3 py-2 flex items-center gap-2 transition-all duration-700"
        style={{
          background: T.surface,
          border: `1px solid ${T.accent}30`,
          boxShadow: `0 8px 32px ${T.bg}cc`,
          opacity: tick === 1 || tick === 3 ? 1 : 0,
          transform: tick === 1 || tick === 3 ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
        <span className="text-[10px]" style={{ color: T.accent }}>AI classifying SR-412...</span>
      </div>
    </div>
  );
}

export default function V6() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [fading, setFading] = useState(false);
  const [activeTab, setActiveTab] = useState("clerk");
  const [activeDemo, setActiveDemo] = useState("clerk");
  const aboutRef = useReveal();
  const capRef = useReveal();
  const quoteRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div data-page="v6" style={{ background: T.bg, color: T.fg, minHeight: "100vh", fontFamily: '"Berkeley Mono", ui-monospace, monospace', opacity: fading ? 0 : 1, transition: "opacity 0.4s ease" }}>
      <style>{`
        [data-page="v6"] ::selection { background: ${T.accent}; color: ${T.bg}; }
        @keyframes orb-drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          animation: orb-drift ease-in-out infinite;
        }
        @keyframes sweep-down {
          0% { top: -5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
        .hero-sweep {
          animation: sweep-down 8s ease-in-out infinite;
        }
        .delay-3 { animation-delay: 0.35s; }
      `}</style>
      {/* Nav */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled ? `${T.bg}ee` : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <span className="text-xl tracking-[0.04em]" style={{ color: T.fg }}>Exodia</span>
          <div className="hidden md:flex items-center gap-10">
            {["Platform", "Capabilities", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-50"
                style={{ color: "#555555" }}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => { setFading(true); setTimeout(() => router.push("/v5"), 400); }}
              className="transition-opacity duration-300 hover:opacity-50 cursor-pointer"
              style={{ color: T.muted }}
              title="Switch to dark mode"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <a
              href="#access"
              className="text-xs uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-50 flex items-center gap-2"
              style={{ color: T.accent }}
            >
              Get Access
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 6h8M7 3l3 3-3 3" />
              </svg>
            </a>
          </div>
        </div>
        <div style={{ height: 1, background: scrolled ? T.border : "transparent", transition: "background 0.3s" }} />
      </nav>

      {/* Hero */}
      <section className="px-6 sm:px-10 pt-72 pb-20 relative overflow-hidden">
        {/* Slow-moving ambient glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="hero-orb" style={{ width: 600, height: 600, left: "10%", top: "-10%", background: `radial-gradient(circle, ${T.accent}12 0%, transparent 70%)`, animationDuration: "20s" }} />
          <div className="hero-orb" style={{ width: 500, height: 500, right: "-5%", top: "20%", background: `radial-gradient(circle, ${T.accent}0a 0%, transparent 70%)`, animationDuration: "25s", animationDelay: "-8s" }} />
          <div className="hero-orb" style={{ width: 400, height: 400, left: "40%", bottom: "10%", background: `radial-gradient(circle, ${T.accent}08 0%, transparent 70%)`, animationDuration: "18s", animationDelay: "-4s" }} />
        </div>
        {/* Horizontal accent line that slowly sweeps */}
        <div className="absolute left-0 right-0 pointer-events-none hero-sweep" style={{ height: 1, background: `linear-gradient(90deg, transparent 0%, ${T.accent}30 20%, ${T.accent}60 50%, ${T.accent}30 80%, transparent 100%)` }} />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div
                className="text-xs uppercase tracking-[0.3em] mb-8 opacity-0 animate-fade-in-up"
                style={{ color: T.muted }}
              >
                Est. 2026 — New Jersey
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] mb-8 opacity-0 animate-fade-in-up delay-1"
                style={{ letterSpacing: "-0.03em" }}
              >
                You keep this place running.
                <br />
                It&apos;s time your software did too.
              </h1>
              <p className="text-base leading-relaxed mb-8 opacity-0 animate-fade-in-up delay-2" style={{ color: "#807B73", maxWidth: 440 }}>
                Local government runs on the people who show up every day — clerks, public works,
                finance, planning. Exodia gives them modern tools to do it.
              </p>
              <div className="opacity-0 animate-fade-in-up delay-3">
                <WaitlistForm />
              </div>
            </div>
            <div className="lg:col-span-4 hidden lg:flex items-start -mt-28 opacity-0 animate-fade-in-up delay-2">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics — hidden until we have real numbers */}

      {/* Platform — Demos */}
      <section id="platform" className="py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12">
            <div className="lg:col-span-3">
              <div className="text-xs uppercase tracking-[0.3em]" style={{ color: T.muted }}>Platform</div>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-3xl sm:text-4xl font-normal leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Built for the complexity of local government.
              </h2>
            </div>
          </div>

          {/* Demo tabs */}
          <div className="flex gap-2 mb-8 justify-center">
            {[
              { id: "clerk", label: "Clerk's Office" },
              { id: "citizen", label: "Citizen Requests" },
              { id: "finance", label: "Finance" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDemo(tab.id)}
                className="text-sm uppercase tracking-[0.15em] px-5 py-3 transition-all duration-300 cursor-pointer"
                style={{
                  color: activeDemo === tab.id ? T.fg : T.muted,
                  borderBottom: `2px solid ${activeDemo === tab.id ? T.accent : "transparent"}`,
                  background: activeDemo === tab.id ? T.surface : "transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Embedded demo */}
          <div
            className="overflow-hidden"
            style={{ border: `1px solid ${T.border}`, background: T.bg }}
          >
            <iframe
              key={activeDemo}
              src={activeDemo === "clerk" ? "/v6/demo?embed=1" : activeDemo === "citizen" ? "/v6/demo/citizen?embed=1" : "/v6/demo/finance?embed=1"}
              className="w-full border-0"
              scrolling="no"
              style={{ height: 780, overflow: "hidden" }}
              title={activeDemo === "clerk" ? "Clerk Workflow Demo" : activeDemo === "citizen" ? "Citizen Requests Demo" : "Finance Demo"}
            />
          </div>
        </div>
      </section>

      {/* Capabilities — Two-column grid with numbers */}
      <section
        id="capabilities"
        className="py-24 sm:py-32 px-6 sm:px-10"
        style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-6xl mx-auto">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
              <div className="lg:col-span-3">
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: T.muted }}>Capabilities</div>
              </div>
              <div className="lg:col-span-9">
                <h2 className="text-3xl sm:text-4xl font-normal" style={{ letterSpacing: "-0.02em" }}>
                  End-to-end municipal operations.
                </h2>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Vertical tabs */}
            <div className="md:col-span-3 flex md:flex-col gap-2">
              {[
                { id: "clerk", label: "Clerk's Office" },
                { id: "public-works", label: "Citizen Requests" },
                { id: "finance", label: "Finance" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="text-left text-sm uppercase tracking-[0.15em] px-4 py-3 transition-all duration-300 cursor-pointer"
                  style={{
                    color: activeTab === tab.id ? T.fg : T.muted,
                    borderLeft: `2px solid ${activeTab === tab.id ? T.accent : "transparent"}`,
                    background: activeTab === tab.id ? T.surface2 : "transparent",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="md:col-span-9">
              {activeTab === "clerk" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                  {[
                    { n: "01", title: "Docket Management", desc: "AI-powered classification and routing of resolutions, ordinances, and departmental submissions." },
                    { n: "02", title: "Agenda Generation", desc: "Build publication-ready meeting agendas. Assign items, set order, export formatted documents." },
                    { n: "03", title: "Meeting Minutes", desc: "Generate draft minutes from agenda items and recordings. Roll call, motions, votes — all formatted." },
                    { n: "04", title: "Ordinance Lifecycle", desc: "Track every ordinance from introduction through adoption. Readings, hearings, publication, effective dates." },
                    { n: "05", title: "Email Intake", desc: "Connect your municipal inbox. Submissions scanned, classified, and routed to your docket." },
                    { n: "06", title: "Completeness Checks", desc: "Flag missing certifications, citations, and documentation before items reach the agenda." },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className="py-8"
                      style={{ borderTop: `1px solid ${T.border}` }}
                    >
                      <div className="flex items-start gap-6">
                        <span className="text-xs pt-1 shrink-0" style={{ color: T.accent }}>{item.n}</span>
                        <div>
                          <h3 className="text-base mb-2">{item.title}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "public-works" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                  {[
                    { n: "01", title: "Work Order Management", desc: "Create, assign, and track work orders across departments. Route requests by type, priority, and location." },
                    { n: "02", title: "Asset Tracking", desc: "Maintain a living inventory of infrastructure — roads, utilities, vehicles, equipment — with maintenance histories." },
                    { n: "03", title: "Citizen Requests", desc: "Intake and triage 311 requests, code complaints, and service calls. Auto-route to the right crew." },
                    { n: "04", title: "Inspection Scheduling", desc: "Coordinate field inspections for permits, code enforcement, and infrastructure. Digital checklists and photo capture." },
                    { n: "05", title: "Fleet & Equipment", desc: "Track vehicle maintenance schedules, fuel usage, and equipment assignments across your public works fleet." },
                    { n: "06", title: "Project Tracking", desc: "Monitor capital improvement projects from planning through completion. Budgets, timelines, and contractor coordination." },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className="py-8"
                      style={{ borderTop: `1px solid ${T.border}` }}
                    >
                      <div className="flex items-start gap-6">
                        <span className="text-xs pt-1 shrink-0" style={{ color: T.accent }}>{item.n}</span>
                        <div>
                          <h3 className="text-base mb-2">{item.title}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "finance" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                  {[
                    { n: "01", title: "Budget Management", desc: "Build, track, and amend municipal budgets across departments. Real-time spending against appropriations." },
                    { n: "02", title: "Accounts Payable", desc: "Process purchase orders, invoices, and vendor payments. Automated approval workflows with audit trails." },
                    { n: "03", title: "Revenue Tracking", desc: "Monitor tax collections, fees, grants, and other revenue streams. Forecast cash flow and flag shortfalls." },
                    { n: "04", title: "Payroll Processing", desc: "Manage municipal payroll, benefits, and deductions. Handle union contracts, overtime, and compliance reporting." },
                    { n: "05", title: "Grant Management", desc: "Track federal and state grants from application through closeout. Monitor spending, match requirements, and reporting deadlines." },
                    { n: "06", title: "Financial Reporting", desc: "Generate GASB-compliant financial statements, audit workpapers, and board-ready budget reports on demand." },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className="py-8"
                      style={{ borderTop: `1px solid ${T.border}` }}
                    >
                      <div className="flex items-start gap-6">
                        <span className="text-xs pt-1 shrink-0" style={{ color: T.accent }}>{item.n}</span>
                        <div>
                          <h3 className="text-base mb-2">{item.title}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mockup for active tab */}
          <div className="mt-16">
            {activeTab === "clerk" && <AgendaMockup />}
            {activeTab === "public-works" && <WorkOrderMockup />}
            {activeTab === "finance" && <BudgetMockup />}
          </div>
        </div>
      </section>


      {/* About */}
      <section id="about" className="py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div ref={aboutRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-3">
              <div className="text-xs uppercase tracking-[0.3em]" style={{ color: T.muted }}>About</div>
            </div>
            <div className="lg:col-span-9">
              <p className="text-2xl sm:text-3xl leading-relaxed mb-8" style={{ letterSpacing: "-0.01em" }}>
                Local government runs on thousands of daily decisions — permits, payments,
                resolutions, public records. The work is essential, but the tools haven&apos;t
                kept up.
              </p>
              <p className="text-base leading-relaxed" style={{ color: T.muted }}>
                Exodia was built alongside municipal teams to replace fragmented, outdated
                workflows with a single platform purpose-built for local government operations.
                Every feature exists because a real department needed it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote - hidden until we have a real testimonial
      <section className="py-20 sm:py-24 px-6 sm:px-10" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-6xl mx-auto">
          <div ref={quoteRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-3">
              <div className="text-xs uppercase tracking-[0.3em]" style={{ color: T.muted }}>Testimonial</div>
            </div>
            <div className="lg:col-span-9">
              <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: 32 }}>
                <p className="text-2xl sm:text-3xl leading-relaxed mb-6" style={{ letterSpacing: "-0.01em" }}>
                  &ldquo;Exodia cut our agenda preparation from two days to two hours.&rdquo;
                </p>
                <div className="text-xs uppercase tracking-[0.2em]" style={{ color: T.muted }}>
                  Municipal Clerk — New Jersey
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* CTA */}
      <section
        id="access"
        className="py-24 sm:py-32 px-6 sm:px-10"
        style={{ background: T.accent }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight" style={{ letterSpacing: "-0.02em", color: T.bg }}>
                Ready to see the difference?
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base mb-8" style={{ color: `${T.bg}cc` }}>
                We&apos;re onboarding municipalities now. Request early access to get started.
              </p>
              <WaitlistForm variant="accent" />
              <p className="text-xs mt-4" style={{ color: `${T.bg}66` }}>
                Free during the early access period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-10" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xl tracking-[0.04em]">Exodia</span>
            <p className="text-xs mt-1" style={{ color: T.muted }}>Municipal infrastructure software.</p>
          </div>
          <div className="text-xs" style={{ color: T.muted }}>&copy; 2026 Exodia, Inc.</div>
        </div>
      </footer>
    </div>
  );
}
