import Image from 'next/image';
import type { Product } from '@/types';
import ProductActions from '@/components/ProductActions';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:3001/api/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return <div className="text-center">Produit non trouvé.</div>;
  }

  const imageUrl = product.images?.[0] || '/placeholder.svg';

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative w-full h-96 bg-gray-200 rounded-lg">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-3xl font-bold text-blue-600 mb-4">{product.price} dh</p>
        <p className="text-gray-700 mb-6">{product.description}</p>

        <ProductActions product={product} />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug:string } }) {
  const product = await getProduct(params.slug);
  if (!product) {
    return { title: 'Produit non trouvé' };
  }
  return {
    title: `${product.name} | MaBoutique`,
    description: product.description,
  };
}
