'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const imageUrl = product.images?.[0] || '/placeholder.svg';

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    e.stopPropagation();
    addToCart(product);
    alert(`${product.name} a été ajouté au panier!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group relative">
      <Link href={`/shop/${product.slug}`}>
        <div className="p-4 flex flex-col items-center text-center">
          <div className="relative w-full h-40 mb-4">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-md font-semibold text-gray-800 h-12">{product.name}</h3>
          <p className="text-sm text-gray-500">250ml</p> {/* Example size */}
          <p className="text-lg font-bold text-gray-900 mt-2">{product.price} dh</p>
        </div>
      </Link>
      <button
        onClick={handleAddToCartClick}
        className="absolute bottom-4 right-4 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-light hover:bg-gray-800 transition-colors"
        aria-label="Ajouter au panier"
      >
        +
      </button>
    </div>
  );
}
