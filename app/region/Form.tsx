"use client";

import { useEffect, useState } from "react";

interface Address {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
}

export default function Form() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"Success" | "Error" | "">("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [localidade, setLocalidade] = useState<string>("");
  const [uf, setUf] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [regiao, setRegiao] = useState<string>("");

  const getAddress = async (cep: string) => {
    setIsLoading(true);

    if (!cep || cep.length < 8) {
      setStatus("Error");
      setIsLoading(false);
    }

    const response = await fetch(`api/cep/${cep}`);
    const data = await response.json();
    const address: Address = data;

    console.log(`data: ${data}`);

    if (!data.error) {
      setLogradouro(address.logradouro);
      setBairro(address.bairro);
      setLocalidade(address.localidade);
      setUf(address.uf);
      setEstado(address.estado);
      setRegiao(address.regiao);
      setStatus("Success");
      setIsLoading(false);
    } else {
      setLogradouro("");
      setBairro("");
      setLocalidade("");
      setUf("");
      setEstado("");
      setRegiao("");
      setStatus("Error");
      setIsLoading(false);
    }
  };

  return (
    <form className="text-white w-[25vw]">
      <div className="flex flex-col gap-2">
        <label>CEP</label>
        <input
          type="text"
          className="bg-white rounded text-black px-2"
          maxLength={8}
          onBlur={async (e) => await getAddress(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Logradouro</label>
        <input
          type="text"
          className="bg-white rounded text-black px-2"
          maxLength={8}
          value={logradouro ?? ""}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Bairro</label>
        <input
          type="text"
          className="bg-white rounded text-black px-2"
          maxLength={8}
          value={bairro ?? ""}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Localidade</label>
        <input
          type="text"
          className="bg-white rounded text-black px-2"
          maxLength={8}
          value={localidade ?? ""}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>UF</label>
        <input
          type="text"
          className="bg-white rounded text-black px-2"
          maxLength={8}
          value={uf ?? ""}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Estado</label>
        <input
          type="text"
          className="bg-white rounded text-black px-2"
          maxLength={8}
          value={estado ?? ""}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Região</label>
        <input
          type="text"
          className="bg-white rounded text-black px-2"
          maxLength={8}
          value={regiao ?? ""}
          readOnly
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white text-center w-full p-2 text-2lg rounded mt-5 cursor-pointer hover:bg-blue-700 duration-300"
      >
        Enviar
      </button>

      {isLoading && (
        <div className="mt-4 mx-auto w-6 h-6 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && status === "Success" && <p className="mt-4 text-center">Endereço encontrado ✅</p>}
      {!isLoading && status === "Error" && <p className="mt-4 text-center">Endereço inválido ❌</p>}
    </form>
  );
}
