import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.errors.map((error) => ({
          path: error.path.join("."),
          message: error.message,
        }));

        res.status(400).json({
          status: 400,
          errors: formattedErrors,
        });
      } else {
        next(err);
      }
    }
  };
