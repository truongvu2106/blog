import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/route";
import { AuthService } from "@/services/auth";

export const authOptions = {
  debug: true, // Enable debug logs
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await AuthService.login(credentials);
          return user;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
    GoogleProvider({
      clientId: ENV.googleClientId!,
      clientSecret: ENV.googleClientSecret!,
    }),
    GitHubProvider({
      clientId: ENV.githubClientId!,
      clientSecret: ENV.githubClientSecret!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      console.log("token", token);
      return token;
    },
    async session({ session, token }) {
      console.log("session", session);
      session.user = token.user;
      return session;
    },
  },
  secret: ENV.nextauthSecret!,
  session: { strategy: "jwt" },
  pages: {
    signIn: ROUTES.LOGIN,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
