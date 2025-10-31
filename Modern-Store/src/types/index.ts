// types.ts
export type Category = 'all' | 'men' | 'women';
export type Subcategory = 't-shirts' | 'shirts' | 'jeans' | 'sweatshirts' | 'sweatpants';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Exclude<Category, 'all'>; // only 'men' | 'women'
  subcategory: Subcategory;
  image: string;
  description: string;
  sizes: Size[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}

export interface FilterState {
  category: Category;
  subcategory?: Subcategory | null; 
}
