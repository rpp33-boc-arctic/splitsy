import React, { useState, useEffect } from 'react';
import SubmenuItem from './menuItem.js';
import SubmenuItemList from './submenuItemList.js';
import { List, Button } from '@mui/material';
import sampleData from './sampleData.js';
import menuStyles from './menuStyles.css';
import Cart from '../Cart/Cart.js';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function FullMenu(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     scrollerStyle: {
  //       overflowY: 'scroll',
	// 			// overflowY: 'hidden',
  //       border:'1px solid grey',
  //       width:'1300px',
  //       float: 'left',
  //       height:'800px',
  //       // position:'relative'
  //     },
	// 		cart: [],
	// 		hideCart: false
	// 		// showComponent: false
  //   }
	// 	// this.onMenuCardClick = this.onMenuCardClick.bind(this);
	// 			this.addToCart = this.addToCart.bind(this);
	// 			this.emptyCart = this.emptyCart.bind(this);
	// 			this.updateCart = this.updateCart.bind(this);

  // }

	const [scrollerStyle, setScrollerStyle] = useState(
		{
			      overflowY: 'scroll',
						// overflowY: 'hidden',
			      border:'1px solid grey',
			      width:'1300px',
			      float: 'left',
			      height:'800px',
			      // position:'relative'
			    }
	);
	const [cart, setCart] = useState([]);

	// useEffect(() => {
		// Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
	// });


	// addToCart(currentItem) {
	// 	console.log('add to cart logic here!');

	// 	// var cartItem = {
	// 	// 	item: this.props.item,
	// 	// 	count: 1
	// 	// }
	// 	// var current_cart = this.state.add_to_cart;
	// 	// current_cart.push(cartItem);
	// 	// this.setState({
	// 	// 	add_to_cart: current_cart
	// 	// });
	// 	// console.log('current_cart is: ', current_cart);
	// 	// return <Cart cart={current_cart} />

	// 	var current_cart = this.state.cart;
	// 	current_cart.push(currentItem);
	// 	this.setState({
	// 		cart: current_cart
	// 	}, () => {console.log('cart state is now: ', this.state.cart)})
	// }

	function addToCart(currentItem) {
			// 	console.log('add to cart logic here!');
			var currentCart = cart.push(currentItem);
			setCart(cart.push(currentCart));
	}

	// emptyCart() {
	// 	//empty cart logic here
	// 	this.setState({
	// 		cart: []
	// 	})
	// }

	function emptyCart() {
		setCart([]);
	}

	// updateCart() {
	// 	return <Cart cart={this.state.cart}/>
	// }

  // render() {
  //   var items = this.props.fullMenu.menu.categories.map((item, i) => {
  //     return <div>
	// 					{
	// 					<SubmenuItemList submenu={item} key={i} addToCart={this.addToCart} emptyCart={this.emptyCart} />
	// 					}
	// 		</div>
  //   })

	function renderCart() {
		  var items = props.fullMenu.menu.categories.map((item, i) => {
      return <div>
						{
						<SubmenuItemList submenu={item} key={i} addToCart={addToCart} emptyCart={emptyCart} />
						}
			</div>
	})
	return items;
}

	// 	console.log('cart inside fullMenu is now: ', this.state.cart);

    return (

      <div>
					<Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" class='go-to-cart'/>} >
        <Link to="/Cart" style={{'textDecoration': 'none', color: 'white'}} params={{ testvalue: "hello" }} >
          GO TO CART
        </Link>

      </Button>

			<Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" class='go-to-cart'/>} onClick={emptyCart}>
        EMPTY CART
      </Button>

        <List className='example' style={scrollerStyle} >
        {renderCart()}
      </List>
				{/* {
					this.state.hideCart?
					<Cart cart={this.state.cart} />:
					null

				} */}
      </div>

    )
  }
// }


export default FullMenu;