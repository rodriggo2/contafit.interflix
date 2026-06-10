// components/FormularioNFSe.makeswift.ts
import { Makeswift } from '@makeswift/runtime/next'
import { FormularioNFSe } from './FormularioNFSe'
import { useState } from 'react'

// Registrar o componente no Makeswift
Makeswift.registerComponent(FormularioNFSe, {
  type: 'formulario-nfse',
  label: 'Contafit / Emissor NFS-e',
  props: {
    // Propriedades editáveis no Makeswift
    titulo: {
      type: 'text',
      label: 'Título do Formulário',
      defaultValue: 'Emissão de NFS-e Simplificada'
    },
    corPrimaria: {
      type: 'color',
      label: 'Cor Principal',
      defaultValue: '#3B82F6'
    },
    mostrarCNPJ: {
      type: 'boolean',
      label: 'Mostrar campo CNPJ',
      defaultValue: true
    },
    mostrarDescricao: {
      type: 'boolean',
      label: 'Mostrar campo Descrição',
      defaultValue: true
    },
    valorPadrao: {
      type: 'number',
      label: 'Valor Padrão (opcional)',
      defaultValue: 0
    },
    placeholderCliente: {
      type: 'text',
      label: 'Placeholder do campo Cliente',
      defaultValue: 'Digite o nome do cliente'
    },
    buttonText: {
      type: 'text',
      label: 'Texto do Botão',
      defaultValue: 'Emitir Fatura'
    },
    endpointAPI: {
      type: 'text',
      label: 'Endpoint da API',
      defaultValue: '/api/notas.fiscais/nfse'
    }
  },
  // Opcional: Definir largura padrão no editor
  canvas: {
    defaultWidth: 400,
    defaultHeight: 500
  }
})
