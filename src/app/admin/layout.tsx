import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // DEV-ONLY: Allow unauthenticated access in development for local testing.
  // Production still requires real auth.
  if (process.env.NODE_ENV !== "development") {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;

    if (!session?.user || !["owner", "admin"].includes(role ?? "")) {
      redirect("/auth/signin");
    }
  }

  return <>{children}</>;
}
