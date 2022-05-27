import { DataSource } from "typeorm";
import "reflect-metadata";
import path from "path";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  ssl: { rejectUnauthorized: false },
  logging: true,
  entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
  migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Ok");
  })
  .catch((err) => {
    console.log(err);
  });
