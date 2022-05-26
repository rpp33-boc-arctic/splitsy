import React from 'react';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div >
      Cart
      <div>Order Code: XPZ947</div>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
      </div >
      <div>Subtotal:      22.97</div>
      <div>Tax (10%):      2.97</div>
      <div>Delivery Fee:      22.97</div>
      <div>Total:      22.97</div>
      <button>Ready</button>
      <button>Checkout</button>.
    )
  }
}

export default Cart;