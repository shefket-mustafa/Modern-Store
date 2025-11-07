import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Routes, Route } from "react-router";
import { Landing } from "./pages/Landing";
import { Shop } from "./pages/Shop";
import NotFound from "./pages/NotFound";
import type { CartItem, Size } from "./types";
import { mockProducts } from "./data/mockProducts";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Sonner } from "./components/ui/sonner";
import { Header } from "./components/Header";
import About from "./pages/About";
import { ProductDetail } from "./pages/ProductDetails";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import ScrollOnTop from "./helpers/ScrollOnTop";
import { ShopProvider } from "./context/ShopContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { useUser } from "./hooks/useUser";

const queryClient = new QueryClient();

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {user} = useUser();

  const handleAddToCart = (productId: string, size: Size, quantity: number) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === productId && item.size === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, size, quantity }];
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ShopProvider>
        <ScrollOnTop />
        <Toaster />
        <Sonner />
          <div className="min-h-screen bg-background flex flex-col">
            <Header
              cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
              onCartClick={() => setIsCartOpen(true)}
            />
            <Routes>
              <Route path="/" element={<Landing onAddToCart={handleAddToCart} />} />
              <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
               <Route path="/shop/:category" element={<Shop onAddToCart={handleAddToCart} />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              {user?.role === 'admin' && (
                <Route path="/admin" element={<Admin />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              items={cartItems}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
          </ShopProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
