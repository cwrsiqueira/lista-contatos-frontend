import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await fetch(
            "http://localhost:3001/api/auth/sign_in",
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response.status !== 200) return null;
          const authData = response.headers;

          if (
            !authData.get("access-token") ||
            !authData.get("client") ||
            !authData.get("uid")
          )
            return null;
          cookies().set("access-token", authData.get("access-token"));
          cookies().set("client", authData.get("client"));
          cookies().set("uid", authData.get("uid"));
          return {
            email: credentials.email,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
