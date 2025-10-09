
'use client';

import { ScrollReveal } from '@/components/workshop/scroll-reveal';
import { FOOTER_CONTENT } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="py-12 bg-workshop-primary text-white">
      <div className="container max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">
              {FOOTER_CONTENT.name}
            </h3>
            <p className="text-gray-300 text-lg">
              {FOOTER_CONTENT.description}
            </p>
            <div className="pt-8 border-t border-white/20">
              <p className="text-sm text-gray-400">
                {FOOTER_CONTENT.rights}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
