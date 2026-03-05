import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServiceSupabase } from "@/lib/supabase";

// Owner account — Keith Odom (full unlimited access)
const OWNER_EMAIL = "keith@keithlodom.io";
const OWNER_ID = "00000000-0000-0000-0000-000000000001";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    // Owner login — Keith Odom
    CredentialsProvider({
      id: "owner-login",
      name: "Owner Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const ownerPassword = process.env.OWNER_PASSWORD;
        if (!ownerPassword) return null;

        if (
          credentials?.email === OWNER_EMAIL &&
          credentials?.password === ownerPassword
        ) {
          return {
            id: OWNER_ID,
            name: "Keith L. Odom",
            email: OWNER_EMAIL,
          };
        }
        return null;
      },
    }),

    // Dev-only credential login (bypasses OAuth)
    CredentialsProvider({
      id: "dev-admin",
      name: "Dev Admin",
      credentials: {},
      async authorize() {
        return {
          id: "36af99e8-9207-4393-b63f-122d11ed26aa",
          name: "Keith (Dev)",
          email: "admin@klo.dev",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID ?? "",
      clientSecret: process.env.APPLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.subscriptionTier = "free";
        token.role = "user";
      }

      // Owner bypass — Keith Odom gets unlimited access
      if (token.email === OWNER_EMAIL) {
        token.role = "admin";
        token.subscriptionTier = "executive";
        return token;
      }

      // Dev admin bypass
      if (token.email === "admin@klo.dev") {
        token.role = "admin";
        token.subscriptionTier = "executive";
        return token;
      }

      // Refresh role from DB on every token refresh (cached in JWT)
      if (token.id) {
        try {
          const supabase = getServiceSupabase();
          const { data: profile } = await supabase
            .from("profiles")
            .select("subscription_tier, role")
            .eq("id", token.id)
            .single();

          if (profile) {
            token.subscriptionTier = profile.subscription_tier ?? "free";
            token.role = profile.role ?? "user";
          }
        } catch {
          // If DB query fails, keep existing token values
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { subscriptionTier?: string }).subscriptionTier =
          token.subscriptionTier as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
};
