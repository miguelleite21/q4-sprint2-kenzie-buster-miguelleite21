"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = require("express");
const payCart_controller_1 = __importDefault(require("../controllers/cart/payCart.controller"));
const tokenVerify_midllewares_1 = require("../midllewares/tokenVerify.midllewares");
const routes = (0, express_1.Router)();
const cartRoutes = () => {
    routes.post("/pay", tokenVerify_midllewares_1.tokenVerify, payCart_controller_1.default);
    return routes;
};
exports.cartRoutes = cartRoutes;
