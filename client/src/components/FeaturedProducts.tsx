import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/hooks/useCart';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';
import { Link } from 'wouter';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: string[];
  featured: boolean;
  stock: number;
}

export default function FeaturedProducts() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', { featured: true }],
    queryFn: () => fetch('/api/products?featured=true').then(res => res.json()),
  });

  const { addToCart, isAddingToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      quantity: 1,
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-4 text-abuja-brown">
            Featured Products
          </h2>
          <p className="text-xl text-abuja-brown/70 max-w-2xl mx-auto">
            Handpicked items from our premium collection
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {products?.map((product) => (
            <motion.div
              key={product.id}
              className="group bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 product-card"
              variants={cardHover}
              whileHover="whileHover"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute top-4 right-4">
                  <Badge className="bg-burgundy text-cream">
                    Featured
                  </Badge>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                >
                  <Heart className="w-5 h-5 text-burgundy" />
                </Button>

                {product.stock < 5 && product.stock > 0 && (
                  <Badge className="absolute bottom-4 left-4 bg-gold text-abuja-brown">
                    Only {product.stock} left
                  </Badge>
                )}
              </div>

              <div className="p-6">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-playfair text-xl font-semibold mb-2 text-abuja-brown hover:text-gold transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-abuja-brown/70 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                  <span className="ml-2 text-sm text-abuja-brown/70">(24)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-abuja-brown">
                    ₦{parseFloat(product.price).toLocaleString()}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={isAddingToCart || product.stock === 0}
                    className="bg-abuja-brown text-cream px-6 py-2 rounded-full font-semibold hover:bg-abuja-dark transform hover:scale-105 transition-all duration-300"
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-abuja-brown text-abuja-brown px-8 py-3 rounded-full font-semibold hover:bg-abuja-brown hover:text-cream transition-all duration-300"
            >
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
