import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { ProductPhoto } from "@/entities/ProductPhoto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const ds = await getDataSource();
    const repo = ds.getRepository(ProductPhoto);

    const qb = repo.createQueryBuilder("photo")
      .where("photo.enabled = :enabled", { enabled: true })
      .orderBy("photo.orden", "ASC");

    if (productId) qb.andWhere("photo.productId = :productId", { productId });

    return NextResponse.json(await qb.getMany());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(ProductPhoto);
    const saved = await repo.save(repo.create(body));
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create photo" }, { status: 500 });
  }
}
