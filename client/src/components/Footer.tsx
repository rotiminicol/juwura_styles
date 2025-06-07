import { Crown, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';

export default function Footer() {
  const footerLinks = {
    quickLinks: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Collections', href: '/products' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Care Instructions', href: '/care' },
      { name: 'Custom Orders', href: '/custom' },
    ],
    customerCare: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Support', href: '/support' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-abuja-brown text-cream py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-abuja-brown" />
              </div>
              <span className="font-playfair font-bold text-2xl">JUWURA</span>
            </div>
            <p className="text-cream/80 mb-6 leading-relaxed">
              Celebrating African heritage through premium traditional fashion and 
              authentic craftsmanship. Every piece tells a story of culture and pride.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-cream/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-abuja-brown transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-cream/80 hover:text-gold transition-colors duration-300">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-6">Customer Care</h3>
            <ul className="space-y-3">
              {footerLinks.customerCare.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-cream/80 hover:text-gold transition-colors duration-300">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-6">Newsletter</h3>
            <p className="text-cream/80 mb-4">
              Subscribe to get updates on new arrivals and exclusive offers
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-cream/10 border-cream/20 text-cream placeholder:text-cream/60 focus:border-gold focus:ring-gold/20 rounded-l-lg rounded-r-none"
              />
              <Button className="bg-gold text-abuja-brown px-6 py-2 rounded-r-lg rounded-l-none font-semibold hover:bg-gold/90 transition-colors duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-cream/60 text-sm mb-4 md:mb-0">
            © 2024 JUWURA. All rights reserved. Made with ❤️ for African fashion lovers.
          </p>
          <div className="flex space-x-6 text-sm">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} href={link.href}>
                <a className="text-cream/60 hover:text-gold transition-colors duration-300">
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
