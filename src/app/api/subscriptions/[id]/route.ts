import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Subscription } from "@/entities/Subscription";
import { featureFlags } from "@/config/featureFlags";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Feature flag check
  if (!featureFlags.subscriptions) {
    return NextResponse.json(
      { error: "Subscriptions feature is disabled" },
      { status: 404 }
    );
  }

  try {
    const { id } = await params;
    const ds = await getDataSource();
    const repo = ds.getRepository(Subscription);

    const subscription = await repo.findOneBy({ id, enabled: true });
    if (!subscription) {
      return NextResponse.json(
        { error: "Suscripción no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Feature flag check
  if (!featureFlags.subscriptions) {
    return NextResponse.json(
      { error: "Subscriptions feature is disabled" },
      { status: 404 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Subscription);

    const subscription = await repo.findOneBy({ id });
    if (!subscription) {
      return NextResponse.json(
        { error: "Suscripción no encontrada" },
        { status: 404 }
      );
    }

    repo.merge(subscription, body);
    const saved = await repo.save(subscription);
    return NextResponse.json(saved);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
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
    const repo = ds.getRepository(Subscription);

    const result = await repo.delete(id);
    if (result.affected === 0) {
      return NextResponse.json(
        { error: "Suscripción no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Suscripción eliminada" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete subscription" },
      { status: 500 }
    );
  }
}
