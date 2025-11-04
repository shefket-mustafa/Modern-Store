import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="border-b sticky top-0 bg-background z-50 shadow-sm backdrop-blur-md bg-white/75">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          MODERN<span className="text-accent text-orange-500">STORE</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-accent hover:underline hover:shadow-lg transition font-medium">
            Home
          </Link>
          <Link to="/shop/men" className="hover:text-accent hover:underline hover:shadow-lg transition font-medium">
            Men
          </Link>
          <Link to="/shop/women" className="hover:text-accent hover:underline hover:shadow-lg transition font-medium">
            Women
          </Link>
          <Link to="/about" className="hover:text-accent hover:underline hover:shadow-lg transition font-medium">
            About
          </Link>
        </nav>

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
      </div>
    </header>
  );
};
