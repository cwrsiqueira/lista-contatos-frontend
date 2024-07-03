"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function ErrorParams() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  if (error && error === "CredentialsSignin") {
    return <div className="text-red-500">Credenciais Inválidas!</div>;
  }
  return <div></div>;
}

export default function LoginForm() {
  const [email, setEmail] = useState("cwrsiqueira@msn.com");
  const [password, setPassword] = useState("carlos_1909");

  async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  }
  return (
    <form
      onSubmit={login}
      className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2"
    >
      <h1 className="font-bold text-xl mb-6">Lista de Contatos</h1>
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        className="input input-primary w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        className="input input-primary w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-full" type="submit">
        Login
      </button>
      <Suspense>
        <ErrorParams />
      </Suspense>
    </form>
  );
}
