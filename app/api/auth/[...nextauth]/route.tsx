import { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: { params: { prompt: "login" } }
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If the logout URL is set, redirect to it on logout
      if (url === "/api/auth/signout") {
        return `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?redirect_uri=${baseUrl}`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };