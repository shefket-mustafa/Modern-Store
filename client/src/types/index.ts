// types.ts
export type Category = | "all" | 'men' | 'women' | 'kids';
export type AdminCategory = | 'men' | 'women' | 'kids';
export type Subcategory = 'tshirts' | 'shirts' | 'jeans' | 'sweatshirts' | 'sweatpants';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  _id: string;
  name: string;
  price: number;
  brand: string;
  colors: string[];
  category: Exclude<Category, 'all'>; 
  subcategory: Subcategory;
  imageUrl: string;
  description: string;
  sizes: Size[];
  stockQuantity: number;
}

export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  size: string;
  quantity: number;
}
export interface CartState {
  items: CartItem[];

  addItem: (product: CartItem["product"], size: string, qty: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clear: () => void;
}

export interface FilterState {
  category: Category;
  subcategory?: Subcategory | null; 
  brands: string[];
  colors: string[];
}

export interface ShopProps {
  onAddToCart: (product: Product, size: Size, quantity: number) => void;
}

export type ShopContextType = {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    resetFilters: () => void;
    shopTitle: string;
    setShopTitle: React.Dispatch<React.SetStateAction<ShopTitleTypes>>;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | null;

  import * as React from 'react';

export type UserType = {
  _id: string
    username: string;
    email: string;
    password: string
    // role indicates authorization level; 'user' by default, 'admin' for administrators
    role?: 'user' | 'admin'
}
export interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export type UserContextType = {
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}

export type AdminItemType = {
    _id: string;
    name: string;
    price: number;
    category: string;
    subcategory: string;
    imageUrl: string;
    description: string;
    sizes: string[];
    stockQuantity: number;
}

// export type AdminEditType = {
//     _id?: string;
//     name?: string;
//     price?: number;
//     category?: string;
//     subcategory?: string;
//     imageUrl?: string;
//     description?: string;
//     sizes?: string[];
//     stockQuantity?: number;
// }


export type allUsersType = {
  _id: string;
  username: string;
  email: string;
}

  

export type ShopTitleTypes = "All Products" | "Men's Collection" | "Women's Collection" | "Kids' Collection" | string;
