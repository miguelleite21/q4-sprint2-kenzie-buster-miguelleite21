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
exports.lastMigration1653670379828 = void 0;
class lastMigration1653670379828 {
    constructor() {
        this.name = 'lastMigration1653670379828';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "duration"`);
            yield queryRunner.query(`ALTER TABLE "dvd" ADD "duration" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "duration"`);
            yield queryRunner.query(`ALTER TABLE "dvd" ADD "duration" integer NOT NULL`);
        });
    }
}
exports.lastMigration1653670379828 = lastMigration1653670379828;
//# sourceMappingURL=1653670379828-lastMigration.js.map