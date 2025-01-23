import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "../../../functions/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorizing user:", credentials.username); // Log authorization attempt
        const user = await verifyUser(
          credentials.username,
          credentials.password
        );
        if (user) {
          console.log("User authorized:", user); // Log successful authorization
          return user;
        } else {
          console.log("Authorization failed"); // Log failed authorization
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      // Add user role to session
      session.user.role = token.role;
      console.log("Session callback:", session); // Log session callback
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Add user role to token
        token.role = user.role;
      }
      console.log("JWT callback:", token); // Log JWT callback
      return token;
    },
  },
  debug: true,
});
