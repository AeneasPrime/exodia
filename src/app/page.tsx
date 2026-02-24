"use client";

import { useState } from "react";

export default function Home() {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <main className="text-center max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-light tracking-wide uppercase text-black mb-6" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "0.2em" }}>
          Coming Soon
        </h1>

        <p className="text-xl text-neutral-500 mb-14">
          The operating system for the modern municipal clerk.
        </p>

        {status === "success" ? (
          <p className="text-emerald-600 text-sm font-medium">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Join Waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-500 text-sm mt-3">{message}</p>
        )}
      </main>
    </div>
  );
}
