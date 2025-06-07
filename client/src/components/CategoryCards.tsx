import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';
import { Link } from 'wouter';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export default function CategoryCards() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-4 text-abuja-brown">
            Our Collections
          </h2>
          <p className="text-xl text-abuja-brown/70 max-w-2xl mx-auto">
            Explore our curated selection of authentic African fashion and accessories
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {categories?.map((category) => (
            <motion.div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
              variants={cardHover}
              whileHover="whileHover"
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abuja-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-playfair text-2xl font-bold mb-2">
                  {category.name}
                </h3>
                <p className="text-cream/90 mb-4">{category.description}</p>
                <Link href={`/products?category=${category.slug}`}>
                  <Button
                    className="bg-gold text-abuja-brown px-6 py-2 rounded-full font-semibold hover:bg-gold/90 transition-colors duration-300 group/btn"
                  >
                    Explore Collection
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
