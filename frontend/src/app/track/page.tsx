'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

type OrderStatus = {
  tracking_number: string;
  status: string;
  created_at: string;
};

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const initialTrackingNumber = searchParams.get('number') || '';

  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrderStatus(null);

    if (!trackingNumber) {
      setError('Veuillez entrer un numéro de suivi.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/track/${trackingNumber}`);
      if (!res.ok) {
        throw new Error('Commande non trouvée ou erreur du serveur.');
      }
      const data: OrderStatus = await res.json();
      setOrderStatus(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Suivre votre commande</h1>
      <form onSubmit={handleTrackOrder} className="bg-white p-6 rounded-lg shadow-md">
        <label htmlFor="trackingNumber" className="block text-gray-700 font-semibold mb-2">
          Numéro de Suivi
        </label>
        <input
          type="text"
          id="trackingNumber"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Entrez votre numéro de suivi ici"
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300">
          {loading ? 'Recherche...' : 'Suivre'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {orderStatus && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Détails de la commande</h2>
          <p><strong>Numéro de Suivi:</strong> {orderStatus.tracking_number}</p>
          <p><strong>Date de la commande:</strong> {new Date(orderStatus.created_at).toLocaleDateString('fr-FR')}</p>
          <p><strong>Statut:</strong> <span className="font-bold text-lg text-green-600">{orderStatus.status}</span></p>
        </div>
      )}
    </div>
  );
}
