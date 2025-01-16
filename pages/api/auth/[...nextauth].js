import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  database: process.env.DATABASE_URL,

  callbacks: {
    async session(session, user) {
      session.id = user.id;
      return session;
    },
  },
});
