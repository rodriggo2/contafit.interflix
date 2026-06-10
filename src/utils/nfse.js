import https from 'https';
import { SignedXml } from 'xml-crypto';

/**
 * Gera o XML da DPS baseado no padrão nacional e assina digitalmente usando o Certificado A1.
 */
export async function gerarEAssinarDPS(dados) {
  const certBase64 = process.env.CERTIFICADO_A1_BASE64;
  const certSenha = process.env.CERTIFICADO_SENHA;

  if (!certBase64 || !certSenha) {
    throw new Error('Certificado digital não configurado no servidor.');
  }

  const pfxBuffer = Buffer.from(certBase64, 'base64');

  // Montagem do XML estruturado com os campos exatos que você validou no route.js
  const xmlDpsBruto = `<?xml version="1.0" encoding="UTF-8"?>
  <EnviarLoteDpsEnvio xmlns="http://nfse.gov.br" Id="LOTE${Date.now()}">
    <LoteDps>
      <DPS Id="DPS${Date.now()}">
        <InfDPS Id="infDPS${Date.now()}" versao="1.00">
          <dhEmi>${new Date().toISOString().split('.')[0]}-03:00</dhEmi>
          <tpAmb>${process.env.NODE_ENV === 'production' ? '1' : '2'}</tpAmb>
          <Prestador>
            <CNPJ>${dados.cnpjPrestador.replace(/\D/g, '')}</CNPJ>
          </Prestador>
          <Tomador>
            <CNPJ>${dados.cnpjTomador.replace(/\D/g, '')}</CNPJ>
          </Tomador>
          <Serv>
            <cServAnax>${dados.codigoMunicipio}</cServAnax>
            <vServ>${dados.valorServicos.toFixed(2)}</vServ>
            <xDesc>${dados.descricaoServico}</xDesc>
          </Serv>
        </InfDPS>
      </DPS>
    </LoteDps>
  </EnviarLoteDpsEnvio>`.trim();

  // Instancia e configura o assinador digital (Padrão XMLDSIG)
  const sig = new SignedXml({
    privateKey: {
      key: pfxBuffer,
      passphrase: certSenha
    },
    signatureAlgorithm: 'http://w3.org'
  });

  sig.addReference("//*[local-name()='InfDPS']", [
    "http://w3.org",
    "http://w3.org"
  ], "http://w3.org");

  sig.computeSignature(xmlDpsBruto);
  
  return sig.getSignedXml();
}

/**
 * Envia o XML assinado para a API Nacional da NFSe utilizando autenticação mTLS rígida.
 */
export async function enviarParaOAmbienteNacional(xmlAssinado) {
  const pfxBuffer = Buffer.from(process.env.CERTIFICADO_A1_BASE64, 'base64');
  const certSenha = process.env.CERTIFICADO_SENHA;

  // O Handshake TLS exige que enviemos o certificado para o servidor do governo validar
  const mtlsAgent = new https.Agent({
    pfx: pfxBuffer,
    passphrase: certSenha,
    rejectUnauthorized: true
  });

  const urlAmbiente = process.env.NODE_ENV === 'production'
    ? 'https://nfse.gov.br'
    : 'https://nfse.gov.br';

  // Nota técnica: O fetch nativo do Node 18+ aceita a propriedade 'agent' se passarmos via https
  const respostaGov = await fetch(urlAmbiente, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN_ACESSO_GOV}`
    },
    agent: mtlsAgent,
    body: JSON.stringify({
      xmlDps: Buffer.from(xmlAssinado).toString('base64') // Envia encodado conforme exigência padrão
    })
  });

  if (!respostaGov.ok) {
    const textoErro = await respostaGov.text();
    throw new Error(textoErro || `Erro HTTP ${respostaGov.status} na API do Governo`);
  }

  return await respostaGov.json();
}
