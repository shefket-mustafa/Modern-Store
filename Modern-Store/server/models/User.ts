import { Schema, model } from 'mongoose';
import { User } from '../../Types';

const userSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
})

export const UserModel = model<User>('User', userSchema);

