import { Router } from "express";
import payCartController from "../controllers/cart/payCart.controller";
import { tokenVerify } from "../midllewares/tokenVerify.midllewares";

const routes = Router();

export const cartRoutes = () => {
  routes.put("/pay", tokenVerify, payCartController);

  return routes;
};
