import { ArrowRight } from 'lucide-react';
import { Link} from "react-router"
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { useEffect, useState } from 'react';
import type { Product } from '../types';

interface LandingProps {
  onAddToCart: (product: Product, size: "XS" | "S" | "M" | "L" | "XL" | "XXL", quantity: number) => void;
}



export const Landing = ({ onAddToCart }: LandingProps) => {
  const [featuredCollection, setFeaturedCollection] = useState<Product[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {

    const featuredCollection = async() => {
  try{

      const response = await fetch(`${BASE_URL}/items`, {
        method: "GET",
        headers: {"Content-Type":"application/json"}
      });
      if(!response.ok) throw new Error("Failed to fetch featured collection!")
      const data = await response.json();
      const last4 = data.slice(0,4);
      setFeaturedCollection(last4)
    }catch(err){
      console.error("Failed to show featured: ",err)
    }
  }
  
  featuredCollection()

},[BASE_URL])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80)',
            filter: 'brightness(0.7)',
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            MODERN<span className="text-accent text-orange-500">STORE</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
            Elevate your style with our curated collection of contemporary fashion
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white border text-white hover:bg-white/30 hover:text-primary" asChild>
              <Link to="/shop/all">
                Shop Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/30 hover:text-primary" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Shop By Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/shop/men" className="group relative h-96 overflow-hidden rounded-lg">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-4xl font-bold">MEN</h3>
              </div>
            </Link>
            <Link to="/shop/women" className="group relative h-96 overflow-hidden rounded-lg">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-4xl font-bold">WOMEN</h3>
              </div>
            </Link>
            <Link to="/shop/kids" className="group relative h-96 overflow-hidden rounded-lg">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: 'url(https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F89392s2.jpg?im=Resize,width=750)',
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-4xl font-bold">KIDS</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground text-lg">Handpicked pieces from our latest arrivals</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCollection.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-20 bg-primary text-primary-foreground bg-black/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Fashion That Speaks Your Language
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            We believe in creating timeless pieces that blend contemporary design with exceptional quality. 
            Every item in our collection is carefully selected to ensure you look and feel your best.
          </p>
          <Button size="lg" className='bg-white hover:bg-white/80 transition rounded-lg' variant="secondary" asChild>
            <Link className='text-black text-xl ' to="/about">Our Story</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
