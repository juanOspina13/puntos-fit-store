import ProductDetailClient from "@/components/product/ProductDetailClient";
import Header from "@/components/layout/Header";
import { getServerUser } from "@/lib/server-auth";

// Make this route fully dynamic to avoid build-time API calls
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;

  let token: string | undefined;
  if (searchParams) {
    const sp = await searchParams;
    const tkParam = sp.tk;
    token = typeof tkParam === "string" ? tkParam : undefined;
  }
  const userData = await getServerUser(token);

  return (
    <>
      <Header userData={userData} />
      <ProductDetailClient productId={id} />
    </>
  );
}
