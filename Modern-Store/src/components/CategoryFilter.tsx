import type { FilterState, Subcategory } from "../types";
import clsx from "clsx";

interface CategoryFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const subcategories = [
  {
    value: "t-shirts",
    label: "T-Shirts",
    imageUrl:
      "https://timshop.timhortons.ca/cdn/shop/files/retro-logo-tshirt-back-1000px.png?v=1750349029&width=1000",
  },
  {
    value: "shirts",
    label: "Shirts",
    imageUrl:
      "https://johncraig.co.za/media/catalog/product/cache/8e71962534cb112d3996d77af375c1d8/p/r/pre21b-president-club-plain-formal-shirt-black-jc-sh-blk-003-v2_jpg.jpg",
  },
  {
    value: "jeans",
    label: "Jeans",
    imageUrl:
      "https://images.napali.app/global/element-products/all/default/xlarge/eljdp00106_element,f_bnt0_frt1.jpg",
  },
  {
    value: "sweatshirts",
    label: "Sweatshirts",
    imageUrl:
      "https://mms-images-prod.imgix.net/mms/images/catalog/e9b3299a177e1536f4b0b722582bcaf5/categories/71.jpg?ixlib=rails-2.1.4&w=360&h=360&sharp=10&q=85&dpr=1&trim=auto&trimmd=0&fit=fill&bg=ffffff&fm=pjpg&auto=format",
  },
  {
    value: "sweatpants",
    label: "Sweatpants",
    imageUrl:
      "https://hourscollection.com/cdn/shop/files/ClassicSweatpants-Grey.png?v=1741188080",
  },
];

export const CategoryFilter = ({ filters, onFilterChange }: CategoryFilterProps) => {
  return (
    <div className="space-y-6">
      {/* <h3 className="font-semibold mb-3 text-lg">Shop by Type</h3> */}
      <div className="flex flex-col justify-center items-center gap-4">
        {subcategories.map((sub) => {
          const isActive = filters.subcategory === sub.value;
          return (
            <div key={sub.value} className="flex flex-col items-center gap-2">
              <button
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    subcategory:
                      filters.subcategory === sub.value ? null : (sub.value as Subcategory),
                  })
                }
                className={clsx(
                  "w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer",
                  isActive
                    ? "border-black scale-110 shadow-md"
                    : "border-gray-300 hover:scale-105 hover:border-gray-400"
                )}
              >
                <img
                  src={sub.imageUrl}
                  alt={sub.label}
                  className="w-full h-full object-cover"
                />
              </button>
              <span
                className={clsx(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-black" : "text-gray-500"
                )}
              >
                {sub.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
