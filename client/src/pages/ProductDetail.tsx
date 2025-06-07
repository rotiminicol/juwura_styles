import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Heart, Star, Truck, RotateCcw, Shield, Plus, Minus, Eye, Palette, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/hooks/useCart';
import { fadeInUp, scaleIn } from '@/lib/animations';
import { toast } from '@/hooks/use-toast';

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

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['/api/products', id],
    queryFn: () => fetch(`/api/products/${id}`).then(res => {
      if (!res.ok) throw new Error('Product not found');
      return res.json();
    }),
  });

  const { addToCart, isAddingToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    
    if (selectedSize === '' && sizes.length > 0) {
      toast({
        title: 'Size required',
        description: 'Please select a size before adding to cart.',
        variant: 'destructive',
      });
      return;
    }

    addToCart({
      productId: product.id,
      quantity,
      size: selectedSize || undefined,
    });
  };

  const formatPrice = (price: string) => {
    return `₦${parseFloat(price).toLocaleString()}`;
  };

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF8A80', '#A5D6A7'];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-abuja-brown mb-4">Product Not Found</h1>
          <p className="text-abuja-brown/70 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products">
            <Button className="bg-abuja-brown text-cream">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center space-x-2 mb-8 text-sm"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <Link href="/collection" className="text-abuja-brown/60 hover:text-abuja-brown transition-colors">
            Collection
          </Link>
          <span className="text-abuja-brown/40">/</span>
          <span className="text-abuja-brown font-medium">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="mb-4 relative">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                variants={scaleIn}
                initial="initial"
                animate="animate"
              />
              
              {/* Avatar Preview Toggle */}
              <Button
                onClick={() => setShowAvatarPreview(!showAvatarPreview)}
                className="absolute top-4 right-4 bg-white/90 text-abuja-brown hover:bg-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showAvatarPreview ? 'Product View' : 'Avatar Preview'}
              </Button>
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-gold scale-105'
                        : 'border-transparent hover:border-abuja-brown/30'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Avatar Customization Panel */}
            {showAvatarPreview && (
              <motion.div
                className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-abuja-brown">Avatar Customization</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Palette
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            selectedColor === color ? 'border-abuja-brown scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Style Options
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Traditional', 'Modern', 'Casual', 'Formal'].map((style) => (
                        <Button
                          key={style}
                          variant="outline"
                          size="sm"
                          className="hover:bg-abuja-brown hover:text-white"
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-abuja-brown mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                      <span className="ml-2 text-sm text-abuja-brown/70">(24 reviews)</span>
                    </div>
                    {product.featured && (
                      <Badge className="bg-burgundy text-cream">Featured</Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`${isWishlisted ? 'text-burgundy' : 'text-abuja-brown/60'} hover:text-burgundy`}
                  >
                    <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-abuja-brown/60 hover:text-abuja-brown"
                  >
                    <Share2 className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              
              <p className="text-2xl lg:text-3xl font-bold text-gold mb-4">
                {formatPrice(product.price)}
              </p>
              
              <p className="text-abuja-brown/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Avatar Styling Section */}
            <div className="bg-gradient-to-r from-gold/10 to-abuja-brown/10 p-6 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="w-6 h-6 text-abuja-brown" />
                <h3 className="text-lg font-semibold text-abuja-brown">Style Your Avatar</h3>
              </div>
              <p className="text-abuja-brown/80 mb-4">
                Customize this design on your avatar and see how it looks before ordering. 
                Mix and match colors, styles, and accessories to create your perfect look.
              </p>
              <Button
                onClick={() => setShowAvatarPreview(true)}
                className="bg-abuja-brown text-cream hover:bg-abuja-dark"
              >
                <Palette className="w-4 h-4 mr-2" />
                Open Avatar Styler
              </Button>
            </div>

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-abuja-brown mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg ${
                        selectedSize === size
                          ? 'bg-abuja-brown text-cream'
                          : 'border-abuja-brown/30 text-abuja-brown hover:bg-abuja-brown hover:text-cream'
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-abuja-brown mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-abuja-brown/30 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12 text-abuja-brown hover:bg-abuja-brown/10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-lg font-semibold text-abuja-brown min-w-16 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="h-12 w-12 text-abuja-brown hover:bg-abuja-brown/10"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-abuja-brown/70">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className="w-full bg-abuja-brown text-cream py-4 rounded-2xl text-lg font-semibold hover:bg-abuja-dark transform hover:scale-105 transition-all duration-300"
              >
                {product.stock === 0 
                  ? 'Out of Stock' 
                  : isAddingToCart 
                    ? 'Adding to Cart...' 
                    : `Add to Cart - ${formatPrice((parseFloat(product.price) * quantity).toString())}`
                }
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-2 border-abuja-brown text-abuja-brown py-3 rounded-2xl font-semibold hover:bg-abuja-brown hover:text-cream transition-all duration-300"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Style Avatar
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gold text-gold py-3 rounded-2xl font-semibold hover:bg-gold hover:text-abuja-brown transition-all duration-300"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            <Separator />

            {/* Additional Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-abuja-brown/80">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over ₦50,000</span>
              </div>
              <div className="flex items-center space-x-3 text-abuja-brown/80">
                <RotateCcw className="w-5 h-5" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-abuja-brown/80">
                <Shield className="w-5 h-5" />
                <span>Authentic African craftsmanship</span>
              </div>
              <div className="flex items-center space-x-3 text-abuja-brown/80">
                <Palette className="w-5 h-5" />
                <span>Avatar styling available</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          className="mt-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="border-t border-abuja-brown/20 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-playfair text-xl font-semibold mb-4 text-abuja-brown">
                  Material & Care
                </h3>
                <ul className="space-y-2 text-abuja-brown/80">
                  <li>• 100% Premium African Cotton</li>
                  <li>• Hand-wash in cold water</li>
                  <li>• Dry flat in shade</li>
                  <li>• Iron on low heat</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-playfair text-xl font-semibold mb-4 text-abuja-brown">
                  Avatar Styling
                </h3>
                <ul className="space-y-2 text-abuja-brown/80">
                  <li>• 3D avatar preview available</li>
                  <li>• Multiple color options</li>
                  <li>• Style customization</li>
                  <li>• Virtual try-on experience</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-playfair text-xl font-semibold mb-4 text-abuja-brown">
                  Cultural Heritage
                </h3>
                <p className="text-abuja-brown/80">
                  Each piece celebrates traditional African patterns and 
                  craftsmanship techniques passed down through generations, 
                  supporting local artisan communities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}