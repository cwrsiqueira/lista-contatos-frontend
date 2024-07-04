"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchClient } from "../libs/fetchClient";
import { IMaskInput } from "react-imask";

const AddForm = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [pos, setPos] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");

  const router = useRouter();

  const addContact = (e) => {
    e.preventDefault();
    if (name === "" || cpf === "" || telephone === "" || address === "") {
      setError(true);
      setErroMsg("Todos os campos devem ser preenchidos!");
      return null;
    }

    const newCpf = cpf.replace(/\D/g, "");
    const newTelephone = telephone.replace(/\D/g, "");

    if (newCpf.length !== 11) {
      setError(true);
      setErroMsg("Preencha o CPF com 11 dígitos e somente com números!");
      return null;
    }

    const data = {
      name,
      cpf: newCpf,
      telephone: newTelephone,
      address,
    };

    fetchClient(`http://localhost:3001/api/contacts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.status === 201) {
        router.push("/dashboard?success=contactAdded");
      } else {
        setError(true);
        setErroMsg("CPF já cadastrado!");
        return null;
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="text-xl mt-4 font-bold">Adicionar Contato</div>
        <form
          onSubmit={addContact}
          className="container bg-white p-12 rounded-lg w-full flex justify-center items-center flex-col gap-2"
        >
          {/* <MsgParams /> */}
          {error && (
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
              <span>Erro! {errorMsg}</span>
            </div>
          )}
          <input
            name="name"
            type="text"
            placeholder="Digite o nome completo"
            className="input input-primary w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <IMaskInput
            name="cpf"
            type="text"
            mask="000.000.000-00"
            placeholder="Digite o CPF"
            className="input input-primary w-full"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            max={11}
          />
          <IMaskInput
            name="telephone"
            type="text"
            mask="(00) 0 0000-0000"
            placeholder="Digite o telefone"
            className="input input-primary w-full"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            max={11}
          />
          <input
            name="address"
            type="text"
            placeholder="Endereço Completo"
            className="input input-primary w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="btn btn-primary w-full" type="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
