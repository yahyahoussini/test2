import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <Link href="/">MaBoutique</Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">Accueil</Link>
            <Link href="/shop" className="text-gray-600 hover:text-blue-500 transition-colors">Boutique</Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-500 transition-colors">Blog</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-500 transition-colors">À propos</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-500 transition-colors">Contact</Link>
            <Link href="/track" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">Suivre ma commande</Link>
          </nav>
          {/* Mobile menu button will be added later if needed */}
        </div>
      </div>
    </header>
  );
}
