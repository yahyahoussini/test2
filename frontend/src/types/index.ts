export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string; // Keep as string to avoid floating point issues, convert to number for calculations
  stock: number;
  images: string[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
