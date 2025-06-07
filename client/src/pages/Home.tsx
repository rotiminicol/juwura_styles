import Hero from '@/components/Hero';
import CategoryCards from '@/components/CategoryCards';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutSection from '@/components/AboutSection';
import ParallaxSection from '@/components/ParallaxSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <ParallaxSection />
      <AboutSection />
    </div>
  );
}
