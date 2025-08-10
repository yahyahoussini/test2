'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';
import FilterPanel, { FilterValues } from '@/components/FilterPanel';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

async function getProducts(filters: Partial<FilterValues>): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters.sortBy && filters.sortBy !== 'best-selling') {
    params.append('category', filters.sortBy);
  }
  if (filters.productName) {
    params.append('search', filters.productName);
  }
  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-');
    if (min) params.append('minPrice', min);
    if (max) params.append('maxPrice', max);
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/api/products?${params.toString()}`, { cache: 'no-store' });
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Partial<FilterValues>>({});

  const fetchProducts = useCallback(async (filters: Partial<FilterValues>) => {
    setLoading(true);
    const fetchedProducts = await getProducts(filters);
    setProducts(fetchedProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts(activeFilters);
  }, [fetchProducts, activeFilters]);

  const handleApplyFilters = (filters: FilterValues) => {
    setActiveFilters(filters);
  };

  const handleResetFilters = () => {
    setActiveFilters({});
  }

  const hasActiveFilters = Object.values(activeFilters).some(value => value);

  return (
    <div className="min-h-screen">
      {/* Header Area */}
      <div className="h-[56px] w-full bg-brand-beige-DEFAULT sticky top-0 z-20 border-b border-brand-border">
        <div className="p-2 flex items-center gap-3 h-full max-w-7xl mx-auto">
          {/* Search Field */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-[44px] pl-10 pr-4 rounded-input bg-white text-brand-brown placeholder-brand-placeholder shadow-input focus:outline-none focus:ring-1 focus:ring-brand-border focus:ring-offset-2 focus:ring-offset-brand-beige"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          {/* Filter Icon Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className={`w-[44px] h-[44px] flex items-center justify-center rounded-btn transition-colors ${hasActiveFilters ? 'bg-brand-brown hover:bg-brand-brown/90' : 'bg-[#F0E9E1] hover:bg-[#E7DFD6]'}`}
          >
            <svg className={`w-6 h-6 ${hasActiveFilters ? 'text-white' : 'text-brand-brown'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20"x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14"/><line x1="10" x2="14" y1="8"/><line x1="18" x2="22" y1="16"/></svg>
          </button>
        </div>
      </div>

      {/* Filter Chips Row */}
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Placeholder for filter chips */}
          <button className="px-4 h-8 rounded-pill bg-brand-brown text-white text-sm shadow-chip-active whitespace-nowrap">Best Selling</button>
          <button className="px-4 h-8 rounded-pill bg-brand-beige-light border border-brand-border text-brand-gray-dark text-sm whitespace-nowrap">Skin Care</button>
          <button className="px-4 h-8 rounded-pill bg-brand-beige-light border border-brand-border text-brand-gray-dark text-sm whitespace-nowrap">Shampoo</button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 pb-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (<ProductCardSkeleton key={index} />))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
            {products.map((product) => (<ProductCard key={product.id} product={product} />))}
          </div>
        ) : (
          <p className="text-center py-10 text-brand-gray-dark">Aucun produit ne correspond à vos filtres.</p>
        )}
      </div>

      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={handleApplyFilters} onReset={handleResetFilters} />
    </div>
  );
}
