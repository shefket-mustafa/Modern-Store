import type { Product, FilterState } from '../types';

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  const { category, subcategory } = filters;
  let result = products;
  if (category !== 'all') result = result.filter(p => p.category === category);
  if (subcategory) result = result.filter(p => p.subcategory === subcategory);
  return result;
}