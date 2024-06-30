import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import localforage from 'localforage';
import  {CardsProps} from '../utilise/interface';

const Cards: React.FC<CardsProps> = ({ item }) => {
  const [inCart, setInCart] = useState<boolean>(false);

  const AddtoCart = () => {
    localforage.setItem(item.id.toString(), item).then((value) => {
      if (value !== null) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }).catch((err) => {
      console.error('Error adding item to cart:', err);
    });
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '20px', borderRadius: '10px' }}>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 'auto' }}
        image={item.image}
        title={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ marginTop: '10px' }}>
          Price: Rs {item.price}
        </Typography>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={AddtoCart}
            startIcon={<ShoppingCartIcon />}
          >
            {inCart ? "Remove From Cart" : "Add To Cart"}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Cards;
