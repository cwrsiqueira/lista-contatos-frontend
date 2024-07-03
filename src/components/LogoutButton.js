"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button className="btn btn-outline" onClick={() => signOut()}>
      Sair
    </button>
  );
};

export default LogoutButton;
