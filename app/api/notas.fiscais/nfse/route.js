// app/api/notas.fiscais/nfse/route.js
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    // Parse dos dados
    const dadosFormulario = await request.json();

    // Validação mínima
    if (!dadosFormulario.cliente || !dadosFormulario.valor) {
      return NextResponse.json(
        { erro: 'Cliente e Valor são obrigatórios' },
        { status: 400 }
      );
    }

    // Validar se valor é numérico
    if (isNaN(dadosFormulario.valor) || dadosFormulario.valor <= 0) {
      return NextResponse.json(
        { erro: 'Valor inválido. Informe um número maior que zero.' },
        { status: 400 }
      );
    }

    // Gerar fatura simples
    const numeroFatura = Date.now(); // Usando timestamp como número único
    const dataAtual = new Date();
    const dataVencimento = new Date();
    dataVencimento.setDate(dataAtual.getDate() + 30); // Vencimento em 30 dias

    const fatura = {
      numero: numeroFatura,
      cliente: dadosFormulario.cliente,
      valor: parseFloat(dadosFormulario.valor),
      descricao: dadosFormulario.descricao || 'Serviço prestado',
      dataEmissao: dataAtual.toISOString().split('T')[0],
      dataVencimento: dataVencimento.toISOString().split('T')[0],
      status: 'pendente',
      tipo: dadosFormulario.tipo || 'servico'
    };

    // Adicionar CNPJ se fornecido
    if (dadosFormulario.cnpj) {
      fatura.cnpj = dadosFormulario.cnpj;
    }

    // Log simples
    console.log(`💰 Fatura #${fatura.numero} - Cliente: ${fatura.cliente} - Valor: R$ ${fatura.valor}`);

    // Retornar fatura
    return NextResponse.json({
      sucesso: true,
      fatura: fatura,
      mensagem: 'Fatura gerada com sucesso!'
    });
    
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { erro: 'Erro ao gerar fatura' },
      { status: 500 }
    );
  }
}

// Opcional: GET para listar faturas (simulado)
export async function GET() {
  // Exemplo de faturas mockadas
  const faturasMock = [
    {
      numero: Date.now() - 86400000,
      cliente: 'Empresa ABC',
      valor: 1500.00,
      status: 'pago',
      dataEmissao: new Date(Date.now() - 86400000).toISOString().split('T')[0]
    },
    {
      numero: Date.now(),
      cliente: 'Cliente XYZ',
      valor: 2500.00,
      status: 'pendente',
      dataEmissao: new Date().toISOString().split('T')[0]
    }
  ];

  return NextResponse.json({
    faturas: faturasMock,
    total: faturasMock.length
  });
}
