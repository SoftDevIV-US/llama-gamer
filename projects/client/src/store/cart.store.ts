import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CartProduct } from '@/models/product.model';

type Cart = {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getTotalPrice: () => number;
};

const useCartStore = create<Cart>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product: CartProduct) => {
        const { cart } = get();
        if (cart.find((item) => item.product.id === product.product.id)) {
          return;
        }
        set({ cart: [...cart, product] });
      },
      removeFromCart: (id: string) => {
        const { cart } = get();
        const newCart = cart.filter((item) => item.product.id !== id);
        set({ cart: newCart });
      },
      isInCart: (id: string) => {
        const { cart } = get();
        return !!cart.find((item) => item.product.id === id);
      },
      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.totalPrice, 0);
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
