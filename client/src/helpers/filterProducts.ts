
import type { FilterState, Product } from "../types";


export const filterProducts = (products: Product[], filters: FilterState) => {
  return products.filter((p) => {
    // BRAND FILTER ────────────────────────────────
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
      return false;
    }

    // COLOR FILTER ─────────────────────────────────
    if (filters.colors.length > 0) {
      const hasColor = p.colors.some((c) => filters.colors.includes(c));
      if (!hasColor) return false;
    }

    return true;
  });
};
