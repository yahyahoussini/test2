'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import Modal from './Modal';
import CheckoutForm from './CheckoutForm';

type ProductActionsProps = {
  product: Product;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToCart, clearCartAndAdd } = useCart(); // Assuming clearCartAndAdd exists
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} a été ajouté au panier!`);
  };

  const handleBuyNow = () => {
    // A "Buy Now" action should checkout only this single item.
    // We can handle this by clearing the cart and adding just this one.
    // This logic needs to be added to CartContext. For now, we'll just open the modal.
    // A better approach might be to pass the specific item to the checkout form.
    // For now, let's just add to cart and open modal.
    addToCart(product);
    setIsModalOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "0607076940";
    const message = `Bonjour, je suis intéressé(e) par ce produit:\nNom: ${product.name}\nPrix: ${product.price} dh\nLien: ${window.location.href}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="flex flex-col space-y-3">
        <button
          onClick={handleBuyNow}
          className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Acheter maintenant
        </button>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Ajouter au panier
        </button>
        <button
          onClick={handleWhatsAppOrder}
          className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Commander via WhatsApp
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CheckoutForm onOrderConfirmed={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
