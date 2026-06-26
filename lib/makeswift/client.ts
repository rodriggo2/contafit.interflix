// lib/makeswift/client.ts
import { Makeswift } from '@makeswift/runtime/next'
import { strict } from 'assert'
import { runtime } from './runtime'

strict(process.env.MAKESWIFT_SITE_API_KEY, 'MAKESWIFT_SITE_API_KEY is required')

// Criamos a instância
const makeswiftInstance = new Makeswift(process.env.MAKESWIFT_SITE_API_KEY, {
  runtime,
})

// Exportamos com os dois nomes para não quebrar nenhum arquivo do projeto
export const client = makeswiftInstance
export const makeswift = makeswiftInstance
