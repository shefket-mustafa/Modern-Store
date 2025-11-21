import { CategoryFilter } from "../components/CategoryFilter";
import { ProductCard } from "../components/ProductCard";
import { filterProducts } from "../helpers/filterProducts";
import type { Product, ShopProps, ShopTitleTypes, SortOption } from "../types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useShop } from "../hooks/use-shop-context";
import { SlidersHorizontal } from "lucide-react";
import { sortProducts } from "../helpers/sortProducts";

export const Shop = ({ onAddToCart }: ShopProps) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { filters, setFilters, setShopTitle } = useShop();
  const pathname = useLocation().pathname;
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const segments = pathname.split("/").filter(Boolean); // removes empty parts
  const category = segments[1]; // e.g. "men" or "women"
  const subcategory = segments[2]; // e.g. "tshirts"
  const availableBrands = Array.from(new Set(products.map((p) => p.brand)));
  const availableColors = Array.from(
    new Set(products.flatMap((p) => p.colors))
  );


  

  useEffect(() => {
    const formatTitle = () => {
      if (!category || category === "all") return "All Products";

      if (category && !subcategory) {
        return `${category[0].toUpperCase() + category.slice(1)}${
          category.toLowerCase() === "men" || category.toLowerCase() === "women"
            ? "’s"
            : ""
        } Collection`;
      }

      if (category && subcategory) {
        return `${category[0].toUpperCase() + category.slice(1)}${
          category.toLowerCase() === "men" || category.toLowerCase() === "women"
            ? "’s"
            : ""
        } ${subcategory[0].toUpperCase() + subcategory.slice(1)}`;
      }

      return "All Products";
    };

    setShopTitle(formatTitle() as ShopTitleTypes);
  }, [category, subcategory, setShopTitle]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchItems = async () => {
      try {
        const url = new URL(`${BASE_URL}/items`);
        if (category && category !== "all")
          url.searchParams.append("category", category);
        if (subcategory) url.searchParams.append("subcategory", subcategory);

        const res = await fetch(url.toString(), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Error fetching items");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // Request was intentionally aborted — do nothing. The error in the console was bugging me
          return;
        }

        console.error("Error fetching data: ", err);
      }
    };

    fetchItems();
    return () => controller.abort();
  }, [category, subcategory, BASE_URL]);

  const toggleBrandFilter = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const toggleColorFilter = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const filteredProducts = sortProducts(
  filterProducts(products, filters),
  sortBy
);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* --- Sidebar --- */}
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <CategoryFilter filters={filters} currentCategory={category || 'all'} onFilterChange={setFilters} />
          </div>
        </aside>

        {/* --- Products --- */}
        <main className="md:col-span-3">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
            {/* Left section — title & product count */}
            <div>
              <h1 className="text-3xl font-bold mb-1">{useShop().shopTitle}</h1>
              <p className="text-muted-foreground text-sm">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Right section — sort & filter */}
            <div className="flex items-center gap-3 text-sm">
              <button
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 border rounded-md cursor-pointer px-2 py-1.5 hover:bg-muted transition"
              >
                <SlidersHorizontal className="w-4 h-4 " />
              </button>
              {filterOpen && (
                <div
                  className="fixed inset-0 bg-black/40 z-50 flex justify-end"
                  onClick={() => setFilterOpen(false)}
                >
                  <div
                    className="w-80 bg-white h-full p-4 shadow-lg transition-transform flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-semibold text-lg">Sort & Filter</h2>
                      <button
                        onClick={() => setFilterOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    {/* --- Sort Section --- */}
                    <div className="border-b border-gray-200 pb-3 mb-3">
                      <h3 className="font-medium mb-2">Sort by</h3>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => setSortBy("price-asc")} 
                        className="text-left transition hover:font-bold cursor-pointer">
                          Price: Low to High
                        </button>
                        <button onClick={() => setSortBy("price-desc")} 
                        className="text-left hover:text-primary hover:font-bold cursor-pointer transition">
                          Price: High to Low
                        </button>
                        <button onClick={() => setSortBy("name-asc")} 
                        className="text-left hover:text-primary hover:font-bold cursor-pointer transition">
                          Name: A → Z
                        </button>
                        <button onClick={() => setSortBy("name-desc")} 
                        className="text-left hover:text-primary hover:font-bold cursor-pointer transition">
                          Name: Z → A
                        </button>
                      </div>
                    </div>

                    {/* --- Filter Section --- */}
                    <div className="flex-1 overflow-auto">
                      <h3 className="font-medium mb-2">Filter by</h3>

                      <div className="space-y-4">
                        {/* Example Filter: Brand */}
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Brand</h4>
                          <div className="flex flex-col gap-1">
                            {availableBrands.length === 0
                              ? "No brands available"
                              : availableBrands.map((brand) => (
                                  <label
                                    key={brand}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={filters.brands?.includes(brand)}
                                      onChange={() => toggleBrandFilter(brand)}
                                    />
                                    {brand}
                                  </label>
                                ))}
                          </div>
                        </div>

                        {/* Example Filter: Color */}
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <div>
                              <h4 className="text-sm font-semibold mb-1">
                                Color
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {availableColors.length === 0 ? (
                                  <p className="text-xs text-gray-500">
                                    No available colors
                                  </p>
                                ) : (
                                  [...new Set(availableColors)].map((color) => (
                                    <button
                                      key={color}
                                      onClick={() => toggleColorFilter(color)}
                                      className={`
            px-3 py-1 text-sm rounded border 
            ${
              filters.colors.includes(color)
                ? "bg-black text-white border-black"
                : "bg-gray-100 text-gray-800"
            }
          `}
                                    >
                                      {color.charAt(0).toUpperCase() +
                                        color.slice(1)}
                                    </button>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product._id}
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
