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
      console.log(`Form data: ${data}`);
      setIsLoading(false);
    } else {
      setStatus("Error");
      setIsLoading(false);
    }
  };

  return (
    <form className="text-white w-[25vw]">
      <div className="flex flex-col gap-2">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          name="cep"
          className="bg-white rounded text-black px-2"
          maxLength={8}
          onBlur={async (e) => await getAddress(e.target.value)}
        />
      </div>
      <button type="submit">Enviar</button>

      {isLoading && <p>Carregando...</p>}
      {!isLoading && status === "Success" && <p>Endereço encontrado ✅</p>}
      {!isLoading && status === "Error" && <p>Endereço inválido ❌</p>}
    </form>
  );
}
