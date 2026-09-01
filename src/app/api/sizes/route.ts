import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Size } from "@/entities/Size";

export async function GET() {
  try {
    const ds = await getDataSource();
    const sizes = await ds.getRepository(Size).find({
      where: { enabled: true },
      order: { id: "ASC" },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch sizes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Size);
    return NextResponse.json(await repo.save(repo.create(body)), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create size" }, { status: 500 });
  }
}
