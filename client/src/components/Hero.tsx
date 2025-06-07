import { motion } from 'framer-motion';
import { ArrowRight, Star, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, fadeIn, floatAnimation } from '@/lib/animations';
import heroImage from '@/assets/adire2.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream aspect-[16/9]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay with depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream/95 via-cream/90 to-abuja-brown/20 z-10" />
        
        {/* Main image with 3D transform */}
        <div className="absolute inset-0 transform-gpu perspective-1000">
          <div className="absolute inset-0 rotate-3d-x-5 rotate-3d-y-2 transform-gpu transition-transform duration-1000 ease-in-out hover:rotate-3d-x-8 hover:rotate-3d-y-3">
            <img
              src={heroImage}
              alt="Beautiful African models in traditional attire"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        </div>

        {/* 3D floating elements */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 -top-10 w-64 h-64 bg-gold/20 rounded-full blur-3xl transform-gpu translate-z-10" />
          <div className="absolute right-1/4 -bottom-10 w-48 h-48 bg-abuja-brown/20 rounded-full blur-3xl transform-gpu translate-z-20" />
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-burgundy/20 rounded-full blur-2xl transform-gpu translate-z-15" />
          <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gold/30 rounded-full blur-xl transform-gpu translate-z-5" />
        </div>
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-30 transform-gpu perspective-1000">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center transform-gpu translate-z-30"
          variants={floatAnimation}
          initial="initial"
          animate="animate"
        >
          <Star className="w-8 h-8 text-gold" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center transform-gpu translate-z-30"
          variants={floatAnimation}
          initial="initial"
          animate="animate"
        >
          <Gem className="w-8 h-8 text-gold" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-20 w-16 h-16 bg-burgundy/20 rounded-full flex items-center justify-center transform-gpu translate-z-35"
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '2s' }}
        >
          <Gem className="w-6 h-6 text-burgundy" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-abuja-brown/20 rounded-full transform-gpu translate-z-40"
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '4s' }}
        />
      </div>



      {/* Hero Content with 3D effect */}
      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto transform-gpu translate-z-50">
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
