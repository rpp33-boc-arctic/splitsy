import React from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Stack from '@mui/material/Stack';
import { Link }  from "react-router-dom";

const RedirectButton = (props) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" endIcon={<ShoppingCartIcon />}>
        <Link to="/Cart" style={{'textDecoration': 'none', color: 'white'}}>
          BACK TO CART
        </Link>
      </Button>
      <Button variant="contained" endIcon={<ArrowCircleRightIcon />}>
        SUBMIT ORDER
      </Button>
    </Stack>
  );
}

export default RedirectButton;