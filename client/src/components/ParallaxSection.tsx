import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Scissors, Palette, Crown } from 'lucide-react';

export default function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: Scissors,
      title: 'Handcrafted',
      description: 'Each piece is carefully crafted by skilled artisans using traditional techniques',
    },
    {
      icon: Palette,
      title: 'Authentic',
      description: 'Every design respects and celebrates traditional African patterns and meanings',
    },
    {
      icon: Crown,
      title: 'Premium',
      description: 'We source the finest materials to create pieces worthy of royalty',
    },
  ];

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]"
      >
        <img
          src="https://images.unsplash.com/photo-1582035276616-2845aa7d2ebc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1200"
          alt="Intricate African fabric patterns and textures"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-abuja-brown/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="container mx-auto max-w-4xl px-4 text-center text-white">
          <motion.h2
            className="font-playfair text-4xl lg:text-5xl font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Experience the Artistry
          </motion.h2>
          
          <motion.p
            className="text-xl text-cream/90 mb-12 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Each fabric tells a story. Every pattern carries meaning. Discover the rich 
            heritage woven into every thread of our collections.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-abuja-brown" />
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-cream/80">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
