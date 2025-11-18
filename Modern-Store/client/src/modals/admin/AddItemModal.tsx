import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminAddItemSchema,
  type AdminAddItemSchemaType,
  categories,
  subcategories,
} from "../../lib/zod/adminAddItemSchema";

export default function AddItemModal({addItemModalOpen,setAddItemModalOpen, setFetchAgain}: {addItemModalOpen: boolean, setAddItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>, setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>}) {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token');
    
   
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setError,
        formState: {errors, isSubmitting}
    
    } = useForm<AdminAddItemSchemaType>({resolver: zodResolver(adminAddItemSchema)})

    const selectedCategory = watch("category");
     const availableSubcategories =
    selectedCategory ? subcategories[selectedCategory] : [];

    const handleAddItem = async (data: AdminAddItemSchemaType) => {
        try {
            const response = await fetch(`${BASE_URL}/admin/add-item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization":  `Bearer ${token}`
                },
                
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add item');
            }

            reset()
            setFetchAgain(true);
            // Close the modal on success
            setAddItemModalOpen(false);
        } catch (error: unknown) {
          if(error instanceof Error) {
            setError('root', { type: 'server', message: error.message });
          } else {
            setError('root', { type: 'server', message: 'An unknown error occurred' });
          }
        }
    }

  
  return (
    // {/* Add Item Modal */}
    <AnimatePresence>
      {addItemModalOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAddItemModalOpen(false)}
          />

          {/* Modal content */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-white p-6 mt-10 rounded-2xl shadow-xl w-96">

                {errors.root?.message && ((
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                    {errors.root?.message}
                </div>
                ))
                }
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add New Item
              </h2>
              <form onSubmit={handleSubmit(handleAddItem)} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Item name"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                {...register("name")}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Price"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                {...register("price")}
                />
                {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Brand"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                {...register("brand")}
                />
                {errors.brand && (
                    <p className="text-red-500 text-sm">{errors.brand.message}</p>
                )}
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Colors"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                {...register("colors")}
                />
                {errors.colors && (
                    <p className="text-red-500 text-sm">{errors.colors.message}</p>
                )}
                {/* Category select */}
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  defaultValue=""
                  {...register("category")}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat[0].toLowerCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category.message}</p>
                )}
             {/* Subcategory select (depends on category) */}
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  defaultValue=""
                  {...register("subcategory")}
                  disabled={!selectedCategory}
                >
                  <option value="" disabled>
                    {selectedCategory
                      ? "Select subcategory"
                      : "Select category first"}
                  </option>
                  {availableSubcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub[0].toLowerCase() + sub.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.subcategory && (
                    <p className="text-red-500 text-sm">{errors.subcategory.message}</p>
                )}
                <input
                  type="text"
                  placeholder="Image URL"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                {...register("imageUrl")}
                />
                {errors.imageUrl && (
                    <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
                )  }
                <input
                  type="text"
                  placeholder="Description"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                {...register("description")}
                />
                <input
                  type="text"
                  placeholder="Sizes (comma separated)"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                {...register("sizes")}
                />
                <input
                  type="number"
                  placeholder="Stock quantity"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                {...register("stockQuantity", { valueAsNumber: true })}
                />
                {errors.stockQuantity && (
                    <p className="text-red-500 text-sm">{errors.stockQuantity.message}</p>
                )  }
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setAddItemModalOpen(false)}
                    className="px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg cursor-pointer bg-orange-500 text-white hover:bg-orange-600 transition"
                  >
                    {isSubmitting ? "Adding.." : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
