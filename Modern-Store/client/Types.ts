

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

