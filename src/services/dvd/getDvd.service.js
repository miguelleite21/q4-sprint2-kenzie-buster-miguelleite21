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
const getDvdService = () => __awaiter(void 0, void 0, void 0, function* () {
    const dvdRepository = data_source_1.AppDataSource.getRepository(dvd_entity_1.Dvd);
    const dvds = yield dvdRepository.find();
    return dvds;
});
exports.default = getDvdService;
