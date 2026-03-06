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

// --- V2 Theme: Warm / Editorial ---
// Cream bg, deep forest green accent, editorial feel

const T = {
  bg: "#F5F2EB",
  fg: "#1A1A1A",
  muted: "#8C8577",
  accent: "#1B4332",
  border: "#DDD8CE",
  surface: "#EDE9E0",
};

function WaitlistForm() {
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
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return <p className="text-sm" style={{ color: T.accent }}>{message}</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
        <input
          type="email"
          required
          placeholder="you@municipality.gov"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3.5 text-sm rounded-none focus:outline-none transition-colors"
          style={{
            background: T.bg,
            border: `1px solid ${T.border}`,
            color: T.fg,
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-3.5 text-sm uppercase tracking-[0.15em] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          style={{
            background: T.accent,
            color: T.bg,
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

export default function V2() {
  const [scrolled, setScrolled] = useState(false);
  const capRef = useReveal();
  const aboutRef = useReveal();
  const quoteRef = useReveal();
  const ctaRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: "100vh", fontFamily: '"Berkeley Mono", ui-monospace, monospace' }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled ? `${T.bg}ee` : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <span className="text-sm tracking-[0.2em] uppercase" style={{ color: T.fg }}>Exodia</span>
          <div className="hidden md:flex items-center gap-10">
            {["About", "Platform", "Access"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.15em] transition-colors duration-300"
                style={{ color: T.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.fg)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero — Editorial / Asymmetric */}
      <section className="min-h-screen flex items-end px-6 sm:px-10 pb-20 pt-32">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div
                className="text-xs uppercase tracking-[0.3em] mb-6 opacity-0 animate-fade-in-up"
                style={{ color: T.muted }}
              >
                Est. 2026 — New Jersey
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] mb-8 opacity-0 animate-fade-in-up delay-1" style={{ letterSpacing: "-0.02em" }}>
                We build software for the people who run your town.
              </h1>
            </div>
            <div className="lg:col-span-4 opacity-0 animate-fade-in-up delay-2">
              <p className="text-base leading-relaxed mb-8" style={{ color: T.muted }}>
                Municipal clerks process every resolution, ordinance, and official
                record in local government. Exodia gives them modern tools to do it.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div style={{ height: 1, background: T.border }} />
      </div>

      {/* About — Big statement */}
      <section id="about" className="py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div ref={aboutRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-3">
              <div className="text-xs uppercase tracking-[0.3em]" style={{ color: T.muted }}>About</div>
            </div>
            <div className="lg:col-span-9">
              <p className="text-2xl sm:text-3xl leading-relaxed mb-8" style={{ letterSpacing: "-0.01em" }}>
                Every meeting agenda, every ordinance, every set of minutes — they all pass through
                the clerk&apos;s office. Yet clerks still rely on shared drives, email threads, and paper binders.
              </p>
              <p className="text-base leading-relaxed" style={{ color: T.muted }}>
                Exodia was designed with clerks across New Jersey to replace those fragmented workflows
                with a single platform purpose-built for municipal operations. Docket management. Agenda
                generation. Meeting minutes. Ordinance tracking. Everything a clerk touches, unified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities — Numbered list */}
      <section id="platform" className="py-24 sm:py-32 px-6 sm:px-10" style={{ background: T.surface }}>
        <div className="max-w-6xl mx-auto">
          <div ref={capRef} className="reveal">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
              <div className="lg:col-span-3">
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: T.muted }}>Platform</div>
              </div>
              <div className="lg:col-span-9">
                <h2 className="text-3xl sm:text-4xl font-normal" style={{ letterSpacing: "-0.02em" }}>
                  Six systems. One platform.
                </h2>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-start-4 lg:col-span-9">
              {[
                { n: "01", title: "Docket Management", desc: "AI-powered classification of incoming resolutions, ordinances, and departmental submissions." },
                { n: "02", title: "Agenda Generation", desc: "Build publication-ready meeting agendas. Assign docket items, set order, export formatted PDFs." },
                { n: "03", title: "Meeting Minutes", desc: "Generate draft minutes from agenda items and meeting recordings. Export to PDF or Word." },
                { n: "04", title: "Ordinance Lifecycle", desc: "Track ordinances from introduction through adoption — readings, hearings, publication, effective dates." },
                { n: "05", title: "Email Intake", desc: "Connect your municipal inbox. Incoming submissions are scanned, classified, and routed automatically." },
                { n: "06", title: "Completeness Checks", desc: "Flag missing CFO certifications, statutory citations, and documentation before items reach the agenda." },
              ].map((item) => (
                <div
                  key={item.n}
                  className="py-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
                  style={{ borderTop: `1px solid ${T.border}` }}
                >
                  <span className="text-xs shrink-0 pt-1" style={{ color: T.muted }}>{item.n}</span>
                  <div>
                    <h3 className="text-lg font-normal mb-1">{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div ref={quoteRef} className="reveal max-w-3xl mx-auto text-center">
            <p className="text-2xl sm:text-3xl lg:text-4xl leading-relaxed mb-8" style={{ letterSpacing: "-0.01em" }}>
              &ldquo;Exodia cut our agenda preparation from two days to two hours.&rdquo;
            </p>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: T.muted }}>
              Municipal Clerk — New Jersey
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="grid grid-cols-2 md:grid-cols-4 py-12">
          {[
            { value: "80%", label: "Less prep time" },
            { value: "2hrs", label: "Saved per meeting" },
            { value: "1,200+", label: "Items processed" },
            { value: "10+", label: "Municipalities" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="text-center py-4"
              style={{ borderRight: i < 3 ? `1px solid ${T.border}` : "none" }}
            >
              <div className="text-2xl font-normal mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.15em]" style={{ color: T.muted }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section id="access" className="py-24 sm:py-32 px-6 sm:px-10" style={{ background: T.accent, color: T.bg }}>
        <div className="max-w-6xl mx-auto">
          <div ref={ctaRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Ready to modernize your clerk&apos;s office?
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base mb-8" style={{ color: `${T.bg}bb` }}>
                We&apos;re onboarding municipalities now. Request early access to get started.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  placeholder="you@municipality.gov"
                  className="flex-1 px-4 py-3.5 text-sm rounded-none focus:outline-none"
                  style={{
                    background: "transparent",
                    border: `1px solid ${T.bg}44`,
                    color: T.bg,
                    fontFamily: "inherit",
                  }}
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 text-sm uppercase tracking-[0.15em] transition-opacity hover:opacity-80 cursor-pointer"
                  style={{
                    background: T.bg,
                    color: T.accent,
                    fontFamily: "inherit",
                  }}
                >
                  Get Access
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-10" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-sm tracking-[0.2em] uppercase">Exodia</span>
            <p className="text-xs mt-1" style={{ color: T.muted }}>Municipal infrastructure software.</p>
          </div>
          <div className="text-xs" style={{ color: T.muted }}>
            &copy; 2026 Exodia, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
