import { Response } from "express";

export class AppError extends Error {
  statusCode;

  constructor(statusCode: number, message: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: AppError, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    error: message,
  });
};
