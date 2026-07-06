import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface FoodItem {
  id: string;
  name: string;
  category: string;
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
  orderType: 'Dine In' | 'Take Away';
  addressOrTable: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  totalAmount: number;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';
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

// ----------------------------------------------------
// PocketBase to Supabase Compatibility Adapter Layer
// ----------------------------------------------------
class PocketBaseAdapter {
  authStore = {
    isValid: false,
    clear: () => {
      this.authStore.isValid = false;
      localStorage.removeItem('sp_mock_logged');
      supabase.auth.signOut();
    }
  };

  collection(collectionName: string) {
    const isPlaceholder = supabaseUrl.includes('placeholder-url');

    return {
      getFullList: async <T = any>(options?: any): Promise<T[]> => {
        if (isPlaceholder) {
          throw new Error('Supabase URL not configured. Using fallback local storage.');
        }

        let query = supabase.from(collectionName).select('*');
        
        if (options?.filter) {
          // Simplistic parsing of simple PocketBase filter queries
          if (options.filter.includes('isAvailable = true')) {
            query = query.eq('isAvailable', true);
          }
          if (options.filter.includes('status != "Delivered"')) {
            query = query.neq('status', 'Delivered').neq('status', 'Cancelled');
          }
          if (options.filter.includes('status = "Delivered"')) {
            query = query.eq('status', 'Delivered');
          }
        }

        if (options?.sort) {
          const isDesc = options.sort.startsWith('-');
          const field = isDesc ? options.sort.substring(1) : options.sort;
          query = query.order(field, { ascending: !isDesc });
        }

        const { data, error } = await query;
        if (error) throw error;
        return data as T[];
      },

      getList: async <T = any>(page = 1, perPage = 30, options?: any): Promise<{ items: T[] }> => {
        if (isPlaceholder) {
          throw new Error('Supabase URL not configured. Using fallback local storage.');
        }

        let query = supabase.from(collectionName).select('*', { count: 'exact' });

        if (options?.filter) {
          if (options.filter.includes('orderId =') || options.filter.includes('id =')) {
            // Find matches for Order ID / Phone search
            const match = options.filter.match(/"([^"]+)"/g);
            if (match && match.length > 0) {
              const searchTerm = match[0].replace(/"/g, '');
              query = query.or(`orderId.eq.${searchTerm},id.eq.${searchTerm}`);
            }
          } else if (options.filter.includes('customerPhone =')) {
            const match = options.filter.match(/"([^"]+)"/g);
            if (match) {
              query = query.eq('customerPhone', match[0].replace(/"/g, ''));
            }
          }
        }

        const from = (page - 1) * perPage;
        const to = from + perPage - 1;
        query = query.range(from, to);

        if (options?.sort) {
          const isDesc = options.sort.startsWith('-');
          const field = isDesc ? options.sort.substring(1) : options.sort;
          query = query.order(field, { ascending: !isDesc });
        }

        const { data, error } = await query;
        if (error) throw error;
        return { items: data as T[] };
      },

      getOne: async <T = any>(id: string): Promise<T> => {
        if (isPlaceholder) {
          throw new Error('Supabase URL not configured. Using fallback.');
        }
        const { data, error } = await supabase.from(collectionName).select('*').eq('id', id).single();
        if (error) throw error;
        return data as T;
      },

      create: async <T = any>(payload: any): Promise<T> => {
        if (isPlaceholder) {
          throw new Error('Supabase URL not configured. Using fallback.');
        }
        const { data, error } = await supabase.from(collectionName).insert([payload]).select().single();
        if (error) throw error;
        return data as T;
      },

      update: async <T = any>(id: string, payload: any): Promise<T> => {
        if (isPlaceholder) {
          throw new Error('Supabase URL not configured. Using fallback.');
        }
        const { data, error } = await supabase.from(collectionName).update(payload).eq('id', id).select().single();
        if (error) throw error;
        return data as T;
      },

      delete: async (id: string): Promise<boolean> => {
        if (isPlaceholder) {
          throw new Error('Supabase URL not configured. Using fallback.');
        }
        const { error } = await supabase.from(collectionName).delete().eq('id', id);
        if (error) throw error;
        return true;
      },

      subscribe: async <T = any>(idOrWildcard: string, callback: (event: { record: T }) => void) => {
        if (isPlaceholder) return () => {};

        // Convert PocketBase subscription to Supabase Realtime Channels
        const channelName = `${collectionName}-changes`;
        const channel = supabase
          .channel(channelName)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: collectionName },
            (payload) => {
              callback({ record: (payload.new || payload.old) as T });
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      },

      authWithPassword: async (email: string, password?: string) => {
        if (isPlaceholder) {
          throw new Error('Supabase URL not configured. Using fallback.');
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: password || '' });
        if (error) throw error;
        this.authStore.isValid = true;
        return data;
      }
    };
  }
}

export const pb = new PocketBaseAdapter();
export default pb;
