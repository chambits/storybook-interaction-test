export interface OrderItem {
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export interface Order {
  restaurantId: number;
  restaurantName: string;
  items: OrderItem[];
  total: number;
}

export const DELIVERY_FEE = 3.99;
export const REDIRECT_DELAY = 2000;
export const PROCESSING_DELAY = 1500;
