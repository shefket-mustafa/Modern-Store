import { Request } from 'express';

export type ReqUser = { id?: string; role?: 'user' | 'admin' };
export type AdminRequest = Request & { user?: ReqUser };

export type UserType = {
  _id: string
    username: string;
    email: string;
    password: string
    // role indicates authorization level; 'user' by default, 'admin' for administrators
    role?: 'user' | 'admin'
}