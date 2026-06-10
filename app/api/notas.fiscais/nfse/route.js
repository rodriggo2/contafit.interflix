import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    if (!request.body) {
      return NextResponse.json({ erro: 'Corpo da requisição vazio' }, { status: 400 });
    }

    const dadosFormulario = await request.json();

    // Validação reduzida apenas para o controle financeiro simples
    if (!dadosFormulario.cnpjTomador || !dadosFormulario.valorServicos) {
      return NextResponse.json({ erro: 'CNPJ do cliente e Valor são obrigatórios' }, { status: 400 });
    }

    // Simulando a geração de uma fatura interna
    const numeroFatura = Math.floor(100000 + Math.random() * 900000);
    
    const respostaFatura = {
      protocolo: `FAT-${numeroFatura}`,
      numeroFatura: numeroFatura,
      dataEmissao: new Date().toISOString(),
      status: 'faturado_pendente'
    };

    // Log para você acompanhar no painel da Vercel
    console.log(`Fatura simples emitida com sucesso: ${respostaFatura.protocolo}`);

    return NextResponse.json(
      { 
        sucesso: true,
        mensagem: 'Fatura simples gerada com sucesso',
        dados: respostaFatura,
        timestamp: new Date().toISOString()
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Erro no endpoint de faturamento:', error);
    return NextResponse.json({ erro: 'Erro interno ao processar fatura' }, { status: 500 });
  }
}
