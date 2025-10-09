
'use client';

import { ScrollReveal } from '@/components/workshop/scroll-reveal';
import { LEARNING_CONTENT } from '@/lib/constants';

export function LearningSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-workshop-primary mb-6">
              O que você vai aprender no workshop
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Um método completo e estratégico para transformar seu talento em reconhecimento e promoções reais
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEARNING_CONTENT.map((item, index) => (
            <ScrollReveal key={index} delay={0.2 * (index + 1)}>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-6 text-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-workshop-primary mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
