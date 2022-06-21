import React from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import RestaurantIcon from '@mui/icons-material/Restaurant';

const RedirectButton = (props) => {

  return (
    <Stack direction="row" spacing={2}>
      <Link to="/protected/RestaurantList" style={{ 'textDecoration': 'none', color: 'white' }}>
        <Button variant="contained" endIcon={<RestaurantIcon fontSize="large" />}>
          Reselect Restaurant
        </Button>
      </Link>
      <Link to="/protected/Menu" style={{ 'textDecoration': 'none', color: 'white' }}>
        <Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" />}>
          Back to Menu
        </Button>
      </Link>
      <Link to="/protected/Payment" style={{ 'textDecoration': 'none', color: 'white' }} >
        <Button onClick={props.updateCartDatabase} variant="contained" endIcon={<ArrowCircleRightIcon />}>
          Checkout
        </Button>
      </Link>
    </Stack>
  );
}

export default RedirectButton;