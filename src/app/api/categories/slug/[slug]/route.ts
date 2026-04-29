import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Category } from "@/entities/Category";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const ds = await getDataSource();
    const repo = ds.getRepository(Category);

    const category = await repo.findOneBy({ slug, enabled: true });
    if (!category) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
