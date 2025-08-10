'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import type { CartItem, Product } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
  setCartForCheckout: (product: Product) => void;
  restoreCart: () => void;
  // We will add more functions like removeFromCart, updateQuantity later
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [stashedCart, setStashedCart] = useState<CartItem[] | null>(null);

  const clearCart = () => {
    setCartItems([]);
  };

  const setCartForCheckout = (product: Product) => {
    setStashedCart(cartItems); // Save the current cart
    setCartItems([{ product, quantity: 1 }]); // Set cart to only the single item
  };

  const restoreCart = () => {
    if (stashedCart !== null) {
      setCartItems(stashedCart);
      setStashedCart(null);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item to cart
      return [...prevItems, { product, quantity: 1 }];
    });
    // For demonstration, we can log the cart state
    console.log(`Added ${product.name} to cart.`);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, setCartForCheckout, restoreCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
