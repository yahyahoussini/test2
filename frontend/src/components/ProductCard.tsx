import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // Use a placeholder if no image is available
  const imageUrl = product.images?.[0] || '/placeholder.svg';

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative w-full h-60 bg-gray-200">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            // Next.js Image component needs to know the domains for external images,
            // or we can use a placeholder for now.
            // For local placeholders, no config is needed.
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-xl font-bold text-blue-600 mt-2">{product.price} dh</p>
        </div>
      </Link>
    </div>
  );
}
