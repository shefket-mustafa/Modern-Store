import { createContext, useContext, useState } from "react";
import type { FilterState, ShopContextType, ShopTitleTypes } from "../types";


const ShopContext = createContext<ShopContextType | undefined>(undefined);


export const ShopProvider = ({ children }: { children: React.ReactNode }) => {

      const [filters, setFilters] = useState<FilterState>({
        category: "all",
        subcategory: null,
      });
      const [shopTitle, setShopTitle] = useState<ShopTitleTypes>("All Products");

        const resetFilters = () => {
    setFilters({ category: "all", subcategory: null });
  };

      
  return (
    <ShopContext.Provider value={{filters, setFilters, resetFilters, shopTitle, setShopTitle}}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
    const context = useContext(ShopContext);
    if(!context){
        throw new Error("useShop must be used within a ShopProvider");
    }
    return context
}