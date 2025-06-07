import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
}

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface StoreState {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Cart state
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  
  // UI state
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Cart state
      cartItems: [],
      addToCart: (item) => set((state) => {
        const existingItem = state.cartItems.find(
          (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size
        );
        
        if (existingItem) {
          return {
            cartItems: state.cartItems.map((cartItem) =>
              cartItem.id === existingItem.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            ),
          };
        }
        
        return {
          cartItems: [...state.cartItems, { ...item, id: Date.now() }],
        };
      }),
      
      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      })),
      
      clearCart: () => set({ cartItems: [] }),
      
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
      },
      
      getCartCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },
      
      // UI state
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      
      isLoginModalOpen: false,
      setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),
      
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: 'juwura-store',
      partialize: (state) => ({
        user: state.user,
        cartItems: state.cartItems,
      }),
    }
  )
);
