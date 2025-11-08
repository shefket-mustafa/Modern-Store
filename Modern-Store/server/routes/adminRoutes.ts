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

adminRoutes.delete("/delete-item/:id", authMiddleware, adminMiddleware, async(req: Request, res: Response) => {
    
    try{
        const itemId = req.params.id;

        const deletedItem = await AdminItemModel.findByIdAndDelete(itemId);

        if(!deletedItem){
            return res.status(404).json({message: "Item not found"});
        }

        res.json({message: "Item deleted successfully", item: deletedItem});
    }catch(error){
        res.status(500).json({message: "Server error"})
    }
})

adminRoutes.get("/items", authMiddleware, adminMiddleware, async(req: Request, res: Response) => {

    try{

        const items = await AdminItemModel.find().lean();
        res.json({items});

    }catch(error){
        res.status(500).json({message: "Server error"})
    }   
})


