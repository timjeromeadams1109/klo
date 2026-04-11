#!/usr/bin/env bun
/**
 * Generates the seed migration SQL from hardcoded vault-data.ts and feed-data.ts.
 * Run: bun run scripts/generate-content-seed.ts
 * Writes to: supabase/migrations/20260410000001_seed_content.sql
 */

import { writeFileSync } from "node:fs";
import { vaultItems } from "../src/lib/vault-data";
import { feedPosts } from "../src/lib/feed-data";

function esc(value: string | undefined | null): string {
  if (value === undefined || value === null) return "NULL";
  return `'${value.replace(/'/g, "''")}'`;
}

function jsonb(obj: Record<string, unknown>): string {
  const json = JSON.stringify(obj).replace(/'/g, "''");
  return `'${json}'::jsonb`;
}

function arr(values: string[]): string {
  if (!values.length) return "ARRAY[]::text[]";
  const escaped = values.map((v) => `'${v.replace(/'/g, "''")}'`).join(",");
  return `ARRAY[${escaped}]::text[]`;
}

const lines: string[] = [];
lines.push("-- ============================================================");
lines.push("-- Seed content: port hardcoded vault + feed data to Supabase");
lines.push("-- Auto-generated from src/lib/vault-data.ts and feed-data.ts");
lines.push("-- ============================================================\n");

// --- Vault items ---
lines.push("-- Vault content");
for (const item of vaultItems) {
  const metadata = {
    legacy_id: item.id,
    level: item.level,
    duration: item.duration,
    thumbnail_gradient: item.thumbnailGradient,
    is_premium: item.isPremium,
    conference_name: item.conferenceName ?? null,
    conference_location: item.conferenceLocation ?? null,
    files: item.files ?? [],
  };

  const tierRequired = item.isPremium ? "professional" : "free";
  const excerpt = item.description.slice(0, 500);
  const publishedAt = item.publishedAt
    ? `'${item.publishedAt}T00:00:00Z'::timestamptz`
    : "now()";

  lines.push(
    `INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  ${esc(item.title)},
  ${esc(item.slug)},
  ${esc(item.type)},
  ${esc(item.category)},
  ${esc(item.description)},
  ${esc(excerpt)},
  ${esc(tierRequired)},
  'published',
  ${esc(item.author)},
  ${publishedAt},
  ${jsonb(metadata)}
) ON CONFLICT (slug) DO NOTHING;`
  );
}

lines.push("\n-- Feed posts");
for (const post of feedPosts) {
  const metadata = {
    legacy_id: post.id,
    category: post.category,
    read_time: post.readTime,
    is_premium: post.isPremium,
  };

  const publishedAt = post.publishedAt
    ? `'${post.publishedAt}T00:00:00Z'::timestamptz`
    : "now()";

  const tags = arr([post.category]);

  lines.push(
    `INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, ${esc(post.title)}, ${esc(post.content)}, 'insight', ${tags}, 'published', ${publishedAt}, ${jsonb(metadata)}
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = ${esc(post.id)}
);`
  );
}

const output = lines.join("\n\n") + "\n";
const outPath = "supabase/migrations/20260410000001_seed_content.sql";
writeFileSync(outPath, output);
console.log(`Wrote ${vaultItems.length} vault items + ${feedPosts.length} feed posts to ${outPath}`);
