#!/usr/bin/env node
// KLO — First Campaign ("A note from Keith.")
//
// Fired by LaunchAgent com.maven.klo-campaign-first-send at 07:00 PT on
// 2026-04-21. Sends the email to every profile with an email address,
// writes a row to notifications_sent, and self-disables the LaunchAgent
// so it can never fire twice.
//
// Idempotency guard: refuses to send if a notifications_sent row with
// this exact title already exists in the last 24h.
//
// Env required (loaded from ~/.config/klo-campaign.env by the LaunchAgent):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   RESEND_API_KEY
//   NEXT_PUBLIC_APP_URL

import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { homedir } from "node:os";
import { join } from "node:path";

// ---- Campaign payload (exactly what Tim approved) -----------------
const CAMPAIGN = {
  title: "A note from Keith.",
  body: "Thank you for signing up. This is where the work happens — assessments to see clearly, strategy rooms to think out loud, a vault of everything I've learned. Let's get to it.",
  url: "/",
  tag: "campaign-first-note",
  audience_type: "broadcast",
};
const FROM_ADDRESS = "KLO Advisory <notifications@keithlodom.ai>";
const CAMPAIGN_ID = "2026-04-21_first_note_from_keith";
const LOG_DIR = join(homedir(), "logs", "klo-campaigns");
const LOCK_FILE = join(homedir(), ".config", `klo-campaign-${CAMPAIGN_ID}.done`);

const DRY_RUN = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");

// ---- Env loader (supports ~/.config/klo-campaign.env fallback) ----
function loadEnvFileIfMissing() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.RESEND_API_KEY) return;
  const envPath = join(homedir(), ".config", "klo-campaign.env");
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    const val = m[2].replace(/^"(.*)"$/, "$1");
    if (!process.env[m[1]]) process.env[m[1]] = val;
  }
}
loadEnvFileIfMissing();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_KEY = process.env.RESEND_API_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://klo-app.vercel.app";

for (const [k, v] of Object.entries({
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: SERVICE_KEY,
  RESEND_API_KEY: RESEND_KEY,
})) {
  if (!v) {
    console.error(`FATAL: ${k} is not set`);
    process.exit(2);
  }
}

const logs = [];
function log(msg) {
  const stamped = `[${new Date().toISOString()}] ${msg}`;
  console.log(stamped);
  logs.push(stamped);
}

async function sb(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${init.method || "GET"} ${path} → ${res.status} ${text}`);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHtml(title, body, url) {
  const ctaUrl = url
    ? url.startsWith("http")
      ? url
      : `${APP_URL}${url.startsWith("/") ? url : `/${url}`}`
    : null;
  const ctaBlock = ctaUrl
    ? `<a href="${escapeHtml(ctaUrl)}" style="display:inline-block;margin-top:20px;background:#C9A84C;color:#0B0F1A;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Open KLO</a>`
    : "";
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0B0F1A;padding:32px;border-radius:12px;color:#fff;">
      <h1 style="color:#C9A84C;font-size:22px;margin:0 0 12px;">${escapeHtml(title)}</h1>
      <p style="font-size:15px;line-height:1.6;color:#e5e5e5;white-space:pre-line;">${escapeHtml(body)}</p>
      ${ctaBlock}
      <hr style="border:none;border-top:1px solid #222;margin:28px 0 16px;" />
      <p style="font-size:12px;color:#888;">KLO Advisory · Keith L. Odom</p>
    </div>
  `;
}

async function sendEmail(to) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to,
      subject: CAMPAIGN.title,
      html: buildHtml(CAMPAIGN.title, CAMPAIGN.body, CAMPAIGN.url),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
  return res.json();
}

async function alreadySentGuard() {
  if (FORCE) {
    log("FORCE flag set — skipping lock/DB guards.");
    return;
  }
  if (existsSync(LOCK_FILE)) {
    throw new Error(`Lock file present (${LOCK_FILE}) — campaign already ran.`);
  }
  const escTitle = encodeURIComponent(CAMPAIGN.title);
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const rows = await sb(
    `/rest/v1/notifications_sent?select=id,created_at,email_sent&title=eq.${escTitle}&created_at=gte.${encodeURIComponent(since)}`,
  );
  // Only block if a prior attempt actually delivered. Rows with email_sent=0
  // are failed attempts and should not prevent a retry.
  const delivered = (rows ?? []).filter((r) => (r.email_sent ?? 0) > 0);
  if (delivered.length > 0) {
    throw new Error(
      `DB guard: ${delivered.length} prior successful send(s) with title="${CAMPAIGN.title}" in last 24h.`,
    );
  }
  if ((rows ?? []).length > 0) {
    log(`DB guard: ${rows.length} prior FAILED attempt(s) — allowing retry.`);
  }
}

// Exclude internal test + role accounts so Keith's "note" only lands in
// real signup inboxes. Add patterns here if future admin domains appear.
const EXCLUDE_SUFFIXES = ["@example.com", "@test.com", "@keithlodom.io"];

function isRealSignup(email) {
  const lower = email.toLowerCase();
  return !EXCLUDE_SUFFIXES.some((s) => lower.endsWith(s));
}

async function getAudience() {
  const rows = await sb(`/rest/v1/profiles?select=id,email,full_name&email=not.is.null`);
  const emailed = rows.filter((r) => !!r.email && isRealSignup(r.email));
  const skipped = rows.filter((r) => !!r.email && !isRealSignup(r.email));
  log(`Audience filter: kept=${emailed.length} skipped=${skipped.length} (test/admin accounts).`);
  for (const s of skipped) log(`  skip → ${s.email}`);
  return emailed;
}

async function writeAuditRow(counts, targetIds) {
  await sb(`/rest/v1/notifications_sent`, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      sent_by: null,
      title: CAMPAIGN.title,
      body: CAMPAIGN.body,
      url: CAMPAIGN.url,
      tag: CAMPAIGN.tag,
      audience_type: CAMPAIGN.audience_type,
      target_user_ids: null,
      total_targets: targetIds.length,
      push_sent: 0,
      push_failed: 0,
      push_cleaned: 0,
      email_sent: counts.sent,
      email_failed: counts.failed,
    }),
  });
}

function selfDisableLaunchAgent() {
  try {
    const label = "com.maven.klo-campaign-first-send";
    const uid = execSync("id -u", { encoding: "utf8" }).trim();
    execSync(`launchctl bootout gui/${uid}/${label} 2>/dev/null || true`);
    log(`LaunchAgent ${label} booted out.`);
  } catch (err) {
    log(`LaunchAgent self-disable non-fatal error: ${err.message}`);
  }
}

function writeLogs(status) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const path = join(LOG_DIR, `${CAMPAIGN_ID}_${stamp}_${status}.log`);
  try {
    writeFileSync(path, logs.join("\n") + "\n");
    console.log(`Log → ${path}`);
  } catch (err) {
    console.error(`Could not write log: ${err.message}`);
  }
}

async function main() {
  log(`Starting campaign ${CAMPAIGN_ID} (dry-run=${DRY_RUN})`);
  log(`Supabase: ${SUPABASE_URL}`);

  await alreadySentGuard();
  log("Idempotency guard passed.");

  const audience = await getAudience();
  log(`Audience: ${audience.length} profiles with email.`);

  if (DRY_RUN) {
    log("Dry-run — skipping send.");
    for (const p of audience.slice(0, 5)) log(`  would send → ${p.email}`);
    log("...");
    writeLogs("dryrun");
    return;
  }

  let sent = 0;
  let failed = 0;
  for (const p of audience) {
    try {
      const result = await sendEmail(p.email);
      sent++;
      log(`OK  ${p.email} id=${result?.id ?? "?"}`);
    } catch (err) {
      failed++;
      log(`ERR ${p.email} ${err.message}`);
    }
  }
  log(`Sends complete: sent=${sent} failed=${failed}`);

  await writeAuditRow({ sent, failed }, audience.map((a) => a.id));
  log("Audit row written to notifications_sent.");

  writeFileSync(LOCK_FILE, `${new Date().toISOString()}\nsent=${sent} failed=${failed}\n`, {
    mode: 0o600,
  });
  log(`Lock file written → ${LOCK_FILE}`);

  selfDisableLaunchAgent();
  writeLogs(failed === 0 ? "success" : "partial");
}

main().catch((err) => {
  log(`FATAL: ${err.stack || err.message}`);
  writeLogs("error");
  process.exit(1);
});
