import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Verifies the current session has admin/owner role.
 * In development mode, returns a fake owner session so the Creative Studio
 * can be tested without logging in. Production always requires real auth.
 */
export async function verifyCreativeStudioAdmin() {
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
