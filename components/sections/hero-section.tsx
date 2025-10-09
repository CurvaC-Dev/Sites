
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Price } from '@/components/workshop/price';
import { ScrollReveal } from '@/components/workshop/scroll-reveal';
import { WORKSHOP_CONFIG } from '@/lib/constants';
import { CheckCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#001f31' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,204,51,0.05),transparent_70%)]" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start min-h-[80vh] lg:min-h-screen">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <ScrollReveal delay={0.2}>
              <Badge variant="workshop" className="mb-6">
                {WORKSHOP_CONFIG.badge}
              </Badge>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                CURSO:{' '}
                <span className="text-workshop-accent block sm:inline">
                  {WORKSHOP_CONFIG.highlight}
                </span>{' '}
                <span className="block sm:inline">EM 6 MESES</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                {WORKSHOP_CONFIG.subtitle}
              </p>
            </ScrollReveal>

            {/* Date and Time Cards */}
            <ScrollReveal delay={0.8}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-workshop-primary/90 text-white rounded-xl p-4 sm:p-6 text-center">
                  <div className="text-xs sm:text-sm text-gray-300">Data</div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{WORKSHOP_CONFIG.date}</div>
                </div>
                <div className="bg-workshop-primary/90 text-white rounded-xl p-4 sm:p-6 text-center">
                  <div className="text-xs sm:text-sm text-gray-300">Horário</div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{WORKSHOP_CONFIG.time}</div>
                </div>
              </div>
            </ScrollReveal>

            {/* Pricing */}
            <ScrollReveal delay={1.0}>
              <Price
                originalPrice={WORKSHOP_CONFIG.originalPrice}
                price={WORKSHOP_CONFIG.price}
                priceAlternative={WORKSHOP_CONFIG.priceAlternative}
                size="lg"
                className="py-6"
              />
            </ScrollReveal>
          </div>

          {/* Right Column - Logo, Benefits and CTA */}
          <div className="space-y-6 sm:space-y-8 order-first lg:order-last">
            {/* Logo aumentado em 120% mantendo proporções - Alinhado com CURSO */}
            <ScrollReveal delay={0.6} direction="right">
              <div className="relative max-w-xs sm:max-w-sm mx-auto" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}>
                <Image
                  src={WORKSHOP_CONFIG.image.src}
                  alt={WORKSHOP_CONFIG.image.alt}
                  width={400}
                  height={300}
                  className="object-contain"
                  priority
                />
              </div>
            </ScrollReveal>

            {/* Quadro "Você vai descobrir" */}
            <ScrollReveal delay={1.0} direction="right">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center">
                  Você vai descobrir:
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {WORKSHOP_CONFIG.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-workshop-accent flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm lg:text-base leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Botões CTA */}
            <ScrollReveal delay={1.2} direction="right">
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-green-100 border border-green-300 rounded-lg p-3 sm:p-4 text-center">
                  <p className="text-green-800 font-semibold text-xs sm:text-sm">
                    🎁 <strong>BÔNUS EXCLUSIVO:</strong> E-books grátis (economia de R$ 39,80)
                  </p>
                </div>
                
                <Button
                  variant="workshop"
                  className="w-full text-sm sm:text-base lg:text-xl px-6 sm:px-12 lg:px-16 py-3 sm:py-4 lg:py-6 relative overflow-hidden font-black tracking-wide uppercase cta-button button-glow"
                  onClick={() => {
                    window.location.href = `/checkout?product=curso-completo`;
                  }}
                >
                  <span className="hidden sm:inline">🚀 </span>
                  <span className="break-words">{WORKSHOP_CONFIG.cta}</span>
                  <span className="hidden sm:inline"> 🚀</span>
                </Button>
                
                <p className="text-center text-workshop-accent text-xs sm:text-sm font-semibold">
                  {WORKSHOP_CONFIG.note}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
