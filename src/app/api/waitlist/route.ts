import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  const added = await kv.sadd("waitlist", normalized);

  if (added === 0) {
    return NextResponse.json({ error: "Already on the waitlist." }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const emails = await kv.smembers("waitlist");
  return NextResponse.json({ count: emails.length, emails });
}
