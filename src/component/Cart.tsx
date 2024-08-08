

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { CartContext } from '../CartContext';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import localforage from 'localforage';
import { CartItem, Item } from '../utilise/interface';

const Cart: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { items, setItems } = cartContext;
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const loadItems = async () => {
      const keys = await localforage.keys();
      const loadedItems: CartItem[] = [];
      for (const key of keys) {
        const item = await localforage.getItem<Item>(key);
        if (item) {
          loadedItems.push({ key, item });
        }
      }
      setItems(loadedItems);
    };

    loadItems();
  }, [setItems]);

  useEffect(() => {
    const calculatePrice = () => {
      const price = items.reduce((acc, itemData) => {
        return acc + itemData.item.price}, 0);
      setTotalPrice(price);
    };
    calculatePrice();
  }, [items]);

   const RemoveFromCart = (itemId: number) => {
    localforage.removeItem(itemId.toString()).then(() => {
      const updatedItems = items.filter(item => item.key !== itemId.toString());
      setItems(updatedItems);
    }).catch((err) => {
      console.error('Error removing item from cart:', err);
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        backgroundColor: '#f8f9fa',
        zIndex: 1000,
        overflowY: 'auto',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Card style={{ padding: '16px', borderRadius: '8px' }}>
        <CardContent>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            style={{ margin: '16px 0', backgroundColor: '#1976d2', color: '#fff' }}
          >
            Close
          </Button>
          <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
            Shopping Cart
          </Typography>
          <Typography variant="h6" gutterBottom style={{ color: '#1976d2' }}>
            Total Expense: Rs {totalPrice}
          </Typography>
          {items && items.length > 0 ? (
            items.map((itemData) => (
              <Card key={itemData.key} sx={{ marginBottom: 2, display: 'flex', position: 'relative' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150, borderRadius: '4px' }}
                  image={itemData.item.image}
                  title={itemData.item.title}
                />
                <CardContent style={{ flex: '1 0 auto', padding: '16px' }}>
                  <IconButton
                    onClick={() => RemoveFromCart(Number(itemData.key))}
                    style={{ position: 'absolute', right: '16px', bottom: '10px', color: '#e53935' }}
                  >
                    <AutoDeleteIcon />
                  </IconButton>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    {itemData.item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ margin: '8px 0' }}>
                    {itemData.item.description}
                  </Typography>
                  <Typography variant="h6" style={{ color: '#1976d2' }}>
                    Price: Rs {itemData.item.price}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" style={{ marginTop: '16px' }}>
              No items in cart
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
