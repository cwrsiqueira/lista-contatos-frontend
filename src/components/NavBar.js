"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "../../public/logo.jpg";
import { fetchClient } from "../libs/fetchClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleInitials = () => {
    if (!session?.user?.email) {
      return "CD";
    }
    const first = session?.user?.email.substring(0, 1).toLocaleUpperCase();

    return first;
  };

  const handleDeleteAccount = () => {
    if (confirm("Confirma a exclusão da sua conta e todos os seus contatos?")) {
      const data = {
        current_password: password,
        password: password,
        password_confirmation: password,
      };
      fetchClient(`http://localhost:3001/api/auth`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then(async (response) => {
        if (response.status === 200) {
          fetchClient(`http://localhost:3001/api/auth`, {
            method: "DELETE",
          }).then(async (response) => response.status === 200 && signOut());
        } else {
          router.push("/dashboard?error=wrongPassword");
        }
      });
    }
  };

  const handleSignout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Atenção!</h3>
          <p className="py-4">
            Digite sua senha para excluir definitivamente a conta e todos os
            seus contatos!
          </p>
          <input
            name="password"
            type="password"
            placeholder="Digite a senha da conta"
            className="input input-primary w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-3">
                <button className="btn btn-info">Cancelar</button>
                <button
                  onClick={() => handleDeleteAccount()}
                  className="btn btn-error"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <div className="navbar bg-slate-100">
        <div className="flex-1">
          <Link href="/dashboard" className="btn btn-ghost text-xl">
            <Image src={Logo} alt="Landscape picture" width={45} height={45} />
            Contact Dragon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control"></div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {session?.user?.image && (
                  <Image
                    alt="user image"
                    src={session?.user?.image}
                    width={"100"}
                    height={"100"}
                  />
                )}
                {!session?.user?.image && (
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full">
                      <span className="text-xs">{handleInitials()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="text-slate-500 mb-4">{session?.user?.email}</li>
              <li>
                <a
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Excluir conta
                </a>
              </li>
              <li>
                <a onClick={() => handleSignout()}>Sair</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
