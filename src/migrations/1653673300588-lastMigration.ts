import { hashSync } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";

export class lastMigration1653673300588 implements MigrationInterface {
  name = "lastMigration1653673300588";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dvd" ADD "userQuantity" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "userQuantity"`);
  }
}
