import  {model, Schema} from "mongoose"


export const AdminItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brand: {type: String, required: true },
    colors: { type: [String], required: true },
    category: { type: String,enum: ["men", "women"], required: true },
    subcategory: { type: String, 
        enum:["tshirts", "shirts", "jeans", "sweatshirts", "sweatpants"], 
        required: true },
    imageUrl: { type: String, required: true },
    sizes: { type: [String], required: true },
    stockQuantity: { type: Number, required: true }
})

export const AdminItemModel = model("AdminItem", AdminItemSchema)