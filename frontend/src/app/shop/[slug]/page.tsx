import type { Product } from '@/types';
import ProductActions from '@/components/ProductActions'; // This will be redesigned later
import ProductImageGallery from '@/components/ProductImageGallery';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:3001/api/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return <div className="text-center py-10">Produit non trouvé.</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* This container simulates the mobile viewport and styling from the design */}
      <div className="max-w-sm mx-auto bg-[#F5F1EC]">
        {/* Status Bar Area - For visual mock only */}
        <div className="px-4 py-1 text-xs text-[#2E2E2E] flex justify-between">
          <span>9:41</span>
          <span>📶  WIFI 🔋</span>
        </div>

        {/* Product Image Gallery Section */}
        <div className="animate-fade-in-up">
          <ProductImageGallery images={product.images} />
        </div>

        {/* Product Info Section */}
        <div className="text-center px-6 py-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-2xl text-[#1E1E1E]" style={{ fontFamily: 'var(--font-primary)', fontWeight: 'bold' }}>
            {product.name}
          </h1>
          <p className="text-md text-[#4A4A4A] mt-2 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {product.description}
          </p>
        </div>

        {/* Action Buttons Section - Placeholder */}
        <div className="p-4">
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug:string } }) {
  const product = await getProduct(params.slug);
  if (!product) return { title: 'Produit non trouvé' };
  return {
    title: `${product.name} | MaBoutique`,
    description: product.description,
  };
}
