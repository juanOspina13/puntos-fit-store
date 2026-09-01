import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../entities/Category";
import { Company } from "../entities/Company";
import { Flavor } from "../entities/Flavor";
import { Product } from "../entities/Product";
import { ProductFlavor } from "../entities/ProductFlavor";
import { ProductPhoto } from "../entities/ProductPhoto";
import { ProductSize } from "../entities/ProductSize";
import { Size } from "../entities/Size";
import { Subscription } from "../entities/Subscription";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "3306", 10),
  username: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "admin",
  database: process.env.DATABASE_NAME || "puntos_fit_store",

  entities: [Category, Company, Flavor, Product, ProductFlavor, ProductPhoto, ProductSize, Size, Subscription],
  migrations: [],

  synchronize: false,
});

let initialized = false;

export async function getDataSource(): Promise<DataSource> {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
  }
  return AppDataSource;
}

export default AppDataSource;
