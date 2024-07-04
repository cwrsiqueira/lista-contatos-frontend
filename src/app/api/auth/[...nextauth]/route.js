import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: "/",
  },
  /**
   * Provider de autenticação com email e senha da biblioteca next-auth
   */
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

        /**
         * Faz a autenticação com a API própria API_Contatos
         */
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
          const headerData = response.headers;
          const bodyData = await response.json();

          /**
           * Credenciais de acesso à API: access-token, client e uid
           * Salvos em cookies para utilização durante a utilização do sistema
           */
          if (
            !headerData.get("access-token") ||
            !headerData.get("client") ||
            !headerData.get("uid")
          )
            return null;
          cookies().set("access-token", headerData.get("access-token"));
          cookies().set("client", headerData.get("client"));
          cookies().set("uid", headerData.get("uid"));
          return {
            name: bodyData.data.name,
            email: credentials.email,
            image: bodyData.data.image,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
