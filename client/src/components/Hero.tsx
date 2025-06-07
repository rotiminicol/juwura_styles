import { motion } from 'framer-motion';
import { ArrowRight, Star, Gem, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, fadeIn, floatAnimation } from '@/lib/animations';
import { Link } from 'wouter';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-white to-gold/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center"
          variants={floatAnimation}
          initial="initial"
          animate="animate"
        >
          <Star className="w-8 h-8 text-gold" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-burgundy/20 rounded-full flex items-center justify-center"
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-left"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-gold/10 rounded-full mb-6"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <Star className="w-4 h-4 text-gold mr-2" />
              <span className="text-sm font-medium text-abuja-brown">Premium African Fashion</span>
            </motion.div>

            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-abuja-brown leading-tight">
              Style Your
              <span className="block text-gold">Avatar</span>
              <span className="block text-abuja-brown">Experience</span>
            </h1>

            <p className="text-xl lg:text-2xl mb-8 text-abuja-brown/80 leading-relaxed max-w-xl">
              Create your perfect avatar with authentic African fashion. From traditional Adire to modern designs, 
              bring your style vision to life.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 }}
            >
              <Link href="/collection">
                <Button
                  size="lg"
                  className="bg-abuja-brown text-cream px-8 py-4 rounded-full font-semibold hover:bg-abuja-dark transform hover:scale-105 transition-all duration-300 group"
                >
                  Start Styling
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-abuja-brown text-abuja-brown px-8 py-4 rounded-full font-semibold hover:bg-abuja-brown hover:text-cream transition-all duration-300 group"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.9 }}
            >
              <div>
                <div className="text-3xl font-bold text-abuja-brown">500+</div>
                <div className="text-sm text-abuja-brown/70">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-abuja-brown">100+</div>
                <div className="text-sm text-abuja-brown/70">Unique Designs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-abuja-brown">5★</div>
                <div className="text-sm text-abuja-brown/70">Customer Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Images */}
          <motion.div
            className="relative"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <div className="relative grid grid-cols-2 gap-4 h-[600px]">
              {/* Main large image */}
              <motion.div
                className="relative col-span-1 row-span-2"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
              >
                <img
                  src="/src/assets/wed.png"
                  alt="African fashion model"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abuja-brown/20 to-transparent rounded-3xl" />
              </motion.div>

              {/* Smaller images */}
              <div className="col-span-1 space-y-4">
                <motion.div
                  className="relative h-[140px]"
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: '1s' }}
                >
                  <img
                    src="/src/assets/wed2.png"
                    alt="Traditional African wear"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>
                
                <motion.div
                  className="relative h-[140px]"
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: '2s' }}
                >
                  <img
                    src="/src/assets/wed3.png"
                    alt="African accessories"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>

                <motion.div
                  className="relative h-[140px]"
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: '3s' }}
                >
                  <img
                    src="/src/assets/wed4.png"
                    alt="Modern African fashion"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>

                <motion.div
                  className="relative h-[140px]"
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: '4s' }}
                >
                  <img
                    src="/src/assets/wed5.png"
                    alt="African cultural wear"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
              variants={floatAnimation}
              initial="initial"
              animate="animate"
              style={{ animationDelay: '5s' }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-abuja-brown" />
                </div>
                <div>
                  <div className="font-semibold text-abuja-brown">Premium Quality</div>
                  <div className="text-sm text-abuja-brown/70">Authentic African Fashion</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}