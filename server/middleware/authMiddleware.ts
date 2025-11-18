import { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

// Define the shape we expect in the verified token
type DecodedToken = JwtPayload & {
    id?: string;
    role?: "user" | "admin";
};

type AuthRequest = Request & { user?: DecodedToken };

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        // attach decoded token (e.g. { id, role }) to request for downstream middleware/routes
        (req as AuthRequest).user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
