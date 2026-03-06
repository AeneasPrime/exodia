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

// --- Waitlist Form ---
function WaitlistForm({ variant = "default" }: { variant?: "default" | "hero" }) {
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
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-sm text-accent">{message}</span>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={`flex gap-3 ${variant === "hero" ? "max-w-lg" : "max-w-md mx-auto"}`}>
        <input
          type="email"
          required
          placeholder="you@municipality.gov"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 bg-transparent border border-border rounded-none font-mono text-sm text-foreground placeholder-muted focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 border border-foreground text-foreground font-mono text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          {status === "loading" ? "..." : "Request Access"}
        </button>
      </form>
      {status === "error" && (
        <p className="font-mono text-xs text-red-400 mt-2">{message}</p>
      )}
    </div>
  );
}

// --- Navbar ---
function Navbar({ theme, onToggleTheme }: { theme: "dark" | "light"; onToggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-background/80 navbar-blur" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-16">
          <span className="font-mono text-sm tracking-[0.2em] uppercase text-foreground">
            Exodia
          </span>
          <div className="hidden md:flex items-center gap-8">
            {["Platform", "Capabilities", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onToggleTheme}
              className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="8" cy="8" r="3.5" />
                  <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M13.5 9.2A5.5 5.5 0 0 1 6.8 2.5 6 6 0 1 0 13.5 9.2z" />
                </svg>
              )}
            </button>
            <a
              href="#access"
              className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors duration-300 flex items-center gap-2"
            >
              Request Access
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 6h8M7 3l3 3-3 3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="rule" />
    </nav>
  );
}

// --- Hero ---
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 sm:px-10 pt-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8 opacity-0 animate-fade-in-up">
            Municipal Infrastructure Software
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-8 opacity-0 animate-fade-in-up delay-1">
            The operating system for the modern municipal clerk.
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mb-12 leading-relaxed opacity-0 animate-fade-in-up delay-2">
            Exodia replaces the fragmented tools, paper trails, and manual processes
            that define municipal operations today. One platform for dockets,
            agendas, minutes, and ordinances.
          </p>
          <div className="opacity-0 animate-fade-in-up delay-3">
            <WaitlistForm variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Metrics bar ---
function MetricsBar() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal border-y border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { value: "80%", label: "Reduction in agenda prep" },
            { value: "2hrs", label: "Average time saved per meeting" },
            { value: "1,200+", label: "Docket items processed" },
            { value: "10+", label: "Municipalities engaged" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 sm:py-12 ${i < 3 ? "border-r border-border" : ""} ${i % 2 === 0 && i < 2 ? "border-r md:border-r" : ""} text-center`}
            >
              <div className="text-2xl sm:text-3xl font-semibold mb-1">{stat.value}</div>
              <div className="font-mono text-xs text-muted uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Platform section ---
function PlatformSection() {
  const ref = useReveal();
  return (
    <section id="platform" className="py-24 sm:py-32 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal mb-20">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">Platform</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
            Built for the complexity of local government.
          </h2>
        </div>
        {/* Product mockup */}
        <ProductMockup />
      </div>
    </section>
  );
}

function ProductMockup() {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal border border-border overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-muted/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-muted/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-muted/30" />
          </div>
          <span className="font-mono text-xs text-muted">Exodia — Docket</span>
        </div>
        <span className="font-mono text-xs text-muted">app.exodia.co</span>
      </div>
      {/* App content */}
      <div className="flex min-h-[380px]">
        {/* Sidebar */}
        <div className="w-48 border-r border-border bg-surface p-5 hidden md:block">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-6">Navigation</div>
          {[
            { name: "Dashboard", active: false },
            { name: "Docket", active: true },
            { name: "Meetings", active: false },
            { name: "Ordinances", active: false },
            { name: "Minutes", active: false },
          ].map((item) => (
            <div
              key={item.name}
              className={`font-mono text-sm py-2 px-3 mb-0.5 ${
                item.active
                  ? "text-foreground bg-surface-2 border-l-2 border-accent"
                  : "text-muted"
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Council Meeting</div>
              <div className="text-lg font-semibold">March 12, 2026</div>
            </div>
            <div className="font-mono text-xs text-muted">8 items</div>
          </div>
          <div className="border-t border-border">
            {[
              { id: "R-2026-087", title: "Award Contract — Road Resurfacing Program", dept: "Engineering", status: "Accepted", statusColor: "text-green-400" },
              { id: "R-2026-088", title: "Professional Services — Bond Counsel", dept: "Finance", status: "In Review", statusColor: "text-amber-400" },
              { id: "O-2026-012", title: "Amend Ch. 23 — Adopt an Area Program", dept: "Law", status: "New", statusColor: "text-accent" },
              { id: "R-2026-089", title: "Emergency Water Main Repair Services", dept: "Water/Sewer", status: "Accepted", statusColor: "text-green-400" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-border">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="font-mono text-xs text-muted shrink-0">{item.id}</span>
                  <span className="text-sm truncate">{item.title}</span>
                </div>
                <div className="flex items-center gap-6 shrink-0 ml-4">
                  <span className="font-mono text-xs text-muted hidden sm:block">{item.dept}</span>
                  <span className={`font-mono text-xs uppercase tracking-wider ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Capabilities ---
const CAPABILITIES = [
  {
    id: "01",
    title: "Docket Management",
    description: "AI-powered classification of incoming resolutions, ordinances, and departmental submissions. Every item is categorized, tagged, and routed before it reaches your desk.",
  },
  {
    id: "02",
    title: "Agenda Generation",
    description: "Build publication-ready meeting agendas in minutes. Assign docket items, set order of business, and export formatted PDFs that meet your municipality's standards.",
  },
  {
    id: "03",
    title: "Meeting Minutes",
    description: "Generate draft minutes from agenda items and meeting recordings. Export to PDF or Word with proper formatting — roll call, motions, votes, all accounted for.",
  },
  {
    id: "04",
    title: "Ordinance Lifecycle",
    description: "Track every ordinance from introduction through adoption. Monitor first and second readings, public hearing dates, publication requirements, and effective dates.",
  },
  {
    id: "05",
    title: "Email Intake",
    description: "Connect your municipal inbox. Exodia scans, classifies, and routes incoming submissions to your docket automatically — no manual forwarding or sorting.",
  },
  {
    id: "06",
    title: "Completeness Verification",
    description: "Automated checks for CFO certifications, attorney reviews, statutory citations, and documentation requirements before items reach the agenda.",
  },
];

function CapabilitiesSection() {
  const ref = useReveal();
  return (
    <section id="capabilities" className="py-24 sm:py-32 px-6 sm:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal mb-20">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">Capabilities</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
            End-to-end municipal operations.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {CAPABILITIES.map((cap) => (
            <CapabilityCard key={cap.id} {...cap} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ id, title, description }: { id: string; title: string; description: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal bg-background p-8 sm:p-10 group hover:bg-surface transition-colors duration-500">
      <div className="font-mono text-xs text-muted mb-6">{id}</div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-500">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}

// --- About / Thesis ---
function AboutSection() {
  const ref = useReveal();
  const quoteRef = useReveal();
  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal max-w-3xl mb-20">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">About</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-8">
            Municipal clerks are the backbone of local democracy.
          </h2>
          <p className="text-lg text-muted leading-relaxed mb-6">
            They manage every resolution, ordinance, and official record that keeps a municipality running.
            Yet they operate on tools built for a different era — shared drives, email chains, paper binders,
            and institutional memory.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            Exodia was designed in partnership with clerks across New Jersey to replace those
            fragmented workflows with a single, purpose-built platform. Every feature exists because
            a real clerk needed it.
          </p>
        </div>
        <div ref={quoteRef} className="reveal border-l border-accent pl-8 max-w-2xl">
          <p className="text-xl sm:text-2xl leading-relaxed mb-4">
            &ldquo;Exodia cut our agenda preparation from two days to two hours.&rdquo;
          </p>
          <div className="font-mono text-xs text-muted uppercase tracking-widest">
            Municipal Clerk — New Jersey
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Bottom CTA ---
function CTASection() {
  const ref = useReveal();
  return (
    <section id="access" className="py-24 sm:py-32 px-6 sm:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">Early Access</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Modernize your clerk&apos;s office.
          </h2>
          <p className="text-lg text-muted leading-relaxed mb-10">
            We&apos;re onboarding municipalities now. Request early access to get started.
          </p>
          <WaitlistForm />
          <p className="font-mono text-xs text-muted mt-4">
            No credit card required. Free during early access period.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-mono text-sm tracking-[0.2em] uppercase">Exodia</span>
            <p className="font-mono text-xs text-muted mt-2">Municipal infrastructure software.</p>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            {["Platform", "Capabilities", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
            <a href="#" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors" aria-label="Twitter">
              X
            </a>
            <a href="#" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors" aria-label="LinkedIn">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="rule my-8" />
        <div className="font-mono text-xs text-muted">
          &copy; 2026 Exodia, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// --- Main ---
export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <HeroSection />
      <MetricsBar />
      <PlatformSection />
      <CapabilitiesSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
}
