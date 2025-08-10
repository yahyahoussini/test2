'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AdminAuthContext';
import { useRouter } from 'next/navigation';

// A more complete Order type for admin
type Order = {
  id: number;
  customer_name: string;
  total_price: string;
  status: string;
  created_at: string;
};

export default function AdminOrdersPage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, router, fetchOrders]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      // Refresh orders list
      fetchOrders();
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Erreur lors de la mise à jour du statut.');
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gérer les Commandes</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Client</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.customer_name}</td>
                <td className="p-3">{order.total_price} dh</td>
                <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Canceled</option>
                    <option>Returned</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
