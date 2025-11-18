import {z} from "zod";

const baseAdminEditItemSchema = z.object({

 name: z.string().min(1, "Name is required"),
    // accept strings like "45.5" or "45,5" and coerce to number
    price: z.preprocess((val) => {
        if (typeof val === 'string') {
            const normalized = val.replace(',', '.').trim();
            const parsed = Number(normalized);
            return Number.isFinite(parsed) ? parsed : val;
        }
        return val;
    }, z.number().min(0, "Price must be at least 0")),
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    imageUrl: z.string().url("Invalid image URL"),
    description: z.string().min(1, "Description is required"),
    // allow comma-separated string in the form and coerce to string[]
    sizes: z.preprocess((val) => {
        if (typeof val === 'string') {
            return val.split(',').map((s) => s.trim()).filter(Boolean);
        }
        return val;
    }, z.array(z.string()).min(1, "Sizes are required")),
    stockQuantity: z.preprocess((val) => {
        if (typeof val === 'string') {
            const parsed = Number(val);
            return Number.isFinite(parsed) ? parsed : val;
        }
        return val;
    }, z.number().min(1, "In Stock must be at least 1")),
})

export const adminEditItemSchema = baseAdminEditItemSchema.partial(); 
//made it partial so that we can use a patch request and update only 1 field 

export type AdminEditItemSchemaType = z.infer<typeof adminEditItemSchema>;