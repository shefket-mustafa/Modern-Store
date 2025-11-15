import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Routes, Route } from "react-router";
import { Landing } from "./pages/Landing";
import { Shop } from "./pages/Shop";
import NotFound from "./pages/NotFound";
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
import { useCartStore } from "./zustand-store/cart-store";

const queryClient = new QueryClient();

const App = () => {
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartItems = useCartStore((state) => state.items)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {user} = useUser();

 const handleAddToCart = useCartStore((state) => state.addItem);

  const handleRemoveItem = useCartStore((state) => state.removeItem);

  const handleUpdateQuantity = useCartStore((state) => state.updateQty);;

  // persist any time cart changes
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ShopProvider>
        <ScrollOnTop />
        <Toaster />
        <Sonner />

         <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              items={cartItems}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
            
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
           
          </div>
          </ShopProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
