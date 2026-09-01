import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { ProductSize } from "@/entities/ProductSize";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(ProductSize);
    const ps = await repo.findOne({ where: { id: Number(id) } });
    if (!ps) return NextResponse.json({ error: "Not found" }, { status: 404 });
    repo.merge(ps, body);
    return NextResponse.json(await repo.save(ps));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product size" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ds = await getDataSource();
    await ds.getRepository(ProductSize).delete(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product size" }, { status: 500 });
  }
}
