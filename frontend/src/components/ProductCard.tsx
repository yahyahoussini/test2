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
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    alert(`${product.name} a été ajouté au panier!`);
  };

  return (
    <div className="bg-white rounded-card shadow-card group relative p-4 transition-shadow hover:shadow-lg">
      <Link href={`/shop/${product.slug}`}>
        <div className="flex flex-col items-center text-center">
          <div className="relative w-full h-40 mb-4">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-md font-primary font-bold text-brand-brown h-12">{product.name}</h3>
          <p className="text-sm text-brand-gray-dark">250ml</p> {/* Example size */}
          <p className="text-lg font-bold text-brand-brown-dark mt-2">{product.price} dh</p>
        </div>
      </Link>
      <button
        onClick={handleAddToCartClick}
        className="absolute bottom-3 right-3 bg-brand-brown-dark text-white rounded-full w-9 h-9 flex items-center justify-center text-2xl font-light transition-colors hover:bg-[#231A15] active:bg-[#231A15]"
        aria-label="Ajouter au panier"
      >
        +
      </button>
    </div>
  );
}
