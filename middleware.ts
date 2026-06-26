import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Se a rota for /links, não processe nada, deixe o Next.js entregar o arquivo físico
  if (pathname === '/links') {
    return NextResponse.next()
  }

  // ... restante do seu código do Makeswift
}

export const config = {
  matcher: [
    /*
     * Adicione 'links' na lista de exceções do matcher abaixo
     */
    '/((?!api|_next/static|_next/image|favicon.ico|links).*)',
  ],
}
