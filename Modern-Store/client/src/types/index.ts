// types.ts
export type Category = 'all' | 'men' | 'women';
export type Subcategory = 't-shirts' | 'shirts' | 'jeans' | 'sweatshirts' | 'sweatpants';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: Exclude<Category, 'all'>; // only 'men' | 'women'
  subcategory: Subcategory;
  imageUrl: string;
  description: string;
  sizes: Size[];
  stockQuantity: number;
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

export interface ShopProps {
  onAddToCart: (productId: string, size: Size, quantity: number) => void;
}

export type ShopContextType = {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    resetFilters: () => void;
    shopTitle: string;
    setShopTitle: React.Dispatch<React.SetStateAction<ShopTitleTypes>>;
}

export type ShopTitleTypes = "All Products" | "Men's Collection" | "Women's Collection";
