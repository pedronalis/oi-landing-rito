import { describe, it, expect, vi, beforeEach } from 'vitest';
import { pickVariant, normalizeVariant, generateRandom } from '../lib/ab';

describe('pickVariant', () => {
  it('deve retornar "a" para valores < 0.5', () => {
    expect(pickVariant(0)).toBe('a');
    expect(pickVariant(0.1)).toBe('a');
    expect(pickVariant(0.49)).toBe('a');
  });

  it('deve retornar "b" para valores >= 0.5', () => {
    expect(pickVariant(0.5)).toBe('b');
    expect(pickVariant(0.6)).toBe('b');
    expect(pickVariant(0.99)).toBe('b');
  });

  it('deve lançar erro para valores fora do range [0, 1)', () => {
    expect(() => pickVariant(-0.1)).toThrow();
    expect(() => pickVariant(1)).toThrow();
    expect(() => pickVariant(1.1)).toThrow();
  });
});

describe('normalizeVariant', () => {
  it('deve retornar "a" para valores válidos "a"', () => {
    expect(normalizeVariant('a')).toBe('a');
    expect(normalizeVariant('A')).toBe('a');
  });

  it('deve retornar "b" para valores válidos "b"', () => {
    expect(normalizeVariant('b')).toBe('b');
    expect(normalizeVariant('B')).toBe('b');
  });

  it('deve retornar null para valores inválidos', () => {
    expect(normalizeVariant('c')).toBeNull();
    expect(normalizeVariant('invalid')).toBeNull();
    expect(normalizeVariant(123)).toBeNull();
    expect(normalizeVariant(null)).toBeNull();
    expect(normalizeVariant(undefined)).toBeNull();
  });

  it('deve normalizar strings com espaços', () => {
    expect(normalizeVariant(' a ')).toBe('a');
    expect(normalizeVariant(' B ')).toBe('b');
  });
});

describe('generateRandom', () => {
  it('deve gerar um número entre 0 e 1', () => {
    const random = generateRandom();
    expect(random).toBeGreaterThanOrEqual(0);
    expect(random).toBeLessThan(1);
  });

  it('deve gerar valores diferentes em múltiplas chamadas', () => {
    const values = Array.from({ length: 10 }, () => generateRandom());
    const uniqueValues = new Set(values);
    // É possível que alguns valores sejam iguais, mas improvável
    expect(uniqueValues.size).toBeGreaterThan(1);
  });
});

