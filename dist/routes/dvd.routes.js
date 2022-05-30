"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dvdRoutes = void 0;
const express_1 = require("express");
const buyDvd_controller_1 = __importDefault(require("../controllers/dvd/buyDvd.controller"));
const createDvd_controller_1 = __importDefault(require("../controllers/dvd/createDvd.controller"));
const getDvd_controller_1 = __importDefault(require("../controllers/dvd/getDvd.controller"));
const tokenVerify_midllewares_1 = require("../midllewares/tokenVerify.midllewares");
const routes = (0, express_1.Router)();
const dvdRoutes = () => {
    routes.post("/register", tokenVerify_midllewares_1.tokenVerify, createDvd_controller_1.default);
    routes.post("/buy/:id", tokenVerify_midllewares_1.tokenVerify, buyDvd_controller_1.default);
    routes.get("/", getDvd_controller_1.default);
    return routes;
};
exports.dvdRoutes = dvdRoutes;
//# sourceMappingURL=dvd.routes.js.map