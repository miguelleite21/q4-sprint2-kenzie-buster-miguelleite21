"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payCart_seervice_1 = __importDefault(require("../../services/cart/payCart.seervice"));
const payCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.body;
    const cart = yield (0, payCart_seervice_1.default)(userEmail);
    return res.status(200).send(cart);
});
exports.default = payCartController;
//# sourceMappingURL=payCart.controller.js.map