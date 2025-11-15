import * as React from 'react';
import type { CartItem, Product, Size } from './src/types';

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


export type CartState = {
  items: CartItem[];
  addItem: (product: Product, size: Size, qty: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clear: () => void;
};


export type allUsersType = {
  _id: string;
  username: string;
  email: string;
}