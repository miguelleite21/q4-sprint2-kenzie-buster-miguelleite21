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
const data_source_1 = require("../../data-source");
const errors_1 = require("../../errors");
const user_entity_1 = require("../../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUserService = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const users = yield userRepository.find();
    const user = users.find((user) => user.email === email);
    const error = [];
    if (!email) {
        error.push("email is a required field");
    }
    if (!password) {
        error.push("password is a required field");
    }
    if (error.length > 0) {
        throw new errors_1.AppError(400, error);
    }
    if (!user) {
        throw new errors_1.AppError(404, `User not found`);
    }
    if (!bcrypt_1.default.compareSync(password, user.password)) {
        throw new errors_1.AppError(401, "Wrong email/password");
    }
    const token = jsonwebtoken_1.default.sign({ email: email }, String(process.env.JWT_SECRET), {
        expiresIn: "1d",
    });
    return token;
});
exports.default = loginUserService;
//# sourceMappingURL=loginUser.service.js.map