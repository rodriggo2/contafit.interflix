// components/FormularioNFSe.makeswift.ts
import { registerComponent } from '@makeswift/runtime/next'
import { FormularioNFSe } from './FormularioNFSe'

// Registrar componente no Makeswift (sintaxe correta)
registerComponent(FormularioNFSe, {
  type: 'formulario-nfse',
  label: 'ContaFit / Emissor NFS-e',
  props: {}
})
