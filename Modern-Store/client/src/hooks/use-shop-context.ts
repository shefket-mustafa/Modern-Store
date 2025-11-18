import { createContext, useContext } from "react";
import type { ShopContextType } from "../types";

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
    const context = useContext(ShopContext);
    if(!context){
        throw new Error("useShop must be used within a ShopProvider");
    }
    return context
}