"use client";

import { useEffect, useState } from "react";
import { fetchClient } from "../libs/fetchClient";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IMaskInput } from "react-imask";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

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
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleFetchData = () => {
    fetchClient("http://localhost:3001/api/contacts").then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        setContacts(data);
        setFilteredContacts(data);
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

  const mapaAcentos = {
    à: "a",
    á: "a",
    â: "a",
    ä: "a",
    ã: "a",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    ì: "i",
    í: "i",
    î: "i",
    ï: "i",
    ò: "o",
    ó: "o",
    ô: "o",
    ö: "o",
    õ: "o",
    ù: "u",
    ú: "u",
    û: "u",
    ü: "u",
  };

  function filtroPorNome(array, termo) {
    termo = termo
      .toLowerCase()
      .replace(
        /[àáâãäåèéêëìíîïòóôöùúûü]/g,
        (match) => mapaAcentos[match] || match
      )
      .replace(/[^a-z0-9]/gi, "");
    return array.filter((item) => {
      let nome = item.name
        .toLowerCase()
        .replace(
          /[àáâãäåèéêëìíîïòóôöùúûü]/g,
          (match) => mapaAcentos[match] || match
        )
        .replace(/[^a-z0-9]/gi, "");
      let cpf = item.cpf.replace(/[^a-z0-9]/gi, "");
      console.log(nome, termo);
      const nomeEncontrado =
        nome.toLowerCase().includes(termo) || cpf.toLowerCase().includes(termo);
      return nomeEncontrado;
    });
  }

  const handleSearch = () => {
    const res = filtroPorNome(contacts, search);
    setFilteredContacts(res);
  };

  return (
    <div className="px-3">
      <div className="flex justify-between">
        <Link href="/contacts/add" className="btn btn-active btn-primary mb-6">
          Adicionar Contato
        </Link>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Buscar..."
          className="input input-bordered md:w-auto w-50"
        />
      </div>
      <MsgParams />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((value, index) => (
              <tr key={index}>
                <th>{value.name}</th>
                <th>
                  <IMaskInput
                    mask="000.000.000-00"
                    className=""
                    value={value.cpf}
                    onChange={() => value.cpf}
                    disabled
                  />
                </th>
                <th>
                  <IMaskInput
                    mask="(00) 0 0000-0000"
                    className=""
                    value={value.telephone}
                    onChange={() => value.telephone}
                    disabled
                  />
                </th>
                <th>{value.address}</th>
                <th className="flex gap-5">
                  <Link href={`/contacts/edit/${value.id}`}>
                    <FaPenToSquare
                      className="text-blue-500 hover:text-blue-400"
                      size={20}
                    />
                  </Link>
                  <button onClick={() => handleDelete(value.id)}>
                    <FaTrashCan
                      className="text-red-500 hover:text-red-400"
                      size={20}
                    />
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
