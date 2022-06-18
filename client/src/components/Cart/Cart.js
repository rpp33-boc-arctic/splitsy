/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import ButtonAppBar from './navbar.js';
// import OrderCode from './orderCode.js';
import RedirectButton from './redirectButton.js';
import ItemList from './itemList.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Summary from './summary.js';
// import FullMenu from '../Menu/fullMenu.js';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import menuStyles from './cartStyles.css';

function Cart(props) {
  var getCookie = function (name) {
    if (document.cookie) {
      return { [name]: document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '' }
    } else {
      return { [name]: '' }
    }
  }
  let navigate = useNavigate();



  const cart = localStorage.getItem('cart');
  const location = useLocation();
  const data = location.state;
  console.log('current cart in Cart.js is: ', data);
  console.log('new window log: ', getCookie('orderSession'));
  // console.log('document.cookie is: ', document.cookie);

  // console.log('current props inside Cart.js is: ', props);

  var updateCartDatabase = () => {
    // update database logic here, then send function to RedirectButton
    //  var session_id = 1;
    var cookie = getCookie('Session');
    // console.log('cookie inside Cart ajax is: ', cookie);
        console.log('getCookie(\'orderSession\').Session inside Cart ajax is: ', getCookie('orderSession').orderSession);

    var link = `/session/update_cart`;
    $.ajax({
      method: "POST",
      url: link,
      // contentType: 'text/plain',
      data: {
        cart: cart, // Neen: change from data to cart from localstorage
        // totalTax: totalTax,
        // grandTotal: grandTotal,
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


  function updateSummaryDatabase() {
    // update database logic here, then send function to RedirectButton
    var session_id = 1;
    var link = `/session${session_id}/update_summary`;
    $.ajax({
      method: "POST",
      url: link,
      // contentType: 'text/plain',
      data: {
        cart: data,
        //  totalTax: totalTax,
        //  grandTotal: grandTotal,
        // session_id: session_id
      },
      success: (response) => {
        if (response === 'POST summary request received!') {
          console.log('POST summary request success!');
        }

      },
      statusCode: {
        200: function () {
          console.log("Status Code 200 ajax cart request!");
        }
      },
      error: (err) => {
        console.log('Error: ', err);
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
      {/* <OrderCode /> */}
      <div className='cart' >
        <ItemList className='item-list' cart={data} />
        <Summary className='summary' cart={data} />
        <RedirectButton className='redirect-button' updateCartDatabase={updateCartDatabase} updateSummaryDatabase={updateSummaryDatabase} />
      </div>
    </div >
  )
}

export default Cart;