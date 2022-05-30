"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userCreate_controller_1 = __importDefault(require("../controllers/user/userCreate.controller"));
const userLogin_controller_1 = __importDefault(require("../controllers/user/userLogin.controller"));
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post("/", userCreate_controller_1.default);
    routes.post("/login", userLogin_controller_1.default);
    return routes;
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=user.routes.js.map