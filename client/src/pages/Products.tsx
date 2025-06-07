import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/hooks/useCart';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';
import { Link, useLocation } from 'wouter';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: string[];
  categoryId: number;
  stock: number;
  featured: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Products() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', selectedCategory],
    queryFn: () => {
      const url = selectedCategory 
        ? `/api/products?categoryId=${selectedCategory}`
        : '/api/products';
      return fetch(url).then(res => res.json());
    },
  });

  const { addToCart, isAddingToCart } = useCart();

  // Parse URL parameters for category filter
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const categorySlug = params.get('category');
    
    if (categorySlug && categories) {
      const category = categories.find(cat => cat.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [location, categories]);

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      quantity: 1,
    });
  };

  const formatPrice = (price: string) => {
    return `₦${parseFloat(price).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold mb-4 text-abuja-brown">
            All Collections
          </h1>
          <p className="text-xl text-abuja-brown/70 max-w-2xl mx-auto">
            Discover our complete range of authentic African fashion and accessories
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-col lg:flex-row gap-6 mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-abuja-brown/40 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-abuja-brown text-cream" : "border-abuja-brown text-abuja-brown"}
            >
              All
            </Button>
            {categories?.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-abuja-brown text-cream" : "border-abuja-brown text-abuja-brown"}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredProducts.map((product) => (
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
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {product.featured && (
                    <Badge className="absolute top-4 right-4 bg-burgundy text-cream">
                      Featured
                    </Badge>
                  )}
                  
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
                    <h3 className="font-playfair text-lg font-semibold mb-2 text-abuja-brown hover:text-gold transition-colors cursor-pointer line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-abuja-brown/70 mb-3 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-3 h-3 fill-gold text-gold"
                      />
                    ))}
                    <span className="ml-2 text-xs text-abuja-brown/70">(12)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-abuja-brown">
                      {formatPrice(product.price)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={isAddingToCart || product.stock === 0}
                      className="bg-abuja-brown text-cream px-4 py-2 rounded-full font-semibold hover:bg-abuja-dark transition-all duration-300"
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Products Found */}
        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="text-abuja-brown/40 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="font-playfair text-2xl font-semibold mb-2 text-abuja-brown">
              No products found
            </h3>
            <p className="text-abuja-brown/70 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="bg-abuja-brown text-cream px-6 py-3 rounded-full font-semibold hover:bg-abuja-dark"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
