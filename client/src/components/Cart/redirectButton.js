import React from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from "react-router-dom";
import RestaurantIcon from '@mui/icons-material/Restaurant';

const RedirectButton = (props) => {

  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" endIcon={<RestaurantIcon fontSize="large" onClick={() => navigate(-2)} />}>
        <Link to="/protected/Restaurant/pick" style={{ 'textDecoration': 'none', color: 'white' }}>
          Reselect Restaurant
        </Link>
      </Button>
      <Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" onClick={() => navigate(-1)} />}>
        <Link to="/protected/Menu" style={{ 'textDecoration': 'none', color: 'white' }}>
          Back to Menu
        </Link>
      </Button>
      {/* <Button onClick={props.updateCartDatabase} variant="contained" endIcon={<ArrowCircleRightIcon />}>
        update cart
      </Button> */}
      <Button onClick={props.updateCartDatabase} variant="contained" endIcon={<ArrowCircleRightIcon />}>
        <Link to="/protected/Payment" style={{ 'textDecoration': 'none', color: 'white' }} >
        Checkout
        </Link>
      </Button>
    </Stack>
  );
}

export default RedirectButton;