
import { Router } from 'express';
import { Request, Response } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { UserModel } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

authRouter.post("login", authMiddleware, async (  req: Request, res: Response) => {

    try{
    const {email, password} = req.body;

    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(404).json({message: "User not found!"})
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(400).json({message: "Invalid credentials!"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
    res.json({token});
      }catch(error){
        res.status(500).json({message: "Server error"})
      }

})

authRouter.post("/register", authMiddleware, async(req: Request, res: Response) => {
    try{

        const {username, email, passowrd} = req.body;

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists!"})
        }

        const hashedPassword = await bcrypt.hash(passowrd, 10);
        const newUser = new UserModel({username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: "User registered successfully!"})

    }catch(error){
        res.status(500).json({message: "Server error"})
    }
})