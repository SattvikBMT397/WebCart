import { createContext, useState, useEffect, FC } from 'react';
import localforage from 'localforage';
import { Item, CartItem, CartContextType, CartProviderProps } from './utilise/interface';

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      const allItems: CartItem[] = [];
      await localforage.iterate((item, key) => {
        allItems.push({ key, item: item as Item });
      });
      setItems(allItems);
    };
    fetchAllItems();
  }, []);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
