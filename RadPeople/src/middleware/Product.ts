import { EntryCollection } from 'contentful';
import contentfulClient from '../services/contentful';
import { ProductItem } from '../models/Product.model';
import { StripeProduct } from '../models/StripeProduct.model';
import { Order } from '../models/Order.model';
import axios from 'axios';

// Get API URL from environment variables
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://localhost:6996';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const fetchProducts = async (): Promise<ProductItem[]> => {
    try {
      const response: EntryCollection<ProductItem> = await contentfulClient.getEntries({
        content_type: 'products',
      });
      //   ignore this false error for now,there is nothing wrong with this (has to do with type safety)
      return response.items.map(item => ({
        sys: item.sys,
        fields: item.fields as ProductItem['fields'],
        contentTypeId: item.sys.contentType.sys.id
      }));
    } catch (error) {
      console.error('Error fetching products`:', error);
      throw error;
    }
  };


export const fetchProductsStripe = async (): Promise<StripeProduct[]> => {
  try {
    // Replace with your actual backend API endpoint
    const response = await fetch('/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await response.json();
    console.log('Products with prices:', products);
    
    return products;
  } catch (error) {
    console.error('Error fetching products from Stripe:', error);
    throw error;
  }
};

export const fetchSingleProduct = async (productId: any): Promise<ProductItem> => {
  try {
    const response = await contentfulClient.getEntry(productId);
    return {
      sys: response.sys,
      fields: response.fields as ProductItem['fields'],
      contentTypeId: response.sys.contentType.sys.id
    };
  } catch (error) {
    console.error('Error fetching single product:', error);
    throw error;
  }
};


/**
 * Validates a single cart item with the backend
 * @param item The cart item to validate
 * @returns nothing
 */

export const storeOrder = async (order: Order) => {
  try {
    const response = await api.post('/api/payment/order-fulfillment', order);
    return response.data;
  } catch (e) {
    console.error('Error writing to backend:', e);
    throw e;
  }
};