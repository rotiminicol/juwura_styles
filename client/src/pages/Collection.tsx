import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaShoppingCart, FaHeart, FaShareAlt, FaEye, FaPalette, FaTshirt } from 'react-icons/fa';
import { Search, Filter, Grid, List, Star, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

// Generate comprehensive product data
const generateProducts = () => {
  const categories = [
    "Traditional Wear", "Modern African", "Accessories", "Footwear", 
    "Headwraps", "Jewelry", "Bags", "Ceremonial", "Casual", "Formal"
  ];
  
  const styles = [
    "Ankara", "Kente", "Adire", "Dashiki", "Agbada", "Boubou", 
    "Kaftan", "Gele", "Aso Oke", "Mud Cloth", "Wax Print", "Batik"
  ];
  
  const colors = [
    "Vibrant Red", "Royal Blue", "Golden Yellow", "Emerald Green", 
    "Purple Majesty", "Orange Sunset", "Turquoise", "Burgundy", 
    "Coral Pink", "Forest Green", "Midnight Black", "Ivory White"
  ];

  const baseImages = [
    "/src/assets/wed.png", "/src/assets/wed2.png", "/src/assets/wed3.png",
    "/src/assets/wed4.png", "/src/assets/wed5.png", "/src/assets/wed6.png",
    "/src/assets/wed7.png", "/src/assets/wed8.png", "/src/assets/wed9.png"
  ];

  const productNames = [
    "Royal Ankara Dress", "Traditional Agbada Set", "Modern Dashiki Shirt",
    "Elegant Kente Wrap", "Ceremonial Gele Headwrap", "Handwoven Adire Tunic",
    "Contemporary African Blazer", "Traditional Boubou Robe", "Stylish Kaftan Dress",
    "Authentic Mud Cloth Jacket", "Vibrant Wax Print Skirt", "Classic Aso Oke Set",
    "Designer African Jumpsuit", "Traditional Wedding Attire", "Modern African Suit",
    "Elegant Evening Gown", "Casual African Print Top", "Formal Ceremony Outfit",
    "Trendy African Accessories", "Handcrafted Jewelry Set", "Traditional Footwear",
    "Modern African Bag", "Ceremonial Crown", "Stylish Head Piece",
    "Contemporary African Coat", "Traditional Dance Costume", "Modern Fusion Wear",
    "Elegant African Scarf", "Designer Handbag", "Traditional Sandals"
  ];

  const allProducts = [];

  for (let i = 0; i < 60; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const style = styles[Math.floor(Math.random() * styles.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const baseName = productNames[Math.floor(Math.random() * productNames.length)];
    const price = (Math.floor(Math.random() * 300) + 50).toFixed(2);
    const rating = (4 + Math.random()).toFixed(1);
    const reviews = Math.floor(Math.random() * 200) + 10;
    const image = baseImages[Math.floor(Math.random() * baseImages.length)];

    allProducts.push({
      id: i + 1,
      name: `${baseName} - ${style}`,
      price: parseFloat(price),
      image: image,
      category,
      style,
      color,
      rating: parseFloat(rating),
      reviews,
      isNew: Math.random() > 0.8,
      isTrending: Math.random() > 0.7,
      isPremium: Math.random() > 0.6,
      avatarPreview: image,
      description: `Authentic ${style} ${category.toLowerCase()} featuring traditional patterns and modern comfort. Perfect for cultural celebrations and contemporary styling.`,
      features: [
        "Customizable colors",
        "Adjustable fit",
        "3D avatar preview",
        "Express delivery",
        "Authentic patterns",
        "Premium materials"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      materials: ["100% Cotton", "Silk Blend", "Traditional Fabric"],
      occasions: ["Casual", "Formal", "Ceremonial", "Wedding"]
    });
  }

  return allProducts;
};

const Collection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const products = generateProducts();
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id - a.id;
      default: return 0;
    }
  });

  const handlePreview = (product) => {
    setSelectedProduct(product);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white pt-20">
      {/* Header Section */}
      <div className="py-16 px-4 md:px-8 bg-gradient-to-r from-abuja-brown to-abuja-dark text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-6">
              Style Your Avatar
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Create your perfect avatar with authentic African fashion. Mix, match, and customize 
              to bring your unique style vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <Crown className="w-4 h-4" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span>3D Preview</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4" />
                <span>Instant Customization</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="py-8 px-4 md:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search styles, colors, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-gold focus:ring-gold/20"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category 
                      ? "bg-abuja-brown text-white" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  } transition-all duration-200`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Toggle and Sort */}
            <div className="flex items-center space-x-4">
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {filteredProducts.length} Styles Available
            </h2>
            <div className="text-sm text-gray-600">
              Showing {sortedProducts.length} of {products.length} products
            </div>
          </div>

          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-64 h-64' : 'h-80'} overflow-hidden`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white">New</Badge>
                    )}
                    {product.isTrending && (
                      <Badge className="bg-red-500 text-white">Trending</Badge>
                    )}
                    {product.isPremium && (
                      <Badge className="bg-gold text-abuja-brown">Premium</Badge>
                    )}
                  </div>

                  {/* Avatar Preview */}
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img
                      src={product.avatarPreview}
                      alt="Avatar Preview"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      className="bg-white/90 text-gray-700 hover:bg-white"
                      onClick={() => handlePreview(product)}
                    >
                      <FaEye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-white/90 text-gray-700 hover:bg-white">
                      <FaHeart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">{product.style} • {product.color}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FaShareAlt className="w-4 h-4 text-gray-500" />
                    </Button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-abuja-brown">
                      ${product.price}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handlePreview(product)}
                        className="bg-abuja-brown text-white hover:bg-abuja-dark transition-colors duration-300"
                      >
                        <FaPalette className="w-4 h-4 mr-2" />
                        Style Avatar
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {sortedProducts.length < products.length && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-abuja-brown text-abuja-brown hover:bg-abuja-brown hover:text-white"
              >
                Load More Styles
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold font-playfair text-abuja-brown">
                  {selectedProduct.name}
                </h3>
                <p className="text-lg text-gray-600 mt-2">{selectedProduct.description}</p>
              </div>
              <Button
                onClick={closePreview}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Avatar Preview */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                  <img
                    src={selectedProduct.avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 3D Controls */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">3D Avatar Preview</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Rotate</Button>
                      <Button size="sm" variant="outline">Zoom</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customization Panel */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-abuja-brown">Customize Your Style</h4>
                  
                  {/* Color Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Color Palette
                    </label>
                    <div className="grid grid-cols-6 gap-3">
                      {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'].map((color, index) => (
                        <button
                          key={index}
                          className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-abuja-brown transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Style Options */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Style Variations
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Traditional', 'Modern', 'Fusion', 'Casual'].map((style) => (
                        <Button
                          key={style}
                          variant="outline"
                          className="justify-start hover:bg-abuja-brown hover:text-white"
                        >
                          <FaTshirt className="w-4 h-4 mr-2" />
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Size
                    </label>
                    <div className="flex space-x-3">
                      {selectedProduct.sizes.map((size) => (
                        <Button
                          key={size}
                          variant="outline"
                          className="w-12 h-12 hover:bg-abuja-brown hover:text-white"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Material Info */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Materials
                    </label>
                    <div className="space-y-2">
                      {selectedProduct.materials.map((material, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-abuja-brown">
                        ${selectedProduct.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{selectedProduct.rating}</span>
                        <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full bg-abuja-brown text-white hover:bg-abuja-dark py-3 text-lg font-semibold">
                        <FaShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart & Customize
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="border-abuja-brown text-abuja-brown hover:bg-abuja-brown hover:text-white">
                          Save Design
                        </Button>
                        <Button variant="outline" className="border-abuja-brown text-abuja-brown hover:bg-abuja-brown hover:text-white">
                          Share Style
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Bottom Border */}
      <div className="border-t-4 border-abuja-brown bg-gradient-to-r from-abuja-brown to-gold">
        <div className="py-8 text-center">
          <h3 className="text-2xl font-bold text-white font-playfair">
            Style Your Avatar
          </h3>
          <p className="text-white/90 mt-2">
            Create • Customize • Express Your Unique African Style
          </p>
        </div>
      </div>
    </div>
  );
};

export default Collection;