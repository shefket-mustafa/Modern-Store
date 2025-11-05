

export type UserType = {
    username: string;
    email: string;
    password: string
}
export interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export type UserContextType = {
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}