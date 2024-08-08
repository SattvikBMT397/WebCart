import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(true);
    navigate('/cart');
    console.log(isCartOpen);
  };


  return (
    <div>
      <Typography sx={{ fontSize: 20 }}>
        Welcome to WebCart
      </Typography>
      <Typography sx={{ fontSize: 70 }}>Product List</Typography>
      <Card sx={{ display: 'flex', justifyContent: 'flex-end', background: 'none' }}>
        <CardActions>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={handleCartOpen}
            startIcon={<ShoppingCartIcon />}
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default Header;

