"use client";

import { useEffect, useState } from "react";
import { fetchClient } from "../libs/fetchClient";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function MsgParams() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const success = searchParams.get("success");

  if (error && error === "wrongPassword") {
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
        <span>Senha inválida.</span>
      </div>
    );
  } else if (success && success === "contactAdded") {
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
        <span>Contato adicionado com sucesso!.</span>
      </div>
    );
  }

  return <div></div>;
}

export default function ClientContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = () => {
    fetchClient("http://localhost:3001/api/contacts").then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        setContacts(data);
      }
    });
  };

  const handleDelete = (id) => {
    if (confirm("Confirma a exclusão do contato?")) {
      fetchClient(`http://localhost:3001/api/contacts/${id}`, {
        method: "DELETE",
      }).then(async (response) => {
        if (response.status === 204) handleFetchData();
      });
    }
  };

  return (
    <div>
      <MsgParams />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((value, index) => (
              <tr key={index}>
                <th>{value.id}</th>
                <th>{value.name}</th>
                <th>{value.telephone}</th>
                <th>
                  <Link href={`/contacts/edit/${value.id}`}>Editar</Link> |{" "}
                  <button onClick={() => handleDelete(value.id)}>
                    Excluir
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
