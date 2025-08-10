import Link from 'next/link';
import { FiShoppingCart, FiUser, FiSearch, FiMenu } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="bg-brand-beige-dark shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-3xl font-bold text-brand-brown">
                MaBoutique
              </Link>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 ml-10">
              <Link href="/" className="text-brand-gray-dark hover:text-brand-brown transition-colors">Accueil</Link>
              <Link href="/shop" className="text-brand-gray-dark hover:text-brand-brown transition-colors">Boutique</Link>
              <Link href="/blog" className="text-brand-gray-dark hover:text-brand-brown transition-colors">Blog</Link>
              <Link href="/about" className="text-brand-gray-dark hover:text-brand-brown transition-colors">À propos</Link>
              <Link href="/contact" className="text-brand-gray-dark hover:text-brand-brown transition-colors">Contact</Link>
            </nav>
          </div>

          <div className="flex items-center">
            {/* Header Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-brand-gray-dark hover:text-brand-brown transition-colors">
                <FiSearch size={22} />
              </button>
              <Link href="/admin/login" className="text-brand-gray-dark hover:text-brand-brown transition-colors">
                <FiUser size={22} />
              </Link>
              <Link href="/cart" className="relative text-brand-gray-dark hover:text-brand-brown transition-colors">
                <FiShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-brand-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button className="text-brand-gray-dark hover:text-brand-brown transition-colors ml-4">
                <FiMenu size={26} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
