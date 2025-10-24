import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cep: string } }
) {
  const { cep } = await params;
  const cleanCep = cep.replace(/\D/g, "");

  if (!cleanCep) {
    return NextResponse.json(
      { error: "Invalid CEP format. Use 8 digits" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: "CEP not found." }, { status: 404 });
    }

    console.log(`Complete data: ${JSON.stringify(data)}`)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching ViaCep data: ${error}` },
      { status: 500 }
    );
  }
}
