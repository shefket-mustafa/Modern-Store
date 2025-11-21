import { Link } from "react-router";
import type { FilterState } from "../types";

interface CategoryFilterProps {
  currentCategory?: string;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const subcategories = [
  {
    value: "tshirts",
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

export const CategoryFilter = ({ currentCategory }: CategoryFilterProps) => {
  
  
    return (
    <div className="space-y-6">
      <div className="flex flex-col justify-center items-center gap-4">
        {subcategories.map((sub) => (
          <div key={sub.value} className="flex flex-col items-center gap-2">
            <Link
              to={`/shop/${currentCategory}/${sub.value}`}
              className="w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <img
                src={sub.imageUrl}
                alt={sub.label}
                className="w-full h-full object-cover"
              />
            </Link>

            <span className="text-sm font-medium text-gray-700">
              {sub.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
