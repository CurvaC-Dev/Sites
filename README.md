# Promova-se em 6 Meses - Site Completo

## 📋 Descrição do Projeto

Site de landing page para curso online "Promova-se em 6 Meses" desenvolvido com Next.js 14, incluindo:

- Landing page completa com seções hero, problemas, aprendizado, e-books e CTA
- Sistema de checkout e pagamento com PIX
- Integração com banco de dados PostgreSQL via Prisma
- Sistema de autenticação com NextAuth
- Captura de leads e envio de emails automatizados
- Funil de vendas completo com emails de carrinho abandonado
- Design responsivo e otimizado para todos os dispositivos
- Cor de fundo personalizada (#001f31)

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14.2.28
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **UI Components**: Shadcn/UI + Radix UI
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: NextAuth.js
- **Email**: Sistema de email service customizável
- **Animações**: Framer Motion
- **Gerenciador de Pacotes**: Yarn

## 📁 Estrutura do Projeto

```
/app
  /api                    # Rotas da API
    /auth                 # Autenticação
    /leads                # Captura de leads
    /send-*-email         # Envio de emails
    /signup               # Cadastro
    /upload-receipt       # Upload de comprovantes
  /checkout               # Página de checkout
  /payment                # Página de pagamento
  globals.css             # Estilos globais
  layout.tsx              # Layout principal
  page.tsx                # Página inicial

/components
  /checkout               # Componentes de checkout
  /payment                # Componentes de pagamento
  /sections               # Seções da landing page
    - cta-section.tsx
    - ebooks-section.tsx
    - footer.tsx
    - hero-section.tsx
    - learning-section.tsx
    - problems-section.tsx
  /ui                     # Componentes UI (Shadcn)
  /workshop               # Componentes específicos do workshop
    - animated-counter.tsx
    - lead-capture-form.tsx
    - price.tsx
    - scroll-reveal.tsx

/lib
  /email                  # Serviço de email
    /providers            # Provedores de email
  auth.ts                 # Configuração de autenticação
  constants.ts            # Constantes do projeto
  db.ts                   # Configuração do banco de dados
  types.ts                # Tipos TypeScript
  utils.ts                # Funções utilitárias
  validations.ts          # Validações de formulários

/prisma
  schema.prisma           # Schema do banco de dados

/public
  artemus-logo.png        # Logotipo do site
```

## 🚀 Como Instalar e Executar

### 1. Pré-requisitos

- Node.js 20.x ou superior
- Yarn 1.22.x ou superior
- PostgreSQL 14.x ou superior

### 2. Instalação

```bash
# Clone ou extraia os arquivos do projeto
cd promova_se_clone

# Instale as dependências
yarn install
```

### 3. Configuração do Banco de Dados

```bash
# Configure a variável de ambiente DATABASE_URL no arquivo .env
# Exemplo:
DATABASE_URL="postgresql://user:password@localhost:5432/promova_se?schema=public"

# Execute as migrations
yarn prisma generate
yarn prisma db push

# (Opcional) Execute o seed para dados de teste
yarn prisma db seed
```

### 4. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/promova_se?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (opcional - configure conforme seu provedor)
EMAIL_PROVIDER="custom"
EMAIL_FROM="seu-email@dominio.com"
EMAIL_API_KEY="sua-api-key"
```

### 5. Executar o Projeto

```bash
# Modo desenvolvimento
yarn dev

# Build para produção
yarn build

# Executar produção
yarn start
```

O site estará disponível em `http://localhost:3000`

## 🎨 Cores e Design

### Cores Principais
- **Primária**: #001f31 (Azul escuro)
- **Accent**: #FFCC33 (Amarelo)
- **Secundária**: Gradiente azul-roxo-azul

### Responsividade
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 📦 Dependências Principais

```json
{
  "next": "14.2.28",
  "react": "18.2.0",
  "@prisma/client": "6.7.0",
  "next-auth": "4.24.11",
  "tailwindcss": "3.3.3",
  "@radix-ui/*": "^1.x",
  "framer-motion": "10.18.0",
  "zod": "3.23.8"
}
```

## 🔐 Autenticação

O projeto usa NextAuth.js para autenticação. Configuração em:
- `/lib/auth.ts` - Configuração principal
- `/app/api/auth/[...nextauth]/route.ts` - Rotas de autenticação

## 💳 Sistema de Pagamento

### Fluxo de Checkout
1. Seleção de produto (curso completo ou e-books)
2. Formulário de dados do cliente
3. Geração de QR Code PIX
4. Upload de comprovante
5. Envio de email de acesso

### Páginas
- `/checkout` - Formulário de checkout
- `/payment` - Página de pagamento com PIX

## 📧 Sistema de Emails

Localizado em `/lib/email/`:
- **email-service.ts**: Serviço principal
- **providers/**: Provedores de email (Custom, ConvertKit, Mailchimp)

### Tipos de Email
- Email de boas-vindas
- Email de acesso ao conteúdo
- Email de carrinho abandonado

## 🗄️ Banco de Dados

### Modelos Principais (Prisma)
- **User**: Usuários do sistema
- **Lead**: Leads capturados
- **Purchase**: Compras realizadas
- **EmailLog**: Log de emails enviados

## 🎯 Funcionalidades

### Landing Page
- ✅ Seção Hero com informações do curso
- ✅ Seção de Problemas
- ✅ Seção de Aprendizado
- ✅ Seção de E-books
- ✅ Seção CTA com formulário

### Sistema de Vendas
- ✅ Checkout completo
- ✅ Pagamento via PIX
- ✅ Upload de comprovante
- ✅ Emails automatizados
- ✅ Carrinho abandonado

### Administração
- ✅ Dashboard (futuro)
- ✅ Gerenciamento de leads
- ✅ Relatórios de vendas

## 📱 Responsividade

O site é 100% responsivo e otimizado para:
- Smartphones (iOS e Android)
- Tablets
- Desktops
- Telas grandes (4K)

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
yarn dev                  # Inicia servidor de desenvolvimento
yarn build                # Build para produção
yarn start                # Inicia servidor de produção

# Banco de Dados
yarn prisma generate      # Gera cliente Prisma
yarn prisma db push       # Aplica schema ao banco
yarn prisma studio        # Interface visual do banco

# Código
yarn lint                 # Lint do código
yarn type-check           # Verifica tipos TypeScript
```

## 🐛 Troubleshooting

### Erro de Conexão com Banco
```bash
# Verifique se o PostgreSQL está rodando
sudo service postgresql status

# Verifique a URL de conexão no .env
echo $DATABASE_URL
```

### Erro de Build
```bash
# Limpe cache e reinstale
rm -rf .next node_modules
yarn install
yarn build
```

### Problemas com Prisma
```bash
# Regenere o cliente
yarn prisma generate
yarn prisma db push --force-reset
```

## 📄 Licença

Este projeto é proprietário e confidencial.

## 👥 Suporte

Para dúvidas e suporte, contate o desenvolvedor original.

## 📝 Notas de Versão

### v1.0.0 (Atual)
- Landing page completa e responsiva
- Sistema de checkout e pagamento
- Integração com banco de dados
- Sistema de emails automatizados
- Funil de vendas completo
- Design otimizado para conversão

---

**Desenvolvido com ❤️ para Artemus Alachev**
