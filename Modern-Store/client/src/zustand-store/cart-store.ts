import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "../../types";


// Creating the store. `create<CartState>()` makes a hook with the CartState API.
// Wrapping the store in `persist(...)` so Zustand saves to localStorage automatically.
export const useCartStore = create<CartState>()(
    persist(
        // The store initializer: receiving `set`,  and return initial state + actions.
        (set) => ({
            //inital state
            items: [],

            addItem: (product, size, qty) => 
                //Using functional `set` so we always work with the latest state.
                set((state) => {

                    const exists = state.items.find((item) => item.product._id === product._id && item.size === size)

                    // If it exists, return a *new* items array where that line's quantity is increased.
                    if(exists){
                        return {
                            items: state.items.map((item) => 
                            item.product._id === product._id && item.size === size
                        ? { ...item, quantity: item.quantity + qty }  //immutable update of that one item
                        : item) // everything else unchanged (same reference)
                        }
                    }

                    // If it doesn't exist, append a new line to the cart (again immutably).
            return { items: [...state.items, { product, size, quantity: qty }] };
                }
            ),

            removeItem: (productId, size) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => !(item.product._id === productId && item.size === size)
                    ),
                })),

                updateQty: (productId, size, qty) =>
                    set((state) => ({
                        items: state.items.map((item) => 
                        item.product._id === productId && item.size === size
                        ? { ...item, quantity: qty }  //immutable update of that one item
                        : item) // everything else unchanged (same reference)
                        
                    })),

            clear: () => set({ items: [] }),
        }),

        {name: "cart-storage"} //config for persist (here, the key in localStorage
    )
)