import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import FortyTwoProvider from "next-auth/providers/42-school";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '0',
      clientSecret: process.env.GITHUB_SECRET || '0'
    }),
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID || '0',
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET || '0',
    })
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
