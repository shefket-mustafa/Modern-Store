import { Router } from "express";
import { Request, Response } from "express";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { AdminItemModel } from "../models/AdminItem"
import { authMiddleware } from "../middleware/authMiddleware";


export const adminRoutes = Router();

adminRoutes.post("/add-item", authMiddleware, adminMiddleware,  async(req: Request, res: Response) => {

    try{
        const { name, price, category, subcategory, imageUrl, description, sizes, stockQuantity } = req.body;  

        const savedItem = await AdminItemModel.create({
            name,
            price,
            category,
            subcategory,
            imageUrl,  
            description,
            sizes,
            stockQuantity
        })

        return res.status(201).json({message: "Item added successfully", item: savedItem});

    }catch(error){
        res.status(500).json({message: "Server error"})
    }
})


