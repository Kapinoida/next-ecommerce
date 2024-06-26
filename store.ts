import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AddCartType } from './types/AddCartType'

type CartState = {
    isOpen: boolean
    cart: AddCartType[]
    toggleCart: () => void
    addProduct: (item: AddCartType) => void
    removeProduct: (item: AddCartType) => void
    paymentIntent: string
    setPaymentIntent: (val: string) => void
    onCheckout: string
    setCheckout: (val: string) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
            paymentIntent: '',
            onCheckout: 'cart',
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            addProduct: (item) => 
                set((state) => {
                  const existingIndex = state.cart.findIndex((cartItem) => cartItem.id === item.id);
              
                  if (existingIndex !== -1) {
                    // Update existing quantity
                    return {
                      ...state,
                      cart: state.cart.map((cartItem, index) => index === existingIndex
                        ? { ...cartItem, quantity: cartItem.quantity! + 1 }
                        : cartItem
                      )
                    };
                  } else {
                    // Add as new item
                    return { ...state, cart: [...state.cart, { ...item, quantity: 1 }] };
                  }
                }),
                removeProduct: (item) =>
                    set((state) => {
                      const existingIndex = state.cart.findIndex((cartItem) => cartItem.id === item.id);
                  
                      if (existingIndex !== -1) {
                        const updatedCart = state.cart.map((cartItem, index) => index === existingIndex
                          ? { ...cartItem, quantity: cartItem.quantity! - 1 }
                          : cartItem
                        );
                  
                        if (updatedCart[existingIndex].quantity! <= 0) {
                          // Filter out item if quantity reaches 0
                          return { ...state, cart: updatedCart.filter((_, index) => index !== existingIndex) };
                        } else {
                          return { ...state, cart: updatedCart };
                        }
                      } else {
                        return state; // No change if item not present
                      }
                    }),
            setPaymentIntent: (val) => set((state) => ({ paymentIntent: val })),
            setCheckout: (val) => set((state) => ({ onCheckout: val })),
            clearCart: () => set((state) => ({ cart: [] })),

        }),
        { name: 'cart-store'}
    )
)

type ThemeState = {
  mode: 'light' | 'dark'
  toggleMode: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleMode: (theme) => set((state) => ({ mode: theme })),
    }),
    { name: 'theme-store' }
  )
)