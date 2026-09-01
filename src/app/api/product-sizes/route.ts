import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { ProductSize } from "@/entities/ProductSize";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const ds = await getDataSource();
    const repo = ds.getRepository(ProductSize);

    const qb = repo.createQueryBuilder("ps")
      .leftJoinAndSelect("ps.talla", "talla")
      .where("ps.enabled = :enabled", { enabled: true });

    if (productId) qb.andWhere("ps.productId = :productId", { productId });

    return NextResponse.json(await qb.getMany());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product sizes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(ProductSize);
    const saved = await repo.save(repo.create(body));
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product size" }, { status: 500 });
  }
}
