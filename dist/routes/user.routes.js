"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userCreate_controller_1 = __importDefault(require("../controllers/user/userCreate.controller"));
const userLogin_controller_1 = __importDefault(require("../controllers/user/userLogin.controller"));
const admVerify_midllewares_1 = require("../midllewares/admVerify.midllewares");
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post("/register", admVerify_midllewares_1.admVerify, userCreate_controller_1.default);
    routes.post("/login", userLogin_controller_1.default);
    return routes;
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=user.routes.js.map