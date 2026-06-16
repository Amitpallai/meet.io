import { Footer } from '~/components/layout/footer';
import { Hero } from '~/components/layout/hero';
import { FeaturesSection } from '~/components/layout/features';
import { CtaSection } from '~/components/layout/cta';
import { SmoothScrollProvider } from '~/context/smoothscrollprovider';

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <main>
        <Hero />
        <FeaturesSection />
        <CtaSection />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}