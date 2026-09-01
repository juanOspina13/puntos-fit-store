import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { ProductFlavor } from "@/entities/ProductFlavor";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const ds = await getDataSource();
    const repo = ds.getRepository(ProductFlavor);

    const qb = repo.createQueryBuilder("pf")
      .leftJoinAndSelect("pf.sabor", "sabor")
      .where("pf.enabled = :enabled", { enabled: true });

    if (productId) qb.andWhere("pf.productId = :productId", { productId });

    return NextResponse.json(await qb.getMany());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product flavors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(ProductFlavor);
    return NextResponse.json(await repo.save(repo.create(body)), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product flavor" }, { status: 500 });
  }
}
