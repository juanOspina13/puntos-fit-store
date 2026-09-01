import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { ProductPhoto } from "@/entities/ProductPhoto";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(ProductPhoto);
    const photo = await repo.findOne({ where: { id: Number(id) } });
    if (!photo) return NextResponse.json({ error: "Not found" }, { status: 404 });
    repo.merge(photo, body);
    return NextResponse.json(await repo.save(photo));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update photo" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ds = await getDataSource();
    const repo = ds.getRepository(ProductPhoto);
    await repo.delete(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
  }
}
