# Ordem Inédita - Landing Pages A/B Split Test

Projeto Next.js com duas landing pages (A e B) para split test 50/50, com design premium glassmorphism e animações com framer-motion.

## 🚀 Tecnologias

- **Next.js 16** (App Router)
- **TypeScript** (estrito, sem `any`)
- **Tailwind CSS v4** (com design system customizado)
- **Framer Motion** (animações e scroll reveal)
- **React Markdown** (renderização de conteúdo)
- **Vitest** (testes unitários)

## 📁 Estrutura do Projeto

```
src/
├── app/              # Rotas Next.js App Router
│   ├── a/           # Landing A
│   ├── b/           # Landing B
│   └── globals.css  # Design system (cores, tokens, classes)
├── components/      # Componentes React
│   ├── ui/          # Componentes base (GlassPanel, Orbs, etc.)
│   └── landing/     # Componentes específicos das landings
├── content/         # Conteúdo estruturado (TypeScript)
├── lib/             # Utilitários (A/B testing, cn, etc.)
└── middleware.ts   # Lógica de split A/B 50/50
```

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
npm install
```

### Scripts Disponíveis

```bash
# Desenvolvimento (localhost:3000)
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Testes
npm test

# Linter
npm run lint
```

## 🧪 A/B Testing

O split test funciona via middleware que:

1. **Intercepta** requests para `/`
2. **Verifica** cookie `lp_variant` ou query `?ab=a|b`
3. **Sorteia** 50/50 usando `crypto.getRandomValues` se necessário
4. **Faz rewrite** para `/a` ou `/b`
5. **Seta cookie** com maxAge 30 dias

### Override Manual

Para forçar uma variante durante testes:

- `/?ab=a` → Força Landing A
- `/?ab=b` → Força Landing B

O cookie será setado e mantido por 30 dias.

## 🎨 Design System

O design system está definido em `src/app/globals.css` via `@theme` (Tailwind v4):

- **Brand Colors**: Verde principal (#6eff5b)
- **Accent Colors**: Roxo secundário (#7a12ff)
- **Dark Backgrounds**: Tons de charcoal (#1f2121, #262828, etc.)
- **Gold**: Para acentos (#fbbf24, #f59e0b)

### Classes Utilitárias

- `.btn-primary` / `.btn-secondary` / `.btn-outline`
- `.card` / `.card-hover`
- `.glow-button` (efeito glow verde)
- `.float-slow` / `.float-slow-reverse` (animações de orbs)
- `.animate-shimmer` (loading skeleton)

## 📦 Deploy em VPS

### Arquitetura Atual (Coolify + Traefik)

Esta aplicação roda em uma VPS com **Coolify** gerenciando um **Traefik** como reverse proxy principal.

- **Traefik**: Porta 80/443 (gerenciado pelo Coolify via Docker)
- **Aplicação**: PM2 na porta 3001 (host)
- **Domínio**: `passagem.ordeminedita.com.br`

### 1. Configurar PM2

O arquivo `ecosystem.config.cjs` está configurado para rodar na **porta 3001**:

```bash
# Build do projeto
npm run build

# Iniciar aplicação
pm2 start ecosystem.config.cjs

# Salvar configuração para iniciar no boot
pm2 save
pm2 startup
```

### 2. Liberar Porta no Firewall (UFW)

**⚠️ IMPORTANTE**: O firewall deve permitir a porta da aplicação para que o Docker (Traefik) possa acessá-la:

```bash
sudo ufw allow 3001/tcp
```

Sem isso, o Traefik não conseguirá rotear requisições para a aplicação, resultando em **Gateway Timeout**.

### 3. Configurar Traefik (Coolify)

Crie o arquivo de configuração dinâmica em `/data/coolify/proxy/dynamic/passagem.yml`:

```yaml
http:
  routers:
    passagem-http:
      rule: "Host(`passagem.ordeminedita.com.br`)"
      entryPoints:
        - http
      service: passagem
      middlewares:
        - passagem-redirect-https

    passagem-https:
      rule: "Host(`passagem.ordeminedita.com.br`)"
      entryPoints:
        - https
      service: passagem
      tls:
        certResolver: letsencrypt

  middlewares:
    passagem-redirect-https:
      redirectScheme:
        scheme: https
        permanent: true

  services:
    passagem:
      loadBalancer:
        servers:
          - url: "http://host.docker.internal:3001"
```

O Traefik detecta automaticamente novos arquivos `.yml` neste diretório e recarrega a configuração.

### 4. SSL Automático

O Traefik obtém certificados SSL automaticamente via Let's Encrypt usando o resolver `letsencrypt` configurado pelo Coolify. Não é necessário rodar `certbot` manualmente.

### Opção Alternativa: Nginx (Standalone)

Se você não usa Coolify/Traefik, pode configurar Nginx diretamente:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ative o site e configure SSL:

```bash
sudo ln -s /etc/nginx/sites-available/ordem-inedita /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d seu-dominio.com
```

## 📝 Conteúdo

### Landing A

Copy completa em `src/content/landingA.ts` - **PRONTA PARA USO**.

### Landing B

Placeholders em `src/content/landingB.ts` - **SUBSTITUIR COM COPY REAL**.

A estrutura de tipos está em `src/content/types.ts` para garantir consistência.

## 🧪 Testes

```bash
# Rodar testes
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

Testes atuais:
- `lib/ab.ts`: Funções de A/B testing (pickVariant, normalizeVariant)

## 🔧 Configurações Importantes

### TypeScript

- **Strict mode** habilitado
- Sem `any` (exceto quando inevitável e justificado)

### Acessibilidade

- `prefers-reduced-motion` respeitado (animações degradam para opacity-only)
- Foco visível em elementos interativos
- Contraste WCAG AA garantido pelo design system
- Aria labels em botões e links

### Performance

- Middleware com headers `no-store, private` para evitar cache indevido
- Animações otimizadas com framer-motion
- Lazy loading de componentes quando necessário

---

**Desenvolvido com ❤️ para Ordem Inédita**
