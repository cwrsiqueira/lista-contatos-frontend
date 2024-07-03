"use client";

import { useEffect, useState } from "react";
import { fetchClient } from "../libs/fetchClient";

export default function ClientContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchClient("http://localhost:3001/api/contacts").then(
      async (response) =>
        response.status === 200 && setContacts(await response.json())
    );
  }, []);

  return (
    <div>
      <ul>
        {contacts.map((value, index) => (
          <li key={index}>{value.user.email}</li>
        ))}
      </ul>
    </div>
  );
}
