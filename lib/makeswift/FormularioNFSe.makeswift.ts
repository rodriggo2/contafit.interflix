// lib/makeswift/FormularioNFSe.makeswift.ts
import { makeswift } from './client'  // ou '../lib/makeswift/client' se necessário
import { FormularioNFSe } from '../../components/FormularioNFSe' 

makeswift.registerComponent(FormularioNFSe, {
  type: 'formulario-nfse',
  label: 'Contafit / Emissor NFS-e',
  props: {},
})
