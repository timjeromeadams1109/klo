import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Verifies the current session has admin/owner role. In development
 * mode (localhost only) returns a fake owner session so API routes can
 * be exercised by automated tooling (function-audit, Playwright, etc.)
 * without a real login. Production always requires a real NextAuth
 * session with role ∈ {owner, admin}.
 *
 * Mirrors verifyCreativeStudioAdmin for API routes that don't live
 * under the Creative Studio surface but still need admin protection
 * and the same dev ergonomics.
 */
export async function verifyAdmin() {
  if (process.env.NODE_ENV === "development") {
    return {
      user: {
        id: "dev-owner",
        email: "dev@local",
        name: "Dev Owner",
        role: "owner",
      },
    } as const;
  }

  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const role = (session.user as { role?: string }).role;
  if (!["owner", "admin"].includes(role ?? "")) return null;
  return session;
}
