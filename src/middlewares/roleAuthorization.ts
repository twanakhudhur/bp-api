import { Request, Response, NextFunction } from "express";

const authorizeRoles = (
  ...allowedRoles: string[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ message: "Access denied, Unauthorized user" });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden, Unauthorized user" });
    }
    next();
  };
};

export default authorizeRoles;
