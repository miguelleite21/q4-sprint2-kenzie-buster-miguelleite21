import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError, handleError } from "../errors/";

export const admVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization;
    const isAdm = req.body;
    if (isAdm) {
      if (!token) {
        throw new AppError(401, "No token found");
      }

      jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
        (err: any, decoded: any) => {
          if (err) {
            throw new AppError(401, "Invalid Token");
          }
          req.body.userEmail = decoded.email;
          next();
        }
      );
    }
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
