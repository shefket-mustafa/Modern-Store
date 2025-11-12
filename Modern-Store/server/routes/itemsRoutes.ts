import { Router } from 'express';
import type { Request, Response } from 'express';
import { AdminItemModel } from '../models/AdminItem';

type FilterType = {
    category?: string | undefined
    subcategory?: string | undefined
}
export const itemsRoutes = Router();


itemsRoutes.get("/", async(req: Request, res: Response) => {

    try{

   const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const subcategory = typeof req.query.subcategory === "string" ? req.query.subcategory : undefined;
        const filter: FilterType = {};

        if(category) filter.category = category;
        if(subcategory) filter.subcategory = subcategory

        const items = await AdminItemModel.find(filter).lean();

        if(!items.length) return res.status(404).json({error: "No items found!"})

            res.json(items)

    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }
})

itemsRoutes.get("/:id", async(req: Request, res: Response) => {

    try{
        const {id} = req.params;

        const response = await AdminItemModel.findById(id);

        if(!response) return res.status(404).json({error: "Item details not found!"})

            return res.json(response)

    }catch(err){
          return res.status(500).json({error: "Server error!"})
    }
})

