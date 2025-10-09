
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, Target, Users, MessageSquare, TrendingUp, Award, Lightbulb } from 'lucide-react';
import Link from 'next/link';

const THEMES = [
  {
    id: 'comunicacao-estrategica',
    title: 'Comunicação Estratégica',
    icon: MessageSquare,
    description: 'Aprenda os 3 níveis de comunicação para ser visto como líder estratégico',
    duration: '90 min',
    level: 'Intermediário',
    highlights: [
      'Comunicação Operacional vs Estratégica',
      'Como falar a linguagem da liderança',
      'Técnicas de persuasão executiva'
    ]
  },
  {
    id: 'metodo-roma',
    title: 'Método ROMA em Ação',
    icon: Target,
    description: 'Passo a passo prático para aplicar o método e acelerar promoções',
    duration: '120 min',
    level: 'Avançado',
    highlights: [
      'Resultados: Como medir e apresentar',
      'Oportunidades: Como identificar e criar',
      'Método e Ação: Execução sistemática'
    ]
  },
  {
    id: 'pontos-cegos',
    title: 'Identificando Pontos Cegos',
    icon: Lightbulb,
    description: 'Descubra o que você não vê em si mesmo e que impacta sua carreira',
    duration: '75 min',
    level: 'Fundamental',
    highlights: [
      'Autoavaliação profissional profunda',
      'Feedback 360° estruturado',
      'Plano de desenvolvimento pessoal'
    ]
  },
  {
    id: 'lideranca-influencia',
    title: 'Liderança e Influência',
    icon: Users,
    description: 'Como construir influência autêntica e liderar sem autoridade formal',
    duration: '100 min',
    level: 'Intermediário',
    highlights: [
      'Princípios de influência genuína',
      'Construção de confiança estratégica',
      'Liderança horizontal e vertical'
    ]
  },
  {
    id: 'networking-estrategico',
    title: 'Networking Estratégico',
    icon: TrendingUp,
    description: 'Construa uma rede de contatos que impulsione sua carreira',
    duration: '85 min',
    level: 'Intermediário',
    highlights: [
      'Mapeamento de stakeholders-chave',
      'Estratégias de aproximação profissional',
      'Manutenção de relacionamentos'
    ]
  },
  {
    id: 'marca-pessoal',
    title: 'Marca Pessoal Executiva',
    icon: Award,
    description: 'Desenvolva uma marca pessoal forte e consistente no ambiente corporativo',
    duration: '95 min',
    level: 'Avançado',
    highlights: [
      'Definição de proposta de valor única',
      'Estratégias de visibilidade interna',
      'Gestão de reputação profissional'
    ]
  }
];

const LEVELS = {
  'Fundamental': { color: 'bg-blue-100 text-blue-800', icon: '📚' },
  'Intermediário': { color: 'bg-orange-100 text-orange-800', icon: '🎯' },
  'Avançado': { color: 'bg-red-100 text-red-800', icon: '🚀' }
};

export function ThemeSelectionPage() {
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    
    // Salvar tema selecionado e redirecionar para checkout
    localStorage.setItem('selected-theme', themeId);
    window.location.href = `/checkout?product=aula-eletiva&theme=${themeId}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao site
          </Link>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header da página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Escolha Seu Tema de Interesse
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Selecione o tema que mais se alinha com seus objetivos profissionais atuais. 
            Cada aula é focada e prática, com duração de 75 a 120 minutos.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6 max-w-2xl mx-auto">
            <p className="text-yellow-800 font-medium">
              💡 <strong>Dica:</strong> No curso completo você tem acesso a TODOS os temas + suporte personalizado
            </p>
          </div>
        </div>

        {/* Grid de temas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {THEMES.map((theme) => {
            const IconComponent = theme.icon;
            const levelConfig = LEVELS[theme.level as keyof typeof LEVELS];
            
            return (
              <Card 
                key={theme.id} 
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/20"
                onClick={() => handleThemeSelect(theme.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${levelConfig.color}`}>
                        {levelConfig.icon} {theme.level}
                      </div>
                      <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {theme.duration}
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-2">{theme.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{theme.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm text-foreground">O que você vai aprender:</h4>
                    <ul className="space-y-1">
                      {theme.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 hover:from-green-600 hover:via-teal-600 hover:to-blue-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-green-400 hover:border-blue-500" 
                    size="sm"
                  >
                    🎯 Escolher Este Tema
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA para curso completo */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Quer acesso a TODOS os temas?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                No curso completo você tem acesso a todos os 6 módulos temáticos, 
                suporte personalizado, encontros mensais ao vivo e os e-books de presente.
              </p>
              
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-sm text-muted-foreground">Módulos Completos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12x</div>
                  <div className="text-sm text-muted-foreground">Meses de Conteúdo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-sm text-muted-foreground">E-books Grátis</div>
                </div>
              </div>
              
              <Link href="/checkout?product=curso-completo">
                <Button 
                  size="lg" 
                  className="px-12 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-red-500 hover:to-orange-600 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-yellow-300 hover:border-red-400 ring-4 ring-yellow-200 hover:ring-red-300 text-lg tracking-wide uppercase animate-pulse hover:animate-none"
                >
                  🚀 Ver Curso Completo 🚀
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
