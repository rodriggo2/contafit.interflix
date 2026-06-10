// components/FormularioNFSe.makeswift.ts
import { ReactRuntime } from '@makeswift/runtime/react'
import { FormularioNFSe } from './FormularioNFSe'

// Registrar o componente no Makeswift
ReactRuntime.registerComponent(FormularioNFSe, {
  type: 'formulario-nfse',
  label: 'ContaFit / Emissor NFS-e',
  props: {}
})
