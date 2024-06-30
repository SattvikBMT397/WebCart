
export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface CardsProps {
  item: Item;
}

export interface CartItem {
  key: string;
  item: Item;
}

export interface CartContextType {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export interface CartProviderProps {
  children: React.ReactNode;
}
