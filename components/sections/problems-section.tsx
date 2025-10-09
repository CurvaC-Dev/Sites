
'use client';

import { ScrollReveal } from '@/components/workshop/scroll-reveal';
import { PROBLEMS_CONTENT } from '@/lib/constants';
import { AlertTriangle } from 'lucide-react';

export function ProblemsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-workshop-section-bg">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-workshop-primary mb-4 sm:mb-6 leading-tight">
              Você se identifica com alguns desses problemas?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Muitos profissionais talentosos enfrentam esses desafios que impedem o reconhecimento merecido
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {PROBLEMS_CONTENT.map((problem, index) => (
            <ScrollReveal key={index} delay={0.2 * (index + 1)}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-workshop-primary mb-2 sm:mb-3 leading-tight">
                      {problem.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={1.0}>
          <div className="text-center">
            <p className="text-2xl font-bold text-workshop-primary">
              É hora de transformar seu talento em reconhecimento real! 🚀
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
