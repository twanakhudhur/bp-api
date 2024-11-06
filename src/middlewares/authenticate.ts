import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserById, User } from "../models/auth.model";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Access denied, Unauthorized user" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, secret) as { userId: string };
    const user: User | null = await getUserById(payload.userId);

    if (!user || user.isFrozen || (user.expiration && user.expiration < new Date())) {
      res.status(401).json({ message: "Access denied, Unauthorized user" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

export default authenticateToken;
