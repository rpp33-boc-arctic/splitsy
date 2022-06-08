import React from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";


const RedirectButton = (props) => {

function updateDatabase() {
  props.updateCartDatabase();
  props.updateSummaryDatabase();

}

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" />}>
        <Link to="/Restaurant/pick" style={{ 'textDecoration': 'none', color: 'white' }}>
          Select Restaurant
        </Link>
      </Button>
      <Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" />}>
        <Link to="/menu" style={{ 'textDecoration': 'none', color: 'white' }}>
          Back to Menu
        </Link>
      </Button>
      <Button variant="contained" endIcon={<ArrowCircleRightIcon />}>
        <Link to="/Payment" style={{ 'textDecoration': 'none', color: 'white' }} onClick={props.updateDatabase} >
        Checkout
        </Link>
      </Button>
    </Stack>
  );
}

export default RedirectButton;