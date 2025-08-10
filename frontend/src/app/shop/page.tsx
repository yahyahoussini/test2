import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:3001/api/products', { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch products:', res.status, res.statusText);
      return []; // Return empty array on error
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array on network error
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Notre Boutique</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>Aucun produit n'est disponible pour le moment. Revenez bientôt!</p>
      )}
    </div>
  );
}
