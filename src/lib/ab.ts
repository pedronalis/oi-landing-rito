/**
 * A/B Testing Utilities
 * Funções puras para gerenciar variantes de split test
 */

export type Variant = 'a' | 'b';

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
 * 50/50 split: < 0.5 = 'a', >= 0.5 = 'b'
 * @param random - Número entre 0 e 1
 * @returns Variante 'a' ou 'b'
 */
export function pickVariant(random: number): Variant {
  if (random < 0 || random >= 1) {
    throw new Error('random deve estar entre 0 (inclusive) e 1 (exclusive)');
  }
  return random < 0.5 ? 'a' : 'b';
}

/**
 * Normaliza um valor desconhecido para uma variante válida
 * @param value - Valor a ser normalizado
 * @returns Variante 'a' ou 'b', ou null se inválido
 */
export function normalizeVariant(value: unknown): Variant | null {
  if (value === 'a' || value === 'b') {
    return value;
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    if (lower === 'a' || lower === 'b') {
      return lower;
    }
  }
  return null;
}

