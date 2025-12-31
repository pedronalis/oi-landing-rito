# Refatoração Premium FAQ Section - Plano Aprimorado

## Contexto Atual

A seção FAQ atual (`LandingA.tsx` linhas 957-977) renderiza duas perguntas em cards `GlassPanel` simples:

1. **"Depois eu vejo isso."** - Objeção sobre procrastinação
2. **"Ainda não entendi a Ordem"** - Objeção com CTA implícito no texto

A seção `finalCta` (linhas 982-1009) contém:
- Botão CTA: "QUERO ENTRAR PRA ORDEM"
- Badges: "Multiplicar ROI", "Ganhar Tempo", "Saúde Mental"
- Nota: "*Vai por mim… vai valer a pena* 😉"

## Objetivos de Design

1. **Mover CTA para primeira pergunta**: Integrar o botão, badges e nota dentro da resposta da primeira FAQ
2. **Design Premium & Clean**: Elevar a hierarquia visual sem ser extravagante
3. **Preservação Total**: Manter 100% da copy e estrutura de mensagem
4. **Branding Consistente**: Usar cores brand (#6eff5b) e accent (#7a12ff) existentes
5. **Micro-interações Refinadas**: Animações sutis com Framer Motion
6. **Acessibilidade WCAG AA**: Contraste, navegação por teclado, screen readers
7. **Performance Otimizada**: Lazy loading, code splitting, animações performáticas
8. **SEO Enhanced**: Schema markup FAQ, semântica HTML adequada

## Estrutura Proposta

### Primeira FAQ - "Depois eu vejo isso."
```
┌─────────────────────────────────────┐
│ "Depois eu vejo isso."              │
│                                     │
│ [Texto da resposta]                 │
│                                     │
│ ─────────────────────────────────── │ ← Separador visual
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  QUERO ENTRAR PRA ORDEM         │ │ ← CTA Button
│ └─────────────────────────────────┘ │
│                                     │
│ [Badges: ROI | Tempo | Saúde]       │
│                                     │
│ *Vai por mim… vai valer a pena* 😉  │
└─────────────────────────────────────┘
```

### Segunda FAQ - "Ainda não entendi a Ordem"
```
┌─────────────────────────────────────┐
│ "Ainda não entendi a Ordem"         │
│                                     │
│ [Texto da resposta - sem CTA]      │
└─────────────────────────────────────┘
```

## Implementação Técnica

### Arquivos a Modificar

1. **`src/components/landing/LandingA.tsx`**
   - Refatorar renderização da seção FAQ (linhas 957-977)
   - Integrar CTA dentro da primeira pergunta
   - Adicionar heading hierarchy e semântica HTML
   - Implementar Schema.org JSON-LD
   - Decidir sobre seção finalCta (manter minimalista ou remover)

2. **`src/components/ui/FAQCard.tsx`** (NOVO)
   - Componente premium para cada pergunta FAQ
   - Suporte para CTA integrado
   - Animações refinadas
   - Acessibilidade completa

### Design System a Usar

- **Cores**: `brand-400` (#6eff5b), `accent-400` (#7a12ff), `cream-300` (#e8dfca)
- **Componentes**: `GlassPanel`, `CTAButton`, `CTAHintBadges`, `ScrollReveal`
- **Tipografia**: `font-display` (Bricolage Grotesque) para títulos
- **Ícones**: Lucide React (Clock, HelpCircle, ArrowRight, etc.)

## Detalhes de Implementação

### FAQCard Component (Novo)

```typescript
import type { LucideIcon } from 'lucide-react';

interface FAQCardProps {
  question: string;
  answer: string;
  index: number;
  withCta?: boolean;
  ctaLabel?: string;
  ctaBadges?: string[];
  ctaNote?: string;
  icon?: LucideIcon; // Tipo do lucide-react
  id?: string; // Para schema markup e acessibilidade
}
```

**Características Técnicas**:

- **Semântica HTML**: `<article>` com `<header>` e `<section>` para estrutura semântica
- **Heading Hierarchy**: `<h3>` para perguntas (h2 já usado na seção)
- **ARIA Labels**: `aria-labelledby` e `aria-describedby` para screen readers
- **Schema Markup**: JSON-LD para FAQ (Google rich results)
- **GlassPanel base** com hover refinado
- **Título com ícone opcional** (primeira FAQ) - decorativo com `aria-hidden="true"`
- **Prose** para renderizar markdown da resposta
- **CTA integrado** quando `withCta={true}` com `aria-label` descritivo
- **Separador visual sutil** antes do CTA (linha com `role="separator" aria-orientation="horizontal"`)
- **Animações com ScrollReveal** respeitando `prefers-reduced-motion`
- **Touch Targets**: Mínimo 44x44px para mobile (WCAG)
- **Focus States**: Outline visível para navegação por teclado

### Modificações em LandingA.tsx

1. **Seção FAQ** (linhas 957-977):
   - Substituir mapeamento simples por renderização customizada
   - Envolver em `<section>` com `aria-labelledby="faq-heading"`
   - Adicionar `<h2 id="faq-heading">` oculto visualmente mas acessível (`sr-only`)
   - Primeira FAQ: renderizar com `FAQCard` e `withCta={true}`
   - Segunda FAQ: renderizar com `FAQCard` padrão
   - Adicionar Schema.org JSON-LD para FAQ (Google rich results)

2. **Seção finalCta** (linhas 982-1009):
   - **Opção Recomendada**: Manter como fallback minimalista (apenas botão sem badges/nota)
   - Motivo: Redundância pode ser benéfica para conversão (múltiplos pontos de CTA)
   - Alternativa: Remover se design ficar muito repetitivo

### Schema Markup (SEO)

Adicionar JSON-LD para FAQ schema no componente ou via `next/script`:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Depois eu vejo isso.",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[resposta completa]"
      }
    },
    {
      "@type": "Question",
      "name": "Ainda não entendi a Ordem",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[resposta completa]"
      }
    }
  ]
}
```

### Ícones Lucide Sugeridos

- **Primeira FAQ**: `Clock` ou `Calendar` (procrastinação) - `aria-hidden="true"`
- **Segunda FAQ**: `HelpCircle` ou `Lightbulb` (entendimento) - `aria-hidden="true"`
- **CTA**: `ArrowRight` ou `Sparkles` (ação) - dentro do botão com `aria-hidden="true"`

## Iterações de Design

### Iteração 1: Estrutura Base Premium + Acessibilidade

- **Semântica HTML**: Implementar `<article>`, `<header>`, `<section>` adequados
- **ARIA Labels**: Adicionar labels descritivos em todos os elementos interativos
- **Heading Hierarchy**: Garantir h2 → h3 correto
- Cards com espaçamento generoso (py-8 md:py-10)
- Hierarquia tipográfica refinada
- CTA integrado na primeira resposta com espaçamento adequado
- Badges abaixo do botão
- Nota em itálico sutil
- **Focus States**: Outline visível e customizado para navegação por teclado

### Iteração 2: Elementos Visuais + Performance

- Ícone decorativo sutil na primeira FAQ (ex: Clock da Lucide para "depois")
  - Usar `aria-hidden="true"` em ícones decorativos
- Gradiente sutil no título da primeira FAQ
- Separador visual entre texto e CTA (linha sutil com `role="separator"`)
- Hover states refinados nos cards
- **Lazy Loading**: Componentes abaixo do fold com `React.lazy()` ou `next/dynamic`
- **Image Optimization**: Se houver imagens, usar `next/image` com `loading="lazy"`

### Iteração 3: Micro-interações + SEO

- Stagger animation na entrada dos elementos (respeitando `prefers-reduced-motion`)
- Hover lift no card da primeira FAQ
- Pulse sutil no CTA quando em view (desabilitar se `prefers-reduced-motion`)
- Transições suaves entre estados
- **Schema Markup**: Implementar JSON-LD para FAQ
- **Meta Tags**: Verificar se FAQ section tem meta description adequada

### Iteração 4: Refinamento Final + Validação

- Ajuste de espaçamentos e proporções
- **Contraste WCAG AA**: Validar todos os textos (mínimo 4.5:1 para texto normal)
- **Touch Targets**: Garantir mínimo 44x44px em mobile
- Teste de responsividade mobile (320px, 375px, 768px, 1024px, 1280px)
- Ajuste fino de animações
- **Lighthouse Audit**: Performance, Acessibilidade, SEO, Best Practices
- **Screen Reader Test**: Validar com NVDA/JAWS/VoiceOver
- **Keyboard Navigation**: Testar fluxo completo apenas com teclado

## Considerações de UX/Neurodesign

1. **Hierarquia Visual**:
   - Título em destaque (tamanho maior, peso bold)
   - Texto da resposta com line-height generoso
   - CTA como ponto focal (botão com glow sutil)
   - Badges como prova social visual
   - Nota como fechamento empático

2. **Fluxo de Atenção**:
   - Leitura natural: Título → Texto → CTA → Badges → Nota
   - CTA posicionado após a objeção ser respondida
   - Espaçamento adequado para respiração visual

3. **Cores e Contraste**:
   - Verde brand para CTA (ação principal)
   - Badges multicoloridas para diferenciação
   - Texto cream para legibilidade
   - Background dark para profundidade

## Checklist de Qualidade

### Conteúdo e Design
- [ ] Copy 100% preservada (texto exato, emojis, formatação)
- [ ] CTA movido para primeira FAQ
- [ ] Design premium e clean (sem extravagâncias)
- [ ] Consistência com design system (cores, tipografia, espaçamentos)

### Acessibilidade (WCAG 2.1 AA)
- [ ] Contraste de texto mínimo 4.5:1 (normal) e 3:1 (grande)
- [ ] Navegação por teclado funcional (Tab, Enter, Esc)
- [ ] Focus states visíveis e customizados
- [ ] ARIA labels em elementos interativos
- [ ] Heading hierarchy correta (h2 → h3)
- [ ] Semântica HTML adequada (`<article>`, `<section>`, etc.)
- [ ] Screen reader friendly (testado com NVDA/VoiceOver)
- [ ] Touch targets mínimo 44x44px em mobile
- [ ] `prefers-reduced-motion` respeitado

### Performance
- [ ] Lazy loading de componentes abaixo do fold
- [ ] Animações otimizadas (GPU-accelerated quando possível)
- [ ] Code splitting adequado
- [ ] Lighthouse Performance score > 90
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Time to Interactive (TTI) < 3.8s

### SEO
- [ ] Schema.org FAQ markup implementado
- [ ] Heading hierarchy semântica
- [ ] Meta description adequada (se aplicável)
- [ ] URLs e IDs semânticos
- [ ] Lighthouse SEO score > 90

### Responsividade
- [ ] Mobile-first approach
- [ ] Breakpoints testados: 320px, 375px, 768px, 1024px, 1280px
- [ ] Touch interactions funcionais
- [ ] Texto legível em todos os tamanhos
- [ ] Layout não quebra em nenhum viewport

### TypeScript
- [ ] Tipos bem definidos (sem `any` desnecessário)
- [ ] Interfaces exportadas e reutilizáveis
- [ ] Props tipadas corretamente
- [ ] Sem erros de tipo no build

### Testes
- [ ] Testes visuais em diferentes navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Testes em diferentes dispositivos (mobile, tablet, desktop)
- [ ] Validação de acessibilidade (axe DevTools)
- [ ] Performance profiling (React DevTools Profiler)

## Próximos Passos (Ordem de Execução)

### Fase 1: Estrutura Base
1. Criar componente `FAQCard.tsx` com TypeScript completo
2. Implementar semântica HTML e ARIA labels
3. Refatorar renderização em `LandingA.tsx`
4. Adicionar heading hierarchy correta

### Fase 2: Design e Visual
5. Aplicar estilos premium (espaçamentos, tipografia, cores)
6. Integrar ícones Lucide apropriados
7. Implementar separadores visuais
8. Testar primeira iteração visualmente

### Fase 3: Interatividade
9. Implementar animações com ScrollReveal
10. Adicionar hover states refinados
11. Configurar `prefers-reduced-motion`
12. Testar micro-interações

### Fase 4: Acessibilidade e SEO
13. Adicionar Schema.org JSON-LD
14. Validar contraste de cores (WCAG AA)
15. Testar navegação por teclado
16. Validar com screen readers

### Fase 5: Performance e Otimização
17. Implementar lazy loading onde necessário
18. Otimizar animações (GPU acceleration)
19. Code splitting se necessário
20. Lighthouse audit completo

### Fase 6: Validação Final
21. Testes cross-browser
22. Testes responsivos (múltiplos dispositivos)
23. Validação de acessibilidade (axe DevTools)
24. Performance profiling
25. Ajustes finais baseados em resultados

## Boas Práticas Aplicadas

### Acessibilidade
- Semântica HTML5 (`<article>`, `<section>`, `<header>`)
- ARIA labels descritivos
- Heading hierarchy lógica
- Contraste WCAG AA
- Navegação por teclado completa
- Suporte a screen readers

### Performance
- Lazy loading de componentes não críticos
- Animações GPU-accelerated
- Code splitting estratégico
- Otimização de re-renders (React.memo se necessário)

### SEO
- Schema.org FAQ markup
- Heading hierarchy semântica
- Estrutura HTML semântica

### TypeScript
- Tipos explícitos e reutilizáveis
- Interfaces bem definidas
- Zero `any` desnecessários

### Responsividade
- Mobile-first approach
- Breakpoints consistentes com design system
- Touch targets adequados (44x44px mínimo)

## Referências Técnicas

### Componentes Existentes a Reutilizar
- `GlassPanel`: Base para cards FAQ
- `CTAButton`: Botão principal com glow
- `CTAHintBadges`: Badges de benefícios
- `ScrollReveal`: Animações de entrada
- `Prose`: Renderização de markdown

### Padrões do Projeto
- Uso de `cn()` do `@/lib/utils` para classes condicionais
- `useReducedMotion()` do framer-motion para acessibilidade
- Estrutura de componentes com `'use client'` quando necessário
- Imports de ícones do `lucide-react`

### Cores do Design System
- Background: `dark` (#1f2121), `dark-50` (#171717)
- Texto: `cream-300` (#e8dfca), `cream-400` (#d9cdae)
- Brand: `brand-400` (#6eff5b)
- Accent: `accent-400` (#7a12ff)
