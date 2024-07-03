"use client";

import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session, status } = useSession();

  const handleInitials = () => {
    const first = session?.user?.name.substring(0, 1).toLocaleUpperCase();
    const second = session?.user?.name.split(" ")[1];
    if (second) {
      const second = session?.user?.name
        .split(" ")[1]
        .substring(0, 1)
        .toLocaleUpperCase();

      return first + second;
    }

    return first;
  };

  return (
    <div className="navbar bg-slate-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Lista de Contatos</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
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
            <li>
              <a className="justify-between">Perfil</a>
            </li>
            <li>
              <a onClick={() => signOut()}>Sair</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
