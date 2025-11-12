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