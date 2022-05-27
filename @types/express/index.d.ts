import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      adm: boolean;
      userEmail: string;
    }
  }
}
