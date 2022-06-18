import React, { useState, useEffect } from 'react';
// import SubmenuItem from './menuItem.js';
import SubmenuItemList from './submenuItemList.js';
import { List, Button } from '@mui/material';
// import sampleData from './sampleData.js';
// eslint-disable-next-line no-unused-vars
import menuStyles from './menuStyles.css';
// import Cart from '../Cart/Cart.js';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
// import { flexbox } from '@mui/system';

// import { styled } from "@material-ui/core";


function FullMenu(props) {

	// eslint-disable-next-line no-unused-vars
	const [scrollerStyle, setScrollerStyle] = useState(
		{
			overflowY: 'scroll',
			// overflowY: 'hidden',
			border: '1px solid grey',
			width: '1300px',
			float: 'left',
			height: '800px',
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

		setCart(arr => [...arr, currentItem]); //setCart([...cart, currentItem]);
		localStorage.setItem('cart', cart);

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
	});

	function itemCount() {
		var count = cart.length;
		return count;
	}

	// const StyledBadge = styled(Badge)({
	// 	"& .MuiBadge-badge": {
	// 		color: "yellow",
	// 		backgroundColor: "green"
	// 	}
	// });



	return (

		<div className='full-menu'>
			<Stack spacing={2} direction="row">
			</Stack>
			<div className='menu-buttons' >
				<Button xs={2} className='go-to-cart' variant="contained" endIcon={
					<Badge badgeContent={itemCount()} color="secondary">
						<ShoppingCartIcon color="action" />
					</Badge>
				}>
					<Link to="/protected/Cart" style={{ 'textDecoration': 'none', color: 'white' }} params={{ testvalue: "hello" }} state={cart} >
						GO TO CART
					</Link>
				</Button  >

				<Button className='empty-cart' variant="contained" endIcon={<ShoppingCartIcon fontSize="large" />} onClick={emptyCart} xs={2} >
					EMPTY CART
				</Button>
				<br></br>
				<List className='example' xs={8} style={scrollerStyle} >
					{renderMenu()}
				</List>
			</div>

		</div>

	)
}
// }


export default FullMenu;