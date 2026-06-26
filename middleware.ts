// Exemplo de como o seu middleware deve permitir a rota /links
export const config = {
  matcher: [
    /*
     * Ignore todas as rotas exceto as que o Makeswift deve cuidar.
     * Garanta que /links NÃO seja capturado se o middleware for restritivo.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|links).*)',
  ],
}
