
'use client';

import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/workshop/scroll-reveal';
import { EBOOKS_CONTENT } from '@/lib/constants';
import { BookOpen, Package } from 'lucide-react';

export function EbooksSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-workshop-section-bg">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-workshop-primary mb-4 sm:mb-6 leading-tight">
              ESCOLHA SUA OPÇÃO
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6 leading-relaxed">
              Diferentes caminhos para sua transformação profissional. Escolha o que faz mais sentido para você agora.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-center">
                <strong className="text-blue-800">💼 Iniciante:</strong><br className="sm:hidden" />
                <span className="sm:ml-1">E-books individuais</span>
              </div>
              <div className="bg-purple-50 border border-purple-200 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-center">
                <strong className="text-purple-800">🎯 Experiente:</strong><br className="sm:hidden" />
                <span className="sm:ml-1">Combo ou aula específica</span>
              </div>
              <div className="bg-green-50 border border-green-200 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-center">
                <strong className="text-green-800">🚀 Comprometido:</strong><br className="sm:hidden" />
                <span className="sm:ml-1">Curso completo</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* E-books Individuais */}
          {EBOOKS_CONTENT.items.map((ebook, index) => (
            <ScrollReveal key={index} delay={0.2 * (index + 1)}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-workshop-primary text-center sm:text-left leading-tight">
                    {ebook.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed text-center sm:text-left">
                  {ebook.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="line-through text-gray-400 text-xs">
                        {ebook.originalPrice}
                      </span>
                      <span className="text-xl font-bold text-workshop-primary">
                        {ebook.price}
                      </span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-2 rounded text-center">
                    <p className="text-xs text-yellow-800 font-medium">
                      💡 {ebook.note}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-400 hover:border-blue-600"
                    onClick={() => {
                      window.location.href = `/checkout?product=${ebook.id}`;
                    }}
                  >
                    💎 {ebook.cta}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Combo E-books + Primeira Aula */}
          <ScrollReveal delay={0.6}>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative border-2 border-purple-300">
              <div className="absolute -top-2 -right-2">
                <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {EBOOKS_CONTENT.combo.highlight}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-workshop-primary">
                  {EBOOKS_CONTENT.combo.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {EBOOKS_CONTENT.combo.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="line-through text-gray-400 text-xs">
                      {EBOOKS_CONTENT.combo.originalPrice}
                    </span>
                    <span className="text-xl font-bold text-purple-600">
                      {EBOOKS_CONTENT.combo.price}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-600 hover:via-indigo-600 hover:to-purple-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-400 hover:border-indigo-500 ring-2 ring-purple-200 hover:ring-indigo-300"
                  size="sm"
                  onClick={() => {
                    window.location.href = `/checkout?product=${EBOOKS_CONTENT.combo.id}`;
                  }}
                >
                  🎯 {EBOOKS_CONTENT.combo.cta}
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Aula Eletiva */}
          <ScrollReveal delay={0.8}>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative border-2 border-orange-300">
              <div className="absolute -top-2 -right-2">
                <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {EBOOKS_CONTENT.aulaEletiva.highlight}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-workshop-primary">
                  {EBOOKS_CONTENT.aulaEletiva.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {EBOOKS_CONTENT.aulaEletiva.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="line-through text-gray-400 text-xs">
                      {EBOOKS_CONTENT.aulaEletiva.originalPrice}
                    </span>
                    <span className="text-xl font-bold text-orange-600">
                      {EBOOKS_CONTENT.aulaEletiva.price}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-orange-400 hover:border-red-500 ring-2 ring-orange-200 hover:ring-red-300"
                  size="sm"
                  onClick={() => {
                    window.location.href = `/select-theme`;
                  }}
                >
                  🎪 {EBOOKS_CONTENT.aulaEletiva.cta}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bundle Offer */}
        <ScrollReveal delay={0.8}>
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white text-center shadow-2xl border-2 sm:border-4 border-yellow-400">
            {/* Badge de Melhor Oferta */}
            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-red-500 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide shadow-lg">
                {EBOOKS_CONTENT.bundle.highlight}
              </div>
            </div>

            <div className="flex items-center justify-center mb-4 sm:mb-6 mt-2 sm:mt-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
              {EBOOKS_CONTENT.bundle.title}
            </h3>
            
            <p className="text-base sm:text-lg lg:text-xl font-semibold text-workshop-accent mb-4 sm:mb-6">
              {EBOOKS_CONTENT.bundle.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <span className="line-through text-gray-300 text-sm sm:text-base lg:text-lg">
                {EBOOKS_CONTENT.bundle.originalPrice}
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-workshop-accent">
                {EBOOKS_CONTENT.bundle.price}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 mb-6 sm:mb-8">
              <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">✨ O que você recebe:</h4>
              <div className="space-y-2 sm:space-y-3 text-left">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-workshop-accent rounded-full flex-shrink-0 mt-2" />
                  <span className="text-sm sm:text-base">Curso completo com encontros mensais</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full flex-shrink-0 mt-2" />
                  <span className="text-sm sm:text-base"><strong>GRÁTIS:</strong> E-book Comunicação Estratégica (R$ 19,90)</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full flex-shrink-0 mt-2" />
                  <span className="text-sm sm:text-base"><strong>GRÁTIS:</strong> E-book Método ROMA (R$ 19,90)</span>
                </div>
              </div>
            </div>

            <Button
              variant="workshopSecondary"
              className="text-sm sm:text-base lg:text-xl px-4 sm:px-8 lg:px-16 py-3 sm:py-4 lg:py-6 font-black tracking-wide uppercase shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none cta-button button-glow button-rainbow w-full sm:w-auto"
              onClick={() => {
                // Redirecionar para página de checkout do curso completo
                window.location.href = `/checkout?product=curso-completo`;
              }}
            >
              🏆 {EBOOKS_CONTENT.bundle.cta} 🏆
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
