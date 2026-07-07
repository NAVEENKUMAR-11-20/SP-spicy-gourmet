import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
}

export interface OrderItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface CartItem extends OrderItem {
  image?: string;
  vegType?: 'Veg' | 'Non-Veg';
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  orderType: 'Dine In' | 'Take Away' | 'Delivery';
  setOrderType: (type: 'Dine In' | 'Take Away' | 'Delivery') => void;
  addressOrTable: string;
  setAddressOrTable: (val: string) => void;
  customerName: string;
  setCustomerName: (val: string) => void;
  customerPhone: string;
  setCustomerPhone: (val: string) => void;
  foodItems: FoodItem[];
  loadingItems: boolean;
  refetchFoodItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sp_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orderType, setOrderTypeState] = useState<'Dine In' | 'Take Away' | 'Delivery'>(() => {
    return (localStorage.getItem('sp_order_type') as any) || 'Dine In';
  });

  const [addressOrTable, setAddressOrTableState] = useState(() => {
    return localStorage.getItem('sp_address_table') || '';
  });

  const [customerName, setCustomerNameState] = useState(() => {
    return localStorage.getItem('sp_customer_name') || '';
  });

  const [customerPhone, setCustomerPhoneState] = useState(() => {
    return localStorage.getItem('sp_customer_phone') || '';
  });

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  const setOrderType = (type: 'Dine In' | 'Take Away' | 'Delivery') => {
    setOrderTypeState(type);
    localStorage.setItem('sp_order_type', type);
  };

  const setAddressOrTable = (val: string) => {
    setAddressOrTableState(val);
    localStorage.setItem('sp_address_table', val);
  };

  const setCustomerName = (val: string) => {
    setCustomerNameState(val);
    localStorage.setItem('sp_customer_name', val);
  };

  const setCustomerPhone = (val: string) => {
    setCustomerPhoneState(val);
    localStorage.setItem('sp_customer_phone', val);
  };

  const refetchFoodItems = async () => {
    setLoadingItems(true);
    try {
      const { data, error } = await supabase
        .from('MENUITEMS')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error(error);
        setFoodItems([]);
      } else if (data) {
        const mappedItems: FoodItem[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item['Dish Name'] || 'Unnamed Dish',
          category: item['Category'] || 'Uncategorized',
          description: item['Description'] || '',
          price: Number(item['Price (INR)']) || 0,
          image: item['Photo URL'] || '',
          vegType: item['Vegetarian Type'] || 'Veg',
          spiceLevel: item['Spice Level'] || 'Mild',
          isAvailable: true,
          isChefSpecial: false
        }));
        setFoodItems(mappedItems);
      }
    } catch (e) {
      console.error('Failed to fetch from Supabase', e);
      setFoodItems([]);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    refetchFoodItems();
  }, []);

  useEffect(() => {
    localStorage.setItem('sp_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: FoodItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.foodId === item.id);
      if (existing) {
        return prev.map((i) =>
          i.foodId === item.id
            ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.price }
            : i
        );
      }
      return [
        ...prev,
        {
          foodId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          total: item.price,
          image: item.image,
          vegType: item.vegType,
        },
      ];
    });
  };

  const removeFromCart = (foodId: string) => {
    setCartItems((prev) => prev.filter((i) => i.foodId !== foodId));
  };

  const updateQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.foodId === foodId
          ? { ...i, quantity, total: quantity * i.price }
          : i
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('sp_cart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orderType,
        setOrderType,
        addressOrTable,
        setAddressOrTable,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        foodItems,
        loadingItems,
        refetchFoodItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
