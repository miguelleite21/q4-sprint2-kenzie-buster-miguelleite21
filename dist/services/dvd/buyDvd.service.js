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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const errors_1 = require("../../errors");
const user_entity_1 = require("../../entities/user.entity");
const dvd_entity_1 = require("../../entities/dvd.entity");
const cart_entity_1 = require("../../entities/cart.entity");
const buyDvdService = ({ quantity, userEmail, id }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const dvdRepository = data_source_1.AppDataSource.getRepository(dvd_entity_1.Dvd);
    const cartRepository = data_source_1.AppDataSource.getRepository(cart_entity_1.Cart);
    if (!quantity) {
        throw new errors_1.AppError(400, "quantity is a required field");
    }
    const accont = yield userRepository.findOne({
        where: {
            email: userEmail,
        },
    });
    const dvd = yield dvdRepository.findOne({
        where: {
            id: id,
        },
    });
    const cart = yield cartRepository.findOne({
        where: {
            paid: false,
            user: accont,
        },
    });
    if (!dvd) {
        throw new errors_1.AppError(404, "dvd not found");
    }
    if ((dvd === null || dvd === void 0 ? void 0 : dvd.stock.quantity) < quantity) {
        throw new errors_1.AppError(404, `current stock: ${dvd.stock.quantity}, received demand ${quantity}`);
    }
    if (cart === null || cart === void 0 ? void 0 : cart.dvd.find((dvd) => dvd.id === id)) {
        throw new errors_1.AppError(400, `dvd: ${dvd.name}, already in cart`);
    }
    if (cart) {
        dvd.userQuantity = quantity;
        const total = quantity * dvd.stock.price;
        cart.dvd = [...cart.dvd, dvd];
        cart.total = cart.total + total;
        yield dvdRepository.save(dvd);
        yield cartRepository.save(cart);
        return cart;
    }
});
exports.default = buyDvdService;
