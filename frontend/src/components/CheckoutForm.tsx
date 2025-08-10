'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

type CheckoutFormProps = {
  onOrderConfirmed?: () => void; // Optional callback for after order submission
};

export default function CheckoutForm({ onOrderConfirmed }: CheckoutFormProps) {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const customer_name = formData.get('customer_name') as string;
    const customer_phone = formData.get('customer_phone') as string;
    const customer_city = formData.get('customer_city') as string;
    const customer_address = formData.get('customer_address') as string;

    const totalPrice = cartItems.reduce((total, item) => {
      return total + parseFloat(item.product.price) * item.quantity;
    }, 0).toFixed(2);

    const orderData = {
      customer_name,
      customer_phone,
      customer_city,
      customer_address,
      items: cartItems,
      total_price: totalPrice,
    };

    try {
      const res = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Order submission failed');

      const result = await res.json();
      alert(`Commande passée! Votre numéro de suivi est: ${result.tracking_number}`);

      clearCart();
      if(onOrderConfirmed) onOrderConfirmed();

      router.push(`/track?number=${result.tracking_number}`);

    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la commande.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Finaliser ma commande</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input name="customer_name" type="text" placeholder="Nom complet" className="p-2 border rounded w-full" required />
          <input name="customer_phone" type="tel" placeholder="Numéro de téléphone" className="p-2 border rounded w-full" required />
        </div>
        <input name="customer_city" type="text" placeholder="Ville" className="p-2 border rounded w-full mb-4" required />
        <textarea name="customer_address" placeholder="Adresse complète" className="p-2 border rounded w-full mb-4" rows={3} required />
        <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors">
          Confirmer la commande
        </button>
      </form>
    </div>
  );
}
