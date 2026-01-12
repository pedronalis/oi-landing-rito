/**
 * A/B Testing Utilities
 * Funções puras para gerenciar variantes de split test
 */

export type Variant = 'a' | 'b' | 'c' | 'd';

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
 * C: 50%
 * D: 50%
 * (A e B removidas do split)
 * @param random - Número entre 0 e 1
 * @returns Variante 'c' ou 'd'
 */
export function pickVariant(random: number): Variant {
  if (random < 0 || random >= 1) {
    throw new Error('random deve estar entre 0 (inclusive) e 1 (exclusive)');
  }

  return random < 0.5 ? 'c' : 'd';
}

/**
 * Normaliza um valor desconhecido para uma variante válida
 * @param value - Valor a ser normalizado
 * @returns Variante 'a', 'b', 'c', 'd' ou null se inválido
 */
export function normalizeVariant(value: unknown): Variant | null {
  if (value === 'a' || value === 'b' || value === 'c' || value === 'd') {
    return value;
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    if (lower === 'a' || lower === 'b' || lower === 'c' || lower === 'd') {
      return lower as Variant;
    }
  }
  return null;
}

