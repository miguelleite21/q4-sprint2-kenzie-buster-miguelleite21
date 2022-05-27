import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1653666098709 implements MigrationInterface {
    name = 'initialMigration1653666098709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL, "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dvd" ("id" uuid NOT NULL, "name" character varying NOT NULL, "duration" integer NOT NULL, "stockId" uuid, CONSTRAINT "REL_a68c996998e86e22dc2580918c" UNIQUE ("stockId"), CONSTRAINT "PK_1a7f37c43aab7c9a335ee666451" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL, "paid" boolean NOT NULL, "total" double precision NOT NULL, "userId" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_dvd_dvd" ("cartId" uuid NOT NULL, "dvdId" uuid NOT NULL, CONSTRAINT "PK_f8faa6474103592de11cf6f40e9" PRIMARY KEY ("cartId", "dvdId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_41a8b443c698bdb1ff6dab2f1f" ON "cart_dvd_dvd" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_27f40d8569d19c502f85436028" ON "cart_dvd_dvd" ("dvdId") `);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_a68c996998e86e22dc2580918c3" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvd" ADD CONSTRAINT "FK_41a8b443c698bdb1ff6dab2f1f2" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvd" ADD CONSTRAINT "FK_27f40d8569d19c502f854360285" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvd" DROP CONSTRAINT "FK_27f40d8569d19c502f854360285"`);
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvd" DROP CONSTRAINT "FK_41a8b443c698bdb1ff6dab2f1f2"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_27f40d8569d19c502f85436028"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41a8b443c698bdb1ff6dab2f1f"`);
        await queryRunner.query(`DROP TABLE "cart_dvd_dvd"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "dvd"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
