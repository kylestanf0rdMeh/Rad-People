import { ShippingInfo } from '../components/ShippingInformationForm';
import { CartItem } from '../contexts/CartContext';

export interface Order {
  cartItems: CartItem[];
  shipping: ShippingInfo;
  timestamp: string;
}