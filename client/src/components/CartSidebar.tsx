import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useCart } from '@/hooks/useCart';
import { slideInRight } from '@/lib/animations';
import { Link } from 'wouter';

export default function CartSidebar() {
  const { isCartOpen, setCartOpen } = useStore();
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

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
            variants={slideInRight}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="font-playfair text-2xl font-bold text-abuja-brown">
                Shopping Cart
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(false)}
                className="text-abuja-brown hover:text-gold"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 custom-scroll">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex space-x-4 animate-pulse">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-12 text-abuja-brown/60">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-abuja-brown/30" />
                  <p className="text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-sm">Add some items to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center space-x-4 py-4 border-b border-gray-200"
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-abuja-brown line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gold font-medium">
                          {formatPrice(item.product.price)}
                        </p>
                        {item.size && (
                          <p className="text-xs text-abuja-brown/70">
                            Size: {item.size}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-semibold min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-abuja-brown">Total:</span>
                  <span className="font-bold text-2xl text-abuja-brown">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
                <Link href="/checkout">
                  <Button
                    className="w-full bg-abuja-brown text-cream py-3 rounded-full font-semibold hover:bg-abuja-dark transition-colors duration-300 mb-3 group"
                    onClick={() => setCartOpen(false)}
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-2 border-abuja-brown text-abuja-brown py-3 rounded-full font-semibold hover:bg-abuja-brown hover:text-cream transition-all duration-300"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
