import React, { useState, useEffect } from 'react';
// import SubmenuItem from './menuItem.js';
import SubmenuItemList from './submenuItemList.js';
import { List, Button } from '@mui/material';
// import sampleData from './sampleData.js';
// import menuStyles from './menuStyles.css';
// import Cart from '../Cart/Cart.js';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function FullMenu(props) {

	// eslint-disable-next-line no-unused-vars
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
  //   setCart(JSON.parse(window.localStorage.getItem('cart')))
  // }, []);



  // useEffect(() => {
	// 		const data = localStorage.getItem('cart');
	// 		if (data){
	// 			setCart(JSON.parse(data));
	// 		}
  // }, []);

	// useEffect(() => {
  //   // setCart(JSON.parse(localStorage.setItem('cart', cart)))
	// 	localStorage.setItem('cart', JSON.stringify(cart));
  // });

	function addToCart(currentItem) {
		// var isIncluded = false;
		// 	console.log('currentItem is: ', currentItem);
		// 	for (var i = 0; i < cart.length; i++) {
		// 		if (JSON.stringify(cart[i]) === JSON.stringify(currentItem)) {
		// 			isIncluded = true;
		// 		}
		// 	}
		// if (isIncluded) {
		// 	console.log('Item is already in cart!');
		// } else {
		// 	setCart( arr => [...arr, currentItem]);

			setCart( arr => [...arr, currentItem]);
			localStorage.setItem('cart', cart);

			console.log('cart inside fullMenu is now: ', cart);
		}
	// }

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
      return <div key={i}>
						{
						<SubmenuItemList submenu={item} addToCart={addToCart} emptyCart={emptyCart} />
						}
			</div>
	})
	return items;
}

useEffect(() => {
	console.log('cart inside fullMenu.js is now: ', JSON.stringify(cart));
});

	function itemCount() {
		var count = cart.length;
		return count;
	}


    return (

      <div>
				{/* <div>
					cart inside fullMenu is now: {JSON.stringify(cart)}
				</div> */}
				<Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" className='go-to-cart'/>} onClick={emptyCart}>
				{itemCount()}
		  </Button>
					<Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" className='go-to-cart'/>} >
        <Link to="/protected/Cart" style={{'textDecoration': 'none', color: 'white'}} params={{ testvalue: "hello" }} state={cart} >
          GO TO CART
        </Link>

      </Button>

			<Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" className='go-to-cart'/>} onClick={emptyCart}>
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