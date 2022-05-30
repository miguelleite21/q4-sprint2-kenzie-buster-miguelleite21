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
const errors_1 = require("../../errors");
const createDvd_service_1 = __importDefault(require("../../services/dvd/createDvd.service"));
const createDvdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(1);
    try {
        const { name, duration, price, quantity } = req.body;
        const token = req.headers.authorization;
        const newDvd = yield (0, createDvd_service_1.default)({
            name,
            duration,
            price,
            quantity,
            token,
        });
        console.log(3);
        return res.status(201).send(newDvd);
    }
    catch (err) {
        if (err instanceof errors_1.AppError) {
            (0, errors_1.handleError)(err, res);
        }
    }
});
exports.default = createDvdController;
//# sourceMappingURL=createDvd.controller.js.map