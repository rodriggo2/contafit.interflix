import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { DraftModeScript } from '@makeswift/runtime/next/server'

import '@/lib/makeswift/components'
import { MakeswiftProvider } from '@/lib/makeswift/provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'contaFIT',
  description: 'Contabilidade para Negócios Fitness',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <DraftModeScript />
      </head>
      <body className={inter.className}>
        <MakeswiftProvider>{children}</MakeswiftProvider>
      </body>
    </html>
  )
}
