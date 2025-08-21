import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false; // email required

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .execute();

      if (existingUser.length === 0) {
        await db.insert(users).values({
          name: user.name ?? "Anonymous",
          email: user.email,
          profileImage: user.image,
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.email) return token;

      const dbUser = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email))
        .execute();

      if (dbUser.length > 0) {
        token.sub = dbUser[0].id; // attach DB uuid
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
