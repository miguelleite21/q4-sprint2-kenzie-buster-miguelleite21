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
const dvd_entity_1 = require("../../entities/dvd.entity");
const stock_entity_1 = require("../../entities/stock.entity");
const user_entity_1 = require("../../entities/user.entity");
const errors_1 = require("../../errors");
const createDvdService = ({ name, duration, price, quantity, userEmail, }) => __awaiter(void 0, void 0, void 0, function* () {
    const dvdRepository = data_source_1.AppDataSource.getRepository(dvd_entity_1.Dvd);
    const stockRepository = data_source_1.AppDataSource.getRepository(stock_entity_1.Stock);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const error = [];
    const user = yield userRepository.findOne({
        where: {
            email: userEmail,
        },
    });
    const dvds = yield dvdRepository.findOne({
        where: {
            name: name,
        },
    });
    if (!user.isAdm) {
        throw new errors_1.AppError(400, "missing admin permision");
    }
    if (!name) {
        error.push("name is a required field");
    }
    if (!duration) {
        error.push("duration is a required field");
    }
    if (!price) {
        error.push("price is a required field");
    }
    if (!quantity) {
        error.push("quantity is a required field");
    }
    if (error.length > 0) {
        throw new errors_1.AppError(400, error);
    }
    if (dvds) {
        throw new errors_1.AppError(409, `dvd: '${name}' already exists`);
    }
    const stock = new stock_entity_1.Stock();
    stock.price = price;
    stock.quantity = quantity;
    stockRepository.create(stock);
    yield stockRepository.save(stock);
    const dvd = new dvd_entity_1.Dvd();
    dvd.name = name;
    dvd.duration = duration;
    dvd.stock = stock;
    dvdRepository.create(dvd);
    yield dvdRepository.save(dvd);
    return dvd;
});
exports.default = createDvdService;
//# sourceMappingURL=createDvd.service.js.map