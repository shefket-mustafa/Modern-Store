import type { FilterState, Product } from "../types";

export const filterProducts = (products: Product[], filters: FilterState): Product[] => {
  return products.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    
    if (filters.subcategory && product.subcategory !== filters.subcategory) {
      return false;
    }
    
    return true;
  });
};
