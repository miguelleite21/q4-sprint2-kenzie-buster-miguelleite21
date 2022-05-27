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
const cart_entity_1 = require("../../entities/cart.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const admVerify_1 = require("../../utils/admVerify");
const createUserService = ({ name, email, password, isAdm = false, token, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const cartRepository = data_source_1.AppDataSource.getRepository(cart_entity_1.Cart);
    const users = yield userRepository.find();
    const emailAlreadyExists = users.find((user) => user.email === email);
    const error = [];
    if (!name) {
        error.push("name is a required field");
    }
    if (!email) {
        error.push("email is a required field");
    }
    if (!password) {
        error.push("password is a required field");
    }
    if (error.length > 0) {
        throw new errors_1.AppError(400, error);
    }
    if (emailAlreadyExists) {
        throw new errors_1.AppError(409, `Key (email)=(${email}) already exists.`);
    }
    if (isAdm) {
        const adm = yield (0, admVerify_1.admVerify)(token);
        if (!adm) {
            throw new errors_1.AppError(400, "missing admin permision");
        }
    }
    const cart = new cart_entity_1.Cart();
    cart.total = 0;
    cart.paid = false;
    cart.dvd = [];
    cartRepository.create(cart);
    yield cartRepository.save(cart);
    const user = new user_entity_1.User();
    user.name = name;
    user.email = email.toLowerCase();
    user.password = bcrypt_1.default.hashSync(password, 10);
    user.isAdm = isAdm;
    user.carts = [cart];
    userRepository.create(user);
    yield userRepository.save(user);
    user.password = "";
    return user;
});
exports.default = createUserService;
