/**
 * A/B Testing Utilities
 * Funções puras para gerenciar variantes de split test
 */

export type Variant = 'a' | 'b' | 'c';

/**
 * Gera um número aleatório entre 0 e 1 usando crypto.getRandomValues
 * @returns Número entre 0 (inclusive) e 1 (exclusive)
 */
export function generateRandom(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  // Normaliza para 0-1 dividindo pelo máximo valor de uint32
  return array[0] / (0xffffffff + 1);
}

/**
 * Escolhe uma variante baseado em um número aleatório (0-1)
 * Split atual:
 * A: 33.33%
 * B: 33.33%
 * C: 33.34%
 * @param random - Número entre 0 e 1
 * @returns Variante 'a', 'b' ou 'c'
 */
export function pickVariant(random: number): Variant {
  if (random < 0 || random >= 1) {
    throw new Error('random deve estar entre 0 (inclusive) e 1 (exclusive)');
  }

  if (random < 0.3333) return 'a';
  if (random < 0.6666) return 'b';
  return 'c';
}

/**
 * Normaliza um valor desconhecido para uma variante válida
 * @param value - Valor a ser normalizado
 * @returns Variante 'a', 'b', 'c' ou null se inválido
 */
export function normalizeVariant(value: unknown): Variant | null {
  if (value === 'a' || value === 'b' || value === 'c') {
    return value;
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    if (lower === 'a' || lower === 'b' || lower === 'c') {
      return lower;
    }
  }
  return null;
}

