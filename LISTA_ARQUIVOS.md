# Lista Completa de Arquivos do Projeto

## 📂 Estrutura Detalhada

### 🎯 Arquivos de Configuração Raiz
- `package.json` - Dependências e scripts do projeto
- `tsconfig.json` - Configuração do TypeScript
- `tailwind.config.ts` - Configuração do Tailwind CSS
- `next.config.js` - Configuração do Next.js
- `postcss.config.js` - Configuração do PostCSS
- `components.json` - Configuração do Shadcn UI
- `.env` - Variáveis de ambiente
- `.yarnrc.yml` - Configuração do Yarn

### 📱 Páginas da Aplicação (/app)
- `layout.tsx` - Layout principal do app
- `page.tsx` - Página inicial (landing page)
- `globals.css` - Estilos globais

#### Páginas Específicas
- `checkout/page.tsx` - Página de checkout
- `payment/page.tsx` - Página de pagamento PIX
- `select-theme/page.tsx` - Seleção de tema

### 🔌 APIs (/app/api)
- `auth/[...nextauth]/route.ts` - Autenticação NextAuth
- `leads/route.ts` - Captura de leads
- `signup/route.ts` - Cadastro de usuários
- `upload-receipt/route.ts` - Upload de comprovantes
- `send-abandonment-email/route.ts` - Email de carrinho abandonado
- `send-access-email/route.ts` - Email de acesso ao conteúdo

### 🧩 Componentes (/components)

#### Seções da Landing Page (/components/sections)
- `hero-section.tsx` - Seção hero com título e preço
- `problems-section.tsx` - Seção de problemas
- `learning-section.tsx` - Seção de aprendizado
- `ebooks-section.tsx` - Seção de e-books
- `cta-section.tsx` - Seção de call-to-action com formulário
- `footer.tsx` - Rodapé do site

#### Componentes de Checkout (/components/checkout)
- `checkout-form.tsx` - Formulário de checkout

#### Componentes de Pagamento (/components/payment)
- `payment-page.tsx` - Página de pagamento básica
- `payment-page-advanced.tsx` - Página de pagamento avançada

#### Componentes Workshop (/components/workshop)
- `animated-counter.tsx` - Contador animado
- `lead-capture-form.tsx` - Formulário de captura de leads
- `price.tsx` - Componente de preço
- `scroll-reveal.tsx` - Animação de scroll reveal

#### Componentes de Tema
- `theme-provider.tsx` - Provedor de tema
- `theme/theme-selection-page.tsx` - Seleção de tema

#### Componentes UI (/components/ui)
**Shadcn UI Components (52 componentes)**:
- `accordion.tsx` - Acordeão
- `alert-dialog.tsx` - Diálogo de alerta
- `alert.tsx` - Alerta
- `aspect-ratio.tsx` - Proporção de aspecto
- `avatar.tsx` - Avatar
- `badge.tsx` - Badge
- `breadcrumb.tsx` - Breadcrumb
- `button.tsx` - Botão
- `calendar.tsx` - Calendário
- `card.tsx` - Card
- `carousel.tsx` - Carrossel
- `checkbox.tsx` - Checkbox
- `collapsible.tsx` - Colapsível
- `command.tsx` - Command palette
- `context-menu.tsx` - Menu de contexto
- `date-range-picker.tsx` - Seletor de intervalo de datas
- `dialog.tsx` - Diálogo
- `drawer.tsx` - Drawer
- `dropdown-menu.tsx` - Menu dropdown
- `form.tsx` - Formulário
- `hover-card.tsx` - Card hover
- `input-otp.tsx` - Input OTP
- `input.tsx` - Input
- `label.tsx` - Label
- `menubar.tsx` - Menu bar
- `navigation-menu.tsx` - Menu de navegação
- `pagination.tsx` - Paginação
- `popover.tsx` - Popover
- `progress.tsx` - Barra de progresso
- `radio-group.tsx` - Grupo de radio
- `resizable.tsx` - Redimensionável
- `scroll-area.tsx` - Área de scroll
- `select.tsx` - Select
- `separator.tsx` - Separador
- `sheet.tsx` - Sheet
- `skeleton.tsx` - Skeleton loading
- `slider.tsx` - Slider
- `sonner.tsx` - Toast sonner
- `switch.tsx` - Switch
- `table.tsx` - Tabela
- `tabs.tsx` - Tabs
- `task-card.tsx` - Card de tarefa
- `textarea.tsx` - Textarea
- `toast.tsx` - Toast
- `toaster.tsx` - Toaster
- `toggle-group.tsx` - Grupo de toggle
- `toggle.tsx` - Toggle
- `tooltip.tsx` - Tooltip
- `use-toast.ts` - Hook de toast

### 🔧 Bibliotecas e Utilitários (/lib)

#### Arquivos Principais
- `auth.ts` - Configuração de autenticação
- `constants.ts` - Constantes do projeto
- `db.ts` - Configuração do banco de dados
- `types.ts` - Tipos TypeScript
- `utils.ts` - Funções utilitárias
- `validations.ts` - Validações Zod

#### Sistema de Email (/lib/email)
- `email-service.ts` - Serviço de email principal
- `types.ts` - Tipos de email
- `providers/base.ts` - Provider base
- `providers/custom.ts` - Provider customizado
- `providers/convertkit.ts` - Provider ConvertKit
- `providers/mailchimp.ts` - Provider Mailchimp

### 🗄️ Banco de Dados

#### Prisma
- `prisma/schema.prisma` - Schema do banco de dados

#### Scripts
- `scripts/seed.ts` - Seed do banco de dados

### 🪝 Hooks Customizados (/hooks)
- `use-toast.ts` - Hook de toast

### 🖼️ Assets Públicos (/public)
- `artemus-logo.png` - Logotipo do Artemus Alachev

---

## 📊 Estatísticas do Projeto

### Por Tipo de Arquivo
- **TypeScript/TSX**: ~80 arquivos
- **JSON**: 2 arquivos (package.json, components.json)
- **CSS**: 1 arquivo (globals.css)
- **Prisma**: 1 arquivo (schema.prisma)
- **Markdown**: 3 arquivos (README, LISTA_ARQUIVOS, ESTRUTURA_PROJETO)

### Por Categoria
- **Componentes UI**: 52 componentes
- **Seções**: 6 seções
- **Páginas**: 4 páginas
- **APIs**: 6 rotas
- **Utilitários**: 10+ funções
- **Hooks**: 2 hooks
- **Providers de Email**: 4 providers

### Linhas de Código (Aproximado)
- **TypeScript/TSX**: ~8,000 linhas
- **CSS**: ~300 linhas
- **Configurações**: ~500 linhas
- **Total**: ~8,800 linhas

---

## 🎯 Arquivos Críticos para Funcionamento

### Essenciais
1. `app/layout.tsx` - Layout principal
2. `app/page.tsx` - Página inicial
3. `lib/constants.ts` - Constantes do projeto
4. `prisma/schema.prisma` - Schema do banco
5. `.env` - Variáveis de ambiente

### Importantes para Funcionalidades
1. `app/api/auth/[...nextauth]/route.ts` - Autenticação
2. `app/checkout/page.tsx` - Checkout
3. `app/payment/page.tsx` - Pagamento
4. `components/sections/*` - Todas as seções
5. `lib/email/email-service.ts` - Sistema de emails

### Configurações Necessárias
1. `package.json` - Dependências
2. `tsconfig.json` - TypeScript
3. `tailwind.config.ts` - Estilos
4. `next.config.js` - Next.js

---

## 🔍 Como Navegar no Projeto

### Para Editar Conteúdo
→ Vá para `/lib/constants.ts`

### Para Modificar Seções
→ Vá para `/components/sections/`

### Para Ajustar Estilos
→ Vá para `app/globals.css` e `tailwind.config.ts`

### Para Modificar Banco de Dados
→ Vá para `prisma/schema.prisma`

### Para Configurar Emails
→ Vá para `/lib/email/`

### Para Ajustar APIs
→ Vá para `/app/api/`

---

**Total de Arquivos: ~90+**
**Tamanho Compactado: ~1.5 MB**
**Tamanho Descompactado: ~5 MB (sem node_modules)**
