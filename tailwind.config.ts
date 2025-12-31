import type { Config } from 'tailwindcss'

/**
 * TAILWIND CSS V4 CONFIGURATION
 * 
 * NOTA IMPORTANTE: No Tailwind CSS v4, as cores customizadas são definidas
 * principalmente no arquivo CSS usando a diretiva @theme (ver app/globals.css).
 * 
 * Este arquivo de configuração é mantido para:
 * - Compatibilidade com ferramentas que dependem do config
 * - Referência das cores da paleta
 * - Configurações adicionais que não são suportadas via @theme
 * 
 * Para adicionar novas cores, edite o @theme em app/globals.css
 */

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /**
         * Paleta de Cores - Referência
         * As cores ativas são definidas em app/globals.css via @theme
         */
        // Verde principal (Ordem Inédita) - #6eff5b
        // Definido em: app/globals.css @theme
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#6eff5b', // Verde customizado
          500: '#6eff5b', // Verde principal
          600: '#5cef4a', // Verde mais escuro para hover
          700: '#4dd43a',
          800: '#166534',
          900: '#145231',
        },
        // Roxo secundário - #7a12ff
        // Definido em: app/globals.css @theme
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#7a12ff', // Roxo customizado
          500: '#7a12ff', // Roxo principal
          600: '#6a0fe6', // Roxo mais escuro para hover
          700: '#5a0dcc',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Gold para badges (opcional - manter para referência)
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },

        // Semantic aliases (referenced from globals.css)
        text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            muted: 'var(--color-text-muted)',
        },
      },
    },
  },
  plugins: [],
}

export default config

