
'use client';

import { Button } from '@/components/ui/button';
import { LeadCaptureForm } from '@/components/workshop/lead-capture-form';
import { ScrollReveal } from '@/components/workshop/scroll-reveal';
import { FINAL_CTA_CONTENT } from '@/lib/constants';
import { Calendar, Clock, Monitor, CheckCircle } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#001f31' }} id="lead-form">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,204,51,0.1),transparent_70%)]" />
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {FINAL_CTA_CONTENT.title}
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              {FINAL_CTA_CONTENT.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {FINAL_CTA_CONTENT.facts.map((fact, index) => {
                  const icons = [Calendar, Clock, Monitor];
                  const Icon = icons[index];
                  
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 text-center text-white">
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-workshop-accent mx-auto mb-2 sm:mb-3" />
                      <div className="text-xs sm:text-sm text-gray-300">{fact.label}</div>
                      <div className="text-base sm:text-lg lg:text-xl font-bold break-words">{fact.value}</div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
                  <span className="line-through text-gray-300 text-sm sm:text-base lg:text-lg">
                    DE {FINAL_CTA_CONTENT.originalPrice}
                  </span>
                  <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-workshop-accent">
                    POR {FINAL_CTA_CONTENT.price}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.7}>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center text-workshop-accent font-bold text-base sm:text-lg">
                  {FINAL_CTA_CONTENT.bullets[0]}
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {FINAL_CTA_CONTENT.bullets.slice(1).map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-white">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-workshop-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Form */}
          <ScrollReveal delay={0.9} direction="right">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center mb-4 sm:mb-6">
                Garanta sua vaga agora!
              </h3>
              
              <LeadCaptureForm
                source="workshop"
                buttonText={FINAL_CTA_CONTENT.cta}
                size="lg"
                onSuccess={() => {
                  // Show success message or redirect
                  alert('Inscrição realizada com sucesso! Você receberá um email de confirmação em breve.');
                }}
              />

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-300">
                  🔒 Seus dados estão seguros e protegidos
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
