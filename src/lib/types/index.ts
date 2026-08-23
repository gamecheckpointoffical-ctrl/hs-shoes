export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  sku: string | null;
  brand: string;
  category_id: string | null;
  collection_id: string | null;
  price: number;
  compare_at_price: number | null;
  currency: string;
  status: string;
  featured: boolean;
  bestseller: boolean;
  new_arrival: boolean;
  materials: string | null;
  care_instructions: string | null;
  seo_title: string | null;
  seo_description: string | null;
  model_type: string;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  image_type: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: string | null;
  color: string | null;
  sku: string | null;
  price: number | null;
  stock: number;
  weight: number | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string | null;
  rating: number;
  title: string | null;
  body: string | null;
  verified: boolean;
  approved: boolean;
  created_at: string;
}

export interface CartItem {
  product_id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  variant_id: string;
}

export interface OrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
  billing_address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  payment_provider: string;
  notes?: string;
}
