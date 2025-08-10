'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AdminAuthContext';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/admin/products', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [isAuthenticated, router, token]);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gérer les Produits</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Ajouter un produit
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Nom</th>
              <th className="text-left p-3">Prix</th>
              <th className="text-left p-3">Stock</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.price} dh</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  <button className="text-sm bg-gray-200 px-3 py-1 rounded mr-2">Modifier</button>
                  <button className="text-sm bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
