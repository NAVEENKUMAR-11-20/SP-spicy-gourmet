import React, { createContext, useContext, useState, useEffect } from 'react';
import { pb, FoodItem, OrderItem } from '../api/pocketbase';
import { menuData } from '../data/menuData';
import { chefSpecials } from '../data/mockData';

// Generate seed list of items from existing mock/menu data
const getInitialFoodItemsFallback = (): FoodItem[] => {
  const list: FoodItem[] = [];
  
  // Map veg menu
  menuData.veg.forEach((item) => {
    list.push({
      id: `veg-${item.id}`,
      name: item.name,
      category: item.category === 'appetizer' ? 'Starters' : item.category === 'dessert' ? 'Desserts' : 'Main Course',
      description: item.description,
      price: item.price,
      image: item.image,
      vegType: 'Veg',
      spiceLevel: item.spiceLevel === 1 ? 'Mild' : item.spiceLevel === 2 ? 'Medium' : 'Spicy',
      isAvailable: true,
      isChefSpecial: chefSpecials.some(cs => cs.name === item.name),
    });
  });

  // Map non-veg menu
  menuData['non-veg'].forEach((item) => {
    list.push({
      id: `nonveg-${item.id}`,
      name: item.name,
      category: item.category === 'appetizer' ? 'Starters' : item.category === 'rice' ? 'Biryani & Rice' : 'Main Course',
      description: item.description,
      price: item.price,
      image: item.image,
      vegType: 'Non-Veg',
      spiceLevel: item.spiceLevel === 1 ? 'Mild' : item.spiceLevel === 2 ? 'Medium' : 'Spicy',
      isAvailable: true,
      isChefSpecial: chefSpecials.some(cs => cs.name === item.name),
    });
  });

  // Add Breads & Beverages fallbacks
  list.push({
    id: 'bread-1',
    name: 'Butter Naan',
    category: 'Breads',
    description: 'Soft and fluffy butter-glazed tandoori flatbread.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80',
    vegType: 'Veg',
    spiceLevel: 'Mild',
    isAvailable: true,
    isChefSpecial: false
  });
  list.push({
    id: 'bev-1',
    name: 'Mango Lassi',
    category: 'Beverages',
    description: 'Refreshing sweet mango-yogurt drink.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80',
    vegType: 'Veg',
    spiceLevel: 'Mild',
    isAvailable: true,
    isChefSpecial: false
  });

  return list;
};

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
      // Attempt connection to PocketBase
      const records = await pb.collection('food_items').getFullList<FoodItem>({
        filter: 'isAvailable = true',
        sort: 'category',
      });
      if (records.length > 0) {
        setFoodItems(records);
      } else {
        // PocketBase connected but collection empty, seed with fallback
        setFoodItems(getInitialFoodItemsFallback());
      }
    } catch (e) {
      console.warn('PocketBase disconnected or not initialized. Using menu fallback.', e);
      setFoodItems(getInitialFoodItemsFallback());
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
