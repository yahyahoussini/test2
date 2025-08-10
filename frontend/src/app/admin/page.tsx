'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AdminAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AnalyticsData {
  actualRevenue: string;
  potentialRevenue: string;
  orderCounts: Record<string, number>;
  topSellingProducts: { name: string; sales: number }[];
}

export default function AdminDashboard() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      const fetchAnalytics = async () => {
        try {
          const res = await fetch('/api/admin/analytics', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('Failed to fetch analytics');
          const data = await res.json();
          setAnalytics(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchAnalytics();
    }
  }, [isAuthenticated, router, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!analytics) {
    return <div>Could not load analytics data.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm font-medium">Revenu Réel</h2>
          <p className="text-3xl font-bold">{analytics.actualRevenue} dh</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm font-medium">Revenu Potentiel</h2>
          <p className="text-3xl font-bold">{analytics.potentialRevenue} dh</p>
        </div>
      </div>
      {/* Add links to other admin pages here */}
      <div className="space-x-4">
          <Link href="/admin/products" className="text-blue-500 hover:underline">Gérer les Produits</Link>
          <Link href="/admin/orders" className="text-blue-500 hover:underline">Gérer les Commandes</Link>
      </div>
    </div>
  );
}
