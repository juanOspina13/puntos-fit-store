import ProductDetailClient from "@/components/product/ProductDetailClient";

// Make this route fully dynamic to avoid build-time API calls
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailClient productId={id} />;
}
