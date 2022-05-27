import { MigrationInterface, QueryRunner } from "typeorm";

export class lastMigration1653670379828 implements MigrationInterface {
    name = 'lastMigration1653670379828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD "duration" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD "duration" integer NOT NULL`);
    }

}
