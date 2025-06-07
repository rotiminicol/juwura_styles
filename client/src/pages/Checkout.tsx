import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { fadeInUp } from '@/lib/animations';
import { Link } from 'wouter';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const createOrderMutation = useMutation({
    mutationFn: async (shippingAddress: string) => {
      const response = await apiRequest('POST', '/api/orders', { shippingAddress });
      return response.json();
    },
    onSuccess: () => {
      setIsOrderPlaced(true);
      clearCart();
      toast({
        title: 'Order placed successfully!',
        description: 'You will receive a confirmation email shortly.',
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: 'Order failed',
        description: 'There was an error processing your order. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add some items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`;
    createOrderMutation.mutate(shippingAddress);
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `₦${numPrice.toLocaleString()}`;
  };

  const subtotal = cartTotal;
  const shipping = subtotal > 50000 ? 0 : 5000;
  const tax = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div className="min-h-screen pt-20 bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-2xl font-bold text-abuja-brown mb-4">
            Your cart is empty
          </h1>
          <p className="text-abuja-brown/70 mb-6">
            Please add some items to your cart before checking out.
          </p>
          <Link href="/products">
            <Button className="bg-abuja-brown text-cream">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen pt-20 bg-cream flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto px-4"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="font-playfair text-3xl font-bold text-abuja-brown mb-4">
            Order Confirmed!
          </h1>
          <p className="text-abuja-brown/70 mb-8">
            Thank you for your purchase. We'll send you a confirmation email shortly 
            with your order details and tracking information.
          </p>
          <div className="space-y-4">
            <Link href="/products">
              <Button className="w-full bg-abuja-brown text-cream">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full border-abuja-brown text-abuja-brown">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
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
              Checkout
            </h1>
            <Link href="/cart">
              <Button variant="outline" className="border-abuja-brown text-abuja-brown hover:bg-abuja-brown hover:text-cream">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <Truck className="w-5 h-5 text-abuja-brown" />
                    <h2 className="font-playfair text-xl font-semibold text-abuja-brown">
                      Contact & Shipping
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-abuja-brown font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-abuja-brown font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="firstName" className="text-abuja-brown font-medium">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-abuja-brown font-medium">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-abuja-brown font-medium">
                        Address *
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Enter your address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-abuja-brown font-medium">
                        City *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Enter your city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-abuja-brown font-medium">
                        State *
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Payment Information */}
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <CreditCard className="w-5 h-5 text-abuja-brown" />
                    <h2 className="font-playfair text-xl font-semibold text-abuja-brown">
                      Payment Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cardName" className="text-abuja-brown font-medium">
                        Cardholder Name *
                      </Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Name on card"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber" className="text-abuja-brown font-medium">
                        Card Number *
                      </Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate" className="text-abuja-brown font-medium">
                        Expiry Date *
                      </Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        required
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-abuja-brown font-medium">
                        CVV *
                      </Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </motion.div>

                <Button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className="w-full bg-abuja-brown text-cream py-4 rounded-2xl text-lg font-semibold hover:bg-abuja-dark transition-all duration-300"
                >
                  {createOrderMutation.isPending ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
                </Button>
              </form>
            </div>

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

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-abuja-brown text-sm line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-abuja-brown/70">
                        Qty: {item.quantity}
                        {item.size && ` • Size: ${item.size}`}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-abuja-brown">
                      {formatPrice((parseFloat(item.product.price) * item.quantity).toString())}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="mb-6" />

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-abuja-brown">Subtotal</span>
                  <span className="text-abuja-brown">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-abuja-brown">Shipping</span>
                  <span className="text-abuja-brown">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-abuja-brown">Tax (7.5%)</span>
                  <span className="text-abuja-brown">{formatPrice(tax)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-abuja-brown">Total</span>
                  <span className="text-xl font-semibold text-abuja-brown">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-green-700 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
