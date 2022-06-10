import React, { useState, useEffect } from 'react';
import ButtonAppBar from './navbar.js';
import OrderCode from './orderCode.js';
import RedirectButton from './redirectButton.js';
import ItemList from './itemList.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Summary from './summary.js';
import FullMenu from '../Menu/fullMenu.js';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import { useNavigate } from "react-router-dom";



function Cart(props) {
  var getCookie = function(name){
    if ( document.cookie){
     return {[name]: document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''}
    } else {
      return {[name]:''}
    }
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     buttonAppBar: ButtonAppBar,
  //     cart: []
  //   }
  //   this.fetchCart = this.fetchCart.bind(this);
  // }

  // fetchCart(event) {
  //   console.log('fetch cart logic here!');
  //   var cart = event.target.submenu;
  //   console.log('event.target.submenu is: ', cart);
  //   this.setState({
  //     cart: cart
  //   })
  // }

  // componentDidMount() {
  //   return <FullMenu fetchCart={this.fetchCart}/>
  //   console.log('this.props inside Cart is: ', this.props);
  // }

  // function renderCart() {
  //   // render cart logic here

  // }
  let navigate = useNavigate();

  const [totalTax, setTotalTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [session_id, setSessionID] = useState(1);

  // function calculateTotalTax() {
  //   // total tax logic here
  //   var grandTotal = calculateGrandTotal();
  //   var totalTax = Math.round((grandTotal * 7.25) / 100);
  //   // return totalTax;
  //   setTotalTax(totalTax);
  //   return totalTax;
  // }

  useEffect(() => {
    var grandTotal = 0;
    for (var i = 0; i < data.length; i++) {
      grandTotal += data[i].price;
    }
    // return grandTotal;
    setGrandTotal(grandTotal);
    var totalTax = Math.round((grandTotal * 7.25) / 100);
    // return totalTax;
    setTotalTax(totalTax);
    // return totalTax;
  })

  // function calculateGrandTotal() {
  //   // total tax logic here
  //   var grandTotal = 0;
  //   for (var i = 0; i < data.length; i++) {
  //     grandTotal += data[i].price;
  //   }
  //   // return grandTotal;
  //   setGrandTotal(grandTotal);
  //   return grandTotal;
  // }


  const location = useLocation();
  const data = location.state;
  console.log('current cart in Cart.js is: ', data);
  console.log('new window log: ', getCookie('Session'));
  // console.log('current props inside Cart.js is: ', props);

 var updateCartDatabase = () => {
   // update database logic here, then send function to RedirectButton
  //  var session_id = 1;
  var link = `/session/update_cart`;
  $.ajax({
    method: "POST",
    url: link,
    // contentType: 'text/plain',
    data: {
      cart: data,
      totalTax: totalTax,
      grandTotal: grandTotal,
    },
    headers:{'Authorization':'Bearer ' + getCookie('Session').Session},
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
  .done(function() {
    console.log("cart ajax call is done!");
  });
 }

 function getCartDatabase() {
  // update database logic here, then send function to RedirectButton
  var session_id = 1;
 var link = `/session${session_id}/cart`;
 $.ajax({
   method: "GET",
   url: link,
   // contentType: 'text/plain',
   data: {
     cart: data,
     totalTax: totalTax,
     grandTotal: grandTotal,
    //  session_id: session_id
   },
   success: (response) => {
     if (response === 'POST cart request received!') {
       console.log('POST cart request success!');
     }

   },
   statusCode: {
     200: function() {
       console.log( "Status Code 200 ajax cart request!" );
     }
   },
   error: (err) => {
     console.log('Error: ', err);
   }
 })
 .done(function() {
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
     totalTax: totalTax,
     grandTotal: grandTotal,
     // session_id: session_id
   },
   success: (response) => {
     if (response === 'POST summary request received!') {
       console.log('POST summary request success!');
     }

   },
   statusCode: {
     200: function() {
       console.log( "Status Code 200 ajax cart request!" );
     }
   },
   error: (err) => {
     console.log('Error: ', err);
   }
 })
 .done(function() {
   console.log("cart ajax call is done!");
 });
}

  return (
    <div >
      {/* <ButtonAppBar /> */}
      <h1>
        <ShoppingCartIcon />
        Cart
      </h1>
      <OrderCode />
      {/* <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div> */}
      <ItemList cart={data}/>
      {/* <div>Subtotal:      22.97</div>
        <div>Tax (10%):      2.97</div>
        <div>Delivery Fee:      22.97</div>
        <div>Total:      22.97</div> */}
      <Summary cart={data} totalTax={totalTax} grandTotal={grandTotal} />
      <RedirectButton updateCartDatabase={updateCartDatabase} updateSummaryDatabase={updateSummaryDatabase} />
    </div >
  )
}

export default Cart;