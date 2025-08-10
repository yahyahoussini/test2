'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import Modal from './Modal';
import CheckoutForm from './CheckoutForm';

// A simple WhatsApp icon component
const WhatsAppIcon = () => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="white">
    <path d="M16.75 13.96c.25.13.43.2.5.28.08.08.13.18.15.25.03.08.03.18 0 .28-.03.1-.08.18-.15.25-.08.08-.18.13-.28.15-.1.03-.2.03-.28 0-.1-.03-.18-.08-.25-.15-.08-.08-.13-.18-.15-.28a.48.48 0 0 1 0-.28c.03-.1.08-.18.15-.25.08-.08.18-.13.28-.15.1-.03.2-.03.28 0m-1.7-2.3c-.03 0-.05.03-.08.05-.08.03-.13.08-.18.15-.05.08-.08.13-.1.18-.03.05-.05.1-.05.15s0 .1.03.15c.03.05.05.1.1.15.05.05.1.08.15.1.05.03.1.05.15.05.05 0 .1 0 .15-.03.05-.03.1-.05.15-.1.05-.05.08-.1.1-.15.03-.05.05-.1.05-.15s0-.1-.03-.15a.46.46 0 0 0-.1-.15.46.46 0 0 0-.15-.1.5.5 0 0 0-.15-.05.4.4 0 0 0-.15-.03m-12.23 12.3c-2.43-2.1-3.85-5.2-3.85-8.43C.95 5.5 5.4 1 11.93 1c3.2 0 6.13 1.25 8.3 3.43 2.18 2.18 3.43 5.1 3.43 8.33 0 6.53-5.43 11.8-11.83 11.8-.18 0-.35-.03-.53-.05l-4.1.98.95-3.93c-.4-.6-.73-1.25-.98-1.9zm5.9-16.1c-5.43 0-9.83 4.4-9.83 9.83 0 3 1.38 5.73 3.6 7.5l-1.33 5.45L6.5 23c.73.23 1.5.35 2.28.35h.03c5.43 0 9.83-4.4 9.83-9.83S17.38 3.7 11.93 3.7z"/>
  </svg>
);


type ProductActionsProps = {
  product: Product;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} a été ajouté au panier!`);
  };

  const handleBuyNow = () => {
    addToCart(product); // Simplified: adds to cart and opens checkout
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
      <div className="flex items-center justify-between space-x-2">
        <button
          onClick={handleBuyNow}
          className="flex-1 h-11 bg-black text-white text-sm font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="flex-1 h-11 bg-[#D9D9D9] text-[#2E2E2E] text-sm font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Add to Cart
        </button>
        <button
          onClick={handleWhatsAppOrder}
          className="flex-1 h-11 bg-[#25D366] text-white text-sm font-bold rounded-lg flex items-center justify-center space-x-2 hover:scale-105 transition-transform"
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CheckoutForm onOrderConfirmed={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
