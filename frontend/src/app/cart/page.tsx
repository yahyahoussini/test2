'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

import CheckoutForm from '@/components/CheckoutForm';


export default function CartPage() {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parseFloat(item.product.price) * item.quantity;
  }, 0).toFixed(2);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {cartItems.map(item => (
            <div key={item.product.id} className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center space-x-4">
                <Image src={item.product.images?.[0] || '/placeholder.svg'} alt={item.product.name} width={80} height={80} className="rounded-lg" />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">{item.product.price} dh</p>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: {totalPrice} dh</p>
          </div>
        </div>
      )}

      {/* As per requirements, checkout form is on the same page */}
      {cartItems.length > 0 &&
        <div className="mt-8">
          <CheckoutForm />
        </div>
      }
    </div>
  );
}
