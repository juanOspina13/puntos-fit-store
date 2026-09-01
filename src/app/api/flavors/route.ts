import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Flavor } from "@/entities/Flavor";

export async function GET() {
  try {
    const ds = await getDataSource();
    const flavors = await ds.getRepository(Flavor).find({
      where: { enabled: true },
      order: { nombre: "ASC" },
    });
    return NextResponse.json(flavors);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch flavors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Flavor);
    return NextResponse.json(await repo.save(repo.create(body)), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create flavor" }, { status: 500 });
  }
}
