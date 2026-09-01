import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { ProductFlavor } from "@/entities/ProductFlavor";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(ProductFlavor);
    const pf = await repo.findOne({ where: { id: Number(id) } });
    if (!pf) return NextResponse.json({ error: "Not found" }, { status: 404 });
    repo.merge(pf, body);
    return NextResponse.json(await repo.save(pf));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product flavor" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ds = await getDataSource();
    await ds.getRepository(ProductFlavor).delete(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product flavor" }, { status: 500 });
  }
}
