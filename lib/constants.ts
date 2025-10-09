
// Site content and configuration constants
export const SITE_CONFIG = {
  name: "Workshop: Promova-se em 6 Meses",
  description: "Transforme seu talento em reconhecimento. Workshop online dia 29/07 às 19h.",
  author: "Artemus Alachev",
  authorTitle: "Especialista em Desenvolvimento Profissional e Liderança",
  url: "https://promova-se.com",
  ogImage: "/og-image.png",
} as const;

export const WORKSHOP_CONFIG = {
  badge: "CURSO ONLINE",
  title: "CURSO: PROMOVA-SE EM 6 MESES",
  highlight: "PROMOVA-SE",
  subtitle: "Você está pronto para ser reconhecido pelo seu talento?",
  date: "ACESSO IMEDIATO",
  time: "ENCONTROS MENSAIS",
  originalPrice: "R$ 5.964,00",
  price: "12x R$ 497,00",
  priceAlternative: "R$ 69,90 por aula",
  cta: "QUERO ACESSO IMEDIATO",
  note: "⚡ OFERTA ESPECIAL - COMECE AGORA",
  bullets: [
    "Como identificar seus pontos cegos profissionais",
    "A comunicação que faz você ser visto como estratégico",
    "Os passos certos para alcançar promoções reais em até 6 meses"
  ],
  image: {
    src: "/artemus-logo.png",
    alt: "Artemus Alachev - Consultoria, Treinamento e Palestras"
  }
} as const;

export const PROBLEMS_CONTENT = [
  {
    title: "Talento inegável, mas falta de reconhecimento",
    description: "Você sabe que é competente, mas parece que ninguém nota seu trabalho"
  },
  {
    title: "Competência técnica não é garantia de vitória",
    description: "Ser o melhor tecnicamente não garante a promoção que você merece"
  },
  {
    title: "Dificuldade em comunicar e se posicionar",
    description: "Você trabalha muito, mas não consegue mostrar seu valor estratégico"
  },
  {
    title: "Limitações invisíveis na carreira",
    description: "Pontos cegos que você não consegue identificar estão limitando seu crescimento"
  }
] as const;

export const LEARNING_CONTENT = [
  {
    icon: "🎯",
    title: "Identifique seus pontos cegos profissionais",
    description: "Descubra aquilo que você não vê em si, mas que impacta diretamente sua carreira e reconhecimento"
  },
  {
    icon: "💼",
    title: "Comunicação Estratégica",
    description: "3 Níveis de Comunicação: Operacional, Tático e Estratégico para ser visto como líder"
  },
  {
    icon: "📈",
    title: "Método ROMA para Promoções",
    description: "Passos certos aplicando Resultados, Oportunidades, Método e Ação para alcançar promoções em até 6 meses"
  },
  {
    icon: "🌟",
    title: "Visibilidade Estratégica",
    description: "Compartilhamento estratégico de valor, focado em alto impacto e acesso aos tomadores de decisão"
  },
  {
    icon: "🤝",
    title: "Influência Autêntica",
    description: "Construção de confiança e valor compartilhado através de reciprocidade e escuta ativa"
  },
  {
    icon: "⚡",
    title: "Ação Consistente",
    description: "Transforme insights em ações diárias e hábitos duradouros para o crescimento profissional"
  }
] as const;

export const EBOOKS_CONTENT = {
  items: [
    {
      id: 'ebook-comunicacao',
      title: "E-book 1: Comunicação Estratégica",
      description: "Guia completo sobre os 3 níveis de comunicação e como aplicá-los para ser reconhecido como estratégico",
      originalPrice: "R$ 47,00",
      price: "R$ 19,90",
      priceNumber: 19.90,
      pixCode: "00020126360014br.gov.bcb.pix011433862520000162520400005303986540519.905802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop16304AD1F",
      cta: "COMPRAR SEPARADO",
      note: "Ou GRÁTIS no curso completo"
    },
    {
      id: 'ebook-roma',
      title: "E-book 2: Método ROMA Detalhado",
      description: "Manual prático com exercícios e templates para aplicar o Método ROMA e acelerar suas promoções",
      originalPrice: "R$ 47,00",
      price: "R$ 19,90",
      priceNumber: 19.90,
      pixCode: "00020126360014br.gov.bcb.pix011433862520000162520400005303986540519.905802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop16304AD1F",
      cta: "COMPRAR SEPARADO",
      note: "Ou GRÁTIS no curso completo"
    }
  ],
  combo: {
    id: 'combo-ebooks-aula',
    title: "Combo: 2 E-books + Primeira Aula",
    subtitle: "🎁 Experimente o método antes de se comprometer",
    description: "Ambos e-books + primeira aula do curso como degustação",
    originalPrice: "R$ 109,70",
    price: "R$ 59,90",
    priceNumber: 59.90,
    pixCode: "00020126360014br.gov.bcb.pix011433862520000162520400005303986540559.905802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop16304E7C8",
    cta: "QUERO O COMBO",
    highlight: "MAIS POPULAR"
  },
  aulaEletiva: {
    id: 'aula-eletiva',
    title: "Aula Eletiva Temática",
    subtitle: "Escolha o tema que mais precisa",
    description: "Uma aula específica sobre o tema de sua escolha do curso completo",
    originalPrice: "R$ 97,00",
    price: "R$ 69,90",
    priceNumber: 69.90,
    pixCode: "00020126360014br.gov.bcb.pix011433862520000162520400005303986540569.905802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop36304D09D",
    cta: "ESCOLHER TEMA",
    highlight: "PERSONALIZADO"
  },
  bundle: {
    id: 'curso-completo',
    title: "Curso Completo + E-books GRÁTIS",
    subtitle: "🎁 Economize R$ 39,80 nos e-books",
    originalPrice: "R$ 6.058,00",
    price: "12x R$ 497,00",
    priceNumber: 497.00,
    priceTotal: 5964.00,
    pixCode: "00020126360014br.gov.bcb.pix0114338625200001625204000053039865406497.005802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop46304E9E4",
    savings: "R$ 39,80",
    cta: "QUERO O CURSO COMPLETO",
    highlight: "MELHOR OFERTA"
  }
} as const;

export const FINAL_CTA_CONTENT = {
  title: "Transforme seu talento em reconhecimento",
  subtitle: "Assuma o controle da sua narrativa profissional e obtenha o mapa para o reconhecimento que você merece",
  facts: [
    { label: "Acesso", value: "IMEDIATO" },
    { label: "Encontros", value: "MENSAIS" },
    { label: "Formato", value: "Online (100% Digital)" }
  ],
  originalPrice: "R$ 5.964,00",
  price: "12x R$ 497,00",
  priceAlternative: "R$ 69,90 por aula",
  cta: "GARANTIR ACESSO AGORA",
  bullets: [
    "⚡ OFERTA ESPECIAL ⚡",
    "Acesso imediato à plataforma",
    "Material de apoio incluído",
    "Certificado de conclusão"
  ]
} as const;

export const FOOTER_CONTENT = {
  name: "Artemus Alachev",
  description: "Especialista em Desenvolvimento Profissional e Liderança",
  rights: "© 2024 Workshop Promova-se em 6 Meses. Todos os direitos reservados."
} as const;

// Lead sources
export const LEAD_SOURCES = {
  CURSO: 'curso',
  EBOOK_COMUNICACAO: 'ebook-comunicacao',
  EBOOK_ROMA: 'ebook-roma',
  BUNDLE_COMPLETO: 'bundle-completo',
  CONTACT: 'contact'
} as const;

// Products configuration
export const PRODUCTS = {
  CURSO_COMPLETO: {
    id: 'curso-completo',
    name: 'Curso Promova-se em 6 Meses + E-books GRÁTIS',
    price: 497.00,
    installments: 12,
    pixCode: "00020126360014br.gov.bcb.pix0114338625200001625204000053039865406497.005802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop46304E9E4",
    description: 'Primeira mensalidade do curso completo com encontros mensais + ambos e-books inclusos',
    deliveryType: 'course_access'
  },
  EBOOK_COMUNICACAO: {
    id: 'ebook-comunicacao',
    name: 'E-book Comunicação Estratégica',
    price: 19.90,
    pixCode: "00020126360014br.gov.bcb.pix011433862520000162520400005303986540519.905802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop16304AD1F",
    description: 'Guia completo sobre os 3 níveis de comunicação',
    deliveryType: 'ebook_download'
  },
  EBOOK_ROMA: {
    id: 'ebook-roma',
    name: 'E-book Método ROMA Detalhado',
    price: 19.90,
    pixCode: "00020126360014br.gov.bcb.pix011433862520000162520400005303986540519.905802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop16304AD1F",
    description: 'Manual prático com exercícios e templates',
    deliveryType: 'ebook_download'
  },
  COMBO_EBOOKS_AULA: {
    id: 'combo-ebooks-aula',
    name: 'Combo: 2 E-books + Primeira Aula',
    price: 59.90,
    pixCode: "00020126360014br.gov.bcb.pix011433862520000162520400005303986540559.905802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop16304E7C8",
    description: 'Ambos e-books + primeira aula do curso como degustação',
    deliveryType: 'combo_access'
  },
  AULA_ELETIVA: {
    id: 'aula-eletiva',
    name: 'Aula Eletiva Temática',
    price: 69.90,
    pixCode: "00020126360014br.gov.bcb.pix011433862520000162520400005303986540569.905802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop36304D09D",
    description: 'Uma aula específica sobre o tema de sua escolha do curso completo',
    deliveryType: 'single_class_access'
  }
} as const;

// Email templates para o funil
export const EMAIL_TEMPLATES = {
  ABANDONMENT_REMINDER: {
    subject: "🔔 Você esqueceu de finalizar sua compra - Artemus Alachev",
    html: `
      <h2>Olá! Notamos que você estava interessado em nosso conteúdo...</h2>
      <p>Que tal finalizar sua compra e começar sua transformação profissional ainda hoje?</p>
      <p>Clique no link abaixo para voltar e completar o pagamento:</p>
      <a href="{{checkout_link}}" style="background: #FFB800; color: #1a2b3d; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Finalizar Compra</a>
    `
  },
  EBOOK_ACCESS: {
    subject: "🎉 Seu e-book está pronto! - Artemus Alachev",
    html: `
      <h2>Parabéns pela sua compra!</h2>
      <p>Seu e-book já está disponível para download:</p>
      <a href="{{download_link}}" style="background: #FFB800; color: #1a2b3d; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Download E-book</a>
    `
  },
  COURSE_ACCESS: {
    subject: "🚀 Bem-vindo ao Curso Promova-se em 6 Meses! - Artemus Alachev",
    html: `
      <h2>Bem-vindo(a) ao curso!</h2>
      <p>Seu acesso ao curso já está liberado:</p>
      <a href="{{course_link}}" style="background: #FFB800; color: #1a2b3d; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Acessar Curso</a>
      <p>Você também recebeu os e-books gratuitamente:</p>
      <ul>
        <li><a href="{{ebook1_link}}">E-book Comunicação Estratégica</a></li>
        <li><a href="{{ebook2_link}}">E-book Método ROMA</a></li>
      </ul>
    `
  }
} as const;
