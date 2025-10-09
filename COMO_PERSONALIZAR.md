# 🎨 Guia de Personalização do Site

## 📋 Índice
1. [Alterando Conteúdo](#alterando-conteúdo)
2. [Mudando Cores](#mudando-cores)
3. [Modificando Layout](#modificando-layout)
4. [Adicionando Novas Seções](#adicionando-novas-seções)
5. [Configurando Emails](#configurando-emails)
6. [Ajustando Preços](#ajustando-preços)

---

## 📝 Alterando Conteúdo

### Arquivo Principal: `/lib/constants.ts`

Este arquivo contém **TODO O CONTEÚDO** do site. Altere aqui para mudar textos, preços, etc.

#### Informações do Workshop
```typescript
export const WORKSHOP_CONFIG = {
  badge: "CURSO ONLINE",           // Badge no topo
  highlight: "PROMOVA-SE",         // Palavra destacada em amarelo
  subtitle: "Você está pronto...", // Subtítulo
  date: "ACESSO IMEDIATO",         // Data do curso
  time: "ENCONTROS MENSAIS",       // Horário
  originalPrice: "R$ 5.964,00",    // Preço original
  price: "12x R$ 497,00",          // Preço parcelado
  priceAlternative: "ou R$ 69,90 por aula", // Preço alternativo
  cta: "QUERO ACESSO IMEDIATO",    // Texto do botão
  note: "⚡ OFERTA ESPECIAL...",   // Nota de rodapé
  bullets: [                        // Bullet points "Você vai descobrir"
    "Como identificar seus pontos cegos profissionais",
    "A comunicação que faz você ser visto como estratégico",
    "Os passos certos para alcançar promoções reais em até 6 meses"
  ],
  image: {
    src: "/artemus-logo.png",      // Caminho do logo
    alt: "Artemus Alachev"         // Texto alternativo
  }
};
```

#### Seção de Problemas
```typescript
export const PROBLEMS_CONTENT = [
  {
    title: "Talento inegável, mas falta de reconhecimento",
    description: "Você sabe que é competente, mas..."
  },
  // ... mais problemas
];
```

#### Seção de E-books
```typescript
export const EBOOKS_CONTENT = {
  ebook1: {
    title: "E-book Comunicação Estratégica",
    price: "R$ 19,90",
    description: "Domine a arte da comunicação...",
    features: [...],
    cta: "QUERO ESTE E-BOOK"
  },
  // ... outros e-books
};
```

### Como Alterar

#### 1. Abrir o arquivo
```bash
nano lib/constants.ts
# ou
code lib/constants.ts
```

#### 2. Localizar a seção
```typescript
// Use Ctrl+F para buscar
// Exemplos de busca:
// - "PROMOVA-SE" para título
// - "497,00" para preço
// - "ACESSO IMEDIATO" para data
```

#### 3. Fazer as alterações
```typescript
// ANTES:
price: "12x R$ 497,00",

// DEPOIS:
price: "12x R$ 399,00",
```

#### 4. Salvar e verificar
```bash
# Reiniciar servidor de desenvolvimento
yarn dev
```

---

## 🎨 Mudando Cores

### Cores Principais

#### Arquivo: `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      'workshop-primary': '#001f31',    // Azul escuro
      'workshop-accent': '#FFCC33',     // Amarelo
      'workshop-section-bg': '#F5F5F5', // Fundo das seções
    }
  }
}
```

### Como Mudar Cores

#### 1. Cor de Fundo Principal
```typescript
// Em tailwind.config.ts
'workshop-primary': '#001f31',  // Sua nova cor aqui

// Ou diretamente nos componentes
// Em hero-section.tsx:
style={{ backgroundColor: '#001f31' }} // Sua nova cor
```

#### 2. Cor de Destaque (Accent)
```typescript
// Em tailwind.config.ts
'workshop-accent': '#FFCC33',  // Sua nova cor de destaque
```

#### 3. Cores dos Botões
```typescript
// Em components/ui/button.tsx
variants: {
  variant: {
    workshop: "bg-gradient-to-r from-yellow-400...", // Altere as cores aqui
  }
}
```

### Exemplos de Paletas

#### Paleta Azul e Laranja
```typescript
'workshop-primary': '#1E3A5F',
'workshop-accent': '#FF6B35',
```

#### Paleta Verde e Amarelo
```typescript
'workshop-primary': '#2D5016',
'workshop-accent': '#FFD700',
```

#### Paleta Roxo e Rosa
```typescript
'workshop-primary': '#4A148C',
'workshop-accent': '#FF4081',
```

---

## 📐 Modificando Layout

### Seções do Site

Cada seção está em `/components/sections/`:

#### 1. Hero Section (Topo)
```bash
components/sections/hero-section.tsx
```

**O que alterar:**
- Grid layout (1 ou 2 colunas)
- Posicionamento do logo
- Tamanho dos cards
- Espaçamentos

**Exemplo:**
```typescript
// Mudar de 2 colunas para 1 coluna
<div className="grid lg:grid-cols-2 gap-12">
// Para:
<div className="grid lg:grid-cols-1 gap-12">
```

#### 2. Problems Section
```bash
components/sections/problems-section.tsx
```

**Alterar:**
- Número de problemas exibidos
- Layout (2 ou 3 colunas)
- Ícones dos problemas

#### 3. E-books Section
```bash
components/sections/ebooks-section.tsx
```

**Alterar:**
- Quantidade de e-books
- Layout dos cards
- Estilos dos botões

#### 4. CTA Section (Formulário)
```bash
components/sections/cta-section.tsx
```

**Alterar:**
- Posição do formulário
- Campos do formulário
- Texto do botão

### Responsividade

#### Breakpoints do Tailwind
```typescript
sm:  // > 640px
md:  // > 768px
lg:  // > 1024px
xl:  // > 1280px
2xl: // > 1536px
```

#### Exemplo de Alteração
```typescript
// Tornar algo visível apenas em desktop
<div className="hidden lg:block">
  Conteúdo apenas desktop
</div>

// Tornar algo visível apenas em mobile
<div className="block lg:hidden">
  Conteúdo apenas mobile
</div>
```

---

## ➕ Adicionando Novas Seções

### Passo a Passo

#### 1. Criar Arquivo da Seção
```bash
# Criar novo arquivo
touch components/sections/nova-secao.tsx
```

#### 2. Template Básico
```typescript
'use client';

import { ScrollReveal } from '@/components/workshop/scroll-reveal';

export function NovaSecao() {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-12">
            Título da Nova Seção
          </h2>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Seu conteúdo aqui */}
        </div>
      </div>
    </section>
  );
}
```

#### 3. Adicionar à Página
```typescript
// Em app/page.tsx
import { NovaSecao } from '@/components/sections/nova-secao';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemsSection />
      <NovaSecao />  {/* Adicione aqui */}
      <EbooksSection />
      <CtaSection />
    </main>
  );
}
```

### Exemplos de Seções Úteis

#### Seção de Depoimentos
```typescript
export function TestimonialsSection() {
  const testimonials = [
    {
      name: "João Silva",
      role: "Gerente de Vendas",
      text: "O curso mudou minha carreira!",
      avatar: "/avatar1.jpg"
    },
    // ... mais depoimentos
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          O que dizem nossos alunos
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <p className="mb-4">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={t.avatar} />
                  </Avatar>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-gray-600">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### Seção de FAQ
```typescript
export function FAQSection() {
  const faqs = [
    {
      question: "Como funciona o curso?",
      answer: "O curso é 100% online..."
    },
    // ... mais perguntas
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          Perguntas Frequentes
        </h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

---

## 📧 Configurando Emails

### Arquivo: `/lib/email/email-service.ts`

#### Provedores Disponíveis

**1. Custom (SMTP)**
```typescript
// Em .env
EMAIL_PROVIDER=custom
EMAIL_FROM=seu@email.com
EMAIL_API_KEY=sua_api_key
EMAIL_API_URL=https://api.seuprovedor.com
```

**2. ConvertKit**
```typescript
// Em .env
EMAIL_PROVIDER=convertkit
EMAIL_FROM=seu@email.com
CONVERTKIT_API_KEY=sua_api_key
```

**3. Mailchimp**
```typescript
// Em .env
EMAIL_PROVIDER=mailchimp
EMAIL_FROM=seu@email.com
MAILCHIMP_API_KEY=sua_api_key
MAILCHIMP_LIST_ID=seu_list_id
```

### Personalizar Templates

#### 1. Email de Boas-vindas
```typescript
// Em lib/email/email-service.ts
async sendWelcomeEmail(to: string, data: any) {
  return this.send({
    to,
    subject: 'Bem-vindo ao Curso!', // Altere aqui
    html: `
      <h1>Olá, ${data.name}!</h1>
      <p>Obrigado por se inscrever...</p>
      // Altere o HTML aqui
    `
  });
}
```

#### 2. Email de Acesso
```typescript
async sendAccessEmail(to: string, data: any) {
  return this.send({
    to,
    subject: 'Seu Acesso está Pronto!',
    html: `
      <h1>Parabéns, ${data.name}!</h1>
      <p>Seu pagamento foi confirmado.</p>
      <a href="${data.accessLink}">Acessar Curso</a>
      // Personalize aqui
    `
  });
}
```

### Adicionar Novo Tipo de Email

```typescript
// Em lib/email/email-service.ts
async sendCustomEmail(to: string, data: any) {
  return this.send({
    to,
    subject: 'Seu Assunto',
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h1>${data.title}</h1>
        <p>${data.message}</p>
      </div>
    `
  });
}
```

---

## 💰 Ajustando Preços

### Arquivo: `/lib/constants.ts`

#### Preço do Curso Principal
```typescript
export const WORKSHOP_CONFIG = {
  originalPrice: "R$ 5.964,00",  // Preço riscado
  price: "12x R$ 497,00",        // Preço parcelado
  priceAlternative: "ou R$ 69,90 por aula", // Alternativa
};
```

#### Preços dos E-books
```typescript
export const EBOOKS_CONTENT = {
  ebook1: {
    originalPrice: "R$ 29,90",
    price: "R$ 19,90",
  },
  ebook2: {
    originalPrice: "R$ 29,90",
    price: "R$ 19,90",
  },
  bundle: {
    originalPrice: "R$ 6.023,80",
    price: "R$ 497,00",
  }
};
```

### Atualizar em Múltiplos Lugares

Quando alterar preços, verificar também:

1. **constants.ts** - Todos os preços exibidos
2. **checkout/page.tsx** - Valores para cálculo
3. **payment/page.tsx** - Valores do PIX
4. **emails** - Preços mencionados nos emails

### Script para Atualizar Preços

```bash
# Buscar todos os lugares com o preço
grep -r "497,00" lib/ components/ app/

# Substituir automaticamente (use com cuidado!)
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/497,00/599,00/g' {} +
```

---

## 🖼️ Alterando Imagens

### Logo
```bash
# Substituir logo
cp novo-logo.png public/artemus-logo.png

# Ou alterar referência em constants.ts
image: {
  src: "/novo-logo.png",
  alt: "Novo Logo"
}
```

### Adicionar Imagens de Fundo
```typescript
// Em qualquer componente
<div 
  className="bg-cover bg-center" 
  style={{ backgroundImage: 'url(/caminho/da/imagem.jpg)' }}
>
  Conteúdo
</div>
```

### Otimização de Imagens

Next.js otimiza automaticamente com `<Image>`:

```typescript
import Image from 'next/image';

<Image
  src="/imagem.jpg"
  alt="Descrição"
  width={800}
  height={600}
  priority // Se for imagem importante
/>
```

---

## 🔍 Testando Alterações

### Ambiente de Desenvolvimento
```bash
yarn dev
# Acesse http://localhost:3000
# Alterações aparecem automaticamente (hot reload)
```

### Build de Produção
```bash
yarn build
yarn start
# Teste como será em produção
```

### Checklist Antes de Deploy
- [ ] Testar em mobile
- [ ] Testar em tablet
- [ ] Testar em desktop
- [ ] Verificar todos os links
- [ ] Testar formulários
- [ ] Testar checkout e pagamento
- [ ] Verificar emails
- [ ] Checar performance (Lighthouse)

---

## 📚 Recursos Adicionais

### Documentação
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Prisma](https://www.prisma.io/docs)

### Ferramentas Úteis
- [Coolors](https://coolors.co) - Paletas de cores
- [Google Fonts](https://fonts.google.com) - Fontes
- [Unsplash](https://unsplash.com) - Imagens gratuitas
- [SVG Icons](https://lucide.dev) - Ícones

---

**💡 Dica:** Sempre faça backup antes de fazer alterações significativas!

```bash
# Fazer backup
cp -r backup_promova_se_clone backup_promova_se_clone_$(date +%Y%m%d)
```
