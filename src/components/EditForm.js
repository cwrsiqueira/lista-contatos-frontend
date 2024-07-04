"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchClient } from "../libs/fetchClient";
import { IMaskInput } from "react-imask";

export default function EditForm({ id }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [pos, setPos] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertTipo, setAlertTipo] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const router = useRouter();

  /**
   * Chama a função que busca os dados do contato quando a variável id é alterada
   * e ao gerar a página
   */
  useEffect(() => {
    handleFetchData();
  }, [id]);

  /**
   * Faz a chamada à API que busca os dados do contato
   */
  const handleFetchData = () => {
    fetchClient(`http://localhost:3001/api/contacts/${id}`).then(
      async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setName(data.name);
          setCpf(data.cpf);
          setTelephone(data.telephone);
          setAddress(data.address);
          setPos(data.pos);
        }
      }
    );
  };

  /**
   * Função recebe os dados do formulário, trata e valida os dados
   * Faz a chamada à API que busca os dados do contato
   * Preenche o formulário ou emite as mensagens pertinentes
   * @param {evento} e
   * @returns void | null
   */
  const editContact = (e) => {
    e.preventDefault();
    if (name === "" || cpf === "" || telephone === "" || address === "") {
      setAlert(true);
      setAlertTipo("error");
      setAlertMsg("Todos os campos devem ser preenchidos!");
      return null;
    }

    /**
     * Sanitaliza os dados para o padrão do banco de dados
     */
    const newCpf = cpf.replace(/\D/g, "");
    const newTelephone = telephone.replace(/\D/g, "");

    /**
     * Valida a quantidade de caracteres do CPF
     */
    if (newCpf.length !== 11) {
      setAlert(true);
      setAlertTipo("error");
      setAlertMsg("Preencha o CPF com 11 dígitos e somente com números!");
      return null;
    }

    const data = {
      name,
      cpf: newCpf,
      telephone: newTelephone,
      address,
    };

    /**
     * Faz a requisição à API
     */
    fetchClient(`http://localhost:3001/api/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.status === 200) {
        setAlert(true);
        setAlertTipo("success");
        setAlertMsg("Contato editado com sucesso!");
      } else {
        setAlert(true);
        setAlertTipo("error");
        setAlertMsg("CPF já cadastrado!");
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="text-xl mt-4 font-bold">Adicionar Contato</div>
        <form
          onSubmit={editContact}
          className="container bg-white p-12 rounded-lg w-full flex justify-center items-center flex-col gap-2"
        >
          {alert && (
            <div role="alert" className={`alert alert-${alertTipo}`}>
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
              <span>{alertMsg}</span>
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
}
