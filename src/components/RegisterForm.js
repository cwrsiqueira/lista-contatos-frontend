"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Image from "next/image";
import Logo from "../../public/logo.jpg";

/**
 * Função verifica as mensagens na URL e retorna um elemento com a respectiva mensagem
 * @returns elemento | componente
 */
function MsgParams() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const success = searchParams.get("success");
  const msg = searchParams.get("msg");

  if (error && error === "matchPassword") {
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
        <span>Os e-mails devem ser iguais.</span>
      </div>
    );
  } else if (error && error === "blankfields") {
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
        <span>Todos os campos devem ser preechidos.</span>
      </div>
    );
  } else if (error && error === "unknown") {
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
        <span>{msg}</span>
      </div>
    );
  }

  return <div></div>;
}

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const router = useRouter();

  /**
   * Função recebe os dados do formulário, faz as validações e faz uma chamada na API que registra o usuário.
   * Se der certo direciona para página de login com a mensagem de sucesso, caso contrário mantém na mesma página
   * com uma mensagem de erro.
   * @param {evento} e
   * @returns void | null
   */
  async function register(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
    };

    if (
      data.name == "" ||
      data.email == "" ||
      data.password == "" ||
      data.password_confirmation == ""
    ) {
      router.push("/register?error=blankfields");
      return null;
    }

    if (data.password !== data.password_confirmation) {
      router.push("/register?error=matchPassword");
      return null;
    }

    const response = await fetch("http://localhost:3001/api/auth", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 200) {
      const res = await response.json();
      console.log(res.errors.full_messages[0]);
      router.push(`/register?error=unknown&msg=${res.errors.full_messages[0]}`);
      return null;
    }

    router.push("/?success=emailSent");
  }

  return (
    <form
      onSubmit={register}
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
      <h1 className="font-bold text-md mb-1">Cadastro</h1>
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
      <input
        name="password_confirmation"
        type="password"
        placeholder="Confirmar Senha"
        className="input input-primary w-full"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
      />
      <button className="btn btn-primary w-full" type="submit">
        Cadastro
      </button>
      <div className="flex justify-between w-full">
        <Link href={"/"}>
          <small>Eu já tenho cadastro</small>
        </Link>
      </div>
    </form>
  );
}
