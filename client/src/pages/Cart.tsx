import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { fadeInUp } from '@/lib/animations';
import { Link } from 'wouter';

export default function Cart() {
  const { cartItems, cartTotal, updateCart, removeFromCart, isLoading } = useCart();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateCart({ id, quantity: newQuantity });
    }
  };

  const formatPrice = (price: string) => {
    return `₦${parseFloat(price).toLocaleString()}`;
  };

  const subtotal = cartTotal;
  const shipping = subtotal > 50000 ? 0 : 5000;
  const tax = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-cream">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-6 h-fit animate-pulse">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-12 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h1 className="font-playfair text-4xl font-bold text-abuja-brown">
              Shopping Cart
            </h1>
            <Link href="/products">
              <Button variant="outline" className="border-abuja-brown text-abuja-brown hover:bg-abuja-brown hover:text-cream">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              className="text-center py-16"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-abuja-brown/30" />
              <h2 className="font-playfair text-2xl font-semibold mb-4 text-abuja-brown">
                Your cart is empty
              </h2>
              <p className="text-abuja-brown/70 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. 
                Start shopping to fill it up!
              </p>
              <Link href="/products">
                <Button className="bg-abuja-brown text-cream px-8 py-3 rounded-full font-semibold hover:bg-abuja-dark">
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                className="lg:col-span-2 space-y-4"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-playfair text-lg font-semibold text-abuja-brown mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-gold font-medium mb-2">
                          {formatPrice(item.product.price)}
                        </p>
                        {item.size && (
                          <p className="text-sm text-abuja-brown/70">Size: {item.size}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-abuja-brown/30 rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-10 w-10 text-abuja-brown hover:bg-abuja-brown/10"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-3 py-2 text-abuja-brown font-semibold min-w-12 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-10 w-10 text-abuja-brown hover:bg-abuja-brown/10"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right min-w-20">
                          <p className="font-semibold text-abuja-brown">
                            {formatPrice((parseFloat(item.product.price) * item.quantity).toString())}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Order Summary */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-playfair text-2xl font-semibold mb-6 text-abuja-brown">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-abuja-brown">Subtotal</span>
                    <span className="text-abuja-brown">{formatPrice(subtotal.toString())}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-abuja-brown">Shipping</span>
                    <span className="text-abuja-brown">
                      {shipping === 0 ? 'Free' : formatPrice(shipping.toString())}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-abuja-brown">Tax (7.5%)</span>
                    <span className="text-abuja-brown">{formatPrice(tax.toString())}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-abuja-brown">Total</span>
                    <span className="text-xl font-semibold text-abuja-brown">
                      {formatPrice(total.toString())}
                    </span>
                  </div>
                </div>

                {subtotal < 50000 && (
                  <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 mb-6">
                    <p className="text-sm text-abuja-brown">
                      Add {formatPrice((50000 - subtotal).toString())} more for free shipping!
                    </p>
                  </div>
                )}

                <Link href="/checkout">
                  <Button className="w-full bg-abuja-brown text-cream py-3 rounded-2xl font-semibold hover:bg-abuja-dark transition-all duration-300 group mb-3">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="/products">
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-abuja-brown text-abuja-brown py-3 rounded-2xl font-semibold hover:bg-abuja-brown hover:text-cream transition-all duration-300"
                  >
                    Continue Shopping
                  </Button>
                </Link>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-4 text-xs text-abuja-brown/60">
                    <span>🔒 Secure Checkout</span>
                    <span>✓ SSL Encrypted</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
