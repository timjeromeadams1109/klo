import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    CredentialsProvider({
      name: "Demo Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo mode: accept any email with password "demo123"
        if (!credentials?.email || !credentials?.password) return null;

        if (credentials.password === "demo123") {
          return {
            id: "demo-user-1",
            name: credentials.email.split("@")[0],
            email: credentials.email,
            image: null,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Default subscription tier for new users
        token.subscriptionTier = "free";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { subscriptionTier?: string }).subscriptionTier =
          token.subscriptionTier as string;
      }
      return session;
    },
  },
};
