import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes Tailwind de forma inteligente, resolvendo conflitos
 * @param inputs - Classes CSS para combinar
 * @returns String de classes combinadas
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

