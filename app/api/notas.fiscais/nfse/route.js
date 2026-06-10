import { NextResponse } from 'next/server';
import { gerarEAssinarDPS, enviarParaOAmbienteNacional } from '../../../utils/nfse';

export async function POST(request) {
  try {
    // Validar se o corpo da requisição existe
    if (!request.body) {
      return NextResponse.json(
        { erro: 'Corpo da requisição não fornecido' },
        { status: 400 }
      );
    }

    // Parse do JSON com tratamento de erro específico
    let dadosFormulario;
    try {
      dadosFormulario = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { erro: 'JSON inválido no corpo da requisição' },
        { status: 400 }
      );
    }

    // Validar dados mínimos necessários (ajuste conforme sua necessidade)
    if (!dadosFormulario || Object.keys(dadosFormulario).length === 0) {
      return NextResponse.json(
        { erro: 'Dados do formulário não fornecidos' },
        { status: 400 }
      );
    }

    // Validação de campos obrigatórios (exemplo - ajuste conforme sua estrutura)
    const camposObrigatorios = ['cnpj', 'valor', 'descricao']; // Ajuste estes campos
    const camposFaltantes = camposObrigatorios.filter(campo => !dadosFormulario[campo]);
    
    if (camposFaltantes.length > 0) {
      return NextResponse.json(
        { erro: `Campos obrigatórios faltando: ${camposFaltantes.join(', ')}` },
        { status: 400 }
      );
    }

    // 1. Gerar o XML e assinar digitalmente com o Certificado A1
    let xmlAssinado;
    try {
      xmlAssinado = await gerarEAssinarDPS(dadosFormulario);
      
      if (!xmlAssinado) {
        throw new Error('Falha ao gerar XML assinado');
      }
    } catch (assinaturaError) {
      console.error('Erro na geração/assinatura do XML:', assinaturaError);
      return NextResponse.json(
        { erro: `Erro ao gerar e assinar DPS: ${assinaturaError.message}` },
        { status: 422 }
      );
    }

    // 2. Transmitir via mTLS para a API do Governo Federal
    let respostaGov;
    try {
      respostaGov = await enviarParaOAmbienteNacional(xmlAssinado);
      
      if (!respostaGov) {
        throw new Error('Resposta vazia do ambiente nacional');
      }
    } catch (transmissaoError) {
      console.error('Erro na transmissão para o governo:', transmissaoError);
      return NextResponse.json(
        { erro: `Erro ao enviar para o ambiente nacional: ${transmissaoError.message}` },
        { status: 502 }
      );
    }

    // Log de sucesso (opcional, mas recomendado para auditoria)
    console.log('NF-e emitida com sucesso:', {
      timestamp: new Date().toISOString(),
      cnpj: dadosFormulario.cnpj,
      resposta: respostaGov
    });

    // Retornar sucesso com mais detalhes
    return NextResponse.json(
      { 
        emissao: 'sucesso', 
        dados: respostaGov,
        mensagem: 'DPS emitido e transmitido com sucesso',
        timestamp: new Date().toISOString()
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    // Erro genérico não capturado pelos blocos específicos
    console.error('Erro não tratado no endpoint de NFSe:', error);
    
    // Determinar status code apropriado baseado no tipo de erro
    let statusCode = 500;
    let mensagemErro = error.message || 'Erro interno do servidor';
    
    if (mensagemErro.includes('certificado') || mensagemErro.includes('SSL')) {
      statusCode = 503;
      mensagemErro = 'Erro de certificado digital - Verifique a configuração';
    } else if (mensagemErro.includes('timeout') || mensagemErro.includes('rede')) {
      statusCode = 504;
      mensagemErro = 'Timeout na comunicação - Tente novamente';
    }
    
    return NextResponse.json(
      { 
        erro: mensagemErro,
        timestamp: new Date().toISOString(),
        emissao: 'falha'
      }, 
      { status: statusCode }
    );
  }
}

// Opcional: Adicionar suporte para outros métodos HTTP
export async function GET() {
  return NextResponse.json(
    { erro: 'Método não permitido. Utilize POST para emissão de NFSe.' },
    { status: 405 }
  );
}

// Opcional: Configurar timeout e limite de tamanho (se necessário)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Ajuste conforme necessidade
    },
    responseLimit: false,
  },
};
