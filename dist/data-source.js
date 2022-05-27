"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
require("dotenv").config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    ssl: { rejectUnauthorized: false },
    logging: true,
    entities: [path_1.default.join(__dirname, "./entities/**/*.{js,ts}")],
    migrations: [path_1.default.join(__dirname, "./migrations/**/*.{js,ts}")],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Ok");
})
    .catch((err) => {
    console.log(err);
});
