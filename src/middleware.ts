import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateRandom, pickVariant, normalizeVariant, type Variant } from './lib/ab';

const COOKIE_NAME = 'lp_variant';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 dias em segundos

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Apenas intercepta a rota raiz
  if (pathname !== '/') {
    return NextResponse.next();
  }

  // Verifica override via query string
  const queryVariant = searchParams.get('ab');
  if (queryVariant) {
    const normalized = normalizeVariant(queryVariant);
    if (normalized) {
      const response = NextResponse.rewrite(
        new URL(`/${normalized}`, request.url)
      );
      // Seta cookie com a variante escolhida
      response.cookies.set(COOKIE_NAME, normalized, {
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
        path: '/',
      });
      // Headers para evitar cache
      response.headers.set('Cache-Control', 'no-store, private');
      return response;
    }
  }

  // Verifica cookie existente
  const cookieVariant = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieVariant) {
    const normalized = normalizeVariant(cookieVariant);
    if (normalized) {
      const response = NextResponse.rewrite(
        new URL(`/${normalized}`, request.url)
      );
      // Renova cookie
      response.cookies.set(COOKIE_NAME, normalized, {
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
        path: '/',
      });
      response.headers.set('Cache-Control', 'no-store, private');
      return response;
    }
  }

  // Sorteia nova variante 50/50
  const random = generateRandom();
  const variant: Variant = pickVariant(random);

  const response = NextResponse.rewrite(
    new URL(`/${variant}`, request.url)
  );

  // Seta cookie com a variante sorteada
  response.cookies.set(COOKIE_NAME, variant, {
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    path: '/',
  });

  // Headers para evitar cache
  response.headers.set('Cache-Control', 'no-store, private');

  return response;
}

export const config = {
  matcher: '/',
};

