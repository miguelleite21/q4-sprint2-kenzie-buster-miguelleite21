import { Router } from "express";
import createUserController from "../controllers/user/userCreate.controller";
import loginUserController from "../controllers/user/userLogin.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("/", createUserController);
  routes.post("/login", loginUserController);

  return routes;
};
