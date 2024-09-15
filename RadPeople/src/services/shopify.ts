import * as ShopifyBuy from 'shopify-buy';

const client = ShopifyBuy.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
  apiVersion: '2023-07'
});

export default client;