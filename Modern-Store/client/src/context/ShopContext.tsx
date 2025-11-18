import { useState } from "react";
import type { FilterState, ShopTitleTypes } from "../types";
import { ShopContext } from "../hooks/use-shop-context";




export const ShopProvider = ({ children }: { children: React.ReactNode }) => {

      const [filters, setFilters] = useState<FilterState>({
        category: "all",
        subcategory: null,
          brands: [],
  colors: []
      });
      const [shopTitle, setShopTitle] = useState<ShopTitleTypes>("All Products");

        const resetFilters = () => {
    setFilters({ category: "all", subcategory: null ,  brands:[], colors:[], });
  };

      
  return (
    <ShopContext.Provider value={{filters, setFilters, resetFilters, shopTitle, setShopTitle}}>
      {children}
    </ShopContext.Provider>
  );
}

