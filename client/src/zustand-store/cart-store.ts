import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "../types";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, size, qty) =>
        set((state) => {
          const exists = state.items.find(
            (item) => item.product._id === product._id && item.size === size
          );

          if (exists) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id && item.size === size
                  ? { ...item, quantity: item.quantity + qty }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, size, quantity: qty }],
          };
        }),

      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.product._id === productId && item.size === size)
          ),
        })),

      updateQty: (productId, size, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId && item.size === size
              ? { ...item, quantity: qty }
              : item
          ),
        })),

      clear: () => set({ items: [] }),
    }),

    { name: "cart-storage" }
  )
);
