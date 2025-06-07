import { motion } from 'framer-motion';
import { Heart, Award, Globe, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, floatAnimation } from '@/lib/animations';

export default function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: 'Heritage',
      description: 'Preserving traditional African fashion for future generations',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Premium materials and expert craftsmanship in every piece',
    },
    {
      icon: Globe,
      title: 'Global',
      description: 'Bringing African fashion to customers worldwide',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Supporting local artisans and traditional craftspeople',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="Traditional African tailors working on beautiful fabrics"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/80 to-cream/95" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-6 text-abuja-brown">
              Crafting Heritage,<br />
              <span className="text-gold">Celebrating Culture</span>
            </h2>
            <p className="text-lg text-abuja-brown/80 mb-6 leading-relaxed">
              JUWURA represents the fusion of traditional African craftsmanship with 
              contemporary fashion sensibilities. Each piece in our collection tells a 
              story of heritage, skill, and cultural pride.
            </p>
            <p className="text-lg text-abuja-brown/80 mb-8 leading-relaxed">
              From the intricate patterns of our Adire bags to the regal elegance of 
              our Gele headwraps, every item is carefully curated to celebrate the rich 
              textile traditions of Africa while meeting the needs of today's discerning customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-abuja-brown text-cream px-8 py-3 rounded-full font-semibold hover:bg-abuja-dark transition-all duration-300">
                Our Story
              </Button>
              <Button
                variant="outline"
                className="border-2 border-abuja-brown text-abuja-brown px-8 py-3 rounded-full font-semibold hover:bg-abuja-brown hover:text-cream transition-all duration-300"
              >
                Meet Our Artisans
              </Button>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600"
                alt="African model wearing traditional outfit"
                className="rounded-2xl shadow-lg"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
              />
              <div className="pt-8">
                <motion.img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Traditional African fabric patterns and textures"
                  className="rounded-2xl shadow-lg"
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: '2s' }}
                />
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-20 h-20 bg-gold/20 rounded-full"
              variants={floatAnimation}
              initial="initial"
              animate="animate"
              style={{ animationDelay: '1s' }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-burgundy/20 rounded-full"
              variants={floatAnimation}
              initial="initial"
              animate="animate"
              style={{ animationDelay: '3s' }}
            />
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-abuja-brown" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2 text-abuja-brown">
                {feature.title}
              </h3>
              <p className="text-abuja-brown/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
