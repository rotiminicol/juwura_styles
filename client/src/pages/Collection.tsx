import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaShoppingCart, FaHeart, FaShareAlt } from 'react-icons/fa';

// Sample product data (we'll generate more later)
const products = [
  {
    id: 1,
    name: "Urban Chic Outfit",
    price: 199.99,
    image: "https://source.unsplash.com/random/300x400/?fashion",
    category: "Outfits",
    style: "Urban",
    color: "Black",
    avatarPreview: "https://source.unsplash.com/random/100x100/?avatar",
    features: [
      "Customizable colors",
      "Adjustable fit",
      "3D preview available",
      "Express delivery"
    ]
  },
  // More products will be added dynamically
];

const Collection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const generateProducts = () => {
    const allProducts = [];
    const categories = ["Outfits", "Accessories", "Footwear", "Outerwear", "Dresses"];
    const styles = ["Urban", "Classic", "Streetwear", "Boho", "Casual"];
    const colors = ["Black", "White", "Gray", "Red", "Blue", "Green", "Yellow"];

    for (let i = 0; i < 60; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const style = styles[Math.floor(Math.random() * styles.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const price = (Math.floor(Math.random() * 200) + 100).toFixed(2);

      allProducts.push({
        id: i + 1,
        name: `${style} ${category} ${i + 1}`,
        price: parseFloat(price),
        image: `https://source.unsplash.com/random/300x400/?fashion,${style}`,
        category,
        style,
        color,
        avatarPreview: `https://source.unsplash.com/random/100x100/?avatar,${style}`,
        features: [
          "Customizable colors",
          "Adjustable fit",
          "3D preview available",
          "Express delivery"
        ]
      });
    }

    return allProducts;
  };

  const products = generateProducts();

  const handlePreview = (product) => {
    setSelectedProduct(product);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="py-12 px-4 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Style Your Avatar</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our collection and create your perfect avatar style
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors">
              All Categories
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              Outfits
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              Accessories
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              Footwear
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Image with overlay */}
                  <div className="relative h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                  </div>

                  {/* Avatar Preview */}
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg">
                    <img
                      src={product.avatarPreview}
                      alt="Avatar Preview"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.style} - {product.color}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                      <div className="flex space-x-4">
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <FaHeart className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <FaShareAlt className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handlePreview(product)}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    >
                      Style & Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Preview Modal */}
          {isPreviewOpen && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-4xl w-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                  <button
                    onClick={closePreview}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Avatar Preview */}
                  <div className="relative h-96">
                    <img
                      src={selectedProduct.avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary p-2 rounded-full">
                          <FaShoppingCart className="w-6 h-6 text-white" />
                        </div>
                        <button className="bg-gray-100 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Customization Options */}
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Customize Your Style</h4>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color
                        </label>
                        <div className="flex space-x-3">
                          {['Black', 'White', 'Red', 'Blue', 'Green'].map((color) => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary transition-colors"
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Style
                        </label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Urban</option>
                          <option>Classic</option>
                          <option>Streetwear</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Size
                        </label>
                        <div className="flex space-x-3">
                          {['S', 'M', 'L', 'XL'].map((size) => (
                            <button
                              key={size}
                              className="px-4 py-2 rounded-full border border-gray-300 hover:border-primary transition-colors"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity
                        </label>
                        <div className="flex items-center space-x-4">
                          <button className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            -
                          </button>
                          <span className="px-4 py-2 bg-gray-100 rounded-full">1</span>
                          <button className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Options
                        </label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Standard (3-5 days)</option>
                          <option>Express (1-2 days)</option>
                          <option>Same Day</option>
                        </select>
                      </div>

                      <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                        Customize & Order
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
