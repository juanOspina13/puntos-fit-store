import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../entities/Category";
import { Company } from "../entities/Company";
import { Product } from "../entities/Product";
import { Subscription } from "../entities/Subscription";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "3306", 10),
  username: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "admin",
  database: process.env.DATABASE_NAME || "puntos_fit_store",

  entities: [Category, Company, Product, Subscription],
  migrations: ["src/migrations/*.ts"],

  synchronize: false,
  logging: true,
});

export default AppDataSource;
