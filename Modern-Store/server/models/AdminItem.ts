import  {model, Schema} from "mongoose"

enum Category {
    MEN = "men",
    WOMEN = "women"
}
export const AdminItemSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String,enum: Object.values(Category), required: true },
    subcategory: { type: String, required: true },
    imageUrl: { type: String, required: true },
    sizes: { type: [String], required: true },
    stockQuantity: { type: Number, required: true }
})

export const AdminItemModel = model("AdminItem", AdminItemSchema)