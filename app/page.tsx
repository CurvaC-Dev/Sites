
import { HeroSection } from '@/components/sections/hero-section';
import { ProblemsSection } from '@/components/sections/problems-section';
import { LearningSection } from '@/components/sections/learning-section';
import { EbooksSection } from '@/components/sections/ebooks-section';
import { CtaSection } from '@/components/sections/cta-section';
import { Footer } from '@/components/sections/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemsSection />
      <LearningSection />
      <EbooksSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
