import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Subscription } from "@/entities/Subscription";

export async function GET(request: Request) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Subscription);

    const { searchParams } = new URL(request.url);
    const objetivo = searchParams.get("objetivo");

    const qb = repo.createQueryBuilder("subscription");

    qb.andWhere("subscription.enabled = :enabled", { enabled: true });

    if (objetivo) {
      qb.andWhere("subscription.objetivo = :objetivo", { objetivo });
    }

    const subscriptions = await qb.getMany();
    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Subscription);

    const subscription = repo.create(body);
    const saved = await repo.save(subscription);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
