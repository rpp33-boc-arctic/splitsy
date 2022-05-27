import React from 'react';
import ButtonAppBar from './navbar.js';
import OrderCode from './orderCode.js';
import RedirectButton from './redirectButton.js';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div >
      <ButtonAppBar />
      <div>Cart</div>
      <OrderCode />
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>

      <div>Subtotal:      22.97</div>
      <div>Tax (10%):      2.97</div>
      <div>Delivery Fee:      22.97</div>
      <div>Total:      22.97</div>
      <RedirectButton />
      </div >
    )
  }
}

export default Cart;