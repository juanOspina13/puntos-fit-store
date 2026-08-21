import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Company } from "@/entities/Company";

export async function GET(request: Request) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Company);

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const qb = repo.createQueryBuilder("company");
    qb.andWhere("company.enabled = :enabled", { enabled: true });

    if (slug) {
      qb.andWhere("company.slug = :slug", { slug });
    }

    const companies = await qb.getMany();
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Company);

    const company = repo.create(body);
    const saved = await repo.save(company);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create company" },
      { status: 500 }
    );
  }
}
