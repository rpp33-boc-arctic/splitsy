import React from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Stack from '@mui/material/Stack';

const RedirectButton = (props) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" endIcon={<ShoppingCartIcon />}>
        BACK TO CART
      </Button>
      <Button variant="contained" endIcon={<ArrowCircleRightIcon />}>
        SUBMIT ORDER
      </Button>
    </Stack>
  );
}

export default RedirectButton;