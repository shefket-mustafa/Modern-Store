import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useUser } from "../hooks/useUser";
import type { HeaderProps } from "../types";


export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  console.log(user);
  
  return (
    <header className="border-b sticky top-0 bg-background z-50 shadow-sm backdrop-blur-md bg-white/75">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          MODERN<span className="text-accent text-orange-500">STORE</span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          <Link
            to="/"
            className="hover:text-accent hover:underline hover:shadow-lg transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/shop/women"
            className="hover:text-accent hover:underline hover:shadow-lg transition font-medium"
          >
            Women
          </Link>
          <Link
            to="/shop/men"
            className="hover:text-accent hover:underline hover:shadow-lg transition font-medium"
          >
            Men
          </Link>
          <Link
            to="/shop/kids"
            className="hover:text-accent hover:underline hover:shadow-lg transition font-medium"
          >
            Kids
          </Link>
          <Link
            to="/about"
            className="hover:text-accent hover:underline hover:shadow-lg transition font-medium"
          >
            About
          </Link>
        </nav>

        <div>
          {!user && (
            <Link
              to="/auth/login"
              className="mr-4 hover:text-accent hover:underline hover:shadow-lg transition font-medium"
            >
              Login
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="mr-4 hover:text-accent hover:underline hover:shadow-lg transition font-medium"
            >
              Admin
            </Link>
          )}

          {user && (
            <button
              onClick={logoutHandler}
              className="mr-4 hover:text-accent cursor-pointer hover:underline hover:shadow-lg transition font-medium"
            >
              Logout
            </button>
          )}

        {user && (

          <Button
          variant="ghost"
          size="icon"
          onClick={onCartClick}
          className="relative hover:scale-150 transition cursor-pointer"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
              )}
        </div>
      </div>
    </header>
  );
};
