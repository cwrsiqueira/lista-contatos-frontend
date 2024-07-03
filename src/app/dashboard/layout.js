"use client";

import { SessionProvider } from "next-auth/react";

const layout = ({ children }) => {
  return (
    <SessionProvider>
      <div>{children}</div>
    </SessionProvider>
  );
};

export default layout;
