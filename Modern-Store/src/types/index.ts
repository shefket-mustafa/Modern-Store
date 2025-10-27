export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women';
  subcategory: 't-shirts' | 'shirts' | 'jeans' | 'sweatshirts' | 'sweatpants';
  image: string;
  description: string;
  sizes: Size[];
  inStock: boolean;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}

export interface FilterState {
  category: 'all' | 'men' | 'women';
  subcategory: string | null;
}
