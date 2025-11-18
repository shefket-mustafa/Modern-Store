import { Router } from "express";
import { Request, Response } from "express";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { AdminItemModel } from "../models/AdminItem";
import { authMiddleware } from "../middleware/authMiddleware";
import { UserModel } from "../models/User";
import mongoose from "mongoose";

export const adminRoutes = Router();

adminRoutes.post(
  "/add-item",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        price,
        brand,
        colors,
        category,
        subcategory,
        imageUrl,
        description,
        sizes,
        stockQuantity,
      } = req.body;

      const savedItem = await AdminItemModel.create({
        name,
        price,
        brand,
        colors,
        category,
        subcategory,
        imageUrl,
        description,
        sizes,
        stockQuantity,
      });

      return res
        .status(201)
        .json({ message: "Item added successfully", item: savedItem });
    } catch (error) {
  res.status(500).json({ message: error instanceof Error ? error.message : "Server error" });    }
  }
);

adminRoutes.delete(
  "/delete-item/:id",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const itemId = req.params.id;

      const deletedItem = await AdminItemModel.findByIdAndDelete(itemId);

      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.json({ message: "Item deleted successfully", item: deletedItem });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

adminRoutes.patch(
  "/editItemAdmin/:id",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const objectId = new mongoose.Types.ObjectId(id);
      const updatedItem = await AdminItemModel.findOneAndUpdate(
        objectId,
        updatedData,
        { new: true }
      );

      if (!updatedItem) res.status(404).json({ message: "Item not found!" });

      return res.json({
        message: "Item updated successfully!",
        item: updatedItem,
      });
    } catch (err) {
      return res.status(500).json({ error: "Server error!" });
    }
  }
);

adminRoutes.delete(
  "/delete-user/:id",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;

      const deletedUser = await UserModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

adminRoutes.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find().lean();
      res.json({ users });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

adminRoutes.get(
  "/items",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const items = await AdminItemModel.find().lean();
      res.json({ items });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);
