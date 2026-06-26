// lib/makeswift/FormularioNFSe.makeswift.ts
import { Makeswift } from '@makeswift/runtime/next'
// MUDANÇA AQUI: O caminho provavelmente deve apontar para a pasta components
// Ajuste para '../../components/FormularioNFSe' se ele estiver lá
import { FormularioNFSe } from '../../components/FormularioNFSe' 

Makeswift.registerComponent(FormularioNFSe, {
  type: 'formulario-nfse',
  label: 'Contafit / Emissor NFS-e',
  props: {},
})
