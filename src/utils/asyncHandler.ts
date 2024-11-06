import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';


const prisma = new PrismaClient();

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next).finally(() => prisma.$disconnect());
    };
};
