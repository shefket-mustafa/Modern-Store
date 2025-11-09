
import { Router } from 'express';
import { Request, Response } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { UserModel } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

authRouter.post("/login", async (  req: Request, res: Response) => {

    try{
    const {email, password} = req.body;

    const user = await UserModel.findOne({email}).lean();
    if(!user){
        return res.status(404).json({message: "User not found!"})
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(400).json({message: "Invalid credentials!"})
    }
    const {_id, username, role} = user;

    
    const token = jwt.sign({id: user._id, role: role}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
    res.json({token, user: {id: _id, username: username, role}});
      }catch(error){
        res.status(500).json({message: "Server error"})
      }

})

authRouter.post("/register", async(req: Request, res: Response) => {
    try{

        const {username, email, password} = req.body;

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, email, password: hashedPassword});
        await newUser.save();
    
    const { _id, username: createdUsername, role } = newUser as any;
    const token = jwt.sign({ id: _id, role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(201).json({ message: "User registered successfully!", token, user: { id: _id, username: createdUsername, role } })

    }catch(error){
        res.status(500).json({message: "Server error"})
    }
})