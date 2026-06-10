// components/FormularioNFSe.makeswift.ts
import { Makeswift } from '@makeswift/runtime/next'
import { FormularioNFSe } from './FormularioNFSe'

// Forma alternativa de registro
const client = new Makeswift(process.env.MAKESWIFT_API_KEY!)

client.registerComponent(FormularioNFSe, {
  type: 'formulario-nfse',
  label: 'ContaFit / Emissor NFS-e',
  props: {}
})

export { client }
