import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/lib/store';
import { scaleIn } from '@/lib/animations';
import { toast } from '@/hooks/use-toast';

export default function LoginModal() {
  const { isLoginModalOpen, setLoginModalOpen, setUser } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setUser(data);
      setLoginModalOpen(false);
      setFormData({ email: '', password: '', firstName: '', lastName: '' });
      
      toast({
        title: isLogin ? 'Welcome back!' : 'Account created!',
        description: isLogin 
          ? 'You have successfully signed in.' 
          : 'Your account has been created successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLoginModalOpen(false);
            }
          }}
        >
          <motion.div
            className="bg-cream rounded-2xl shadow-2xl w-full max-w-md relative"
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-abuja-brown/60 hover:text-abuja-brown z-10"
              onClick={() => setLoginModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl font-bold mb-2 text-abuja-brown">
                  {isLogin ? 'Welcome Back' : 'Join JUWURA'}
                </h2>
                <p className="text-abuja-brown/70">
                  {isLogin 
                    ? 'Sign in to your account' 
                    : 'Create your account to get started'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-abuja-brown font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required={!isLogin}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-abuja-brown font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required={!isLogin}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="text-abuja-brown font-medium">
                    Email Address
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
                  <Label htmlFor="password" className="text-abuja-brown font-medium">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pr-10 border-abuja-brown/20 focus:border-gold focus:ring-gold/20"
                      placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-abuja-brown/60 hover:text-abuja-brown"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-abuja-brown/20 text-gold focus:ring-gold/20"
                      />
                      <span className="ml-2 text-abuja-brown/70">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-gold hover:text-gold/80 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-abuja-brown text-cream py-3 rounded-lg font-semibold hover:bg-abuja-dark transform hover:scale-105 transition-all duration-300"
                >
                  {isLoading 
                    ? 'Please wait...' 
                    : isLogin 
                      ? 'Sign In' 
                      : 'Create Account'
                  }
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-abuja-brown/70">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-gold hover:text-gold/80 font-semibold transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
