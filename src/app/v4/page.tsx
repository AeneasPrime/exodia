"use client";

import { useState, useEffect, useRef } from "react";

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

// V4: Refined Editorial — Warm light palette, Berkeley Mono throughout,
// reindustrialization structure meets editorial warmth
const T = {
  bg: "#F7F5F0",
  fg: "#111111",
  muted: "#807B73",
  accent: "#1B4332",
  border: "#DDD8CE",
  surface: "#EDEAE3",
  surface2: "#E3DFD6",
};

function WaitlistForm({ inverted = false }: { inverted?: boolean }) {
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

  if (status === "success") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: inverted ? T.bg : T.accent }} />
        <span className="text-sm" style={{ color: inverted ? T.bg : T.accent }}>{message}</span>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-0">
        <input
          type="email"
          required
          placeholder="you@municipality.gov"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-5 py-4 text-sm focus:outline-none transition-colors"
          style={{
            background: inverted ? "rgba(255,255,255,0.08)" : T.bg,
            border: `1px solid ${inverted ? "rgba(255,255,255,0.2)" : T.border}`,
            borderRight: "none",
            color: inverted ? T.bg : T.fg,
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-4 text-xs uppercase tracking-[0.15em] transition-opacity hover:opacity-70 disabled:opacity-50 cursor-pointer shrink-0"
          style={{
            background: "transparent",
            color: inverted ? T.bg : T.accent,
            border: `1px solid ${inverted ? T.bg : T.accent}`,
            fontFamily: "inherit",
          }}
        >
          {status === "loading" ? "..." : "Request Access"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs mt-2 text-red-600">{message}</p>
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
              { id: "R-2026-087", title: "Award Contract — Road Resurfacing Program", dept: "Engineering", status: "Accepted", color: "#2D6A4F" },
              { id: "R-2026-088", title: "Professional Services — Bond Counsel", dept: "Finance", status: "In Review", color: "#B8860B" },
              { id: "O-2026-012", title: "Amend Ch. 23 — Adopt an Area Program", dept: "Law", status: "New", color: T.accent },
              { id: "R-2026-089", title: "Emergency Water Main Repair Services", dept: "Water/Sewer", status: "Accepted", color: "#2D6A4F" },
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

export default function V4() {
  const [scrolled, setScrolled] = useState(false);
  const aboutRef = useReveal();
  const capRef = useReveal();
  const quoteRef = useReveal();
  const ctaRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: "100vh", fontFamily: '"Berkeley Mono", ui-monospace, monospace' }}>
      {/* Nav */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled ? `${T.bg}ee` : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <span className="text-sm tracking-[0.2em] uppercase" style={{ color: T.fg }}>Exodia</span>
          <div className="hidden md:flex items-center gap-10">
            {["Platform", "Capabilities", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-50"
                style={{ color: T.muted }}
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#access"
            className="text-xs uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-50 flex items-center gap-2"
            style={{ color: T.accent }}
          >
            Request Access
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </a>
        </div>
        <div style={{ height: 1, background: scrolled ? T.border : "transparent", transition: "background 0.3s" }} />
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-end px-6 sm:px-10 pb-24 pt-32">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-7">
              <div
                className="text-xs uppercase tracking-[0.3em] mb-6 opacity-0 animate-fade-in-up"
                style={{ color: T.muted }}
              >
                Municipal Infrastructure Software
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] opacity-0 animate-fade-in-up delay-1"
                style={{ letterSpacing: "-0.02em" }}
              >
                The operating system for the modern municipal clerk.
              </h1>
            </div>
            <div className="lg:col-span-5 opacity-0 animate-fade-in-up delay-2">
              <p className="text-base leading-relaxed mb-8" style={{ color: T.muted }}>
                Exodia replaces the fragmented tools, paper trails, and manual processes
                that define municipal operations today. One platform for dockets,
                agendas, minutes, and ordinances.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <div style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: "80%", label: "Less prep time" },
              { value: "2hrs", label: "Saved per meeting" },
              { value: "1,200+", label: "Items processed" },
              { value: "10+", label: "Municipalities" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="py-10 text-center"
                style={{ borderRight: i < 3 ? `1px solid ${T.border}` : "none" }}
              >
                <div className="text-2xl mb-1" style={{ color: T.fg }}>{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.15em]" style={{ color: T.muted }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform — Mockup */}
      <section id="platform" className="py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-3">
              <div className="text-xs uppercase tracking-[0.3em]" style={{ color: T.muted }}>Platform</div>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-3xl sm:text-4xl font-normal leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Built for the complexity of local government.
              </h2>
            </div>
          </div>
          <ProductMockup />
        </div>
      </section>

      {/* Capabilities — Numbered */}
      <section
        id="capabilities"
        className="py-24 sm:py-32 px-6 sm:px-10"
        style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-6xl mx-auto">
          <div ref={capRef} className="reveal">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
              <div className="lg:col-span-3">
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: T.muted }}>Capabilities</div>
              </div>
              <div className="lg:col-span-9">
                <h2 className="text-3xl sm:text-4xl font-normal" style={{ letterSpacing: "-0.02em" }}>
                  Six systems, one platform.
                </h2>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
            {[
              { n: "01", title: "Docket Management", desc: "AI-powered classification of incoming resolutions, ordinances, and departmental submissions. Every item categorized and routed." },
              { n: "02", title: "Agenda Generation", desc: "Build publication-ready meeting agendas. Assign docket items, set order, export formatted documents." },
              { n: "03", title: "Meeting Minutes", desc: "Generate draft minutes from agenda items and recordings. Proper formatting for roll call, motions, votes." },
              { n: "04", title: "Ordinance Lifecycle", desc: "Track ordinances from introduction through adoption — readings, hearings, publication, effective dates." },
              { n: "05", title: "Email Intake", desc: "Connect your municipal inbox. Submissions are scanned, classified, and routed to your docket automatically." },
              { n: "06", title: "Completeness Checks", desc: "Flag missing CFO certifications, statutory citations, and documentation before items reach the agenda." },
            ].map((item) => (
              <div
                key={item.n}
                className="py-8"
                style={{ borderTop: `1px solid ${T.border}` }}
              >
                <div className="text-xs mb-4" style={{ color: T.muted }}>{item.n}</div>
                <h3 className="text-base mb-2" style={{ color: T.fg }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{item.desc}</p>
              </div>
            ))}
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
                Every resolution, every ordinance, every set of minutes passes through the
                clerk&apos;s office. They are the connective tissue of local democracy — yet they
                still operate on tools designed decades ago.
              </p>
              <p className="text-base leading-relaxed" style={{ color: T.muted }}>
                Exodia was designed with clerks across New Jersey to replace those fragmented
                workflows with a single platform purpose-built for municipal operations.
                Every feature exists because a real clerk needed it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
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

      {/* CTA */}
      <section
        id="access"
        className="py-24 sm:py-32 px-6 sm:px-10"
        style={{ background: T.accent, color: T.bg }}
      >
        <div className="max-w-6xl mx-auto">
          <div ref={ctaRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Ready to modernize your clerk&apos;s office?
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base mb-8" style={{ color: `${T.bg}cc` }}>
                We&apos;re onboarding municipalities now. Request early access to get started.
              </p>
              <WaitlistForm inverted />
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
            <span className="text-sm tracking-[0.2em] uppercase">{`Exodia`}</span>
            <p className="text-xs mt-1" style={{ color: T.muted }}>Municipal infrastructure software.</p>
          </div>
          <div className="text-xs" style={{ color: T.muted }}>&copy; 2026 Exodia, Inc.</div>
        </div>
      </footer>
    </div>
  );
}
