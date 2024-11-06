// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error log:", err);

  const status = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2003"
  ) {
    message = "Invalid reference. Data does not exist";
    console.log(err);
    return res.status(400).json({
      message,
      detail: err.meta,
    });
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    const target = err.meta?.target;
    message = "Duplicate entry error.";
    return res.status(409).json({
      path: target,
      message,
    });
  }

  if (err.name === "ZodError") {
    return res.status(400).json(
      err.errors,
    );
  }

  return res.status(status).json({
    status,
    message,
  });
};
