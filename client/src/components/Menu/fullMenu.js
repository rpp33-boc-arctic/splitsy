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

	function addToCart(currentItem) {
			// 	console.log('add to cart logic here!');
			// var currentCart = cart;
			// currentCart.push(currentItem);
			// setCart(currentCart);
		var isIncluded = false;
			console.log('currentItem is: ', currentItem);
			for (var i = 0; i < cart.length; i++) {
				if (JSON.stringify(cart[i]) === JSON.stringify(currentItem)) {
					isIncluded = true;
				}
			}
		if (isIncluded) {
			console.log('Item is already in cart!');
		} else {
			setCart( arr => [...arr, currentItem]);
			// setCart({bob: 'I am bob'});
			console.log('cart inside fullMenu is now: ', cart);
		}
	}

	// emptyCart() {
	// 	//empty cart logic here
	// 	this.setState({
	// 		cart: []
	// 	})
	// }

	function emptyCart() {
		setCart([]);
		console.log('cart inside fullMenu is now: ', cart);

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

	function renderMenu() {
		  var items = props.fullMenu.menu.categories.map((item, i) => {
      return <div>
						{
						<SubmenuItemList submenu={item} key={i} addToCart={addToCart} emptyCart={emptyCart} />
						}
			</div>
	})
	return items;
}

useEffect(() => {
	console.log('cart inside fullMenu.js is now: ', JSON.stringify(cart));
});


    return (

      <div>
				{/* <div>
					cart inside fullMenu is now: {JSON.stringify(cart)}
				</div> */}

					<Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" class='go-to-cart'/>} >
        <Link to="/Cart" style={{'textDecoration': 'none', color: 'white'}} params={{ testvalue: "hello" }} state={cart} >
          GO TO CART
        </Link>

      </Button>

			<Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" class='go-to-cart'/>} onClick={emptyCart}>
        EMPTY CART
      </Button>

        <List className='example' style={scrollerStyle} >
        {renderMenu()}
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