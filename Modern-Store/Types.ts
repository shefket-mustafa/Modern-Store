export type UserType = {
    username: string;
    email: string;
    password: string
}
export interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}