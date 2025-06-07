import { motion } from 'framer-motion';
import { ArrowRight, Star, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, fadeIn, floatAnimation } from '@/lib/animations';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cream/95 via-cream/90 to-abuja-brown/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="Beautiful African models in traditional attire"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center"
          variants={floatAnimation}
          initial="initial"
          animate="animate"
        >
          <Star className="w-8 h-8 text-gold" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-20 w-16 h-16 bg-burgundy/20 rounded-full flex items-center justify-center"
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '2s' }}
        >
          <Gem className="w-6 h-6 text-burgundy" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-abuja-brown/20 rounded-full"
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto">
        <motion.h1
          className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <span className="block text-abuja-brown">Premium</span>
          <span className="block text-gold">African Fashion</span>
        </motion.h1>

        <motion.p
          className="text-xl lg:text-2xl mb-8 text-abuja-brown/80 max-w-2xl mx-auto leading-relaxed"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          Discover the elegance of traditional African wear, Adire bags, and
          authentic Gele headwraps crafted with heritage and love.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-abuja-brown text-cream px-8 py-4 rounded-full font-semibold hover:bg-abuja-dark transform hover:scale-105 transition-all duration-300 group"
          >
            Shop Collections
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-abuja-brown text-abuja-brown px-8 py-4 rounded-full font-semibold hover:bg-abuja-brown hover:text-cream transition-all duration-300"
          >
            Learn Our Story
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.9 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-abuja-brown">500+</div>
            <div className="text-sm text-abuja-brown/70">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-abuja-brown">100+</div>
            <div className="text-sm text-abuja-brown/70">Unique Designs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-abuja-brown">5★</div>
            <div className="text-sm text-abuja-brown/70">Customer Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
