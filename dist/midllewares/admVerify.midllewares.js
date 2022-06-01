"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors/");
const admVerify = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        const isAdm = req.body;
        if (isAdm) {
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
    }
    catch (err) {
        if (err instanceof errors_1.AppError) {
            (0, errors_1.handleError)(err, res);
        }
    }
};
exports.admVerify = admVerify;
//# sourceMappingURL=admVerify.midllewares.js.map