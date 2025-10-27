import type { FilterState } from "../types";
import { Button } from "./ui/button";

interface CategoryFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const subcategories = [
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'shirts', label: 'Shirts' },
  { value: 'jeans', label: 'Jeans' },
  { value: 'sweatshirts', label: 'Sweatshirts' },
  { value: 'sweatpants', label: 'Sweatpants' },
];

export const CategoryFilter = ({ filters, onFilterChange }: CategoryFilterProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          <Button
            variant={filters.category === 'all' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onFilterChange({ ...filters, category: 'all', subcategory: null })}
          >
            All
          </Button>
          <Button
            variant={filters.category === 'men' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onFilterChange({ ...filters, category: 'men', subcategory: null })}
          >
            Men
          </Button>
          <Button
            variant={filters.category === 'women' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onFilterChange({ ...filters, category: 'women', subcategory: null })}
          >
            Women
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Type</h3>
        <div className="space-y-2">
          {subcategories.map((sub) => (
            <Button
              key={sub.value}
              variant={filters.subcategory === sub.value ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() =>
                onFilterChange({
                  ...filters,
                  subcategory: filters.subcategory === sub.value ? null : sub.value,
                })
              }
            >
              {sub.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
