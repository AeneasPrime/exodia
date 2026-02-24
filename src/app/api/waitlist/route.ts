import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  const added = await redis.sadd("waitlist", normalized);

  if (added === 0) {
    return NextResponse.json({ error: "Already on the waitlist." }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const emails = await redis.smembers("waitlist");
  return NextResponse.json({ count: emails.length, emails });
}
