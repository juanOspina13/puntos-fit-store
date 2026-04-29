import "reflect-metadata";
import * as fs from "fs";
import * as path from "path";
import { DataSource } from "typeorm";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { Subscription } from "../entities/Subscription";

async function seed() {
  const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "3306", 10),
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "admin",
    database: process.env.DATABASE_NAME || "puntos_fit_store",
    entities: [Category, Product, Subscription],
    synchronize: true,
    logging: false,
  });

  await AppDataSource.initialize();
  console.log("Base de datos MySQL conectada para seeding...");

  const jsonPath = path.resolve(__dirname, "../../../public/data/products.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(raw);

  // Seed categories
  const categoryRepo = AppDataSource.getRepository(Category);
  await categoryRepo.clear();
  for (const cat of data.categories) {
    const entity = categoryRepo.create(cat);
    await categoryRepo.save(entity);
  }
  console.log(`${data.categories.length} categorías insertadas`);

  // Seed products
  const productRepo = AppDataSource.getRepository(Product);
  await productRepo.clear();
  for (const prod of data.products) {
    const entity = productRepo.create(prod);
    await productRepo.save(entity);
  }
  console.log(`${data.products.length} productos insertados`);

  // Seed subscriptions
  const subscriptionRepo = AppDataSource.getRepository(Subscription);
  await subscriptionRepo.clear();
  for (const sub of data.subscriptions) {
    const entity = subscriptionRepo.create(sub);
    await subscriptionRepo.save(entity);
  }
  console.log(`${data.subscriptions.length} suscripciones insertadas`);

  await AppDataSource.destroy();
  console.log("Seed completado exitosamente");
}

seed().catch((error) => {
  console.error("Error en seed:", error);
  process.exit(1);
});
