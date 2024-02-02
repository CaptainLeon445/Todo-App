import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error: ", err);
  if (err instanceof AppError)
    return res
      .status(err.statusCode)
      .json({ status: "error", message: err.message });

  return res
    .status(500)
    .json({ status: "error", message: "Something went wrong." });
};
