import { Schema, model } from 'mongoose';
import { UserType } from '../../Types';


const userSchema = new Schema<UserType>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
})

export const UserModel = model<UserType>('User', userSchema);

