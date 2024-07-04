"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Image from "next/image";
import Logo from "../../public/logo.jpg";

/**
 *  Função/Componente para tratar as mensagens de erro ou sucesso que vem através da URL como parâmetros
 * @returns elemento | componente
 */
function MsgParams() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const success = searchParams.get("success");
  const account_confirmation_success = searchParams.get(
    "account_confirmation_success"
  );

  if (error && error === "CredentialsSignin") {
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Credenciais inválidas.</span>
      </div>
    );
  } else if (success && success === "emailSent") {
    return (
      <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Cadastro efetuado! Favor confirmar seu e-mail.</span>
      </div>
    );
  } else if (account_confirmation_success) {
    return (
      <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Email confirmado, faça o login.</span>
      </div>
    );
  }
  return <div></div>;
}

/**
 * Faz o login através das Providers da biblioteca next-auth usando o método signin que está utilizando a API
 * @returns void
 */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <Image
        src={Logo}
        alt="Landscape picture"
        width={150}
        height={150}
        priority
      />
      <h1 className="font-bold text-xl mb-6">Contact Dragon</h1>
      <h1 className="font-bold text-md mb-1">Login</h1>
      <Suspense>
        <MsgParams />
      </Suspense>
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        className="input input-primary w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        className="input input-primary w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="btn btn-primary w-full" type="submit">
        Login
      </button>
      <div className="flex justify-between w-full">
        <Link href={"/register"}>
          <small>Não tenho cadastro</small>
        </Link>
      </div>
    </form>
  );
}
