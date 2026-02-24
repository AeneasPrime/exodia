import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), "waitlist.json");

function getEmails(): string[] {
  try {
    return JSON.parse(fs.readFileSync(WAITLIST_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  const emails = getEmails();

  if (emails.includes(normalized)) {
    return NextResponse.json({ error: "Already on the waitlist." }, { status: 409 });
  }

  emails.push(normalized);
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(emails, null, 2));

  return NextResponse.json({ ok: true, count: emails.length });
}

export async function GET() {
  const emails = getEmails();
  return NextResponse.json({ count: emails.length, emails });
}
