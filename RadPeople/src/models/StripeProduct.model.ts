export interface StripeProduct {
  id: string;
  name: string;
  images: string[];
  default_price: string;
  description?: string;
}