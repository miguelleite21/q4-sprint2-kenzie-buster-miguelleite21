import { Router } from "express";
import buyDvdController from "../controllers/dvd/buyDvd.controller";
import createDvdController from "../controllers/dvd/createDvd.controller";
import getDvdController from "../controllers/dvd/getDvd.controller";
import { tokenVerify } from "../midllewares/tokenVerify.midllewares";
import buyUserService from "../services/dvd/buyDvd.service";
const routes = Router();

export const dvdRoutes = () => {
  routes.post("/register", tokenVerify, createDvdController);
  routes.post("/buy/:id", tokenVerify, buyDvdController);
  routes.get("/", getDvdController);
  return routes;
};
