"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors/");
const tokenVerify = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new errors_1.AppError(401, "No token found");
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new errors_1.AppError(401, "Invalid Token");
            }
            req.body.userEmail = decoded.email;
            next();
        });
    }
    catch (err) {
        if (err instanceof errors_1.AppError) {
            (0, errors_1.handleError)(err, res);
        }
    }
};
exports.tokenVerify = tokenVerify;
//# sourceMappingURL=tokenVerify.midllewares.js.map