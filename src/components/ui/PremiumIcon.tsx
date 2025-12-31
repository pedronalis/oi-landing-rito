'use client';

import { cn } from '@/lib/utils';

type IconType =
  | 'mask'
  | 'chart-down'
  | 'megaphone'
  | 'clown'
  | 'target'
  | 'mirror'
  | 'plant'
  | 'speaker'
  | 'star'
  | 'check'
  | 'x'
  | 'circle-red'
  | 'circle-green'
  | 'folder'
  | 'lightning'
  | 'brain'
  // Arsenal Treasure Map Icons
  | 'diamond'       // Produto & Oferta
  | 'quill'         // Copy & Vendas
  | 'sparkles'      // Conteúdo & Mídia
  | 'book-open'     // Estrutura & Ensino
  | 'crystal-ball'  // Oráculos
  | 'compass'       // Estratégia
  | 'treasure-chest'; // Baú de tesouro

interface PremiumIconProps {
  type: IconType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'brand' | 'accent' | 'red' | 'green' | 'slate' | 'gold' | 'current';
}

const iconPaths: Record<IconType, string> = {
  // Mask - máscara de teatro minimalista
  mask: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  // Chart down - gráfico descendente
  'chart-down': 'M3 13l4-4 4 4 5-5M3 21h18M3 3v18h18',
  // Megaphone - megafone minimalista
  megaphone: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
  // Clown - palhaço simplificado (cara com sorriso)
  clown: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 15a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z',
  // Target - alvo com círculos concêntricos
  target: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83M12 18a6 6 0 100-12 6 6 0 000 12z',
  // Mirror - espelho (círculo com check)
  mirror: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  // Plant - planta/crescimento (folha)
  plant: 'M12 3v18m-3-3l3-3 3 3M9 6l3-3 3 3m-3 3v12',
  // Speaker - alto-falante
  speaker: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
  // Star - estrela
  star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  // Check - checkmark simples
  check: 'M5 13l4 4L19 7',
  // X - erro/negativo
  x: 'M6 18L18 6M6 6l12 12',
  // Folder - pasta
  folder: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
  // Lightning - raio/energia
  lightning: 'M13 10V3L4 14h7v7l9-11h-7z',
  // Brain - cérebro simplificado
  brain: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3M3.343 15.657l1.414 1.414M16 11H8m8 4H8m8-8H8m2-2h4',
  // Circle red - círculo vermelho (usado com fill)
  'circle-red': 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z',
  // Circle green - círculo verde (usado com fill)
  'circle-green': 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z',
  // === ARSENAL TREASURE MAP ICONS ===
  // Diamond - Produto & Oferta (gem/diamond shape)
  diamond: 'M12 2L2 10l10 12 10-12-10-8zM12 5l6.5 5.2L12 19l-6.5-8.8L12 5z',
  // Quill - Copy & Vendas (feather pen)
  quill: 'M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8l-3 3m-5.66 5.66a2 2 0 01-2.83 0M18 14v4a2 2 0 01-2 2H6',
  // Sparkles - Conteúdo & Mídia (stars/magic)
  sparkles: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
  // Book Open - Estrutura & Ensino
  'book-open': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  // Crystal Ball - Oráculos (mystical orb)
  'crystal-ball': 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10h.01M15 10h.01M9.75 15a3.75 3.75 0 017.5 0M12 3v2m6.364.636l-1.414 1.414M21 12h-2M17.95 17.95l-1.414-1.414',
  // Compass - Estratégia (navigation compass)
  compass: 'M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M22 12h-2m-2.314 5.686l1.414 1.414M6.314 17.686L4.9 19.1M12 8l3 4-3 4-3-4 3-4z',
  // Treasure Chest - Baú de tesouro premium elegante (tampa arqueada suave)
  'treasure-chest': 'M5 9.5c0-2.5 2.5-4 7-4s7 1.5 7 4v8.5H5V9.5zm0 0h14M7 13h10M7 16h8M12 9.5v9M10.5 11a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z',
};

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const colorClasses = {
  brand: 'text-brand-400',
  accent: 'text-accent-400',
  red: 'text-red-400',
  green: 'text-brand-400',
  slate: 'text-cream-400',
  gold: 'text-gold-400',
  current: 'text-current',
};

export function PremiumIcon({
  type,
  className,
  size = 'md',
  color = 'current',
}: PremiumIconProps) {
  const path = iconPaths[type] || iconPaths['star']; // Fallback
  const isCircle = type === 'circle-red' || type === 'circle-green';

  // Para círculos, usar fill ao invés de stroke
  if (isCircle) {
    const circleColor = type === 'circle-red' ? 'text-red-500' : 'text-brand-400';
    return (
      <svg
        className={cn(sizeClasses[size], circleColor, className)}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }

  return (
    <svg
      className={cn(sizeClasses[size], colorClasses[color], className)}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

