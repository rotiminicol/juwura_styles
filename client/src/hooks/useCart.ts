import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useStore } from '@/lib/store';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  size?: string;
  product: {
    id: number;
    name: string;
    price: string;
    images: string[];
  };
}

export function useCart() {
  const queryClient = useQueryClient();
  const { setCartOpen } = useStore();

  const cartQuery = useQuery<CartItem[]>({
    queryKey: ['/api/cart'],
    refetchOnWindowFocus: false,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (data: { productId: number; quantity: number; size?: string }) => {
      const response = await apiRequest('POST', '/api/cart', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: 'Added to cart',
        description: 'Item has been added to your cart successfully.',
      });
      setCartOpen(true);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const response = await apiRequest('PUT', `/api/cart/${id}`, { quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update cart item. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: 'Removed from cart',
        description: 'Item has been removed from your cart.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to remove item from cart. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('DELETE', '/api/cart');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  const cartTotal = cartQuery.data?.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  ) || 0;

  const cartCount = cartQuery.data?.reduce(
    (count, item) => count + item.quantity,
    0
  ) || 0;

  return {
    cartItems: cartQuery.data || [],
    cartTotal,
    cartCount,
    isLoading: cartQuery.isLoading,
    addToCart: addToCartMutation.mutate,
    updateCart: updateCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
  };
}
