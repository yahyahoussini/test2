import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-brand-beige-dark border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-brand-brown mb-4">MaBoutique</h3>
            <p className="text-brand-gray-dark text-sm">
              Votre destination unique pour des produits de qualité, livrés avec soin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-brand-brown mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-brand-gray-dark hover:text-brand-brown">À propos</Link></li>
              <li><Link href="/contact" className="text-brand-gray-dark hover:text-brand-brown">Contact</Link></li>
              <li><Link href="/blog" className="text-brand-gray-dark hover:text-brand-brown">Blog</Link></li>
              <li><Link href="/track" className="text-brand-gray-dark hover:text-brand-brown">Suivre ma commande</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-lg font-semibold text-brand-brown mb-4">Contactez-nous</h3>
            <address className="text-brand-gray-dark not-italic text-sm">
              <p>contact@maboutique.com</p>
            </address>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-brand-gray-dark hover:text-brand-brown"><FiFacebook size={20} /></a>
              <a href="#" className="text-brand-gray-dark hover:text-brand-brown"><FiTwitter size={20} /></a>
              <a href="#" className="text-brand-gray-dark hover:text-brand-brown"><FiInstagram size={20} /></a>
              <a href="#" className="text-brand-gray-dark hover:text-brand-brown"><FiLinkedin size={20} /></a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-brand-brown mb-4">Newsletter</h3>
            <p className="text-brand-gray-dark mb-2 text-sm">Abonnez-vous pour recevoir les dernières nouvelles.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 text-sm rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-brown"
              />
              <button className="bg-brand-brown text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 text-sm">
                S&apos;inscrire
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-brand-gray-dark text-sm">
          <p>&copy; {new Date().getFullYear()} MaBoutique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
