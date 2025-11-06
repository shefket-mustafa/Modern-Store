import { Request } from 'express';

export type ReqUser = { id?: string; role?: 'user' | 'admin' };
export type AdminRequest = Request & { user?: ReqUser };