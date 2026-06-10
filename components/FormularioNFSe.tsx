'use client';
import { useState } from 'react';

export function FormularioNFSe() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ tipo: 'sucesso' | 'erro'; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const dados = {
      cnpjPrestador: formData.get('cnpjPrestador'),
      cnpjTomador: formData.get('cnpjTomador'),
      valorServicos: Number(formData.get('valorServicos')),
      descricaoServico: formData.get('descricaoServico'),
      codigoMunicipio: formData.get('codigoMunicipio'),
    };

    try {
      const response = await fetch('/api/notas.fiscais/nfse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.erro || 'Erro ao emitir nota.');
      }

      setStatus({ tipo: 'sucesso', msg: `Nota emitida! Protocolo: ${resultado.dados.protocolo}` });
    } catch (error: any) {
      setStatus({ tipo: 'erro', msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>Emissor NFS-e Nacional</h3>
      
      <input name="cnpjPrestador" placeholder="CNPJ Prestador (Apenas números)" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
      <input name="cnpjTomador" placeholder="CNPJ Tomador (Apenas números)" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
      <input name="valorServicos" type="number" step="0.01" placeholder="Valor do Serviço (Ex: 150.00)" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
      <input name="codigoMunicipio" placeholder="Código IBGE do Município" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
      <textarea name="descricaoServico" placeholder="Descrição dos Serviços" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '80px', resize: 'none' }} />

      <button type="submit" disabled={loading} style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        {loading ? 'Transmitindo...' : 'Emitir Nota Fiscal'}
      </button>

      {status && (
        <div style={{ padding: '10px', borderRadius: '4px', fontSize: '14px', backgroundColor: status.tipo === 'sucesso' ? '#e6fffa' : '#ffebeb', color: status.tipo === 'sucesso' ? '#006644' : '#cc0000' }}>
          {status.msg}
        </div>
      )}
    </form>
  );
}
