// app/api/notas.fiscais/nfse/route.js
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

    // Validar dados mínimos necessários
    if (!dadosFormulario || Object.keys(dadosFormulario).length === 0) {
      return NextResponse.json(
        { erro: 'Dados do formulário não fornecidos' },
        { status: 400 }
      );
    }

    // Validação de campos obrigatórios para NFSe
    const camposObrigatorios = [
      'cnpjPrestador',
      'cnpjTomador',
      'valorServicos',
      'descricaoServico',
      'codigoMunicipio'
    ];
    
    const camposFaltantes = camposObrigatorios.filter(campo => !dadosFormulario[campo]);
    
    if (camposFaltantes.length > 0) {
      return NextResponse.json(
        { 
          erro: 'Campos obrigatórios não preenchidos',
          camposFaltantes: camposFaltantes
        },
        { status: 400 }
      );
    }

    // Validações específicas de formato
    if (dadosFormulario.valorServicos <= 0) {
      return NextResponse.json(
        { erro: 'Valor dos serviços deve ser maior que zero' },
        { status: 400 }
      );
    }

    // Validação de CNPJ (básica)
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$|^\d{14}$/;
    if (!cnpjRegex.test(dadosFormulario.cnpjPrestador) || 
        !cnpjRegex.test(dadosFormulario.cnpjTomador)) {
      return NextResponse.json(
        { erro: 'CNPJ em formato inválido' },
        { status: 400 }
      );
    }

    // 1. Gerar o XML e assinar digitalmente com o Certificado A1
    let xmlAssinado;
    try {
      console.log('Iniciando geração do DPS...');
      xmlAssinado = await gerarEAssinarDPS(dadosFormulario);
      
      if (!xmlAssinado || xmlAssinado.length === 0) {
        throw new Error('XML gerado está vazio');
      }
      
      console.log('DPS gerado e assinado com sucesso');
    } catch (assinaturaError) {
      console.error('Erro na geração/assinatura do XML:', assinaturaError);
      return NextResponse.json(
        { 
          erro: 'Erro ao gerar e assinar DPS',
          detalhes: assinaturaError.message,
          etapa: 'geracao_xml'
        },
        { status: 422 }
      );
    }

    // 2. Transmitir via mTLS para a API do Governo Federal
    let respostaGov;
    try {
      console.log('Transmitindo para o ambiente nacional...');
      respostaGov = await enviarParaOAmbienteNacional(xmlAssinado);
      
      if (!respostaGov) {
        throw new Error('Resposta vazia do ambiente nacional');
      }
      
      console.log('Transmissão realizada com sucesso');
    } catch (transmissaoError) {
      console.error('Erro na transmissão para o governo:', transmissaoError);
      
      // Determinar tipo específico de erro de transmissão
      let statusCode = 502;
      let mensagemDetalhada = transmissaoError.message;
      
      if (transmissaoError.code === 'ECONNREFUSED') {
        statusCode = 503;
        mensagemDetalhada = 'Servidor do governo indisponível';
      } else if (transmissaoError.code === 'ETIMEDOUT') {
        statusCode = 504;
        mensagemDetalhada = 'Timeout na comunicação com o governo';
      }
      
      return NextResponse.json(
        { 
          erro: 'Erro ao enviar para o ambiente nacional',
          detalhes: mensagemDetalhada,
          etapa: 'transmissao',
          codigo: transmissaoError.code || null
        },
        { status: statusCode }
      );
    }

    // Log de sucesso para auditoria
    const responseLog = {
      timestamp: new Date().toISOString(),
      endpoint: '/api/notas.fiscais/nfse',
      cnpjPrestador: dadosFormulario.cnpjPrestador,
      cnpjTomador: dadosFormulario.cnpjTomador,
      valor: dadosFormulario.valorServicos,
      protocolo: respostaGov.protocolo || respostaGov.numero || 'N/A'
    };
    console.log('NFSe emitida com sucesso:', responseLog);

    // Retornar sucesso com informações completas
    return NextResponse.json(
      { 
        sucesso: true,
        mensagem: 'NFSe emitida e transmitida com sucesso',
        dados: {
          protocolo: respostaGov.protocolo || respostaGov.numero,
          dataEmissao: respostaGov.dataEmissao || new Date().toISOString(),
          status: respostaGov.status || 'autorizado',
          numeroNfse: respostaGov.numeroNfse || respostaGov.numero,
          codigoVerificacao: respostaGov.codigoVerificacao || null,
          respostaCompleta: respostaGov
        },
        timestamp: new Date().toISOString()
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    // Erro genérico não capturado
    console.error('Erro não tratado no endpoint de NFSe:', error);
    
    // Determinar status code baseado no erro
    let statusCode = 500;
    let mensagemErro = 'Erro interno do servidor';
    
    if (error.message.includes('certificado') || error.message.includes('certificate')) {
      statusCode = 503;
      mensagemErro = 'Erro de certificado digital - Contate o administrador';
    } else if (error.message.includes('timeout')) {
      statusCode = 504;
      mensagemErro = 'Tempo limite excedido - Tente novamente';
    } else if (error.message.includes('rate limit')) {
      statusCode = 429;
      mensagemErro = 'Muitas requisições - Aguarde e tente novamente';
    } else {
      mensagemErro = error.message || 'Erro interno do servidor';
    }
    
    return NextResponse.json(
      { 
        sucesso: false,
        erro: mensagemErro,
        detalhes: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString()
      }, 
      { status: statusCode }
    );
  }
}

// Suporte para outros métodos HTTP
export async function GET() {
  return NextResponse.json(
    { 
      erro: 'Método não permitido',
      mensagem: 'Utilize POST para emitir NFSe',
      endpointsDisponiveis: {
        post: '/api/notas.fiscais/nfse - Emitir nova NFSe'
      }
    },
    { status: 405 }
  );
}

// Configurações da rota
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // ou 'edge' se preferir
export const preferredRegion = 'auto';
