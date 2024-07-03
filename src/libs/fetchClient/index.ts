"use client";

import { getCookie } from "cookies-next";
import { signOut } from "next-auth/react";

export const fetchClient = async (
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<Response> => {
  const access_token = getCookie("access-token");
  const client = getCookie("client");
  const uid = getCookie("uid");

  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      "access-token": access_token,
      client: client,
      uid: uid,
    },
  });

  if (response.status === 401) {
    await signOut();
  }

  return response;
};
