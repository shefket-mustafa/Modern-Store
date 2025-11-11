import { CategoryFilter } from "../components/CategoryFilter";
import { ProductCard } from "../components/ProductCard";
import { filterProducts } from "../helpers/filterProducts";
import { mockProducts } from "../data/mockProducts";
import type { Product, ShopProps, ShopTitleTypes } from "../types";
import { useShop } from "../context/ShopContext";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";



export const Shop = ({ onAddToCart }: ShopProps) => {

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { filters, setFilters, shopTitle, setShopTitle } = useShop();
  const pathname = useLocation().pathname;
const titleSegment = pathname.split("/").pop()?.toLowerCase();
const title = titleSegment === "shop" || !titleSegment ? undefined : titleSegment;

  const [products, setProducts] = useState<Product[]>([]);

    const fetchCategory = useMemo(() => {
    const topLevel = ["men", "women", "all"];
    const f = typeof filters?.category === "string" ? filters.category.toLowerCase() : undefined;
    return f && topLevel.includes(f) ? f : title;
  }, [filters?.category, title]);

  useEffect(() => {
    let safeTitle: ShopTitleTypes;

    switch (fetchCategory) {
      case "men":
        safeTitle = "Men's Collection";
        break;
      case "women":
        safeTitle = "Women's Collection";
        break;
      default:
        safeTitle = "All Products";
    }
    setShopTitle(safeTitle)
  },[title, setShopTitle]);

  console.log(shopTitle);
  
  useEffect(() => {
    const controller = new AbortController();
    const fetchItems = async() => {
      try{
        const category = title !== "all" ? title: undefined;
        const url = new URL(`${BASE_URL}/items`);
        if(category) url.searchParams.append("category", category);

        const res = await fetch(url.toString(), {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          signal: controller.signal
        })
        if(!res.ok) throw new Error("Error fetching items")
          const data = await res.json();
        setProducts(data)
        
      }catch(err){

        console.error("Error fetching data: ", err)
      }
    }

    fetchItems()
    return () => controller.abort()
    
  },[title, BASE_URL])
  
  

  const filteredProducts = filterProducts(products, filters);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* --- Sidebar --- */}
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <CategoryFilter filters={filters} onFilterChange={setFilters} />
          </div>
        </aside>

        {/* --- Products --- */}
        <main className="md:col-span-3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {shopTitle}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found matching your filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
