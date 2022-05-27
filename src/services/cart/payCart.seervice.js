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
const user_entity_1 = require("../../entities/user.entity");
const cart_entity_1 = require("../../entities/cart.entity");
const dvd_entity_1 = require("../../entities/dvd.entity");
const stock_entity_1 = require("../../entities/stock.entity");
const payCartService = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const cartRepository = data_source_1.AppDataSource.getRepository(cart_entity_1.Cart);
    const dvdRepository = data_source_1.AppDataSource.getRepository(dvd_entity_1.Dvd);
    const stockRepository = data_source_1.AppDataSource.getRepository(stock_entity_1.Stock);
    const accont = yield userRepository.findOne({
        where: {
            email: userEmail,
        },
    });
    const cart = yield cartRepository.findOne({
        where: {
            paid: false,
            user: accont,
        },
    });
    const newCart = new cart_entity_1.Cart();
    newCart.total = 0;
    newCart.paid = false;
    newCart.dvd = [];
    cartRepository.create(newCart);
    yield cartRepository.save(newCart);
    if (accont) {
        accont.carts = [...accont.carts, newCart];
        yield userRepository.save(accont);
    }
    if (cart) {
        cart.dvd.map((dvd) => __awaiter(void 0, void 0, void 0, function* () {
            dvd.stock.quantity -= dvd.userQuantity;
            yield stockRepository.save(dvd.stock);
        }));
        cart.paid = true;
        yield dvdRepository.save(cart.dvd);
        yield cartRepository.save(cart);
    }
    return cart;
});
exports.default = payCartService;
