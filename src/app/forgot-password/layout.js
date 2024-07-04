"use client";

import { SessionProvider } from "next-auth/react";
import NavBar from "../../components/NavBar";

const layout = ({ children }) => {
  return (
    <SessionProvider>
      <div>
        <NavBar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default layout;
