'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';
import FilterPanel from '@/components/FilterPanel';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

// This is a placeholder for a real API call with filtering
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:3001/api/products', { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch products:', res.status, res.statusText);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [gridLayout, setGridLayout] = useState('grid-cols-2'); // 'grid-cols-1' or 'grid-cols-2'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Area */}
      <div className="p-4 bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="relative flex-grow">
            <input type="text" placeholder="Search..." className="w-full p-3 pl-10 rounded-lg bg-white border border-gray-200" />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <button onClick={() => setIsFilterOpen(true)} className="p-3 bg-white border border-gray-200 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20"x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14"/><line x1="10" x2="14" y1="8"/><line x1="18" x2="22" y1="16"/></svg>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4">
        {loading ? (
          <div className={`grid ${gridLayout} gap-4 sm:gap-6`}>
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className={`grid ${gridLayout} gap-4 sm:gap-6`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>Aucun produit n'est disponible pour le moment. Revenez bientôt!</p>
        )}
      </div>

      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
}
