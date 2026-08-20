import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Product } from "@/entities/Product";

export async function GET(request: Request) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const inStock = searchParams.get("inStock");

    const qb = repo.createQueryBuilder("product");
    console.log(category);
    qb.andWhere("product.enabled = :enabled", { enabled: true });

    if (category) {
      qb.andWhere("product.category = :category", { category });
    }
    if (subcategory) {
      qb.andWhere("product.subcategory = :subcategory", { subcategory });
    }
    if (inStock === "true") {
      qb.andWhere("product.inStock = :inStock", { inStock: true });
    }

    const products = await qb.getMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);

    const product = repo.create(body);
    const saved = await repo.save(product);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
