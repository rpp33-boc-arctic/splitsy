import React from 'react';
import ButtonAppBar from './navbar.js';
import OrderCode from './orderCode.js';
import RedirectButton from './redirectButton.js';
import ItemList from './itemList.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Summary from './summary.js';
import FullMenu from '../Menu/fullMenu.js';



class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonAppBar: ButtonAppBar,
      cart: []
    }
    this.fetchCart = this.fetchCart.bind(this);
  }

  fetchCart(event) {
    console.log('fetch cart logic here!');
    var cart = event.target.submenu;
    console.log('event.target.submenu is: ', cart);
    this.setState({
      cart: cart
    })
  }

  // componentDidMount() {
  //   return <FullMenu fetchCart={this.fetchCart}/>
  //   console.log('this.props inside Cart is: ', this.props);
  // }

  render() {
    console.log('current props inside Cart.js is: ', this.props);
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
        <ItemList />
        {/* <div>Subtotal:      22.97</div>
        <div>Tax (10%):      2.97</div>
        <div>Delivery Fee:      22.97</div>
        <div>Total:      22.97</div> */}
        <Summary />
        <RedirectButton />
      </div >
    )
  }
}

export default Cart;