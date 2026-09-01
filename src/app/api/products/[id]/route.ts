import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Product } from "@/entities/Product";
import { ProductPhoto } from "@/entities/ProductPhoto";
import { ProductSize } from "@/entities/ProductSize";
import { ProductFlavor } from "@/entities/ProductFlavor";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);

    const product = await repo.findOneBy({ id, enabled: true });
    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const [fotos, tallas, sabores] = await Promise.all([
      ds.getRepository(ProductPhoto).find({
        where: { productId: id, enabled: true },
        order: { orden: "ASC" },
      }),
      ds.getRepository(ProductSize).find({
        where: { productId: id, enabled: true },
        relations: { talla: true },
      }),
      ds.getRepository(ProductFlavor).find({
        where: { productId: id, enabled: true },
        relations: { sabor: true },
      }),
    ]);

    return NextResponse.json({ ...product, fotos, tallas, sabores });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);

    const product = await repo.findOneBy({ id });
    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    repo.merge(product, body);
    const saved = await repo.save(product);
    return NextResponse.json(saved);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);

    const result = await repo.delete(id);
    if (result.affected === 0) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
