import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Category } from "@/entities/Category";

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Category);
    const categories = await repo.find();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Category);

    const category = repo.create(body);
    const saved = await repo.save(category);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
