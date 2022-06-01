import { Router } from "express";
import createUserController from "../controllers/user/userCreate.controller";
import loginUserController from "../controllers/user/userLogin.controller";
import { admVerify } from "../midllewares/admVerify.midllewares";

const routes = Router();

export const userRoutes = () => {
  routes.post("/register", admVerify, createUserController);
  routes.post("/login", loginUserController);

  return routes;
};
