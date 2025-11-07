import {z} from "zod";

export const adminAddItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().min(0, "Price must be at least 0"),
    category: z.string().min(0, "Price must be at least 0"),
    subcategory: z.string().min(0, "Price must be at least 0"),
    imageUrl: z.string().url("Invalid image URL"),
    description: z.string().min(1, "Description is required"),
    sizes: z.string().min(1, "Sizes are required"),
    stockQuantity: z.number().min(0, "In Stock must be at least 0"),
})

export type AdminAddItemSchemaType = z.infer<typeof adminAddItemSchema>;