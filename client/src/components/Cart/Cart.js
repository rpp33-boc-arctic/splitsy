import React from 'react';
import RedirectButton from './redirectButton.js';
import ItemList from './itemList.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Summary from './summary.js';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Stack from '@mui/material/Stack';

function Cart(props) {
  var getCookie = function (name) {
    if (document.cookie) {
      return { [name]: document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '' }
    } else {
      return { [name]: '' }
    }
  }
  let navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem('cart'));

  var updateCartDatabase = () => {
    var link = `/session/update_cart`;
    $.ajax({
      method: "POST",
      url: link,
      data: {
        cart: cart,
      },
      headers: { 'Authorization': 'Bearer ' + getCookie('orderSession').orderSession },
      success: (response) => {
        if (response === 'POST cart request received!') {
          console.log('POST cart request success!');
        }

      },
      error: (error) => {
        console.log('Error: ', error);
        navigate(`/protected/RestaurantList`);
      }
    })
      .done(function () {
        console.log("cart ajax call is done!");
      });
  }

  return (
    <div >
      <h1>
        <ShoppingCartIcon />
        Cart
      </h1>
      <Stack  direction="column" spacing={2} className='cart' >
        <ItemList className='item-list' cart={cart} />
        <Summary className='summary' cart={cart} />
        <RedirectButton className='redirect-button' updateCartDatabase={updateCartDatabase} />
      </Stack>
    </div >
  )
}

export default Cart;