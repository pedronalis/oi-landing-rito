import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware simplificado - sempre redireciona para landing D
 * A/B testing removido pois 100% do tráfego vai para D
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apenas intercepta a rota raiz
  if (pathname !== '/') {
    return NextResponse.next();
  }

  // Sempre redireciona para /d
  const response = NextResponse.rewrite(
    new URL('/d', request.url)
  );

  // Headers para evitar cache
  response.headers.set('Cache-Control', 'no-store, private');

  return response;
}

export const config = {
  matcher: '/',
};
