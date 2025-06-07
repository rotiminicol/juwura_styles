import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useCart } from '@/hooks/useCart';
import { slideInLeft } from '@/lib/animations';

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { 
    isMobileMenuOpen, 
    setMobileMenuOpen, 
    setCartOpen, 
    setLoginModalOpen,
    user 
  } = useStore();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'COLLECTIONS', href: '/products' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-abuja-brown rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-cream" />
              </div>
              <span className="font-playfair font-bold text-2xl text-abuja-brown">
                JUWURA
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.span
                  className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
                    location === item.href
                      ? 'text-gold'
                      : 'text-abuja-brown hover:text-gold'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-abuja-brown hover:text-gold"
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-abuja-brown hover:text-gold"
              onClick={() => user ? null : setLoginModalOpen(true)}
            >
              <User className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-abuja-brown hover:text-gold"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-burgundy text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                >
                  {cartCount}
                </motion.span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-abuja-brown hover:text-gold"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="lg:hidden fixed right-0 top-0 h-full w-80 bg-cream z-50 shadow-2xl"
              variants={slideInLeft}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-playfair font-bold text-xl text-abuja-brown">
                    Menu
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <nav className="space-y-6">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a
                        className="block text-lg text-abuja-brown hover:text-gold transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  <hr className="border-abuja-brown/20" />
                  {!user && (
                    <>
                      <button
                        className="block text-lg text-abuja-brown hover:text-gold transition-colors duration-300"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLoginModalOpen(true);
                        }}
                      >
                        Login
                      </button>
                      <button className="block text-lg text-abuja-brown hover:text-gold transition-colors duration-300">
                        Sign Up
                      </button>
                    </>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
