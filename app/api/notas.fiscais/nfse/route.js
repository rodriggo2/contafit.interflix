import { NextResponse } from 'next/server';

// Configurações obrigatórias para rotas de integração no Next.js App Router
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    // Coleta diretamente os dados enviados pelo formulário do Makeswift
    const dadosFormulario = await request.json();

    // Validação dos dados mínimos necessários para a fatura simples com contrato
    if (!dadosFormulario || !dadosFormulario.cnpjTomador || !dadosFormulario.contratoId) {
      return NextResponse.json(
        { erro: 'CNPJ do cliente e Vínculo de Contrato são obrigatórios' }, 
        { status: 400 }
      );
    }

    // Simulando a geração de um identificador e número de fatura interna
    const numeroFatura = Math.floor(100000 + Math.random() * 900000);
    
    const respostaFatura = {
      protocolo: `FAT-${numeroFatura}`,
      numeroFatura: numeroFatura,
      contratoId: dadosFormulario.contratoId,
      nomeContrato: dadosFormulario.nomeContrato || 'Contrato não especificado',
      valorFaturado: dadosFormulario.valorServicos || 0,
      dataEmissao: new Date().toISOString(),
      status: 'faturado_pendente'
    };

    // Log detalhado para você acompanhar em tempo real no painel de Logs da Vercel
    console.log(`[Financeiro] Fatura ${respostaFatura.protocolo} gerada com sucesso para o contrato: ${dadosFormulario.contratoId}`);

    // Retorna o sucesso para o componente do Makeswift renderizar na tela
    return NextResponse.json(
      { 
        sucesso: true,
        mensagem: 'Fatura e vínculo de contrato processados com sucesso',
        dados: respostaFatura,
        timestamp: new Date().toISOString()
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    // Captura qualquer falha de parse de JSON ou erro interno de execução
    console.error('Erro crítico no endpoint de faturamento:', error);
    return NextResponse.json(
      { 
        sucesso: false,
        erro: 'Erro interno do servidor ao processar a fatura',
        detalhes: error.message 
      }, 
      { status: 500 }
    );
  }
}

// Bloqueia outros métodos HTTP indicando o caminho correto
export async function GET() {
  return NextResponse.json(
    { 
      erro: 'Método não permitido',
      mensagem: 'Utilize requisições POST para gerar faturas e contratos.'
    },
    { status: 405 }
  );
}
