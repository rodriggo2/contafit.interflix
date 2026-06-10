// components/FormularioNFSe.makeswift.ts
import { makeswift } from '@/lib/makeswift/client'
import { FormularioNFSe } from './FormularioNFSe'

// @ts-ignore
makeswift.registerComponent(FormularioNFSe, {
  type: 'formulario-nfse',
  label: 'Contafit / Emissor NFS-e',
  props: {},
})
