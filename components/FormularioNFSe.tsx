'use client';
import { useState } from 'react';
// Importamos a lista de contratos que criamos
import { LISTA_CONTRATOS } from '../utils/contratos';

export function FormularioNFSe() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ tipo: 'sucesso' | 'erro'; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const contratoSelecionadoId = formData.get('contratoId');
    
    // Procura o contrato escolhido para pegar o valor correto e a descrição
    const contratoInfo = LISTA_CONTRATOS.find(c => c.id === contratoSelecionadoId);

    const dados = {
      cnpjTomador: formData.get('cnpjTomador'),
      contratoId: contratoInfo?.id,
      nomeContrato: contratoInfo?.nome,
      valorServicos: contratoInfo?.valorMensal, // Valor vem direto e travado pelo contrato
      descricaoServico: contratoInfo?.descricao
    };

    try {
      const response = await fetch('/api/notas.fiscais/nfse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.erro || 'Erro ao processar.');
      }

      setStatus({ 
        tipo: 'sucesso', 
        msg: `Fatura Gerada! Contrato: ${dados.nomeContrato} | Código: ${resultado.dados.protocolo}` 
      });
    } catch (error: any) {
      setStatus({ tipo: 'erro', msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>Faturamento por Contrato</h3>
      
      <input name="cnpjTomador" placeholder="CNPJ do Cliente (Apenas números)" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
      
      {/* Campo Dropdown para selecionar o contrato vinculado */}
      <label style={{ fontSize: '14px', color: '#666', marginBottom: '-6px' }}>Selecione o Contrato/Serviço:</label>
      <select name="contratoId" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}>
        {LISTA_CONTRATOS.map((contrato) => (
          <option key={contrato.id} value={contrato.id}>
            {contrato.nome} (R$ {contrato.valorMensal.toFixed(2)})
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading} style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        {loading ? 'Faturando...' : 'Vincular Contrato e Faturar'}
      </button>

      {status && (
        <div style={{ padding: '10px', borderRadius: '4px', fontSize: '14px', backgroundColor: status.tipo === 'sucesso' ? '#e6fffa' : '#ffebeb', color: status.tipo === 'sucesso' ? '#006644' : '#cc0000' }}>
          {status.msg}
        </div>
      )}
    </form>
  );
}
