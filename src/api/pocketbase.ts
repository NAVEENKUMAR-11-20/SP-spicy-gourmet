import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

export interface FoodItem {
  id: string;
  name: string;
  category: 'Starters' | 'Main Course' | 'Biryani & Rice' | 'Breads' | 'Desserts' | 'Beverages' | string;
  description: string;
  price: number;
  image: string;
  vegType: 'Veg' | 'Non-Veg';
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  isAvailable: boolean;
  isChefSpecial: boolean;
  created?: string;
  updated?: string;
}

export interface OrderItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderType: 'Dine In' | 'Take Away' | 'Delivery';
  addressOrTable: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  totalAmount: number;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  invoiceGenerated: boolean;
  deliveredAt?: string;
  created?: string;
  updated?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  deliveredAt: string;
  created?: string;
}

export interface Table {
  id: string;
  tableNumber: string;
  status: 'Available' | 'Occupied' | 'Needs Cleaning';
  currentOrderId?: string;
}
