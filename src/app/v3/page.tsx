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

// V3 Theme: Stark white, near-zero decoration
const T = {
  bg: "#FFFFFF",
  fg: "#000000",
  muted: "#999999",
  border: "#E5E5E5",
  accent: "#000000",
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
        setMessage("Added to waitlist.");
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
    return <p className="text-sm" style={{ color: inverted ? "#fff" : T.fg }}>{message}</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-0">
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-5 py-4 text-sm focus:outline-none"
          style={{
            background: inverted ? "rgba(255,255,255,0.1)" : T.bg,
            border: `1px solid ${inverted ? "rgba(255,255,255,0.25)" : T.border}`,
            borderRight: "none",
            color: inverted ? "#fff" : T.fg,
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-4 text-sm tracking-[0.1em] uppercase transition-opacity hover:opacity-70 disabled:opacity-50 cursor-pointer shrink-0"
          style={{
            background: inverted ? "#fff" : T.fg,
            color: inverted ? T.fg : T.bg,
            fontFamily: "inherit",
            border: `1px solid ${inverted ? "#fff" : T.fg}`,
          }}
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs mt-2 text-red-500">{message}</p>
      )}
    </div>
  );
}

export default function V3() {
  const [scrolled, setScrolled] = useState(false);
  const thesisRef = useReveal();
  const gridRef = useReveal();
  const ctaRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: "100vh", fontFamily: '"Berkeley Mono", ui-monospace, monospace' }}>
      {/* Nav */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? `${T.bg}ee` : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-xs tracking-[0.25em] uppercase">Exodia</span>
          <a
            href="#waitlist"
            className="text-xs tracking-[0.1em] uppercase transition-opacity hover:opacity-50"
            style={{ color: T.muted }}
          >
            Waitlist
          </a>
        </div>
        <div style={{ height: 1, background: scrolled ? T.border : "transparent", transition: "background 0.3s" }} />
      </nav>

      {/* Hero — Maximally simple */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-14">
        <div className="max-w-5xl mx-auto w-full">
          <h1
            className="text-5xl sm:text-6xl lg:text-8xl font-normal leading-[1.0] mb-12 opacity-0 animate-fade-in-up"
            style={{ letterSpacing: "-0.03em" }}
          >
            The operating system for municipal government.
          </h1>
          <div className="max-w-lg opacity-0 animate-fade-in-up delay-2">
            <p className="text-base leading-relaxed mb-8" style={{ color: T.muted }}>
              Exodia is a platform for municipal clerks to manage dockets, generate agendas,
              draft meeting minutes, and track ordinances through their full lifecycle.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Thesis — One big block */}
      <section className="py-32 sm:py-40 px-6" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-5xl mx-auto">
          <div ref={thesisRef} className="reveal">
            <p
              className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-relaxed max-w-4xl"
              style={{ letterSpacing: "-0.01em" }}
            >
              Every resolution, every ordinance, every set of meeting minutes passes through the
              clerk&apos;s office. They are the connective tissue of local democracy — yet they
              still operate on tools designed decades ago. We&apos;re changing that.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities — Simple grid */}
      <section className="py-24 sm:py-32 px-6" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-5xl mx-auto">
          <div ref={gridRef} className="reveal">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {[
                { title: "Docket Management", desc: "Classify and organize incoming resolutions, ordinances, and departmental submissions automatically." },
                { title: "Agenda Generation", desc: "Build publication-ready meeting agendas. Assign items, set order, export formatted documents." },
                { title: "Meeting Minutes", desc: "Generate draft minutes from agenda items and recordings. Proper formatting for roll call, motions, votes." },
                { title: "Ordinance Tracking", desc: "Track every ordinance from introduction through adoption. Readings, hearings, publication, effective dates." },
                { title: "Email Intake", desc: "Connect your municipal inbox. Submissions are scanned, classified, and routed to your docket." },
                { title: "Completeness Checks", desc: "Flag missing certifications, citations, and documentation before items reach the agenda." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-sm mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Dark block */}
      <section
        id="waitlist"
        className="py-24 sm:py-32 px-6"
        style={{ background: T.fg, color: T.bg }}
      >
        <div className="max-w-5xl mx-auto">
          <div ref={ctaRef} className="reveal">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-8 max-w-3xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Request early access.
            </h2>
            <div className="max-w-lg">
              <WaitlistForm inverted />
              <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                Free during the early access period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] uppercase">Exodia</span>
          <span className="text-xs" style={{ color: T.muted }}>&copy; 2026</span>
        </div>
      </footer>
    </div>
  );
}
