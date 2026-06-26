// lib/makeswift/FormularioNFSe.makeswift.ts
import { Makeswift } from '@makeswift/runtime/next'
// Se o seu componente FormularioNFSe.tsx estiver na pasta /components:
import { FormularioNFSe } from '../../components/FormularioNFSe' 

Makeswift.registerComponent(FormularioNFSe, {
  type: 'formulario-nfse',
  label: 'Contafit / Emissor NFS-e',
  props: {},
})
